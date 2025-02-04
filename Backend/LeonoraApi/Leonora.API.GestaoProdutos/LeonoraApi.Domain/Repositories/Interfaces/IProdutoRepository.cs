using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Repositories.Interfaces
{
    public interface IProdutoRepository
    {
        Task<IEnumerable<ProdutoDto>> ObterTodos();
        Task<ProdutoDto> ObterPorId(string hashId);
        Task<Produto> Criar(Produto produto);
        Task<Produto> Alterar(Produto produto);
        Task<bool> Excluir(string hashId);
    }
}
