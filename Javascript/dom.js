//html hacerrutina class armadoderutinas

const sectionGenerales = document.getElementById('parametrosGenerales');
const botonGuardarSG = sectionGenerales.querySelector('.guardar');

botonGuardarSG.addEventListener("click", () => {
    const dias = parseInt(document.getElementById("diasNro").value);
    const semanas = parseInt(document.getElementById("semanaNro").value);
    const series = parseInt(document.getElementById("series").value);
    const repeticiones = parseInt(document.getElementById("repeticiones").value);
    const descanso = parseInt(document.getElementById("descanso").value); 


    //cambiar el alert por un swet alert o algo asi
    if (isNaN(dias) || isNaN(semanas) || isNaN(series) || isNaN(repeticiones)) {
        alert("Por favor completar todos los campos");
        return;
    }
  const datosGenerales ={
    dias,
    semanas,
    series,
    repeticiones,
    descanso
  };

  const usuarioId = "UsuarioDemo";

  guardarDatosGenerales(usuarioId,datosGenerales);

});