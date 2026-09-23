import type { QuizQuestion } from '../../types';

export const awsQuizzesU32U37: QuizQuestion[] = [
  { id:'aws-quiz-u32-01', unitId:32, lessonId:'aws-u32-l1', prompt:'La API registra una duración por solicitud y el equipo quiere graficar p95 y alertar si supera 800 ms. ¿Qué señal debe publicar?', correctIndex:0, options:[
    {text:'Una métrica numérica de latencia en CloudWatch.', explanation:'Correcta: una duración numérica puede agregarse en percentiles y evaluarse con una alarma.'},
    {text:'Una línea de log por solicitud, usada como alarma sin extraer métricas.', explanation:'Los logs ayudan a investigar detalles, pero comparar cada línea no ofrece por sí solo la serie numérica p95 requerida.'},
    {text:'Un evento de CloudTrail por cada petición HTTP.', explanation:'CloudTrail registra actividad de API de AWS; no es la señal de latencia de la aplicación.'},
    {text:'Un backup de la configuración del balanceador.', explanation:'El backup permite recuperar configuración, pero no mide el tiempo que tarda cada solicitud.'}]},
  { id:'aws-quiz-u32-02', unitId:32, lessonId:'aws-u32-l1', prompt:'Una orden queda trabada con un error de validación y soporte necesita ver orderId, etapa y mensaje sin registrar datos de pago. ¿Qué publicar?', correctIndex:1, options:[
    {text:'Solo aumentar el contador total de pedidos.', explanation:'El contador puede mostrar volumen, pero no identifica qué orden falló ni en qué etapa.'},
    {text:'Un log estructurado con orderId, etapa y error depurado.', explanation:'Correcta: el evento conserva contexto útil para localizar una ejecución; se excluyen datos sensibles del pago.'},
    {text:'Una dimensión de métrica por cada orderId.', explanation:'Una dimensión de alta cardinalidad crea demasiadas series y tampoco conserva el detalle del error como un log.'},
    {text:'Un evento administrativo de CloudTrail.', explanation:'CloudTrail ayuda a investigar cambios de AWS, no el error funcional de validar esta orden.'}]},
  { id:'aws-quiz-u32-03', unitId:32, lessonId:'aws-u32-l1', prompt:'La alarma de errores se dispara cada noche durante una tarea batch prevista. ¿Qué cambio la hace accionable?', correctIndex:2, options:[
    {text:'Bajar el umbral hasta que la alarma deje de aparecer.', explanation:'Ocultar el aviso puede tapar un incidente y no aclara qué respuesta debe tomar el equipo.'},
    {text:'Enviar cada registro de aplicación al teléfono de guardia.', explanation:'El ruido de logs individuales no define cuándo hay impacto ni qué hacer ante él.'},
    {text:'Acordar ventana y umbral con el SLO, dueño de guardia y runbook.', explanation:'Correcta: el umbral separa comportamiento esperado del incidente y el responsable sabe cómo actuar.'},
    {text:'Eliminar la alarma y revisar el panel una vez al mes.', explanation:'Una revisión mensual no detectaría una interrupción que necesita respuesta inmediata.'}]},
  { id:'aws-quiz-u32-04', unitId:32, lessonId:'aws-u32-l1', prompt:'El mismo servicio publica latencia para producción y staging; el panel necesita filtrar una u otra sin mezclar sus valores. ¿Cómo modelar el contexto?', correctIndex:3, options:[
    {text:'Guardar el entorno solo dentro del texto de un log.', explanation:'Ese dato facilita buscar logs, pero no separa la serie métrica del panel por entorno.'},
    {text:'Crear una alarma diferente sin cambiar la métrica publicada.', explanation:'Dos alarmas seguirían leyendo la misma serie agregada si el dato carece de contexto.'},
    {text:'Usar el nombre del usuario como clave de la métrica.', explanation:'El usuario no identifica el entorno y puede generar cardinalidad innecesaria.'},
    {text:'Publicar la dimensión Environment con valor prod o staging.', explanation:'Correcta: la dimensión etiqueta la serie y permite filtrar o alarmar cada entorno por separado.'}]},
  { id:'aws-quiz-u32-05', unitId:32, lessonId:'aws-u32-l2', prompt:'Tras un cambio no autorizado en una política de bucket, auditoría necesita saber qué identidad llamó a la API y cuándo. ¿Dónde buscar primero?', correctIndex:0, options:[
    {text:'En el historial de eventos de administración de CloudTrail.', explanation:'Correcta: CloudTrail registra llamadas de API de AWS con identidad, hora y recurso, dentro del alcance de registro configurado.'},
    {text:'En el log de acceso HTTP de la aplicación.', explanation:'Ese log puede mostrar solicitudes de usuarios, pero normalmente no atribuye quién modificó la política mediante la API de AWS.'},
    {text:'En una alarma de CPU de CloudWatch.', explanation:'CPU informa salud/carga; no registra la identidad que cambió una política.'},
    {text:'En el historial de versiones del objeto afectado.', explanation:'El versionado puede recuperar objetos, pero la pregunta requiere atribuir un cambio IAM/API.'}]},
  { id:'aws-quiz-u32-06', unitId:32, lessonId:'aws-u32-l2', prompt:'Un cambio de IAM coincide con el inicio de errores 403 en la API. ¿Qué combinación permite reconstruir mejor la secuencia?', correctIndex:1, options:[
    {text:'CloudWatch Logs únicamente, porque sus líneas reemplazan la auditoría de AWS.', explanation:'Los logs de la aplicación pueden explicar el 403, pero no prueban quién cambió la política.'},
    {text:'Correlacionar evento de CloudTrail con errores y timestamps de la aplicación.', explanation:'Correcta: CloudTrail aporta identidad y acción administrativa; CloudWatch aporta el efecto observado por la aplicación.'},
    {text:'Mirar solo la métrica de latencia p95.', explanation:'La latencia no identifica el cambio ni explica el rechazo de autorización.'},
    {text:'Restaurar el backup antes de encontrar evidencia.', explanation:'Restaurar puede alterar el estado; conviene identificar primero el evento y el recurso afectado.'}]},
  { id:'aws-quiz-u32-07', unitId:32, lessonId:'aws-u32-l2', prompt:'El equipo debe investigar cambios de infraestructura ocurridos hace nueve meses. ¿Qué decisión sobre CloudTrail y logs debe verificar?', correctIndex:2, options:[
    {text:'Que el grupo de logs no tenga ninguna política de expiración.', explanation:'La retención indefinida puede elevar costos y quizá exceder la política; no es el único mecanismo ni siempre el requerido.'},
    {text:'Que los logs de aplicación estén activados en la consola.', explanation:'Eso no confirma que los eventos de auditoría tengan cobertura y retención por nueve meses.'},
    {text:'Que exista un trail con destino y retención compatibles con el plazo exigido.', explanation:'Correcta: la ventana del Event History es limitada; para conservar evidencia por más tiempo se configura un trail y su destino/retención.'},
    {text:'Que se haya guardado una captura de pantalla del panel.', explanation:'Una captura no sustituye el registro de eventos consultable ni su retención verificable.'}]},
  { id:'aws-quiz-u32-08', unitId:32, lessonId:'aws-u32-l3', prompt:'El dueño de un checkout exige que, ante una caída, el servicio vuelva en no más de 45 minutos. ¿Qué objetivo expresa ese límite?', correctIndex:3, options:[
    {text:'RPO: cuánto dato reciente se puede perder.', explanation:'RPO mide pérdida de datos tolerable, no el tiempo para restablecer servicio.'},
    {text:'MTTR: una métrica retrospectiva que debe ser siempre cero.', explanation:'MTTR observa tiempos de reparación; no es el objetivo contractual descrito en el escenario.'},
    {text:'Retención: cuánto tiempo conservar eventos de CloudTrail.', explanation:'Retención aplica a evidencia almacenada y no fija el tiempo máximo de recuperación.'},
    {text:'RTO: tiempo objetivo máximo para recuperar el servicio.', explanation:'Correcta: el requisito fija cuánto tiempo puede estar interrumpido el checkout.'}]},
  { id:'aws-quiz-u32-09', unitId:32, lessonId:'aws-u32-l3', prompt:'Se tolera perder como máximo los últimos cinco minutos de pedidos ante una falla regional. ¿Qué expresa esa cifra?', correctIndex:0, options:[
    {text:'RPO de cinco minutos.', explanation:'Correcta: el RPO define la pérdida de datos aceptable, medida aquí como tiempo de cambios recientes.'},
    {text:'RTO de cinco minutos.', explanation:'RTO limitaría cuánto tarda el servicio en volver, no cuántos pedidos se pueden perder.'},
    {text:'Timeout de cinco minutos para cada consulta SQL.', explanation:'Ese timeout regularía una llamada y podría ser excesivo; no expresa la recuperación de datos.'},
    {text:'Retención de logs de cinco minutos.', explanation:'La retención de logs no determina cuántos pedidos se recuperan tras el incidente.'}]},
  { id:'aws-quiz-u32-10', unitId:32, lessonId:'aws-u32-l3', prompt:'Un backup diario aparece como exitoso, pero nadie ha probado usarlo. ¿Qué ejercicio aporta evidencia útil?', correctIndex:1, options:[
    {text:'Confirmar que el job de backup terminó en verde.', explanation:'Eso confirma que se creó una copia según el job, no que la restauración funcione ni cumpla el tiempo objetivo.'},
    {text:'Restaurar en un entorno aislado, validar consistencia y medir el tiempo.', explanation:'Correcta: verifica que los datos se recuperan y aporta evidencia frente a RTO/RPO.'},
    {text:'Aumentar la retención sin revisar el procedimiento de restore.', explanation:'Conservar más copias no demuestra que puedan abrirse y servir a la aplicación.'},
    {text:'Hacer una copia manual del archivo de configuración.', explanation:'La configuración sola no recupera datos ni prueba el procedimiento completo.'}]},
  { id:'aws-quiz-u33-01', unitId:33, lessonId:'aws-u33-l1', prompt:'El mismo binario Java corre local y en una tarea de producción. Local debe usar perfil; en AWS debe asumir el rol del runtime. ¿Cómo construir el cliente?', correctIndex:0, options:[
    {text:'Configurar región y dejar que el proveedor predeterminado encuentre credenciales del entorno.', explanation:'Correcta: se evita codificar claves y cada entorno aporta su fuente de credenciales; el endpoint local se configura solo en el perfil local.'},
    {text:'Incluir access key y secret key dentro del constructor del cliente.', explanation:'Las claves embebidas se filtran con el artefacto y anulan la separación de credenciales por entorno.'},
    {text:'Crear un S3Client nuevo para cada llamada HTTP.', explanation:'Eso no resuelve la selección de credenciales y desperdicia conexiones/recursos del cliente.'},
    {text:'Fijar siempre un endpoint localhost también en producción.', explanation:'El endpoint local es útil en pruebas, pero producción debe llamar al endpoint real del servicio.'}]},
  { id:'aws-quiz-u33-02', unitId:33, lessonId:'aws-u33-l1', prompt:'Una cuenta guarda recursos en us-east-1, pero una aplicación nueva consulta us-west-2 por error. ¿Qué configuración revisas?', correctIndex:1, options:[
    {text:'El tipo de contenido del objeto S3.', explanation:'Content-Type afecta la interpretación del objeto, no la región a la que se envía la petición.'},
    {text:'La región del cliente SDK o la región resuelta por su configuración.', explanation:'Correcta: el cliente firma y envía solicitudes a una región; debe coincidir con la ubicación del recurso/servicio.'},
    {text:'La política de reintentos únicamente.', explanation:'Reintentar en otra región no corrige una región mal configurada ni migra el recurso.'},
    {text:'El tamaño del pool JDBC de la aplicación.', explanation:'El pool controla conexiones SQL, no el destino regional del cliente AWS.'}]},
  { id:'aws-quiz-u33-03', unitId:33, lessonId:'aws-u33-l1', prompt:'En una laptop el SDK toma accidentalmente claves viejas de variables de entorno en vez del perfil SSO esperado. ¿Qué debes recordar de la cadena de credenciales?', correctIndex:2, options:[
    {text:'La cadena siempre prioriza credenciales del rol de producción.', explanation:'La fuente depende del orden y proveedores configurados; una laptop no asume por defecto el rol que corre en producción.'},
    {text:'La región selecciona qué usuario IAM autentica la solicitud.', explanation:'La región elige el destino regional, no la identidad que firma la solicitud.'},
    {text:'El SDK usa la primera fuente disponible según el orden de su cadena.', explanation:'Correcta: una fuente anterior, como variables de entorno, puede ocultar el perfil esperado; inspecciona configuración sin imprimir secretos.'},
    {text:'Un endpoint personalizado elimina la necesidad de credenciales.', explanation:'Cambiar endpoint no elimina autenticación ni hace que la aplicación use otro perfil.'}]},
  { id:'aws-quiz-u33-04', unitId:33, lessonId:'aws-u33-l1', prompt:'Un servicio Spring crea cientos de conexiones TLS porque construye un SDK client por solicitud. ¿Qué ajuste aborda la causa?', correctIndex:3, options:[
    {text:'Poner el cliente dentro de un singleton mutable compartido sin cierre.', explanation:'Un singleton puede ayudar a reutilizar conexiones, pero también debe administrarse su ciclo de vida y evitar estado mutable inseguro.'},
    {text:'Aumentar el número de threads para cada request.', explanation:'Más threads pueden multiplicar los clientes y las conexiones, agravando el consumo.'},
    {text:'Desactivar HTTPS para reducir el costo del handshake.', explanation:'Quitar TLS compromete la seguridad y no corrige el patrón de creación de clientes.'},
    {text:'Crear el cliente una vez por proceso, reutilizarlo y cerrarlo al apagar.', explanation:'Correcta: los clientes SDK son costosos y mantienen recursos de conexión; reutilizarlos evita reconstrucción por solicitud.'}]},
  { id:'aws-quiz-u33-05', unitId:33, lessonId:'aws-u33-l2', prompt:'Una rutina sube un archivo a S3 y necesita el cuerpo del resultado para confirmar metadatos. ¿Qué patrón evita perder o filtrar recursos?', correctIndex:0, options:[
    {text:'Usar S3Client compartido y cerrar el ResponseInputStream del get en try-with-resources.', explanation:'Correcta: el cliente se reutiliza, y el stream de respuesta se cierra para liberar la conexión tras consumir el contenido.'},
    {text:'No cerrar nunca el stream porque el garbage collector lo libera al final.', explanation:'Esperar al GC puede retener conexiones y agotar recursos bajo carga.'},
    {text:'Cerrar el cliente después de cada operación y conservar el stream abierto.', explanation:'Cierra un recurso compartido innecesariamente y deja abierto el stream que debe liberarse.'},
    {text:'Leer el objeto completo en memoria sin límite para simplificar.', explanation:'Archivos grandes pueden agotar memoria; el consumo debe considerar tamaño y cierre del stream.'}]},
  { id:'aws-quiz-u33-06', unitId:33, lessonId:'aws-u33-l2', prompt:'Un pedido debe guardarse con clave de cliente y consultarse por esa clave desde Java. ¿Qué responsabilidad tiene DynamoDbClient?', correctIndex:1, options:[
    {text:'Convierte consultas SQL en joins administrados por DynamoDB.', explanation:'DynamoDB no ejecuta joins relacionales; el cliente tampoco transforma su modelo en SQL.'},
    {text:'Envía operaciones de tabla como PutItem o Query usando requests del SDK.', explanation:'Correcta: el cliente es la puerta del SDK a DynamoDB; el diseño de PK/SK determina qué Query resuelve el patrón.'},
    {text:'Mantiene automáticamente una caché consistente de cada elemento.', explanation:'DynamoDbClient no es una caché; la aplicación debe decidir consistencia o usar un servicio de caché aparte.'},
    {text:'Crea un cliente nuevo para cada ítem y lo cierra tras PutItem.', explanation:'No es necesario crear clientes por ítem; reutiliza el cliente y maneja errores/respuestas apropiadamente.'}]},
  { id:'aws-quiz-u33-07', unitId:33, lessonId:'aws-u33-l2', prompt:'Una prueba con SDK pasa contra el emulador local, pero producción recibe AccessDenied. ¿Qué conclusión es válida?', correctIndex:2, options:[
    {text:'La prueba local demuestra que la política IAM de AWS es correcta.', explanation:'Una emulación compatible puede no aplicar IAM real; los permisos deben validarse en AWS o con herramientas adecuadas.'},
    {text:'La región de AWS debe ser irrelevante si el emulador respondió.', explanation:'Una respuesta local no prueba la región ni configuración de la cuenta real.'},
    {text:'La prueba valida la operación implementada, pero no demuestra permisos reales.', explanation:'Correcta: el emulador sirve para probar el flujo compatible; IAM, cuotas y comportamiento del servicio real requieren validación aparte.'},
    {text:'El código debe ampliar la política a s3:* y dynamodb:*.', explanation:'Abrir permisos para hacer pasar producción rompe menor privilegio y no diagnostica qué acción falta.'}]},
  { id:'aws-quiz-u33-08', unitId:33, lessonId:'aws-u33-l3', prompt:'Una aplicación Spring Boot quiere inyectar un cliente AWS y externalizar propiedades del servicio mediante integración de Spring. ¿Qué biblioteca está pensada para ese rol?', correctIndex:3, options:[
    {text:'AWS CloudTrail, porque registra beans y dependencias.', explanation:'CloudTrail audita llamadas a APIs AWS; no integra dependencias del framework Spring.'},
    {text:'JDBC, que implementa listeners de SQS.', explanation:'JDBC conecta bases SQL y no configura consumidores de colas.'},
    {text:'Amazon ECR, que crea clients Java al iniciar un contenedor.', explanation:'ECR almacena imágenes de contenedor; no provee integración de dependencias Spring.'},
    {text:'Spring Cloud AWS, junto con el SDK y la configuración requerida.', explanation:'Correcta: aporta integración Spring para servicios AWS; aun así, región, credenciales y comportamiento del consumidor deben configurarse.'}]},
  { id:'aws-quiz-u33-09', unitId:33, lessonId:'aws-u33-l3', prompt:'Un listener SQS reserva inventario y a veces vuelve a recibir el mismo mensaje. ¿Qué control debe implementar la lógica del consumidor?', correctIndex:0, options:[
    {text:'Idempotencia por eventId y confirmación solo después de completar el efecto.', explanation:'Correcta: SQS puede redeliver; reconocer el eventId evita repetir la reserva y confirmar temprano podría perder el trabajo.'},
    {text:'Eliminar el mensaje al entrar al listener antes de procesarlo.', explanation:'Si la aplicación falla tras eliminarlo, el trabajo se pierde sin posibilidad de reintento.'},
    {text:'Deshabilitar toda excepción para que el listener siempre termine bien.', explanation:'Ocultar errores puede confirmar mensajes que no se procesaron y dejar inventario inconsistente.'},
    {text:'Asignar una variable estática como registro duradero de mensajes vistos.', explanation:'El estado estático desaparece al reiniciar y puede compartirse entre invocaciones de forma no segura.'}]},
  { id:'aws-quiz-u33-10', unitId:33, lessonId:'aws-u33-l3', prompt:'El mismo JAR Spring debe apuntar a colas distintas en staging y producción. ¿Dónde ubicas nombre de cola y endpoint?', correctIndex:1, options:[
    {text:'En constantes compiladas dentro del código para evitar cambios.', explanation:'Compilar valores acopla el artefacto a un entorno y favorece despliegues equivocados.'},
    {text:'En configuración externa por ambiente, con secretos gestionados aparte.', explanation:'Correcta: la misma aplicación puede recibir valores distintos al ejecutarse; secretos no deben guardarse en configuración versionada.'},
    {text:'En el texto del mensaje SQS que el consumidor adivina al iniciar.', explanation:'El nombre de cola decide dónde se conecta el listener; no debe inferirse de payloads de negocio.'},
    {text:'Solo en un archivo local ignorado por Git que no exista en el runtime.', explanation:'La configuración local sirve para desarrollo, pero producción también necesita una fuente definida de configuración.'}]},
  { id:'aws-quiz-u34-01', unitId:34, lessonId:'aws-u34-l1', prompt:'Lambda invoca una función Java con un evento JSON de pedido. ¿Qué representa el handler?', correctIndex:0, options:[
    {text:'El punto de entrada que recibe evento/contexto y devuelve o procesa el resultado esperado.', explanation:'Correcta: el runtime llama al handler con el evento y contexto según el contrato de invocación configurado.'},
    {text:'El contenedor ECR que almacena la imagen de la función.', explanation:'ECR puede guardar imágenes, pero no define el método Java invocado.'},
    {text:'Una política IAM que decide cuánto dura el evento.', explanation:'IAM autoriza acciones; el handler implementa el procesamiento del evento.'},
    {text:'El archivo de logs que Lambda produce al final.', explanation:'Los logs muestran ejecución; no son el punto de entrada del código.'}]},
  { id:'aws-quiz-u34-02', unitId:34, lessonId:'aws-u34-l1', prompt:'La primera invocación luego de varias horas tarda más que las siguientes; el equipo sospecha creación de runtime y carga de clases. ¿Qué fenómeno mide?', correctIndex:1, options:[
    {text:'La latencia de un consumer SQS pausado.', explanation:'El caso habla de inicialización del entorno Lambda antes del handler, no de espera de una cola.'},
    {text:'Cold start de Lambda.', explanation:'Correcta: una invocación puede necesitar preparar un entorno nuevo, lo que añade inicialización antes del trabajo normal.'},
    {text:'La duración de retención de CloudWatch Logs.', explanation:'La retención determina cuánto duran los registros, no el tiempo de arranque.'},
    {text:'Un despliegue Multi-AZ de la función.', explanation:'Lambda administra disponibilidad, pero Multi-AZ no explica el costo de inicializar runtime y clases.'}]},
  { id:'aws-quiz-u34-03', unitId:34, lessonId:'aws-u34-l1', prompt:'Para ahorrar inicialización, un handler conserva un cliente SDK estático entre invocaciones. ¿Qué límite debe considerar?', correctIndex:2, options:[
    {text:'El runtime destruye el cliente luego de cada línea del handler.', explanation:'La instancia de ejecución puede reutilizarse; no es correcto asumir destrucción tras cada línea.'},
    {text:'Los campos estáticos se comparten entre todas las cuentas AWS.', explanation:'Los entornos de ejecución no comparten memoria entre cuentas; la preocupación es el estado dentro del entorno reutilizado.'},
    {text:'Puede reutilizarse el cliente, pero no debe guardarse estado mutable de una solicitud en campos compartidos.', explanation:'Correcta: inicialización reutilizable ahorra trabajo, mientras estado por invocación puede filtrarse a una solicitud posterior.'},
    {text:'La única forma segura es crear nuevos clientes en cada llamada.', explanation:'Eso puede aumentar latencia y conexiones; los clientes suelen reutilizarse si son seguros entre invocaciones.'}]},
  { id:'aws-quiz-u34-04', unitId:34, lessonId:'aws-u34-l1', prompt:'El equipo quiere usar una versión LTS moderna de Java soportada por Lambda y compila el handler en ese target. ¿Qué runtime corresponde al laboratorio de esta ruta?', correctIndex:3, options:[
    {text:'Java 8 porque todos los handlers Java usan esa versión.', explanation:'La versión del runtime debe elegirse entre las que Lambda soporte; Java 8 no cumple la decisión indicada.'},
    {text:'Node.js 22 aunque el handler esté escrito en Java.', explanation:'El runtime debe coincidir con el lenguaje/artefacto desplegado.'},
    {text:'Cualquier versión local sin declarar runtime en el despliegue.', explanation:'La JVM local no determina el runtime configurado por Lambda.'},
    {text:'Java 21, con runtime y compilación del artefacto alineados.', explanation:'Correcta: el runtime Java 21 coincide con el entorno de aprendizaje y debe corresponder a bytecode y paquete desplegados.'}]},
  { id:'aws-quiz-u34-05', unitId:34, lessonId:'aws-u34-l2', prompt:'Un artefacto Lambda Java funciona en el IDE, pero falla en AWS con ClassNotFoundException de una biblioteca. ¿Qué revisarías primero?', correctIndex:0, options:[
    {text:'Que el JAR de despliegue incluya el handler y sus dependencias necesarias.', explanation:'Correcta: el entorno remoto solo puede cargar clases empaquetadas en el artefacto o provistas por una layer/runtime compatible.'},
    {text:'Que el método de negocio use una variable local en vez de un campo.', explanation:'El estado del handler no explica una clase ausente en el paquete.'},
    {text:'Que CloudWatch tenga más retención.', explanation:'La retención ayuda después a conservar logs; no agrega dependencias al artefacto.'},
    {text:'Que el event source mapping use más concurrencia.', explanation:'Concurrencia no resuelve errores de carga de clases.'}]},
  { id:'aws-quiz-u34-06', unitId:34, lessonId:'aws-u34-l2', prompt:'La lógica de cálculo de impuestos cambia con frecuencia y el handler solo adapta el evento. ¿Qué prueba da feedback más rápido para reglas de negocio?', correctIndex:1, options:[
    {text:'Desplegar a producción y enviar pedidos reales después de cada cambio.', explanation:'Es arriesgado y lento para validar reglas aisladas.'},
    {text:'Unit tests de la lógica de dominio con eventos/datos representativos.', explanation:'Correcta: separada del runtime, la lógica puede probarse rápido con casos de éxito, límites y errores.'},
    {text:'Revisar únicamente tamaño comprimido del JAR.', explanation:'El tamaño puede importar para cold start, pero no comprueba resultados de cálculo.'},
    {text:'Contar invocaciones del handler en una métrica.', explanation:'El volumen de invocación no determina si el impuesto se calculó correctamente.'}]},
  { id:'aws-quiz-u34-07', unitId:34, lessonId:'aws-u34-l2', prompt:'Una función Java excede el límite de memoria durante una importación y su latencia también aumenta. ¿Qué prueba ayuda a elegir configuración?', correctIndex:2, options:[
    {text:'Bajar memoria a cero para obligar al runtime a fallar rápido.', explanation:'No produce una comparación válida ni permite ejecutar la función.'},
    {text:'Aumentar simultáneamente memoria, timeout y reintentos sin medir.', explanation:'Cambiar varios factores a la vez impide saber qué mejora y puede aumentar costo o trabajo duplicado.'},
    {text:'Probar tamaños de memoria con carga representativa y comparar duración, fallos y costo.', explanation:'Correcta: memoria afecta CPU disponible y costo; medir casos representativos permite equilibrar rendimiento y gasto.'},
    {text:'Cambiar el nombre del handler para reducir el consumo.', explanation:'El nombre no cambia la memoria disponible ni el perfil de ejecución.'}]},
  { id:'aws-quiz-u34-08', unitId:34, lessonId:'aws-u34-l3', prompt:'Un navegador necesita enviar una solicitud HTTP síncrona y recibir estado 201 o 400 de una Lambda. ¿Qué servicio puede exponer ese contrato?', correctIndex:3, options:[
    {text:'SQS, que devuelve al navegador el resultado final del consumidor.', explanation:'SQS desacopla trabajo asíncrono y no devuelve la respuesta de negocio del consumidor al navegador.'},
    {text:'CloudTrail, que transforma eventos API en respuestas HTTP.', explanation:'CloudTrail audita llamadas y no es una puerta de API de aplicación.'},
    {text:'ECR, que publica una ruta HTTPS hacia el contenedor.', explanation:'ECR almacena artefactos de contenedor; no expone endpoints de aplicación.'},
    {text:'API Gateway integrado con Lambda de forma síncrona.', explanation:'Correcta: API Gateway ofrece una interfaz HTTP y puede devolver la respuesta producida por la invocación.'}]},
  { id:'aws-quiz-u34-09', unitId:34, lessonId:'aws-u34-l3', prompt:'Una Lambda lee lotes de SQS; un solo mensaje inválido hace fallar y repetir todo el lote. ¿Qué mecanismo reduce reprocesamiento?', correctIndex:0, options:[
    {text:'Habilitar respuestas parciales del lote y devolver los messageId fallidos.', explanation:'Correcta: el event source mapping puede reintentar solo los mensajes indicados como fallidos, según su configuración.'},
    {text:'Capturar la excepción y reportar todo el lote como exitoso.', explanation:'Eso elimina mensajes que no se procesaron correctamente.'},
    {text:'Poner visibility timeout en cero.', explanation:'El mensaje reaparecería inmediatamente y podría formar un ciclo de duplicados.'},
    {text:'Aumentar el tamaño de lote para que falle menos veces.', explanation:'Un lote mayor puede ampliar la cantidad de mensajes reprocesados cuando uno falla.'}]},
  { id:'aws-quiz-u34-10', unitId:34, lessonId:'aws-u34-l3', prompt:'Un proveedor limita a 20 solicitudes concurrentes. Las invocaciones Lambda llegan en ráfaga y saturan ese límite. ¿Qué control aplicar?', correctIndex:1, options:[
    {text:'Subir memoria para permitir más invocaciones simultáneas.', explanation:'Más memoria puede acelerar cada invocación, pero no impone el máximo de llamadas al proveedor.'},
    {text:'Reservar o limitar concurrencia y dimensionar la cola/consumidor según la cuota externa.', explanation:'Correcta: controlar concurrencia limita llamadas en vuelo; una cola puede amortiguar picos mientras el downstream procesa a su ritmo.'},
    {text:'Reintentar inmediatamente cada 429 sin límite.', explanation:'El reintento sincronizado agrava la saturación y puede crear más carga.'},
    {text:'Aumentar timeout de API Gateway.', explanation:'Un timeout mayor no limita la concurrencia ni protege la cuota del proveedor.'}]},
  { id:'aws-quiz-u35-01', unitId:35, lessonId:'aws-u35-l1', prompt:'Una imagen de API debe llevar el runtime, dependencias y configuración base de forma reproducible entre equipos. ¿Qué describe una imagen de contenedor?', correctIndex:0, options:[
    {text:'Un artefacto inmutable que empaqueta capas y metadatos para crear contenedores.', explanation:'Correcta: la imagen registra sistema base y aplicación; ejecutar esa imagen crea el contenedor.'},
    {text:'Una instancia EC2 encendida que ya atiende tráfico.', explanation:'Una instancia es cómputo en ejecución; no es el artefacto portable que se construye.'},
    {text:'Un security group que define puertos del proceso.', explanation:'El security group controla tráfico de red; no contiene la aplicación ni sus dependencias.'},
    {text:'Una tarea ECS que mantiene réplicas saludables.', explanation:'La task definition describe cómo ejecutar contenedores; la imagen es uno de sus insumos.'}]},
  { id:'aws-quiz-u35-02', unitId:35, lessonId:'aws-u35-l1', prompt:'El pipeline construye una imagen Java y el clúster debe descargarla con autenticación antes de ejecutar la API. ¿Qué servicio de AWS almacena ese artefacto?', correctIndex:1, options:[
    {text:'Secrets Manager, porque guarda archivos grandes y sus capas.', explanation:'Secrets Manager almacena secretos, no imágenes de contenedor.'},
    {text:'Amazon ECR, como registro privado de imágenes.', explanation:'Correcta: ECR almacena versiones de imágenes que ECS, EKS u otros clientes autorizados pueden descargar.'},
    {text:'CloudWatch Logs, con una entrada por capa Docker.', explanation:'CloudWatch guarda telemetría, no sirve como registry para pull de imágenes.'},
    {text:'Route 53, que resuelve el tag de la imagen.', explanation:'Route 53 resuelve nombres DNS y no almacena artefactos.'}]},
  { id:'aws-quiz-u35-03', unitId:35, lessonId:'aws-u35-l1', prompt:'Un Dockerfile usa ARG para copiar una contraseña de base a una capa y luego borra el archivo en otro paso. ¿Qué riesgo permanece?', correctIndex:2, options:[
    {text:'Ninguno: al borrar el archivo se elimina de todas las capas anteriores.', explanation:'Las capas previas siguen formando parte de la imagen y pueden revelar el valor.'},
    {text:'La contraseña pasa a ser una etiqueta de ECR automáticamente.', explanation:'ECR no convierte variables de build en etiquetas; el riesgo está en el contenido de capas/metadatos.'},
    {text:'El secreto puede recuperarse de la capa construida; inyéctalo al ejecutar desde un gestor seguro.', explanation:'Correcta: borrar en una capa posterior no elimina bytes de capas anteriores; el secreto no debe incluirse en la imagen.'},
    {text:'Solo el runtime Java puede leer un secreto incluido en el Dockerfile.', explanation:'Quien pueda descargar o inspeccionar la imagen podría acceder al secreto; no queda limitado al runtime.'}]},
  { id:'aws-quiz-u35-04', unitId:35, lessonId:'aws-u35-l1', prompt:'El equipo quiere volver exactamente a la versión desplegada tras descubrir un bug. ¿Qué práctica de identificación de imagen facilita el rollback?', correctIndex:3, options:[
    {text:'Publicar siempre con el tag mutable latest y sobrescribirlo.', explanation:'El tag puede apuntar a contenido diferente más tarde y no identifica de manera estable el release.'},
    {text:'Etiquetar imágenes con el nombre del desarrollador únicamente.', explanation:'El autor no determina qué commit o build produjo el artefacto.'},
    {text:'Recompilar desde la rama actual durante el rollback.', explanation:'La rama puede haber cambiado y no garantiza reproducir los bytes que se probaron.'},
    {text:'Usar tag inmutable ligado a commit/build y conservar el digest desplegado.', explanation:'Correcta: el digest identifica el contenido exacto; el tag trazable ayuda a encontrar el build.'}]},
  { id:'aws-quiz-u35-05', unitId:35, lessonId:'aws-u35-l2', prompt:'Una task ECS debe usar 1 vCPU, 2 GB de memoria, puerto 8080 e imagen concreta. ¿Dónde declaras esa configuración?', correctIndex:0, options:[
    {text:'En una task definition; el servicio decide cuántas copias mantener.', explanation:'Correcta: la definición declara imagen y recursos por task; el servicio mantiene la cantidad deseada.'},
    {text:'En una regla de Route 53, que inicia procesos Java.', explanation:'DNS dirige nombres; no configura runtime ni recursos de una task.'},
    {text:'En una política IAM, usando Resource para fijar CPU.', explanation:'IAM autoriza acciones; CPU/memoria se declaran en la configuración ECS.'},
    {text:'En una alarma CloudWatch que empaqueta la imagen.', explanation:'La alarma observa métricas; no define el contenedor ejecutado.'}]},
  { id:'aws-quiz-u35-06', unitId:35, lessonId:'aws-u35-l2', prompt:'El equipo desea que ECS reemplace tasks caídas y conserve tres copias de la API detrás del balanceador. ¿Qué recurso describe ese comportamiento?', correctIndex:1, options:[
    {text:'Una task definition, que por sí sola mantiene tres procesos corriendo.', explanation:'La task definition es una plantilla de ejecución; no mantiene una cantidad deseada.'},
    {text:'Un ECS service con desired count tres y asociación al target group.', explanation:'Correcta: el servicio intenta conservar la cantidad deseada y puede integrar las tasks con el balanceador.'},
    {text:'Un repositorio ECR con tres tags idénticos.', explanation:'Tags no representan réplicas en ejecución ni reemplazan tasks fallidas.'},
    {text:'Un cluster vacío, que por definición balancea tráfico.', explanation:'El cluster agrupa capacidad lógica; servicio y balanceador implementan el mantenimiento y enrutamiento.'}]},
  { id:'aws-quiz-u35-07', unitId:35, lessonId:'aws-u35-l2', prompt:'La API corre en Fargate y el equipo quiere dejar de administrar instancias EC2 del cluster. ¿Qué trabajo delega Fargate y qué debe seguir configurando el equipo?', correctIndex:2, options:[
    {text:'Fargate configura automáticamente políticas IAM, reglas de red y escalado.', explanation:'Esos controles siguen requiriendo configuración y revisión por el equipo.'},
    {text:'Fargate convierte cualquier imagen en una función Lambda sin límites.', explanation:'Fargate ejecuta contenedores; no los convierte en Lambda ni elimina cuotas.'},
    {text:'AWS administra la capacidad de cómputo subyacente; el equipo define tasks, red, roles, límites y observabilidad.', explanation:'Correcta: se delega la gestión de servidores, no la configuración operativa y de seguridad del workload.'},
    {text:'Fargate elimina la necesidad de health checks porque nunca fallan las tasks.', explanation:'Las aplicaciones y contenedores todavía fallan; salud y recuperación deben diseñarse.'}]},
  { id:'aws-quiz-u35-08', unitId:35, lessonId:'aws-u35-l3', prompt:'Una aplicación heredada necesita módulos de kernel y acceso privilegiado al sistema operativo; no puede migrar aún a contenedores. ¿Qué opción conserva más control?', correctIndex:3, options:[
    {text:'Lambda, que permite controlar el kernel del host por función.', explanation:'Lambda abstrae el sistema operativo y no ofrece acceso al kernel del host.'},
    {text:'Fargate, que entrega una máquina EC2 dedicada al usuario.', explanation:'Fargate oculta la administración de instancias y no entrega control de host.'},
    {text:'EKS, que permite cambiar el kernel de los nodos administrados sin límites.', explanation:'EKS administra Kubernetes; el control de nodos depende de la capacidad elegida y no garantiza soporte a requisitos arbitrarios.'},
    {text:'EC2, donde el equipo puede seleccionar y administrar el sistema operativo.', explanation:'Correcta: EC2 permite configurar el host con mayor libertad, a costa de parches y operación.'}]},
  { id:'aws-quiz-u35-09', unitId:35, lessonId:'aws-u35-l3', prompt:'La plataforma ya usa Kubernetes, operadores y políticas existentes; mantenerlas en AWS es un requisito. ¿Qué control debe formar parte de la decisión sobre EKS?', correctIndex:0, options:[
    {text:'Contabilizar operación de Kubernetes y decidir quién administra control plane y nodos.', explanation:'Correcta: EKS administra el control plane, pero el modelo de nodos y la operación del clúster siguen teniendo responsabilidades y costo.'},
    {text:'Suponer que EKS hace que Kubernetes no requiera actualizaciones ni permisos.', explanation:'El servicio reduce trabajo, pero no elimina ciclo de vida, configuración ni seguridad de workloads/nodos.'},
    {text:'Elegirlo solo porque Kubernetes es común en ofertas laborales.', explanation:'Popularidad no demuestra que la complejidad adicional satisfaga un requisito concreto.'},
    {text:'Ignorar costos de nodos porque el control plane es administrado.', explanation:'Los nodos, almacenamiento, transferencia y operación generan costos aunque el control plane sea administrado.'}]},
  { id:'aws-quiz-u35-10', unitId:35, lessonId:'aws-u35-l3', prompt:'Un equipo evalúa EC2, Fargate y Lambda para una API estable y un proceso batch irregular. ¿Qué criterio evita elegir por moda?', correctIndex:1, options:[
    {text:'Usar Lambda para todo porque cualquier carga paga solo por milisegundo.', explanation:'La duración, límites, tráfico y configuración pueden hacer que Lambda no sea adecuada o económica para toda carga.'},
    {text:'Comparar patrón/duración de carga, control necesario, operación disponible y costo total.', explanation:'Correcta: el workload y las capacidades del equipo determinan trade-offs entre VM, contenedores administrados y funciones.'},
    {text:'Elegir EC2 siempre porque el control máximo tiene costo cero.', explanation:'EC2 da control, pero requiere operación y capacidad planificada; no tiene costo operativo nulo.'},
    {text:'Elegir EKS porque es la alternativa con más componentes.', explanation:'Más componentes aumentan complejidad; Kubernetes conviene cuando sus capacidades responden a una necesidad real.'}]},
  { id:'aws-quiz-u36-01', unitId:36, lessonId:'aws-u36-l1', prompt:'Una integración de facturación guarda usuario y contraseña que rotan cada 60 días. La aplicación debe leerlos solo en runtime. ¿Qué servicio encaja?', correctIndex:0, options:[
    {text:'Secrets Manager, con política de lectura al rol y rotación compatible con el sistema externo.', explanation:'Correcta: almacena secretos y puede coordinar rotación; la aplicación obtiene el valor mediante identidad autorizada.'},
    {text:'CloudWatch Metrics, porque oculta valores sensibles en una serie.', explanation:'Las métricas no almacenan ni entregan credenciales de aplicación.'},
    {text:'Route 53, porque DNS cifra el nombre de usuario.', explanation:'DNS resuelve nombres; no es un almacén de secretos.'},
    {text:'ECR, porque cada imagen mantiene una copia protegida de la contraseña.', explanation:'Guardar el secreto en la imagen lo expone a quien pueda descargarla y dificulta la rotación.'}]},
  { id:'aws-quiz-u36-02', unitId:36, lessonId:'aws-u36-l1', prompt:'Un bucket cifra objetos con una clave administrada por el cliente y el equipo necesita controlar quién puede usarla. ¿Qué aporta KMS?', correctIndex:1, options:[
    {text:'Guarda la contraseña de la aplicación en texto claro para cada usuario.', explanation:'KMS administra claves y operaciones criptográficas; los secretos de aplicación pertenecen a un gestor de secretos.'},
    {text:'Administra claves y permisos de uso de cifrado, con eventos auditables.', explanation:'Correcta: KMS controla claves y operaciones criptográficas; políticas/grants determinan quién puede usarlas.'},
    {text:'Decide qué usuario está autorizado a descargar cada objeto según sus atributos de negocio.', explanation:'La autorización del objeto se configura con IAM/políticas; KMS controla uso de clave además del acceso al recurso.'},
    {text:'Termina TLS entre navegador y balanceador automáticamente en cualquier dominio.', explanation:'TLS y certificados en el endpoint son otra capa; KMS no configura el canal de red.'}]},
  { id:'aws-quiz-u36-03', unitId:36, lessonId:'aws-u36-l1', prompt:'Un cliente se conecta por HTTPS, pero un atacante con credenciales válidas puede leer los datos de S3. ¿Qué límite de TLS explica el caso?', correctIndex:2, options:[
    {text:'TLS solo protege datos guardados en disco y no los que viajan.', explanation:'TLS protege datos en tránsito; el cifrado en reposo es otra configuración.'},
    {text:'TLS elimina la necesidad de verificar permisos IAM.', explanation:'Cifrar el canal no decide quién puede llamar a S3 ni leer objetos.'},
    {text:'TLS protege el canal en tránsito, pero no impide que una identidad autorizada lea el objeto.', explanation:'Correcta: transporte seguro y autorización son controles diferentes; se debe limitar IAM/bucket policy.'},
    {text:'TLS rota automáticamente la clave de acceso del usuario.', explanation:'TLS no rota credenciales ni administra secretos.'}]},
  { id:'aws-quiz-u36-04', unitId:36, lessonId:'aws-u36-l1', prompt:'La función requiere leer un secreto y descifrar datos con una KMS key concreta. ¿Qué permiso es el más apropiado?', correctIndex:3, options:[
    {text:'AdministratorAccess para evitar futuras denegaciones.', explanation:'Un permiso total oculta el alcance requerido y expone todos los recursos de la cuenta.'},
    {text:'s3:* sobre todos los buckets.', explanation:'No responde al acceso a Secrets Manager/KMS y concede permisos ajenos al caso.'},
    {text:'kms:* y secretsmanager:* con Resource * en todas las cuentas.', explanation:'Ese alcance permite administrar claves y secretos irrelevantes, no solo leer el secreto necesario.'},
    {text:'GetSecretValue sobre el secreto esperado y Decrypt/uso limitado a la clave necesaria.', explanation:'Correcta: el rol obtiene solo el secreto previsto y usa la clave requerida, sujeto a sus políticas y contexto.'}]},
  { id:'aws-quiz-u36-05', unitId:36, lessonId:'aws-u36-l2', prompt:'La app debe seguir respondiendo si una AZ deja de operar, y los datos de pedidos tienen backup diario. ¿Qué afirmación separa correctamente ambos controles?', correctIndex:0, options:[
    {text:'Multi-AZ aborda continuidad ante fallos de zona; el backup ayuda a restaurar datos tras pérdida/corrupción.', explanation:'Correcta: disponibilidad y recuperación cubren riesgos diferentes, por eso puede hacer falta ambos.'},
    {text:'El backup diario garantiza que la app seguirá atendiendo durante la caída de AZ.', explanation:'Un backup no conmuta automáticamente la aplicación ni elimina el tiempo de restauración.'},
    {text:'Multi-AZ impide que un usuario autorizado borre pedidos.', explanation:'La replicación/alta disponibilidad no evita propagar errores lógicos o borrados autorizados.'},
    {text:'Una AZ y dos subredes en ella equivalen a Multi-AZ.', explanation:'Dos subredes de la misma zona comparten el dominio de falla y no satisfacen el requisito.'}]},
  { id:'aws-quiz-u36-06', unitId:36, lessonId:'aws-u36-l2', prompt:'Un error lógico borra pedidos en producción y la replicación rápida copia el borrado. ¿Qué estrategia trata ese escenario?', correctIndex:1, options:[
    {text:'Agregar otro servidor web en la misma AZ.', explanation:'Más capacidad de aplicación no recupera los registros borrados.'},
    {text:'Diseñar recuperación desde backup/PITR y ensayarla con RPO/RTO definidos.', explanation:'Correcta: una copia recuperable a un punto previo puede restaurar datos; el ensayo valida tiempo y consistencia.'},
    {text:'Aumentar health check interval del balanceador.', explanation:'Health checks detectan destinos no saludables, no corrupción de datos replicada.'},
    {text:'Duplicar la misma réplica en otra subnet.', explanation:'La réplica puede reproducir el borrado; se requiere un punto restaurable independiente.'}]},
  { id:'aws-quiz-u36-07', unitId:36, lessonId:'aws-u36-l2', prompt:'El plan de DR promete RTO de dos horas, pero nunca se ejecutó. ¿Qué evidencia debería producir el ejercicio?', correctIndex:2, options:[
    {text:'Solo una lista de nombres de responsables.', explanation:'Los responsables son necesarios, pero no demuestran restauración ni tiempo alcanzado.'},
    {text:'Una captura del último backup exitoso.', explanation:'La copia creada puede fallar al restaurarse y no comprueba el objetivo horario.'},
    {text:'Restauración aislada medida, validación de datos y comparación con objetivos.', explanation:'Correcta: el ensayo prueba pasos, integridad y duración frente al RTO/RPO comprometido.'},
    {text:'Desactivar los backups para comprobar si la app tolera pérdida.', explanation:'Eso crea riesgo innecesario y no ensaya el procedimiento de recuperación.'}]},
  { id:'aws-quiz-u36-08', unitId:36, lessonId:'aws-u36-l3', prompt:'Una llamada SDK a DynamoDB queda pendiente y ocupa un thread web indefinidamente. ¿Qué control corta la espera por intento?', correctIndex:3, options:[
    {text:'Un límite de retención de CloudTrail.', explanation:'La retención guarda auditoría y no limita la duración de una solicitud SDK.'},
    {text:'Un backoff que sigue esperando sin máximo.', explanation:'Backoff regula el intervalo entre reintentos; sin deadline, la operación puede seguir esperando.'},
    {text:'Una política de lifecycle de S3.', explanation:'Lifecycle administra objetos y no controla llamadas DynamoDB.'},
    {text:'Timeout de API/call del cliente, además de un deadline total.', explanation:'Correcta: el timeout acota cada intento y el deadline limita el tiempo total consumido por reintentos.'}]},
  { id:'aws-quiz-u36-09', unitId:36, lessonId:'aws-u36-l3', prompt:'Tras una caída regional, miles de clientes reintentan a la vez y vuelven a saturar el servicio. ¿Qué política suaviza la recuperación?', correctIndex:0, options:[
    {text:'Backoff exponencial con jitter y máximo de intentos/tiempo.', explanation:'Correcta: los intervalos crecientes y aleatorios distribuyen reintentos y evitan sincronizar la carga.'},
    {text:'Reintentar inmediatamente en un bucle hasta tener HTTP 200.', explanation:'Los intentos inmediatos amplifican la saturación y pueden mantener la caída.'},
    {text:'Repetir errores permanentes como validación o acceso denegado.', explanation:'Esos errores no suelen corregirse esperando y generan tráfico inútil.'},
    {text:'Reintentar cualquier POST sin clave idempotente.', explanation:'Si la primera operación se completó pero se perdió su respuesta, el POST puede duplicar el efecto.'}]},
  { id:'aws-quiz-u36-10', unitId:36, lessonId:'aws-u36-l3', prompt:'Un servicio procesa 100 solicitudes por segundo. La nueva configuración reduce instancias, pero duplica p95 y genera timeouts que disparan reintentos. ¿Cómo evaluar optimización de costo?', correctIndex:1, options:[
    {text:'Elegir siempre la menor factura mensual, aunque viole SLO y aumente retries.', explanation:'El costo menor aparente puede elevar fallos, reintentos y daño al negocio; deben respetarse requisitos críticos.'},
    {text:'Comparar costo total con latencia, errores y costo adicional de reintentos bajo carga real.', explanation:'Correcta: se ajusta capacidad con evidencia sin sacrificar rendimiento/fiabilidad exigidos.'},
    {text:'Desactivar timeouts para que las solicitudes no cuenten como fallidas.', explanation:'Ocultar fallos puede retener recursos y aumentar la degradación sin reducir el trabajo real.'},
    {text:'Aumentar a infinito la concurrencia para recuperar p95.', explanation:'Concurrencia ilimitada puede saturar dependencias y elevar gasto; requiere límites y medición.'}]},
  { id:'aws-quiz-u37-01', unitId:37, lessonId:'aws-u37-l1', prompt:'El endpoint confirma un pedido en HTTP, pero la reserva se hace después mediante SQS. ¿Qué debe dejar claro el diseño del flujo?', correctIndex:0, options:[
    {text:'Qué significa la respuesta HTTP, el contrato del mensaje, quién consume y dónde persiste cada efecto.', explanation:'Correcta: separar aceptación del pedido de su procesamiento asíncrono evita prometer que todo terminó al encolar.'},
    {text:'Que publicar en SQS vuelve atómica la escritura de base y el envío del mensaje.', explanation:'No hay transacción automática entre API, SQS y base; pueden ocurrir fallos parciales.'},
    {text:'Que la misma Lambda debe modificar todas las bases y enviar todos los correos.', explanation:'Un único componente puede acoplar pasos y no define contratos ni recuperación entre efectos.'},
    {text:'Que una respuesta 200 demuestra que el consumidor ya terminó.', explanation:'HTTP síncrono puede confirmar aceptación/enqueue sin que el consumidor haya procesado el pedido.'}]},
  { id:'aws-quiz-u37-02', unitId:37, lessonId:'aws-u37-l1', prompt:'El productor reintenta el mismo evento evt-842 porque perdió la respuesta de envío. ¿Qué protege la persistencia del consumidor?', correctIndex:1, options:[
    {text:'Un requestId nuevo por cada intento para que ambos pedidos se registren.', explanation:'IDs distintos ocultan que ambos mensajes representan la misma intención y pueden duplicar el efecto.'},
    {text:'Una clave idempotente basada en evt-842 con registro atómico del efecto aplicado.', explanation:'Correcta: el consumidor reconoce la repetición y evita crear una segunda reserva/pedido.'},
    {text:'Aumentar visibility timeout para garantizar una sola entrega.', explanation:'El timeout reduce ciertas redeliveries concurrentes, pero no ofrece exactly-once para efectos de negocio.'},
    {text:'Eliminar los logs de envío para ocultar el reintento.', explanation:'Ocultar evidencia no evita la duplicación ni mejora la semántica de entrega.'}]},
  { id:'aws-quiz-u37-03', unitId:37, lessonId:'aws-u37-l1', prompt:'Soporte recibe orderId pero no puede relacionar el request HTTP con el mensaje procesado y la fila insertada. ¿Qué cambio ayuda a seguir el recorrido?', correctIndex:2, options:[
    {text:'Usar el nombre del host como identificador global de cada evento.', explanation:'Un host puede procesar muchos eventos y cambiar; no ofrece correlación única del pedido.'},
    {text:'Poner el cuerpo completo y datos de tarjeta en todos los logs.', explanation:'Aumenta exposición de datos y no crea necesariamente un identificador consistente entre componentes.'},
    {text:'Propagar requestId/eventId en mensaje, logs y registro persistido.', explanation:'Correcta: un identificador común permite correlacionar etapas sin depender de texto libre ni exponer datos sensibles.'},
    {text:'Activar solo una alarma de CPU en la API.', explanation:'La alarma puede mostrar saturación, pero no traza un pedido específico por el sistema.'}]},
  { id:'aws-quiz-u37-04', unitId:37, lessonId:'aws-u37-l1', prompt:'La base confirma un pedido y el proceso cae antes de borrar el mensaje SQS. ¿Qué propiedad debe impedir que una redelivery duplique la reserva?', correctIndex:3, options:[
    {text:'Balanceo entre dos zonas, porque elimina redeliveries.', explanation:'La distribución mejora disponibilidad y no cambia la entrega al menos una vez de la cola.'},
    {text:'Que SQS marque el mensaje como exitoso al enviarlo.', explanation:'El éxito de SendMessage solo confirma recepción por cola, no el efecto del consumidor.'},
    {text:'Un log de error que registre la caída.', explanation:'El log facilita diagnóstico, pero no hace único el efecto persistido.'},
    {text:'Operación idempotente con eventId y registro del resultado antes de completar el mensaje.', explanation:'Correcta: al volver a ejecutarse, el consumidor consulta el marcador y reconoce que el efecto ya se aplicó.'}]},
  { id:'aws-quiz-u37-05', unitId:37, lessonId:'aws-u37-l2', prompt:'La prueba local verifica PutObject y SendMessage usando un emulador compatible. ¿Qué afirmación puede sostener el equipo?', correctIndex:0, options:[
    {text:'El flujo de SDK y las operaciones emuladas funcionan en esa configuración local.', explanation:'Correcta: la prueba cubre el camino ejecutado contra los servicios compatibles que emula la herramienta.'},
    {text:'IAM y SCP de la cuenta de producción permitirán esas acciones.', explanation:'El emulador local no prueba las políticas efectivas de la cuenta AWS.'},
    {text:'Las cuotas reales y latencia de producción cumplen los SLO.', explanation:'Una ejecución local no reproduce límites ni condiciones de red del servicio real.'},
    {text:'La operación se comportará idénticamente para todos los servicios AWS.', explanation:'La compatibilidad es por operación/servicio; no prueba toda semántica de AWS.'}]},
  { id:'aws-quiz-u37-06', unitId:37, lessonId:'aws-u37-l2', prompt:'Un test Java necesita iniciar una dependencia aislada antes de cada suite y detenerla al finalizar. ¿Qué aporta Testcontainers?', correctIndex:1, options:[
    {text:'Un rol de producción y credenciales IAM temporales para la suite.', explanation:'Testcontainers gestiona contenedores de prueba; no emite identidades AWS.'},
    {text:'Levantar servicios/contenedores de prueba con ciclo de vida ligado al test.', explanation:'Correcta: permite declarar dependencias reproducibles y administrar su arranque/parada durante integración.'},
    {text:'Una garantía de que el contenedor aplica todas las cuotas regionales AWS.', explanation:'Un contenedor local no somete la prueba a las cuotas de la cuenta/región real.'},
    {text:'Un sustituto de unit tests para cada regla de dominio.', explanation:'La integración complementa; lógica de negocio pura suele probarse con unit tests más rápidos.'}]},
  { id:'aws-quiz-u37-07', unitId:37, lessonId:'aws-u37-l2', prompt:'El emulador devuelve un objeto S3, pero un proveedor administrado ofrece semántica de cifrado y consistencia que no se ejercitaron localmente. ¿Qué falta antes de afirmar compatibilidad de producción?', correctIndex:2, options:[
    {text:'Solo cambiar el endpoint a localhost y repetir el mismo test.', explanation:'Repetir en local no añade las garantías del servicio remoto.'},
    {text:'Concluir que cualquier API compatible cubre todas las diferencias.', explanation:'Compatibilidad de protocolo no prueba comportamientos específicos del servicio real.'},
    {text:'Una validación dirigida en AWS para permisos, configuración y comportamiento que el emulador no cubre.', explanation:'Correcta: las pruebas reales comprueban las garantías y límites del servicio que son relevantes para producción.'},
    {text:'Desactivar cifrado en producción para igualar el emulador.', explanation:'Reducir controles de producción para coincidir con una prueba local introduce riesgo y no valida el requisito.'}]},
  { id:'aws-quiz-u37-08', unitId:37, lessonId:'aws-u37-l3', prompt:'El equipo declara una Lambda y sus recursos en una plantilla SAM y quiere crear un stack real revisando antes los cambios. ¿Qué papel cumple SAM?', correctIndex:3, options:[
    {text:'Es un simulador local que impide crear recursos remotos.', explanation:'SAM tiene comandos locales, pero también facilita empaquetar y desplegar recursos en AWS.'},
    {text:'Es el motor de base de datos que almacena mensajes de la función.', explanation:'SAM es un framework de infraestructura serverless, no un motor de datos.'},
    {text:'Es una política IAM que otorga acceso total automáticamente.', explanation:'La plantilla puede declarar roles/permisos; SAM no justifica ni debe implicar acceso total.'},
    {text:'Es un framework para definir, empaquetar y desplegar aplicaciones serverless.', explanation:'Correcta: SAM transforma plantillas y trabaja con CloudFormation para desplegar el stack.'}]},
  { id:'aws-quiz-u37-09', unitId:37, lessonId:'aws-u37-l3', prompt:'Antes de desplegar una Lambda de laboratorio en una cuenta real, ¿qué decisión controla mejor riesgo de gasto y permisos?', correctIndex:0, options:[
    {text:'Stack aislado, cambios revisados, rol mínimo y presupuesto/alertas definidos.', explanation:'Correcta: el aislamiento y revisión muestran qué se creará; permisos y presupuesto acotan impacto y aviso.'},
    {text:'Usar cuenta raíz para no tener errores de despliegue.', explanation:'La cuenta raíz amplía el impacto de errores y contradice el acceso mínimo.'},
    {text:'Desplegar sin mirar cambioset porque SAM borra todo al cerrar terminal.', explanation:'Los recursos remotos persisten después de cerrar la terminal; hay que revisar y limpiar explícitamente.'},
    {text:'Aumentar cuota y desplegar todos los ejemplos juntos.', explanation:'Más cuota no limita costo y crea recursos fuera del alcance mínimo del laboratorio.'}]},
  { id:'aws-quiz-u37-10', unitId:37, lessonId:'aws-u37-l3', prompt:'CloudFormation elimina el stack de una práctica, pero un bucket con retención conserva datos. ¿Qué acción cierra correctamente el laboratorio?', correctIndex:1, options:[
    {text:'Cerrar la terminal y asumir que AWS cancela la factura.', explanation:'La terminal no controla la vida de recursos ya desplegados.'},
    {text:'Revisar recursos retenidos, vaciar/eliminar según corresponda y confirmar cargos restantes.', explanation:'Correcta: algunos recursos pueden retenerse por política o contener datos; se verifica el estado después del delete.'},
    {text:'Borrar el archivo SAM local y dar por eliminada la infraestructura.', explanation:'Eliminar la plantilla no elimina el stack ni recursos creados.'},
    {text:'Dejar el bucket para que CloudFormation lo elimine en el próximo despliegue.', explanation:'No hay garantía de que otro despliegue lo quite; el recurso retenido puede seguir facturando.'}]},
];
