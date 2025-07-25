// rutinas.js

// Estado temporal para sistema (opcional)
var rutinaTemporal = { usuarioID: null };

// Función para mostrar lista filtrada de usuarios según texto
function mostrarListaFiltrada(texto) {
  const lista = document.getElementById("listaUsuarios");
  if (!lista) return;

  lista.innerHTML = "";
  const textoFiltrado = texto.toLowerCase();

  // Usamos usuariosPredefinidos definidos en dataprecarga.js
  const resultados = usuariosPredefinidos.filter(usuario =>
    (`${usuario.nombre} ${usuario.apellido}`.toLowerCase().includes(textoFiltrado)) ||
    usuario.id.includes(textoFiltrado)
  );

  if (resultados.length === 0) {
    lista.classList.add("oculto");
    return;
  }

  resultados.forEach(usuario => {
    const li = document.createElement("li");
    li.textContent = `${usuario.nombre} ${usuario.apellido} - ${usuario.id}`;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      const input = document.getElementById("usuarioId");
      input.value = `${usuario.nombre} ${usuario.apellido}`;
      rutinaTemporal.usuarioID = usuario.id; // Guardar ID si necesitás
      lista.classList.add("oculto");
    });

    lista.appendChild(li);
  });

  lista.classList.remove("oculto");
}

