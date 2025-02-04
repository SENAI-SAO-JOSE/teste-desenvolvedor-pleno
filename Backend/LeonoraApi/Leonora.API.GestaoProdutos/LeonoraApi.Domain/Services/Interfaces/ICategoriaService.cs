using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Services.Interfaces
{
    public interface ICategoriaService
    {
        Task<IEnumerable<CategoriaDto>> ObterTodos();
        Task<CategoriaDto> ObterPorId(string hashId);
        Task<Categoria> Criar(Categoria categoria);
        Task<Categoria> Alterar(Categoria categoria);
        Task<bool> Excluir(string hashId);
    }
}
