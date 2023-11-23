function traerCarrousel() {
    fetch('https://localhost:7153/api/Carrousel')
    .then(respuesta => respuesta.json())
    .then(data => mostrarCarrousel(data))
    .catch(error => console.error("no se puede accder a la api", error));
}

function mostrarCarrousel(data) {
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

        let descripcion = document.createElement('h3');
        descripcion.innerText = element.descripcion;

        let btnContainer = document.createElement('div'); 
        btnContainer.classList.add('btn-container');

        let btn1 = document.createElement('button');
        btn1.innerText = 'Editar';
        btn1.classList.add('btn-card');
        btn1.setAttribute('onclick', `buscarCarrousel(${element.id})`);
    
        let btn2 = document.createElement('button');
        btn2.innerText = 'Eliminar';
        btn2.classList.add('btn-card');
        btn2.setAttribute('onclick', `validacionEliminar(${element.id})`);

        contenedorCards.appendChild(col);
        col.appendChild(card);
        card.appendChild(overlay);
        overlay.appendChild(descripcion);
        overlay.appendChild(btnContainer);
        btnContainer.appendChild(btn1);
        btnContainer.appendChild(btn2);
        
    });
    
}

function agregarCarrousel() {
    var nuevoCarrousel = {
        imagen: 0,
        descripcion: document.getElementById('descripcion').value,
    }
fetch('https://localhost:7153/api/Carrousel',
{
method: 'POST',
headers: {
    'Accept': 'application/json',
    'content-type': 'application/json'
},
body: JSON.stringify(nuevoCarrousel)
}
)
.then(respuesta => respuesta.json())
.then(() => {
    document.getElementById('descripcion').value = "";
    $('#agregarCarrousel').modal('hide');
    traerCarrousel();
})
.catch(error => console.error("no se pudo agregar el elemento", error));
}

function validacionEliminar(id) {
    var siEliminar = confirm("Desea eliminar el elemento?");
    if (siEliminar == true) {
        Eliminar(id)
    }
}

function Eliminar(id) {
    fetch(`https://localhost:7153/api/Carrousel/${id}`,
    
    {    method: 'DELETE',
    })
    .then(() => { traerCarrousel(); })
    .catch(error=> console.error("No se pudo borrar el elemento"))
    
}

function buscarCarrousel(id) {
    fetch(`https://localhost:7153/api/Carrousel/${id}`, {
        method: 'GET'
    })
        .then(respuesta => respuesta.json())
        .then(data => {
            document.getElementById('idEditar').value = data.id;
            document.getElementById('descripcionEditar').value = data.descripcion;
            $('#editarCarrousel').modal('show');
        })
        .catch(error => console.error("No se pudo acceder a la api", error))
}

function editarCarrousel() {
    let id = document.getElementById('idEditar').value;

    let editarCarrousel = {
        id: document.getElementById('idEditar').value,
        imagen: 0,
        descripcion: document.getElementById('descripcionEditar').value,
        
        
    }
    fetch(`https://localhost:7153/api/Carrousel/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarCarrousel)
    }
    )
        .then(() => {
            document.getElementById('idEditar').value = 0;
            document.getElementById('descripcionEditar').value = "";
            $('#editarCarrousel').modal('hide');
            traerCarrousel();
        })
        .catch(error => console.error("No se pudo editar el elemento", error))
}