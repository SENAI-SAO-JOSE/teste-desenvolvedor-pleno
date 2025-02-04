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
    public class ProdutoControllerTests
    {
        private readonly Mock<IProdutoService> _mockService;
        private readonly ProdutoController _controller;

        public ProdutoControllerTests()
        {
            _mockService = new Mock<IProdutoService>();
            _controller = new ProdutoController(_mockService.Object);
        }

        [Fact]
        public async Task FluxoCompleto_Criar_ObterPorId_Alterar_Excluir_DeveRetornarOk()
        {
           
            var novoProdutoDto = new ProdutoDto
            {
                Nome = "Novo Produto",
                Codigo = 400,
                Descricao = "Produto criado no teste",
                Preco = 99.99M,
                CategoriaId = "1",
                NomeCategoria = "Eletrônicos"
            };

            var novoProduto = new Produto
            {
                HashId = System.Guid.NewGuid(),
                Nome = novoProdutoDto.Nome,
                Codigo = novoProdutoDto.Codigo,
                Descricao = novoProdutoDto.Descricao,
                Preco = novoProdutoDto.Preco,
                CategoriaId = System.Guid.Parse(novoProdutoDto.CategoriaId),
                IsDeleted = false
            };

            _mockService.Setup(s => s.Criar(It.IsAny<Produto>())).ReturnsAsync(novoProduto);

            var createResult = await _controller.Create(novoProdutoDto);
            Assert.NotNull(createResult);
            Assert.IsType<OkResult>(createResult);

           
            var produtos = new List<ProdutoDto>
            {
                new ProdutoDto
                {
                    HashId = novoProduto.HashId.ToString(),
                    Nome = novoProduto.Nome,
                    Codigo = novoProduto.Codigo,
                    Descricao = novoProduto.Descricao,
                    Preco = novoProduto.Preco,
                    CategoriaId = novoProduto.CategoriaId.ToString(),
                    NomeCategoria = "Eletrônicos"
                }
            };

            _mockService.Setup(s => s.ObterTodos()).ReturnsAsync(produtos);

            var getAllResult = await _controller.GetAll();
            Assert.NotNull(getAllResult.Result);
            var okResult = Assert.IsType<OkObjectResult>(getAllResult.Result);
            var listaProdutos = Assert.IsType<List<ProdutoDto>>(okResult.Value);
            Assert.NotEmpty(listaProdutos);

           
            var produtoSelecionado = listaProdutos.First();
            _mockService.Setup(s => s.ObterPorId(produtoSelecionado.HashId)).ReturnsAsync(produtoSelecionado);

            var getByIdResult = await _controller.GetById(produtoSelecionado.HashId);
            Assert.NotNull(getByIdResult.Result);
            var okGetById = Assert.IsType<OkObjectResult>(getByIdResult.Result);
            var produtoObtido = Assert.IsType<ProdutoDto>(okGetById.Value);

            Assert.Equal(produtoSelecionado.HashId, produtoObtido.HashId);
            Assert.Equal(produtoSelecionado.Nome, produtoObtido.Nome);

            
            produtoObtido.Nome = "Atualizado";
            produtoObtido.Preco = 79.99M;

            _mockService.Setup(s => s.Alterar(It.IsAny<Produto>())).ReturnsAsync(new Produto
            {
                HashId = System.Guid.Parse(produtoObtido.HashId),
                Nome = produtoObtido.Nome,
                Codigo = produtoObtido.Codigo,
                Descricao = produtoObtido.Descricao,
                Preco = produtoObtido.Preco,
                CategoriaId = System.Guid.Parse(produtoObtido.CategoriaId),
                IsDeleted = false
            });

            var updateResult = await _controller.Update(produtoObtido.HashId, produtoObtido);
            Assert.NotNull(updateResult);
            Assert.IsType<OkResult>(updateResult);

           
            var getAllAfterUpdateResult = await _controller.GetAll();
            Assert.NotNull(getAllAfterUpdateResult.Result);
            var okResultAfterUpdate = Assert.IsType<OkObjectResult>(getAllAfterUpdateResult.Result);
            var listaProdutosAtualizada = Assert.IsType<List<ProdutoDto>>(okResultAfterUpdate.Value);
            Assert.NotEmpty(listaProdutosAtualizada);

            var produtoParaExcluir = listaProdutosAtualizada.First();
            _mockService.Setup(s => s.Excluir(produtoParaExcluir.HashId)).ReturnsAsync(true);

            var deleteResult = await _controller.Delete(produtoParaExcluir.HashId);
            Assert.NotNull(deleteResult);
            var okDeleteResult = Assert.IsType<OkObjectResult>(deleteResult);
            Assert.True((bool)okDeleteResult.Value);
        }
    }
}
