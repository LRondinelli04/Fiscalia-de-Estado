using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace BE_TarjetaDeCredito
{
    public class AplicationDbContextFactory : IDesignTimeDbContextFactory<AplicationDbContext>
    {
        public AplicationDbContext CreateDbContext(string[] args)
        {
            // Asume que el directorio actual es el directorio del proyecto. Ajusta según sea necesario.
            var directory = Directory.GetCurrentDirectory();

            // Construye la configuración a partir del archivo appsettings.json
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(directory)
                .AddJsonFile("appsettings.json")
                .Build();

            // Obtiene la cadena de conexión
            var connectionString = configuration.GetConnectionString("Conexion");

            // Configura las opciones de DbContext para usar SQL Server con la cadena de conexión
            var builder = new DbContextOptionsBuilder<AplicationDbContext>();
            builder.UseSqlServer(connectionString);

            // Crea y retorna una nueva instancia de AplicationDbContext
            return new AplicationDbContext(builder.Options);
        }
    }
}
