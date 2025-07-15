//Ejercicios pre-definidos
const ejerciciosPredefinidos = [
  {
    id: "pre_001",
    nombre: "Sentadillas",
    grupoMuscular: "Piernas"
  },
    {
    id: "pre_002",
    nombre: "Isquisurales en camilla",
    grupoMuscular: "Piernas"
  },
  {
    id: "pre_003",
    nombre: "Press plano",
    grupoMuscular: "Pecho"
  },
  {
    id: "pre_004",
    nombre: "Remo",
    grupoMuscular: "Espalda"
  }
];




// Clase Ejercicio
class Ejercicio {
  constructor(id, nombre, grupoMuscular) {
    this.id = id;
    this.nombre = nombre;
    this.grupoMuscular = grupoMuscular;
  }

  validar() {
    return this.nombre.trim() !== "" && this.grupoMuscular.trim() !== "";
  }
}

// Generador de ID único
function generarIdUnico() {
  const timestamp = Date.now().toString(36); 
  const random = Math.random().toString(36).substring(2, 6);
  return `ej_${timestamp}_${random}`;
}

// LocalStorage
const LS_EJERCICIOS = "ejerciciosGuardados";

function guardarEjercicioEnLocalStorage(ejercicio) {
  let ejercicios = JSON.parse(localStorage.getItem(LS_EJERCICIOS)) || [];
  ejercicios.push(ejercicio);
  localStorage.setItem(LS_EJERCICIOS, JSON.stringify(ejercicios));
}

function obtenerEjerciciosDesdeLocalStorage() {
  return JSON.parse(localStorage.getItem(LS_EJERCICIOS)) || [];
}

// Captura y manejo del formulario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEjercicio");
  const inputNombre = document.getElementById("inputNombre");
  const selectGrupo = document.getElementById("selectGrupo");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = inputNombre.value;
    const grupo = selectGrupo.value;

    const nuevoEjercicio = new Ejercicio(generarIdUnico(), nombre, grupo);

    if (nuevoEjercicio.validar()) {
      guardarEjercicioEnLocalStorage(nuevoEjercicio);
      form.reset(); // Limpia los campos
      alert("Ejercicio guardado con éxito");
    } else {
      alert("Por favor, completá todos los campos");
    }
  });
});

// Mostrar los ejercicios ya guardados 
function mostrarEjerciciosEnLista() {
  const contenedor = document.getElementById("cardsEjercicios");
  contenedor.innerHTML = ""; // Limpiar antes de mostrar

  const ejerciciosGuardados = obtenerEjerciciosDesdeLocalStorage();
 const todosLosEjercicios = ejerciciosPredefinidos.concat(ejerciciosGuardados);


  if (todosLosEjercicios.length === 0) {
    contenedor.innerHTML = `<p class="text-muted">No hay ejercicios disponibles aún.</p>`;
    return;
  }

  todosLosEjercicios.forEach((ej) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card shadow-sm border-${ej.id.startsWith("pre_") ? 'secondary' : 'primary'}">
        <div class="card-body">
          <h5 class="card-title">${ej.nombre}</h5>
          <p class="card-text"><strong>Grupo muscular:</strong> ${ej.grupoMuscular}</p>
         </div>
      </div>
    `;

    contenedor.appendChild(card);
  });
}
