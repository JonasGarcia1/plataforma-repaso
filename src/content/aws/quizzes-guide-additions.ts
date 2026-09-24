import type { QuizQuestion } from '../../types';

export const awsGuideQuizAdditions: QuizQuestion[] = [
  {
    id: 'aws-guide-quiz-unique-01',
    unitId: 30,
    lessonId: 'aws-u30-l1',
    prompt: 'En una tienda queda una unidad de un producto. Dos solicitudes llegan casi al mismo tiempo y ambas leen stock = 1 antes de intentar reservar. ¿Qué diseño evita confirmar las dos reservas?',
    correctIndex: 2,
    options: [
      { text: 'Leer el stock dentro de una transacción y luego descontarlo en una segunda operación sin volver a comprobarlo.', explanation: 'La transacción agrupa escrituras, pero una lectura previa sin protección puede dejar que ambas solicitudes usen el mismo valor.' },
      { text: 'Aumentar el tamaño del pool para que las dos solicitudes terminen más rápido.', explanation: 'Más conexiones no coordinan las reservas; incluso pueden permitir que más solicitudes compitan a la vez.' },
      { text: 'Hacer que la actualización del stock solo tenga éxito si todavía hay una unidad disponible y confirmar el pedido junto con esa actualización.', explanation: 'La condición se evalúa al escribir; una solicitud consume la unidad y la otra debe tratar el conflicto como falta de stock.' },
      { text: 'Usar Multi-AZ para que cada zona procese una solicitud y luego sincronice el stock.', explanation: 'Multi-AZ busca disponibilidad de RDS; no divide el stock ni coordina dos reservas de negocio.' },
    ],
  },
  {
    id: 'aws-guide-quiz-unique-02',
    unitId: 29,
    lessonId: 'aws-u29-l3',
    prompt: 'CloudFront entrega el perfil privado de una cuenta y dos usuarios reportan ver datos cruzados. ¿Qué cambio aborda directamente el riesgo?',
    correctIndex: 1,
    options: [
      { text: 'Subir el TTL para reducir las solicitudes que llegan a la API.', explanation: 'Un TTL mayor puede conservar por más tiempo una respuesta privada compartida y ampliar la exposición.' },
      { text: 'Evitar cachear respuestas personalizadas entre usuarios y validar la identidad y autorización en la API.', explanation: 'La política de caché debe respetar que cada respuesta privada depende del usuario; la API sigue autorizando cada acceso.' },
      { text: 'Cambiar Route 53 para dirigir a cada usuario a un nombre de dominio distinto.', explanation: 'DNS resuelve nombres, pero no garantiza que las respuestas almacenadas en caché queden aisladas por identidad.' },
      { text: 'Habilitar HTTPS entre el navegador y CloudFront.', explanation: 'TLS protege el tránsito, pero no impide que una caché comparta una respuesta entre solicitudes distintas.' },
    ],
  },
  {
    id: 'aws-guide-quiz-unique-03',
    unitId: 37,
    lessonId: 'aws-u37-l3',
    prompt: 'La versión nueva de la API necesita una columna adicional, mientras la versión anterior todavía atiende tráfico. ¿Qué secuencia permite desplegar y volver atrás con menor riesgo?',
    correctIndex: 3,
    options: [
      { text: 'Eliminar la columna vieja y desplegar de inmediato la versión nueva en todas las tareas.', explanation: 'La versión anterior puede seguir usando esa columna y fallar antes de que el despliegue termine.' },
      { text: 'Desplegar el código nuevo y ejecutar una migración destructiva al iniciar cada tarea.', explanation: 'Tareas simultáneas pueden competir por la migración y el cambio puede romper instancias que aún ejecutan el código anterior.' },
      { text: 'Cambiar código y esquema en un único paso y asumir que SAM revertirá ambos si el health check falla.', explanation: 'Revertir infraestructura o tráfico no deshace automáticamente cambios de datos que ya se aplicaron.' },
      { text: 'Agregar primero el esquema compatible, desplegar código que tolere ambas formas, migrar y verificar datos, y retirar lo viejo cuando ya no tenga consumidores.', explanation: 'La expansión conserva compatibilidad durante la convivencia; la contracción ocurre tras comprobar que el código viejo dejó de depender del esquema anterior.' },
    ],
  },
  {
    id: 'aws-guide-quiz-unique-04',
    unitId: 35,
    lessonId: 'aws-u35-l2',
    prompt: 'Una API ECS recibe una versión riesgosa y el equipo necesita limitar su exposición, detectar degradación y conservar una vuelta atrás clara. ¿Qué decisión está mejor justificada?',
    correctIndex: 0,
    options: [
      { text: 'Usar canary para ampliar tráfico gradualmente y comparar errores, latencia y salud antes de avanzar.', explanation: 'La exposición gradual permite observar el comportamiento de la nueva versión y detener el avance si las señales empeoran.' },
      { text: 'Usar rolling y considerar exitoso el cambio apenas todas las tareas arrancan.', explanation: 'Que las tareas arranquen no demuestra que la API atienda correctamente; hay que observar health checks y señales de servicio.' },
      { text: 'Usar blue/green y borrar el entorno anterior antes de comparar resultados.', explanation: 'Conservar el entorno anterior facilita volver atrás; borrarlo elimina esa opción de recuperación rápida.' },
      { text: 'Reemplazar todas las tareas a la vez y revisar solo el promedio de latencia al final.', explanation: 'La exposición completa concentra el riesgo y el promedio puede ocultar errores o colas lentas durante el cambio.' },
    ],
  },
  {
    id: 'aws-guide-quiz-unique-05',
    unitId: 30,
    lessonId: 'aws-u30-l3',
    prompt: 'La latencia p99 de una API sube mientras el promedio cambia poco. Aumenta la espera para obtener conexiones del pool, pero la duración de las consultas SQL medidas se mantiene estable. ¿Qué investigas primero?',
    correctIndex: 2,
    options: [
      { text: 'Aumentar el TTL de todas las claves de caché para ocultar el síntoma.', explanation: 'Un TTL indiscriminado puede servir datos obsoletos y no explica por qué se acumula espera por conexiones.' },
      { text: 'Aumentar el pool en cada tarea sin revisar cuántas tareas pueden abrir conexiones.', explanation: 'El máximo total puede superar la capacidad de RDS y convertir la espera local en saturación de la base.' },
      { text: 'Medir conexiones y espera en todas las tareas, revisar el límite agregado frente a RDS y evaluar si RDS Proxy ayuda a gestionar conexiones.', explanation: 'Las señales apuntan a contención de conexiones; el límite agregado y el comportamiento del proxy deben medirse antes de ajustar capacidad.' },
      { text: 'Reescribir primero las consultas porque todo p99 alto indica SQL lento.', explanation: 'La duración SQL observada no subió; conviene localizar la espera por capa antes de atribuir el problema a las consultas.' },
    ],
  },
];
