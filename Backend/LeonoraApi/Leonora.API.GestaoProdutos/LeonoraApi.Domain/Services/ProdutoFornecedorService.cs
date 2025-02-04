using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using LeonoraApi.Domain.Repositories.Interfaces;
using LeonoraApi.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Services
{
    public class ProdutoFornecedorService : IProdutoFornecedorService
    {
        private readonly IProdutoFornecedorRepository _repository;
        private readonly IUsuarioService _usuarioService;

        public ProdutoFornecedorService(IProdutoFornecedorRepository repository, IUsuarioService usuarioService)
        {
            _repository = repository;
            _usuarioService = usuarioService;
        }

        public async Task<IEnumerable<ProdutoFornecedorDto>> ObterTodos()
        {
            return await _repository.ObterTodos();
        }

        public async Task<ProdutoFornecedorDto> ObterPorId(string hashId)
        {
            return await _repository.ObterPorId(hashId);
        }

        public async Task<IEnumerable<ProdutoFornecedorDto>> ObterFornecedoresPorProduto(string produtoHashId)
        {
            return await _repository.ObterFornecedoresPorProduto(produtoHashId);
        }

        public async Task<ProdutoFornecedorDto> Criar(ProdutoFornecedor produtoFornecedor)
        {
            var user = await _usuarioService.ObterUsuarioLogado();
            produtoFornecedor.CriadoPor = user.HashId;
            produtoFornecedor.CriadoEm = DateTime.Now;

            return await _repository.Criar(produtoFornecedor);
        }

        public async Task<bool> Excluir(string hashId)
        {
            return await _repository.Excluir(hashId);
        }
    }
}
