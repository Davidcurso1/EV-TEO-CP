/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed (0 to 4)
  category: string;
}

export const QUESTION_BANK: Question[] = [
  {
    id: 1,
    question: "La vigencia de una licencia inicial de conducción para vehículos particulares y personas menores de 60 años es:",
    options: [
      "Tres (3) años.",
      "Cinco (5) años.",
      "Diez (10) años contados a partir de la fecha de su expedición.",
      "Un (1) año.",
      "Indefinida mientras no se cometan infracciones graves de tránsito."
    ],
    correctAnswer: 2,
    category: "Leyes y Normatividad"
  },
  {
    id: 2,
    question: "La vigencia de la licencia de conducción para vehículos de servicio público para personas menores de 60 años es de:",
    options: [
      "Diez (10) años.",
      "Cinco (5) años.",
      "Tres (3) años contados a partir de la fecha de su expedición.",
      "Dos (2) años.",
      "Se debe renovar anualmente tras realizar un examen teórico-práctico."
    ],
    correctAnswer: 2,
    category: "Leyes y Normatividad"
  },
  {
    id: 3,
    question: "La licencia de conducción para el manejo de automóviles livianos para el servicio particular y público corresponde en su orden respectivo a las categorías:",
    options: [
      "A1 y A2.",
      "B1 y C1.",
      "B2 y C2.",
      "C1 y C2.",
      "B3 y C3."
    ],
    correctAnswer: 1,
    category: "Categorías de Licencia"
  },
  {
    id: 4,
    question: "¿Cuáles de las siguientes razones ES causal para suspender temporalmente la licencia de conducción?",
    options: [
      "Por prestar el servicio público de transporte con vehículos particulares, salvo cuando el orden público lo justifique.",
      "Por no portar el chaleco reflectivo después de las 6:00 p.m. al conducir un automóvil.",
      "Por circular con el vehículo sucio o con fallas estéticas menores en la pintura.",
      "Por cambiar de color el vehículo sin informarlo previamente a la empresa aseguradora.",
      "Por parquear en zonas permitidas pero con el motor encendido por más de cinco minutos."
    ],
    correctAnswer: 0,
    category: "Sanciones y Suspensiones"
  },
  {
    id: 5,
    question: "¿Cuál de las siguientes causales NO constituye una causal para cancelar definitivamente la licencia de conducción?",
    options: [
      "Por decisión judicial o sentencia de un juez de la República.",
      "Por muerte del titular de la licencia de conducción.",
      "Por reincidir en la conducción en estado de embriaguez o bajo el efecto de drogas alucinógenas.",
      "Por conducir con una licencia vencida (sin reincidencia ni estado de embriaguez).",
      "Por imposibilidad física o mental permanente para conducir, soportada en un certificado médico."
    ],
    correctAnswer: 3,
    category: "Sanciones y Suspensiones"
  },
  {
    id: 6,
    question: "¿Si usted en su kit de carreteras lleva un sólo destornillador esto constituye una infracción de tránsito?",
    options: [
      "No, siempre y cuando el destornillador sea de pala y estría al mismo tiempo (intercambiable).",
      "Sí, porque el código exige explícitamente en el equipo de prevención dos destornilladores (uno de pala y uno de estría).",
      "No, la norma del kit de carreteras exige herramientas pero no especifica la cantidad exacta de destornilladores.",
      "Sí, porque no se permite llevar ninguna herramienta suelta dentro del baúl del automóvil.",
      "No, las herramientas manuales ya no son obligatorias según las últimas reformas de seguridad vial en Colombia."
    ],
    correctAnswer: 1,
    category: "Kit de Carreteras"
  },
  {
    id: 7,
    question: "La infracción de tránsito por conducir un vehículo sin tener el Seguro Obligatorio de Accidentes de Tránsito (SOAT) vigente tendrá una sanción de:",
    options: [
      "Multa equivalente a 15 salarios mínimos legales diarios vigentes (SMLDV).",
      "Multa equivalente a 30 salarios mínimos legales diarios vigentes (SMLDV) e inmovilización del vehículo.",
      "Multa equivalente a 5 salarios mínimos legales mensuales vigentes.",
      "Amonestación verbal y asistencia obligatoria a un curso de seguridad vial de dos horas.",
      "Suspensión inmediata de la licencia de conducción por un período cerrado de 6 meses."
    ],
    correctAnswer: 1,
    category: "Leyes y Sanciones"
  },
  {
    id: 8,
    question: "El conductor de un vehículo automotor que incurra en la infracción: “No realizar la revisión técnico-mecánica en el plazo legal establecido o cuando el vehículo no se encuentre en adecuadas condiciones” será sancionado con:",
    options: [
      "Multa equivalente a 15 salarios mínimos legales diarios vigentes (SMLDV) e inmovilización del vehículo.",
      "Multa de 5 salarios mínimos diarios y el traslado obligatorio del carro al taller de su preferencia.",
      "Amonestación escrita en la plataforma RUNT y retiro temporal de las placas del automotor.",
      "Multa equivalente a 30 salarios mínimos legales diarios vigentes (SMLDV) sin derecho a ningún descuento.",
      "Suspensión total de los derechos de propiedad del vehículo automotor de forma preventiva."
    ],
    correctAnswer: 0,
    category: "Leyes y Sanciones"
  },
  {
    id: 9,
    question: "El conductor de un vehículo automotor que incurra en la infracción: “Conducir un vehículo a velocidad superior a la máxima permitida” será sancionado con:",
    options: [
      "Multa equivalente a 10 salarios mínimos legales diarios vigentes (SMLDV).",
      "Multa equivalente a 15 salarios mínimos legales diarios vigentes (SMLDV).",
      "Multa equivalente a 30 salarios mínimos legales diarios vigentes (SMLDV).",
      "Inmovilización preventiva del vehículo en los patios asignados por la secretaría por 48 horas.",
      "Retiro inmediato de la licencia de conducción y cancelación definitiva de la misma."
    ],
    correctAnswer: 1,
    category: "Límites de Velocidad"
  },
  {
    id: 10,
    question: "¿Cuántos grados de alcohol existen en el Código Nacional de Tránsito de Colombia para aplicar sanciones consecutivas?",
    options: [
      "Un solo grado general (positivo o negativo).",
      "Dos grados de alcoholemia: Grado 1 y Grado 2.",
      "Tres grados de alcoholemia: Grado 1, Grado 2 y Grado 3.",
      "Cuatro grados oficiales: Grado 0 (0.20-0.39 mg/l), Grado 1, Grado 2 y Grado 3.",
      "Cinco grados que varían según los años de experiencia activa del conductor evaluado."
    ],
    correctAnswer: 3,
    category: "Alcoholemia"
  },
  {
    id: 11,
    question: "¿Cuál es la velocidad máxima que es permitida por ley al transitar en una zona residencial, escolar o de concentración de personas?",
    options: [
      "10 km/h.",
      "20 km/h.",
      "30 km/h.",
      "40 km/h.",
      "50 km/h."
    ],
    correctAnswer: 2,
    category: "Límites de Velocidad"
  },
  {
    id: 12,
    question: "¿Cuál es la principal causal de siniestros viales reportada históricamente en las vías del territorio colombiano?",
    options: [
      "Las fallas mecánicas imprevistas del vehículo (tales como ruptura de frenos y llantas estalladas).",
      "El mal estado de la infraestructura vial y la falta recurrente de señalización vertical reflectiva.",
      "Las condiciones climáticas adversas como la neblina densa y las lluvias torrenciales de granizo.",
      "El exceso de velocidad en las vías combinado con la imprudencia y errores del conductor.",
      "La falta de iluminación artificial en las carreteras nacionales durante las horas de la noche."
    ],
    correctAnswer: 3,
    category: "Seguridad Vial"
  },
  {
    id: 13,
    question: "¿Qué significan las siglas del protocolo \"PAS\" utilizado para la atención primaria y obligatoria de siniestros viales?",
    options: [
      "Prevenir, Auxiliar, Salvaguardar.",
      "Proteger, Avisar, Socorrer.",
      "Promover, Atender, Solucionar.",
      "Priorizar, Asistir, Sanar.",
      "Parar, Analizar, Sancionar."
    ],
    correctAnswer: 1,
    category: "Primeros Auxilios"
  },
  {
    id: 14,
    question: "Si usted ha ingerido alcohol, ¿cuáles son los efectos más probables y peligrosos al momento de conducir un carro?",
    options: [
      "Aumento del campo visual periférico y disminución del tiempo de reacción física ante un peligro.",
      "Falsa sensación de seguridad, alteración de la percepción de distancias y aumento del tiempo de reacción.",
      "Agudización de los sentidos táctiles y optimización de la coordinación motriz fina en curvas sinuosas.",
      "Reducción total del sueño y mantenimiento de un estado de alerta máxima prolongado por varias horas.",
      "Mejora sustancial en la capacidad para tomar decisiones rápidas bajo situaciones extremas de frenado."
    ],
    correctAnswer: 1,
    category: "Factores de Riesgo"
  },
  {
    id: 15,
    question: "¿Cuándo es más probable que usted pierda la concentración y el foco atencional mientras se encuentra conduciendo?",
    options: [
      "Cuando mira de manera constante los espejos retrovisores internos y externos según las técnicas de escaneo.",
      "Cuando utiliza un teléfono celular (incluso con manos libres), manipula la pantalla táctil o viaja con fatiga.",
      "Cuando mantiene ambas manos firmes sobre el volante en la posición correcta de las 10 y 10 del reloj.",
      "Cuando respeta rigurosamente todas las distancias de seguridad con el vehículo delantero en carretera.",
      "Cuando realiza el chequeo preoperacional rutinario de fluidos antes de encender el motor del carro."
    ],
    correctAnswer: 1,
    category: "Factores de Riesgo"
  },
  {
    id: 16,
    question: "¿El uso del cinturón de seguridad en la parte trasera de un automóvil es obligatorio en Colombia?",
    options: [
      "No, la ley colombiana determina que solo es obligatorio para el conductor y el copiloto en la parte delantera.",
      "Sí, es completamente obligatorio para todos los ocupantes en los modelos de vehículos a partir del año 2004.",
      "Es un elemento de uso opcional y queda bajo el criterio o la responsabilidad exclusiva del propietario.",
      "Solo es exigido si el vehículo va a transitar por carreteras nacionales o autopistas de alta velocidad.",
      "Solo aplica de manera obligatoria cuando viajan menores de edad o mujeres gestantes en los asientos de atrás."
    ],
    correctAnswer: 1,
    category: "Seguridad Pasiva"
  },
  {
    id: 17,
    question: "¿Qué es lo primero que usted debería hacer obligatoriamente antes de iniciar una maniobra de adelantamiento en calzada bidireccional?",
    options: [
      "Aumentar la velocidad a fondo y tocar la bocina ruidosamente para alertar a los demás usuarios de la vía.",
      "Asegurarse de que puede realizar la maniobra sin peligro, verificar los espejos y constatar que no viene tránsito en contra.",
      "Activar las luces de parqueo o estacionarias de manera continua durante todo el desplazamiento.",
      "Cambiar inmediatamente a una marcha o cambio de velocidad inferior (como primera velocidad) para revolucionar el motor.",
      "Acercarse lo máximo posible al parachoques trasero del vehículo que pretende adelantar para acortar el tiempo."
    ],
    correctAnswer: 1,
    category: "Maniobras de Tránsito"
  },
  {
    id: 18,
    question: "¿Cuál es considerado el actor vial más vulnerable en el entorno de la movilidad y el espacio público en Colombia?",
    options: [
      "El conductor de vehículo particular de carga liviana o camioneta tipo estacas.",
      "El peatón, seguido muy de cerca por los ciclistas y los motociclistas.",
      "El conductor de transporte público de pasajeros en zonas rurales o veredales.",
      "El pasajero de rutas escolares debidamente identificadas con franjas amarillas y negras.",
      "El operador de maquinaria agrícola o de construcción pesada en vías intermunicipales."
    ],
    correctAnswer: 1,
    category: "Seguridad Vial"
  },
  {
    id: 19,
    question: "¿Cuál es el límite de velocidad máximo general establecido por la Ley 2251 de 2022 para las vías urbanas en Colombia?",
    options: [
      "30 km/h.",
      "40 km/h.",
      "50 km/h.",
      "60 km/h.",
      "80 km/h."
    ],
    correctAnswer: 2,
    category: "Límites de Velocidad"
  },
  {
    id: 20,
    question: "¿Qué conducta o situación en la vía podrá ocasionar con mayor probabilidad una colisión por la parte trasera de su vehículo?",
    options: [
      "Mantener una velocidad constante e igual al límite máximo permitido por las señales de la vía.",
      "Señalizar adecuadamente con las luces direccionales antes de realizar un giro programado en una bocacalle.",
      "Una frenada fuerte, intempestiva y sorpresiva de su vehículo sin justificación técnica ni de emergencia aparente.",
      "Conducir por el carril derecho manteniendo la distancia de seguridad reglamentaria con base en los segundos de separación.",
      "Encender las luces medias obligatorias cuando se transita habitualmente por las carreteras nacionales diurnas."
    ],
    correctAnswer: 2,
    category: "Factores de Riesgo"
  },
  {
    id: 21,
    question: "¿Cuál de las siguientes señales de tránsito verticales indica al conductor la prohibición del paso de ciclistas por el tramo vial?",
    options: [
      "La señal preventiva identificada con el código SP59.",
      "La señal reglamentaria identificada con el código SR22.",
      "La señal informativa identificada con el código SI04.",
      "La señal reglamentaria identificada con el código SR01.",
      "La señal transitoria identificada con el código ST12."
    ],
    correctAnswer: 1,
    category: "Señalización Vial"
  },
  {
    id: 22,
    question: "¿Cuál de los siguientes enunciados define mejor y con exactitud a una señal de tránsito de tipo horizontal?",
    options: [
      "Son estructuras metálicas ubicadas a los lados de la vía con un poste de soporte vertical empotrado en el suelo.",
      "Son dispositivos luminosos con luces de colores cambiantes instalados de forma secuencial en las intersecciones.",
      "Son líneas, símbolos, figuras, palabras o números pintados o colocados sobre el pavimento para regular el flujo.",
      "Son indicaciones verbales o manuales dadas de forma directa por los agentes de tránsito uniformados en un control.",
      "Son vallas informativas de gran tamaño autorizadas por el Ministerio de Transporte a lo largo de las bermas."
    ],
    correctAnswer: 2,
    category: "Señalización Vial"
  },
  {
    id: 23,
    question: "¿De qué color de fondo característico son las señales de tránsito informativas de carácter turístico y de servicios?",
    options: [
      "Fondo azul rey brillante.",
      "Fondo amarillo reflectivo de alta visibilidad.",
      "Fondo café o marrón.",
      "Fondo verde oliva de tipo forestal.",
      "Fondo naranja fluorescente utilizado para obras civiles."
    ],
    correctAnswer: 2,
    category: "Señalización Vial"
  },
  {
    id: 24,
    question: "La señal reglamentaria de \"Ceda el Paso\" físicamente tiene la forma geométrica de:",
    options: [
      "Un octágono regular con fondo de color rojo vivo y letras blancas.",
      "Un triángulo equilátero invertido con bordes rojos y fondo blanco.",
      "Un círculo perfecto con una línea diagonal roja que lo atraviesa de izquierda a derecha.",
      "Un rombo perfecto con fondo amarillo y un símbolo interno de color negro.",
      "Un rectángulo vertical con fondo azul oscuro e iconos descriptivos blancos."
    ],
    correctAnswer: 1,
    category: "Señalización Vial"
  },
  {
    id: 25,
    question: "De acuerdo con su función, diseño y naturaleza, las señales de tránsito verticales se clasifican oficialmente en:",
    options: [
      "Horizontales, verticales, aéreas y subterráneas de metro.",
      "Reglamentarias, preventivas, informativas y transitorias.",
      "Municipales, departamentales, nacionales y de fronteras internacionales.",
      "Obligatorias, prohibitivas, sugeridas y de libre circulación autonómica.",
      "Urbanas, rurales, escolares y para autopistas nacionales de doble calzada."
    ],
    correctAnswer: 1,
    category: "Señalización Vial"
  },
  {
    id: 26,
    question: "¿Cuál es la función técnico-mecánica principal del aceite lubricante dentro del motor de un automóvil?",
    options: [
      "Generar la chispa eléctrica necesaria para producir la combustión interna del carburante.",
      "Lubricar las piezas metálicas internas en movimiento, reduciendo drásticamente la fricción y el desgaste prematuro.",
      "Enfriar directamente las bandas de rodadura de los neumáticos del vehículo mediante tuberías selladas.",
      "Limpiar el parabrisas delantero absorbiendo de forma química las impurezas del medio ambiente.",
      "Mezclarse directamente con la gasolina en el tanque para aumentar los octanos de la mezcla."
    ],
    correctAnswer: 1,
    category: "Mecánica Básica"
  },
  {
    id: 27,
    question: "¿Cuál es la función del radiador en el sistema de refrigeración de un vehículo automotor?",
    options: [
      "Almacenar la energía eléctrica residual producida por el alternador del carro en bajas revoluciones.",
      "Filtrar las impurezas y partículas de polvo del aire exterior antes de que ingresen a la cabina de pasajeros.",
      "Evitar el recalentamiento del motor disipando el calor acumulado en el líquido refrigerante al pasar por sus celdas.",
      "Suavizar el impacto provocado por las irregularidades, baches y resaltos del terreno pavimentado o destapado.",
      "Distribuir de forma equitativa la presión hidráulica de los frenos hacia cada una de las mordazas de las cuatro ruedas."
    ],
    correctAnswer: 2,
    category: "Mecánica Básica"
  },
  {
    id: 28,
    question: "¿Qué efecto negativo e inmediato ocurre en el vehículo si el filtro de aire del motor está demasiado sucio o colmatado?",
    options: [
      "El motor incrementa notablemente su potencia y velocidad máxima final debido al exceso de temperatura.",
      "El motor pierde potencia debido a la falta de oxígeno en la mezcla y aumenta significativamente el consumo de combustible.",
      "El sistema de frenos antibloqueo (ABS) se desactiva de forma automática por protección electrónica.",
      "Las luces delanteras e indicadores del tablero pierden intensidad lumínica de forma progresiva.",
      "El líquido de la batería se evapora instantáneamente provocando un cortocircuito general en la ECU."
    ],
    correctAnswer: 1,
    category: "Mecánica Básica"
  },
  {
    id: 29,
    question: "¿Qué fallo o alerta del sistema indica de forma prioritaria una luz roja encendida con la silueta de una batería en el tablero de instrumentos (testigo)?",
    options: [
      "Que la batería está completamente cargada y funcionando en su nivel óptimo de voltaje nominal.",
      "Que el alternador o el sistema de generación de carga eléctrica presentan un fallo y la batería no se está recargando.",
      "Que el conductor olvidó desactivar las luces direccionales izquierdas al salir de una intersección.",
      "Que el nivel del líquido del depósito lavaparabrisas se encuentra por debajo del mínimo recomendado.",
      "Que la presión de inflado en los neumáticos delanteros es extremadamente deficiente o baja."
    ],
    correctAnswer: 1,
    category: "Mecánica Básica"
  },
  {
    id: 30,
    question: "¿Cuál es la finalidad principal del diligenciamiento diario del formato de revisión preoperacional de un vehículo?",
    options: [
      "Evitar sanciones comerciales o la pérdida de la garantía extendida por parte de los concesionarios oficiales de la marca.",
      "Identificar fallas antes de marchar para prevenir siniestros viales por causas técnico-mecánicas previsibles.",
      "Modificar de manera automática los datos del propietario del carro ante el Registro Único Nacional de Tránsito (RUNT).",
      "Validar el incremento anual del costo de la póliza contractual y extracontractual contra todo riesgo.",
      "Servir como documento público válido para realizar el traspaso directo del dominio del automotor en caso de compraventa."
    ],
    correctAnswer: 1,
    category: "Seguridad Vial"
  },
  {
    id: 31,
    question: "Al aproximarse a una glorieta o rotonda de un solo carril, ¿quién tiene la prelación o derecho de vía según el Código de Tránsito colombiano?",
    options: [
      "El conductor que va a ingresar a la glorieta por cualquiera de los costados de acceso.",
      "El vehículo de mayor tamaño o peso bruto vehicular de acuerdo con la clasificación del RUNT.",
      "El conductor que ya se encuentra circulando de forma interna dentro de la glorieta.",
      "El vehículo que circule a una velocidad superior o que haga uso de la bocina con antelación.",
      "El conductor que tenga la intención de tomar la primera salida inmediata de la estructura vial."
    ],
    correctAnswer: 2,
    category: "Prelación de Paso"
  },
  {
    id: 32,
    question: "¿A qué distancia mínima en metros se debe estacionar (parquear) un vehículo de una esquina o intersección vial?",
    options: [
      "A un mínimo estricto de 2 metros de la línea de calzada peatonal.",
      "A un mínimo de 5 metros de la esquina de la cuadra o intersección.",
      "A cualquier distancia siempre y cuando no se obstaculice visualmente un hidrante de incendios.",
      "A 10 metros únicamente en avenidas comerciales de alto flujo de transporte masivo.",
      "El Código Nacional de Tránsito de Colombia no establece ninguna distancia métrica restrictiva para las esquinas urbanas."
    ],
    correctAnswer: 1,
    category: "Normas de Comportamiento"
  },
  {
    id: 33,
    question: "¿Qué tipo de luces deben encenderse obligatoriamente al transitar por túneles del territorio nacional en cualquier hora del día?",
    options: [
      "Las luces de parqueo, de emergencia o estacionarias exclusivamente.",
      "Las luces altas o de carretera para lograr la máxima visibilidad profunda.",
      "Las luces bajas o de posición medias del vehículo.",
      "Las luces exploradoras de alta densidad antiniebla traseras únicamente.",
      "No se requiere encender ningún tipo de luz si el túnel ya cuenta con iluminación interna artificial LED."
    ],
    correctAnswer: 2,
    category: "Normas de Comportamiento"
  },
  {
    id: 34,
    question: "Cuando dos vehículos se encuentran de frente en una pendiente estrecha (vía empinada de un solo carril), ¿quién tiene la prelación de paso?",
    options: [
      "El vehículo que va descendiendo (bajando) la pendiente, por el riesgo de pérdida de control de frenos.",
      "El vehículo que va ascendiendo (subiendo) la pendiente, por la dificultad física de reiniciar la marcha en subida.",
      "El vehículo que tenga menor peso bruto vehicular según la tarjeta de registro correspondiente.",
      "El conductor que apague el motor primero para ceder el espacio físico de maniobra en la berma.",
      "El vehículo particular sobre cualquier tipo de transporte público, escolar o de carga pesada."
    ],
    correctAnswer: 1,
    category: "Prelación de Paso"
  },
  {
    id: 35,
    question: "La maniobra de reversa en las vías públicas colombianas está prohibida de manera general, EXCEPTO en cuál de los siguientes casos:",
    options: [
      "Para adelantar de manera ágil a un vehículo que se encuentra varado obstaculizando un carril congestionado.",
      "En caso de presentarse una congestión vehicular extrema o \"trancón\" en una autopista principal de doble calzada.",
      "Para estacionar el vehículo (parquear) o en casos de estricta emergencia donde sea imposible avanzar hacia adelante.",
      "Para regresar rápidamente a una esquina cuando el conductor se ha pasado de largo de la dirección residencial buscada.",
      "Cuando se transita en horas de la madrugada por una vía de tipo residencial con muy bajo flujo de peatones."
    ],
    correctAnswer: 2,
    category: "Maniobras de Tránsito"
  },
  {
    id: 36,
    question: "¿A qué base de datos y sistema centralizado se reportan todos los trámites, licencias, propiedad de automotores e historiales de los conductores en Colombia?",
    options: [
      "Al Ministerio de Tecnologías de la Información y las Comunicaciones (MinTIC).",
      "Al Registro Único Nacional de Tránsito (RUNT).",
      "A la Superintendencia de Puertos y Transporte de manera directa y preferencial.",
      "Al Sistema Integrado de Información sobre Multas y Sanciones por Infracciones de Tránsito (SIMIT).",
      "A la Fiscalía General de la Nación dentro del área de delitos civiles y contra el patrimonio económico."
    ],
    correctAnswer: 1,
    category: "Sistemas Nacionales"
  },
  {
    id: 37,
    question: "¿A través de qué sistema nacional un ciudadano puede consultar el estado de sus comparendos, multas pendientes y realizar acuerdos de pago por internet?",
    options: [
      "El Registro Único Nacional de Tránsito (RUNT).",
      "El Sistema Integrado de Información sobre Multas y Sanciones por Infracciones de Tránsito (SIMIT).",
      "El Centro de Diagnóstico Automotor (CDA) municipal.",
      "La Agencia Nacional de Seguridad Vial (ANSV).",
      "El Registro de Operadores de Transporte Terrestre (ROTT)."
    ],
    correctAnswer: 1,
    category: "Sistemas Nacionales"
  },
  {
    id: 38,
    question: "De acuerdo con la Ley 769 de 2002, ¿cuál es la distancia lateral mínima de seguridad que debe mantener un conductor de carro al adelantar a un ciclista en la vía?",
    options: [
      "0.5 metros de distancia lateral.",
      "1.0 metro exacto de separación física midiendo desde el retrovisor.",
      "1.5 metros de distancia lateral para garantizar la estabilidad aerodinámica del ciclista.",
      "2.0 metros de separación total evaluando las corrientes de aire.",
      "La distancia es libre siempre y cuando no se haga uso de la bocina a menos de diez metros de la bicicleta."
    ],
    correctAnswer: 2,
    category: "Seguridad Vial"
  },
  {
    id: 39,
    question: "¿Qué documento vigente acredita legalmente que un vehículo automotor particular cumple con las normas de seguridad mecánica y emisiones ambientales obligatorias?",
    options: [
      "El certificado de matrícula inmobiliaria y de tradición del propietario del carro.",
      "La póliza de seguro prepagada de responsabilidad civil extracontractual familiar.",
      "El certificado de aprobación de la Revisión Técnico-Mecánica y de Emisiones Contaminantes (expedido por un CDA autorizado).",
      "La tarjeta de operación nacional y el carné de afiliación a una empresa de transportes corporativos.",
      "El recibo impreso original de pago del impuesto de rodamiento e impuesto vehicular anualizado."
    ],
    correctAnswer: 2,
    category: "Documentación Vial"
  },
  {
    id: 40,
    question: "Si un documento o un agente de tránsito le impone una orden de comparendo en la vía de forma presencial, ¿cuántos días hábiles tiene para presentarse a apelar o pagar con el 50% de descuento realizando el curso obligatorio de seguridad vial?",
    options: [
      "3 días hábiles siguientes a la imposición de la orden.",
      "5 días hábiles siguientes a la imposición de la orden.",
      "11 días hábiles en todos los casos procesados bajo esta modalidad vial.",
      "15 días calendario incluyendo de manera indistinta sábados, domingos y días feriados nacionales.",
      "30 días hábiles de plazo máximo improrrogable ante la inspección o secretaría de movilidad local."
    ],
    correctAnswer: 1,
    category: "Sanciones y Procesos"
  }
];
