using LeonoraApi.Data;
using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using LeonoraApi.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly ApiContext _context;

        public ProdutoRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProdutoDto>> ObterTodos()
        {
            return await (from p in _context.Produtos
                          join c in _context.Categorias on p.CategoriaId equals c.HashId
                          where p.IsDeleted == false
                          select new ProdutoDto
                          {
                              HashId = p.HashId.ToString(),
                              Codigo = p.Codigo,
                              Nome = p.Nome,
                              Descricao = p.Descricao,
                              Preco = p.Preco,
                              CategoriaId = c.HashId.ToString(),
                              NomeCategoria = c.Nome,
                              IsDeleted = p.IsDeleted
                          }).ToListAsync();
        }

        public async Task<ProdutoDto> ObterPorId(string hashId)
        {
            return await (from p in _context.Produtos
                          join c in _context.Categorias on p.CategoriaId equals c.HashId
                          where p.HashId.ToString() == hashId
                          select new ProdutoDto
                          {
                              HashId = p.HashId.ToString(),
                              Codigo = p.Codigo,
                              Nome = p.Nome,
                              Descricao = p.Descricao,
                              Preco = p.Preco,
                              CategoriaId = c.HashId.ToString(),
                              NomeCategoria = c.Nome,
                              IsDeleted = p.IsDeleted
                          }).FirstOrDefaultAsync();
        }

        public async Task<Produto> Criar(Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return produto;
        }

        public async Task<Produto> Alterar(Produto produto)
        {
            var produtoExistente = await _context.Produtos.FindAsync(produto.HashId);
            if (produtoExistente == null) return null;

            produtoExistente.Nome = produto.Nome;
            produtoExistente.Descricao = produto.Descricao;
            produtoExistente.Preco = produto.Preco;
            produtoExistente.CategoriaId = produto.CategoriaId;
            produtoExistente.IsDeleted = produto.IsDeleted;

            await _context.SaveChangesAsync();
            return produtoExistente;
        }

        public async Task<bool> Excluir(string hashId)
        {
            var produto = await _context.Produtos.FirstOrDefaultAsync(p => p.HashId.ToString() == hashId);
            if (produto == null) return false;

            produto.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
