using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeonoraApi.Data.DTOs
{
    public class UsuarioDto
    {
        public string? HashId { get; set; }
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public string Cpf { get; set; }
        public int Codigo { get; set; }
        public bool IsAtivo { get; set; }
       
    }


}
