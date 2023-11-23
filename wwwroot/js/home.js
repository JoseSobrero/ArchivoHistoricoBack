function traerHome() {
    fetch('https://localhost:7153/api/Home')
    .then(respuesta => respuesta.json())
    .then(data => mostrarHome(data))
    .catch(error => console.error("no se puede accder a la api", error));
}

// function mostrarHome(data) {
//     console.log(traerHome())
//     $.each(data, function (index, item) {
//         $("#home").append(
//             "<div>" +
//             "<textarea>" + item.nombre + "</textarea>" +
//             "</div>"
//         )
//     })
// }

function mostrarHome(data) {
    const contenedorCards = document.getElementById('home');
    contenedorCards.innerHTML = '';

    data.forEach(element => {
        let titulo = document.createElement('h3');
        titulo.innerText = "Editar aquí:";

        let input = document.createElement('p');
        input.classList.add('styleTextarea')
        input.innerText = element.nombre;

        let button = document.createElement('button');
        button.innerText = 'Editar';
        button.classList.add('btn-card');
        button.setAttribute('onclick', `buscarHome(${element.id})`);

        contenedorCards.appendChild(titulo);
        contenedorCards.appendChild(input);
        contenedorCards.appendChild(button)
    });
}

function buscarHome(id) {
    fetch(`https://localhost:7153/api/Home/${id}`, {
        method: 'GET'
    })
        .then(respuesta => respuesta.json())
        .then(data => {
            document.getElementById('idEditar').value = data.id;
            document.getElementById('nombreEditar').value = data.nombre;
            $('#editarHome').modal('show');
        })
        .catch(error => console.error("No se pudo acceder a la api", error))
}

function editarHome() {
    let id = document.getElementById('idEditar').value;

    let editarHome = {
        id: document.getElementById('idEditar').value,
        nombre: document.getElementById('nombreEditar').value,
        
    }
    fetch(`https://localhost:7153/api/Home/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarHome)
    }
    )
        .then(() => {
            document.getElementById('idEditar').value = 0;
            document.getElementById('nombreEditar').value = "";
            $('#editarHome').modal('hide');
            traerHome();
        })
        .catch(error => console.error("No se pudo editar el elemento", error))
}