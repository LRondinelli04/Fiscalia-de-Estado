/* 
 ?   Este Enpoint se encarga de retornar las causas de una persona en base a su carátula y fuero.
 *       - Se obtienen una persona, un fuero y un departamento judicial (opcional).
 *       - Se valida que lo datos ingresados sean correctos.
 *       - En base a esos datos se obtienen los juzgados correspondientes.
 *       - Genero todos los patrones de búsqueda posibles de la persona (todas las combinaciones posibles de esa persona ingresada en la variable personaCaratula).
 *       - Se realiza una búsqueda de causas en cada juzgado.
 *       - Se retornan las causas que coincidan con la persona ingresada.
 !       - Se retorna un mensaje de error si no se encontraron datos para la persona ingresada.
 */

[HttpGet("Juicio/BuscarCausas/{personaCaratula}/{idFuero}")]
public async Task<ActionResult<object>> BuscarCausas(string personaCaratula, int idFuero, int? idDepartamentoJudicial, bool buscarEnCaratulaCompleta = false)
{
    try
    {
        personaCaratula = Validaciones.KeywordsBuscarCausaOk(personaCaratula, idFuero, idDepartamentoJudicial);

        List<JuzgadoSCBA> juzgadosList = await GetJuzgados(idFuero, idDepartamentoJudicial); // Creo y cargo la lista de "Juzgados"

        List<Dictionary<string, object>> causasList = new List<Dictionary<string, object>>(); // Creo la lista de "Causas"

        List<string> patrones = GenerarPatronesBusqueda(personaCaratula); // Patrones de búsqueda de la persona

        string urlPostCausas = _configuration.GetSection("URL_BUSCAR_CAUSAS_NYP").Value; // $"https://serviciosdev.fepba.gov.ar/scba/ws_nype/api/NYP/Causas/Buscar/Datos/gomez%40fepba.gov.ar"

        // Obtener las causas de cada juzgado que coincidan con la persona ingresada
        var semaphore = new SemaphoreSlim(20);
        await Parallel.ForEachAsync(juzgadosList, async (juzgado, _) =>
        {
            await semaphore.WaitAsync(_);
            try
            {
                await ProcesarJuzgadoAsync(juzgado, personaCaratula, causasList, urlPostCausas, patrones, buscarEnCaratulaCompleta);
            }
            finally
            {
                semaphore.Release();
            }
        }).ConfigureAwait(false);

        if (causasList.Count > 0)
        {
            return Ok(new ResponseApi<object>(HttpStatusCode.OK, "Búsqueda de causas correspondientes a la persona:", causasList));
        }
        else
        {
            throw new CustomException(Convert.ToInt32(HttpStatusCode.NotFound), "No se encontraron datos para la persona ingresada");
        }
    }
    catch (CustomException e)
    {
        return StatusCode((int)HttpStatusCode.NotFound, new ResponseApi<object>(HttpStatusCode.NotAcceptable, "Ha ocurrido un error", null, e.InnerException != null ? e.InnerException.Message : e.Message, e.errorCode));
    }
}

// Método para obtener la lista de "JUZGADOS"
private async Task<List<JuzgadoSCBA>> GetJuzgados(int idFuero, int? idDepartamentoJudicial)
{
    using var client = new HttpClient();

    string urlGetJuzgados = idDepartamentoJudicial.HasValue // $"https://serviciosdev.fepba.gov.ar/entidades/api/juzgados/porFuero/{idFuero}"
    ? $"https://serviciosdev.fepba.gov.ar/entidades/api/juzgados/porDepartamentoJudicialyFuero/{idDepartamentoJudicial}/{idFuero}"
    : _configuration.GetSection("URL_JUZGADOS_POR_FUERO").Value + idFuero;

    HttpResponseMessage response = await client.GetAsync(urlGetJuzgados).ConfigureAwait(false);
    if (!response.IsSuccessStatusCode)
    {
        // Verificar si el código de estado indica que no se encontró el fuero
        if (response.StatusCode == HttpStatusCode.PreconditionFailed)
        {
            throw new CustomException(Convert.ToInt32(HttpStatusCode.PreconditionFailed), "No se encontró ningún Juzgado correspondiente a los datos ingresados.");
        }
    }

    // Descargo la data y la retorno
    JObject jsonFueros = await ParsearData(response).ConfigureAwait(false);
    JArray juzgadosArreglo = (JArray)jsonFueros.SelectToken("data");
    return JsonConvert.DeserializeObject<List<JuzgadoSCBA>>(juzgadosArreglo.ToString());
}

