## Concepto

La configuración define cómo convertir objetos en bytes y cómo reconstruirlos. ProducerFactory y KafkaTemplate pertenecen a la escritura; la listener factory pertenece a la lectura y al ciclo de polling del consumer.

Para texto, StringSerializer produce bytes UTF-8 y StringDeserializer los reconstruye; usar JsonDeserializer contra esos bytes no expresa el mismo contrato.

El recorrido de esta práctica:

1. Definí bootstrap.servers.
2. Elegí serializer de key y value para producer.
3. Elegí deserializer equivalente para consumer.
4. Asigná group id, offset reset y listener factory.

## Ejemplo

Fragmento parcial adaptado de KafkaClientConfig; requiere imports Kafka y Java 21.

```java
Map<String, Object> props = Map.of(
    ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:29092",
    ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class,
    ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class,
    ProducerConfig.ACKS_CONFIG, "all"
);
```

## En entrevista

**Pregunta:** ¿Qué hace bootstrap.servers?

**Breve:** Es el punto inicial para descubrir el cluster; el cliente no necesita conocer cada broker de antemano.

**Ampliada:** ProducerFactory construye productores y KafkaTemplate facilita envíos. ConsumerFactory define consumidores y el listener container administra polling. acks=all espera las réplicas sincronizadas requeridas; con un único broker no aporta copias en otros nodos.

## Error frecuente

earliest no rebobina un grupo con posición válida. Además, acks=all sobre un broker no demuestra replicación ni alta disponibilidad.

## Práctica

Un grupo existente tiene offset confirmado 50. Cambiás auto-offset-reset a earliest y reiniciás. ¿Vuelve a cero?

### Pista

Reset es una política de recuperación cuando no hay posición válida.

### Solución

No: continúa desde el offset confirmado válido. earliest se aplica si falta offset o el existente ya no es válido, por ejemplo por retención. Para reprocesar deliberadamente hay que administrar offsets o usar otro grupo, previendo duplicados y capacidad de la proyección.

## Profundización

Antes de ajustar `acks` o los offsets, repasá [replicación y confirmaciones](/leccion/kafka-replication-acks) y [garantías de entrega](/leccion/kafka-delivery-semantics): la configuración del cliente expresa una decisión de durabilidad y reproceso.

La durabilidad depende también de replicación y min.insync.replicas. No deduzcas tolerancia a fallos solamente de acks=all. En el laboratorio encontrás textListenerFactory y learning-text-group; no son equivalentes al grupo de Wikimedia.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Configuración central:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/config/KafkaClientConfig.java`. Factories, serializers, acks, group y offset reset.
- **Propiedades:** `springboot-kafka-roadmap-course/learning-api/src/main/resources/application.yml`. Separación entre Spring, HTTP y cliente Kafka.
- **Rebalance:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/kafka/LearningRebalanceListener.java`. Muestra asignación y revocación de particiones.

**Comprobá lo aprendido:**

- Sé vincular serializer con deserializer.
- Sé explicar acks=all.
- Sé decir cuándo aplica earliest.
