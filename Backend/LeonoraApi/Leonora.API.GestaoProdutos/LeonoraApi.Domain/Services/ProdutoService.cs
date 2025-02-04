using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using LeonoraApi.Domain.Repositories.Interfaces;
using LeonoraApi.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IProdutoRepository _repository;
        private readonly IUsuarioService _usuarioService;

        public ProdutoService(IProdutoRepository repository, IUsuarioService usuarioService)
        {
            _repository = repository;
            _usuarioService = usuarioService;
        }

        public async Task<IEnumerable<ProdutoDto>> ObterTodos()
        {
            return await _repository.ObterTodos();
        }

        public async Task<ProdutoDto> ObterPorId(string hashId)
        {
            return await _repository.ObterPorId(hashId);
        }

        public async Task<Produto> Criar(Produto produto)
        {
            var user = await _usuarioService.ObterUsuarioLogado();
            produto.CriadoPor = user.HashId;
            produto.CriadoEm = DateTime.Now;

            return await _repository.Criar(produto);
        }

        public async Task<Produto> Alterar(Produto produto)
        {
            var user = await _usuarioService.ObterUsuarioLogado();
            produto.AlteradoPor = user.HashId;
            produto.AlteradoEm = DateTime.Now;

            return await _repository.Alterar(produto);
        }

        public async Task<bool> Excluir(string hashId)
        {
            return await _repository.Excluir(hashId);
        }
    }
}
