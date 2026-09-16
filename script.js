// preguntas
const preguntas = [
  {
    pregunta: "¿Cada cuántos años se celebra el Mundial de fútbol?",
    opciones: ["2 años", "3 años", "4 años", "5 años"],
    correcta: 2
  },
  {
    pregunta: "¿Cuántos jugadores tiene un equipo de baloncesto en cancha?",
    opciones: ["4", "5", "6", "7"],
    correcta: 1
  },
  {
    pregunta: "¿En qué país se originaron los Juegos Olímpicos antiguos?",
    opciones: ["Italia", "Egipto", "Grecia", "España"],
    correcta: 2
  },
  {
    pregunta: "¿Qué selección tiene más Mundiales de fútbol ganados?",
    opciones: ["Alemania", "Argentina", "Italia", "Brasil"],
    correcta: 3
  },
  {
    pregunta: "¿En qué deporte se utiliza un objeto llamado volante o plumilla en lugar de una pelota?",
    opciones: ["Golf", "Tenis", "Hockey", "Bádminton"],
    correcta: 3
  }
];

// Copia temporal de las preguntas q se guardan en el array principal una vez que se guardaron los cambios al editar
let preguntas_editando = [];

// Variables que cambian
let indice_actual = 0;
let puntaje = 0;
let respondida = false;
let racha = 0; // lo de las rachas fue hecho con ayuda de IA
let racha_mas_alta = 0;
let campos_edicion = [];

// Los queryselectro
const texto_pregunta = document.querySelector('#texto_pregunta');
const contenedor_opciones = document.querySelector('#contenedor_opciones');
const contador_pregunta = document.querySelector('#contador_pregunta');
const racha_actual = document.querySelector('#racha_actual');
const mensaje_respuesta = document.querySelector('#texto_feedback');
const boton_siguiente = document.querySelector('#boton_siguiente');

const pantalla_inicio = document.querySelector('#pantalla_inicio');
const pantalla_quiz = document.querySelector('#pantalla_quiz');
const pantalla_resultados = document.querySelector('#pantalla_resultados');
const pantalla_editar = document.querySelector('#pantalla_editar');

const boton_empezar = document.querySelector('#boton_empezar');
const boton_editar = document.querySelector('#boton_editar');

const pantalla_resultados_texto = document.querySelector('#texto_puntaje_final');
const texto_racha_final = document.querySelector('#texto_racha_final');
const boton_reiniciar = document.querySelector('#boton_reiniciar');
const boton_reintentar = document.querySelector('#boton_reintentar');

const contenedor_edicion = document.querySelector('#contenedor_edicion');
const boton_agregar_pregunta = document.querySelector('#boton_agregar_pregunta');
const boton_guardar_edicion = document.querySelector('#boton_guardar_edicion');
const boton_volver_inicio = document.querySelector('#boton_volver_inicio');

// Funcion para cambiar entre las pantallas
function cambiar_pantalla(pantalla_a_mostrar) {
  pantalla_inicio.classList.remove('activa');
  pantalla_quiz.classList.remove('activa');
  pantalla_resultados.classList.remove('activa');
  pantalla_editar.classList.remove('activa');

  pantalla_a_mostrar.classList.add('activa');
}

// Funciones para las preguntas
function mostrar_pregunta() {
  const pregunta_actual = preguntas[indice_actual];

  respondida = false;

  texto_pregunta.textContent = pregunta_actual.pregunta;
  contador_pregunta.textContent = `Pregunta ${indice_actual + 1} de ${preguntas.length}`;

  contenedor_opciones.innerHTML = '';

  for (let i = 0; i < pregunta_actual.opciones.length; i++) {
    const opcion_texto = pregunta_actual.opciones[i];

    const boton_opcion = document.createElement('button');
    boton_opcion.textContent = opcion_texto;

    boton_opcion.addEventListener('click', function () {
      seleccionar_opcion(i, boton_opcion);
    });

    contenedor_opciones.appendChild(boton_opcion);
  }

  mensaje_respuesta.textContent = '';
  boton_siguiente.classList.add('oculto');
}

