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
    public class CategoriaControllerTests
    {
        private readonly Mock<ICategoriaService> _mockService;
        private readonly CategoriaController _controller;

        public CategoriaControllerTests()
        {
            _mockService = new Mock<ICategoriaService>();
            _controller = new CategoriaController(_mockService.Object);
        }

        [Fact]
        public async Task FluxoCompleto_Criar_ObterPorId_Alterar_Excluir_DeveRetornarOk()
        {
            
            var novaCategoriaDto = new CategoriaDto { Nome = "Nova Categoria", Codigo = 200, Descricao = "Criada no teste" };
            var novaCategoria = new Categoria
            {
                HashId = System.Guid.NewGuid(),
                Nome = novaCategoriaDto.Nome,
                Codigo = novaCategoriaDto.Codigo,
                Descricao = novaCategoriaDto.Descricao
            };

            _mockService.Setup(s => s.Criar(It.IsAny<Categoria>())).ReturnsAsync(novaCategoria);

            var createResult = await _controller.Create(novaCategoriaDto);
            Assert.NotNull(createResult);
            Assert.IsType<OkResult>(createResult);

            
            var categorias = new List<CategoriaDto>
            {
                new CategoriaDto { HashId = novaCategoria.HashId.ToString(), Nome = novaCategoria.Nome, Codigo = novaCategoria.Codigo, Descricao = novaCategoria.Descricao }
            };

            _mockService.Setup(s => s.ObterTodos()).ReturnsAsync(categorias);

            var getAllResult = await _controller.GetAll();
            Assert.NotNull(getAllResult.Result);
            var okResult = Assert.IsType<OkObjectResult>(getAllResult.Result);
            var listaCategorias = Assert.IsType<List<CategoriaDto>>(okResult.Value);
            Assert.NotEmpty(listaCategorias);

           
            var categoriaSelecionada = listaCategorias.First();
            _mockService.Setup(s => s.ObterPorId(categoriaSelecionada.HashId)).ReturnsAsync(categoriaSelecionada);

            var getByIdResult = await _controller.GetById(categoriaSelecionada.HashId);
            Assert.NotNull(getByIdResult.Result);
            var okGetById = Assert.IsType<OkObjectResult>(getByIdResult.Result);
            var categoriaObtida = Assert.IsType<CategoriaDto>(okGetById.Value);

            Assert.Equal(categoriaSelecionada.HashId, categoriaObtida.HashId);
            Assert.Equal(categoriaSelecionada.Nome, categoriaObtida.Nome);

           
            categoriaObtida.Nome = "Atualizado";
            categoriaObtida.Descricao = "Categoria atualizada";

            _mockService.Setup(s => s.Alterar(It.IsAny<Categoria>())).ReturnsAsync(new Categoria
            {
                HashId = System.Guid.Parse(categoriaObtida.HashId),
                Nome = categoriaObtida.Nome,
                Codigo = categoriaObtida.Codigo,
                Descricao = categoriaObtida.Descricao
            });

            var updateResult = await _controller.Update(categoriaObtida.HashId, categoriaObtida);
            Assert.NotNull(updateResult);
            Assert.IsType<OkResult>(updateResult);

            
            var getAllAfterUpdateResult = await _controller.GetAll();
            Assert.NotNull(getAllAfterUpdateResult.Result);
            var okResultAfterUpdate = Assert.IsType<OkObjectResult>(getAllAfterUpdateResult.Result);
            var listaCategoriasAtualizada = Assert.IsType<List<CategoriaDto>>(okResultAfterUpdate.Value);
            Assert.NotEmpty(listaCategoriasAtualizada);

            var categoriaParaExcluir = listaCategoriasAtualizada.First();
            _mockService.Setup(s => s.Excluir(categoriaParaExcluir.HashId)).ReturnsAsync(true);

            var deleteResult = await _controller.Delete(categoriaParaExcluir.HashId);
            Assert.NotNull(deleteResult);
            var okDeleteResult = Assert.IsType<OkObjectResult>(deleteResult);
            Assert.True((bool)okDeleteResult.Value);
        }
    }
}
