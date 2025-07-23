function guardarEjercicioEnLocalStorage(ejercicio) {
  const ejercicios = obtenerEjerciciosDesdeLocalStorage();
  ejercicios.push(ejercicio);
  localStorage.setItem(LS_EJERCICIOS, JSON.stringify(ejercicios));
}

function obtenerEjerciciosDesdeLocalStorage() {
  return JSON.parse(localStorage.getItem(LS_EJERCICIOS)) || [];
}


// hacer rutina // usuario

function guardarUsuariosEnStorage(usuarios) {
  localStorage.setItem(LS_USUARIOS, JSON.stringify(usuarios));
}

function obtenerUsuariosDeStorage() {
  const data = localStorage.getItem(LS_USUARIOS);
  return data ? JSON.parse(data) : [];
}
