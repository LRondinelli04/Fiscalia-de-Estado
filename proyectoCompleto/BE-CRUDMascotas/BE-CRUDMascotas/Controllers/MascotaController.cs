using BE_CRUDMascotas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        private readonly AplicationDbContext _context;
         
        // Constructor
        public MascotaController(AplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(2000);
                // Traer todas las mascotas
                var listMascotas = await _context.Mascotas.ToListAsync();
                return Ok(listMascotas);
            }
            catch (Exception ex) {
                // Error
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                // Traer una mascota por id
                var mascota = await _context.Mascotas.FindAsync(id);
                // Validar si la mascota no existe
                if (mascota == null)
                {
                    // Si no existe retornar un 404
                    return NotFound();
                }
                return Ok(mascota);
            }
            catch (Exception ex)
            {
                // Error
                return BadRequest(ex.Message);
            }
        }
    }
}
