function traerLibros() {
    fetch('https://localhost:7153/api/Libros')
    .then(respuesta => respuesta.json())
    .then(data => mostrarLibros(data))
    // .catch(error => console.error("no se puede accder a la api", error));
}

function mostrarLibros(data) {
    const tbody = document.getElementById('Libros')
    tbody.innerHTML = "";

    data.forEach(element => {
        let tr = tbody.insertRow();

        let Nombre = document.createTextNode(element.Nombre);
        let tdnombre = tr.insertCell(0);
        tdnombre.appendChild(Nombre);
        tdnombre.id = "tdnombre";

        let Resenia = document.createTextNode(element.Resenia);
        let tdresenia = tr.insertCell(1);
        tdresenia.appendChild(Resenia);
        tdresenia.id = "tdresenia";

        let DondeConseguirlo = document.createTextNode(element.DondeConseguirlo);
        let tddondeConseguirlo = tr.insertCell(2);
        tddondeConseguirlo.appendChild(DondeConseguirlo);
        tddondeConseguirlo.id = "tddondeConseguirlo";
    });
}









function agregarLibro() {
    var nuevoLibro = {
        nombre: document.getElementById('Nombre').value,
        descripcion: document.getElementById('Resenia').value,
        dondeConseguirlo: document.getElementById('DondeConseguirlo').value
    }
fetch('https://localhost:7153/api/Libros',
{
method: 'post',
headers:{
    'Accept': 'application/json',
    'content-type': 'application/json'
},
body: JSON.stringify(agregarLibro)
}
)
.then(respuesta => respuesta.json())
.then(() => {
    document.getElementById('Nombre').value = "";
    document.getElementById('Resenia').value = "";
    document.getElementById('DondeConseguirlo').value = "";
    $('#agregarLibro').modal('hide');
    traerLibros();
})
.catch(error => console.error("no se pudo agregar el libro", error));
}