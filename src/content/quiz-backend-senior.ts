import type { QuizQuestion } from '../types';

type Choice = [text: string, explanation: string];

function quiz(id: string, unitId: number, lessonId: string, prompt: string, correctIndex: number, options: Choice[]): QuizQuestion {
  return {
    id: `quiz-extra-${id}`,
    unitId,
    lessonId,
    prompt,
    correctIndex,
    options: options.map(([text, explanation]) => ({ text, explanation })),
  };
}

/** Preguntas extra: dejan las unidades 9–16 con diez preguntas al integrarse. */
export const backendSeniorExpansionQuizzes: QuizQuestion[] = [
  // Unidad 9: Web y Java empresarial (8; las dos base ya cubren DELETE y 403).
  quiz('http-safe', 9, 'u09-a', '¿Qué caracteriza a un método HTTP seguro?', 1, [
    ['Siempre crea un recurso nuevo', 'La creación cambia el estado y no define seguridad HTTP.'],
    ['Su semántica es de lectura sin cambio de estado solicitado', 'GET y HEAD son seguros aunque el servidor pueda registrar telemetría.'],
    ['Puede repetirse sin límite', 'Eso describe idempotencia, una propiedad relacionada pero distinta.'],
    ['Nunca requiere headers', 'Los headers pueden ser necesarios para autenticación o negociación.'],
  ]),
  quiz('http-put', 9, 'u09-a', '¿Qué intención expresa PUT sobre un recurso identificado?', 2, [
    ['Ejecutar una acción sin recurso', 'Para acciones conviene modelar un recurso o documentar claramente el comando.'],
    ['Agregar un elemento a una colección', 'Esa semántica suele asociarse a POST sobre una colección.'],
    ['Reemplazar o crear la representación en una URI conocida', 'PUT trabaja sobre la URI objetivo y su efecto previsto es idempotente.'],
    ['Devolver siempre 204', 'El estado depende de si creó, actualizó o no hay cuerpo de respuesta.'],
  ]),
  quiz('http-cache-control', 9, 'u09-a', '¿Para qué sirve Cache-Control en una respuesta HTTP?', 0, [
    ['Comunicar reglas de almacenamiento y reutilización', 'Permite que clientes e intermediarios sepan cómo tratar una representación.'],
    ['Cifrar automáticamente el cuerpo', 'El cifrado del transporte lo aporta HTTPS/TLS, no este header.'],
    ['Validar el JSON contra un DTO', 'La validación pertenece a la aplicación y a su contrato de entrada.'],
    ['Reemplazar autenticación', 'Las políticas de caché no prueban la identidad del solicitante.'],
  ]),
  quiz('servlet-lifecycle', 9, 'u09-b', '¿Por qué un Servlet no debe guardar datos de una petición en campos mutables?', 3, [
    ['Porque no admite métodos', 'Los Servlets sí exponen métodos para manejar solicitudes HTTP.'],
    ['Porque cada petición crea un classloader', 'El classloader no se crea como regla para cada petición.'],
    ['Porque Java prohíbe cualquier atributo', 'Los atributos existen; el problema es compartir estado sin coordinación.'],
    ['Porque una instancia puede atender peticiones concurrentes', 'Los campos compartidos pueden mezclar datos de usuarios o provocar carreras.'],
  ]),
  quiz('jakarta-namespace', 9, 'u09-b', '¿Qué cambio distingue a Jakarta EE de Java EE en APIs modernas?', 1, [
    ['Cambia Java por Kotlin', 'Jakarta EE sigue siendo un conjunto de especificaciones para Java.'],
    ['Las APIs migraron de javax.* a jakarta.*', 'Al actualizar dependencias también deben revisarse imports y compatibilidad de librerías.'],
    ['Elimina por completo los contenedores web', 'Servlets y contenedores siguen siendo parte del ecosistema.'],
    ['Convierte Spring Boot en una especificación', 'Spring es un framework; no reemplaza el rol de Jakarta EE.'],
  ]),
  quiz('dto-boundary', 9, 'u09-c', '¿Cuál es una razón principal para no devolver entidades JPA directamente como JSON?', 0, [
    ['La entidad puede filtrar campos o acoplar el contrato de API', 'Un DTO permite elegir datos, forma y evolución del contrato público.'],
    ['Las entidades no pueden tener atributos', 'Las entidades sí modelan estado persistente y relaciones.'],
    ['JSON no permite números', 'JSON admite números, strings, arrays, objetos y otros tipos básicos.'],
    ['Jackson solo serializa records', 'Jackson puede serializar distintas clases según su configuración.'],
  ]),
  quiz('json-validation', 9, 'u09-c', 'Tras deserializar un JSON válido sintácticamente, ¿qué falta comprobar?', 2, [
    ['Que la red usó TCP', 'El transporte no garantiza que el dato cumpla reglas de negocio.'],
    ['Que el cliente eligió POST', 'El método no reemplaza las validaciones de los datos recibidos.'],
    ['Formato, límites e invariantes relevantes', 'JSON válido puede contener importes negativos, campos ausentes o valores inconsistentes.'],
    ['Que el objeto tenga toString', 'toString ayuda al diagnóstico, no confirma validez de negocio.'],
  ]),
  quiz('xml-json-choice', 9, 'u09-c', '¿Qué criterio es razonable al elegir JSON o XML para una integración?', 3, [
    ['Usar siempre el formato más corto', 'El tamaño importa, pero no sustituye requisitos de contrato e interoperabilidad.'],
    ['Elegir el formato favorito del equipo', 'La decisión debe responder a consumidores, herramientas y necesidades reales.'],
    ['Convertir ambos a String sin esquema', 'Perder estructura dificulta validación y evolución del intercambio.'],
    ['Acordar contrato, compatibilidad y capacidades de consumidores', 'Ambos formatos pueden ser adecuados según el ecosistema y sus requisitos.'],
  ]),

  // Unidad 10: Spring y APIs (8; las dos base cubren singleton y OpenAPI).
  quiz('ioc', 10, 'u10-a', '¿Qué aporta IoC en Spring?', 1, [
    ['Que las clases construyan todas sus dependencias', 'Eso acopla el caso de uso a implementaciones y creación concreta.'],
    ['Que el contenedor componga dependencias declaradas', 'La aplicación expresa qué necesita y Spring administra la composición.'],
    ['Que todos los beans sean static', 'El ciclo de vida del bean no se resuelve con campos estáticos.'],
    ['Que no existan interfaces', 'Las interfaces siguen siendo útiles para contratos y pruebas.'],
  ]),
  quiz('constructor-injection', 10, 'u10-a', '¿Qué ventaja tiene la inyección por constructor?', 2, [
    ['Oculta las dependencias del caso de uso', 'Las dependencias quedan explícitas en la firma del constructor.'],
    ['Permite dependencias opcionales sin decisión', 'La opcionalidad debe modelarse deliberadamente, no ocultarse.'],
    ['Hace visibles requisitos y facilita pruebas aisladas', 'Se puede construir el objeto con dobles de prueba sin iniciar el contenedor.'],
    ['Evita todos los ciclos entre beans', 'Los ciclos deben corregirse en el diseño y no depender de una técnica.'],
  ]),
  quiz('spring-profile', 10, 'u10-a', '¿Para qué usarías perfiles de Spring?', 0, [
    ['Activar configuración apropiada por entorno', 'Permiten cambiar adaptadores o valores sin duplicar la lógica de negocio.'],
    ['Guardar contraseñas directamente en Git', 'Los secretos deben inyectarse mediante mecanismos seguros fuera del repositorio.'],
    ['Cambiar el JDK en tiempo de ejecución', 'La versión de Java se define al construir y ejecutar el proceso.'],
    ['Reemplazar tests de integración', 'Los perfiles ayudan a configurar; no verifican por sí solos el comportamiento.'],
  ]),
  quiz('bean-scope', 10, 'u10-a', '¿Cuál es el scope predeterminado de un bean Spring?', 3, [
    ['request', 'Ese scope crea una instancia por solicitud web cuando se configura.'],
    ['prototype', 'Prototype crea instancias nuevas por resolución, no es el valor predeterminado.'],
    ['session', 'Session se vincula al estado de una sesión web y debe usarse con cuidado.'],
    ['singleton', 'Una instancia por ApplicationContext requiere que no guarde estado de petición mutable.'],
  ]),
  quiz('mvc-controller', 10, 'u10-b', '¿Qué responsabilidad debería tener un controller MVC?', 1, [
    ['Implementar reglas complejas y acceso SQL directo', 'Eso mezcla transporte, reglas y persistencia, dificultando pruebas y evolución.'],
    ['Traducir HTTP hacia el caso de uso y su respuesta', 'Recibe, valida la frontera, delega y devuelve un contrato HTTP.'],
    ['Guardar estado de cada usuario en campos', 'Un controller normalmente es singleton y no debe compartir datos de petición.'],
    ['Elegir índices de base de datos', 'La optimización de persistencia corresponde a otra capa y análisis.'],
  ]),
  quiz('validation', 10, 'u10-b', '¿Qué logra @Valid en un parámetro de entrada correctamente anotado?', 2, [
    ['Convierte toda excepción en 200 OK', 'Los errores deben traducirse a estados HTTP coherentes, no ocultarse.'],
    ['Persiste la entidad automáticamente', 'Validar un DTO no ejecuta una transacción ni guarda datos.'],
    ['Dispara las restricciones declaradas sobre el objeto', 'Las anotaciones de validación revisan forma y límites antes de delegar.'],
    ['Autoriza al usuario actual', 'Autorización y validación de datos son responsabilidades distintas.'],
  ]),
  quiz('exception-handler', 10, 'u10-c', '¿Qué beneficio ofrece un manejador global de errores?', 0, [
    ['Unificar la traducción de fallos a contratos HTTP', 'Evita repetir respuestas y reduce la exposición accidental de detalles internos.'],
    ['Eliminar la necesidad de logs', 'Los errores inesperados siguen necesitando evidencia para investigarse.'],
    ['Recuperar cualquier error sin decisión', 'Cada error requiere una política: responder, propagar o compensar.'],
    ['Reintentar siempre el endpoint', 'Reintentar peticiones no idempotentes puede duplicar efectos.'],
  ]),
  quiz('openapi-contract', 10, 'u10-c', '¿Qué cambio exige especial cuidado en un contrato OpenAPI publicado?', 3, [
    ['Agregar una descripción más clara', 'Mejorar documentación no suele romper a un consumidor generado.'],
    ['Cambiar el orden visual de tags', 'Los tags organizan la documentación, no alteran necesariamente el payload.'],
    ['Añadir un ejemplo de respuesta', 'Los ejemplos ayudan a comprender pero no cambian el esquema requerido.'],
    ['Eliminar o cambiar un campo requerido de respuesta', 'Puede romper clientes que compilan o validan contra el contrato anterior.'],
  ]),

  // Unidad 11: SQL y JDBC (7; la pregunta base y la expansión cubren HAVING y EXPLAIN).
  quiz('sql-primary-key', 11, 'u11-a', '¿Qué garantiza una clave primaria relacional?', 0, [
    ['Identidad única y no nula para cada fila', 'Permite referenciar una fila y protege la unicidad definida por el modelo.'],
    ['Que una columna esté ordenada físicamente', 'El orden de almacenamiento no es una garantía general de la clave.'],
    ['Que todas las consultas sean rápidas', 'El rendimiento depende de índices, planes, volumen y patrón de consulta.'],
    ['Que no existan claves foráneas', 'Las claves foráneas pueden referenciar una clave primaria.'],
  ]),
  quiz('sql-join', 11, 'u11-a', '¿Qué devuelve un LEFT JOIN cuando no hay coincidencia del lado derecho?', 2, [
    ['Elimina siempre la fila izquierda', 'Ese comportamiento corresponde a un inner join sin coincidencia.'],
    ['Duplica la fila derecha vacía', 'No hay una fila derecha; se conservan columnas nulas en esa parte.'],
    ['Conserva la fila izquierda y completa con NULL el lado derecho', 'Sirve para detectar relaciones opcionales o ausencias de coincidencia.'],
    ['Convierte automáticamente NULL en cero', 'La conversión depende de la consulta y del tipo de datos.'],
  ]),
  quiz('sql-transaction', 11, 'u11-b', '¿Qué busca la atomicidad de una transacción?', 1, [
    ['Que dos transacciones nunca coincidan', 'La concurrencia puede existir y se controla con aislamiento y locks.'],
    ['Que sus cambios se confirmen todos o ninguno', 'Evita persistir un estado parcial si una parte de la operación falla.'],
    ['Que una query use siempre un índice', 'El plan de acceso es independiente de la propiedad ACID.'],
    ['Que cada tabla tenga una sola columna', 'El modelado no se reduce a la definición de transacciones.'],
  ]),
  quiz('sql-isolation', 11, 'u11-b', '¿Qué riesgo puede aparecer con un aislamiento demasiado bajo?', 3, [
    ['Que la consulta no tenga WHERE', 'WHERE filtra datos y no define el aislamiento de una transacción.'],
    ['Que Java no compile', 'El aislamiento se resuelve en la base y conexión, no en compilación Java.'],
    ['Que se prohíban los índices', 'Los índices y los niveles de aislamiento son conceptos diferentes.'],
    ['Lecturas no consistentes respecto de cambios concurrentes', 'El nivel elegido determina qué anomalías se toleran y qué costo se paga.'],
  ]),
  quiz('jdbc-prepared', 11, 'u11-c', '¿Por qué usar PreparedStatement con parámetros?', 0, [
    ['Separa datos de la sentencia y reduce inyección SQL', 'El driver envía valores como parámetros en lugar de concatenarlos al texto SQL.'],
    ['Hace innecesarias las validaciones de negocio', 'La seguridad de SQL no reemplaza reglas de formato, autorización o negocio.'],
    ['Evita toda consulta lenta', 'El plan y los índices siguen determinando el rendimiento de la consulta.'],
    ['Cierra conexiones automáticamente', 'El ciclo de vida sigue requiriendo try-with-resources o un pool bien usado.'],
  ]),
  quiz('jdbc-pool', 11, 'u11-c', '¿Qué problema evita principalmente un pool de conexiones?', 1, [
    ['Que una transacción tenga rollback', 'Rollback es una operación del motor y de la transacción actual.'],
    ['Abrir conexiones físicas para cada operación', 'Reutiliza conexiones limitadas y evita el costo repetido de crearlas.'],
    ['Que existan timeouts', 'Los timeouts siguen siendo necesarios para proteger recursos finitos.'],
    ['La necesidad de cerrar recursos', 'Cada préstamo debe devolverse al pool cerrando correctamente la conexión.'],
  ]),
  quiz('sql-index-write', 11, 'u11-d', '¿Cuál es un costo de agregar muchos índices?', 2, [
    ['Las columnas dejan de aceptar NULL', 'La nulabilidad se define en el esquema, no por la cantidad de índices.'],
    ['Los joins se vuelven imposibles', 'Los índices pueden ayudar o no según el plan de join.'],
    ['Las escrituras deben mantener estructuras adicionales', 'Insert, update y delete pagan el mantenimiento de cada índice afectado.'],
    ['La base ya no puede ordenar resultados', 'ORDER BY sigue disponible y puede aprovechar índices cuando aplica.'],
  ]),

  // Unidad 12: JPA y Spring Data (8; las base cubren N+1 y @Version).
  quiz('jpa-persistence-context', 12, 'u12-a', '¿Qué representa el contexto de persistencia de JPA?', 1, [
    ['Una copia global permanente de la base', 'Su alcance está ligado a la unidad de trabajo, no a toda la vida del sistema.'],
    ['Entidades gestionadas y su identidad dentro de una unidad de trabajo', 'Permite dirty checking y evita cargar dos objetos distintos para la misma fila gestionada.'],
    ['Un reemplazo de la transacción', 'El contexto trabaja junto a una transacción, pero no sustituye su atomicidad.'],
    ['Un caché distribuido entre servicios', 'No comparte automáticamente entidades ni estado entre procesos.'],
  ]),
  quiz('jpa-dirty-checking', 12, 'u12-a', '¿Qué hace dirty checking en una entidad gestionada?', 2, [
    ['Bloquea toda tabla antes de leer', 'El locking depende de la estrategia y de la consulta, no de dirty checking.'],
    ['Serializa automáticamente a JSON', 'La serialización web es responsabilidad de la capa de transporte.'],
    ['Detecta cambios y puede sincronizarlos al finalizar la unidad de trabajo', 'La entidad debe estar gestionada y la transacción debe completar según la política.'],
    ['Elimina asociaciones no cargadas', 'La carga de asociaciones y las cascadas tienen reglas independientes.'],
  ]),
  quiz('jpa-owning-side', 12, 'u12-b', 'En una relación bidireccional JPA, ¿qué lado actualiza la foreign key?', 0, [
    ['El owning side definido por el mapeo', 'Actualizar solo el lado inverso en memoria puede no reflejarse en la base.'],
    ['Siempre el lado con más campos', 'La cantidad de campos no define ownership de la relación.'],
    ['El controller HTTP', 'La web no decide cómo se persiste una asociación entre entidades.'],
    ['Cualquier lado de manera indistinta', 'El mapeo necesita una fuente de verdad para evitar ambigüedad.'],
  ]),
  quiz('jpa-fetch', 12, 'u12-b', '¿Qué decisión evita usar EAGER como solución universal?', 3, [
    ['Nunca cargar asociaciones', 'Algunos casos realmente necesitan datos relacionados y deben expresarlo.'],
    ['Convertir toda relación en String', 'Perder el modelo no arregla el plan de acceso ni la consistencia.'],
    ['Usar una sola entidad gigante', 'Aumenta acoplamiento y no garantiza consultas eficientes.'],
    ['Elegir fetch o proyección según el caso de lectura', 'Permite controlar SQL y volumen sin cargar datos innecesarios siempre.'],
  ]),
  quiz('jpa-cascade', 12, 'u12-b', '¿Qué riesgo tiene CascadeType.REMOVE usado sin revisar el agregado?', 1, [
    ['Crea automáticamente un índice', 'Las cascadas no definen la estrategia de índices de la tabla.'],
    ['Puede borrar entidades relacionadas que tienen vida independiente', 'La cascada debe reflejar propiedad y ciclo de vida real del dominio.'],
    ['Evita que se haga commit', 'El commit depende de la transacción, no de la existencia de una cascada.'],
    ['Cifra los datos relacionados', 'Persistencia en cascada no aporta cifrado de datos.'],
  ]),
  quiz('jpql', 12, 'u12-c', '¿Sobre qué se escribe JPQL normalmente?', 2, [
    ['Nombres físicos de columnas y tablas solamente', 'Eso corresponde al SQL nativo y a los nombres del esquema.'],
    ['Archivos JSON expuestos por la API', 'JPQL no consulta contratos HTTP ni documentos JSON directamente.'],
    ['Entidades y atributos del modelo persistente', 'El proveedor traduce la consulta al SQL apropiado para la base configurada.'],
    ['Clases de test de JUnit', 'Las pruebas invocan repositorios, pero no son el lenguaje de consulta.'],
  ]),
  quiz('spring-data-page', 12, 'u12-c', '¿Qué conviene especificar al paginar resultados con Spring Data?', 0, [
    ['Un orden estable además de tamaño y página', 'Sin orden, páginas consecutivas pueden ser ambiguas ante cambios o planes distintos.'],
    ['Solo un booleano para indicar paginación', 'El consumidor necesita contrato de tamaño, posición y orden.'],
    ['Todas las entidades relacionadas', 'La paginación no justifica cargar el grafo completo siempre.'],
    ['Un lock pesimista global', 'Bloquear globalmente no es la respuesta general para listar datos.'],
  ]),
  quiz('jpa-projection', 12, 'u12-c', '¿Cuándo ayuda una proyección de Spring Data?', 3, [
    ['Cuando siempre se va a editar la entidad completa', 'Para editar conviene cargar reglas y estado requeridos por el agregado.'],
    ['Para reemplazar toda validación de dominio', 'Una proyección optimiza lectura; no sustituye el modelo de negocio.'],
    ['Para evitar definir una consulta', 'Aun se debe expresar qué datos y filtros necesita la lectura.'],
    ['Cuando una pantalla necesita solo un subconjunto de columnas', 'Reduce transferencia y carga al consultar una vista específica.'],
  ]),

  // Unidad 13: Testing y observabilidad (8; las base cubren cobertura y aislamiento).
  quiz('junit-assertion', 13, 'u13-a', '¿Qué debe comprobar una prueba unitaria útil?', 1, [
    ['Que el método tenga muchas líneas', 'La extensión del código no prueba su resultado ni su comportamiento.'],
    ['Un comportamiento observable frente a un escenario', 'Las aserciones deben conectar entrada, salida y efectos relevantes.'],
    ['Que el framework use una base real', 'Eso corresponde a una prueba de integración, no siempre a una unitaria.'],
    ['Que todos los campos sean públicos', 'La encapsulación no se evalúa por accesibilidad de todos los detalles.'],
  ]),
  quiz('mock-boundary', 13, 'u13-a', '¿Cuándo es razonable usar un mock?', 2, [
    ['Para comprobar internals privados de la clase', 'Los tests deberían centrarse en contratos observables, no detalles frágiles.'],
    ['Para sustituir cada objeto del sistema', 'Mockear todo puede convertir la prueba en una réplica de la implementación.'],
    ['Para controlar una colaboración externa del caso de uso', 'Permite probar decisiones del caso de uso ante resultados o fallos del puerto.'],
    ['Para reemplazar toda prueba de integración', 'Los mocks no validan configuración ni protocolo real de una dependencia.'],
  ]),
  quiz('mockito-verify', 13, 'u13-a', '¿Qué riesgo tiene verificar demasiadas interacciones Mockito?', 0, [
    ['Acoplar el test a pasos internos que pueden cambiar', 'El test puede fallar ante una refactorización que conserva el comportamiento.'],
    ['Mejorar demasiado la cobertura', 'La cobertura no es el riesgo principal de verificar interacciones.'],
    ['Impedir usar aserciones', 'Se pueden combinar aserciones de estado y verificación relevante.'],
    ['Convertir un mock en una base de datos', 'Un mock no cambia de naturaleza por verificar métodos.'],
  ]),
  quiz('integration-scope', 13, 'u13-b', '¿Qué valida mejor una prueba de integración?', 3, [
    ['El nombre de una clase interna', 'Los detalles de nombres no prueban la cooperación entre componentes.'],
    ['Que todos los métodos sean puros', 'La pureza es útil, pero no define una integración real.'],
    ['El orden de ejecución de JUnit', 'Una suite sana no debe depender del orden de pruebas.'],
    ['La cooperación real entre componentes y configuración', 'Puede cubrir HTTP, persistencia, serialización o infraestructura controlada.'],
  ]),
  quiz('tdd-cycle', 13, 'u13-b', '¿Cuál es el ciclo clásico de TDD?', 1, [
    ['Diseñar todo, desplegar y luego probar', 'Retrasar feedback hace más costoso corregir una regla mal entendida.'],
    ['Red, green, refactor', 'Primero un test que falla, luego el mínimo cambio y después mejora interna.'],
    ['Mock, deploy, rollback', 'Esas acciones no describen el ciclo de diseño guiado por pruebas.'],
    ['Log, retry, cache', 'Son preocupaciones operativas distintas de TDD.'],
  ]),
  quiz('structured-log', 13, 'u13-c', '¿Qué aporta un log estructurado?', 2, [
    ['Oculta automáticamente datos sensibles', 'La aplicación aún debe elegir qué campos son seguros de registrar.'],
    ['Evita definir niveles de severidad', 'INFO, WARN y ERROR siguen ayudando a priorizar señales.'],
    ['Campos consultables como requestId, operación y resultado', 'Facilita filtrar, correlacionar y medir sin parsear texto frágil.'],
    ['Reemplaza todas las métricas', 'Logs, métricas y trazas responden preguntas operativas diferentes.'],
  ]),
  quiz('metric-counter', 13, 'u13-c', '¿Qué mide típicamente un counter?', 0, [
    ['Cantidad acumulada de eventos ocurridos', 'Es apropiado para solicitudes, errores o mensajes procesados.'],
    ['El valor actual de memoria exclusivamente', 'Ese valor suele representarse con un gauge y su unidad correspondiente.'],
    ['La traza completa de una petición', 'Una traza registra relaciones y spans, no solo un número acumulado.'],
    ['El cuerpo HTTP de cada respuesta', 'Los counters no almacenan payloads de solicitudes.'],
  ]),
  quiz('trace-context', 13, 'u13-c', '¿Para qué sirve propagar contexto de traza entre servicios?', 3, [
    ['Aumentar artificialmente la prioridad del proceso', 'La propagación no cambia scheduling ni recursos del sistema operativo.'],
    ['Convertir fallos en respuestas exitosas', 'La traza observa una solicitud, pero no recupera el error por sí sola.'],
    ['Reemplazar autenticación entre servicios', 'Identidad y autorización requieren mecanismos de seguridad propios.'],
    ['Relacionar spans de una misma operación distribuida', 'Permite seguir latencia y fallos a través de llamadas y consumidores.'],
  ]),

  // Unidad 14: Arquitectura (8; las base cubren hexagonal y value objects).
  quiz('layering', 14, 'u14-a', '¿Qué objetivo tiene separar capas en una aplicación?', 1, [
    ['Impedir que el dominio tenga reglas', 'El dominio suele concentrar reglas importantes del negocio.'],
    ['Separar responsabilidades y controlar dependencias', 'Cada capa puede cambiar con menor impacto cuando sus fronteras son claras.'],
    ['Crear más paquetes aunque no haya límites', 'Los nombres de paquetes no sustituyen contratos y dirección de dependencia.'],
    ['Eliminar toda comunicación entre componentes', 'Los componentes colaboran mediante interfaces y casos de uso definidos.'],
  ]),
  quiz('port', 14, 'u14-a', 'En arquitectura hexagonal, ¿qué es un puerto de salida?', 2, [
    ['Un endpoint HTTP público', 'HTTP suele ser un adaptador de entrada que invoca un caso de uso.'],
    ['La URL de una base de datos', 'La URL es configuración de infraestructura, no una abstracción de aplicación.'],
    ['Una abstracción que el núcleo necesita para colaborar afuera', 'Un repositorio o publicador puede implementar la necesidad definida por el caso de uso.'],
    ['Una clase de Spring obligatoria', 'El puerto puede ser Java puro sin depender de un framework.'],
  ]),
  quiz('adapter', 14, 'u14-a', '¿Qué hace un adaptador en la arquitectura hexagonal?', 0, [
    ['Traduce entre un mecanismo externo y un puerto', 'Puede adaptar HTTP, SQL, mensajería o CLI al contrato del núcleo.'],
    ['Reemplaza todas las entidades del dominio', 'El dominio conserva sus conceptos y reglas propios.'],
    ['Decide la política de negocio central', 'Las decisiones de negocio pertenecen a casos de uso y dominio.'],
    ['Evita que exista configuración', 'Los adaptadores necesitan configuración para sus tecnologías concretas.'],
  ]),
  quiz('ddd-entity', 14, 'u14-b', '¿Qué distingue a una entidad DDD de un value object?', 3, [
    ['Una entidad siempre es inmutable', 'Puede cambiar estado manteniendo la misma identidad conceptual.'],
    ['Un value object siempre tiene tabla propia', 'Su persistencia depende del modelo; no define su significado.'],
    ['La entidad no tiene reglas de negocio', 'Las entidades pueden proteger invariantes relevantes de su ciclo de vida.'],
    ['La entidad conserva identidad aunque cambien sus atributos', 'Dos entidades pueden parecerse en valores y aun representar cosas distintas.'],
  ]),
  quiz('aggregate', 14, 'u14-b', '¿Qué responsabilidad tiene la raíz de un agregado?', 1, [
    ['Permitir modificar cualquier objeto interno desde afuera', 'El acceso directo puede romper invariantes que requieren coordinación.'],
    ['Proteger invariantes y controlar cambios del agregado', 'Las referencias externas apuntan a la raíz para mantener consistencia local.'],
    ['Sustituir toda transacción de base', 'El agregado define reglas de dominio, no el mecanismo de transacción.'],
    ['Crear un microservicio por clase', 'Los límites de agregado y despliegue son decisiones distintas.'],
  ]),
  quiz('bounded-context', 14, 'u14-b', '¿Qué expresa un bounded context?', 2, [
    ['Una tabla con máximo de filas', 'El concepto trata modelos y lenguaje, no un límite físico de datos.'],
    ['Un endpoint con rate limiting', 'Es una política operativa distinta del diseño del dominio.'],
    ['El límite donde un modelo y su lenguaje tienen significado coherente', 'Un mismo término puede cambiar de sentido entre contextos como ventas y logística.'],
    ['Una transacción global entre servicios', 'Cada contexto puede tener sus propios datos y consistencia.'],
  ]),
  quiz('acl-pattern', 14, 'u14-c', '¿Para qué sirve una anti-corruption layer?', 0, [
    ['Traducir un modelo externo sin contaminar el modelo propio', 'Aísla nombres, reglas y formatos ajenos detrás de una frontera explícita.'],
    ['Cifrar automáticamente toda base de datos', 'El cifrado es una preocupación de seguridad diferente.'],
    ['Eliminar integraciones con sistemas legados', 'Permite integrarlas de manera controlada, no necesariamente eliminarlas.'],
    ['Reemplazar los tests de contrato', 'Las traducciones requieren pruebas para mantener su comportamiento.'],
  ]),
  quiz('architecture-choice', 14, 'u14-c', '¿Qué evidencia apoya separar un módulo en microservicio?', 3, [
    ['El nombre del módulo es largo', 'La longitud del nombre no justifica costo de red y operación distribuida.'],
    ['El equipo conoce Kafka', 'Una tecnología disponible no demuestra una necesidad de separación.'],
    ['Una presentación recomienda microservicios', 'La decisión debe responder a problemas concretos del sistema.'],
    ['Necesita escalar, desplegar o evolucionar de forma independiente', 'Aun así se evalúan datos, contratos, observabilidad y costo operativo.'],
  ]),

  // Unidad 15: Eventos y sistemas distribuidos (8; las base cubren orden y outbox).
  quiz('event-vs-command', 15, 'u15-a', '¿Qué diferencia conceptual hay entre un evento y un comando?', 1, [
    ['Un evento siempre se procesa síncronamente', 'Los eventos suelen comunicar hechos y pueden entregarse de manera asíncrona.'],
    ['Un comando pide una acción; un evento comunica un hecho ocurrido', 'Esta distinción aclara intención, responsabilidad y acoplamiento entre componentes.'],
    ['Un comando no tiene datos', 'Puede incluir los datos necesarios para ejecutar la acción solicitada.'],
    ['Un evento obliga a un único consumidor', 'Varios consumidores pueden reaccionar de forma independiente.'],
  ]),
  quiz('consumer-group', 15, 'u15-a', '¿Qué permite un consumer group de Kafka?', 2, [
    ['Que todos los consumidores reciban cada mensaje del grupo', 'Dentro de un grupo una partición se asigna a un consumidor a la vez.'],
    ['Eliminar necesidad de offsets', 'El grupo usa offsets para registrar su progreso de consumo.'],
    ['Distribuir particiones entre consumidores de la misma aplicación', 'Aumenta paralelismo hasta el límite de particiones disponibles.'],
    ['Garantizar orden global entre topics', 'El orden se mantiene por partición, no globalmente.'],
  ]),
  quiz('offset', 15, 'u15-a', '¿Qué representa un offset en una partición Kafka?', 0, [
    ['La posición de un registro dentro del log de esa partición', 'Los consumidores usan esa posición para retomar o reprocesar desde un punto.'],
    ['El identificador global de todos los eventos', 'No existe un contador único entre todos los topics y particiones.'],
    ['El tiempo exacto de negocio', 'Un offset expresa orden de log, no la semántica temporal del dominio.'],
    ['La cantidad de consumidores conectados', 'La pertenencia del grupo se gestiona de otra manera.'],
  ]),
  quiz('idempotent-consumer', 15, 'u15-b', '¿Cómo protege un consumer un efecto frente a entregas repetidas?', 3, [
    ['Confiando en que la red nunca falle', 'La red y los procesos pueden fallar en puntos intermedios.'],
    ['Confirmando offset antes de procesar', 'Puede perder un evento si cae después de confirmar y antes del efecto.'],
    ['Desactivando reintentos para siempre', 'Evita duplicados pero también impide recuperarse de fallos transitorios.'],
    ['Persistiendo una clave de deduplicación junto al efecto', 'La protección debe sobrevivir reinicios y ser atómica con el resultado.'],
  ]),
  quiz('dlq-purpose', 15, 'u15-b', '¿Cuándo conviene desviar un mensaje a una DLQ?', 1, [
    ['Ante cualquier error de validación del cliente HTTP', 'La DLQ corresponde al flujo de mensajes, no a toda entrada web.'],
    ['Tras agotar una política para un fallo que no puede procesarse', 'Conserva evidencia y evita bloquear indefinidamente el flujo principal.'],
    ['Antes del primer intento de consumo', 'No permite distinguir un error transitorio de uno permanente.'],
    ['Para guardar todos los eventos exitosos', 'Una DLQ no es el almacenamiento normal de auditoría.'],
  ]),
  quiz('saga', 15, 'u15-c', '¿Qué modela una saga en un proceso distribuido?', 2, [
    ['Un lock global de todas las bases', 'Las transacciones distribuidas no se resuelven normalmente con un lock global.'],
    ['Una réplica exacta de cada servicio', 'La réplica mejora disponibilidad, pero no coordina reglas de negocio.'],
    ['Pasos locales y compensaciones ante fallos posteriores', 'Cada servicio confirma su cambio y una compensación corrige efectos previos si corresponde.'],
    ['Una garantía de que no habrá fallos', 'La saga reconoce fallos y define cómo manejarlos.'],
  ]),
  quiz('eventual-consistency', 15, 'u15-c', '¿Qué implica consistencia eventual?', 0, [
    ['Las proyecciones pueden tardar en reflejar un cambio confirmado', 'El diseño debe comunicar estados intermedios y permitir reconciliación.'],
    ['Los datos serán siempre incorrectos', 'Con mecanismos correctos pueden converger tras procesar los eventos.'],
    ['No se necesita idempotencia', 'Reintentos y duplicados siguen siendo posibles en mensajería.'],
    ['Todas las lecturas ven el mismo estado al instante', 'Eso describiría una consistencia mucho más fuerte.'],
  ]),
  quiz('distributed-timeout', 15, 'u15-c', '¿Por qué un timeout remoto no prueba que la operación no ocurrió?', 3, [
    ['Porque HTTP no tiene códigos de estado', 'HTTP sí define códigos para comunicar resultados y errores.'],
    ['Porque Kafka elimina la red', 'Kafka usa red y también enfrenta incertidumbre de comunicación.'],
    ['Porque una base nunca confirma cambios', 'Las bases confirman transacciones, aunque el cliente puede no conocer el resultado.'],
    ['Porque puede haberse ejecutado y perdido la respuesta', 'La incertidumbre exige idempotencia, consulta de estado o reconciliación.'],
  ]),

  // Unidad 16: Seguridad, rendimiento y operación (8; las base cubren JWT y caché).
  quiz('authentication-authorization', 16, 'u16-a', '¿Qué diferencia hay entre autenticación y autorización?', 1, [
    ['Autenticación decide permisos y autorización cifra datos', 'Son conceptos distintos: identidad, permisos y cifrado cubren necesidades diferentes.'],
    ['Autenticación verifica identidad; autorización verifica permisos', 'Una identidad válida aún puede no tener acceso al recurso solicitado.'],
    ['Autorización crea un usuario nuevo', 'Crear usuarios es una operación de gestión, no la definición de permisos.'],
    ['Ambas son sinónimos en OAuth2', 'OAuth2 y OIDC distinguen flujos y responsabilidades de seguridad.'],
  ]),
  quiz('oauth-scope', 16, 'u16-a', '¿Qué representa un scope en OAuth2?', 2, [
    ['Una contraseña cifrada dentro del token', 'Las credenciales y los permisos concedidos son elementos diferentes.'],
    ['La dirección IP permanente de un usuario', 'La IP no define por sí misma permisos de una aplicación.'],
    ['Un alcance de permisos otorgado al cliente o usuario', 'La API debe verificar que el scope requerido cubra la operación concreta.'],
    ['Un reemplazo de la expiración del token', 'La expiración limita vigencia; el scope define capacidad autorizada.'],
  ]),
  quiz('sql-injection', 16, 'u16-a', '¿Cuál es la defensa principal contra SQL injection?', 0, [
    ['Usar parámetros enlazados y evitar concatenar entrada', 'PreparedStatement mantiene datos separados de la estructura SQL.'],
    ['Escapar comillas manualmente en todos lados', 'Es frágil y no sustituye el enlace de parámetros del driver.'],
    ['Ocultar el error al usuario', 'No evita que una entrada maliciosa altere una sentencia vulnerable.'],
    ['Usar HTTPS solamente', 'TLS protege tránsito, pero no cambia cómo se construye SQL.'],
  ]),
  quiz('cors', 16, 'u16-a', '¿Qué controla CORS principalmente?', 3, [
    ['La validación de reglas de negocio', 'Las reglas de negocio deben protegerse dentro de la aplicación.'],
    ['La tasa de mensajes Kafka', 'Kafka y navegador son fronteras técnicas diferentes.'],
    ['La serialización de fechas JSON', 'El formato de fecha pertenece al contrato y serializador elegido.'],
    ['Qué orígenes del navegador pueden llamar a un recurso', 'Es una política del navegador; no reemplaza autenticación ni autorización.'],
  ]),
  quiz('csrf', 16, 'u16-a', '¿Cuándo es especialmente relevante la protección CSRF?', 1, [
    ['Cuando se usan credenciales enviadas automáticamente por el navegador', 'Cookies de sesión pueden acompañar una petición forjada desde otro origen.'],
    ['Cuando un batch procesa un CSV local', 'Ese proceso no tiene necesariamente la frontera de navegador y cookies.'],
    ['Al consultar una base con JDBC', 'CSRF no reemplaza controles de acceso ni parámetros SQL seguros.'],
    ['Para cifrar un JWT firmado', 'Firmar o cifrar tokens es una preocupación distinta.'],
  ]),
  quiz('jvm-gc', 16, 'u16-b', '¿Qué señal justifica investigar el comportamiento de GC?', 2, [
    ['Que una variable tenga nombre largo', 'La longitud del identificador no indica presión de memoria.'],
    ['Que una API use JSON', 'El formato puede tener costo, pero no prueba un problema de GC.'],
    ['Pausas, heap sostenido o latencia anómala medidas', 'La decisión debe apoyarse en métricas, perfiles y evidencia reproducible.'],
    ['Que exista una clase singleton', 'El patrón no implica por sí mismo consumo o retención problemática.'],
  ]),
  quiz('bulkhead', 16, 'u16-b', '¿Qué busca un bulkhead de resiliencia?', 0, [
    ['Aislar recursos para que una dependencia no agote a las demás', 'Separa pools, concurrencia o colas según el recurso que se quiere proteger.'],
    ['Enviar todo el tráfico a una sola instancia', 'Concentra riesgo y reduce tolerancia a fallos.'],
    ['Eliminar timeouts para no interrumpir', 'Sin timeouts se pueden retener recursos ante dependencias lentas.'],
    ['Duplicar cada mensaje sin control', 'Los duplicados requieren idempotencia y no son una estrategia de aislamiento.'],
  ]),
  quiz('pipeline-quality', 16, 'u16-c', '¿Qué debería detener una pipeline de calidad antes de desplegar?', 3, [
    ['Una mejora de comentario sin impacto', 'Los comentarios pueden revisarse, pero no siempre justifican frenar un despliegue.'],
    ['Que la rama tenga muchos commits', 'La cantidad de commits no mide la calidad del artefacto.'],
    ['Un cambio de color en documentación', 'La documentación visual no equivale a una falla de seguridad o build.'],
    ['Build, pruebas o análisis crítico fallidos', 'Son señales automatizables de que el artefacto no cumple el umbral acordado.'],
  ]),
];
