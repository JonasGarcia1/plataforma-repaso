import type { QuizQuestion } from '../../types';

export const awsQuizzesU38: QuizQuestion[] = [
  {id:'aws-quiz-u38-01',unitId:38,lessonId:'aws-u38-l1',prompt:'Vas a iniciar Floci local, pero tu terminal también tiene variables de credenciales AWS reales. ¿Qué preparación es más segura?',correctIndex:0,options:[
    {text:'Usar el perfil dedicado floci con endpoint localhost y credenciales ficticias test/test.',explanation:'Correcta: el perfil local separa la configuración del laboratorio y dirige los clientes al emulador.'},
    {text:'Usar el perfil personal y cambiar solo la región.',explanation:'La región no redirige las solicitudes al emulador; podrían llegar a AWS real.'},
    {text:'Copiar las claves personales al archivo application.yml.',explanation:'Las claves reales no deben quedar en código ni configuración versionada.'},
    {text:'Quitar el endpoint local para que el SDK detecte Floci automáticamente.',explanation:'El SDK no descubre por sí mismo el endpoint local; debe configurarse explícitamente.'}]},
  {id:'aws-quiz-u38-02',unitId:38,lessonId:'aws-u38-l1',prompt:'El script de inicialización termina y muestra una URL para la cola. ¿Qué comprobación confirma que los recursos quedaron en el emulador?',correctIndex:1,options:[
    {text:'Consultar la consola de AWS en la cuenta personal.',explanation:'La práctica local no crea recursos en la cuenta real y esa consola no confirma el estado de Floci.'},
    {text:'Consultar las colas usando el perfil floci y el endpoint http://localhost:4566.',explanation:'Correcta: endpoint y perfil iguales verifican el recurso en el entorno local usado por el laboratorio.'},
    {text:'Buscar la cola en el repositorio Git.',explanation:'El repositorio contiene configuración, pero no el estado creado en ejecución.'},
    {text:'Asumir que la tabla se creó porque Docker inició sin errores.',explanation:'El contenedor saludable no confirma cada operación de inicialización; los recursos se comprueban con la CLI.'}]},
  {id:'aws-quiz-u38-03',unitId:38,lessonId:'aws-u38-l2',prompt:'El endpoint POST /orders responde 202 Accepted. ¿Qué indica esa respuesta en el flujo del laboratorio?',correctIndex:2,options:[
    {text:'Que Lambda ya procesó el evento y terminó la escritura en DynamoDB.',explanation:'El endpoint publica el pedido; el consumidor asíncrono puede procesarlo después.'},
    {text:'Que se completaron atómicamente todas las operaciones en S3, SQS y DynamoDB.',explanation:'Las escrituras cruzan servicios y no forman una transacción única.'},
    {text:'Que la API aceptó el pedido para su procesamiento posterior.',explanation:'Correcta: la respuesta confirma la aceptación/publicación según el contrato, no el resultado final del consumidor.'},
    {text:'Que la solicitud no validó el cuerpo recibido.',explanation:'Una respuesta 202 en este controlador se devuelve después de que el servicio procesa la publicación.'}]},
  {id:'aws-quiz-u38-04',unitId:38,lessonId:'aws-u38-l2',prompt:'S3 guarda el JSON del pedido, pero SendMessage falla. ¿Qué propiedad del flujo debes considerar?',correctIndex:3,options:[
    {text:'S3 revertirá automáticamente la escritura al fallar SQS.',explanation:'S3 no coordina una transacción con SQS ni revierte la escritura.'},
    {text:'SQS reconstruirá el mensaje consultando cualquier objeto reciente.',explanation:'La cola no busca objetos en S3 automáticamente.'},
    {text:'La API siempre devuelve éxito porque el objeto existe.',explanation:'El servicio propaga un error de publicación; la respuesta debe reflejar el fallo observado.'},
    {text:'Puede quedar un objeto sin mensaje; hacen falta una estrategia de reconciliación o un patrón transaccional apropiado.',explanation:'Correcta: existe una ventana de fallo entre las dos operaciones y el diseño debe hacerla observable y recuperable.'}]},
  {id:'aws-quiz-u38-05',unitId:38,lessonId:'aws-u38-l3',prompt:'Lambda escribe orderId en DynamoDB y falla antes de que SQS considere completo el mensaje. ¿Qué evita duplicar el pedido en la siguiente entrega?',correctIndex:0,options:[
    {text:'Una escritura condicional por orderId; el consumidor trata el duplicado ya persistido como completado.',explanation:'Correcta: la condición impide el segundo efecto y el handler reconoce que el pedido ya existe.'},
    {text:'Aumentar el tamaño del lote SQS.',explanation:'El tamaño de lote no aporta idempotencia y puede aumentar cuántos registros se repiten juntos.'},
    {text:'Crear un orderId nuevo durante cada invocación.',explanation:'Un ID nuevo convierte la repetición del mismo pedido en un registro distinto.'},
    {text:'Deshabilitar toda redelivery de SQS.',explanation:'La entrega y los reintentos son parte de la recuperación; no conviene sustituirlos por pérdida silenciosa.'}]},
  {id:'aws-quiz-u38-06',unitId:38,lessonId:'aws-u38-l3',prompt:'¿Qué habilita la integración entre una cola SQS y una función Lambda?',correctIndex:1,options:[
    {text:'Que la API llame al handler dentro de la misma transacción HTTP.',explanation:'El event source mapping consume eventos asincrónicamente; no es una llamada dentro de la transacción de API.'},
    {text:'Un event source mapping que lee la cola y entrega registros a la función.',explanation:'Correcta: el mapeo administra sondeo/lotes y entrega mensajes al handler según la configuración.'},
    {text:'Que S3 invoque directamente cualquier método Java.',explanation:'S3 no establece por sí solo el vínculo SQS–Lambda descrito en este proyecto.'},
    {text:'Que DynamoDB elimine el mensaje después de insertar una fila.',explanation:'La integración y el resultado del handler controlan el procesamiento; DynamoDB no administra la cola.'}]},
  {id:'aws-quiz-u38-07',unitId:38,lessonId:'aws-u38-l4',prompt:'En un lote de cinco mensajes fallan dos y tres se procesan correctamente. ¿Qué devuelve el handler si usa fallos parciales?',correctIndex:2,options:[
    {text:'Un error general que marca los cinco como fallidos siempre.',explanation:'Un error general puede provocar que vuelvan a procesarse también los registros que ya tuvieron éxito.'},
    {text:'Una respuesta vacía que confirma los cinco mensajes.',explanation:'Eso perdería la señal de los dos mensajes que necesitan reintento.'},
    {text:'Los identificadores de los dos registros fallidos en BatchItemFailures.',explanation:'Correcta: el origen puede volver a intentar los elementos señalados sin repetir innecesariamente el resto.'},
    {text:'Los identificadores de los tres registros exitosos.',explanation:'La respuesta debe identificar fallos, no pedir que se repitan los éxitos.'}]},
  {id:'aws-quiz-u38-08',unitId:38,lessonId:'aws-u38-l4',prompt:'Un mensaje falla en tres recepciones y la cola tiene una redrive policy con maxReceiveCount 3. ¿Qué esperas?',correctIndex:3,options:[
    {text:'SQS lo convierte en una fila DynamoDB.',explanation:'La redrive policy enruta mensajes entre colas y no escribe en tablas.'},
    {text:'Lambda lo marca exitoso aunque el handler reporte un fallo.',explanation:'El fallo informado permite al origen aplicar la política de reintentos configurada.'},
    {text:'El mensaje se elimina de inmediato sin registro.',explanation:'Una DLQ configurada conserva el mensaje para inspección después del umbral definido.'},
    {text:'El mensaje se mueve a la DLQ configurada tras exceder el umbral de recepción.',explanation:'Correcta: la redrive policy aparta mensajes que no pudieron procesarse dentro de los intentos permitidos.'}]},
  {id:'aws-quiz-u38-09',unitId:38,lessonId:'aws-u38-l5',prompt:'La API responde 202 y puedes leer el objeto S3, pero la tabla DynamoDB aún no contiene el pedido. ¿Cuál es la siguiente verificación útil?',correctIndex:0,options:[
    {text:'Revisar estado del mensaje, logs de Lambda y configuración del mapeo SQS antes de concluir que el flujo terminó.',explanation:'Correcta: la aceptación del productor y el objeto no prueban que el consumidor haya completado su trabajo.'},
    {text:'Cambiar el código HTTP a 200 para forzar la escritura.',explanation:'El código de respuesta no procesa el evento ni corrige la conexión del consumidor.'},
    {text:'Borrar y recrear la tabla sin revisar mensajes.',explanation:'Eso puede eliminar evidencia y datos sin resolver la causa del procesamiento pendiente.'},
    {text:'Asumir que DynamoDB tarda siempre varios minutos.',explanation:'Debe observarse el estado real de cola, función y logs; una demora indefinida puede ser un fallo.'}]},
  {id:'aws-quiz-u38-10',unitId:38,lessonId:'aws-u38-l5',prompt:'La prueba integral pasa en Floci. ¿Qué conclusión es válida?',correctIndex:1,options:[
    {text:'IAM, cuotas, disponibilidad y latencia de AWS real están comprobadas.',explanation:'El emulador local no ejercita las políticas efectivas ni condiciones operativas de AWS real.'},
    {text:'El recorrido probado funciona para las operaciones y versión de Floci usadas; otras garantías requieren validación apropiada.',explanation:'Correcta: se reporta exactamente qué integración fue ejercitada y se dejan explícitos los límites de emulación.'},
    {text:'Todas las operaciones de cada servicio AWS son compatibles.',explanation:'La cobertura varía por servicio, operación y versión; una prueba de flujo no cubre toda la API.'},
    {text:'Ya no hacen falta pruebas unitarias ni revisión de permisos.',explanation:'La integración local complementa pruebas de lógica y controles de acceso; no los sustituye.'}]},
];
