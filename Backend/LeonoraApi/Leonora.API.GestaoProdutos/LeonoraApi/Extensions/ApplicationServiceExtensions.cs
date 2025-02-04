using LeonoraApi.Data;
using LeonoraApi.Domain.Services.Interfaces;
using LeonoraApi.Domain.Services;
using LeonoraApi.Domain.Repositories.Interfaces;
using LeonoraApi.Domain.Repositories;
using Microsoft.EntityFrameworkCore;


namespace LeonoraApi.Extensions
{
    /// <summary>
    /// Classe de configurações da API
    /// </summary>
    public static class ApplicationServiceExtensions
    {
        /// <summary>
        /// Método para configuração do CORS
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns></returns>
        public static IServiceCollection AddNetworkOptions(this IServiceCollection services, IConfiguration config)
        {
            // Obtém a URL do frontend do appsettings.json
            var frontendUrl = config.GetSection("Frontend:BaseUrl").Value;

            // Configuração de CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", builder =>
                {
                    builder.WithOrigins(frontendUrl) // URL obtida do appsettings.json
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            return services;
        }

        /// <summary>
        /// Método para configuração da injeção de dependência de serviços
        /// </summary>
        public static IServiceCollection AddServiceInjection(this IServiceCollection services, IConfiguration config)
        {
            // Injeção de serviços
            services.AddTransient<IUsuarioService, UsuarioService>();
            services.AddTransient<ICategoriaService, CategoriaService>();
            services.AddTransient<IFornecedorService, FornecedorService>();
            services.AddTransient<IProdutoService, ProdutoService>();
            services.AddTransient<IProdutoFornecedorService, ProdutoFornecedorService>();

            return services;
        }

        /// <summary>
        /// Método para configuração da injeção de dependência de repositórios
        /// </summary>
        public static IServiceCollection AddRepositoryInjection(this IServiceCollection services, IConfiguration config)
        {
            // Injeção de repositórios
            services.AddTransient<IUsuarioRepository, UsuarioRepository>();
            services.AddTransient<ICategoriaRepository, CategoriaRepository>();
            services.AddTransient<IFornecedorRepository, FornecedorRepository>();
            services.AddTransient<IProdutoRepository, ProdutoRepository>();
            services.AddTransient<IProdutoFornecedorRepository, ProdutoFornecedorRepository>();

            return services;
        }

        /// <summary>
        /// Método para configuração do pipeline HTTP
        /// </summary>
        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            // Ativar autenticação
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        /// <summary>
        /// Método para configuração da conexão com banco de dados
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns></returns>
        public static IServiceCollection AddDataBaseConnection(this IServiceCollection services, IConfiguration config)
        {
            // Conexão com o banco de dados (verifique a implementação de seu contexto)
            services.AddDbContext<ApiContext>(options =>
                options.UseSqlServer(config.GetConnectionString("Database")));

            return services;
        }
    }
}
