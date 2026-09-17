import type { QuizQuestion } from '../types';

type Choice = [text: string, explanation: string];
const lessonSuffix: Record<string, string> = {
  fetch: 'b', final: 'b', interfaz: 'c', comparator: 'c', priorityqueue: 'c', recursos: 'c',
  'stream-lazy': 'b', optional: 'c', atomicidad: 'b', virtual: 'c', strategy: 'c', openapi: 'c',
  'jdbc-close': 'b', 'n-plus-one': 'b', version: 'c', 'value-object': 'b', outbox: 'b', cache: 'b',
};
// La ruta conserva el ID de la lección original aunque la unidad cambie de posición.
const lessonUnitByUnitId: Record<number, number> = { 5: 8, 6: 5, 7: 6, 8: 7 };
function quiz(id: string, unitId: number, prompt: string, correctIndex: number, choices: Choice[], lessonId?: string): QuizQuestion {
  const lessonUnitId = lessonUnitByUnitId[unitId] ?? unitId;
  return { id: `quiz-${id}`, unitId, lessonId: lessonId ?? `u${String(lessonUnitId).padStart(2, '0')}-${lessonSuffix[id] ?? 'a'}`, prompt, correctIndex,
    options: choices.map(([text, explanation]) => ({ text, explanation })) };
}

