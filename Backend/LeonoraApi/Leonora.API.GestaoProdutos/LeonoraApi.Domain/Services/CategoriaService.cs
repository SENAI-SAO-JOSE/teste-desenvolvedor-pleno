using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using LeonoraApi.Domain.Repositories.Interfaces;
using LeonoraApi.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _repository;
        private readonly IUsuarioService _usuarioService;

        public CategoriaService(ICategoriaRepository repository, IUsuarioService usuarioService)
        {
            _repository = repository;
            _usuarioService = usuarioService;
        }

        public async Task<IEnumerable<CategoriaDto>> ObterTodos()
        {
            return await _repository.ObterTodos();
        }

        public async Task<CategoriaDto> ObterPorId(string hashId)
        {
            return await _repository.ObterPorId(hashId);
        }

        public async Task<Categoria> Criar(Categoria categoria)
        {
            var user = await _usuarioService.ObterUsuarioLogado();
            categoria.CriadoPor = user.HashId;
            categoria.CriadoEm = DateTime.Now;

            return await _repository.Criar(categoria);
        }

        public async Task<Categoria> Alterar(Categoria categoria)
        {
            var user = await _usuarioService.ObterUsuarioLogado();
            categoria.AlteradoPor = user.HashId;
            categoria.AlteradoEm = DateTime.Now;

            return await _repository.Alterar(categoria);
        }

        public async Task<bool> Excluir(string hashId)
        {
            return await _repository.Excluir(hashId);
        }
    }
}
