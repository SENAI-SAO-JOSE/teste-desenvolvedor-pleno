using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using LeonoraApi.Domain.Repositories.Interfaces;
using LeonoraApi.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Services
{
    public class FornecedorService : IFornecedorService
    {
        private readonly IFornecedorRepository _repository;
        private readonly IUsuarioService _usuarioService;

        public FornecedorService(IFornecedorRepository repository, IUsuarioService usuarioService)
        {
            _repository = repository;
            _usuarioService = usuarioService;
        }

        public async Task<IEnumerable<FornecedorDto>> ObterTodos()
        {
            return await _repository.ObterTodos();
        }

        public async Task<FornecedorDto> ObterPorId(string hashId)
        {
            return await _repository.ObterPorId(hashId);
        }

        public async Task<Fornecedor> Criar(Fornecedor fornecedor)
        {
            var user = await _usuarioService.ObterUsuarioLogado();
            fornecedor.CriadoPor = user.HashId;
            fornecedor.CriadoEm = DateTime.Now;

            return await _repository.Criar(fornecedor);
        }

        public async Task<Fornecedor> Alterar(Fornecedor fornecedor)
        {
            var user = await _usuarioService.ObterUsuarioLogado();
            fornecedor.AlteradoPor = user.HashId;
            fornecedor.AlteradoEm = DateTime.Now;

            return await _repository.Alterar(fornecedor);
        }

        public async Task<bool> Excluir(string hashId)
        {
            return await _repository.Excluir(hashId);
        }
    }
}
