function guardarEjercicioEnLocalStorage(ejercicio) {
  const ejercicios = obtenerEjerciciosDesdeLocalStorage();
  ejercicios.push(ejercicio);
  localStorage.setItem(LS_EJERCICIOS, JSON.stringify(ejercicios));
}

function obtenerEjerciciosDesdeLocalStorage() {
  return JSON.parse(localStorage.getItem(LS_EJERCICIOS)) || [];
}
