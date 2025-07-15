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
