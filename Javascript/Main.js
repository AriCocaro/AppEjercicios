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


document.addEventListener("DOMContentLoaded", () => {
  cargarUsuariosEnSelect();
  cargarEjerciciosEnDatalist();
  configurarInputEjercicio();
});

function cargarUsuariosEnSelect() {
  const usuarios = ["juan", "ana", "lucas"];
  const selectUsuario = document.getElementById("usuarioID");

  usuarios.forEach(u => {
    const option = document.createElement("option");
    option.value = u;
    option.textContent = u;
    selectUsuario.appendChild(option);
  });
}

function cargarEjerciciosEnDatalist() {
  const todosLosEjercicios = [
    ...ejerciciosPredefinidos,
    ...obtenerEjerciciosDesdeLocalStorage()
  ];

  const datalist = document.getElementById("listaDeEjercicios");
  datalist.innerHTML = "";

  todosLosEjercicios.forEach(ej => {
    const option = document.createElement("option");
    option.value = ej.nombre;
    datalist.appendChild(option);
  });
}

function configurarInputEjercicio() {
  const input = document.getElementById("elegirEjercicio");
  const ul = document.getElementById("ejerciciosDelDia");

  if (!input || !ul) return;

  input.addEventListener("change", () => {
    const nombre = input.value.trim();
    if (nombre === "") return;

    // Evitar repetidos en el mismo día
    const yaExiste = Array.from(ul.children).some(li => li.textContent === nombre);
    if (yaExiste) {
      alert("Ese ejercicio ya fue agregado a este día.");
      input.value = "";
      return;
    }

    const li = document.createElement("li");
    li.textContent = nombre;
    ul.appendChild(li);
    input.value = "";
  });
}
