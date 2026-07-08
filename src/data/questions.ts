/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed (0 to 3)
  category: string;
}

export const QUESTION_BANK: Question[] = [
  {
    id: 1,
    question: "¿Cuál es el límite de velocidad máximo permitido en zonas escolares y residenciales?",
    options: [
      "50 km/h",
      "40 km/h",
      "30 km/h",
      "20 km/h"
    ],
    correctAnswer: 2,
    category: "Límites de velocidad"
  },
  {
    id: 2,
    question: "¿Qué indica una doble línea continua de color amarillo en el centro de la calzada?",
    options: [
      "Permisión de adelantar en ambos sentidos de circulación",
      "Prohibición estricta de adelantar en ambos sentidos de circulación",
      "Zona destinada exclusivamente al estacionamiento temporal",
      "Límite de velocidad reducido obligatorio"
    ],
    correctAnswer: 1,
    category: "Señalización vial"
  },
  {
    id: 3,
    question: "¿Qué distancia mínima de seguridad debe mantener con el vehículo precedente al transitar a 60 km/h en condiciones normales?",
    options: [
      "10 metros o la longitud de un vehículo",
      "30 metros (aproximadamente la distancia recorrida en 2 segundos)",
      "5 metros para reaccionar rápido",
      "50 metros de forma obligatoria en toda circunstancia"
    ],
    correctAnswer: 1,
    category: "Distancia de seguridad"
  },
  {
    id: 4,
    question: "Ante una luz roja intermitente en un semáforo, el conductor debe:",
    options: [
      "Avanzar con precaución sin detenerse por completo",
      "Detenerse por completo, ceder el paso a peatones y vehículos, y continuar si la vía está libre",
      "Esperar a que cambie a color verde permanente",
      "Girar obligatoriamente hacia el carril de la derecha"
    ],
    correctAnswer: 1,
    category: "Normas de comportamiento"
  },
  {
    id: 5,
    question: "¿Qué tipo de luces debe encender al transitar por túneles o bajo condiciones meteorológicas de lluvia severa?",
    options: [
      "Luces altas o de carretera exclusivamente",
      "Luces medias o bajas y exploradoras si es necesario",
      "Luces intermitentes de emergencia únicamente",
      "Ninguna, si el túnel cuenta con iluminación artificial óptima"
    ],
    correctAnswer: 1,
    category: "Seguridad activa"
  },
  {
    id: 6,
    question: "Las señales de tránsito preventivas tienen como función principal:",
    options: [
      "Indicar prohibiciones, restricciones y sanciones aplicables",
      "Advertir al usuario de la existencia de un peligro o condición especial en la vía",
      "Guiar e informar sobre direcciones, destinos y puntos turísticos",
      "Establecer prioridades de paso de manera exclusiva"
    ],
    correctAnswer: 1,
    category: "Señalización vial"
  },
  {
    id: 7,
    question: "¿Cuál es el límite de alcohol en sangre permitido para conductores de servicio público, escolar o vehículos de carga?",
    options: [
      "0.5 gramos por litro de sangre",
      "0.2 gramos por litro de sangre",
      "0.0 gramos por litro de sangre (Tolerancia Cero)",
      "0.8 gramos por litro de sangre"
    ],
    correctAnswer: 2,
    category: "Leyes y sanciones"
  },
  {
    id: 8,
    question: "En una intersección sin señales de prioridad o semáforos, ¿qué vehículo tiene el derecho de vía?",
    options: [
      "El vehículo de mayor tamaño o peso",
      "El vehículo que circula a mayor velocidad",
      "El vehículo que se aproxima por el lado derecho del conductor",
      "El vehículo de transporte público o escolar"
    ],
    correctAnswer: 2,
    category: "Prioridades de paso"
  },
  {
    id: 9,
    question: "¿Qué acción debe tomar de inmediato si su vehículo sufre de aquaplaning (pérdida de tracción sobre charcos de agua)?",
    options: [
      "Frenar a fondo de inmediato y girar el volante con fuerza",
      "Sujetar firmemente el volante, no frenar bruscamente, soltar suavemente el acelerador y dejar que ruede",
      "Aumentar la velocidad para superar rápidamente la acumulación de agua",
      "Colocar el vehículo en neutro (punto muerto) y apagar el motor"
    ],
    correctAnswer: 1,
    category: "Conducción defensiva"
  },
  {
    id: 10,
    question: "¿Cuál es el uso correcto del cinturón de seguridad de tres puntos?",
    options: [
      "La banda diagonal sobre el cuello y la horizontal sobre el estómago",
      "La banda diagonal sobre el hombro y pecho, y la banda horizontal abrazando los huesos de la pelvis",
      "Usarlo flojo para permitir el movimiento rápido del conductor",
      "Es obligatorio únicamente para mujeres embarazadas y adultos mayores"
    ],
    correctAnswer: 1,
    category: "Seguridad pasiva"
  },
  {
    id: 11,
    question: "Las señales de tránsito informativas se caracterizan generalmente por:",
    options: [
      "Tener forma circular con borde rojo y fondo blanco",
      "Tener forma de rombo, color amarillo con símbolos negros",
      "Tener forma rectangular, colores azul, verde o marrón con texto blanco",
      "Ser octogonales con la palabra 'PARE' inscrita"
    ],
    correctAnswer: 2,
    category: "Señalización vial"
  },
  {
    id: 12,
    question: "Al escuchar la sirena de una ambulancia, bomberos o policía detrás de usted, ¿qué debe hacer?",
    options: [
      "Aumentar la velocidad para no retrasar el vehículo de emergencia",
      "Frenar de golpe en el carril actual para permitir que le adelanten por el lado",
      "Ceder el paso desplazándose de manera segura hacia el borde derecho de la calzada",
      "Seguir de cerca al vehículo de emergencia para evadir el tráfico denso"
    ],
    correctAnswer: 2,
    category: "Normas de comportamiento"
  },
  {
    id: 13,
    question: "¿Qué significa una línea discontinua de color blanco pintada en el asfalto?",
    options: [
      "Prohibición de cambiar de carril y adelantar en el mismo sentido",
      "Separación de carriles del mismo sentido, permitiendo el cambio de carril con precaución",
      "Límite de paso peatonal exclusivo en autopistas rápidas",
      "Zona de estacionamiento prohibido permanente"
    ],
    correctAnswer: 1,
    category: "Señalización vial"
  },
  {
    id: 14,
    question: "El denominado 'punto ciego' en un vehículo se define como:",
    options: [
      "La zona que no puede ser vista a través del parabrisas delantero debido al sol directo",
      "El área de la calzada que queda oculta a la visión del conductor por los pilares del auto o fuera del rango de los espejos",
      "La pérdida temporal de la visión del conductor provocada por las luces altas de otro vehículo",
      "La distancia de frenado que ocurre en condiciones nocturnas"
    ],
    correctAnswer: 1,
    category: "Conducción defensiva"
  },
  {
    id: 15,
    question: "¿Cuál es la distancia mínima lateral que debe mantener respecto a un ciclista al intentar adelantarlo en carretera?",
    options: [
      "0.5 metros",
      "1.0 metros",
      "1.5 metros",
      "2.5 metros"
    ],
    correctAnswer: 2,
    category: "Prioridades de paso"
  },
  {
    id: 16,
    question: "¿Cuál de las siguientes opciones corresponde a un sistema de seguridad pasiva del vehículo?",
    options: [
      "Los frenos con sistema antibloqueo (ABS)",
      "El control electrónico de estabilidad (ESP)",
      "El sistema de bolsas de aire (Airbags) y el cinturón de seguridad",
      "Los espejos retrovisores antideslumbrantes automáticos"
    ],
    correctAnswer: 2,
    category: "Seguridad pasiva"
  },
  {
    id: 17,
    question: "De acuerdo con las regulaciones generales de tránsito urbano, ¿cuál es el límite de velocidad estándar permitido en avenidas urbanas?",
    options: [
      "80 km/h",
      "50 km/h (o según señalización local)",
      "30 km/h",
      "100 km/h"
    ],
    correctAnswer: 1,
    category: "Límites de velocidad"
  },
  {
    id: 18,
    question: "La luz amarilla constante del semáforo nos advierte de:",
    options: [
      "Aumentar rápidamente la velocidad para cruzar antes del cambio",
      "Que el semáforo va a cambiar a rojo; se debe detener el vehículo a menos que la maniobra represente peligro",
      "Que podemos avanzar libremente porque los peatones tienen luz roja",
      "Un fallo de energía eléctrica en el sector vial"
    ],
    correctAnswer: 1,
    category: "Señalización vial"
  },
  {
    id: 19,
    question: "¿Cuáles son los documentos básicos obligatorios que debe portar un conductor al transitar?",
    options: [
      "Cédula de ciudadanía únicamente",
      "Licencia de conducción, licencia de tránsito (tarjeta de propiedad), SOAT vigente y certificado de revisión tecnicomecánica",
      "El contrato original de compraventa del vehículo firmado",
      "El carnet de afiliación a la salud y seguro exequial"
    ],
    correctAnswer: 1,
    category: "Leyes y sanciones"
  },
  {
    id: 20,
    question: "Si una llanta de su vehículo se pincha o estalla bruscamente a alta velocidad, usted debe:",
    options: [
      "Frenar de golpe a fondo y girar el volante rápidamente al lado contrario",
      "Sujetar firmemente el volante con ambas manos, soltar el acelerador paulatinamente y dirigir el vehículo al arcén sin frenar bruscamente",
      "Apagar la llave de encendido del motor de inmediato para detenerse",
      "Pisar el embrague y tirar fuertemente del freno de mano para clavar las llantas"
    ],
    correctAnswer: 1,
    category: "Conducción defensiva"
  },
  {
    id: 21,
    question: "¿Qué significan las señales reglamentarias verticales (borde rojo, fondo blanco, símbolos negros)?",
    options: [
      "Advierten sobre peligros futuros en la carretera",
      "Indican límites, prohibiciones o restricciones cuyo incumplimiento constituye una infracción",
      "Informa sobre la distancia restante a una población o parador",
      "Señales temporales de obras en la vía"
    ],
    correctAnswer: 1,
    category: "Señalización vial"
  },
  {
    id: 22,
    question: "¿Qué efecto tiene el consumo de alcohol, por mínimo que sea, en las capacidades del conductor?",
    options: [
      "Mejora los reflejos y permite reaccionar con mayor rapidez",
      "Disminuye el tiempo de reacción frente a un obstáculo vistiéndolo de agilidad",
      "Aumenta el tiempo de reacción, altera la percepción de distancias y reduce el campo visual",
      "No altera en absoluto la conducción si se hace con precaución extrema"
    ],
    correctAnswer: 2,
    category: "Leyes y sanciones"
  },
  {
    id: 23,
    question: "¿Cuál es la forma correcta de abordar una rotonda o glorieta?",
    options: [
      "Tienen prioridad los vehículos que pretenden ingresar a ella",
      "Tiene prioridad absoluta el vehículo de mayor tonelaje dentro o fuera de ella",
      "Tienen prioridad los vehículos que ya están circulando dentro de la rotonda",
      "Se debe avanzar en sentido contrario si nuestro destino queda más cerca"
    ],
    correctAnswer: 2,
    category: "Prioridades de paso"
  },
  {
    id: 24,
    question: "Las luces direccionales del vehículo deben utilizarse obligatoriamente:",
    options: [
      "Solo durante las horas de la noche o en climas oscuros",
      "Con una anticipación mínima antes de realizar giros, cambios de carril o incorporaciones",
      "Solo cuando hay presencia visible de agentes de tránsito",
      "Únicamente al circular por autopistas nacionales veloces"
    ],
    correctAnswer: 1,
    category: "Seguridad activa"
  },
  {
    id: 25,
    question: "En una calzada mojada por la lluvia, la distancia de frenado de un vehículo:",
    options: [
      "Se mantiene exactamente igual que sobre asfalto seco",
      "Se reduce considerablemente gracias a la limpieza del agua",
      "Puede aumentar hasta el doble o más en comparación con una superficie seca",
      "Depende únicamente del cilindraje del motor"
    ],
    correctAnswer: 2,
    category: "Distancia de seguridad"
  },
  {
    id: 26,
    question: "¿A qué distancia previa se deben encender las luces direccionales para girar en una zona urbana?",
    options: [
      "Mínimo 5 metros antes del giro",
      "Mínimo 30 metros antes de realizar la maniobra de giro",
      "Exactamente al comenzar a girar el volante",
      "No se requiere una distancia fija, es a discreción del conductor"
    ],
    correctAnswer: 1,
    category: "Normas de comportamiento"
  },
  {
    id: 27,
    question: "¿Qué significa el término 'fatiga' al conducir un vehículo?",
    options: [
      "El calentamiento excesivo de los componentes internos del motor",
      "El desgaste prematuro de las bandas de rodadura de los neumáticos",
      "Un estado psicofísico de cansancio que disminuye la atención y aumenta el tiempo de respuesta",
      "El desajuste en el sistema de amortiguación hidráulica"
    ],
    correctAnswer: 2,
    category: "Leyes y sanciones"
  },
  {
    id: 28,
    question: "La velocidad de diseño o límite máximo en curvas peligrosas:",
    options: [
      "Se aplica solo para vehículos de carga pesada",
      "Debe ser respetada por todos los vehículos para evitar pérdida de control por fuerza centrífuga",
      "Es una sugerencia que se puede ignorar si el asfalto está totalmente seco",
      "Debe duplicarse si se cuenta con neumáticos deportivos de alto agarre"
    ],
    correctAnswer: 1,
    category: "Límites de velocidad"
  },
  {
    id: 29,
    question: "¿Qué debe hacer si el semáforo cambia a verde pero la intersección aún está bloqueada por tráfico?",
    options: [
      "Avanzar y presionar insistentemente la bocina para abrir paso",
      "Esperar detrás de la línea de parada hasta que la intersección se despeje por completo",
      "Esquivar los carros cruzando por el andén o paso peatonal",
      "Avanzar y ubicarse en medio del cruce bloqueando el sentido contrario"
    ],
    correctAnswer: 1,
    category: "Normas de comportamiento"
  },
  {
    id: 30,
    question: "Cuando un peatón inicia el cruce de una vía en un paso peatonal (cebra), el conductor debe:",
    options: [
      "Hacer señales de luces para avisarle que no se detendrá",
      "Detener el vehículo por completo antes de la línea de parada y cederle el paso",
      "Esquivarlo acelerando para pasar antes de que cruce su carril",
      "Pitar con fuerza para alertarle de que despeje el paso"
    ],
    correctAnswer: 1,
    category: "Prioridades de paso"
  },
  {
    id: 31,
    question: "¿Qué indica la presencia de una línea continua sencilla de color blanco al lado de la calzada?",
    options: [
      "El carril exclusivo para el transporte masivo de pasajeros",
      "El límite exterior de la calzada transitada (línea de borde de pavimento)",
      "Un punto de detención total para control de policía vial",
      "La zona prohibida para el tránsito nocturno de bicicletas"
    ],
    correctAnswer: 1,
    category: "Señalización vial"
  },
  {
    id: 32,
    question: "¿A partir de qué nivel de alcohol se sanciona con suspensión de licencia y multas pecuniarias según la ley?",
    options: [
      "Desde el primer grado detectado por prueba de alcoholemia (mayor a 20 mg/100 ml de sangre)",
      "Solo si el conductor causa un siniestro vial de gravedad extrema",
      "Únicamente si sobrepasa los 150 mg de alcohol en sangre",
      "Cuando se demuestra que el conductor no puede mantenerse de pie"
    ],
    correctAnswer: 0,
    category: "Leyes y sanciones"
  },
  {
    id: 33,
    question: "La profundidad mínima legal permitida de la banda de rodamiento de una llanta para automóvil convencional es de:",
    options: [
      "0.5 milímetros",
      "1.6 milímetros",
      "3.0 milímetros",
      "5.0 milímetros"
    ],
    correctAnswer: 1,
    category: "Seguridad activa"
  },
  {
    id: 34,
    question: "¿Qué es el 'efecto túnel' relacionado con el exceso de velocidad?",
    options: [
      "La sensación de frescura que se experimenta al ingresar a un paso subterráneo",
      "La reducción severa de la visión lateral del conductor a medida que aumenta la velocidad",
      "La necesidad de encender las luces automáticas en túneles cortos",
      "La distorsión del sonido del motor debido a la presión del aire exterior"
    ],
    correctAnswer: 1,
    category: "Conducción defensiva"
  },
  {
    id: 35,
    question: "¿Cuál es la forma segura de estacionar un vehículo en una pendiente descendente (bajada)?",
    options: [
      "Dejar el vehículo en neutro y aplicar el freno de mano levemente",
      "Engranar la reversa y girar las llantas delanteras hacia el andén o acera de la vía",
      "Engranar la primera velocidad y dejar las llantas alineadas hacia el centro",
      "Apoyar el vehículo únicamente en el embrague sin usar freno"
    ],
    correctAnswer: 1,
    category: "Normas de comportamiento"
  },
  {
    id: 36,
    question: "¿Qué tipo de señal es una señal octagonal de color rojo con letras blancas que dice 'PARE'?",
    options: [
      "Preventiva",
      "Informativa",
      "Reglamentaria",
      "Transitoria"
    ],
    correctAnswer: 2,
    category: "Señalización vial"
  },
  {
    id: 37,
    question: "¿Qué es la seguridad activa en un vehículo?",
    options: [
      "Los sistemas que ayudan a mitigar las consecuencias de un impacto inevitable",
      "La cobertura médica del seguro obligatorio de accidentes (SOAT)",
      "Los sistemas y elementos diseñados para evitar activamente que ocurra un accidente",
      "La alarma sonora antirrobo y el GPS rastreador"
    ],
    correctAnswer: 2,
    category: "Seguridad activa"
  },
  {
    id: 38,
    question: "¿En qué lugares está estrictamente prohibido estacionar un vehículo?",
    options: [
      "En garajes privados autorizados únicamente",
      "En curvas, puentes, túneles, pasos elevados, pasos de peatones o frente a garajes públicos",
      "En bahías de estacionamiento debidamente señalizadas con azul",
      "Al frente de nuestra propia casa residencial"
    ],
    correctAnswer: 1,
    category: "Normas de comportamiento"
  },
  {
    id: 39,
    question: "La distancia de reacción se define como la distancia que recorre el vehículo:",
    options: [
      "Desde que el conductor percibe un peligro hasta que pisa el pedal del freno",
      "Desde que se presiona el freno hasta que el vehículo se detiene totalmente",
      "Desde que se encienden las luces rojas traseras de advertencia",
      "Al adelantar a un vehículo pesado en carretera de doble sentido"
    ],
    correctAnswer: 0,
    category: "Conducción defensiva"
  },
  {
    id: 40,
    question: "El mantenimiento preventivo periódico del vehículo ayuda principalmente a:",
    options: [
      "Aumentar el valor comercial especulativo de reventa del automóvil",
      "Evitar fallas mecánicas imprevistas que puedan causar accidentes viales",
      "Evitar el cobro anual de impuestos vehiculares municipales",
      "Disminuir la potencia nominal de aceleración en pendientes empinadas"
    ],
    correctAnswer: 1,
    category: "Seguridad activa"
  }
];
