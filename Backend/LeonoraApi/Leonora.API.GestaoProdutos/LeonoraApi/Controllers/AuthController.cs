using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LeonoraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {    
        
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {   
            //Edson fazer (pegar do config)
            //TODO:sera feito ao concluir o modulo de login no portal          
            if (login.Username == "admin" && login.Password == "123") 
            {
                var token = GenerateJwtToken(login.Username);
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }

        // Método para gerar o JWT
        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, "User") // Pode adicionar outras claims conforme necessário
            };

            var secretKey = Encoding.UTF8.GetBytes("AvbkCTlsZnip2ri7RS9tREKuHAiQP1efcw2wJFvfolE");
            var key = new SymmetricSecurityKey(secretKey);
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "seu-app",
                audience: "seu-app",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    // Model para representar o login
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
