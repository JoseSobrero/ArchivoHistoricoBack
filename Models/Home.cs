using System.ComponentModel.DataAnnotations;

namespace ArchivoHistoricoApi.Models;

public class Home
{
    [Key]
    public int Id { get; set; }
    public byte Logo { get; set; } 

    [StringLength(150)]
    public string? Nombre { get; set; }

}