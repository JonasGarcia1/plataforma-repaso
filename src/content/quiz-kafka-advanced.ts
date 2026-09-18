import type { QuizQuestion } from '../types';

type Choice = [text: string, explanation: string];

function q(unitId: number, number: number, lessonId: string, prompt: string, correctIndex: number, options: Choice[]): QuizQuestion {
  return {
    id: `quiz-extra-u${unitId}-${String(number).padStart(2, '0')}`,
    unitId,
    lessonId,
    prompt,
    correctIndex,
    options: options.map(([text, explanation]) => ({ text, explanation })),
  };
}

export const kafkaAdvancedExpansionQuizzes: QuizQuestion[] = [
  q(17, 1, 'kafka-overview', '¿Qué rol cumple un broker en Kafka?', 1, [
    ['Solo valida DTOs HTTP', 'La validación HTTP pertenece a los adaptadores de entrada de una aplicación.'],
    ['Almacena y sirve registros de topics', 'Un broker recibe, persiste y entrega registros de las particiones que aloja.'],
    ['Convierte automáticamente JSON en tablas SQL', 'Persistir una proyección requiere un consumidor y código de aplicación.'],
    ['Reemplaza a todos los consumers', 'Los consumers leen registros desde brokers usando su propio grupo y offsets.'],
  ]),
  q(17, 2, 'kafka-core-concepts', '¿Qué identifica un offset dentro de Kafka?', 2, [
    ['Una contraseña para acceder al cluster', 'Las credenciales son parte de autenticación y no de la posición de lectura.'],
    ['El nombre global de un evento', 'Un offset no es global; solo tiene sentido dentro de una partición.'],
    ['La posición secuencial de un registro en una partición', 'Permite expresar el progreso de un consumer para una partición concreta.'],
    ['La cantidad de consumers del grupo', 'El tamaño de un grupo no está codificado en cada registro.'],
  ]),
  q(17, 3, 'kafka-core-concepts', '¿Para qué sirve un consumer group?', 0, [
    ['Coordinar qué consumer procesa cada partición', 'Dentro del grupo, una partición activa se asigna a un solo consumer a la vez.'],
    ['Obligar a todos los consumers a ver el mismo evento', 'Grupos distintos pueden leer el mismo topic de forma independiente.'],
    ['Elegir el serializer del producer', 'La serialización se configura al producir o consumir, no en el grupo.'],
    ['Eliminar mensajes después de procesarlos', 'La retención depende de la política del topic, no del grupo.'],
  ]),
  q(17, 4, 'kafka-install-kafka', 'Una aplicación en tu máquina no conecta a kafka:9092. ¿Qué revisarías primero?', 3, [
    ['El nombre del método @KafkaListener', 'El nombre del método no explica que el host no sea resolvible desde Windows.'],
    ['El orden de los imports Java', 'Los imports no cambian la dirección publicada por Docker.'],
    ['El color de Kafka UI', 'La interfaz visual no decide los listeners disponibles.'],
    ['El listener externo publicado, por ejemplo localhost:29092', 'Desde el host se usa la dirección expuesta por Docker, no el hostname interno.'],
  ]),
  q(17, 5, 'kafka-install-kafka', '¿Qué diferencia práctica hay entre KRaft y ZooKeeper en un curso actual?', 1, [
    ['KRaft impide usar topics', 'Ambos modos administran un cluster capaz de alojar topics y particiones.'],
    ['KRaft elimina la dependencia de ZooKeeper para metadatos', 'Kafka moderno puede gestionar metadatos con su propio quorum de controladores.'],
    ['ZooKeeper serializa los payloads JSON', 'Los serializers trabajan en productores y consumidores, no en el coordinador.'],
    ['KRaft convierte un broker en una base relacional', 'Kafka sigue siendo un log distribuido, no una base SQL.'],
  ]),
  q(17, 6, 'kafka-create-spring', '¿Qué aporta spring-kafka al proyecto Spring Boot?', 2, [
    ['Una base MySQL embebida automáticamente', 'La dependencia no reemplaza la configuración de una base persistente.'],
    ['Un gateway HTTP público por defecto', 'Los endpoints REST se definen explícitamente en controllers propios.'],
    ['Integración con KafkaTemplate y listeners configurables', 'Facilita publicar y consumir mediante beans y propiedades de Spring.'],
    ['Un esquema Avro obligatorio', 'El formato de mensajes se elige según el contrato y las necesidades.'],
  ]),
  q(17, 7, 'kafka-core-concepts', '¿Cuál es un efecto de aumentar particiones de un topic?', 0, [
    ['Puede aumentar el paralelismo disponible de consumo', 'Más particiones permiten asignar más trabajo concurrente dentro de un grupo.'],
    ['Garantiza orden global entre todas las keys', 'El orden solo se conserva dentro de cada partición, no entre ellas.'],
    ['Reduce siempre el tamaño de cada evento', 'El tamaño del payload es independiente del número de particiones.'],
    ['Hace innecesarias las claves de partición', 'Las keys siguen determinando afinidad y orden relativo de entidades.'],
  ]),
  q(17, 8, 'kafka-overview', '¿Qué describe mejor un topic Kafka?', 3, [
    ['Una sola tabla que un consumer debe crear', 'Un topic es un log, no exige una tabla ni un modelo SQL específico.'],
    ['Una cola que desaparece tras una lectura', 'Los eventos pueden ser leídos por varios grupos durante la retención.'],
    ['Un endpoint HTTP con estado', 'La publicación puede partir de HTTP, pero el topic es infraestructura de eventos.'],
    ['Un log de registros dividido en particiones', 'Los brokers almacenan los registros por partición según la política definida.'],
  ]),

  q(18, 1, 'kafka-string-config', '¿Qué configura acks=all en un producer?', 1, [
    ['Que todos los consumers procesen el mensaje antes de responder', 'La confirmación del producer no espera el trabajo de los consumer groups.'],
    ['Que el líder espera réplicas en sincronía según la configuración', 'Mejora la durabilidad del registro aceptado, con impacto potencial en latencia.'],
    ['Que el payload sea siempre JSON válido', 'La validez del formato depende del serializer y del contrato de datos.'],
    ['Que el listener use siempre earliest', 'El offset reset pertenece a la configuración del consumidor.'],
  ]),
  q(18, 2, 'kafka-create-topic', '¿Qué expresa el replication factor de un topic?', 2, [
    ['La cantidad de veces que un consumer reintenta', 'Los reintentos de consumo se definen en la política del listener.'],
    ['El número de objetos JSON dentro de un registro', 'Cada registro puede tener un payload independiente de la réplica.'],
    ['Cuántas copias de cada partición se mantienen en brokers', 'Las réplicas ayudan a sostener disponibilidad ante la caída de un broker.'],
    ['La cantidad de requests HTTP permitidas', 'Ese límite corresponde a controles de API, no a Kafka.'],
  ]),
  q(18, 3, 'kafka-producer-string', '¿Qué devuelve normalmente KafkaTemplate.send?', 0, [
    ['Un CompletableFuture con el resultado del envío', 'Permite observar éxito o fallo asíncrono y obtener metadata del record.'],
    ['El payload ya persistido en MySQL', 'La persistencia de otro servicio ocurre después y por una frontera distinta.'],
    ['Un consumer group creado automáticamente', 'Los grupos se identifican en consumidores, no en cada envío.'],
    ['Una confirmación de que no habrá duplicados', 'La entrega puede reintentarse; la idempotencia sigue siendo necesaria.'],
  ]),
  q(18, 4, 'kafka-consumer-string', '¿Qué provoca normalmente un rebalance de un consumer group?', 3, [
    ['Cambiar el texto de un mensaje ya publicado', 'Los registros existentes no reconfiguran el reparto del grupo.'],
    ['Consultar un endpoint OpenAPI', 'La documentación HTTP no participa en la coordinación de consumers.'],
    ['Crear una entidad JPA', 'Persistir una entidad no cambia por sí mismo la membresía del grupo.'],
    ['Que entra o sale un consumer o cambian particiones', 'El grupo reasigna las particiones disponibles entre sus miembros.'],
  ]),
  q(18, 5, 'kafka-json-configuration', '¿Por qué conviene restringir trusted packages al deserializar JSON?', 1, [
    ['Para que Kafka comprima más los mensajes', 'La compresión es una decisión de producer y broker independiente.'],
    ['Para limitar tipos que el deserializador puede materializar', 'Reduce la superficie al tratar metadata de tipos proveniente del mensaje.'],
    ['Para crear topics con más particiones', 'Los paquetes Java no determinan la topología del topic.'],
    ['Para evitar que exista una DLQ', 'Los fallos de deserialización aún requieren una política de manejo.'],
  ]),
  q(18, 6, 'kafka-json-producer', '¿Qué debe representar la key de un UserEvent si importa el orden por usuario?', 2, [
    ['El instante actual de cada envío', 'Una hora cambiante puede separar eventos de una misma entidad.'],
    ['El nombre de la clase Java', 'El nombre técnico no expresa la identidad de negocio del usuario.'],
    ['Un identificador estable del usuario', 'Una key estable favorece que sus eventos caigan en la misma partición.'],
    ['El nombre del broker que recibe el evento', 'El producer no debe modelar su contrato con la identidad del broker.'],
  ]),
  q(18, 7, 'kafka-json-rest', '¿Qué valida @Valid en un controller antes de publicar?', 0, [
    ['Las restricciones declaradas en el DTO de entrada', 'Evita enviar formatos inválidos al flujo antes de llegar al producer.'],
    ['Que todos los consumers ya estén conectados', 'Los consumers son procesos independientes de la validación HTTP.'],
    ['Que el evento esté persistido en la base final', 'La persistencia puede ser asíncrona y posterior a la respuesta.'],
    ['Que el topic tenga al menos tres réplicas', 'La topología se administra por configuración del cluster y el topic.'],
  ]),
  q(18, 8, 'kafka-json-consumer', 'Un consumer no puede deserializar un mensaje JSON. ¿Cuál es la reacción más segura?', 3, [
    ['Confirmar el offset y descartar el error sin registrar', 'Oculta pérdida de datos y elimina evidencia necesaria para investigar.'],
    ['Reintentar infinitamente el mismo registro', 'Puede bloquear la partición ante un fallo permanente de contrato.'],
    ['Cambiar el payload en el broker manualmente', 'Los logs son inmutables; se maneja el fallo con una política de consumo.'],
    ['Aplicar una política de errores con evidencia y destino controlado', 'Según el caso, se registra, se deriva a DLQ y se corrige el contrato.'],
  ]),

  q(19, 1, 'kafka-real-world', '¿Qué beneficio aporta desacoplar Wikimedia del servicio que persiste eventos?', 0, [
    ['Cada servicio puede evolucionar y fallar con fronteras claras', 'Kafka desacopla producción y consumo, aunque exige gestionar retrasos y errores.'],
    ['Elimina toda necesidad de monitoreo', 'Los flujos asíncronos necesitan métricas, trazas y alertas propias.'],
    ['Convierte automáticamente SSE en una transacción SQL', 'El stream externo y la base son fronteras con consistencia distinta.'],
    ['Garantiza que cada evento se procese exactamente una vez', 'El diseño habitual requiere idempotencia ante reprocesos posibles.'],
  ]),
  q(19, 2, 'kafka-multi-module', '¿Qué diferencia un módulo Maven de un microservicio?', 2, [
    ['Un módulo siempre corre en un contenedor separado', 'Un módulo es una organización de build, no una decisión de despliegue.'],
    ['Un microservicio no puede depender de Maven', 'Maven es una herramienta de build compatible con distintos estilos.'],
    ['Un módulo organiza código; un microservicio es una unidad desplegable', 'Pueden coincidir, pero sus responsabilidades y límites son distintos.'],
    ['Un microservicio no necesita contratos externos', 'Los límites de servicio vuelven más importantes los contratos explícitos.'],
  ]),
  q(19, 3, 'kafka-wikimedia-topic', '¿Qué conviene definir al crear un topic para un caso real?', 1, [
    ['Solo el nombre, porque el resto es irrelevante', 'Particiones, retención y compactación afectan capacidad y comportamiento.'],
    ['Particiones, retención y política de limpieza según el caso', 'La configuración debe seguir volumen, orden, reproceso y necesidades de datos.'],
    ['La contraseña de cada consumer dentro del nombre', 'Las credenciales deben gestionarse fuera de nombres y configuración visible.'],
    ['Una tabla JPA que represente cada partición', 'El topic no exige una entidad ni un modelo relacional equivalente.'],
  ]),
  q(19, 4, 'kafka-wikimedia-handler', '¿Qué significa que un handler SSE publique de forma asíncrona?', 3, [
    ['Que puede ignorar resultados de envío y fallos', 'La asincronía requiere observar futuros, errores y presión del sistema.'],
    ['Que el stream nunca puede pausarse', 'La entrada y la publicación deben considerar límites de recursos.'],
    ['Que cada evento se convierte en una llamada HTTP', 'El handler recibe SSE y publica al producer Kafka del laboratorio.'],
    ['Que recepción y confirmación del broker no bloquean igual el flujo', 'El envío se completa después; el diseño decide cómo coordinar esa señal.'],
  ]),
  q(19, 5, 'kafka-test-wikimedia', '¿Qué prueba aporta mayor confianza sobre producer, broker y serializer juntos?', 1, [
    ['Un test que compara únicamente un String local', 'No cruza la frontera de Kafka ni valida su configuración efectiva.'],
    ['Una prueba de integración con broker controlado', 'Verifica que los componentes reales puedan intercambiar el contrato esperado.'],
    ['Un test que solo instancie el DTO', 'Puede ser útil, pero no prueba la comunicación entre componentes.'],
    ['Una captura de Kafka UI sin aserciones', 'La observación manual no sustituye una verificación repetible.'],
  ]),
  q(19, 6, 'kafka-real-world', '¿Por qué una proyección MySQL puede estar retrasada respecto de Kafka?', 2, [
    ['Porque Kafka bloquea siempre hasta que termina SQL', 'El producer y la persistencia del consumer son etapas desacopladas.'],
    ['Porque los topics no aceptan eventos JSON', 'Kafka almacena bytes y puede transportar contratos JSON configurados.'],
    ['Porque el consumer procesa de forma asíncrona y puede acumular lag', 'El retraso depende de capacidad, fallos y velocidad de llegada.'],
    ['Porque MySQL cambia automáticamente el offset del grupo', 'Los offsets pertenecen al progreso Kafka, no a la base relacional.'],
  ]),
  q(19, 7, 'kafka-wikimedia-handler', '¿Qué riesgo introduce consumir un stream externo sin límites?', 0, [
    ['Agotar memoria o recursos si la entrada supera la salida', 'El flujo debe tener límites, observación de lag y estrategia ante presión.'],
    ['Hacer que los topics pierdan sus nombres', 'El nombre del topic no cambia por la tasa del stream externo.'],
    ['Eliminar la necesidad de manejar fallos', 'Más volumen suele volver más importante clasificar y recuperar errores.'],
    ['Forzar que MySQL use JPA EAGER', 'La estrategia de carga JPA es independiente del throughput SSE.'],
  ]),
  q(19, 8, 'kafka-test-wikimedia', '¿Cuál es una buena separación de pruebas para este laboratorio?', 3, [
    ['Solo pruebas manuales en Kafka UI', 'Son útiles para explorar, pero no protegen regresiones de forma automática.'],
    ['Solo mocks para todos los límites', 'Los mocks no detectan problemas de configuración e integración real.'],
    ['Una prueba E2E por cada línea de código', 'Sería lenta y frágil; no todo requiere la misma frontera.'],
    ['Unitarias para reglas e integración para contratos e infraestructura', 'Combina velocidad de feedback con evidencia sobre los límites más riesgosos.'],
  ]),

  q(20, 1, 'kafka-consumer-setup', '¿Qué efecto tiene auto.offset.reset=earliest cuando no hay offset previo?', 1, [
    ['Salta siempre al último registro confirmado', 'Eso corresponde a una estrategia que busca comenzar al final.'],
    ['Lee desde el registro más antiguo aún retenido', 'Permite procesar el historial disponible si el grupo no tiene progreso.'],
    ['Borra eventos antes de empezar', 'Los offsets de grupo no controlan la retención del topic.'],
    ['Crea un nuevo topic de reintentos', 'Los retry topics se definen mediante una política específica.'],
  ]),
  q(20, 2, 'kafka-consumer-implementation', '¿Qué dato extra ofrece ConsumerRecord frente al payload solo?', 2, [
    ['El password del broker', 'Las credenciales no se exponen como metadata de cada evento.'],
    ['El esquema SQL final de la proyección', 'La estructura de MySQL no está contenida en el record Kafka.'],
    ['Topic, partición, offset y key del evento', 'Esos datos permiten trazabilidad, diagnóstico e idempotencia por origen.'],
    ['El estado de todas las réplicas del cluster', 'La salud del cluster se obtiene de métricas y administración, no del record.'],
  ]),
  q(20, 3, 'kafka-mysql', '¿Qué ventaja ofrece una restricción única sobre identificador de evento?', 0, [
    ['Ayuda a impedir efectos duplicados al reprocesar', 'La base puede rechazar el segundo insert y preservar la idempotencia duradera.'],
    ['Garantiza orden global entre topics', 'La restricción SQL no modifica las garantías de orden de Kafka.'],
    ['Elimina todos los reintentos de Kafka', 'Los reintentos pueden seguir ocurriendo; cambia cómo se trata su efecto.'],
    ['Sustituye a las transacciones locales', 'La integridad de varias escrituras aún necesita límites transaccionales claros.'],
  ]),
  q(20, 4, 'kafka-save-wikimedia', '¿Por qué conviene exponer una proyección por API en lugar de leer Kafka desde cada cliente?', 3, [
    ['Porque Kafka no permite leer registros', 'Kafka permite lectura mediante consumers configurados correctamente.'],
    ['Porque una API elimina el retraso eventual', 'La proyección puede tener lag; el contrato debe comunicar sus límites.'],
    ['Porque los clientes HTTP pueden confirmar offsets', 'Los offsets deben manejarse por consumers confiables del backend.'],
    ['Porque entrega un modelo de consulta estable y controlado', 'La API desacopla a los clientes de topics, serializers y topología interna.'],
  ]),
  q(20, 5, 'kafka-consumer-implementation', '¿Qué significa normalmente entrega at-least-once en un consumer?', 1, [
    ['Cada evento aparece exactamente una vez sin diseño adicional', 'Los fallos entre procesar y confirmar pueden provocar reprocesos.'],
    ['Un evento puede llegar más de una vez y el efecto debe tolerarlo', 'La idempotencia protege la operación de negocio ante una repetición.'],
    ['Kafka confirma el offset antes de ejecutar el listener', 'La política de commits debe coordinarse con el resultado del procesamiento.'],
    ['Nunca se pierde conectividad con MySQL', 'Las dependencias externas pueden fallar y deben observarse.'],
  ]),
  q(20, 6, 'kafka-mysql', '¿Qué riesgo tiene generar el esquema JPA automáticamente en producción?', 2, [
    ['Que los DTOs HTTP no se puedan validar', 'La validación web no depende de la estrategia de DDL.'],
    ['Que Kafka no pueda mantener offsets', 'La gestión de offsets no depende de hibernate ddl-auto.'],
    ['Cambios no revisados ni versionados sobre datos existentes', 'Las migraciones explícitas permiten auditar, ordenar y desplegar cambios seguros.'],
    ['Que un @Lob no guarde texto', 'La anotación afecta el mapeo del campo, no el control del despliegue.'],
  ]),
  q(20, 7, 'kafka-save-wikimedia', '¿Qué métrica ayuda a saber si el consumer sostiene el ritmo de llegada?', 0, [
    ['Consumer lag y su tendencia', 'El retraso y su evolución muestran si el grupo alcanza a procesar el topic.'],
    ['Cantidad de controllers REST', 'No refleja por sí sola el avance de un grupo sobre sus particiones.'],
    ['Número de clases de la entidad JPA', 'La estructura de código no mide capacidad de procesamiento.'],
    ['Color configurado en Kafka UI', 'La presentación no aporta datos operativos del flujo.'],
  ]),
  q(20, 8, 'kafka-consumer-setup', 'Antes de detener un consumer, ¿qué busca un cierre ordenado?', 3, [
    ['Aceptar nuevos registros sin límite', 'Un cierre debe dejar de tomar trabajo nuevo cuando inicia la terminación.'],
    ['Eliminar las particiones asignadas', 'Las particiones se reasignan; no deben eliminarse por apagar una instancia.'],
    ['Borrar el progreso del grupo', 'Conservar offsets permite retomar desde un punto conocido.'],
    ['Terminar trabajo en curso y liberar recursos dentro de un límite', 'Reduce cortes abruptos y deja al grupo en una situación recuperable.'],
  ]),

  q(21, 1, 'u21-a', '¿Qué variable suele indicar la ubicación del JDK usada por herramientas Java?', 0, [
    ['JAVA_HOME', 'Apunta al directorio del JDK que Maven, Gradle o herramientas pueden consultar.'],
    ['HTTP_PORT', 'Un puerto HTTP no define el compilador ni el runtime Java.'],
    ['GIT_BRANCH', 'La rama de Git no selecciona la instalación de Java.'],
    ['KAFKA_TOPIC', 'El nombre de un topic no contiene la ubicación del JDK.'],
  ]),
  q(21, 2, 'u21-a', '¿Por qué un .env con secretos no debe subirse al repositorio?', 2, [
    ['Porque Java no puede leer variables locales', 'Java puede leer entorno, pero los valores sensibles necesitan protección.'],
    ['Porque Git ignora automáticamente todos los .env', 'Solo se ignoran si hay una regla adecuada y no estaban versionados antes.'],
    ['Porque un historial compartido puede exponer credenciales', 'Un secreto publicado debe revocarse; quitar el archivo después no borra el historial.'],
    ['Porque Maven exige claves dentro del código', 'Las credenciales deben inyectarse, no escribirse en el código fuente.'],
  ]),
  q(21, 3, 'u21-b', '¿Qué permite un breakpoint condicional?', 1, [
    ['Detener cada ejecución del programa sin excepción', 'Detener todo indiscriminadamente agrega ruido y ralentiza el diagnóstico.'],
    ['Frenar solo cuando una expresión relevante se cumple', 'Es útil en loops o colecciones grandes para inspeccionar un caso concreto.'],
    ['Evitar que se ejecute el código del método', 'El debugger observa la ejecución; no reemplaza una corrección de lógica.'],
    ['Convertir una excepción en un resultado correcto', 'La condición no arregla el defecto ni valida su comportamiento.'],
  ]),
  q(21, 4, 'u21-b', '¿Qué ventaja tiene reproducir un fallo antes de depurarlo?', 3, [
    ['Garantiza que no habrá cambios de estado', 'La reproducción no impide mutaciones ni reemplaza aislar los datos.'],
    ['Elimina la necesidad de una hipótesis', 'Una hipótesis guía qué evidencia buscar durante la sesión.'],
    ['Hace innecesario leer logs', 'Los logs pueden aportar el contexto que permite reproducir y explicar.'],
    ['Permite comprobar si una corrección realmente resuelve el síntoma', 'Un caso repetible se convierte luego en una prueba que evita regresiones.'],
  ]),
  q(21, 5, 'u21-c', '¿Qué parte del stack trace suele señalar la línea a investigar en tu aplicación?', 0, [
    ['El primer frame que pertenece a tu código relevante', 'Conecta la causa con una línea y operación propias, no solo con una librería.'],
    ['La última línea que menciona java.base', 'Puede aportar contexto, pero no suele ser el punto de corrección propio.'],
    ['El nombre del sistema operativo', 'El sistema no identifica la instrucción Java que falló.'],
    ['El status HTTP de una respuesta anterior', 'El stack trace describe la pila de ejecución, no una respuesta aislada.'],
  ]),
  q(21, 6, 'u21-c', '¿Qué debería evitar un log de aplicación?', 2, [
    ['Un identificador de correlación seguro', 'Permite relacionar operaciones sin revelar el contenido sensible del usuario.'],
    ['El nombre de la operación que falló', 'Da contexto útil para diagnosticar la acción afectada.'],
    ['Tokens, contraseñas o datos personales innecesarios', 'Los logs se comparten y retienen; deben minimizar exposición de secretos.'],
    ['La causa de una excepción con contexto seguro', 'La causa ayuda a investigar si se registra sin filtrar información sensible.'],
  ]),
  q(21, 7, 'u21-a', '¿Qué verifica mvn -v además de la versión de Maven?', 1, [
    ['El resultado del último test', 'El comando no ejecuta ni informa resultados de la suite.'],
    ['La versión efectiva de Java y su ubicación', 'Ayuda a detectar diferencias entre consola, IDE y configuración esperada.'],
    ['Los cambios pendientes de Git', 'Para eso corresponde usar herramientas de control de versiones.'],
    ['La cantidad de topics Kafka', 'Maven no inspecciona por defecto la topología del cluster.'],
  ]),
  q(21, 8, 'u21-c', '¿Cuándo elegirías WARN en lugar de ERROR?', 3, [
    ['Cuando una operación terminó correctamente sin novedad', 'Ese caso suele ser INFO o incluso no requerir un log explícito.'],
    ['Cuando querés ocultar un fallo crítico', 'Ocultar un incidente no reduce su impacto ni facilita responderlo.'],
    ['Cuando imprimís una contraseña para diagnosticar', 'Los secretos no deben incluirse en logs de ningún nivel.'],
    ['Cuando hay una degradación recuperable que requiere atención', 'WARN comunica una señal relevante sin afirmar un fallo terminal del proceso.'],
  ]),

  q(22, 1, 'u22-a', '¿Dónde vive normalmente un objeto creado con new mientras sea alcanzable?', 1, [
    ['En el stack de todos los threads', 'El stack contiene frames y referencias locales, no el objeto compartido completo.'],
    ['En el heap gestionado por la JVM', 'El recolector administra memoria de objetos que ya no son alcanzables.'],
    ['Dentro del archivo .class original', 'El bytecode no almacena las instancias creadas durante la ejecución.'],
    ['En la caché DNS del sistema', 'DNS no participa en la asignación de memoria de objetos Java.'],
  ]),
  q(22, 2, 'u22-a', '¿Qué significa que un objeto sea alcanzable para el GC?', 2, [
    ['Que tiene un método public', 'La visibilidad de métodos no decide su ciclo de vida de memoria.'],
    ['Que fue creado con un constructor vacío', 'El constructor no determina si todavía existe una ruta de referencia.'],
    ['Que existe una ruta desde una raíz viva hacia él', 'Mientras esa ruta exista, el recolector no puede liberar ese objeto.'],
    ['Que ocupa más de un megabyte', 'El tamaño influye en presión de memoria, no en alcanzabilidad.'],
  ]),
  q(22, 3, 'u22-b', '¿Qué diferencia una lista inmutable de una lista cuyos elementos son mutables?', 0, [
    ['No permite cambiar su estructura, pero sus elementos podrían cambiar', 'La inmutabilidad de la colección no transforma automáticamente los objetos contenidos.'],
    ['El GC siempre la recoge antes', 'El ciclo de vida depende de referencias vivas, no de mutabilidad.'],
    ['Puede escribirse desde cualquier thread sin criterio', 'La seguridad concurrente depende también de los objetos y operaciones.'],
    ['No puede devolverse desde una API', 'Publicar una colección no modificable suele ser una buena frontera de diseño.'],
  ]),
  q(22, 4, 'u22-b', '¿Por qué Optional no suele recomendarse como parámetro de método?', 3, [
    ['Porque no puede estar vacío', 'Optional representa precisamente una posible ausencia de valor.'],
    ['Porque siempre crea una excepción', 'Sus operaciones permiten modelar ausencia sin lanzar por defecto.'],
    ['Porque JVM no puede optimizarlo', 'La recomendación principal es claridad del contrato, no una imposibilidad técnica.'],
    ['Porque fuerza al llamador a envolver un valor antes de invocar', 'Suele ser más claro usar sobrecargas, validación o un tipo de entrada expresivo.'],
  ]),
  q(22, 5, 'u22-c', '¿Por qué LocalDateTime puede ser ambiguo para un evento global?', 1, [
    ['Porque contiene demasiada precisión', 'La precisión no resuelve qué zona se usó para interpretar el valor.'],
    ['Porque no incluye offset ni zona horaria', 'Dos lugares pueden interpretar la misma hora local como instantes diferentes.'],
    ['Porque no puede serializarse a JSON', 'Puede serializarse con configuración adecuada y un contrato claro.'],
    ['Porque reemplaza a Instant automáticamente', 'Los tipos expresan semánticas distintas y no deben intercambiarse sin conversión.'],
  ]),
  q(22, 6, 'u22-c', '¿Cuál es el objetivo de validar longitud y formato en una frontera HTTP?', 2, [
    ['Ocultar reglas de negocio dentro del controller', 'Las invariantes de negocio siguen perteneciendo al caso de uso o dominio.'],
    ['Evitar escribir pruebas para el dominio', 'Las pruebas de reglas siguen siendo necesarias y más simples fuera del controller.'],
    ['Rechazar entradas imposibles antes de consumir recursos', 'Protege procesamiento posterior y entrega errores claros a quien llama.'],
    ['Convertir todo dato a String antes de procesarlo', 'Convertir sin semántica puede perder validación y significado del dato.'],
  ]),
  q(22, 7, 'u22-a', '¿Qué puede causar una caché estática sin límite?', 0, [
    ['Retención creciente de objetos y presión de heap', 'Si las referencias no se liberan ni expiran, el GC no puede recuperar memoria.'],
    ['Orden garantizado entre eventos Kafka', 'Una caché local no define el orden de un sistema de mensajería.'],
    ['Mayor cobertura de tests automáticamente', 'La memoria retenida no mejora la calidad ni la verificación de pruebas.'],
    ['Cierre automático de archivos abiertos', 'Los recursos externos se cierran mediante sus ciclos de vida explícitos.'],
  ]),
  q(22, 8, 'u22-c', 'Un cumpleaños de una persona se representa mejor con:', 3, [
    ['Instant con UTC obligatorio', 'Un cumpleaños es una fecha civil y no requiere un instante global.'],
    ['OffsetDateTime con hora de servidor', 'Agregar hora y offset puede inventar información que no existe.'],
    ['String libre sin validación', 'Pierde operaciones de fecha y permite formatos inconsistentes.'],
    ['LocalDate', 'Expresa una fecha de calendario sin atribuirle zona ni momento exacto.'],
  ]),

  q(23, 1, 'u23-a', '¿Qué ventaja tiene la paginación cursor sobre offset en tablas grandes?', 0, [
    ['Evita saltar muchas filas cuando usa un orden indexable', 'Puede continuar desde una clave estable en vez de recorrer offsets crecientes.'],
    ['Elimina la necesidad de ordenar resultados', 'La continuidad del cursor requiere un orden explícito y estable.'],
    ['Hace que toda API sea compatible hacia atrás', 'La evolución de contratos exige políticas adicionales a la paginación.'],
    ['Garantiza que no habrá datos nuevos entre páginas', 'Los cambios concurrentes siguen existiendo y deben documentarse.'],
  ]),
  q(23, 2, 'u23-a', '¿Qué suele incluir una respuesta paginada útil?', 2, [
    ['La contraseña del usuario para seguir navegando', 'Los secretos no son parte de un contrato de paginación.'],
    ['Todas las filas de la tabla para evitar otra request', 'Anula el objetivo de limitar tamaño y coste de la respuesta.'],
    ['Items, criterio de orden y cursor o enlace para continuar', 'El cliente necesita saber qué recibió y cómo pedir el siguiente tramo.'],
    ['Solo un booleano sin resultados', 'No alcanza para entregar el contenido ni una continuación reproducible.'],
  ]),
  q(23, 3, 'u23-b', '¿Qué status describe mejor una actualización que viola una versión esperada?', 1, [
    ['201 Created', 'La operación no creó un nuevo recurso exitosamente.'],
    ['409 Conflict', 'Representa un conflicto con el estado actual o una precondición de versión.'],
    ['204 No Content', 'Indica éxito sin cuerpo, no una condición que impide actualizar.'],
    ['503 Service Unavailable', 'No describe una indisponibilidad temporal de infraestructura.'],
  ]),
  q(23, 4, 'u23-b', '¿Qué orden reduce riesgo al desplegar un cambio de esquema incompatible?', 3, [
    ['Eliminar la columna y luego desplegar código antiguo', 'El código anterior puede fallar al leer o escribir esa columna.'],
    ['Cambiar todos los servicios a la vez sin compatibilidad', 'Un despliegue gradual necesita convivir con versiones durante un tiempo.'],
    ['Editar la base manualmente sin registrar el paso', 'Pierde trazabilidad y repetibilidad entre entornos.'],
    ['Agregar de forma compatible, migrar datos y endurecer luego', 'La secuencia permite transición, backfill y restricción final controlada.'],
  ]),
  q(23, 5, 'u23-c', '¿Qué aporta Spring Boot Actuator a una API?', 0, [
    ['Endpoints operativos para salud, métricas e información controlada', 'Expone señales útiles para plataformas y diagnóstico si se asegura correctamente.'],
    ['Un reemplazo de todos los tests', 'La observabilidad no comprueba reglas funcionales ni contratos por sí sola.'],
    ['Un serializer Kafka obligatorio', 'Actuator no impone cómo se codifican los mensajes de eventos.'],
    ['Una migración Flyway automática sin scripts', 'Las migraciones se declaran y versionan de manera explícita.'],
  ]),
  q(23, 6, 'u23-c', '¿Para qué usarías Testcontainers con PostgreSQL?', 2, [
    ['Para reemplazar todos los tests unitarios rápidos', 'Las reglas puras siguen siendo más veloces y claras sin infraestructura.'],
    ['Para guardar contraseñas de producción', 'Los secretos deben gestionarse fuera de los tests y repositorios.'],
    ['Para verificar integración real con una base aislada', 'Permite probar esquema, SQL y configuración sin depender de una instancia compartida.'],
    ['Para publicar automáticamente la API en internet', 'Los contenedores de prueba no son un mecanismo de despliegue público.'],
  ]),
  q(23, 7, 'u23-b', '¿Qué evita un handler global de errores bien diseñado?', 1, [
    ['Que existan errores de validación', 'Los errores siguen ocurriendo; el handler los traduce de manera consistente.'],
    ['Filtrar excepciones internas directamente al cliente', 'Convierte fallos a un contrato seguro y conserva detalle técnico en logs.'],
    ['Que se necesite documentar OpenAPI', 'Los errores también deben documentarse como parte del contrato.'],
    ['Que el servidor use códigos HTTP', 'El handler decide qué respuesta HTTP expresa cada tipo de problema.'],
  ]),
  q(23, 8, 'u23-c', '¿Qué debe ocurrir al comenzar un graceful shutdown HTTP?', 3, [
    ['Duplicar todas las requests activas', 'Duplicar trabajo puede generar efectos repetidos y presión innecesaria.'],
    ['Borrar el cache compartido sin política', 'La limpieza de caché debe seguir su propio ciclo de consistencia.'],
    ['Aceptar tráfico nuevo hasta que el proceso muera', 'Impide drenar y aumenta el riesgo de requests interrumpidas.'],
    ['Dejar de recibir tráfico y drenar solicitudes en curso', 'Permite terminar de forma controlada dentro de un timeout configurado.'],
  ]),

  q(24, 1, 'u24-a', '¿Para qué sirve principalmente un ADR?', 1, [
    ['Para registrar cada línea de código modificada', 'El control de versiones ya conserva el detalle de cambios de código.'],
    ['Para conservar el contexto y trade-offs de una decisión', 'Ayuda a entender por qué se eligió una opción y cuándo revisarla.'],
    ['Para reemplazar los requisitos de producto', 'La decisión técnica debe responder a necesidades y restricciones existentes.'],
    ['Para forzar microservicios en todos los proyectos', 'Un ADR puede justificar distintas alternativas según el caso.'],
  ]),
  q(24, 2, 'u24-a', '¿Qué característica busca un monolito modular saludable?', 2, [
    ['Acceso directo de cualquier módulo a cualquier tabla', 'Ese acoplamiento borra límites y complica cambios independientes.'],
    ['Un solo paquete gigante con dependencias circulares', 'Las dependencias circulares dificultan comprender y probar responsabilidades.'],
    ['Módulos con contratos explícitos y dependencias controladas', 'Permite evolución interna sin sumar de inmediato complejidad distribuida.'],
    ['Un despliegue por módulo obligatorio', 'Puede desplegarse como una sola aplicación manteniendo límites de código.'],
  ]),
  q(24, 3, 'u24-b', '¿Por qué un timeout es necesario antes de un retry?', 0, [
    ['Porque define cuándo una espera deja de ser aceptable', 'Sin límite temporal, un intento puede consumir recursos indefinidamente.'],
    ['Porque transforma un error 400 en transitorio', 'Los errores de solicitud siguen requiriendo corrección del cliente.'],
    ['Porque garantiza que el servicio externo responderá', 'Un timeout limita espera, pero no hace disponible a la dependencia.'],
    ['Porque elimina la necesidad de idempotencia', 'Repetir efectos puede seguir siendo riesgoso incluso con timeout.'],
  ]),
  q(24, 4, 'u24-b', '¿Qué objetivo tiene un bulkhead?', 3, [
    ['Reintentar una request hasta que tenga éxito', 'Los reintentos se diseñan con backoff y límite de intentos.'],
    ['Compartir todos los pools para aprovecharlos al máximo', 'Compartir sin límites permite que una dependencia agote recursos comunes.'],
    ['Desactivar métricas durante una falla', 'Las métricas son esenciales para entender la degradación y recuperación.'],
    ['Aislar recursos para que un fallo no agote todo el sistema', 'Separa pools o concurrencia por dependencia y limita el radio de impacto.'],
  ]),
  q(24, 5, 'u24-c', '¿Qué hace cache-aside cuando ocurre un cache miss?', 1, [
    ['Devuelve siempre un error sin consultar la fuente', 'Una caché suele complementar, no reemplazar, a la fuente de verdad.'],
    ['Carga desde la fuente y guarda el resultado según la política', 'La aplicación coordina lectura, TTL e invalidación de la entrada.'],
    ['Elimina todos los datos para evitar inconsistencias', 'Borrar indiscriminadamente no define una estrategia de frescura correcta.'],
    ['Actualiza la caché solo al reiniciar el servidor', 'La actualización depende de misses, writes o invalidación elegida.'],
  ]),
  q(24, 6, 'u24-c', '¿Qué riesgo tiene una caché sin estrategia de invalidación?', 2, [
    ['Que el código Java no compile', 'La invalidación afecta datos en ejecución, no la sintaxis de compilación.'],
    ['Que Kafka no pueda crear topics', 'La caché de una aplicación no impide administrar topics de Kafka.'],
    ['Servir datos obsoletos más tiempo del tolerado por negocio', 'TTL, eventos o invalidación explícita deben reflejar la frescura requerida.'],
    ['Eliminar automáticamente todas las consultas SQL', 'La fuente de datos sigue siendo necesaria para misses y actualizaciones.'],
  ]),
  q(24, 7, 'u24-b', '¿Qué indica que un circuit breaker está abierto?', 0, [
    ['Rechaza temporalmente llamadas para proteger la dependencia', 'Evita sumar espera y carga mientras observa una recuperación controlada.'],
    ['La dependencia ya está sana sin verificación', 'La recuperación necesita una política de prueba, como estado half-open.'],
    ['Cada request se reintenta de inmediato', 'Abrir busca fallar rápido, no amplificar tráfico hacia un sistema caído.'],
    ['Se deshabilitan logs y métricas', 'Las señales operativas permiten saber por qué y cuándo se abrió.'],
  ]),
  q(24, 8, 'u24-c', '¿Cuál es una señal de un cache stampede?', 3, [
    ['Una sola clave tiene TTL largo', 'Una expiración aislada no describe por sí misma un pico concurrente.'],
    ['Los datos se serializan con JSON', 'El formato del valor no define cuántas solicitudes recargan la clave.'],
    ['El cache tiene hit rate alto y estable', 'Eso normalmente indica que la mayoría de lecturas no llega a la fuente.'],
    ['Muchas solicitudes recargan la misma clave expirada a la vez', 'La fuente recibe una avalancha simultánea tras perder la entrada compartida.'],
  ]),

  q(25, 1, 'u25-a', '¿Qué ventaja aporta Avro o Protobuf frente a JSON libre en eventos?', 1, [
    ['Elimina la necesidad de versionar contratos', 'Los cambios de esquema siguen requiriendo compatibilidad y coordinación.'],
    ['Define un esquema explícito y herramientas de compatibilidad', 'Facilita validar evolución estructural entre productores y consumidores.'],
    ['Hace que Kafka tenga orden global', 'El formato del payload no cambia la garantía de orden por partición.'],
    ['Impide cualquier error de negocio', 'Un esquema válido no garantiza que el significado de los datos sea correcto.'],
  ]),
  q(25, 2, 'u25-a', '¿Qué significa compatibilidad backward de un schema?', 2, [
    ['El producer nuevo solo lee datos futuros', 'La definición se refiere a lectores y datos de versiones distintas.'],
    ['El consumer viejo acepta cualquier cambio semántico', 'La compatibilidad técnica no vuelve seguro cambiar el significado de campos.'],
    ['Un consumer nuevo puede leer datos escritos con un schema anterior', 'Permite evolucionar lectores sin dejar de procesar registros históricos.'],
    ['Los eventos nunca necesitan defaults', 'Los campos agregados suelen requerir una estrategia compatible de valores.'],
  ]),
  q(25, 3, 'u25-b', '¿Qué debe diferenciar una política de retry?', 0, [
    ['Fallos transitorios de fallos permanentes de contrato', 'Los transitorios pueden reintentarse; los permanentes deben aislarse y corregirse.'],
    ['Mensajes JSON de mensajes String solamente', 'El formato no basta para decidir si el error puede recuperarse.'],
    ['Topics con nombre corto de nombre largo', 'El nombre no clasifica la naturaleza ni recuperabilidad del fallo.'],
    ['Consumers locales de consumers remotos', 'La ubicación no sustituye el análisis del tipo de error.'],
  ]),
  q(25, 4, 'u25-b', '¿Qué propósito tiene una DLQ?', 3, [
    ['Garantizar que no exista ningún error de consumo', 'Los fallos siguen existiendo; la DLQ los aísla con evidencia.'],
    ['Usar como topic principal de todos los eventos', 'La DLQ es un destino excepcional, no el canal normal de negocio.'],
    ['Eliminar el registro original del log', 'El log fuente permanece según su política de retención o compactación.'],
    ['Separar eventos que requieren investigación o reproceso controlado', 'Evita bloquear el flujo principal y conserva contexto para resolver el caso.'],
  ]),
  q(25, 5, 'u25-c', '¿Qué modela un KTable en Kafka Streams?', 1, [
    ['Un stream de eventos sin estado por definición', 'KStream representa registros; las tablas modelan estado actualizado por key.'],
    ['Una vista de último valor por key actualizada por registros', 'Permite razonar sobre estado derivado de un changelog y realizar joins de tabla.'],
    ['Una tabla SQL creada por JPA', 'KTable es una abstracción de streaming, no una entidad relacional.'],
    ['Una replica física de cada partición', 'La replicación es una propiedad del cluster y sus brokers.'],
  ]),
  q(25, 6, 'u25-c', '¿Qué protege TLS en una conexión Kafka?', 2, [
    ['La autorización a cada topic', 'Los permisos sobre topics y grupos se expresan mediante ACLs.'],
    ['La identidad del usuario sin credenciales', 'La autenticación requiere un mecanismo como SASL y sus credenciales.'],
    ['La confidencialidad e integridad del tráfico en tránsito', 'Cifra la comunicación y ayuda a evitar manipulación durante el transporte.'],
    ['La compatibilidad de schemas Avro', 'La evolución de contratos se gestiona con schemas y políticas de compatibilidad.'],
  ]),
  q(25, 7, 'u25-c', '¿Qué limita el paralelismo máximo de un consumer group sobre un topic?', 0, [
    ['La cantidad de particiones asignables', 'No puede haber más consumers activos con trabajo que particiones disponibles.'],
    ['La cantidad de campos del payload', 'El número de propiedades no determina la distribución de particiones.'],
    ['El tamaño del disco del consumer', 'Afecta operación, pero no la asignación lógica de trabajo.'],
    ['La versión de Java usada por el producer', 'El runtime del producer no define la concurrencia del grupo consumidor.'],
  ]),
  q(25, 8, 'u25-c', '¿Qué decisión necesita una estimación de capacidad Kafka?', 3, [
    ['Solo el color del dashboard de métricas', 'La apariencia no describe volumen, retención ni uso de recursos.'],
    ['El framework HTTP elegido para el producer', 'Puede influir en una app, pero no basta para dimensionar el cluster.'],
    ['El nombre comercial del evento', 'Un nombre no informa tasa, tamaño ni política de almacenamiento.'],
    ['Volumen, tamaño de mensajes, retención, particiones y crecimiento', 'Esos datos permiten estimar almacenamiento, throughput y necesidades de réplica.'],
  ]),
];
