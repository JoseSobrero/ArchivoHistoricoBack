using System.ComponentModel.DataAnnotations;

namespace ArchivoHistoricoApi.Models;

public class Integrantes
{
   
    
    [Key]
    public int Id { get; set; }

    [Required]
    public byte Foto { get; set; }

    [Required(ErrorMessage = "Este campo es obligatorio")]
    [StringLength(200)]
    public string? Nombre { get; set; }

    [Required(ErrorMessage = "Este campo es obligatorio")]
    [StringLength(200)]
    public string? Cargo { get; set; }

}