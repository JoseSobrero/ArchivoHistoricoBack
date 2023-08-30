using Microsoft.EntityFrameworkCore;
using ArchivoHistoricoApi.Models;

var misespecificacionesdeorigen =" _miespecificacionesdeorigen";

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors (options => {
    options.AddPolicy(
        name :misespecificacionesdeorigen,
        policy => {
            policy.WithOrigins ("http://")
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

// Add services to the container.

builder.Services.AddControllers();
// builder.Services.AddDbContext<ArchivoHistoricoContext>(opt =>
//     opt.UseInMemoryDatabase("ArchivoHistorico"));
builder.Services.AddDbContext<ArchivoHistoricoContext>(opt =>
        opt.UseSqlServer(builder.Configuration.GetConnectionString("ArchivoHistoricoContext") 
        ?? throw new InvalidOperationException("Connection string 'ArchivoHistoricoContext' not found.")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseDefaultFiles();

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors(misespecificacionesdeorigen);

app.UseAuthorization();

app.MapControllers();

app.Run();
