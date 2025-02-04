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
    public class ProdutoFornecedorControllerTests
    {
        private readonly Mock<IProdutoFornecedorService> _mockService;
        private readonly ProdutoFornecedorController _controller;

        public ProdutoFornecedorControllerTests()
        {
            _mockService = new Mock<IProdutoFornecedorService>();
            _controller = new ProdutoFornecedorController(_mockService.Object);
        }

        [Fact]
        public async Task FluxoCompleto_Criar_ObterPorId_ObterPorProduto_Excluir_DeveRetornarOk()
        {
           //TODO: rever esse teste
            var novoProdutoFornecedorDto = new ProdutoFornecedorDto
            {
                ProdutoHashId = "1",
                FornecedorHashId = "2",
                ProdutoNome = "Notebook",
                FornecedorNome = "TechSupply"
            };

            var novoProdutoFornecedor = new ProdutoFornecedor
            {
                HashId = System.Guid.NewGuid(),
                ProdutoId = System.Guid.Parse(novoProdutoFornecedorDto.ProdutoHashId),
                FornecedorId = System.Guid.Parse(novoProdutoFornecedorDto.FornecedorHashId)
            };

           // _mockService.Setup(s => s.Criar(It.IsAny<ProdutoFornecedor>())).ReturnsAsync(novoProdutoFornecedor);

            var createResult = await _controller.Create(novoProdutoFornecedorDto);
            Assert.NotNull(createResult);
            Assert.IsType<OkResult>(createResult);

            
            var produtoFornecedores = new List<ProdutoFornecedorDto>
            {
                new ProdutoFornecedorDto
                {
                    HashId = novoProdutoFornecedor.HashId.ToString(),
                    ProdutoHashId = novoProdutoFornecedor.ProdutoId.ToString(),
                    FornecedorHashId = novoProdutoFornecedor.FornecedorId.ToString(),
                    ProdutoNome = "Notebook",
                    FornecedorNome = "TechSupply"
                }
            };

            _mockService.Setup(s => s.ObterTodos()).ReturnsAsync(produtoFornecedores);

            var getAllResult = await _controller.GetAll();
            Assert.NotNull(getAllResult.Result);
            var okResult = Assert.IsType<OkObjectResult>(getAllResult.Result);
            var listaProdutoFornecedores = Assert.IsType<List<ProdutoFornecedorDto>>(okResult.Value);
            Assert.NotEmpty(listaProdutoFornecedores);

            
            var produtoFornecedorSelecionado = listaProdutoFornecedores.First();
            _mockService.Setup(s => s.ObterPorId(produtoFornecedorSelecionado.HashId))
                        .ReturnsAsync(produtoFornecedorSelecionado);

            var getByIdResult = await _controller.GetById(produtoFornecedorSelecionado.HashId);
            Assert.NotNull(getByIdResult.Result);
            var okGetById = Assert.IsType<OkObjectResult>(getByIdResult.Result);
            var produtoFornecedorObtido = Assert.IsType<ProdutoFornecedorDto>(okGetById.Value);

            Assert.Equal(produtoFornecedorSelecionado.ProdutoHashId, produtoFornecedorObtido.ProdutoHashId);
            Assert.Equal(produtoFornecedorSelecionado.FornecedorHashId, produtoFornecedorObtido.FornecedorHashId);

           
            _mockService.Setup(s => s.ObterFornecedoresPorProduto(produtoFornecedorSelecionado.ProdutoHashId))
                        .ReturnsAsync(new List<ProdutoFornecedorDto> { produtoFornecedorSelecionado });

            var getFornecedoresPorProdutoResult = await _controller.GetFornecedoresPorProduto(produtoFornecedorSelecionado.ProdutoHashId);
            Assert.NotNull(getFornecedoresPorProdutoResult.Result);
            var okGetFornecedores = Assert.IsType<OkObjectResult>(getFornecedoresPorProdutoResult.Result);
            var fornecedoresObtidos = Assert.IsType<List<ProdutoFornecedorDto>>(okGetFornecedores.Value);

            Assert.NotEmpty(fornecedoresObtidos);
            Assert.Equal(produtoFornecedorSelecionado.ProdutoHashId, fornecedoresObtidos.First().ProdutoHashId);

           
            var getAllAfterUpdateResult = await _controller.GetAll();
            Assert.NotNull(getAllAfterUpdateResult.Result);
            var okResultAfterUpdate = Assert.IsType<OkObjectResult>(getAllAfterUpdateResult.Result);
            var listaProdutoFornecedoresAtualizada = Assert.IsType<List<ProdutoFornecedorDto>>(okResultAfterUpdate.Value);
            Assert.NotEmpty(listaProdutoFornecedoresAtualizada);

            var produtoFornecedorParaExcluir = listaProdutoFornecedoresAtualizada.First();
            _mockService.Setup(s => s.Excluir(produtoFornecedorParaExcluir.HashId)).ReturnsAsync(true);

            var deleteResult = await _controller.Delete(produtoFornecedorParaExcluir.HashId);
            Assert.NotNull(deleteResult);
            var okDeleteResult = Assert.IsType<OkObjectResult>(deleteResult);
            Assert.True((bool)okDeleteResult.Value);
        }
    }
}
