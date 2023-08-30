using System.ComponentModel.DataAnnotations;

namespace ArchivoHistoricoApi.Models;

public class Carrousel
{
    [Key]
    public int Id { get; set; }
    public byte Imagen { get; set; }
    [StringLength(200)]
    public string? Descripcion { get; set; }

}