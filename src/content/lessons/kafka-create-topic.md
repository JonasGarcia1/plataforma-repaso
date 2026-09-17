## Concepto

Un topic es el contrato de intercambio entre productores y consumidores. NewTopic permite declararlo como infraestructura versionada junto al código, con nombre, particiones y réplicas explícitas.

learning.users.v1 separa los UserEvent de los mensajes de texto. El sufijo v1 deja espacio para evolucionar el contrato sin romper consumidores antiguos.

El recorrido de esta práctica:

1. Definí el nombre estable y versionable.
2. Elegí particiones según paralelismo esperado.
3. Elegí replicas según cantidad de brokers reales.
4. Arrancá la app y comprobalo en Kafka UI.

## Ejemplo

Fragmento parcial Java 21 / Spring Kafka; adaptado del patrón de KafkaTopics.

```java
@Bean
NewTopic usuarios() {
    return TopicBuilder.name("learning.users.v1")
        .partitions(3)
        .replicas(1)
        .build();
}
```

## En entrevista

**Pregunta:** ¿Qué ocurre con factor de réplica 3 en un broker?

**Breve:** No hay suficientes brokers para alojar las tres copias; el entorno local no puede simular alta disponibilidad real.

**Ampliada:** El nombre del topic es parte del contrato. El sufijo v1 facilita una transición, pero no migra datos ni consumidores por sí solo. Elegiría particiones considerando capacidad y claves; modificar su cantidad puede cambiar la afinidad de una key.

## Error frecuente

No uses replicas=3 con un único broker local esperando alta disponibilidad: no existen nodos donde poner las copias.

## Práctica

Justificá tres particiones y una réplica para el laboratorio. ¿Qué significa que un topic compactado muestre dos valores de la misma key?

### Pista

Paralelismo, disponibilidad y compactación resuelven problemas distintos.

### Solución

Tres particiones permiten estudiar reparto; una réplica corresponde al único broker disponible, sin tolerancia a pérdida del nodo. La compactación ocurre de forma asíncrona: pueden observarse versiones anteriores hasta la limpieza. Un tombstone tiene value null; no borra todo de inmediato.

## Profundización

Referencia avanzada local: springboot-kafka-roadmap-course/advanced-labs/src/main/java/com/interviewlab/advanced/config/AdvancedKafkaConfig.java. Define labs.state.v1 con cleanup.policy=compact, topics de transacción y de Streams. Estos conceptos complementan el recorrido sin sumar una lección 23. No confundas compactación con eliminación inmediata o deduplicación de pagos.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Declaración:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/config/KafkaTopics.java`. Un bean NewTopic por canal de práctica.
- **Broker local:** `springboot-kafka-roadmap-course/docker/kafka-zookeeper/server.properties`. Explica por qué la réplica local es una.
- **Labs avanzados:** `springboot-kafka-roadmap-course/advanced-labs/src/main/java/com/interviewlab/advanced/config/AdvancedKafkaConfig.java`. Amplía con compactación, transacciones e idempotencia.

**Comprobá lo aprendido:**

- Sé crear un NewTopic.
- Sé justificar tres particiones.
- Sé explicar el límite del broker único.

