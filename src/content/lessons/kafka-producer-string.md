## Concepto

KafkaTemplate centraliza la publicación y devuelve un resultado asíncrono. LearningProducer es una capa pequeña pero importante: concentra el nombre de topic y mantiene el controller ajeno a detalles Kafka.

sendText publica hola Kafka en learning.text.v1. Al confirmar, el metadata del record permite observar partición y offset.

El recorrido de esta práctica:

1. Identificar el topic learning.text.v1.
2. Inspeccionar sendText en LearningProducer.
3. Separar llamada a send de confirmación del future.
4. Observar errores y metadata sin atribuir al log inmediato una garantía de entrega.

## Ejemplo

Fragmento parcial propuesto para estudio, Java 21 / Spring Kafka 3. El código local original no incorpora este callback.

```java
// Mejora ilustrativa: observar confirmación y fallo del envío.
textTemplate.send(textTopic, message).whenComplete((result, error) -> {
    if (error != null) {
        log.error("Falló publicación topic={}", textTopic, error);
    } else {
        var meta = result.getRecordMetadata();
        log.info("Confirmado topic={} partition={} offset={}",
            meta.topic(), meta.partition(), meta.offset());
    }
});
```

## En entrevista

**Pregunta:** ¿KafkaTemplate.send bloquea?

**Breve:** No necesariamente: devuelve un resultado asíncrono que permite observar éxito o fallo.

**Ampliada:** KafkaTemplate.send devuelve un CompletableFuture en esta generación. El código LearningProducer actual descarta ese future y registra inmediatamente. La mejora mostrada aporta diagnóstico; por sí sola no reintenta de forma durable ni convierte el 202 en garantía de persistencia.

## Error frecuente

El material original sugiere buscar metadata en el log del producer, pero LearningProducer solo registra topic/texto o usuario. Partición y offset están disponibles en el resultado asíncrono o en los logs del consumer.

## Práctica

La API devuelve 202 y aparece 'Texto enviado', pero luego el broker deja de estar disponible. ¿Qué prueba ese log y qué falta?

### Pista

La invocación de send y la resolución de su future son momentos diferentes.

### Solución

El log original prueba que el método intentó publicar, no que el broker confirmó. Hay que observar el resultado asíncrono y definir cómo recuperar fallos. Para garantías durables desde HTTP podría necesitarse persistir la intención antes de aceptarla, por ejemplo con outbox.

## Profundización

La idempotencia del producer evita ciertos duplicados de sus reintentos de transporte. Dos llamadas de negocio independientes con la misma key siguen pudiendo generar dos registros. No uses la key como prueba de deduplicación.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Producer:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/kafka/LearningProducer.java`. sendText encapsula la publicación del texto.
- **Topic:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/config/KafkaTopics.java`. Declara learning.text.v1.

**Comprobá lo aprendido:**

- Sé ubicar KafkaTemplate.
- Sé explicar envío asíncrono.
- Sé localizar el topic del texto.

