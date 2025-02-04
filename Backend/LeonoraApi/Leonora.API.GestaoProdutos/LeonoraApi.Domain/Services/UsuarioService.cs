using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using LeonoraApi.Domain.Repositories.Interfaces;
using LeonoraApi.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _repository;

        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<UsuarioDto>> ObterTodos()
        {
            return await _repository.ObterTodos();
        }

        public async Task<UsuarioDto> ObterPorId(string hashId)
        {
            return await _repository.ObterPorId(hashId);
        }

        public async Task<UsuarioDto> ObterPorLoginSenha(string login, string senha)
        {
            return await _repository.ObterPorLoginSenha(login, senha);
        }

        public async Task<Usuario> ObterUsuarioLogado()
        {
            return await _repository.ObterUsuarioLogado();
        }

        public async Task<Usuario> Criar(Usuario usuario)
        {
            var user = await ObterUsuarioLogado();
            usuario.CriadoPor = user.HashId;
            usuario.CriadoEm = DateTime.Now;

            return await _repository.Criar(usuario);
        }

        public async Task<Usuario> Alterar(Usuario usuario)
        {
            var user = await ObterUsuarioLogado();
            usuario.AlteradoPor = user.HashId;
            usuario.AlteradoEm = DateTime.Now;

            return await _repository.Alterar(usuario);
        }

        public async Task<bool> Excluir(string hashId)
        {
            return await _repository.Excluir(hashId);
        }
    }
}
