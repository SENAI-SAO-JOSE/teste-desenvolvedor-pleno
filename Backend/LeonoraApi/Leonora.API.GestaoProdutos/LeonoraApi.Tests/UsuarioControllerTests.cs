using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using LeonoraApi.Domain.Services.Interfaces;
using LeonoraApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace LeonoraApi.Tests
{
    public class UsuarioControllerTests
    {
        private readonly Mock<IUsuarioService> _mockService;
        private readonly UsuarioController _controller;

        public UsuarioControllerTests()
        {
            _mockService = new Mock<IUsuarioService>();
            _controller = new UsuarioController(_mockService.Object);
        }

        [Fact]
        public async Task FluxoCompleto_Criar_ObterPorId_Alterar_Excluir_DeveRetornarOk()
        {
            
            var novoUsuarioDto = new UsuarioDto
            {
                Nome = "Novo Usuario",
                Codigo = 500,
                Login = "usuario_teste",
                Senha = "123456",
                Cpf = "123.456.789-00",
                IsAtivo = true
            };

            var novoUsuario = new Usuario
            {
                HashId = System.Guid.NewGuid(),
                Nome = novoUsuarioDto.Nome,
                Codigo = novoUsuarioDto.Codigo,
                Login = novoUsuarioDto.Login,
                Senha = novoUsuarioDto.Senha,
                Cpf = novoUsuarioDto.Cpf,
                IsAtivo = novoUsuarioDto.IsAtivo
            };

            _mockService.Setup(s => s.Criar(It.IsAny<Usuario>())).ReturnsAsync(novoUsuario);

            var createResult = await _controller.Create(novoUsuarioDto);
            Assert.NotNull(createResult);
            Assert.IsType<OkResult>(createResult);

            
            var usuarios = new List<UsuarioDto>
            {
                new UsuarioDto
                {
                    HashId = novoUsuario.HashId.ToString(),
                    Nome = novoUsuario.Nome,
                    Codigo = novoUsuario.Codigo,
                    Login = novoUsuario.Login,
                    Senha = novoUsuario.Senha,
                    Cpf = novoUsuario.Cpf,
                    IsAtivo = novoUsuario.IsAtivo
                }
            };

            _mockService.Setup(s => s.ObterTodos()).ReturnsAsync(usuarios);

            var getAllResult = await _controller.GetAll();
            Assert.NotNull(getAllResult.Result);
            var okResult = Assert.IsType<OkObjectResult>(getAllResult.Result);
            var listaUsuarios = Assert.IsType<List<UsuarioDto>>(okResult.Value);
            Assert.NotEmpty(listaUsuarios);

            
            var usuarioSelecionado = listaUsuarios.First();
            _mockService.Setup(s => s.ObterPorId(usuarioSelecionado.HashId)).ReturnsAsync(usuarioSelecionado);

            var getByIdResult = await _controller.GetById(usuarioSelecionado.HashId);
            Assert.NotNull(getByIdResult.Result);
            var okGetById = Assert.IsType<OkObjectResult>(getByIdResult.Result);
            var usuarioObtido = Assert.IsType<UsuarioDto>(okGetById.Value);

            Assert.Equal(usuarioSelecionado.HashId, usuarioObtido.HashId);
            Assert.Equal(usuarioSelecionado.Nome, usuarioObtido.Nome);

            
            usuarioObtido.Nome = "Usuario Atualizado";
            usuarioObtido.Login = "novo_login";

            _mockService.Setup(s => s.Alterar(It.IsAny<Usuario>())).ReturnsAsync(new Usuario
            {
                HashId = System.Guid.Parse(usuarioObtido.HashId),
                Nome = usuarioObtido.Nome,
                Codigo = usuarioObtido.Codigo,
                Login = usuarioObtido.Login,
                Senha = usuarioObtido.Senha,
                Cpf = usuarioObtido.Cpf,
                IsAtivo = usuarioObtido.IsAtivo
            });

            var updateResult = await _controller.Update(usuarioObtido.HashId, usuarioObtido);
            Assert.NotNull(updateResult);
            Assert.IsType<OkResult>(updateResult);

            
            var getAllAfterUpdateResult = await _controller.GetAll();
            Assert.NotNull(getAllAfterUpdateResult.Result);
            var okResultAfterUpdate = Assert.IsType<OkObjectResult>(getAllAfterUpdateResult.Result);
            var listaUsuariosAtualizada = Assert.IsType<List<UsuarioDto>>(okResultAfterUpdate.Value);
            Assert.NotEmpty(listaUsuariosAtualizada);

            var usuarioParaExcluir = listaUsuariosAtualizada.First();
            _mockService.Setup(s => s.Excluir(usuarioParaExcluir.HashId)).ReturnsAsync(true);

            var deleteResult = await _controller.Delete(usuarioParaExcluir.HashId);
            Assert.NotNull(deleteResult);
            var okDeleteResult = Assert.IsType<OkObjectResult>(deleteResult);
            Assert.True((bool)okDeleteResult.Value);
        }
    }
}
