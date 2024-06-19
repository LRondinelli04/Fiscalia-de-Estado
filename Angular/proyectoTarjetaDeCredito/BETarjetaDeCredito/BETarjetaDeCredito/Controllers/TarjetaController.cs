using BETarjetaDeCredito.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BETarjetaDeCredito.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarjetaController : ControllerBase
    {

        private readonly AplicationDbContext _context;

        public TarjetaController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<TarjetaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                // Get all TarjetaCreditos
                var listTarjeta = await _context.TarjetaCreditos.ToListAsync();

                // Retorna la lista de tarjetas
                return Ok(listTarjeta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                // Agrega la tarjeta a la base de datos
                _context.Add(tarjeta);

                // Guarda los cambios
                await _context.SaveChangesAsync();

                // Retorna la tarjeta
                return Ok(tarjeta);
            }
            catch (Exception ex)
            {
                // Captura la excepción interna
                var innerException = ex.InnerException?.Message ?? ex.Message;
                return BadRequest(innerException);
            }
        }

    }
}
