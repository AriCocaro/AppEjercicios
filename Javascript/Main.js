// crear ejercicio, que no se repita y se muestre

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar ejercicios al cargar
  mostrarEjerciciosEnLista();

  // Formulario de carga de ejercicios
  const form = document.getElementById("formEjercicio");
  const inputNombre = document.getElementById("inputNombre");
  const selectGrupo = document.getElementById("selectGrupo");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = inputNombre.value.trim();
      const grupo = selectGrupo.value;

      const nuevoEjercicio = new Ejercicio(generarIdUnico(), nombre, grupo);

      const ejerciciosExistentes = [
        ...ejerciciosPredefinidos,
        ...obtenerEjerciciosDesdeLocalStorage()
      ];

      const yaExiste = ejerciciosExistentes.some(ej =>
        ej.nombre.toLowerCase() === nombre.toLowerCase() &&
        ej.grupoMuscular === grupo
      );

      if (yaExiste) {
        alert("Ya existe un ejercicio con ese nombre y grupo muscular");
        return;
      }

      if (nuevoEjercicio.validar()) {
        guardarEjercicioEnLocalStorage(nuevoEjercicio);
        form.reset();
        alert("Ejercicio guardado con éxito");
        mostrarEjerciciosEnLista();
      } else {
        alert("Por favor, completá todos los campos");
      }
    });
  }

  // Buscador de ejercicios
  const buscador = document.getElementById("buscadorEjercicios");
  if (buscador) {
    buscador.addEventListener("input", (e) => {
      const texto = e.target.value.trim();
      mostrarEjerciciosEnLista(texto);
    });
  }
});


// Captura y manejo del formulario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEjercicio");
  const inputNombre = document.getElementById("inputNombre");
  const selectGrupo = document.getElementById("selectGrupo");

  form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  const grupo = selectGrupo.value;

  const nuevoEjercicio = new Ejercicio(generarIdUnico(), nombre, grupo);

  // ver si esta repetido
  const ejerciciosExistentes = [
    ...ejerciciosPredefinidos,
    ...obtenerEjerciciosDesdeLocalStorage()
  ];

  const yaExiste = ejerciciosExistentes.some(ej =>
    ej.nombre.toLowerCase() === nombre.toLowerCase() &&
    ej.grupoMuscular === grupo
  );

  if (yaExiste) {
    alert("Ya existe un ejercicio con ese nombre y grupo muscular");
    return;
  }

  // guardar si no esta repetido
  if (nuevoEjercicio.validar()) {
    guardarEjercicioEnLocalStorage(nuevoEjercicio);
    form.reset();
    alert("Ejercicio guardado con éxito");
    mostrarEjerciciosEnLista();
  } else {
    alert("Por favor, completá todos los campos");
  }
    //mostrar sin actualizar
     mostrarEjerciciosEnLista();
  });
});

// Mostrar los ejercicios ya guardados y filtro
function mostrarEjerciciosEnLista(filtro = "") {
  const contenedor = document.getElementById("cardsEjercicios");
  contenedor.innerHTML = "";

  const ejerciciosGuardados = obtenerEjerciciosDesdeLocalStorage();
  const todos = [...ejerciciosPredefinidos, ...ejerciciosGuardados];

  const ejerciciosFiltrados = todos.filter(ej =>
    ej.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  if (ejerciciosFiltrados.length === 0) {
    contenedor.innerHTML = `<p class="text-muted">No se encontraron ejercicios con ese nombre.</p>`;
    return;
  }

  ejerciciosFiltrados.forEach((ej) => {
    const tipo = ej.id.startsWith("pre_") ? "Preestablecido" : "Creado por vos";
    const color = ej.id.startsWith("pre_") ? "secondary" : "primary";

    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card border-${color} shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${ej.nombre}</h5>
          <p class="card-text"><strong>Grupo muscular:</strong> ${ej.grupoMuscular}</p>
          <p class="card-text"><small class="text-muted">${tipo}</small></p>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });
}
//evento de filtrar 
document.addEventListener("DOMContentLoaded", () => {
  mostrarEjerciciosEnLista(); // Mostrar todos al inicio

  const buscador = document.getElementById("buscadorEjercicios");
  if (buscador) {
    buscador.addEventListener("input", (e) => {
      const texto = e.target.value.trim();
      mostrarEjerciciosEnLista(texto);
    });
  }
});


// hacer rutina
//deifinir lista de usuario 
input.addEventListener("focus", () => {
  mostrarListaCompleta();
});


//  guardar en localstorage, todos los botones guardar y escucha a cual se clickeo 

// Selecciona todos los botones
const botones = document.querySelectorAll(".guardar-btn");

// Recorres cada uno y le agregás un listener
botones.forEach(boton => {
  boton.addEventListener("click", (e) => {
    // `e.currentTarget` hace referencia al botón clickeado
    const botonClickeado = e.currentTarget;

    // Por ejemplo, podés sacar un atributo personalizado
    const id = botonClickeado.dataset.id;

    // Guardás en localStorage o hacés otra acción
    localStorage.setItem("usuarioSeleccionado", id);
    console.log(`Guardado: ${id}`);
  });
});


// elegir dia segun lo ingresado con anterioridad
document.addEventListener("DOMContentLoaded", () => {
  const inputDiasNro = document.getElementById("diasNro");
  const selectDia = document.getElementById("selectDia");

  inputDiasNro.addEventListener("input", () => {
    const nroDias = parseInt(inputDiasNro.value);
    selectDia.innerHTML = ""; // Limpiar opciones previas

    if (!nroDias || nroDias < 1) return;

    // Opción por defecto
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


//ejercicios por dia 