function seleccionar_opcion(indice_opcion, boton_opcion) {
  if (respondida) {
    return;
  }
  respondida = true;

  const pregunta_actual = preguntas[indice_actual];

  if (indice_opcion === pregunta_actual.correcta) {
    boton_opcion.classList.add('correcta');
    mensaje_respuesta.textContent = '¡Correcto!';
    puntaje = puntaje + 1;
    racha = racha + 1;
  } else {
    boton_opcion.classList.add('incorrecta');
    mensaje_respuesta.textContent = 'Respuesta incorrecta, inténtalo la próxima.';
    racha = 0;
  }

  actualizar_racha();

  if (indice_actual === preguntas.length - 1) {
    boton_siguiente.textContent = 'Finalizar';
  } else {
    boton_siguiente.textContent = 'Siguiente';
  }

  boton_siguiente.classList.remove('oculto');
}

function actualizar_racha() {
  if (racha > racha_mas_alta) {
    racha_mas_alta = racha;
  }

  if (racha >= 2) {
    racha_actual.textContent = `Racha actual: ${racha} 🔥`;
  } else {
    racha_actual.textContent = '';
  }
}

// Funciones para mostrar resultados y reiniciar el quiz
function mostrar_resultados() {
  const preguntas_malas = preguntas.length - puntaje;

  pantalla_resultados_texto.textContent =
    `Respondiste correctamente ${puntaje} de ${preguntas.length} preguntas. (Buenas: ${puntaje} · Malas: ${preguntas_malas})`;

  let mensaje_racha = '';

  if (racha_mas_alta >= 4) {
    mensaje_racha = `¡Guau! Tu mejor racha fue de ${racha_mas_alta} 🔥`;
  } else if (racha_mas_alta >= 2) {
    mensaje_racha = `Tuviste una racha de ${racha_mas_alta}, bien 🔥`;
  } else {
    mensaje_racha = 'Puedes mejorar tu racha la próxima vez.';
  }

  texto_racha_final.textContent = mensaje_racha;
}

function reiniciar_quiz() {
  indice_actual = 0;
  puntaje = 0;
  racha = 0;
  racha_mas_alta = 0;
  racha_actual.textContent = '';

  mostrar_pregunta();
  cambiar_pantalla(pantalla_inicio);
}

// Funcion para copiar las preguntas del array de preguntas a otro que sirve para que se guarden los cambios a la hora de editar las preguntas (hecho con ayuda de IA)
function copiar_preguntas(array_original) {
  const copia = [];

  for (let i = 0; i < array_original.length; i++) {
    const pregunta_original = array_original[i];
    const opciones_copiadas = [];

    for (let j = 0; j < pregunta_original.opciones.length; j++) {
      opciones_copiadas.push(pregunta_original.opciones[j]);
    }

    copia.push({
      pregunta: pregunta_original.pregunta,
      opciones: opciones_copiadas,
      correcta: pregunta_original.correcta
    });
  }

  return copia;
}

