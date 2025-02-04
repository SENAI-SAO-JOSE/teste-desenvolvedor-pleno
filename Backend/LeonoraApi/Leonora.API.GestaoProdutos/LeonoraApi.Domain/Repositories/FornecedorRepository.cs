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
    public class FornecedorRepository : IFornecedorRepository
    {
        private readonly ApiContext _context;

        public FornecedorRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FornecedorDto>> ObterTodos()
        {
            return await _context.Fornecedores
                .Select(f => new FornecedorDto
                {
                    HashId = f.HashId.ToString(),
                    Codigo = f.Codigo,
                    Nome = f.Nome,
                    Cnpj = f.Cnpj,
                    Telefone = f.Telefone,
                    Endereco = f.Endereco
                })
                .ToListAsync();
        }

        public async Task<FornecedorDto> ObterPorId(string hashId)
        {
            return await _context.Fornecedores
                .Where(f => f.HashId.ToString() == hashId)
                .Select(f => new FornecedorDto
                {
                    HashId = f.HashId.ToString(),
                    Codigo = f.Codigo,
                    Nome = f.Nome,
                    Cnpj = f.Cnpj,
                    Telefone = f.Telefone,
                    Endereco = f.Endereco
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Fornecedor> Criar(Fornecedor fornecedor)
        {
            _context.Fornecedores.Add(fornecedor);
            await _context.SaveChangesAsync();
            return fornecedor;
        }

        public async Task<Fornecedor> Alterar(Fornecedor fornecedor)
        {
            var fornecedorExistente = await _context.Fornecedores.FindAsync(fornecedor.HashId);
            if (fornecedorExistente == null) return null;

            fornecedorExistente.Nome = fornecedor.Nome;
            fornecedorExistente.Cnpj = fornecedor.Cnpj;
            fornecedorExistente.Telefone = fornecedor.Telefone;
            fornecedorExistente.Endereco = fornecedor.Endereco;

            await _context.SaveChangesAsync();
            return fornecedorExistente;
        }

        public async Task<bool> Excluir(string hashId)
        {
            var fornecedor = await _context.Fornecedores.FirstOrDefaultAsync(f => f.HashId.ToString() == hashId);
            if (fornecedor == null) return false;

            _context.Fornecedores.Remove(fornecedor);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
