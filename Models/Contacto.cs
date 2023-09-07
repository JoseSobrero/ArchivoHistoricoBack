using System.ComponentModel.DataAnnotations;

namespace ArchivoHistoricoApi.Models;

public class Contacto
{
    [Key]
    public int Id { get; set; }
    
    
    [StringLength(150)]
    [Required(ErrorMessage ="Este campo es obligatorio.")]
    public string? Telefono { get; set; }
    
    
    [StringLength(200)]
    [Required(ErrorMessage ="Este campo es obligatorio.")]
    public string? Email { get; set; }
    
    
    [StringLength(200)]
    [Required(ErrorMessage ="Este campo es obligatorio.")]
    public string? Domicilio { get; set; }
    
    
    [StringLength(200)]
    [Required(ErrorMessage ="Este campo es obligatorio.")]
    public string? EmailForm { get; set; }

}