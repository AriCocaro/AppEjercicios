let rutinaEjercicios = document.getElementById("EjerciciosRealizados")

let cartStorage = localStorage.getItem(rutinaEjercicios)
cartStorage = JSON.parse(cartStorage)

function renderEjerciciosR(IEjercicios){
    IEjercicios.array.forEach(ejercicio => {
        const card = document.createElement("div")
        cartContainer.innerHTML = <h3>${ejercicio.nombre}</h3>
                                 <p>${peso}Kg</p>
     ejerciciosDeRutina.appendChild(card)
    });
}
