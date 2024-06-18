using System.ComponentModel.DataAnnotations;

namespace BE_TarjetaDeCredito.Models
{
    public class TarjetaCredito
    {
        public string Id { get; set; }

        [Required]
        public string Titular { get; set; }
        [Required]
        public string NumeroTarjeta { get; set; }
        [Required]
        public string FechaExpiracion { get; set; }
        [Required]
        public string CVV { get; set; }
    }
}
