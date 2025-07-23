//USUARIO FILTRO DE USUARIOS EN HACERRUTINA


// Estado temporal para uso interno del sistema
var rutinaTemporal = { usuarioID: null };

// Función global para mostrar lista con filtro
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