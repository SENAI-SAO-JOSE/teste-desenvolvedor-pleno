using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Repositories.Interfaces
{
    public interface IProdutoFornecedorRepository
    {
        Task<IEnumerable<ProdutoFornecedorDto>> ObterTodos();
        Task<ProdutoFornecedorDto> ObterPorId(string hashId);
        Task<IEnumerable<ProdutoFornecedorDto>> ObterFornecedoresPorProduto(string produtoHashId);
        Task<ProdutoFornecedorDto> Criar(ProdutoFornecedor produtoFornecedor);
        Task<bool> Excluir(string hashId);
    }
}
