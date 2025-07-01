const ejercicios = [
  {
    id: 1,
    nombre: "sentadilla",
    peso: 20 

  },
  {
    id: 2,
    nombre: "peso muerto",
    peso: 40 

  },


  {
    id: 3,
    nombre: "remo con barra",
    peso: 20 

  },
  {
    id: 4,
    nombre: "press plano",
    peso: 15 

  }

]

let ejerciciosDeRutina = document.getElementById("ejercicios")
let rutinaEjercicios = []

function renderRutina(ejerciciosArray) {
  ejerciciosArray.array.forEach(ejercicio => {
    const card = document.createElement("div")
    card.innerHTML = <h3> ${ejercicio.nombre}</h3>
                     <p> ${ejercicio.peso}Kg</p>
                    <button class="agregarEjercicio" id="${ejercicio.id}">Ya realizado</button>
  ejerciciosDeRutina.appendChild(card)
  })
  agregarEjercicio()


}
renderRutina(ejercicios)

function agregarEjercicio() {
  addButton = document.querySelectorAll(".agregarEjercicio")
  addButton.forEach(button =>{
    button.onclick = (e) => {
      const ejercicioId = e.currentTarget.id
      const seleccionarejercicio = ejercicios.find( ejercicio => ejercicio.id == ejercicioId)

      rutinaEjercicios.push(seleccionarejercicio)


      localStorage.setItem("rutinaEjercicios", JSON.stringify(rutinaEjercicios))



    }

  })
}