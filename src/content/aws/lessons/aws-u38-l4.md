# Probar reintentos, lotes y DLQ

## Concepto

Cuando Lambda recibe varios mensajes SQS en un lote, un error general puede hacer que se repitan también registros que habían terminado correctamente. El reporte de fallos parciales permite nombrar los mensajes fallidos y deja al origen reintentar esos elementos. La cola de mensajes fallidos (DLQ) aísla mensajes que exceden el umbral de recepción configurado para que puedan inspeccionarse. La idempotencia sigue siendo necesaria: incluso un mensaje que falla puede haberse procesado parcialmente.

## Ejemplo

El laboratorio configura una cola `orders-dlq` y una redrive policy en la cola `orders`. El handler devuelve `BatchItemFailures` para los registros que no pudo procesar, y registra el identificador del mensaje junto con el error. Para revisar la configuración, consultá la URL de la cola y sus atributos con AWS CLI apuntando a Floci:

```powershell
$env:AWS_PROFILE = 'floci'
$queueUrl = aws --endpoint-url http://localhost:4566 sqs get-queue-url --queue-name orders --query QueueUrl --output text
aws --endpoint-url http://localhost:4566 sqs get-queue-attributes --queue-url $queueUrl --attribute-names RedrivePolicy VisibilityTimeout
mvn test
```

El script `test-floci-e2e.ps1` automatiza el recorrido, un duplicado y un mensaje inválido que termina en DLQ:

```powershell
.\scripts\test-floci-e2e.ps1
docker compose logs -f floci
```

### Resultado esperado

Un registro que falla aparece como elemento fallido en la respuesta del handler y vuelve a quedar disponible según la política de la cola. Después del umbral configurado, SQS lo coloca en la DLQ. Los registros exitosos no deberían repetir su efecto en DynamoDB.

## En entrevista

**Breve:** ¿Para qué sirve una DLQ? **Ampliada:** explicá cómo distinguís fallo temporal de mensaje venenoso y qué señal operativa vigilarías.

## Error frecuente

Pensar que enviar un mensaje a la DLQ resuelve el problema. La DLQ conserva evidencia; una persona o proceso debe investigar la causa, corregirla y decidir si corresponde redrive. También hay que alertar por cantidad y antigüedad de mensajes.

## Práctica

Provocá un error controlado en un mensaje, revisá los logs y seguí el contador de recepción. Escribí qué condición corregirías antes de volver a procesarlo.

### Pista

Correlacioná `messageId`, `orderId`, intentos de recepción y la operación que falla.

### Solución

El handler identifica el registro fallido en la respuesta parcial y deja que el origen vuelva a intentarlo. La redrive policy envía a DLQ después de exceder el máximo. Se conserva el mensaje para investigar, se corrige la causa y se hace redrive controlado; no se borra evidencia para obtener una ejecución verde.

## Profundización

[Abrir el paso 4 del laboratorio en GitHub](https://github.com/JonasGarcia1/aws-java-floci-labs#paso-4-probar-fallos-reintentos-y-dlq)

Revisá `OrderConsumerHandler.java`, `scripts/init-floci.ps1`, `scripts/deploy-floci-lambda.ps1` y `scripts/test-floci-e2e.ps1`. Las garantías observadas corresponden a la imagen Floci 2.1.0 y las operaciones implementadas.

[AWS Lambda: errores al procesar lotes SQS](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html) · [SQS: colas de mensajes fallidos](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)
