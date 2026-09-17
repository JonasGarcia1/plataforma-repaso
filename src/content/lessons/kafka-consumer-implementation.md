## Concepto

ConsumerRecord expone value, key, topic, partition y offset. El listener real construye WikimediaEvent, persiste y registra contexto. El contenedor administra el progreso Kafka según su configuración; no existe una transacción global automática entre Kafka y MySQL.

Si un payload causa un problema, key+partition+offset permiten buscarlo en Kafka UI y razonar sobre un posible reproceso.

El recorrido de esta práctica:

1. Recibir ConsumerRecord.
2. Guardar la proyección con repository.save.
3. Registrar topic/partición/offset cuando sea necesario.
4. Revisar configuración de commits y ventana de reproceso.

## Ejemplo

Fragmento parcial del consumer real; requiere repositorio, imports, configuración y logger.

```java
@KafkaListener(topics = "${app.topic}")
public void consume(ConsumerRecord<String, String> record) {
    repository.save(new WikimediaEvent(record.key(), record.value()));
    log.info("Persistido partition={} offset={} key={}",
        record.partition(), record.offset(), record.key());
}
```

## En entrevista

**Pregunta:** ¿Por qué puede haber reproceso?

**Breve:** Una caída entre persistir y confirmar offset puede causar entrega at-least-once.

**Ampliada:** ConsumerRecord proporciona contexto exacto del log. El modo de confirmación depende de la configuración del container; no afirmaría que cada retorno implica un commit inmediato individual. Persistir antes de avanzar reduce pérdidas de trabajo, pero acepta duplicados.

## Error frecuente

El título original decía 'consumer de producción', pero el ejemplo es pedagógico: faltan deduplicación persistente y una política completa de recuperación. No es una garantía exactly-once.

## Práctica

La transacción de save confirma, pero el proceso cae antes de confirmar el progreso Kafka. ¿Qué puede pasar al volver?

### Pista

Guardar una entidad y confirmar offsets son acciones diferentes.

### Solución

El registro puede procesarse otra vez y crear otra fila con nuevo ID generado. El código no incorpora restricción de deduplicación. Una mejora debe guardar identificación estable del evento, o topic-partition-offset según el objetivo, junto al efecto en la misma transacción local.

## Profundización

Referencia avanzada: springboot-kafka-roadmap-course/advanced-labs/src/main/java/com/interviewlab/advanced/labs/AdvancedLabService.java. executeInTransaction agrupa escrituras Kafka; no vuelve atómicas la tabla MySQL y la confirmación de este listener. Separá transacciones Kafka, idempotencia del producer e idempotencia de negocio.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Consumer listener:** `springboot-kafka-roadmap-course/wikimedia-consumer/src/main/java/com/interviewlab/wikimediaconsumer/kafka/WikimediaDatabaseConsumer.java`. Recibe el record y guarda la proyección.
- **Evento persistente:** `springboot-kafka-roadmap-course/wikimedia-consumer/src/main/java/com/interviewlab/wikimediaconsumer/persistence/WikimediaEvent.java`. Modelo que representa el resultado local.

**Comprobá lo aprendido:**

- Sé definir ConsumerRecord.
- Sé explicar at-least-once.
- Sé encontrar key/offset en logs.

