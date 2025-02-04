using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LeonoraApi.Domain.Services.Interfaces;
using LeonoraApi.Data.Models;
using LeonoraApi.Data.DTOs;


namespace LeonoraApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoFornecedorController : ControllerBase
    {
        private readonly IProdutoFornecedorService _service;

        public ProdutoFornecedorController(IProdutoFornecedorService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProdutoFornecedorDto>>> GetAll()
        {
            var produtosFornecedores = await _service.ObterTodos();
            return Ok(produtosFornecedores);
        }

        [Authorize]
        [HttpGet("{hashId}")]
        public async Task<ActionResult<ProdutoFornecedorDto>> GetById(string hashId)
        {
            var produtoFornecedor = await _service.ObterPorId(hashId);
            if (produtoFornecedor == null) return NotFound();
            return Ok(produtoFornecedor);
        }

        [Authorize]
        [HttpGet("porProduto/{produtoHashId}")]
        public async Task<ActionResult<IEnumerable<ProdutoFornecedorDto>>> GetFornecedoresPorProduto(string produtoHashId)
        {
            var fornecedores = await _service.ObterFornecedoresPorProduto(produtoHashId);
            if (fornecedores == null)
                return NotFound();

            return Ok(fornecedores);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ProdutoFornecedorDto>> Create(ProdutoFornecedorDto produtoFornecedorDto)
        {
            var produtoFornecedor = new ProdutoFornecedor
            {
                HashId = string.IsNullOrEmpty(produtoFornecedorDto.HashId) ? Guid.NewGuid() : new Guid(produtoFornecedorDto.HashId),
                ProdutoId = new Guid(produtoFornecedorDto.ProdutoHashId),
                FornecedorId = new Guid(produtoFornecedorDto.FornecedorHashId)
            };

            var novoProdutoFornecedor = await _service.Criar(produtoFornecedor);
            if (novoProdutoFornecedor == null)
                return NotFound();

            return Ok(novoProdutoFornecedor);
        }

        [Authorize]
        [HttpDelete("{hashId}")]
        public async Task<IActionResult> Delete(string hashId)
        {
            var removido = await _service.Excluir(hashId);
            if (!removido)
                return NotFound();

            return Ok(true);
        }
    }
}
