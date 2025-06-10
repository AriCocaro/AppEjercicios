let nombre = prompt("Hola! - ingresá tu nombre");
console.log(`Nombre ingresado: ${nombre}`);

alert("¡Vamos, comencemos tu entrenamiento!");

// Listas fijas sin length ni for
const ejercicios = ["Sentadilla", "Press banca", "Peso muerto", "Remo"];
const elementos = ["Barra", "Mancuernas", "Máquina", "Otro"];

function ElegirEE(lista, mensaje) {
  let texto = `${mensaje}\n`;

  // Armamos el texto manualmente
  texto += `1. ${lista[0]}\n`;
  texto += `2. ${lista[1]}\n`;
  texto += `3. ${lista[2]}\n`;
  texto += `4. ${lista[3]}\n`;

  let opcion = prompt(texto);
  let numero = parseInt(opcion);

  // Validamos manualmente
  while (isNaN(numero) || numero < 1 || numero > 4) {
    opcion = prompt(`Opción inválida. ${texto}`);
    numero = parseInt(opcion);
  }

  console.log(`${mensaje} Elegido: ${lista[numero - 1]}`);
  return lista[numero - 1];
}

function pedirPeso(ejercicio, elemento) {
  let peso;
  if (elemento === "Barra") {
    alert("Colocá solo el peso de los discos, la barra se suma automáticamente.");
    peso = parseFloat(prompt(`¿Cuántos kilos vas a cargar en discos para ${ejercicio}?`));
    peso += 20;
  } else {
    peso = parseFloat(prompt(`¿Cuántos kilos vas a usar para ${ejercicio} con ${elemento}?`));
  }
  console.log(`Peso ingresado para ${ejercicio} con ${elemento}: ${peso} kg`);
  return peso;
}

function Resumen(nombre, ejercicio, elemento, peso) {
  alert(
    `Resumen de tu carga:\n\n` +
    `Nombre: ${nombre}\n` +
    `Ejercicio: ${ejercicio}\n` +
    `Elemento: ${elemento}\n` +
    `Peso total cargado: ${peso} kg`
  );
  console.log(`Resumen -> Nombre: ${nombre}, Ejercicio: ${ejercicio}, Elemento: ${elemento}, Peso: ${peso} kg`);
}

function continuar() {
  let respuesta = prompt("¿Querés cargar otro ejercicio? (si/no)").toLowerCase();
  while (respuesta !== "si" && respuesta !== "no") {
    respuesta = prompt("Por favor, respondé 'si' o 'no'. ¿Querés cargar otro ejercicio?").toLowerCase();
  }
  console.log(`Respuesta para continuar: ${respuesta}`);
  return respuesta === "si";
}

let seguirEntrenando = true;

while (seguirEntrenando) {
  const ejercicioElegido = ElegirEE(ejercicios, "Elegí el ejercicio a realizar:");
  const elementoElegido = ElegirEE(elementos, "Elegí el elemento que vas a usar:");
  
  const peso = pedirPeso(ejercicioElegido, elementoElegido);

  Resumen(nombre, ejercicioElegido, elementoElegido, peso);

  seguirEntrenando = continuar();
}

alert("¡Entrenamiento finalizado! ¡Buen trabajo!");
console.log("Entrenamiento finalizado.");
