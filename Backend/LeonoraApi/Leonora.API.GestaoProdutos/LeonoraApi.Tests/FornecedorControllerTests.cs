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
    public class FornecedorControllerTests
    {
        private readonly Mock<IFornecedorService> _mockService;
        private readonly FornecedorController _controller;

        public FornecedorControllerTests()
        {
            _mockService = new Mock<IFornecedorService>();
            _controller = new FornecedorController(_mockService.Object);
        }

        [Fact]
        public async Task FluxoCompleto_Criar_ObterPorId_Alterar_Excluir_DeveRetornarOk()
        {
            
            var novoFornecedorDto = new FornecedorDto { Nome = "Novo Fornecedor", Codigo = 300, Cnpj = "12.345.678/0001-99", Telefone = "99999-9999", Endereco = "Rua A, 123" };
            var novoFornecedor = new Fornecedor
            {
                HashId = System.Guid.NewGuid(),
                Nome = novoFornecedorDto.Nome,
                Codigo = novoFornecedorDto.Codigo,
                Cnpj = novoFornecedorDto.Cnpj,
                Telefone = novoFornecedorDto.Telefone,
                Endereco = novoFornecedorDto.Endereco
            };

            _mockService.Setup(s => s.Criar(It.IsAny<Fornecedor>())).ReturnsAsync(novoFornecedor);

            var createResult = await _controller.Create(novoFornecedorDto);
            Assert.NotNull(createResult);
            Assert.IsType<OkResult>(createResult);

           
            var fornecedores = new List<FornecedorDto>
            {
                new FornecedorDto { HashId = novoFornecedor.HashId.ToString(), Nome = novoFornecedor.Nome, Codigo = novoFornecedor.Codigo, Cnpj = novoFornecedor.Cnpj, Telefone = novoFornecedor.Telefone, Endereco = novoFornecedor.Endereco }
            };

            _mockService.Setup(s => s.ObterTodos()).ReturnsAsync(fornecedores);

            var getAllResult = await _controller.GetAll();
            Assert.NotNull(getAllResult.Result);
            var okResult = Assert.IsType<OkObjectResult>(getAllResult.Result);
            var listaFornecedores = Assert.IsType<List<FornecedorDto>>(okResult.Value);
            Assert.NotEmpty(listaFornecedores);

            
            var fornecedorSelecionado = listaFornecedores.First();
            _mockService.Setup(s => s.ObterPorId(fornecedorSelecionado.HashId)).ReturnsAsync(fornecedorSelecionado);

            var getByIdResult = await _controller.GetById(fornecedorSelecionado.HashId);
            Assert.NotNull(getByIdResult.Result);
            var okGetById = Assert.IsType<OkObjectResult>(getByIdResult.Result);
            var fornecedorObtido = Assert.IsType<FornecedorDto>(okGetById.Value);

            Assert.Equal(fornecedorSelecionado.HashId, fornecedorObtido.HashId);
            Assert.Equal(fornecedorSelecionado.Nome, fornecedorObtido.Nome);

            
            fornecedorObtido.Nome = "Atualizado";
            fornecedorObtido.Telefone = "88888-8888";

            _mockService.Setup(s => s.Alterar(It.IsAny<Fornecedor>())).ReturnsAsync(new Fornecedor
            {
                HashId = System.Guid.Parse(fornecedorObtido.HashId),
                Nome = fornecedorObtido.Nome,
                Codigo = fornecedorObtido.Codigo,
                Cnpj = fornecedorObtido.Cnpj,
                Telefone = fornecedorObtido.Telefone,
                Endereco = fornecedorObtido.Endereco
            });

            var updateResult = await _controller.Update(fornecedorObtido.HashId, fornecedorObtido);
            Assert.NotNull(updateResult);
            Assert.IsType<OkResult>(updateResult);

            
            var getAllAfterUpdateResult = await _controller.GetAll();
            Assert.NotNull(getAllAfterUpdateResult.Result);
            var okResultAfterUpdate = Assert.IsType<OkObjectResult>(getAllAfterUpdateResult.Result);
            var listaFornecedoresAtualizada = Assert.IsType<List<FornecedorDto>>(okResultAfterUpdate.Value);
            Assert.NotEmpty(listaFornecedoresAtualizada);

            var fornecedorParaExcluir = listaFornecedoresAtualizada.First();
            _mockService.Setup(s => s.Excluir(fornecedorParaExcluir.HashId)).ReturnsAsync(true);

            var deleteResult = await _controller.Delete(fornecedorParaExcluir.HashId);
            Assert.NotNull(deleteResult);
            var okDeleteResult = Assert.IsType<OkObjectResult>(deleteResult);
            Assert.True((bool)okDeleteResult.Value);
        }
    }
}