function mostrar_edicion() {
  contenedor_edicion.innerHTML = '';
  campos_edicion = [];

  for (let i = 0; i < preguntas_editando.length; i++) {
    const pregunta_actual = preguntas_editando[i];
    const bloque_pregunta = document.createElement('div');
    bloque_pregunta.classList.add('bloque_edicion');

    const etiqueta_pregunta = document.createElement('p');
    etiqueta_pregunta.textContent = `Pregunta ${i + 1}:`;
    bloque_pregunta.appendChild(etiqueta_pregunta);

    const input_pregunta = document.createElement('input');
    input_pregunta.value = pregunta_actual.pregunta;
    bloque_pregunta.appendChild(input_pregunta);

    const inputs_opciones = [];
    const radios_opciones = [];

    for (let j = 0; j < pregunta_actual.opciones.length; j++) {
      const fila_opcion = document.createElement('div');

      const input_opcion = document.createElement('input');
      input_opcion.value = pregunta_actual.opciones[j];
      fila_opcion.appendChild(input_opcion);

      const radio_opcion = document.createElement('input');
      radio_opcion.type = 'radio';
      radio_opcion.name = `correcta_pregunta_${i}`;
      if (j === pregunta_actual.correcta) {
        radio_opcion.checked = true;
      }
      fila_opcion.appendChild(radio_opcion);

      bloque_pregunta.appendChild(fila_opcion);

      inputs_opciones.push(input_opcion);
      radios_opciones.push(radio_opcion);
    }

    const boton_borrar = document.createElement('button');
    boton_borrar.textContent = 'Borrar esta pregunta';
    boton_borrar.addEventListener('click', function () {
      eliminar_pregunta(i);
    });
    bloque_pregunta.appendChild(boton_borrar);

    contenedor_edicion.appendChild(bloque_pregunta);

    campos_edicion.push({
      input_pregunta: input_pregunta,
      inputs_opciones: inputs_opciones,
      radios_opciones: radios_opciones
    });
  }
}

// Antes de agrega se guarda lo que el usuario ya había escrito para no perderlo
ñfunction agregar_pregunta() {
  guardar_campos_en_editando();

  preguntas_editando.push({
    pregunta: "Escribe aquí la nueva pregunta",
    opciones: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
    correcta: 0
  });

  mostrar_edicion();
}

function eliminar_pregunta(indice_a_borrar) {
  guardar_campos_en_editando();

  preguntas_editando.splice(indice_a_borrar, 1);
  mostrar_edicion();
}

// La IA me ayudó en estas 2 funciones para que no se pierda lo que el usuario edita y le da a otro boton
// Lee lo que hay en los inputs y lo guarda en preguntas_editando, para no perder lo escrito cuando se agrega o borra una pregunta
function guardar_campos_en_editando() {
  for (let i = 0; i < campos_edicion.length; i++) {
    const campos = campos_edicion[i];

    preguntas_editando[i].pregunta = campos.input_pregunta.value;

    for (let j = 0; j < campos.inputs_opciones.length; j++) {
      preguntas_editando[i].opciones[j] = campos.inputs_opciones[j].value;
    }

    for (let j = 0; j < campos.radios_opciones.length; j++) {
      if (campos.radios_opciones[j].checked) {
        preguntas_editando[i].correcta = j;
      }
    }
  }
}

function guardar_edicion() {
  guardar_campos_en_editando();

  preguntas.length = 0;
  for (let i = 0; i < preguntas_editando.length; i++) {
    preguntas.push(preguntas_editando[i]);
  }

  cambiar_pantalla(pantalla_inicio);
}

// Eventos de botones
boton_empezar.addEventListener('click', function () {
  indice_actual = 0;
  racha = 0;
  racha_actual.textContent = '';
  mostrar_pregunta();
  cambiar_pantalla(pantalla_quiz);
});

boton_editar.addEventListener('click', function () {
  preguntas_editando = copiar_preguntas(preguntas);
  mostrar_edicion();
  cambiar_pantalla(pantalla_editar);
});

boton_siguiente.addEventListener('click', function () {
  if (indice_actual === preguntas.length - 1) {
    mostrar_resultados();
    cambiar_pantalla(pantalla_resultados);
  } else {
    indice_actual = indice_actual + 1;
    mostrar_pregunta();
  }
});

boton_reiniciar.addEventListener('click', function () {
  reiniciar_quiz();
});

boton_reintentar.addEventListener('click', function () {
  indice_actual = 0;
  puntaje = 0;
  racha = 0;
  racha_mas_alta = 0;
  racha_actual.textContent = '';
  mostrar_pregunta();
  cambiar_pantalla(pantalla_quiz);
});

boton_agregar_pregunta.addEventListener('click', function () {
  agregar_pregunta();
});

boton_guardar_edicion.addEventListener('click', function () {
  guardar_edicion();
});

boton_volver_inicio.addEventListener('click', function () {
  cambiar_pantalla(pantalla_inicio);
});

mostrar_pregunta();