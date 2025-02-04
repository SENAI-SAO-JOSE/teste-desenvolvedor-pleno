using System;
using System.ComponentModel.DataAnnotations;

namespace LeonoraApi.Data.Models
{
    public class Fornecedor
    {
        [Key]
        public Guid HashId { get; set; }
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public string Telefone { get; set; }
        public string Endereco { get; set; }
        public Guid CriadoPor { get; set; }
        public DateTime CriadoEm { get; set; }
        public Guid? AlteradoPor { get; set; }
        public DateTime? AlteradoEm { get; set; }
    }
}
