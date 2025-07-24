// main.js

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar todos los ejercicios al cargar
  mostrarEjerciciosEnLista();

  // Formulario de carga de ejercicios
  const form = document.getElementById("formEjercicio");
  const inputNombre = document.getElementById("inputNombre");
  const selectGrupo = document.getElementById("selectGrupo");
  const buscador = document.getElementById("buscadorEjercicios");

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

  if (buscador) {
    buscador.addEventListener("input", (e) => {
      const texto = e.target.value.trim();
      mostrarEjerciciosEnLista(texto);
    });
  }

  // Mostrar lista completa usuarios al hacer foco (ejemplo)
  const inputUsuario = document.getElementById("usuarioId");
  if (inputUsuario) {
    inputUsuario.addEventListener("focus", () => {
      mostrarListaFiltrada("");
    });
  }

  // Guardar en localStorage el usuario seleccionado desde botones .guardar-btn
  const botones = document.querySelectorAll(".guardar-btn");
  botones.forEach(boton => {
    boton.addEventListener("click", (e) => {
      const botonClickeado = e.currentTarget;
      const id = botonClickeado.dataset.id;
      localStorage.setItem("usuarioSeleccionado", id);
      console.log(`Guardado usuario seleccionado: ${id}`);
    });
  });

  // Elegir día según cantidad ingresada
  const inputDiasNro = document.getElementById("diasNro");
  const selectDia = document.getElementById("selectDia");

  if (inputDiasNro && selectDia) {
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
  }
});

// Función para mostrar ejercicios (filtrados)
function mostrarEjerciciosEnLista(filtro = "") {
  const contenedor = document.getElementById("cardsEjercicios");
  if (!contenedor) return;

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

  ejerciciosFiltrados.forEach(ej => {
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
