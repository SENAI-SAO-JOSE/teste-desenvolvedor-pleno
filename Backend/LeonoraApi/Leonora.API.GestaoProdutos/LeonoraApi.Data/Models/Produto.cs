using System;
using System.ComponentModel.DataAnnotations;

namespace LeonoraApi.Data.Models
{
    public class Produto
    {
        [Key]
        public Guid HashId { get; set; }
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public Guid CategoriaId { get; set; }
        public bool IsDeleted { get; set; }
        public Guid CriadoPor { get; set; }
        public DateTime CriadoEm { get; set; }
        public Guid? AlteradoPor { get; set; }
        public DateTime? AlteradoEm { get; set; }
    }
}
