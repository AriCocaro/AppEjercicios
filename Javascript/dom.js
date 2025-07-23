document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("usuarioId");
  const lista = document.getElementById("listaUsuarios");

  if (!input || !lista) return;

  input.addEventListener("focus", () => {
    mostrarListaFiltrada("");
  });

  input.addEventListener("input", (e) => {
    mostrarListaFiltrada(e.target.value);
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !lista.contains(e.target)) {
      lista.classList.add("oculto");
    }
  });
});
