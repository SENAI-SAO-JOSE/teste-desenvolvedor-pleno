using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeonoraApi.Data.Models
{
    [Table("Produto_Fornecedor")]
    public class ProdutoFornecedor
    {
        [Key]
        public Guid HashId { get; set; } = Guid.NewGuid();       
        public Guid ProdutoId { get; set; }      
        public Guid FornecedorId { get; set; }
        public Guid CriadoPor { get; set; }
        public DateTime CriadoEm { get; set; }
        public Guid? AlteradoPor { get; set; }
        public DateTime? AlteradoEm { get; set; }

        
    }
}
