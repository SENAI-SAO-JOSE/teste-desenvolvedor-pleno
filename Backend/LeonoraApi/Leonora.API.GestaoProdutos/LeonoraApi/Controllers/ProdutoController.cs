using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LeonoraApi.Domain.Services.Interfaces;
using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;

namespace LeonoraApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _service;

        public ProdutoController(IProdutoService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProdutoDto>>> GetAll()
        {
            var produtos = await _service.ObterTodos();
            return Ok(produtos);
        }

        [Authorize]
        [HttpGet("{hashId}")]
        public async Task<ActionResult<ProdutoDto>> GetById(string hashId)
        {
            var produto = await _service.ObterPorId(hashId);
            if (produto == null) return NotFound();
            return Ok(produto);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(ProdutoDto produtoDto)
        {
            var produto = new Produto
            {
                HashId = Guid.NewGuid(),
                Nome = produtoDto.Nome,
                CategoriaId = new Guid(produtoDto.CategoriaId),
                Preco = produtoDto.Preco,
                Descricao = produtoDto.Descricao,
                Codigo = produtoDto.Codigo,
                IsDeleted = produtoDto.IsDeleted
            };

            var novoProduto = await _service.Criar(produto);
            if (novoProduto == null)
                return NotFound();

            return Ok(true);
        }

        [Authorize]
        [HttpPut("{hashId}")]
        public async Task<IActionResult> Update(string hashId, ProdutoDto produtoDto)
        {
            var produto = new Produto
            {
                HashId = new Guid(hashId),
                Nome = produtoDto.Nome,
                CategoriaId = new Guid(produtoDto.CategoriaId),
                Preco = produtoDto.Preco,
                Descricao = produtoDto.Descricao,
                Codigo = produtoDto.Codigo,
                IsDeleted = produtoDto.IsDeleted
            };

            var atualizado = await _service.Alterar(produto);
            if (atualizado == null)
                return NotFound();

            return Ok(true);
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