// Metodo async para procesar un juzgado
private async Task ProcesarJuzgadoAsync(JuzgadoSCBA juzgado, string personaCaratula, List<Dictionary<string, object>> causasList, string urlPostCausas, List<string> patrones, bool buscarEnCaratulaCompleta)
{
    using var client = new HttpClient { Timeout = TimeSpan.FromSeconds(60) };

    JObject jsonPost = new JObject
    {
        { "wasa", "polimeni" },
        { "idorg", juzgado.idOrganismoCorte },
        { "caratula", personaCaratula }
    };

    var responsePost = await client.PostAsync(urlPostCausas, new StringContent(jsonPost.ToString(), System.Text.Encoding.UTF8, "application/json")).ConfigureAwait(false);
    if (!responsePost.IsSuccessStatusCode)
    {
        return;
    }

    JObject jsonCausas = await ParsearData(responsePost).ConfigureAwait(false);
    lock (causasList)
    {
        causasList.AddRange(ObtenerListaDeCausas(jsonCausas, juzgado, patrones, buscarEnCaratulaCompleta));
    }

}
private async Task<JObject> ParsearData(HttpResponseMessage response)
{
    var data = await response.Content.ReadAsByteArrayAsync().ConfigureAwait(false);
    string dataString = System.Text.Encoding.UTF8.GetString(data);
    return JObject.Parse(dataString);
}

// Metodo para obtener la lista de causas
private List<Dictionary<string, object>> ObtenerListaDeCausas(JObject jsonCausas, JuzgadoSCBA juzgado, List<string> patrones, bool buscarEnCaratulaCompleta)
{
    return jsonCausas["data"].Children()
    .Where(causa =>
    {
        string caratula = causa["caratula"].ToObject<string>();
        string caratulaNormalizada = NormalizarNombre(caratula);
        if (buscarEnCaratulaCompleta)
        {
            return patrones.Any(patron => Regex.IsMatch(caratulaNormalizada, patron, RegexOptions.IgnoreCase)); // TRUE (buscar general)
        }
        else
        {
            string parteActoraCaratula = caratula.Split(new[] { "C/", "C /" }, StringSplitOptions.None)[0].Trim().ToUpper(); // FALSE (buscar por parte actora)
            string parteActoraCaratulaNormalizada = NormalizarNombre(parteActoraCaratula);
            return patrones.Any(patron => Regex.IsMatch(parteActoraCaratulaNormalizada, patron, RegexOptions.IgnoreCase));
        }
    })
    .Select(causa => new Dictionary<string, object>
    {
        { "caratula", causa["caratula"].ToObject<object>() },
        { "nroReceptoria", $"{causa["letraReceptoria"].ToObject<object>()}-{causa["numeroReceptoria"].ToObject<object>()}/{causa["extensionReceptoria"].ToObject<object>()}" },
        { "numero", causa["numero"].ToObject<object>() },
        { "idCausa", causa["idCausa"].ToObject<object>() },
        { "idOrganismoCorte", causa["idOrg"].ToObject<object>() },
        { "idOrganismoFiscalia", juzgado.idJuzgado },
        { "OrganismoDescripcionFE", juzgado.Juzgado },
        { "FueroDescripcionFE", juzgado.Fuero }
    }).ToList();
}

// Metodo para normalizar el nombre de la persona
private string NormalizarNombre(string personaCaratula)
{
    return Regex.Replace(personaCaratula, @"\s+", " ").Replace(",", "").Trim().ToUpper();
}

// Metodo para generar patrones de búsqueda de la persona
private List<string> GenerarPatronesBusqueda(string personaCaratula)
{
    string[] palabras = personaCaratula.Split(' ');
    List<string> patrones = new List<string>();

    IEnumerable<IEnumerable<string>> permutaciones = ObtenerPermutaciones(palabras);

    // Creo un patrón por cada permutación
    foreach (var permutacion in permutaciones)
    {
        string patron = $@"\b{string.Join(@"\s", permutacion.Select(Regex.Escape))}\b";
        patrones.Add(patron);
    }

    return patrones;
}

private IEnumerable<IEnumerable<T>> ObtenerPermutaciones<T>(IEnumerable<T> lista)
{
    // Si la lista está vacía, devolver una lista vacía
    if (!lista.Any()) return new List<IEnumerable<T>> { new List<T>() };

    // Generar permutaciones para el resto de la lista
    return ObtenerPermutaciones(lista.Skip(1))
        .SelectMany(subLista => Enumerable.Range(0, subLista.Count() + 1)
        .Select(i => subLista.Take(i).Concat(new[] { lista.First() }).Concat(subLista.Skip(i))));
}