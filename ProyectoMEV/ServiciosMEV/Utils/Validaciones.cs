/* 
 ?   Este archivo contiene las validaciones necesarias para la búsqueda de causas por persona.
 */


// Validación de la búsqueda de causas por persona
public static string KeywordsBuscarCausaOk(string personaCaratula, int idFuero, int? departamentoJudicial)
{
    personaCaratula = personaCaratula.ToUpper().Trim();
    ValidarPersonaCaratula(personaCaratula);
    ValidarIdFuero(idFuero);
    if (departamentoJudicial != null)
    {
        ValidarDepartamentoJudicial(departamentoJudicial);
    }
    return personaCaratula;
}

private static void ValidarPersonaCaratula(string personaCaratula)
{
    if (string.IsNullOrEmpty(personaCaratula))
    {
        throw new CustomException(Convert.ToInt32(HttpStatusCode.PreconditionFailed), "El nombre de la persona no puede ser nulo o vacío.");
    }

    var regex = new Regex("^[A-ZáéíóúÁÉÍÓÚñÑ]+( [A-ZáéíóúÁÉÍÓÚñÑ]+)*$");
    if (!regex.IsMatch(personaCaratula))
    {
        throw new CustomException(Convert.ToInt32(HttpStatusCode.PreconditionFailed), "El nombre de la persona solo puede contener letras y un único espacio entre palabras.");
    }
}

private static void ValidarIdFuero(int idFuero)
{
    const int MinIdFuero = 1;
    const int MaxIdFuero = 38;
    if (idFuero <= 0 || idFuero > MaxIdFuero)
    {
        throw new CustomException(Convert.ToInt32(HttpStatusCode.PreconditionFailed), $"Ingrese un Id de Fuero válido (entre {MinIdFuero} y {MaxIdFuero}).");
    }
}

private static void ValidarDepartamentoJudicial(int? departamentoJudicial)
{
    const int MinDepartamentoJudicial = 1;
    const int MaxDepartamentoJudicial = 79;
    if (departamentoJudicial <= 0 || departamentoJudicial > MaxDepartamentoJudicial)
    {
        throw new CustomException(Convert.ToInt32(HttpStatusCode.PreconditionFailed), $"Ingrese un Id de Departamento Judicial válido (entre {MinDepartamentoJudicial} y {MaxDepartamentoJudicial}).");
    }
}