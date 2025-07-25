

function obtenerEjerciciosDesdeLocalStorage() {
  const json = localStorage.getItem(LS_EJERCICIOS);
  return json ? JSON.parse(json) : [];
}

function guardarEjercicioEnLocalStorage(ejercicio) {
  const ejercicios = obtenerEjerciciosDesdeLocalStorage();
  ejercicios.push(ejercicio);
  localStorage.setItem(LS_EJERCICIOS, JSON.stringify(ejercicios));
}

function obtenerUsuariosDeStorage() {
  const json = localStorage.getItem(LS_USUARIOS);
  return json ? JSON.parse(json) : [];
}

function guardarUsuariosEnStorage(usuarios) {
  localStorage.setItem(LS_USUARIOS, JSON.stringify(usuarios));
}


// guardar hacer rutina 

function guardarDatosGenerales() {
  const usuarioId = rutinaTemporal.usuarioID;
  const dias = parseInt(document.getElementById("diasNro").value);
  const semana = parseInt(document.getElementById("semanaNro").value);
  const nombreCompleto = document.getElementById("usuarioId").value.trim();

  if (!usuarioId || !dias || !semana || !nombreCompleto) {
    Swal.fire({
      title: 'Completá todos los datos',
      text: 'Uno de los campos se encuentra vacío',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    return;
  }

  const ahora = new Date();
  const fecha = ahora.toISOString().split("T")[0]; // YYYY-MM-DD
  const hora = `${ahora.getHours()}-${ahora.getMinutes()}`;
  const nombreSinEspacios = nombreCompleto.replace(/\s+/g, "_");
  const idRutina = `${nombreSinEspacios}_${fecha}_${hora}`;

  const rutinas = obtenerRutinasDesdeStorage();

  if (!rutinas[usuarioId]) {
    rutinas[usuarioId] = { rutinas: {} };
  }

  rutinas[usuarioId].rutinas[idRutina] = {
    generales: {
      dias,
      semana,
      usuario: nombreCompleto,
      rutinaId: idRutina
    },
    semanas: {},
    dias: {}
  };

  guardarRutinasEnStorage(rutinas);

  
  rutinaTemporal.rutinaId = idRutina;

  
}


// guardar semana 
function guardarSemana() {
  const usuarioId = rutinaTemporal.usuarioID;
  const rutinaId = rutinaTemporal.rutinaId;
  const semanaSeleccionada = parseInt(document.getElementById("selectorSemana").value);
  const series = parseInt(document.getElementById("series").value);
  const repeticiones = parseInt(document.getElementById("repeticiones").value);
  const descanso = parseInt(document.getElementById("descanso").value);

  if (!usuarioId || !rutinaId) return;

  try {
    const rutinas = obtenerRutinasDesdeStorage();

   
    if (!rutinas[usuarioId]) rutinas[usuarioId] = { rutinas: {} };
    if (!rutinas[usuarioId].rutinas[rutinaId]) {
      rutinas[usuarioId].rutinas[rutinaId] = {
        generales: {},
        semanas: {},
        dias: {}
      };
    } else {
      if (!rutinas[usuarioId].rutinas[rutinaId].semanas) {
        rutinas[usuarioId].rutinas[rutinaId].semanas = {};
      }
    }

    const semanas = rutinas[usuarioId].rutinas[rutinaId].semanas;

    // Guardar los datos visibles en la tabla
    const filas = document.querySelectorAll("#tablaResumen tbody tr");
    filas.forEach(fila => {
      const [celdaSemana, celdaReps, celdaSeries, celdaDescanso] = fila.querySelectorAll("td");

      const semana = Number(celdaSemana.textContent.trim().match(/\d+/)?.[0]);
      const repeticionesFila = parseInt(celdaReps.textContent.trim());
      const seriesFila = parseInt(celdaSeries.textContent.trim());
      const descansoFila = parseInt(celdaDescanso.textContent.trim());

      if (!isNaN(semana) && !isNaN(seriesFila) && !isNaN(repeticionesFila) && !isNaN(descansoFila)) {
        semanas[semana] = {
          series: seriesFila,
          repeticiones: repeticionesFila,
          descanso: descansoFila
        };
      }
    });

    // Agregar datos del formulario si esa semana no existe aún
    if (!isNaN(semanaSeleccionada) && !isNaN(series) && !isNaN(repeticiones) && !isNaN(descanso)) {
      if (!semanas.hasOwnProperty(semanaSeleccionada)) {
        semanas[semanaSeleccionada] = {
          series,
          repeticiones,
          descanso
        };
      }
    }

    guardarRutinasEnStorage(rutinas);
  } catch (error) {
    console.error("Error al guardar semana:", error);
    Swal.fire({
      title: 'Ocurrió un error al guardar',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }
}




//guardar dia 
function guardarDia() {
  const usuarioId = rutinaTemporal.usuarioID;
  const rutinaId = rutinaTemporal.rutinaId;
  const diaSeleccionado = document.getElementById("selectDia").value;
  const lista = document.getElementById("ejerciciosDelDia");

  if (!usuarioId || !rutinaId || !diaSeleccionado) {
    Swal.fire({
      title: 'Para continuar debes seleccionar un día',
      text: '',
      icon: 'Warning',
      confirmButtonText: 'Ok'
   });
    return;
  }

  const ejerciciosNuevos = Array.from(lista.children).map(li => ({
    id: li.dataset.id,
    nombre: li.textContent
  }));

  if (ejerciciosNuevos.length === 0) {
    Swal.fire({
      title: 'Para continuar debes agregar un ejercicio.',
      text: 'Agrega al menos un ejercicio.',
      icon: 'error',
      confirmButtonText: 'Ok.'
    });
    return;
  }

  const rutinas = obtenerRutinasDesdeStorage();

  
  const ejerciciosExistentes = rutinas[usuarioId].rutinas[rutinaId].dias[diaSeleccionado] || [];

  
  const ejerciciosCombinados = [...ejerciciosExistentes];
  ejerciciosNuevos.forEach(nuevo => {
    if (!ejerciciosExistentes.some(e => e.id === nuevo.id)) {
      ejerciciosCombinados.push(nuevo);
    }
  });

  
  rutinas[usuarioId].rutinas[rutinaId].dias[diaSeleccionado] = ejerciciosCombinados;
  guardarRutinasEnStorage(rutinas);
 

  document.getElementById("ejerciciosDelDia").innerHTML = "";
}





document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("guardarGenerales").addEventListener("click", guardarDatosGenerales);
  document.getElementById("guardarSemana").addEventListener("click", guardarSemana);
  document.getElementById("guardarDia").addEventListener("click", guardarDia);
});

function obtenerRutinasDesdeStorage() {
  return JSON.parse(localStorage.getItem("rutinas")) || {};
}

function guardarRutinasEnStorage(rutinas) {
  localStorage.setItem("rutinas", JSON.stringify(rutinas));
}
