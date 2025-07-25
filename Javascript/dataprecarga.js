//Ejercicios pre-definidos
const ejerciciosPredefinidos = [
  {
    id: "pre_001",
    nombre: "Sentadillas",
    grupoMuscular: "Piernas"
  },
    {
    id: "pre_002",
    nombre: "Isquisurales en camilla",
    grupoMuscular: "Piernas"
  },
  {
    id: "pre_003",
    nombre: "Press plano",
    grupoMuscular: "Pecho"
  },
  {
    id: "pre_004",
    nombre: "Remo",
    grupoMuscular: "Espalda"
  }
];
//localstorage ejercicios guardados
const LS_EJERCICIOS = "ejerciciosGuardados"

// hacer rutinas // usuario

const usuariosPredefinidos = [
  { id: "12345678", nombre: "Juan", apellido: "Pérez" },
  { id: "23456789", nombre: "Ana", apellido: "López" },
  { id: "34567890", nombre: "Lucas", apellido: "García" }
];

const LS_USUARIOS = "usuariosGuardados"


//Rutinas pre cargadas 

const rutinasPredefinidas = [
  {
    rutinaId: "Fuerza Nivel 1",
    usuarioId: null,
    semanas: [
      { semana: 1, series: 3, repeticiones: 12, descanso: 60 },
      { semana: 2, series: 4, repeticiones: 10, descanso: 60 }
    ],
    dias: [
      {
        dia: 1,
        ejercicios: [
          { id: "ej1", nombre: "Sentadillas" },
          { id: "ej2", nombre: "Prensa 45°" }
        ]
      },
      {
        dia: 2,
        ejercicios: [
          { id: "ej3", nombre: "Remo con barra" },
          { id: "ej4", nombre: "Dominadas asistidas" }
        ]
      }
    ]
  },
  {
    nombre: "Fullbody x3",
    usuarioId: null,
    semanas: [
      { semana: 1, series: 4, repeticiones: 10, descanso: 45 }
    ],
    dias: [
      {
        dia: 1,
        ejercicios: [
          { id: "ej5", nombre: "Peso muerto" },
          { id: "ej6", nombre: "Zancadas con mancuernas" }
        ]
      },
      {
        dia: 2,
        ejercicios: [
          { id: "ej7", nombre: "Press banca" },
          { id: "ej8", nombre: "Aperturas planas" }
        ]
      },
      {
        dia: 3,
        ejercicios: [
          { id: "ej9", nombre: "Press militar" },
          { id: "ej10", nombre: "Elevaciones laterales" }
        ]
      }
    ]
  },
  {
    nombre: "Hipertrofia Intermedia",
    usuarioId: null,
    semanas: [
      { semana: 1, series: 4, repeticiones: 12, descanso: 60 },
      { semana: 2, series: 5, repeticiones: 10, descanso: 45 },
      { semana: 3, series: 5, repeticiones: 8, descanso: 30 }
    ],
    dias: [
      {
        dia: 1,
        ejercicios: [
          { id: "ej11", nombre: "Curl de bíceps" },
          { id: "ej12", nombre: "Press francés" }
        ]
      },
      {
        dia: 2,
        ejercicios: [
          { id: "ej13", nombre: "Despegue rumano" },
          { id: "ej14", nombre: "Buenos días" }
        ]
      }
    ]
  }
];

const LS_RUTINAS = "rutinasPreCargadas"