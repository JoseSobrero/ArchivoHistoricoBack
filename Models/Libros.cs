using System.ComponentModel.DataAnnotations;

namespace ArchivoHistoricoApi.Models;

public class Libros
{
    [Key]
    public int Id { get; set; }
  
    [Required (ErrorMessage ="Este campo es obligatorio")]
    [StringLength (150)]
    [DataType(DataType.Text)]
    public string? Nombre { get; set; }
  
    [Required (ErrorMessage ="Este campo es obligatorio")]
    [StringLength(300)]
    [DataType(DataType.Text)]
    public string? Resenia { get; set; }
  
    [Required (ErrorMessage ="Este campo es obligatorio")]
    [StringLength (150)]
    [DataType(DataType.Text)]
    public string? DondeConseguirlo { get; set; }
    
    public byte Foto { get; set; }
}