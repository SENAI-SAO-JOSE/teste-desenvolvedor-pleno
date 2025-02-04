using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;


namespace LeonoraApi.Domain.Services.Interfaces
{
    public interface IProdutoFornecedorService
    {
        Task<IEnumerable<ProdutoFornecedorDto>> ObterTodos();
        Task<ProdutoFornecedorDto> ObterPorId(string hashId);
        Task<IEnumerable<ProdutoFornecedorDto>> ObterFornecedoresPorProduto(string produtoHashId);
        Task<ProdutoFornecedorDto> Criar(ProdutoFornecedor produtoFornecedor);
        Task<bool> Excluir(string hashId);
    }
}
