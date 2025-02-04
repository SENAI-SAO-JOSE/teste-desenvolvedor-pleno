using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Repositories.Interfaces
{
    public interface IFornecedorRepository
    {
        Task<IEnumerable<FornecedorDto>> ObterTodos();
        Task<FornecedorDto> ObterPorId(string hashId);
        Task<Fornecedor> Criar(Fornecedor fornecedor);
        Task<Fornecedor> Alterar(Fornecedor fornecedor);
        Task<bool> Excluir(string hashId);
    }
}
