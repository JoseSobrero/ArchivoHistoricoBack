function traerLibros() {
    fetch('https://localhost:7153/api/Libros')
    // fetch('http://localhost:5229/api/Libros')
    .then(respuesta => respuesta.json())
    .then(data => mostrarLibros(data))
    .catch(error => console.error("no se puede accder a la api", error));
}

// function mostrarLibros(data) {
//     const tbody = document.getElementById('Libros')
//     tbody.innerHTML = "";

//     data.forEach(element => {
//         let tr = tbody.insertRow();

//         let Nombre = document.createTextNode(element.nombre);
//         let tdnombre = tr.insertCell(0);
//         tdnombre.appendChild(Nombre);
//         tdnombre.id = "tdnombre";

//         let Resenia = document.createTextNode(element.resenia);
//         let tdresenia = tr.insertCell(1);
//         tdresenia.appendChild(Resenia);
//         tdresenia.id = "tdresenia";

//         let DondeConseguirlo = document.createTextNode(element.dondeConseguirlo);
//         let tddondeConseguirlo = tr.insertCell(2);
//         tddondeConseguirlo.appendChild(DondeConseguirlo);
//         tddondeConseguirlo.id = "tddondeConseguirlo";

        // let editar = document.createElement('button');
        // let icono = document.createElement('i');

        // editar.classList.add('boton-icono');
        // icono.classList.add('fa-solid', 'fa-pen-to-square', 'icon');
        // editar.setAttribute('onclick', `BuscarValoresCliente(${element.id})`);
        // editar.appendChild(icono);
        
        

        // let tdEditar = tr.insertCell(4);
        // tdEditar.appendChild(editar);

        // let eliminar = document.createElement('button');
        // let icono2 = document.createElement('i');
        
        // eliminar.classList.add ('boton-icono');
        // icono2.classList.add ('fa-solid', 'fa-trash-can', 'delete','icon');
        // eliminar.setAttribute('onclick', `ValidacionEliminarCliente(${element.id})`);
        // eliminar.appendChild(icono2);


        // let tdEliminar = tr.insertCell(5);
        // tdEliminar.appendChild(eliminar);

//     });
// }


function mostrarLibros(data) {
    const contenedorCards = document.getElementById('contenedorCards');
    const elementoEspecial = document.getElementById('btn-agregar');
    contenedorCards.innerHTML = '';

    contenedorCards.appendChild(elementoEspecial);

    data.forEach(element => {
        let col = document.createElement('div');
        col.classList.add('col-2');

        let card = document.createElement('div');
        card.classList.add('card-items');

        let overlay = document.createElement('div');
        overlay.classList.add('overlay-card');

        let nombre = document.createElement('h3');
        nombre.innerText = element.nombre;

        let resenia = document.createElement('p');
        resenia.innerText = element.resenia;

        let dondeConseguirlo = document.createElement('p');
        dondeConseguirlo.innerText = element.dondeConseguirlo;

        let btnContainer = document.createElement('div'); 
        btnContainer.classList.add('btn-container');

        let btn1 = document.createElement('button');
        btn1.innerText = 'Editar';
        btn1.classList.add('btn');
        btn1.setAttribute('onclick', `buscarLibro(${element.id})`);
    
        let btn2 = document.createElement('button');
        btn2.innerText = 'Eliminar';
        btn2.classList.add('btn');
        btn2.setAttribute('onclick', `validacionEliminar(${element.id})`);


        card.appendChild(overlay);
        overlay.appendChild(nombre);
        overlay.appendChild(resenia);
        overlay.appendChild(dondeConseguirlo);
        overlay.appendChild(btnContainer);
        btnContainer.appendChild(btn1);
        btnContainer.appendChild(btn2);
        contenedorCards.appendChild(card);
    });
    
}










function agregarLibro() {
    var nuevoLibro = {
        nombre: document.getElementById('nombre').value,
        resenia: document.getElementById('resenia').value,
        dondeConseguirlo: document.getElementById('dondeConseguirlo').value,
        foto: 0,
    }
fetch('https://localhost:7153/api/Libros',
{
method: 'POST',
headers: {
    'Accept': 'application/json',
    'content-type': 'application/json'
},
body: JSON.stringify(nuevoLibro)
}
)
.then(respuesta => respuesta.json())
.then(() => {
    document.getElementById('nombre').value = "";
    document.getElementById('resenia').value = "";
    document.getElementById('dondeConseguirlo').value = "";
    $('#agregarLibro').modal('hide');
    traerLibros();
})
.catch(error => console.error("no se pudo agregar el libro", error));
}

function validacionEliminar(id) {
    var siEliminar = confirm("Desea eliminar el elemento?");
    if (siEliminar == true) {
        Eliminar(id)
    }
}

function Eliminar(id) {
    fetch(`https://localhost:7153/api/Libros/${id}`,
    
    {    method: 'DELETE',
    })
    .then(() => { traerLibros(); })
    .catch(error=> console.error("No se pudo borrar el elemento"))
    
}

function buscarLibro(id) {
    fetch(`https://localhost:7153/api/Libros/${id}`, {
        method: 'GET'
    })
        .then(respuesta => respuesta.json())
        .then(data => {
            document.getElementById('idEditar').value = data.id;
            document.getElementById('nombreEditar').value = data.nombre;
            document.getElementById('reseniaEditar').value = data.resenia;
            document.getElementById('dondeConseguirloEditar').value = data.dondeConseguirlo;
            $('#editarLibro').modal('show');
        })
        .catch(error => console.error("No se pudo acceder a la api", error))
}

function editarLibro() {
    let id = document.getElementById('idEditar').value;

    let editarLibro = {
        id: document.getElementById('idEditar').value,
        nombre: document.getElementById('nombreEditar').value,
        resenia: document.getElementById('reseniaEditar').value,
        dondeConseguirlo: document.getElementById('dondeConseguirloEditar').value,
        
    }
    fetch(`https://localhost:7153/api/Libros/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarLibro)
    }
    )
        .then(() => {
            document.getElementById('idEditar').value = 0;
            document.getElementById('nombreEditar').value = "";
            document.getElementById('reseniaEditar').value = "";
            document.getElementById('dondeConseguirloEditar').value = "";
            $('#editarLibro').modal('hide');
            traerLibros();
        })
        .catch(error => console.error("No se pudo editar el elemento", error))
}