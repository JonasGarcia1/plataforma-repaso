# API Gateway, SQS y límites de Lambda

## Concepto

API Gateway suele invocar Lambda de forma síncrona: el cliente espera una respuesta. SQS la activa de forma asíncrona: el evento puede llegar en lote y los fallos provocan reintentos. Timeout, memoria, concurrencia y tamaño de lote afectan latencia, costo y presión sobre dependencias.

## Ejemplo

```text
POST /orders → API Gateway → Lambda (respuesta al cliente)
SQS orders → Lambda (lote de mensajes, reintento o DLQ)
```

Para SQS, una función lenta puede superar visibility timeout y recibir el mismo lote otra vez. La concurrencia reservada limita presión hacia una base de datos, aunque también puede acumular mensajes. Para lotes, configura respuestas parciales si necesitas reintentar solo los mensajes fallidos.

## En entrevista

**Breve:** Elegí la integración por el contrato de respuesta y el patrón de entrega. **Ampliada:** explica cómo acotarías concurrencia y reintentos para proteger una dependencia saturada.

## Error frecuente

Aumentar el timeout o los reintentos sin revisar duración total, visibilidad y duplicados. Los límites deben coordinarse entre Lambda, SQS y el servicio downstream.

## Práctica

Una Lambda procesa un lote de SQS durante 90 segundos y escribe en DynamoDB. ¿Qué revisarías antes de aumentar concurrencia?

### Pista

Compara duración de procesamiento con visibility timeout y capacidad de escritura de la tabla. Considera que una reentrega puede repetir efectos.

### Solución

Mediría duración p95/p99 y errores; ajustaría visibility timeout por encima de la duración esperada con margen, tamaño de lote y concurrencia acorde a capacidad de DynamoDB. Haría cada escritura idempotente, usaría respuesta parcial para aislar fallos y alarma por edad de mensajes. Aumentar concurrencia sin esos controles solo amplifica presión y duplicados.

## Profundización

[Lambda con SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html) · [Lambda con API Gateway](https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html)
