//html hacerrutina class armadoderutinas

function guardarDatosGenerales(usuarioId, datosGenerales) {
    // Obtener rutinas ya guardadas en localStorage
    let rutinasGuardadas = JSON.parse(localStorage.getItem('rutinas')) || [];

    // Generar fecha actual con formato "dd-mm-aaaa"
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-AR').replaceAll('/', '-');

    // Generar ID único para la rutina: usuarioId_fecha
    const idRutina = `${usuarioId}_${fecha}`;

    // Crear objeto nueva rutina
    const nuevaRutina = {
        id: idRutina,
        usuarioId: usuarioId, // lo dejamos explícito
        datosGenerales: datosGenerales,
        ejerciciosPorDia: {}
    };

    // Agregar nueva rutina al array general de rutinas
    rutinasGuardadas.push(nuevaRutina);

    // Guardar de nuevo en localStorage
    localStorage.setItem('rutinas', JSON.stringify(rutinasGuardadas));

    // hacer un flotante de rutina guardada con exito
}