// Agregar cantidad de días a selector (desde input)
document.addEventListener("DOMContentLoaded", () => {
  const inputDiasNro = document.getElementById("diasNro");
  const selectDia = document.getElementById("selectDia");

  if (!inputDiasNro || !selectDia) return;

  inputDiasNro.addEventListener("input", () => {
    const nroDias = parseInt(inputDiasNro.value);
    selectDia.innerHTML = "";

    if (!nroDias || nroDias < 1) return;

    const optionInicial = document.createElement("option");
    optionInicial.value = "";
    optionInicial.textContent = "Elegí el día";
    optionInicial.disabled = true;
    optionInicial.selected = true;
    selectDia.appendChild(optionInicial);

    for (let i = 1; i <= nroDias; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Día ${i}`;
      selectDia.appendChild(option);
    }
  });
});

// buscador de ejercicios 

// Esta función carga la lista en el datalist
// Obtener todos los ejercicios combinados
function obtenerTodosLosEjercicios() {
  const guardados = obtenerEjerciciosDesdeLocalStorage();
  return [...ejerciciosPredefinidos, ...guardados];
}

// Escuchar cuando se elige un ejercicio

document.addEventListener("DOMContentLoaded", () => {
  poblarListaDeEjercicios();

  document.getElementById("elegirEjercicio").addEventListener("change", (e) => {
    const nombreIngresado = e.target.value.trim();
    if (!nombreIngresado) return;

    const todos = obtenerTodosLosEjercicios();
    const ejercicioEncontrado = todos.find(ej => ej.nombre.toLowerCase() === nombreIngresado.toLowerCase());

    if (!ejercicioEncontrado) {
      alert("El ejercicio ingresado no existe en la base.");
      return;
    }

    agregarEjercicioALaLista(ejercicioEncontrado);
    e.target.value = ""; // Limpiar input después de seleccionar
  });
});

function obtenerTodosLosEjercicios() {
  const ejerciciosGuardados = obtenerEjerciciosDesdeLocalStorage() || [];
  return [...ejerciciosPredefinidos, ...ejerciciosGuardados];
}

function poblarListaDeEjercicios() {
  const todos = obtenerTodosLosEjercicios();
  const datalist = document.getElementById("listaDeEjercicios");

  datalist.innerHTML = "";

  todos.forEach(ej => {
    const option = document.createElement("option");
    option.value = ej.nombre;
    datalist.appendChild(option);
  });
}

function agregarEjercicioALaLista(ejercicio) {
  const lista = document.getElementById("ejerciciosDelDia");

  const yaExiste = Array.from(lista.children).some(
    li => li.dataset.id === ejercicio.id
  );
  if (yaExiste) {
    alert("Ese ejercicio ya fue agregado.");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${ejercicio.nombre} `;
  li.dataset.id = ejercicio.id;
  lista.appendChild(li);
}

// guardar
function obtenerRutinasDesdeStorage() {
  return JSON.parse(localStorage.getItem("rutinas")) || {};
}

function guardarRutinasEnStorage(rutinas) {
  localStorage.setItem("rutinas", JSON.stringify(rutinas));
}

// Guardar datos generales (días y semanas)
function guardarDatosGenerales() {
  const usuarioId = rutinaTemporal.usuarioID;
  const dias = parseInt(document.getElementById("diasNro").value);
  const semana = parseInt(document.getElementById("semanaNro").value);

  if (!usuarioId || !dias || !semana) {
    alert("Completá todos los datos generales.");
    return;
  }

  const rutinas = obtenerRutinasDesdeStorage();

  if (!rutinas[usuarioId]) {
    rutinas[usuarioId] = { generales: {}, semanas: {}, dias: {} };
  }

  rutinas[usuarioId].generales = { dias, semana };
  guardarRutinasEnStorage(rutinas);
  alert("Datos generales guardados");
}

// Guardar configuración por semana (series, repeticiones, descanso)
function guardarSemana() {
  const usuarioId = rutinaTemporal.usuarioID;
  const semanaSeleccionada = parseInt(document.getElementById("selectorSemana").value);
  const series = parseInt(document.getElementById("series").value);
  const repeticiones = parseInt(document.getElementById("repeticiones").value);
  const descanso = parseInt(document.getElementById("descanso").value);

  if (!usuarioId || !semanaSeleccionada || !series || !repeticiones || !descanso) {
    alert("Completá los datos de semana.");
    return;
  }

  const rutinas = obtenerRutinasDesdeStorage();

  if (!rutinas[usuarioId]) {
    rutinas[usuarioId] = { generales: {}, semanas: {}, dias: {} };
  }

  rutinas[usuarioId].semanas[semanaSeleccionada] = {
    series, repeticiones, descanso
  };

  guardarRutinasEnStorage(rutinas);
  alert("Semana guardada");
}

// Guardar ejercicios seleccionados por día
function guardarDia() {
  const usuarioId = rutinaTemporal.usuarioID;
  const diaSeleccionado = document.getElementById("selectDia").value;
  const lista = document.getElementById("ejerciciosDelDia");

  if (!usuarioId || !diaSeleccionado) {
    alert("Seleccioná un día.");
    return;
  }

  const ejercicios = Array.from(lista.children).map(li => ({
    id: li.dataset.id,
    nombre: li.textContent
  }));

  if (ejercicios.length === 0) {
    alert("Agregá al menos un ejercicio.");
    return;
  }

  const rutinas = obtenerRutinasDesdeStorage();

  if (!rutinas[usuarioId]) {
    rutinas[usuarioId] = { generales: {}, semanas: {}, dias: {} };
  }

  rutinas[usuarioId].dias[diaSeleccionado] = ejercicios;
  guardarRutinasEnStorage(rutinas);
  alert("Ejercicios del día guardados");
  lista.innerHTML = ""; // Limpia lista si querés

  document.getElementById("ejerciciosDelDia").innerHTML = "";

}

// Botón principal que escucha los tres guardados
document.getElementById("guardar").addEventListener("click", (e) => {
  const idBoton = e.target.dataset.id;

  if (idBoton === "gdg") guardarDatosGenerales();
  if (idBoton === "gds") guardarSemana();
  if (idBoton === "gd") guardarDia();
});


//vista previa dias
document.getElementById("verVistaPrevia").addEventListener("click", mostrarVistaPrevia);

function mostrarVistaPrevia() {
  const usuarioId = rutinaTemporal.usuarioID;
  const rutinas = JSON.parse(localStorage.getItem("rutinas")) || {};
  const vistaDiv = document.getElementById("VPTodosLosDias");

  // Limpia la vista previa antes de mostrar
  vistaDiv.innerHTML = "";

  if (!usuarioId || !rutinas[usuarioId] || !rutinas[usuarioId].dias) {
    vistaDiv.innerHTML = "<p>No hay ejercicios cargados para este usuario.</p>";
    return;
  }

  const dias = rutinas[usuarioId].dias;

  Object.entries(dias).forEach(([dia, ejercicios]) => {
    const diaContainer = document.createElement("div");
    diaContainer.classList.add("dia-preview");

    const titulo = document.createElement("h3");
    titulo.textContent = `Día ${dia}`;
    diaContainer.appendChild(titulo);

    const lista = document.createElement("ul");
    ejercicios.forEach(ej => {
      const item = document.createElement("li");
      item.textContent = ej.nombre;
      lista.appendChild(item);
    });

    diaContainer.appendChild(lista);
    vistaDiv.appendChild(diaContainer);
  });
}
