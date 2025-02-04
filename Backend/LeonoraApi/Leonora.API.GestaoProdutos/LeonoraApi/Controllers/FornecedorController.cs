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
    public class FornecedorController : ControllerBase
    {
        private readonly IFornecedorService _service;

        public FornecedorController(IFornecedorService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FornecedorDto>>> GetAll()
        {
            var fornecedores = await _service.ObterTodos();
            return Ok(fornecedores);
        }

        [Authorize]
        [HttpGet("{hashId}")]
        public async Task<ActionResult<FornecedorDto>> GetById(string hashId)
        {
            var fornecedor = await _service.ObterPorId(hashId);
            if (fornecedor == null) return NotFound();
            return Ok(fornecedor);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(FornecedorDto fornecedorDto)
        {
            var fornecedor = new Fornecedor
            {
                HashId = Guid.NewGuid(),
                Nome = fornecedorDto.Nome,
                Codigo = fornecedorDto.Codigo,
                Cnpj = fornecedorDto.Cnpj,
                Telefone = fornecedorDto.Telefone,
                Endereco = fornecedorDto.Endereco
            };

            var novoFornecedor = await _service.Criar(fornecedor);
            if (novoFornecedor == null)
                return NotFound();

            return Ok(true);
        }

        [Authorize]
        [HttpPut("{hashId}")]
        public async Task<IActionResult> Update(string hashId, FornecedorDto fornecedorDto)
        {
            var fornecedor = new Fornecedor
            {
                HashId = new Guid(hashId),
                Nome = fornecedorDto.Nome,
                Codigo = fornecedorDto.Codigo,
                Cnpj = fornecedorDto.Cnpj,
                Telefone = fornecedorDto.Telefone,
                Endereco = fornecedorDto.Endereco
            };

            var atualizado = await _service.Alterar(fornecedor);
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
