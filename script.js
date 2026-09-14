// ===== 1. DATOS DEL QUIZ =====
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
    pregunta: "¿Cuántos sets se necesitan ganar para ganar un partido de tenis (al mejor de 5)?",
    opciones: ["2", "3", "4", "5"],
    correcta: 1
  },
  {
    pregunta: "¿Qué deporte se juega en Wimbledon?",
    opciones: ["Golf", "Tenis", "Rugby", "Criquet"],
    correcta: 1
  }
];

// ===== 2. VARIABLES QUE VAN CAMBIANDO MIENTRAS SE JUEGA =====
let indice_actual = 0;
let puntaje = 0;
let respondida = false;
let campos_edicion = [];

// ===== 3. AGARRAR LOS ELEMENTOS DEL HTML =====
const texto_pregunta = document.querySelector('#texto_pregunta');
const contenedor_opciones = document.querySelector('#contenedor_opciones');
const contador_pregunta = document.querySelector('#contador_pregunta');
const puntaje_actual = document.querySelector('#puntaje_actual');
const mensaje_respuesta = document.querySelector('#texto_feedback');
const boton_siguiente = document.querySelector('#boton_siguiente');

const pantalla_inicio = document.querySelector('#pantalla_inicio');
const pantalla_quiz = document.querySelector('#pantalla_quiz');
const pantalla_resultados = document.querySelector('#pantalla_resultados');
const pantalla_editar = document.querySelector('#pantalla_editar');

const boton_empezar = document.querySelector('#boton_empezar');
const boton_editar = document.querySelector('#boton_editar');

const pantalla_resultados_texto = document.querySelector('#texto_puntaje_final');
const boton_reiniciar = document.querySelector('#boton_reiniciar');

const contenedor_edicion = document.querySelector('#contenedor_edicion');
const boton_guardar_edicion = document.querySelector('#boton_guardar_edicion');
const boton_volver_inicio = document.querySelector('#boton_volver_inicio');

// ===== 4. FUNCIÓN PARA CAMBIAR DE PANTALLA =====
function cambiar_pantalla(pantalla_a_mostrar) {
  pantalla_inicio.classList.remove('activa');
  pantalla_quiz.classList.remove('activa');
  pantalla_resultados.classList.remove('activa');
  pantalla_editar.classList.remove('activa');

  pantalla_a_mostrar.classList.add('activa');
}

// ===== 5. FUNCIÓN QUE MUESTRA LA PREGUNTA ACTUAL =====
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

// ===== 6. FUNCIÓN QUE SE EJECUTA CUANDO SE ELIGE UNA OPCIÓN =====
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
    puntaje_actual.textContent = `Puntaje: ${puntaje}`;
  } else {
    boton_opcion.classList.add('incorrecta');
    mensaje_respuesta.textContent = 'Respuesta incorrecta, inténtalo la próxima.';
  }

  if (indice_actual === preguntas.length - 1) {
    boton_siguiente.textContent = 'Finalizar';
  } else {
    boton_siguiente.textContent = 'Siguiente';
  }

  boton_siguiente.classList.remove('oculto');
}

// ===== 7. RESULTADOS Y REINICIO =====
function mostrar_resultados() {
  const preguntas_malas = preguntas.length - puntaje;

  pantalla_resultados_texto.textContent =
    `Respondiste correctamente ${puntaje} de ${preguntas.length} preguntas. (Buenas: ${puntaje} · Malas: ${preguntas_malas})`;
}

function reiniciar_quiz() {
  indice_actual = 0;
  puntaje = 0;
  puntaje_actual.textContent = `Puntaje: ${puntaje}`;

  mostrar_pregunta();
  cambiar_pantalla(pantalla_inicio);
}

// ===== 8. EDITAR PREGUNTAS =====
function mostrar_edicion() {
  contenedor_edicion.innerHTML = '';
  campos_edicion = [];

  for (let i = 0; i < preguntas.length; i++) {
    const pregunta_actual = preguntas[i];
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

    contenedor_edicion.appendChild(bloque_pregunta);

    campos_edicion.push({
      input_pregunta: input_pregunta,
      inputs_opciones: inputs_opciones,
      radios_opciones: radios_opciones
    });
  }
}

function guardar_edicion() {
  for (let i = 0; i < preguntas.length; i++) {
    const campos = campos_edicion[i];

    preguntas[i].pregunta = campos.input_pregunta.value;

    for (let j = 0; j < campos.inputs_opciones.length; j++) {
      preguntas[i].opciones[j] = campos.inputs_opciones[j].value;
    }

    for (let j = 0; j < campos.radios_opciones.length; j++) {
      if (campos.radios_opciones[j].checked) {
        preguntas[i].correcta = j;
      }
    }
  }

  cambiar_pantalla(pantalla_inicio);
}

// ===== 9. EVENTOS DE BOTONES =====
boton_empezar.addEventListener('click', function () {
  indice_actual = 0;
  mostrar_pregunta();
  cambiar_pantalla(pantalla_quiz);
});

boton_editar.addEventListener('click', function () {
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

boton_guardar_edicion.addEventListener('click', function () {
  guardar_edicion();
});

boton_volver_inicio.addEventListener('click', function () {
  cambiar_pantalla(pantalla_inicio);
});

// ===== 10. ARRANCAR =====
mostrar_pregunta();