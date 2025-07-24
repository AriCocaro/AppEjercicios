// storage.js

function obtenerEjerciciosDesdeLocalStorage() {
  const json = localStorage.getItem(LS_EJERCICIOS);
  return json ? JSON.parse(json) : [];
}

function guardarEjercicioEnLocalStorage(ejercicio) {
  const ejercicios = obtenerEjerciciosDesdeLocalStorage();
  ejercicios.push(ejercicio);
  localStorage.setItem(LS_EJERCICIOS, JSON.stringify(ejercicios));
}

function obtenerUsuariosDeStorage() {
  const json = localStorage.getItem(LS_USUARIOS);
  return json ? JSON.parse(json) : [];
}

function guardarUsuariosEnStorage(usuarios) {
  localStorage.setItem(LS_USUARIOS, JSON.stringify(usuarios));
}
