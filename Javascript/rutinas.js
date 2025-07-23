// Identificador para guardar todas las rutinas en localStorage
const LS_RUTINAS = "rutinasGuardadas";

// Rutina temporal (se puede inicializar vacía o cargar desde localStorage)
let rutinaTemporal = {
  id: "",
  usuarioID: null,
  semanas: 0,
  diasPorSemana: 0,
  dias: {},             // {1: [ej1, ej2], 2: [...]}
  semanasDetalle: []    // [{semana: 1, series: x, repeticiones: y, descanso: z}]
};

// Guarda solo rutinas nuevas en localStorage (no actualiza existentes)
function guardarRutinaTemporal() {
  let rutinas = JSON.parse(localStorage.getItem(LS_RUTINAS)) || [];

  // Si la rutina temporal ya tiene un id, no guardamos (porque es existente)
  if (rutinaTemporal.id) {
    alert("La rutina ya fue guardada anteriormente.");
    return;
  }

  // Si no tiene id, generamos uno y la guardamos como nueva
  rutinaTemporal.id = generarIdUnico();
  rutinas.push(rutinaTemporal);

  localStorage.setItem(LS_RUTINAS, JSON.stringify(rutinas));
  alert("Rutina nueva guardada correctamente.");
}

// Carga una rutina por id desde localStorage y actualiza rutinaTemporal
function cargarRutina(idRutina) {
  const rutinas = JSON.parse(localStorage.getItem(LS_RUTINAS)) || [];
  const rutina = rutinas.find(r => r.id === idRutina);

  if (rutina) {
    rutinaTemporal = rutina;
    actualizarInputsYTablaDeRutina();
  } else {
    // Si no existe la rutina, reseteamos rutinaTemporal
    rutinaTemporal = {
      id: "",
      usuarioID: null,
      semanas: 0,
      diasPorSemana: 0,
      dias: {},
      semanasDetalle: []
    };
  }
}


// cantidad de semanas 

