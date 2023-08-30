using System.ComponentModel.DataAnnotations;

namespace ArchivoHistoricoApi.Models;

public class Libros
{
    [Key]
    public int Id { get; set; }
    public string? Nombre { get; set; }
    public string? Resenia { get; set; }
    public string? DondeConseguirlo { get; set; }
    public byte Foto { get; set; }

}