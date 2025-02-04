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
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _service;

        public UsuarioController(IUsuarioService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDto>>> GetAll()
        {
            var usuarios = await _service.ObterTodos();
            return Ok(usuarios);
        }

        [Authorize]
        [HttpGet("{hashId}")]
        public async Task<ActionResult<UsuarioDto>> GetById(string hashId)
        {
            var usuario = await _service.ObterPorId(hashId);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(UsuarioDto usuarioDto)
        {
            var usuario = new Usuario
            {
                HashId = Guid.NewGuid(),
                Nome = usuarioDto.Nome,
                Login = usuarioDto.Login,
                Senha = usuarioDto.Senha,
                Cpf = usuarioDto.Cpf,
                Codigo = usuarioDto.Codigo,
                IsAtivo = usuarioDto.IsAtivo
            };

            var novoUsuario = await _service.Criar(usuario);
            if (novoUsuario == null)
                return NotFound();

            return Ok(true);
        }

        [Authorize]
        [HttpPut("{hashId}")]
        public async Task<IActionResult> Update(string hashId, UsuarioDto usuarioDto)
        {
            var usuario = new Usuario
            {
                HashId = new Guid(hashId),
                Nome = usuarioDto.Nome,
                Login = usuarioDto.Login,
                Senha = usuarioDto.Senha,
                Cpf = usuarioDto.Cpf,
                Codigo = usuarioDto.Codigo,
                IsAtivo = usuarioDto.IsAtivo
            };

            var atualizado = await _service.Alterar(usuario);
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
