# Reintentos, DLQ y entrega segura

## Concepto

Un reintento vuelve a intentar una operación que falló. Sirve para errores transitorios, como un timeout breve, pero puede repetir un efecto si el primer intento sí se completó y la respuesta se perdió. Por eso los productores y consumidores deben usar idempotencia cuando el efecto no se puede duplicar.

Una dead-letter queue (DLQ) conserva mensajes que superaron el número permitido de recepciones sin procesarse correctamente. En SQS se configura una redrive policy con una cola destino y `maxReceiveCount`. La DLQ separa mensajes problemáticos para inspección; después de corregir la causa, un operador puede redrivearlos a la cola original. No se corrigen solos ni debe asumirse que el reproceso es seguro.

## Ejemplo

```text
Cola pedidos → consumidor falla repetidamente al validar un mensaje
maxReceiveCount = 5 → SQS mueve el mensaje a pedidos-dlq
Alarma sobre mensajes visibles en pedidos-dlq → investigar, corregir y reprocesar
```

El visibility timeout debe permitir terminar el procesamiento normal. Si es demasiado corto, un segundo consumidor puede recibir el mismo mensaje mientras el primero sigue activo. Si es demasiado largo, la recuperación tras una caída tarda más.

## En entrevista

**Breve:** Reintenta fallos transitorios con un límite; manda mensajes que agotan intentos a una DLQ para investigación. La idempotencia evita repetir efectos. **Ampliada:** describe el recorrido del mensaje, el umbral de intentos y cómo se reanuda sin duplicar una reserva.

## Error frecuente

Usar reintentos infinitos o asumir que un mensaje en DLQ ya se resolvió. El bucle puede aumentar latencia y costo; sin alerta y proceso de redrive, el trabajo queda detenido.

## Práctica

Un mensaje falla cinco veces por un formato inválido y termina en DLQ. Propón cómo detectar el problema, corregir el mensaje y reprocesarlo sin crear dos pedidos.

### Pista

Separa diagnóstico del reproceso. Conserva el identificador idempotente en el mensaje y comprueba si el efecto del negocio ya ocurrió antes de repetirlo.

### Solución

Configura una DLQ y un máximo de recepciones acorde con el tiempo de recuperación esperado. Alerta cuando haya mensajes en ella. Inspecciona el error sin exponer datos sensibles, corrige la causa o el contenido con trazabilidad y verifica si el pedido ya existe usando su `eventId`/clave idempotente. Después redrivea el mensaje y confirma que se aplica una sola vez. Registra el resultado y monitorea que la cola principal vuelva a procesarse.

## Profundización

[Colas SQS de mensajes fallidos](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html) · [Redrive de mensajes](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html)