export const quizzes: QuizQuestion[] = [
  quiz('fetch', 1, 'Querés inspeccionar cambios remotos antes de integrarlos. ¿Qué operación corresponde?', 1, [
    ['git reset --hard', 'Puede descartar trabajo y no descarga cambios remotos.'],
    ['git fetch', 'Descarga objetos y actualiza referencias remotas sin integrar automáticamente en tu rama.'],
    ['git commit --amend', 'Reemplaza el último commit local; no consulta el remoto.'],
    ['git push', 'Envía cambios locales al remoto, en la dirección opuesta.'],
  ]),
  quiz('maven', 1, 'Una biblioteca solo se necesita para compilar y ejecutar tests. ¿Qué scope usarías?', 2, [
    ['provided', 'Indica que el entorno aportará la dependencia al ejecutar la aplicación.'],
    ['runtime', 'Sirve para ejecución y pruebas, pero no limita la biblioteca exclusivamente a tests.'],
    ['test', 'La incorpora al classpath de pruebas sin convertirla en dependencia de producción.'],
    ['import', 'Se usa con POMs en dependencyManagement para importar un BOM.'],
  ]),
  quiz('final', 2, 'Una variable final apunta a un ArrayList. ¿Qué garantiza final?', 0, [
    ['Que la variable no se puede reasignar', 'La referencia queda fija; la lista puede seguir siendo mutable.'],
    ['Que nadie puede agregar elementos a la lista', 'Eso requeriría una lista no modificable o inmutable; final no lo impone.'],
    ['Que todos los elementos son inmutables', 'La palabra final aplicada a la referencia no transforma los elementos.'],
    ['Que la lista es thread-safe', 'La coordinación de accesos concurrentes es un problema independiente.'],
  ]),
  quiz('interfaz', 2, '¿Qué afirmación es correcta para interfaces en Java 21?', 3, [
    ['Solo pueden declarar métodos abstractos', 'Desde Java 8 existen métodos default y static; desde Java 9, privados.'],
    ['Tienen constructores de instancia', 'Las interfaces no se instancian ni tienen constructores.'],
    ['Impiden que una clase implemente más de una interfaz', 'Una clase puede implementar varios contratos.'],
    ['Pueden incluir métodos default con implementación', 'Permiten proveer comportamiento por defecto manteniendo el contrato de interfaz.'],
  ]),
  quiz('comparator', 3, 'Necesitás ordenar los mismos pedidos por fecha o por importe. ¿Qué opción expresa mejor esos órdenes?', 2, [
    ['Cambiar compareTo cada vez que se ordena', 'Comparable define un orden natural; no conviene mutar su criterio según el llamador.'],
    ['Convertir todos los importes a String', 'El orden lexicográfico no equivale al numérico y pierde significado.'],
    ['Crear distintos Comparator', 'Separan criterios de orden del modelo y pueden combinarse con thenComparing.'],
    ['Usar hashCode como prioridad', 'Un hash sirve para dispersión, no para ordenar según fecha o importe.'],
  ]),
  quiz('hash-clave', 3, 'Insertás una clave en HashMap y cambiás un campo que participa en hashCode. ¿Qué puede pasar?', 1, [
    ['El mapa reubica automáticamente la entrada', 'HashMap no observa las mutaciones de sus claves.'],
    ['La entrada puede no encontrarse con búsquedas posteriores', 'La búsqueda usa el hash actual, que puede dirigir a otro bucket.'],
    ['Java siempre lanza una excepción al modificar la clave', 'La modificación puede ser legal y romper silenciosamente el uso del mapa.'],
    ['El mapa se ordena por el nuevo hash', 'HashMap no garantiza un orden de iteración.'],
  ]),
  quiz('merge', 4, 'Fusionás dos arrays ya ordenados con dos punteros. ¿Qué coste tiene para longitudes n y m?', 0, [
    ['O(n + m) tiempo y O(n + m) salida', 'Cada elemento se consume una vez y se escribe en un resultado nuevo.'],
    ['O(n × m) tiempo', 'No hace falta comparar cada elemento con todos los del otro array.'],
    ['O(log n) tiempo', 'Hay que escribir n + m valores; no se puede producir toda la salida en tiempo logarítmico.'],
    ['O(1) espacio incluyendo el array de salida', 'El array devuelto ocupa espacio proporcional a todos los elementos.'],
  ]),
  quiz('priorityqueue', 4, '¿Qué garantía ofrece iterar directamente una PriorityQueue?', 3, [
    ['Devuelve elementos totalmente ordenados', 'La iteración no garantiza orden; la prioridad se observa mediante peek/poll.'],
    ['Devuelve siempre el orden de inserción', 'No es una cola FIFO general cuando se usa prioridad.'],
    ['Devuelve el orden inverso de inserción', 'Eso correspondería al comportamiento de una pila.'],
    ['No garantiza recorrer en orden de prioridad', 'La estructura mantiene el elemento prioritario en cabeza, no un orden de iteración total.'],
  ]),
  quiz('checked', 6, '¿Qué significa que IOException sea checked?', 1, [
    ['Que el fallo ocurre durante la compilación', 'La excepción ocurre al ejecutar; lo comprobado es su tratamiento.'],
    ['Que debe capturarse o declararse en throws', 'El compilador exige reconocer esa posibilidad en el contrato o manejarla.'],
    ['Que Java la recupera automáticamente', 'La aplicación debe decidir cómo recuperarse o propagarla.'],
    ['Que no puede tener una causa interna', 'Las checked también pueden encapsular otra causa.'],
  ]),
  quiz('recursos', 6, 'Abrís Files.lines(path) para procesar un archivo. ¿Cómo garantizás el cierre?', 2, [
    ['Esperando a que el garbage collector lo cierre', 'El GC no es una política fiable de liberación inmediata de archivos.'],
    ['Asignando el Stream a null', 'Perder la referencia no invoca close de manera determinista.'],
    ['Usando try-with-resources alrededor del Stream', 'El cierre ocurre al salir del bloque, incluso si el procesamiento falla.'],
    ['Llamando count(), que siempre cierra el archivo', 'Una operación terminal no reemplaza el cierre del recurso del Stream.'],
  ]),
  quiz('stream-lazy', 7, 'Definís stream.filter(...).map(...) pero no hay operación terminal. ¿Qué ocurre con los elementos?', 3, [
    ['Todos se filtran y transforman inmediatamente', 'Las operaciones intermedias de Stream son perezosas.'],
    ['Se procesan en paralelo por defecto', 'Un Stream secuencial no se vuelve paralelo por encadenar operaciones.'],
    ['Se modifica la colección original automáticamente', 'Esas operaciones no implican mutar los elementos ni la fuente.'],
    ['Normalmente aún no se recorre la fuente', 'La evaluación de las etapas se dispara al consumir el pipeline con una operación terminal.'],
  ]),
  quiz('optional', 7, 'El fallback consulta un servicio costoso y solo debe ejecutarse al faltar un valor. ¿Qué elegís?', 0, [
    ['optional.orElseGet(() -> consultar())', 'El Supplier se invoca cuando el Optional está vacío.'],
    ['optional.orElse(consultar())', 'El argumento se evalúa antes de invocar orElse, incluso si hay valor.'],
    ['optional.get()', 'Lanza una excepción si está vacío y no aplica el fallback.'],
    ['optional.toString()', 'Produce una representación para diagnóstico, no el valor de negocio.'],
  ]),
  quiz('atomicidad', 8, 'Dos hilos ejecutan contador++ sobre un int compartido. ¿Cuál es el problema?', 2, [
    ['Nunca pueden ejecutarse concurrentemente en Java', 'Java permite múltiples hilos concurrentes dentro de un proceso.'],
    ['El operador ++ siempre toma un lock global', 'La lectura, suma y escritura no forman automáticamente una operación sincronizada.'],
    ['Pueden perderse actualizaciones', 'Ambos pueden leer el mismo valor y escribir el mismo incremento.'],
    ['Usar final sobre el contador resuelve la suma', 'Un campo final no puede incrementarse y no es una herramienta de coordinación.'],
  ]),
  quiz('virtual', 8, '¿Qué carga suele beneficiarse especialmente de virtual threads?', 1, [
    ['Un único cálculo intensivo en CPU que necesita terminar más rápido', 'No aumenta por sí solo la capacidad de CPU ni divide automáticamente el cálculo.'],
    ['Muchas tareas que pasan tiempo esperando I/O', 'Permiten representar muchas tareas bloqueantes con menor coste de hilos de plataforma.'],
    ['Cualquier tarea sin límites de conexiones', 'Los recursos externos siguen necesitando límites aunque los hilos sean ligeros.'],
    ['Solo el procesamiento gráfico en GPU', 'No son una API de programación para GPU.'],
  ]),
  quiz('dip', 5, 'Un caso de uso depende de una interfaz RepositorioPedidos inyectada. ¿Qué principio expresa?', 0, [
    ['Inversión de dependencias', 'La política de negocio depende de una abstracción y el adaptador concreto la implementa.'],
    ['Que siempre debe haber una base SQL', 'La abstracción puede tener adaptadores SQL, en memoria u otros.'],
    ['Que todas las clases deben ser singleton', 'El principio no determina el ciclo de vida de las instancias.'],
    ['Que nunca se pueden cambiar contratos', 'Los contratos evolucionan; deben hacerlo cuidando a sus consumidores.'],
  ]),
  quiz('strategy', 5, 'Querés elegir entre varias reglas de descuento independientes. ¿Qué patrón encaja?', 3, [
    ['Singleton', 'Controla creación y acceso a una instancia, no intercambia políticas.'],
    ['Prototype', 'Crea objetos a partir de otros, no es su finalidad seleccionar algoritmos.'],
    ['Adapter', 'Traduce interfaces incompatibles, no modela por sí solo una familia de políticas.'],
    ['Strategy', 'Encapsula algoritmos intercambiables detrás de un contrato común.'],
  ]),
  quiz('idempotencia', 9, '¿Qué significa que DELETE sea idempotente?', 2, [
    ['Todas las respuestas deben tener el mismo status', 'Las respuestas pueden variar; importa el efecto previsto sobre el recurso.'],
    ['No puede modificar ningún recurso', 'DELETE sí modifica estado; seguridad e idempotencia son propiedades distintas.'],
    ['Repetir la operación tiene el mismo efecto previsto que una vez', 'Una vez eliminado el recurso, repetir no debería acumular otro efecto equivalente.'],
    ['Nunca requiere autenticación', 'Los permisos son independientes de la idempotencia del método.'],
  ]),
  quiz('http-auth', 9, 'Un usuario autenticado intenta acceder a una operación que no tiene permitida. ¿Qué estado suele corresponder?', 1, [
    ['201 Created', 'Indica creación exitosa, no falta de autorización.'],
    ['403 Forbidden', 'El servidor entiende la solicitud pero no autoriza el acceso.'],
    ['200 OK', 'Señalar éxito contradice que se haya rechazado la operación.'],
    ['500 Internal Server Error', 'La política de permisos no es un fallo inesperado del servidor.'],
  ]),
  quiz('spring-singleton', 10, '¿Dónde guardás el pedido de la solicitud actual en un service singleton?', 3, [
    ['En un campo mutable del service', 'El campo se comparte entre peticiones y puede mezclar usuarios.'],
    ['En una variable static para hacerlo más rápido', 'También comparte estado entre peticiones y amplía el problema.'],
    ['En el nombre del bean', 'El nombre identifica una definición; no almacena datos de cada solicitud.'],
    ['En variables locales y parámetros de la operación', 'Mantiene los datos de cada invocación separados; aún protejo cualquier recurso compartido.'],
  ]),
  quiz('openapi', 10, '¿Qué describe un documento OpenAPI?', 0, [
    ['El contrato de una API HTTP', 'Describe rutas, parámetros, estructuras, respuestas y seguridad.'],
    ['Únicamente las tablas de una base de datos', 'Puede modelar schemas de mensajes, pero no es un esquema relacional de tablas.'],
    ['Solo los tests unitarios de Java', 'No es un framework ni un inventario de pruebas unitarias.'],
    ['Una implementación ejecutable de todos los endpoints', 'Documentar el contrato no implementa por sí solo el comportamiento.'],
  ]),
  quiz('sql-having', 11, 'Querés alumnos cuyo AVG(nota) supere 7 después de agrupar. ¿Dónde va esa condición?', 1, [
    ['WHERE AVG(nota) > 7', 'WHERE filtra filas antes del agrupamiento en esta consulta.'],
    ['HAVING AVG(nota) > 7', 'HAVING filtra los grupos calculados.'],
    ['ORDER BY AVG(nota) > 7', 'ORDER BY organiza filas; no descarta los grupos que incumplen el criterio.'],
    ['ON AVG(nota) > 7', 'ON define condiciones del join, antes del agregado de esta consulta.'],
  ]),
  quiz('jdbc-close', 11, '¿Qué suele significar cerrar una Connection obtenida de un pool?', 2, [
    ['Apagar toda la base de datos', 'Una conexión es un recurso cliente; cerrarla no apaga el servidor.'],
    ['Eliminar permanentemente el pool', 'El pool permanece disponible para otros préstamos.'],
    ['Devolver la conexión al pool', 'El wrapper normalmente libera el préstamo para que pueda reutilizarse.'],
    ['Confirmar siempre todos los cambios pendientes', 'El contrato transaccional debe resolverse explícitamente; no conviene depender de ese supuesto.'],
  ]),
  quiz('n-plus-one', 12, 'Ves 1 consulta de pedidos y 100 consultas de clientes al recorrerlos. ¿Qué investigás?', 0, [
    ['Un problema N+1 en el plan de carga', 'Una asociación se está cargando por cada entidad; evalúo fetch o proyección según el caso.'],
    ['Que el garbage collector ordenó los resultados', 'La recolección de memoria no explica esa secuencia de SQL.'],
    ['Que agregar EAGER a todo siempre lo arregla', 'Puede empeorar volumen y no garantiza el plan de consultas adecuado.'],
    ['Que toda consulta SQL debe sustituirse por una caché global', 'Primero corrijo la lectura; una caché añade reglas de consistencia y no es remedio universal.'],
  ]),
  quiz('version', 12, '¿Para qué se usa habitualmente @Version en una entidad JPA?', 3, [
    ['Para indicar la versión de Java requerida', 'Ese dato pertenece a configuración de compilación, no al versionado de filas.'],
    ['Para ordenar automáticamente todos los resultados', 'El orden se declara en consultas o estructuras apropiadas.'],
    ['Para cifrar el identificador', 'La anotación no proporciona cifrado.'],
    ['Para detectar actualizaciones concurrentes mediante locking optimista', 'Una versión distinta revela que otra transacción modificó la entidad.'],
  ]),
  quiz('coverage', 13, 'La cobertura de líneas es 100 %, pero no hay aserciones. ¿Qué conclusión es válida?', 2, [
    ['No puede haber errores funcionales', 'Ejecutar código no comprueba necesariamente el resultado correcto.'],
    ['Todos los caminos y combinaciones fueron probados', 'Cobertura de líneas no equivale a cobertura de ramas ni de combinaciones.'],
    ['Se ejecutaron las líneas medidas, pero falta verificar expectativas', 'La cobertura es una señal útil y requiere aserciones y escenarios relevantes.'],
    ['Ya no hace falta revisar requisitos', 'Los requisitos siguen determinando qué comportamiento debe validarse.'],
  ]),
  quiz('test-aislado', 13, 'Un test solo pasa si se ejecuta después de otro que carga datos. ¿Qué conviene corregir?', 1, [
    ['El orden alfabético de los nombres para fijarlo', 'Oculta el acoplamiento y mantiene la fragilidad de la suite.'],
    ['Que prepare sus propios datos y limpie su estado', 'La prueba debe poder ejecutarse de manera independiente y repetible.'],
    ['Desactivar las aserciones', 'Eliminaría la verificación sin resolver la dependencia.'],
    ['Marcarlo como passed sin ejecutarlo', 'Daría una señal falsa de confianza.'],
  ]),
  quiz('hexagonal', 14, 'En arquitectura hexagonal, ¿qué dirección de dependencia es adecuada?', 3, [
    ['El dominio importa directamente el controller HTTP', 'Acopla reglas al mecanismo de entrada.'],
    ['El caso de uso construye una conexión de proveedor específica', 'Acopla política de negocio a infraestructura concreta.'],
    ['El modelo requiere arrancar Spring para validar una regla pura', 'La validación de dominio debería poder probarse independientemente del framework.'],
    ['Un adaptador implementa un puerto definido hacia el núcleo', 'Permite cambiar la infraestructura conservando el contrato que necesita la aplicación.'],
  ]),
  quiz('value-object', 14, 'Dos instancias de Dinero tienen misma moneda y cantidad. Si es value object, ¿cómo se comparan conceptualmente?', 0, [
    ['Por sus valores', 'Su significado viene del estado; no necesitan una identidad independiente.'],
    ['Solo por dirección de memoria', 'La identidad del objeto Java no define igualdad conceptual de un value object.'],
    ['Por una clave de base obligatoria', 'Un value object no necesita identidad persistente propia.'],
    ['Nunca pueden ser iguales', 'Pueden representar exactamente el mismo valor.'],
  ]),
  quiz('kafka-order', 15, 'En el modelo tradicional de Kafka, ¿dónde se preserva el orden de registros?', 1, [
    ['Globalmente entre todos los topics', 'No existe un orden único garantizado entre topics y particiones.'],
    ['Dentro de una partición', 'La elección de clave y partición determina qué eventos comparten ese orden.'],
    ['Por fecha del equipo de cada consumidor', 'Los relojes no crean la garantía de orden de Kafka.'],
    ['Solo después de enviar todos los eventos a DLQ', 'Una DLQ aparta fallos y puede complicar el orden de procesamiento.'],
  ]),
  quiz('outbox', 15, '¿Qué se guarda atómicamente en transactional outbox?', 2, [
    ['El commit de todas las bases de todos los microservicios', 'Outbox se basa en una transacción local, no en un commit global.'],
    ['Una garantía de que nunca habrá eventos duplicados', 'El publicador puede reintentar; los consumidores requieren idempotencia.'],
    ['El cambio de negocio y el registro pendiente de publicación', 'Un publicador envía posteriormente los eventos guardados junto con el cambio.'],
    ['Únicamente un log de texto en consola', 'El registro debe persistirse de forma transaccional con el cambio.'],
  ]),
  quiz('jwt', 16, 'Decodificaste un JWT y leíste userId. ¿Podés confiar ya en ese dato?', 0, [
    ['No; hace falta validar token y autorización', 'Decodificar no verifica firma, emisor, audiencia, expiración ni permisos.'],
    ['Sí; Base64 demuestra quién lo emitió', 'Base64 es una codificación reversible sin autenticación.'],
    ['Sí; todos los JWT están cifrados', 'Un JWT firmado puede ser legible y aun requiere validación.'],
    ['Sí; el formato reemplaza las reglas de acceso', 'Aceptar un token no significa autorizar cualquier recurso.'],
  ]),
  quiz('cache', 16, 'El catálogo puede cambiar cada tanto. ¿Qué decisión falta antes de cachearlo?', 3, [
    ['Elegir un nombre de variable más corto', 'No resuelve cómo se actualiza el dato cacheado.'],
    ['Convertir todos los métodos a static', 'Compartir globalmente no define consistencia ni recuperación.'],
    ['Eliminar la base de datos automáticamente', 'La caché no reemplaza necesariamente la fuente de verdad.'],
    ['Definir frescura, invalidación y comportamiento ante fallos', 'La política depende de cuánto dato obsoleto tolere el negocio y cómo se actualiza.'],
  ]),
  quiz('kafka-retencion-consumo', 17, 'Un grupo ya consumió todos los eventos de un topic. ¿Qué pasa con esos eventos?', 1, [
    ['Se eliminan inmediatamente al confirmar el offset', 'Confirmar actualiza el progreso del grupo; no ordena eliminar los datos del topic.'],
    ['Permanecen según la política de retención o compactación', 'Otros grupos pueden leerlos y el grupo puede reprocesarlos mientras permanezcan disponibles.'],
    ['Se copian automáticamente a MySQL', 'Persistir en otra base requiere un consumidor, conector o aplicación configurada para hacerlo.'],
    ['Se convierten en una única partición ordenada', 'Consumir no cambia el número de particiones ni crea un orden global.'],
  ], 'kafka-core-concepts'),
  quiz('kafka-broker-unico', 17, '¿Qué límite tiene probar con un único broker en Docker Compose?', 2, [
    ['No permite publicar eventos JSON', 'El broker almacena bytes; el formato se decide en productores y consumidores.'],
    ['Garantiza continuidad aunque ese mismo broker se caiga', 'Sin otro broker no hay una réplica independiente que asuma su trabajo.'],
    ['No permite demostrar failover entre brokers y réplicas independientes', 'Sirve para el flujo funcional, pero la disponibilidad distribuida requiere una topología distinta.'],
    ['Obliga a usar un único topic', 'Un broker puede alojar varios topics y particiones dentro de su capacidad.'],
  ], 'kafka-install-kafka'),
  quiz('kafka-accepted', 18, 'La API responde 202 al aceptar la publicación de un evento. ¿Qué puede inferir el cliente?', 0, [
    ['Que se aceptó una solicitud asíncrona según el contrato', 'Debe consultar el estado o esperar otro mecanismo para saber si los efectos posteriores terminaron.'],
    ['Que MySQL ya confirmó el insert del consumidor', 'La aceptación HTTP no demuestra un efecto ejecutado más tarde por otro proceso.'],
    ['Que todos los grupos de Kafka llegaron al mismo offset', 'El progreso de los grupos es independiente de esa respuesta.'],
    ['Que no puede fallar la publicación ni el procesamiento', 'Los fallos asíncronos requieren observabilidad y tratamiento definidos.'],
  ], 'kafka-rest-string'),
  quiz('kafka-key-orden', 18, 'Publicás cambios de un pedido y necesitás conservar su orden relativo. ¿Qué elegís?', 3, [
    ['Una key aleatoria distinta para cada evento', 'Puede distribuir eventos del mismo pedido entre particiones diferentes.'],
    ['Un group id distinto por cada envío', 'El group id pertenece al consumo y no elige la partición del producer.'],
    ['Ordenar únicamente la pantalla de Swagger', 'Cambiar la presentación de la API no crea garantías en el log.'],
    ['Una key estable por pedido con particionamiento consistente', 'Mantiene afinidad de partición; cambios de particiones o estrategia requieren revisar la garantía.'],
  ], 'kafka-producer-string'),
  quiz('kafka-mock-alcance', 19, 'Un test con KafkaTemplate mockeado pasa. ¿Qué comprobaste?', 2, [
    ['Que el broker acepta las credenciales reales', 'El mock no establece una conexión real con el broker.'],
    ['Que MySQL persistió el evento completo', 'La prueba no ejecutó necesariamente al consumidor ni a la base.'],
    ['Que se intentó el envío esperado y se trató el resultado simulado', 'La integración real necesita pruebas adicionales con infraestructura controlada.'],
    ['Que el topic tiene replicación productiva', 'El mock no consulta la topología ni el estado de réplicas.'],
  ], 'kafka-test-wikimedia'),
  quiz('kafka-modulos', 19, 'Compilaste el parent Maven del laboratorio. ¿Qué falta para probar el flujo completo?', 1, [
    ['Nada: compilar arranca siempre todos los procesos', 'Construir artefactos no equivale a ejecutar las aplicaciones y sus dependencias.'],
    ['Levantar la infraestructura y los procesos producer/consumer necesarios', 'Cada aplicación tiene su entrada y configuración; además se necesita el broker y la base para el recorrido completo.'],
    ['Eliminar el consumer y consultar directamente al producer', 'Eso omite el tramo encargado de construir la proyección persistida.'],
    ['Cambiar todas las keys para que sean idénticas', 'No es un requisito para arrancar el flujo y puede concentrar la carga.'],
  ], 'kafka-multi-module'),
  quiz('kafka-proyeccion-get', 20, '¿Qué consulta GET /api/wikimedia-events en el laboratorio?', 0, [
    ['La proyección persistida en MySQL por el listener', 'La lectura HTTP usa el modelo guardado; puede tener retraso respecto del topic.'],
    ['Todos los topics de Kafka cada vez que se abre Swagger', 'La consulta REST no reemplaza al consumidor ni recorre el cluster.'],
    ['Una transacción global de Kafka y MySQL', 'No existe una transacción global implícita por ejecutar un GET.'],
    ['El código fuente de Wikimedia', 'La API expone eventos persistidos, no el código de la fuente.'],
  ], 'kafka-save-wikimedia'),
  quiz('kafka-doble-insert', 20, 'El consumer guarda en MySQL y cae antes de confirmar el offset. ¿Qué riesgo debe manejar?', 3, [
    ['Que Kafka borre inmediatamente el topic', 'La caída del consumidor no elimina automáticamente los logs.'],
    ['Ninguno: acks=all garantiza exactamente un insert SQL', 'Acks del producer y transacciones SQL son fronteras distintas.'],
    ['Que @Lob confirme el offset al cargar la entidad', 'La anotación de persistencia no coordina el progreso de Kafka.'],
    ['Que se repita el evento y duplique el efecto si no hay deduplicación', 'Una clave única o una estrategia idempotente duradera debe proteger el efecto junto con su registro.'],
  ], 'kafka-save-wikimedia'),
];
