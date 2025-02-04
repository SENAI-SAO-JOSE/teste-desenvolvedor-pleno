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
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly ApiContext _context;

        public CategoriaRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CategoriaDto>> ObterTodos()
        {
            return await _context.Categorias
                .Select(c => new CategoriaDto
                {
                    HashId = c.HashId.ToString(),
                    Codigo = c.Codigo,
                    Nome = c.Nome,
                    Descricao = c.Descricao
                })
                .ToListAsync();
        }

        public async Task<CategoriaDto> ObterPorId(string hashId)
        {
            return await _context.Categorias
                .Where(c => c.HashId.ToString() == hashId)
                .Select(c => new CategoriaDto
                {
                    HashId = c.HashId.ToString(),
                    Codigo = c.Codigo,
                    Nome = c.Nome,
                    Descricao = c.Descricao
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Categoria> Criar(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return categoria;
        }

        public async Task<Categoria> Alterar(Categoria categoria)
        {
            var categoriaExistente = await _context.Categorias.FindAsync(categoria.HashId);
            if (categoriaExistente == null) return null;

            categoriaExistente.Nome = categoria.Nome;
            categoriaExistente.Descricao = categoria.Descricao;

            await _context.SaveChangesAsync();
            return categoriaExistente;
        }

        public async Task<bool> Excluir(string hashId)
        {
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.HashId.ToString() == hashId);
            if (categoria == null) return false;

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
