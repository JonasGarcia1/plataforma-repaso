# Procesar pedidos con Lambda Java 21

## Concepto

El consumidor recibe registros SQS en un evento de Lambda y guarda cada pedido en DynamoDB. La integración es asíncrona: un mapeo de origen lee la cola y entrega mensajes por lotes a la función. Como los mensajes pueden volver a entregarse, el efecto de negocio debe ser idempotente. El handler del laboratorio usa `orderId` como clave y una condición `attribute_not_exists(orderId)` al guardar; un pedido ya presente se reconoce como duplicado completado.

## Ejemplo

El proyecto separa el handler en `OrderConsumerHandler.java` y los recursos/configuración de función en los archivos de infraestructura y scripts del laboratorio. La preparación local requiere que Floci pueda iniciar contenedores Lambda. En el laboratorio, Docker Compose monta el socket para esta función; ese permiso se limita al entorno de práctica.

```powershell
mvn package
.\scripts\deploy-floci-lambda.ps1
```

Antes, la primera lección inició Docker Compose con `compose.lambda.yaml` y preparó las colas y la tabla. El script crea la función `repaso-order-consumer` y su event source mapping para la cola `orders`, con lotes de hasta cinco y `ReportBatchItemFailures`. La función recibe `ORDERS_TABLE` y el endpoint local de DynamoDB. No mezcles este perfil con credenciales AWS reales. Para consultar el resultado de `pedido-001`:

```bash
aws --profile floci --endpoint-url http://localhost:4566 dynamodb get-item --table-name Orders --key '{"orderId":{"S":"pedido-001"}}'
```

### Resultado esperado

Una invocación correcta crea en DynamoDB una fila con `orderId`, `customerId`, `total` y estado `processed`. Si el mismo pedido se vuelve a entregar después de persistirse, la condición evita crear un segundo efecto y el consumidor lo considera ya completado.

## En entrevista

**Pregunta:** ¿Cómo conecta el mapeo de origen de eventos una cola SQS con una Lambda?

**Breve:** El mapeo sondea SQS, reúne mensajes en lotes e invoca Lambda; el mensaje se elimina cuando el lote se procesa correctamente.

**Ampliada:** Si la función falla o vence el tiempo, el mensaje puede volver a estar visible y provocar otra invocación. Por eso el consumidor debe tolerar duplicados, por ejemplo usando el ID del pedido como clave idempotente antes de guardar en DynamoDB. Ajustaría tamaño del lote, concurrencia y timeout al tiempo de procesamiento.
## Error frecuente

Suponer que aumentar el visibility timeout garantiza procesamiento exactamente una vez. El timeout reduce ciertas entregas concurrentes, pero el consumidor sigue necesitando idempotencia ante reintentos y fallos.

## Práctica

Publicá un pedido y comprobá su estado en DynamoDB. Volvé a enviar el mismo `orderId` y verificá que el resultado siga representando un único pedido.

### Pista

Revisá la condición de escritura y el tratamiento de `ConditionalCheckFailedException` en el handler.

### Solución

La tabla usa `orderId` como clave y la escritura exige que aún no exista. Si una repetición encuentra el registro, el handler interpreta la condición fallida como duplicado y no cambia el efecto de negocio. La entrega repetida es segura porque el resultado ya estaba persistido.

## Profundización

[Abrir el paso 3 del laboratorio en GitHub](https://github.com/JonasGarcia1/aws-java-floci-labs#paso-3-procesar-eventos-con-lambda-y-dynamodb)

Consultá `OrderConsumerHandler.java`, `compose.lambda.yaml` y `scripts/deploy-floci-lambda.ps1` del laboratorio. Floci necesita acceso al socket Docker para iniciar el runtime; no expongas ese socket en una máquina compartida. Confirmá soporte de las operaciones utilizadas en la versión fijada.

[Floci: servicio Lambda](https://floci.io/floci/services/lambda/) · [AWS Lambda con SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html) · [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
