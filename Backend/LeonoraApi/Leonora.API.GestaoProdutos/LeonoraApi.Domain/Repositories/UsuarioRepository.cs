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
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly ApiContext _context;

        public UsuarioRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UsuarioDto>> ObterTodos()
        {
            return await _context.Usuarios
                .Select(u => new UsuarioDto
                {
                    HashId = u.HashId.ToString(),
                    Nome = u.Nome,
                    Login = u.Login,
                    Senha = u.Senha,
                    Cpf = u.Cpf,
                    Codigo = u.Codigo,
                    IsAtivo = u.IsAtivo
                })
                .ToListAsync();
        }

        public async Task<UsuarioDto> ObterPorId(string hashId)
        {
            return await _context.Usuarios
                .Where(u => u.HashId.ToString() == hashId)
                .Select(u => new UsuarioDto
                {
                    HashId = u.HashId.ToString(),
                    Nome = u.Nome,
                    Login = u.Login,
                    Senha = u.Senha,
                    Cpf = u.Cpf,
                    Codigo = u.Codigo,
                    IsAtivo = u.IsAtivo
                })
                .FirstOrDefaultAsync();
        }

        public async Task<UsuarioDto> ObterPorLoginSenha(string login, string senha)
        {
            return await _context.Usuarios
                .Where(u => u.Login == login && u.Senha == senha)
                .Select(u => new UsuarioDto
                {
                    HashId = u.HashId.ToString(),
                    Nome = u.Nome,
                    Login = u.Login,
                    Senha = u.Senha,
                    Cpf = u.Cpf,
                    Codigo = u.Codigo,
                    IsAtivo = u.IsAtivo
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Usuario> ObterUsuarioLogado()
        {
            var todos = await _context.Usuarios.ToListAsync();
            return todos.FirstOrDefault();
        }

        public async Task<Usuario> Criar(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario> Alterar(Usuario usuario)
        {
            var usuarioExistente = await _context.Usuarios.FindAsync(usuario.HashId);
            if (usuarioExistente == null) return null;

            usuarioExistente.Nome = usuario.Nome;
            usuarioExistente.Login = usuario.Login;
            usuarioExistente.Senha = usuario.Senha;
            usuarioExistente.IsAtivo = usuario.IsAtivo;
            usuarioExistente.Codigo = usuario.Codigo;
            usuarioExistente.Cpf = usuario.Cpf;
            usuarioExistente.AlteradoPor = usuario.AlteradoPor;
            usuarioExistente.AlteradoEm = usuario.AlteradoEm;


            await _context.SaveChangesAsync();
            return usuarioExistente;
        }
        

        public async Task<bool> Excluir(string hashId)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.HashId.ToString() == hashId);
            if (usuario == null) return false;

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
