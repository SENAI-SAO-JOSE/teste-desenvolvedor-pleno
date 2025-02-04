
using LeonoraApi.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LeonoraApi.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions options) : base(options)
        {

        }

        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Categoria> Categorias { get; set; }
        public virtual DbSet<Fornecedor> Fornecedores { get; set; }
        public virtual DbSet<Produto> Produtos { get; set; }
        public virtual DbSet<ProdutoFornecedor> ProdutoFornecedores { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProdutoFornecedor>()
                .HasKey(pf => new { pf.ProdutoId, pf.FornecedorId });

            base.OnModelCreating(modelBuilder);
        }

    }
}
