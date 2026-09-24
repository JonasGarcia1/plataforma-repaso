# SQS y desacoplamiento

## Concepto

Amazon Simple Queue Service (SQS) es una cola administrada que almacena mensajes hasta que un consumidor los procesa. El productor envía sin esperar a que el trabajo termine; así puede desacoplarse temporalmente del consumidor y absorber picos. Una cola estándar ofrece alta capacidad y entrega al menos una vez: un mensaje puede aparecer de nuevo y el orden no está garantizado. Las colas FIFO ofrecen orden por grupo y deduplicación dentro de sus reglas, con límites y semántica propios.

Cuando un consumidor recibe un mensaje, SQS lo oculta por un visibility timeout. Si el consumidor completa el trabajo, elimina el mensaje; si falla o tarda más que el timeout, el mensaje puede volver a estar disponible. Por eso el consumidor debe ser idempotente: procesar el mismo mensaje otra vez no debe duplicar el efecto de negocio.

## Ejemplo

```text
API → envía {eventId: "evt-42", pedidoId: "ord-17"} a SQS
Consumidor → registra evt-42 si todavía no fue aplicado
Consumidor → persiste el cambio y elimina el mensaje tras completar el efecto
```

El envío aceptado significa que la cola recibió el mensaje, no que el pedido ya se procesó. Una métrica de antigüedad del mensaje más viejo ayuda a detectar consumidores atrasados.

## En entrevista

**Pregunta:** ¿Qué problema resuelve la visibilidad de mensajes en SQS y cómo evitás procesarlos dos veces?

**Breve:** SQS almacena trabajo para consumo posterior. El visibility timeout permite procesarlo y luego eliminarlo; la entrega repetida exige idempotencia. **Ampliada:** compara cola estándar y FIFO para un flujo que requiere o no orden por pedido.
## Error frecuente

Asumir entrega exactamente una vez y ejecutar dos veces un cargo o reserva. Usa una clave de idempotencia persistida y asegúrate de que el timeout cubra el procesamiento esperado, con margen para eliminar el mensaje.

## Práctica

Un consumidor puede caer después de reservar inventario, pero antes de eliminar el mensaje. Explica qué puede pasar al reentregarse y cómo evitar una segunda reserva.

### Pista

El borrado del mensaje y la escritura de negocio no forman automáticamente una sola transacción. El efecto debe reconocer el mismo `eventId` al volver a ejecutarse.

### Solución

SQS vuelve a entregar el mensaje cuando vence el visibility timeout. El consumidor busca el `eventId` en un registro de idempotencia junto con la reserva. Si ya se aplicó, no reserva de nuevo y elimina el mensaje; si no, registra/aplica la reserva con una operación atómica o una protección equivalente y luego elimina el mensaje. Ajusta el timeout por encima del tiempo normal de procesamiento y vigila la edad de mensajes y la cantidad de mensajes en vuelo.

## Profundización

[Guía para desarrolladores de SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html) · [Colas estándar y FIFO](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues.html)
