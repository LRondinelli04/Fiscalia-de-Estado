using AutoMapper;
using BE_CRUDMascotas.Models;
using BE_CRUDMascotas.Models.DTO;
using BE_CRUDMascotas.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMascotaRepository _mascotaRepository;

        // Constructor
        public MascotaController(IMapper mapper, IMascotaRepository mascotaRepository)
        {
            _mapper = mapper;
            _mascotaRepository = mascotaRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(2000);
                // Traer todas las mascotas
                var listMascotas = await _mascotaRepository.GetListMascotas();

                var listMascotasDto = _mapper.Map<IEnumerable<MascotaDTO>>(listMascotas);

                return Ok(listMascotasDto);
            }
            catch (Exception ex) {
                // Error
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        // Traer una mascota por id
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                // Traer una mascota por id
                var mascota = await _mascotaRepository.GetMascota(id);
                // Validar si la mascota no existe
                if (mascota == null)
                {
                    // Si no existe retornar un 404
                    return NotFound();
                }

                var mascotaDTO = _mapper.Map<MascotaDTO>(mascota);

                return Ok(mascotaDTO);
            }
            catch (Exception ex)
            {
                // Error
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        // Eliminar una mascota
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
               // Buscar la mascota por id
               var mascota = await _mascotaRepository.GetMascota(id);
              // Verificar si la mascota no existe (que no devuelva NULL)
              if (mascota == null)
                {
                    return NotFound(); 
                }
              
              await _mascotaRepository.DeleteMascota(mascota);

                return NoContent();
            }
            catch (Exception ex)
            {
                // Error
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        // Agregar una mascota
        public async Task<IActionResult> Post(Mascota mascotaDto)
        {
            try
            {

                var mascota = _mapper.Map<Mascota>(mascotaDto);

                // Agrego la fecha actual
                mascota.Fecha = DateTime.Now;
                
                mascota = await _mascotaRepository.AddMascota(mascota);

                var mascotaItemDto = _mapper.Map<MascotaDTO>(mascota);

                return CreatedAtAction("Get", new { id = mascotaItemDto }, mascotaItemDto); // El primer parametro es el nombre del metodo Get que obtiene el objeto que acabamos de crear
                                                                                 // Como segundo parametro se envia el objeto creado (mascota) con el id generado
                                                                                 // El tercer parametro es el objeto creado (mascota)
            }
            catch (Exception ex)
            {
                // Error
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        // Actualizar una mascota
        public async Task<IActionResult> Put(int id, Mascota mascotaDto)
        {
            try
            {

                var mascota = _mapper.Map<Mascota>(mascotaDto);

                // Verificar si el id es diferente al id de la mascota
                if (id != mascota.Id)
                {
                    return BadRequest("El ID de la mascota no coincide.");
                }

                // Buscar la mascota por id
                var mascotaItem = await _mascotaRepository.GetMascota(id);

                // Verificar si la mascota no existe
                if (mascotaItem == null)
                {
                    return NotFound();
                }

               await _mascotaRepository.UpdateMascota(mascota);

                return NoContent();
            }
            catch (Exception ex)
            {
                // Error
                return BadRequest(ex.Message);
            }
        }
    }
}
