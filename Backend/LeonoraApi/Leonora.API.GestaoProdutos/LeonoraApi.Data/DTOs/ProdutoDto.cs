using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeonoraApi.Data.DTOs
{
    public class ProdutoDto
    {       
        public string? HashId { get; set; }
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string CategoriaId { get; set; }
        public string NomeCategoria { get; set; }
        public bool IsDeleted { get; set; }
      
    }

}
