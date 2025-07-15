//generar id unico 

function generarIdUnico() {
  const timestamp = Date.now().toString(36); 
  const random = Math.random().toString(36).substring(2, 6);
  return `ej_${timestamp}_${random}`;
}
