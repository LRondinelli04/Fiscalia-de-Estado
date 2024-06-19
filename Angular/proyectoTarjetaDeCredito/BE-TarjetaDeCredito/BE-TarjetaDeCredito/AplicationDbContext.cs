using BE_TarjetaDeCredito.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_TarjetaDeCredito
{
    public class AplicationDbContext : DbContext
    {
        DbSet<TarjetaCredito> TarjetaCreditos { get; set; }

        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
        }
    }
}
