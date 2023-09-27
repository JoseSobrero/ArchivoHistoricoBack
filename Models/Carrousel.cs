using System.ComponentModel.DataAnnotations;

namespace ArchivoHistoricoApi.Models;

public class Carrousel
{
    [Key]
    public int Id { get; set; }
    public byte Imagen { get; set; }
    [StringLength(200, MinimumLength = 5,
        ErrorMessage = "La descripción debe tener como minimo 5 y como maximo 200 caracteres")]
    [DataType(DataType.Text)]
    public string? Descripcion { get; set; }

}