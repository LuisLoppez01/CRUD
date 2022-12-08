const formulario = document.getElementById('formulario')
const tarea = document.getElementById('tarea')
const descripcion = document.getElementById('descripcion')
const listaTareas = document.getElementById('listaTareas')
//const btnAgregar = document.getElementById('boton')
const btnModificar = document.getElementById('btnmodificar')

localStorage.setItem("tareas", [])
let arrayTareas = []
let item = {
    tarea: "",
    descripcion: ""
}
let indexListaTarea = 0;

function agregarTarea(texto, descripcion) {
    let item = {
        tarea: texto,
        descripcion: descripcion
    }
    arrayTareas.push(item)
}

function guardarDB() {
    localStorage.setItem("tareas", JSON.stringify(arrayTareas));
    mostarBD()

}

document.addEventListener('DOMContentLoaded', mostarBD)

function mostarBD() {
    //console.log(localStorage.getItem("tareas"))
    arrayTareas = JSON.parse(localStorage.getItem("tareas"))
    listaTareas.innerHTML = "";

    arrayTareas.forEach(function (element, index, array) {
        listaTareas.innerHTML += `
            <article class="dflex-article">
            <div class="TyD">
                <h4>${element.tarea}</h4>
                <p>${element.descripcion}</p>
            </div>
            <div class="botones">
                <input type="button" class="article__input--eliminar ${index}" value="Eliminar">
                <input type="button" class="article__input--editar ${index}" value="Editar">
            </div>
        </article>
        `;
    });

}

document.addEventListener('DOMContentLoaded', recargarMensaje)

function recargarMensaje() {
    if (arrayTareas.length === 0) {
        //console.log(arrayTareas.length === 0)
        document.getElementById('tareasMensaje').classList.remove('tareas__bg--activado')
    } else {
        //console.log(arrayTareas.length === 0)
        document.getElementById('tareasMensaje').classList.add('tareas__bg--activado')
    }

}

function eliminarBD(indexListaTarea) {
    let indexArray;
    arrayTareas.forEach(function (element, index) {
        if (index == indexListaTarea) {
            indexArray = index;
        }
    })

    arrayTareas.splice(indexArray, 1)
    recargarMensaje()
    guardarDB();
}

function btnEditar(indexListaTarea) {
    document.getElementById('btnmodificar').classList.remove('btn__modificar')
    document.getElementById('btnmodificar').classList.add('botonmodificar')
    document.getElementById('boton').classList.add('input-button--eliminar')

    let elementArray = [];
    arrayTareas.forEach(function (element, index) {
        if (index == indexListaTarea) {
            elementArray = element;
        }
    })
    tarea.value = elementArray.tarea;
    descripcion.value = elementArray.descripcion
    listaTareas.classList.add("input-button--eliminar");

}
function modificarBD(indexListaTarea) {
    console.log(arrayTareas[indexListaTarea].tarea)
    console.log(tarea.value)

    arrayTareas[indexListaTarea].tarea = tarea.value;
    arrayTareas[indexListaTarea].descripcion = descripcion.value;
    console.log(arrayTareas[indexListaTarea].tarea)
    guardarDB();
    location.reload();
}

btnModificar.addEventListener("click", (e) => {
    console.log("entra")
    modificarBD(indexListaTarea)

})

listaTareas.onclick = function (e) {
    e.preventDefault();
    //console.log(e.target.classList[0]);
    if (e.target.classList[0] === "article__input--eliminar" || e.target.classList[0] === "article__input--editar") {
        //console.log(e.target.classList[0]);
        if (e.target.classList[0] === "article__input--eliminar") {
            indexListaTarea = e.target.classList[1];
            eliminarBD(indexListaTarea);

        }
        if (e.target.classList[0] === "article__input--editar") {
            indexListaTarea = e.target.classList[1];
            btnEditar(indexListaTarea);
        }

    }
}

//document.getElementById("demo").onclick = function() {myFunction()};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let textoTarea = tarea.value;
    let textoDescripcion = descripcion.value;
    agregarTarea(textoTarea, textoDescripcion)
    formulario.reset();
    recargarMensaje()
    guardarDB();
})


//document.getElementById('tareasMensaje').classList.remove('tareas__bg')
