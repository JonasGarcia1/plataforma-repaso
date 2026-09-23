# Publicar pedidos desde Spring Boot

## Concepto

La API del proyecto recibe un pedido, lo valida, serializa el evento, guarda el JSON en S3 y envía el mismo cuerpo a SQS. El endpoint `POST /orders` responde `202 Accepted`: indica que el pedido fue aceptado para procesamiento asíncrono. No significa que Lambda ya lo haya procesado o que DynamoDB ya contenga el resultado. S3 conserva el documento y SQS desacopla al productor del consumidor.

## Ejemplo

Con Floci y los recursos preparados, iniciá la aplicación desde la raíz del laboratorio:

```powershell
$env:AWS_PROFILE = 'floci'
$env:AWS_ENDPOINT_URL = 'http://localhost:4566'
$env:ORDERS_QUEUE_URL = 'http://localhost:4566/000000000000/orders'
mvn spring-boot:run
```

En otra terminal enviá un pedido:

```powershell
$body = @{ orderId = 'pedido-001'; customerId = 'cliente-7'; total = 42.50 } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:8086/orders -ContentType 'application/json' -Body $body
aws --profile floci --endpoint-url http://localhost:4566 s3 cp s3://repaso-orders/pedido-001.json -
aws --profile floci --endpoint-url http://localhost:4566 sqs get-queue-attributes --queue-url http://localhost:4566/000000000000/orders --attribute-names ApproximateNumberOfMessages
```

El servicio guarda primero `pedido-001.json` en S3 y después publica el cuerpo en SQS. En el laboratorio, `OrderService.java` contiene esa secuencia y `OrdersController.java` expone el endpoint.

### Resultado esperado

La solicitud devuelve el pedido aceptado y la lista de objetos de S3 contiene `pedido-001.json`. El mismo pedido queda disponible en la cola para la etapa de consumo. La cola puede acumular mensajes si todavía no se configuró o inició el consumidor.

## En entrevista

**Breve:** ¿Qué comunica un `202` en este endpoint? **Ampliada:** explicá qué debe ver el cliente si se guarda el objeto, pero falla el envío a la cola.

## Error frecuente

Tratar una escritura en S3 seguida de un envío SQS como si fuera una transacción atómica. Si falla el segundo paso, puede quedar un objeto sin mensaje. En un sistema con ese riesgo de negocio, se diseña una estrategia de reconciliación o un patrón outbox apropiado y se hace visible el estado parcial.

## Práctica

Enviá dos pedidos con IDs diferentes. Comprobá que cada uno aparezca como objeto y que se publique en SQS. Después describí qué información ayudaría a reconciliar un objeto cuyo mensaje no llegó a la cola.

### Pista

Usá un `orderId` estable y correlacioná el registro de API, la clave S3 y el cuerpo del mensaje.

### Solución

La clave de objeto se forma con el ID del pedido y el mensaje conserva ese mismo identificador. Para detectar diferencias, el servicio debe registrar el resultado de cada operación con una correlación estable. Una cola de mensajes no crea una transacción distribuida entre sí misma y S3.

## Profundización

[Abrir el paso 2 del laboratorio en GitHub](https://github.com/JonasGarcia1/aws-java-floci-labs#paso-2-publicar-pedidos-desde-spring-boot)

El código del paso está en `OrdersController.java`, `OrderService.java` y `application.yml` del laboratorio. Revisá cómo el perfil de práctica establece endpoint, bucket y URL de cola.

[Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) · [Amazon SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
