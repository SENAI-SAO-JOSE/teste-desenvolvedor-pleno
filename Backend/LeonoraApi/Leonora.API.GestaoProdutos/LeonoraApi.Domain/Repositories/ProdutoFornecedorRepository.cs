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
    public class ProdutoFornecedorRepository : IProdutoFornecedorRepository
    {
        private readonly ApiContext _context;

        public ProdutoFornecedorRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProdutoFornecedorDto>> ObterTodos()
        {
            return await (from pf in _context.ProdutoFornecedores
                          join p in _context.Produtos on pf.ProdutoId equals p.HashId
                          join f in _context.Fornecedores on pf.FornecedorId equals f.HashId
                          select new ProdutoFornecedorDto
                          {
                              HashId = pf.HashId.ToString(),
                              ProdutoHashId = p.HashId.ToString(),
                              ProdutoNome = p.Nome,
                              FornecedorHashId = f.HashId.ToString(),
                              FornecedorNome = f.Nome
                          }).ToListAsync();
        }

        public async Task<ProdutoFornecedorDto> ObterPorId(string hashId)
        {
            return await (from pf in _context.ProdutoFornecedores
                          join p in _context.Produtos on pf.ProdutoId equals p.HashId
                          join f in _context.Fornecedores on pf.FornecedorId equals f.HashId
                          where pf.HashId.ToString() == hashId
                          select new ProdutoFornecedorDto
                          {
                              HashId = pf.HashId.ToString(),
                              ProdutoHashId = p.HashId.ToString(),
                              ProdutoNome = p.Nome,
                              FornecedorHashId = f.HashId.ToString(),
                              FornecedorNome = f.Nome
                          }).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ProdutoFornecedorDto>> ObterFornecedoresPorProduto(string produtoHashId)
        {
            return await (from pf in _context.ProdutoFornecedores
                          join p in _context.Produtos on pf.ProdutoId equals p.HashId
                          join f in _context.Fornecedores on pf.FornecedorId equals f.HashId
                          where p.HashId.ToString() == produtoHashId
                          select new ProdutoFornecedorDto
                          {
                              HashId = pf.HashId.ToString(),
                              ProdutoHashId = p.HashId.ToString(),
                              ProdutoNome = p.Nome,
                              FornecedorHashId = f.HashId.ToString(),
                              FornecedorNome = f.Nome
                          }).ToListAsync();
        }

        public async Task<ProdutoFornecedorDto> Criar(ProdutoFornecedor produtoFornecedor)
        {
            // Adiciona o vínculo no banco
            _context.ProdutoFornecedores.Add(produtoFornecedor);
            await _context.SaveChangesAsync();

            // Realiza consultas adicionais para obter os nomes de Produto e Fornecedor
            var produto = await _context.Produtos
                .Where(p => p.HashId == produtoFornecedor.ProdutoId)
                .Select(p => new { p.Nome })
                .FirstOrDefaultAsync();

            var fornecedor = await _context.Fornecedores
                .Where(f => f.HashId == produtoFornecedor.FornecedorId)
                .Select(f => new { f.Nome })
                .FirstOrDefaultAsync();

            // Retorna o DTO preenchido
            return new ProdutoFornecedorDto
            {
                HashId = produtoFornecedor.HashId.ToString(),
                ProdutoHashId = produtoFornecedor.ProdutoId.ToString(),
                FornecedorHashId = produtoFornecedor.FornecedorId.ToString(),
                ProdutoNome = produto?.Nome ?? "Produto não encontrado",
                FornecedorNome = fornecedor?.Nome ?? "Fornecedor não encontrado"
            };
        }


        public async Task<bool> Excluir(string hashId)
        {
            var produtoFornecedor = await _context.ProdutoFornecedores
                .FirstOrDefaultAsync(pf => pf.HashId.ToString() == hashId);

            if (produtoFornecedor == null) return false;

            _context.ProdutoFornecedores.Remove(produtoFornecedor);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
