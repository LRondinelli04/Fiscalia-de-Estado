﻿namespace BE_CRUDMascotas.Models
{
    public class Mascota
    {

        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Raza { get; set; }

        public string Color { get; set; }

        public int Edad { get; set; }

        public int Peso { get; set; }

        public DateTime Fecha { get; set; }

    }
}
