# Diseñar el flujo de pedidos

## Concepto

Un flujo distribuido cruza límites de servicio y no es una transacción única. La API valida y acepta el pedido; SQS desacopla procesamiento; Lambda o un consumidor aplica el efecto; DynamoDB persiste estado. Cada frontera necesita contrato, identidad de correlación, permisos mínimos, estrategia de fallo y señal operativa.

## Ejemplo

```text
Cliente → API → SQS → Lambda → DynamoDB
         requestId  eventId       orderId
```

Si publicar en SQS funciona y la escritura de DynamoDB falla, el mensaje puede reintentarse. Si el consumidor escribe y cae antes de borrar el mensaje, puede procesarlo otra vez. Usa `eventId` estable y una escritura condicional para que el efecto sea idempotente; DLQ permite aislar fallos persistentes para investigar.

## En entrevista

**Pregunta:** ¿Cómo coordinarías un flujo de pedidos asíncrono con SQS, Lambda y DynamoDB?

**Breve:** Explica qué garantiza cada componente y qué sigue siendo responsabilidad de la aplicación. **Ampliada:** recorre una falla parcial y muestra cómo evitar duplicados y detectar mensajes atascados.
## Error frecuente

Suponer que recibir una respuesta HTTP exitosa significa que el pedido terminó de persistirse. Define si la respuesta significa “aceptado” o “completado” y haz visible ese contrato al cliente.

## Práctica

Diseña un pedido aceptado de forma asíncrona. Indica respuesta API, claves idempotentes, alarma y acción para un mensaje que falla repetidamente.

### Pista

La API confirma aceptación después de publicar; el consumidor confirma procesamiento después del efecto durable. Sigue el mismo identificador por logs y mensajes.

### Solución

La API devuelve `202 Accepted` con `orderId` tras validar y publicar un evento versionado con `eventId`. El consumidor aplica una condición de inexistencia antes de cambiar estado y borra solo tras éxito. Errores persistentes van a DLQ con alerta por edad/cantidad; un operador inspecciona causa y redrive solo tras corregirla. Métricas y logs correlacionan request, evento y resultado.

## Profundización

[AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) · [Amazon SQS: dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)
