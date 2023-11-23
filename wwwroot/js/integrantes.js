function traerIntegrantes() {
    fetch('https://localhost:7153/api/Integrantes')
    .then(respuesta => respuesta.json())
    .then(data => mostrarIntegrantes(data))
    .catch(error => console.error("no se puede accder a la api", error));
}

function mostrarIntegrantes(data) {
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

        let cargo = document.createElement('p');
        cargo.innerText = element.cargo;

        let btnContainer = document.createElement('div'); 
        btnContainer.classList.add('btn-container');

        let btn1 = document.createElement('button');
        btn1.innerText = 'Editar';
        btn1.classList.add('btn-card');
        btn1.setAttribute('onclick', `buscarIntegrante(${element.id})`);
    
        let btn2 = document.createElement('button');
        btn2.innerText = 'Eliminar';
        btn2.classList.add('btn-card');
        btn2.setAttribute('onclick', `validacionEliminar(${element.id})`);

        contenedorCards.appendChild(col);
        col.appendChild(card);
        card.appendChild(overlay);
        overlay.appendChild(nombre);
        overlay.appendChild(cargo);
        overlay.appendChild(btnContainer);
        btnContainer.appendChild(btn1);
        btnContainer.appendChild(btn2);
        
    });
    
}

function agregarIntegrante() {
    var nuevoIntegrante = {
        nombre: document.getElementById('nombre').value,
        cargo: document.getElementById('cargo').value,
        foto: 0,
    }
fetch('https://localhost:7153/api/Integrantes',
{
method: 'POST',
headers: {
    'Accept': 'application/json',
    'content-type': 'application/json'
},
body: JSON.stringify(nuevoIntegrante)
}
)
.then(respuesta => respuesta.json())
.then(() => {
    document.getElementById('nombre').value = "";
    document.getElementById('cargo').value = "";
    $('#agregarIntegrante').modal('hide');
    traerIntegrantes();
})
.catch(error => console.error("no se pudo agregar el integrante", error));
}

function validacionEliminar(id) {
    var siEliminar = confirm("Desea eliminar el elemento?");
    if (siEliminar == true) {
        Eliminar(id)
    }
}

function Eliminar(id) {
    fetch(`https://localhost:7153/api/Integrantes/${id}`,
    
    {    method: 'DELETE',
    })
    .then(() => { traerIntegrantes(); })
    .catch(error=> console.error("No se pudo borrar el elemento"))
    
}

function buscarIntegrante(id) {
    fetch(`https://localhost:7153/api/Integrantes/${id}`, {
        method: 'GET'
    })
        .then(respuesta => respuesta.json())
        .then(data => {
            document.getElementById('idEditar').value = data.id;
            document.getElementById('nombreEditar').value = data.nombre;
            document.getElementById('cargoEditar').value = data.cargo;
            $('#editarIntegrante').modal('show');
        })
        .catch(error => console.error("No se pudo acceder a la api", error))
}

function editarIntegrante() {
    let id = document.getElementById('idEditar').value;

    let editarIntegrante = {
        id: document.getElementById('idEditar').value,
        nombre: document.getElementById('nombreEditar').value,
        cargo: document.getElementById('cargoEditar').value,
        foto: 0,
        
    }
    fetch(`https://localhost:7153/api/Integrantes/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarIntegrante)
    }
    )
        .then(() => {
            document.getElementById('idEditar').value = 0;
            document.getElementById('nombreEditar').value = "";
            document.getElementById('cargoEditar').value = "";
            $('#editarIntegrante').modal('hide');
            traerIntegrantes();
        })
        .catch(error => console.error("No se pudo editar el elemento", error))
}