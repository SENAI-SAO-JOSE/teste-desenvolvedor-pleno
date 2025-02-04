using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeonoraApi.Data.DTOs
{
    public class CategoriaDto
    {       
        public string? HashId { get; set; }
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }       
    }
}
