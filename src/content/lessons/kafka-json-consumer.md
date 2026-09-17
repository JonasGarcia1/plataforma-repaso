## Concepto

La factory deserializa los bytes como un objeto Java antes de invocar al listener. Este puede trabajar sobre UserEvent, pero sigue necesitando un contrato aceptado y una política para datos inválidos. Deserialización no es sinónimo de validación de negocio.

onUser puede leer user.id directamente; no necesita hacer ObjectMapper.readValue en cada mensaje.

El recorrido de esta práctica:

1. El cliente hace poll de registros.
2. JsonDeserializer intenta reconstruir el tipo permitido.
3. La factory invoca onUser si esa reconstrucción tiene éxito.
4. El listener procesa el DTO; validación de negocio y recuperación requieren diseño explícito.

## Ejemplo

Fragmento parcial ilustrativo Java 21 / Spring Kafka 3; imports y logger omitidos.

```java
@KafkaListener(topics = "${app.kafka.topics.users}",
               containerFactory = "userListenerFactory")
void onUser(ConsumerRecord<String, UserEvent> record) {
    UserEvent user = record.value();
    log.info("user={} partition={} offset={}",
        user.id(), record.partition(), record.offset());
}
```

## En entrevista

**Pregunta:** ¿Qué debe coincidir entre ambos lados?

**Breve:** Formato, serializer/deserializer y el contrato del payload.

**Ampliada:** El container entrega el tipo Java mediante su factory. Deserializar no aplica automáticamente Bean Validation. Los fallos previos al listener necesitan observabilidad y una estrategia que evite bloquear indefinidamente una partición o descartar datos silenciosamente.

## Error frecuente

Los errores de deserialización deben observase y tratarse; no los ocultes porque bloquean el progreso de una partición.

## Práctica

Aparece un JSON inválido y tu breakpoint dentro de onUser no se activa. ¿Dónde puede fallar el recorrido?

### Pista

El listener se invoca después de reconstruir el tipo Java.

### Solución

El fallo puede ocurrir en deserialización, antes de entrar en el método. Revisaría logs del container, configuración, payload y headers. La política de ErrorHandlingDeserializer, reintentos y recuperación debe diseñarse explícitamente; el laboratorio básico no demuestra una DLQ configurada.

## Profundización

Un cambio compatible debe contemplar eventos viejos que aún existen en Kafka. Probar solo el productor nuevo contra el consumidor nuevo oculta problemas de replay. Conservá ejemplos de contratos antiguos y documentá defaults de campos opcionales.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Listener UserEvent:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/kafka/LearningConsumers.java`. onUser recibe el DTO ya deserializado.
- **Factory del listener:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/config/KafkaClientConfig.java`. Selecciona el consumidor JSON correcto.

**Comprobá lo aprendido:**

- Sé explicar deserialización.
- Sé localizar onUser.
- Sé decir qué pasa si cambia el esquema.

