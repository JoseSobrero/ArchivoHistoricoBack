using System.ComponentModel.DataAnnotations;

namespace ArchivoHistoricoApi.Models;

public class Contacto
{
    [Key]
    public int Id { get; set; }
    [StringLength(150)]
    public string? Telefono { get; set; }
    [StringLength(200)]
    public string? Email { get; set; }
    public string? Domicilio { get; set; }
    [StringLength(200)]
    public string? EmailForm { get; set; }

}