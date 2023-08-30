using Microsoft.EntityFrameworkCore;

namespace ArchivoHistoricoApi.Models;

public class ArchivoHistoricoContext : DbContext
{
    public ArchivoHistoricoContext(DbContextOptions<ArchivoHistoricoContext> options)
        : base(options)
    {
    }

    public DbSet<Home> Home { get; set; } = null!;
    public DbSet<Carrousel> Carrousel { get; set; } = null!;
    public DbSet<Integrantes> Integrantes { get; set; } = null!;
    public DbSet<Libros> Libros { get; set; } = null!;
    public DbSet<Contacto> Contacto { get; set; } = null!;
}