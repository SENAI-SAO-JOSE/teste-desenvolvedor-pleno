using LeonoraApi.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços ao container
builder.Services.AddControllers();

// Adiciona serviços adicionais, como repositórios e injeção de dependências
builder.Services.AddRepositoryInjection(builder.Configuration);
builder.Services.AddServiceInjection(builder.Configuration);
builder.Services.AddDataBaseConnection(builder.Configuration); // Configuração de conexão com o banco de dados
builder.Services.AddNetworkOptions(builder.Configuration); // Configuração de CORS

// Configura a autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "seu-app", // Deve coincidir com o valor usado na geração do token
            ValidAudience = "seu-app", // Deve coincidir com o valor usado na geração do token
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("AvbkCTlsZnip2ri7RS9tREKuHAiQP1efcw2wJFvfolE")) // Mesma chave usada na geração
        }; 

        // Ativa logs para depuração
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                Console.WriteLine("Token inválido: " + context.Exception.Message);
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                Console.WriteLine("Token válido!");
                return Task.CompletedTask;
            }
        };
    });

// Adiciona suporte ao Swagger e configura autenticação JWT
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Insira o token JWT no formato: Bearer {seu_token}"
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Construa a aplicação
var app = builder.Build();

// Configura o pipeline HTTP
app.UseCors("AllowFrontend"); // Permite CORS para o frontend configurado (http://localhost:3000)

if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    // Ativa o Swagger somente nos ambientes de desenvolvimento ou staging
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
        c.RoutePrefix = string.Empty; // Define a raiz como a página inicial do Swagger
    });
}

// Habilita redirecionamento HTTPS (garante que todas as requisições sejam feitas via HTTPS)
app.UseHttpsRedirection();

// Adiciona os middlewares de autenticação e autorização
app.UseAuthentication(); // Middleware para autenticação (JWT)
app.UseAuthorization();  // Middleware para autorização (verifica se o usuário tem permissão)

// Mapeia os controllers para as rotas da aplicação
app.MapControllers();

// Inicia a aplicação
app.Run();
