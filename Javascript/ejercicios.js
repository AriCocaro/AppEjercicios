class Ejercicio {
  constructor(id, nombre, grupoMuscular) {
    this.id = id;
    this.nombre = nombre;
    this.grupoMuscular = grupoMuscular;
  }

  validar() {
    return this.nombre.trim() !== "" && this.grupoMuscular.trim() !== "";
  }
}

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
