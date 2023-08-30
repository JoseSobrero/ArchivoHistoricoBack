using System.ComponentModel.DataAnnotations;

namespace ArchivoHistoricoApi.Models;

public class Integrantes
{
    [Key]
    public int Id { get; set; }
    public byte Foto { get; set; }
    [StringLength(200)]
    public string? Nombre { get; set; }
    [StringLength(150)]
    public string? Cargo { get; set; }

}