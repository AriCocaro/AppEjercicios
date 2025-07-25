

// Estado temporal para sistema
var rutinaTemporal = { usuarioID: null };

//
function mostrarListaFiltrada(texto) {
  const lista = document.getElementById("listaUsuarios");
  if (!lista) return;

  lista.innerHTML = "";
  const textoFiltrado = texto.toLowerCase();

  
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
      rutinaTemporal.usuarioID = usuario.id; 
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
      Swal.fire({
        title: 'Ejercicio incorrecto',
        text: 'Ingresaste un ejercicio que no se encuentra en la base de datos.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
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
    Swal.fire({
      title: 'Error!',
      text: 'Este ejercicio ya fue incluido hoy',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${ejercicio.nombre} `;
  li.dataset.id = ejercicio.id;
  lista.appendChild(li);
}


