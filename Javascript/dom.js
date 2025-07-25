// dom.js

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("usuarioId");
  const lista = document.getElementById("listaUsuarios");

  if (!input || !lista) return;

  input.addEventListener("focus", () => {
    mostrarListaFiltrada(""); // Mostrar todos al hacer foco
  });

  input.addEventListener("input", (e) => {
    mostrarListaFiltrada(e.target.value); // Filtrar al escribir
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !lista.contains(e.target)) {
      lista.classList.add("oculto"); // Ocultar si clic afuera
    }
  });
});



//selector de semanas segun nro de semansa ingresado antes 
document.addEventListener("DOMContentLoaded", () => {
  const inputSemanaNro = document.getElementById("semanaNro");
  const selectorSemana = document.getElementById("selectorSemana");

  const inputSeries = document.getElementById("series");
  const inputRepeticiones = document.getElementById("repeticiones");
  const inputDescanso = document.getElementById("descanso");

  const tablaResumenBody = document.querySelector("#tablaResumen tbody");

  // Objeto donde guardamos los datos de las semanas
  let semanasGuardadas = {};

  // Función para llenar el selector según el número ingresado
  function llenarSelectorSemanas(cantidad) {
    selectorSemana.innerHTML = "";

    // Opción inicial por defecto
    const opcionDefault = document.createElement("option");
    opcionDefault.value = "";
    opcionDefault.textContent = "Seleccionar semana";
    opcionDefault.selected = true;
    opcionDefault.disabled = true;
    selectorSemana.appendChild(opcionDefault);

    for (let i = 1; i <= cantidad; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Semana ${i}`;
      selectorSemana.appendChild(option);
    }
  }

  // Función para actualizar la tabla con las semanas guardadas
  function actualizarTabla() {
    tablaResumenBody.innerHTML = "";
    for (const semana in semanasGuardadas) {
      const datos = semanasGuardadas[semana];
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>Semana ${semana}</td>
        <td>${datos.repeticiones}</td>
        <td>${datos.series}</td>
        <td>${datos.descanso}</td>
      `;
      tablaResumenBody.appendChild(tr);
    }
  }

  // Guardar datos actuales en semanasGuardadas y limpiar inputs
  function guardarDatosSemana(semana) {
    if (!semana) return;

    // Guardamos sólo si hay al menos un dato
    if (inputSeries.value || inputRepeticiones.value || inputDescanso.value) {
      semanasGuardadas[semana] = {
        series: inputSeries.value || "",
        repeticiones: inputRepeticiones.value || "",
        descanso: inputDescanso.value || ""
      };
    }

    // Limpiamos inputs para la próxima carga
    inputSeries.value = "";
    inputRepeticiones.value = "";
    inputDescanso.value = "";

    actualizarTabla();
  }

  // Evento: al cambiar el número de semanas, actualizar selector y resetear datos
  inputSemanaNro.addEventListener("input", () => {
    const nro = parseInt(inputSemanaNro.value);
    if (nro > 0) {
      llenarSelectorSemanas(nro);
      semanasGuardadas = {}; // reseteo total
      actualizarTabla();
    } else {
      selectorSemana.innerHTML = "";
      semanasGuardadas = {};
      actualizarTabla();
    }
  });

  // Evento: al cambiar la semana seleccionada
  selectorSemana.addEventListener("change", () => {
    // Guardamos los datos de la semana anterior (si existía y no era la opción default)
    const semanaAnterior = selectorSemana.dataset.semanaAnterior;
    if (semanaAnterior && semanaAnterior !== "") {
      guardarDatosSemana(semanaAnterior);
    }

    // Actualizamos el data-attribute para la próxima vez
    const semanaActual = selectorSemana.value;
    selectorSemana.dataset.semanaAnterior = semanaActual;

    // Si la opción seleccionada es la por defecto, limpiamos inputs y no cargamos nada
    if (!semanaActual) {
      inputSeries.value = "";
      inputRepeticiones.value = "";
      inputDescanso.value = "";
      return;
    }

    // Cargar datos guardados (si existen) para esta semana en inputs
    if (semanasGuardadas[semanaActual]) {
      inputSeries.value = semanasGuardadas[semanaActual].series;
      inputRepeticiones.value = semanasGuardadas[semanaActual].repeticiones;
      inputDescanso.value = semanasGuardadas[semanaActual].descanso;
    } else {
      inputSeries.value = "";
      inputRepeticiones.value = "";
      inputDescanso.value = "";
    }

    // Si ya cargaste datos para todas las semanas, guardá todo en localStorage
    const totalSemanas = selectorSemana.options.length - 1; // menos la opción default
    if (Object.keys(semanasGuardadas).length === totalSemanas) {
      localStorage.setItem("semanasGuardadas", JSON.stringify(semanasGuardadas));
      console.log("Todos los datos guardados en localStorage");
      alert("Se han guardado los datos de todas las semanas.");
    }
  });

  // Inicializamos con selector vacío
  llenarSelectorSemanas(0);
});


// vista previa de los dias 




document.addEventListener("DOMContentLoaded", () => {
  const btnVistaFlotante = document.getElementById("vistaFlotante");
  const contenedorVistaFlotante = document.getElementById("vistaFlotanteContenido");

  btnVistaFlotante.addEventListener("click", () => {
    // Alternar visibilidad
    const visible = contenedorVistaFlotante.style.display === "block";
    contenedorVistaFlotante.style.display = visible ? "none" : "block";

    if (!visible) {
      mostrarVistaPreviaFlotante(); // Solo actualiza si se va a mostrar
    }
  });

  function mostrarVistaPreviaFlotante() {
    const usuarioId = rutinaTemporal?.usuarioID;
    const rutinaId = rutinaTemporal?.rutinaId;
    const rutinas = obtenerRutinasDesdeStorage();

    contenedorVistaFlotante.innerHTML = "";

    if (!usuarioId || !rutinaId || !rutinas[usuarioId]?.rutinas?.[rutinaId]?.dias) {
      contenedorVistaFlotante.innerHTML = "<p>No hay ejercicios cargados.</p>";
      return;
    }

    const dias = rutinas[usuarioId].rutinas[rutinaId].dias;

    Object.entries(dias).forEach(([dia, ejercicios]) => {
      const diaContainer = document.createElement("div");
      diaContainer.style.marginBottom = "10px";

      const titulo = document.createElement("strong");
      titulo.textContent = `Día ${dia}`;
      diaContainer.appendChild(titulo);

      const lista = document.createElement("ul");
      lista.style.margin = "4px 0";

      ejercicios.forEach(ej => {
        const item = document.createElement("li");
        item.textContent = ej.nombre || "Ejercicio sin nombre";
        lista.appendChild(item);
      });

      diaContainer.appendChild(lista);
      contenedorVistaFlotante.appendChild(diaContainer);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const boton = document.getElementById('guardarRutina');
  
  if (boton) {
    boton.addEventListener('click', () => {
      Swal.fire({
        title: '¡Rutina guardada!',
        text: 'Tu rutina fue guardada correctamente.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(result => {
        if (result.isConfirmed) {
          window.location.href = './instructor.html';
        }
      });
    });
  } 
});
