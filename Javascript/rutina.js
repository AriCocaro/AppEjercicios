class Ejercicio {
  constructor(id, nombre, grupoMuscular) {
    this.id = id;
    this.nombre = nombre;
    this.grupoMuscular = grupoMuscular;
  }
}
  validar() {
    return this.nombre.trim() !== "" && this.grupoMuscular.trim() !== "";
  }

//IdUnico
function generarIdUnico() {
  const timestamp = Date.now().toString(36); 
  const random = Math.random().toString(36).substring(2, 6);
  return `ej_${timestamp}_${random}`;
}
const id = generarIdUnico();
const nuevoEjercicio = new Ejercicio(generarIdUnico(), nombre, grupo);

if (nuevoEjercicio.validar()) {
  guardarEjercicioEnLocalStorage(nuevoEjercicio);
} else {
  mostrarMensaje("Por favor, completá todos los campos");
}

//Localstorage
const LS_EJERCICIOS = "ejerciciosGuardados";
function guardarEjercicioEnLocalStorage(ejercicio) {
  let ejercicios = JSON.parse(localStorage.getItem(LS_EJERCICIOS)) || [];
  ejercicios.push(ejercicio);
  localStorage.setItem(LS_EJERCICIOS, JSON.stringify(ejercicios));
}
function obtenerEjerciciosDesdeLocalStorage() {
  return JSON.parse(localStorage.getItem(LS_EJERCICIOS)) || [];
}



