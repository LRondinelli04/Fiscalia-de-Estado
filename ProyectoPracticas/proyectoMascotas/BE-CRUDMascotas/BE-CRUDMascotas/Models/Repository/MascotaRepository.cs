
using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Models.Repository
{
    public class MascotaRepository: IMascotaRepository
    {
        private readonly AplicationDbContext _context;

        public MascotaRepository(AplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<Mascota>> GetListMascotas()
        {
            return await _context.Mascotas.ToListAsync();
        }

        public async Task<Mascota> GetMascota(int id)
        {
            return await _context.Mascotas.FindAsync(id);
        }
        public async Task DeleteMascota(Mascota mascota)
        {
            // Eliminar la mascota
            _context.Mascotas.Remove(mascota);
            // Guardar los cambios
            await _context.SaveChangesAsync();
        }

        public async Task<Mascota> AddMascota(Mascota mascota)
        {
            // Agregar una mascota
            _context.Mascotas.Add(mascota);
            // Guardar los cambios
            await _context.SaveChangesAsync();
            return mascota;
        }

        public async Task UpdateMascota(Mascota mascota)
        {
            var mascotaItem = await _context.Mascotas.FirstOrDefaultAsync(x => x.Id == mascota.Id);

            if (mascotaItem == null)
            { 
                // Si encuentra la mascota, actualiza los campos
                mascotaItem.Nombre = mascota.Nombre;
                mascotaItem.Edad = mascota.Edad;
                mascotaItem.Peso = mascota.Peso;
                mascotaItem.Raza = mascota.Raza;
                mascotaItem.Color = mascota.Color;

                // Guardar los cambios
                await _context.SaveChangesAsync();
            }

        }
    }
}
