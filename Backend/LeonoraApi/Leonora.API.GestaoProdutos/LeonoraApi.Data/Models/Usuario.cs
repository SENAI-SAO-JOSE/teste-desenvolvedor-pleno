using System;
using System.ComponentModel.DataAnnotations;

namespace LeonoraApi.Data.Models
{
    public class Usuario
    {
        [Key]
        public Guid HashId { get; set; }
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public string Cpf { get; set; }
        public DateTime? DataUltimoToken { get; set; }
        public bool IsAtivo { get; set; } = true;
        public Guid? CriadoPor { get; set; }
        public DateTime CriadoEm { get; set; }
        public Guid? AlteradoPor { get; set; }
        public DateTime? AlteradoEm { get; set; }
    }
}
