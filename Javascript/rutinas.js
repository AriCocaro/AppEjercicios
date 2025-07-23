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


//agregar la cantidad de dias 
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
//filtro de ejercicios
    

// lógica para filtrar ejercicios según filtro de texto
export function actualizarDatalistEjercicios(filtro, ejerciciosPredefinidos, ejerciciosGuardados) {
  return [...ejerciciosPredefinidos, ...ejerciciosGuardados].filter(ej =>
    ej.nombre.toLowerCase().includes(filtro.toLowerCase())
  );
}
