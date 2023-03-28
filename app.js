const formulario = document.querySelector("#formulario");
const titulo = document.querySelector("#titulo");
let tareas = [];
const lista = document.querySelector(".tareas");
var fechaHoy = document.getElementById("fecha-actual");
var hora = document.getElementById("hora-actual");

// Creacion de eventos y de h1 con la fecha

function eventos() {
  formulario.addEventListener("submit", validarFormulario);
  lista.addEventListener("click", eliminarTarea);
  lista.addEventListener("click", tareaCompletada);
  var fechaActual = new Date();
  var fechaTexto = fechaActual.toLocaleDateString("es-ES", {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  });
  fechaHoy.textContent = fechaTexto;
}
// Ejecutamos eventos
eventos();

// validamos que la tarea introducida sea correcta

function validarFormulario(e) {
  e.preventDefault();
  const input = document.querySelector("input").value;
  if (!input.trim()) {
    titulo.textContent = "Campo Vacio";
    setTimeout(() => {
      titulo.textContent = "Nueva Tarea";
    }, 2000);
    return;
  }

  const objTarea = {
    id: Date.now(),
    tarea: input,
    estado: false,
  };
  tareas.push(objTarea);
  formulario.reset();
  mostrarHTML();
}

// Representamos el array en pantalla 

function mostrarHTML() {
  lista.innerHTML = "";
  if (tareas.length > 0) {
     tareas.forEach((item) => {
    const itemtarea = document.createElement("div");
    itemtarea.classList.add("tarea");
    itemtarea.innerHTML = `
    ${
      item.estado
        ? `<p class= 'completa'>${item.tarea}</p>`
        : `<p class= 'incompleta'>${item.tarea}</p>`
    }
        <div class="botones">
          <button data-id="${item.id}" class="eliminar"><i class="fa-solid fa-trash"></i></button>
          <button data-id="${item.id}" class="completar"><i class="fa-solid fa-check"></i></button>
        </div>
  `;
    lista.appendChild(itemtarea);
  });
    //  En caso que el arrray este vacio vuelve a mostrar que no hay tareas
  } else { 
    let mensaje = document.createElement('p')
    mensaje.textContent = 'Sin tareas'
    mensaje.classList.add('vacio')
    lista.appendChild(mensaje)
    return;
 }
}

function eliminarTarea(e) {
  if (e.target.classList.contains("eliminar")) {
    const tareaID = Number(e.target.getAttribute("data-id"));
    const nuevaTarea = tareas.filter((item) => item.id !== tareaID);
    tareas = nuevaTarea;
    mostrarHTML();
  }
}

function tareaCompletada(e) {
  if (e.target.classList.contains("completar")) {
    const tareaID = Number(e.target.getAttribute("data-id"));
    const nuevaTarea = tareas.map((item) => {
      if (item.id === tareaID) {
        item.estado = !item.estado;
        return item;
      } else {
        return item;
      }
    });
    tareas = nuevaTarea
    mostrarHTML();
  }
}
