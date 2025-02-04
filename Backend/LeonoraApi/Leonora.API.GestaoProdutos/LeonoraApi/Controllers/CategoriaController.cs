using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LeonoraApi.Domain.Services.Interfaces;
using LeonoraApi.Data.DTOs;
using LeonoraApi.Data.Models;


namespace LeonoraApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _service;

        public CategoriaController(ICategoriaService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaDto>>> GetAll()
        {
            var categorias = await _service.ObterTodos();
            return Ok(categorias);
        }

        [Authorize]
        [HttpGet("{hashId}")]
        public async Task<ActionResult<CategoriaDto>> GetById(string hashId)
        {
            var categoria = await _service.ObterPorId(hashId);
            if (categoria == null) return NotFound();
            return Ok(categoria);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CategoriaDto categoriaDto)
        {
            var categoria = new Categoria
            {
                HashId = Guid.NewGuid(),
                Nome = categoriaDto.Nome,
                Codigo = categoriaDto.Codigo,
                Descricao = categoriaDto.Descricao
            };

            var novaCategoria = await _service.Criar(categoria);
            if (novaCategoria == null)
                return NotFound();

            return Ok(true);
        }

        [Authorize]
        [HttpPut("{hashId}")]
        public async Task<IActionResult> Update(string hashId, CategoriaDto categoriaDto)
        {
            var categoria = new Categoria
            {
                HashId = new Guid(hashId),
                Nome = categoriaDto.Nome,
                Codigo = categoriaDto.Codigo,
                Descricao = categoriaDto.Descricao
            };

            var atualizado = await _service.Alterar(categoria);
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
