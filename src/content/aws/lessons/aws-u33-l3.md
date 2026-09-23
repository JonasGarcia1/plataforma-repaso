# Spring Boot y SQS

## Concepto

SQS desacopla al productor del consumidor mediante una cola durable administrada. Spring Cloud AWS puede enlazar un listener con una cola, pero la aplicación conserva la responsabilidad de validar el evento, ejecutar el caso de uso e interpretar fallos. Una entrega puede repetirse: el efecto de negocio debe ser idempotente.

## Ejemplo

```java
@SqsListener("${app.queues.orders}")
void receive(OrderCreated event) {
    orderService.registerIfNew(event.eventId(), event.orderId());
}
```

El consumidor borra el mensaje después de procesarlo correctamente. Si agota el visibility timeout sin completar, SQS puede entregarlo otra vez. La DLQ y `maxReceiveCount` aíslan mensajes que fallan repetidamente; no corrigen el error por sí solas.

## En entrevista

**Breve:** Separá el listener, el caso de uso y el acceso a SQS; asumí reentregas. **Ampliada:** explica qué pasa ante fallo después de persistir pero antes de confirmar el mensaje.

## Error frecuente

Capturar cualquier excepción y finalizar el listener como si el trabajo hubiera terminado. Eso puede confirmar el mensaje y perder el efecto esperado; clasifica errores recuperables y permanentes.

## Práctica

Un listener persiste un pedido, pero el proceso cae antes de completar el mensaje. Describe cómo evitar duplicar el pedido al recibirlo otra vez.

### Pista

El consumidor no puede asumir procesamiento “exactamente una vez”. Usa una identidad estable del evento y una escritura condicional durable.

### Solución

Persisto `eventId` con una condición de inexistencia junto al efecto o dentro de una transacción de base. En la reentrega, la condición indica que ya se aplicó y el handler puede completar el mensaje sin repetir el efecto. Ajusto visibilidad al tiempo de procesamiento y envío fallos persistentes a DLQ con alerta.

## Profundización

[Spring Cloud AWS: SQS](https://docs.awspring.io/spring-cloud-aws/docs/3.2.1/reference/html/index.html#sqs) · [Amazon SQS: manejo de mensajes](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-timers.html)
