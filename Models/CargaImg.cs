using System.ComponentModel.DataAnnotations;

namespace ArchivoHistoricoApi.Models;

public class CargaImg

{
    public int Id { get; set; }
    public string? Nombre { get; set; }
    public byte[]? DatosImagen { get; set; }
}

