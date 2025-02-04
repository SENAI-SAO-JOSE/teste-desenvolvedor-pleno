using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeonoraApi.Domain.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<UsuarioDto>> ObterTodos();
        Task<UsuarioDto> ObterPorId(string hashId);
        Task<UsuarioDto> ObterPorLoginSenha(string login, string senha);
        Task<Usuario> ObterUsuarioLogado();
        Task<Usuario> Criar(Usuario usuario);
        Task<Usuario> Alterar(Usuario usuario);
        Task<bool> Excluir(string hashId);
    }
}
