document.addEventListener("DOMContentLoaded", () => {
  cargarUsuariosEnSelect();      
  cargarEjerciciosEnDatalist();  

  cargarRutinaTemporalDesdeStorage();

  // Listener para actualizar select semanas en tiempo real
  document.getElementById("semanaNro").addEventListener("input", (e) => {
    const semanas = parseInt(e.target.value);
    if (!isNaN(semanas) && semanas > 0) {
      const dias = rutinaTemporal.diasPorSemana || 0;
      popularSelectDiasYSemanas(dias, semanas);
    }
  });

  // Guardar datos generales
  document.querySelector("#parametrosGenerales #guardar").addEventListener("click", () => {
    const usuarioID = document.getElementById("usuarioID").value;
    const semanas = parseInt(document.getElementById("semanaNro").value);
    const dias = parseInt(document.getElementById("diasNro").value);

    if (!usuarioID || !semanas || !dias) {
      alert("Completá todos los campos.");
      return;
    }

    rutinaTemporal.usuarioID = usuarioID;
    rutinaTemporal.semanas = semanas;
    rutinaTemporal.diasPorSemana = dias;
    rutinaTemporal.dias = {};
    rutinaTemporal.semanasDetalle = [];

    for (let i = 1; i <= dias; i++) {
      rutinaTemporal.dias[i] = [];
    }

    popularSelectDiasYSemanas(dias, semanas);
    alert("Datos generales guardados.");
    guardarRutinaTemporalEnStorage();
  });

  // Guardar ejercicios del día
  document.querySelector("#armadoDeRutina #guardar").addEventListener("click", () => {
    const dia = parseInt(document.getElementById("selectDia").value);
    const lista = document.querySelectorAll("#ejerciciosDelDia li");
    const ejercicios = Array.from(lista).map(li => li.textContent.trim());

    if (!dia || ejercicios.length === 0) {
      alert("Agregá ejercicios para el día seleccionado.");
      return;
    }

    guardarEjerciciosDelDia(dia, ejercicios);
    alert(`Ejercicios guardados para el día ${dia}.`);
    guardarRutinaTemporalEnStorage();
  });

  // Guardar parámetros por semana
  ["series", "repeticiones", "descanso"].forEach(id => {
    document.getElementById(id).addEventListener("change", () => {
      const semana = parseInt(document.getElementById("selectorSemana").value);
      const series = parseInt(document.getElementById("series").value);
      const repes = parseInt(document.getElementById("repeticiones").value);
      const descanso = parseInt(document.getElementById("descanso").value);

      if (!semana || !series || !repes || !descanso) return;

      guardarSemanaDetalle(semana, series, repes, descanso);
      actualizarTablaResumen();
      guardarRutinaTemporalEnStorage();
    });
  });

  // Botón final para guardar rutina completa
  const botonFinal = document.createElement("button");
  botonFinal.textContent = "Guardar Rutina Final";
  botonFinal.addEventListener("click", finalizarYGuardarRutina);
  document.body.appendChild(botonFinal);

  // Inicializar selects y tabla si ya hay datos
  if (rutinaTemporal.semanas > 0 && rutinaTemporal.diasPorSemana > 0) {
    popularSelectDiasYSemanas(rutinaTemporal.diasPorSemana, rutinaTemporal.semanas);
    actualizarInputsYTablaDeRutina();
  }
});

// ===================== FUNCIONES AUXILIARES ===================== //

function popularSelectDiasYSemanas(dias, semanas) {
  const selectDia = document.getElementById("selectDia");
  selectDia.innerHTML = "";
  for (let i = 1; i <= dias; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `Día ${i}`;
    selectDia.appendChild(option);
  }

  const selectorSemana = document.getElementById("selectorSemana");
  selectorSemana.innerHTML = "";
  for (let i = 1; i <= semanas; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `Semana ${i}`;
    selectorSemana.appendChild(option);
  }
}

function guardarEjerciciosDelDia(dia, ejercicios) {
  rutinaTemporal.dias[dia] = ejercicios;
}

function guardarSemanaDetalle(semana, series, repeticiones, descanso) {
  const index = rutinaTemporal.semanasDetalle.findIndex(s => s.semana === semana);
  if (index !== -1) {
    rutinaTemporal.semanasDetalle[index] = { semana, series, repeticiones, descanso };
  } else {
    rutinaTemporal.semanasDetalle.push({ semana, series, repeticiones, descanso });
  }

  // Recortar semanasDetalle si hay más de las necesarias
  rutinaTemporal.semanasDetalle = rutinaTemporal.semanasDetalle
    .filter(s => s.semana <= rutinaTemporal.semanas);
}

function actualizarTablaResumen() {
  const tbody = document.querySelector("#tablaResumen tbody");
  tbody.innerHTML = "";

  rutinaTemporal.semanasDetalle
    .sort((a, b) => a.semana - b.semana)
    .forEach(s => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>Semana ${s.semana}</td>
        <td>${s.repeticiones}</td>
        <td>${s.series}</td>
        <td>${s.descanso} seg</td>
      `;
      tbody.appendChild(tr);
    });
}

function actualizarInputsYTablaDeRutina() {
  const selectorSemana = document.getElementById("selectorSemana");
  selectorSemana.innerHTML = "";

  for (let i = 1; i <= rutinaTemporal.semanas; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `Semana ${i}`;
    selectorSemana.appendChild(option);
  }

  cargarDatosSemanaEnInputs(selectorSemana.value);
  actualizarTablaResumen();
}

function cargarDatosSemanaEnInputs(semana) {
  const detalleSemana = rutinaTemporal.semanasDetalle.find(s => s.semana === parseInt(semana));
  if (detalleSemana) {
    document.getElementById("series").value = detalleSemana.series;
    document.getElementById("repeticiones").value = detalleSemana.repeticiones;
    document.getElementById("descanso").value = detalleSemana.descanso;
  } else {
    document.getElementById("series").value = "";
    document.getElementById("repeticiones").value = "";
    document.getElementById("descanso").value = "";
  }
}

document.getElementById("selectorSemana").addEventListener("change", (e) => {
  cargarDatosSemanaEnInputs(e.target.value);
});

// Guardar la rutina temporal
function guardarRutinaTemporalEnStorage() {
  if (!rutinaTemporal.usuarioID) return;

  let rutinas = JSON.parse(localStorage.getItem("rutinasGuardadas")) || [];

  const index = rutinas.findIndex(r => r.id === rutinaTemporal.id);
  if (index !== -1) {
    rutinas[index] = rutinaTemporal;
  } else {
    rutinas.push(rutinaTemporal);
  }

  localStorage.setItem("rutinasGuardadas", JSON.stringify(rutinas));
}

// Cargar rutina temporal desde localStorage
function cargarRutinaTemporalDesdeStorage() {
  const rutinas = JSON.parse(localStorage.getItem("rutinasGuardadas")) || [];
  if (rutinas.length > 0) {
    rutinaTemporal = rutinas[0]; // por ahora solo cargamos la primera
  }
}

// Finalizar rutina
function finalizarYGuardarRutina() {
  if (!rutinaTemporal.usuarioID) {
    alert("Seleccioná un usuario y completá los datos generales antes de guardar la rutina.");
    return;
  }

  if (rutinaTemporal.semanasDetalle.length !== rutinaTemporal.semanas) {
    alert("Completá todos los datos de las semanas.");
    return;
  }

  guardarRutinaTemporalEnStorage();
  alert("Rutina guardada exitosamente!");
}
