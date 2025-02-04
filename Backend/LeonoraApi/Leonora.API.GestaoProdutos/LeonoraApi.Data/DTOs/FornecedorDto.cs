using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeonoraApi.Data.DTOs
{
    public class FornecedorDto
    {       
        public string? HashId { get; set; }
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public string Telefone { get; set; }
        public string Endereco { get; set; }
       
    }


}
