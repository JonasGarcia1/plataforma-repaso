## Concepto

El consumer usa pull: solicita records cuando puede procesarlos. @KafkaListener simplifica el polling, pero debajo siguen existiendo asignaciones, offsets y rebalances coordinados por el group.

Al iniciar una segunda instancia del mismo group, los logs REBALANCE muestran qué particiones se revocan y reasignan.

El recorrido de esta práctica:

1. El consumer se une al group.
2. Kafka asigna particiones.
3. El listener recibe y procesa values.
4. El progreso se confirma como offset del group.

## Ejemplo

Fragmento parcial ilustrativo del listener; requiere beans, imports y configuración del laboratorio.

```java
@KafkaListener(topics = "${app.kafka.topics.text}",
               containerFactory = "textListenerFactory")
void onText(ConsumerRecord<String, String> record) {
    log.info("partition={} offset={} value={}",
        record.partition(), record.offset(), record.value());
}
```

## En entrevista

**Pregunta:** ¿Dos consumers del mismo grupo leen la misma partición?

**Breve:** No: una partición se asigna a un único miembro del grupo a la vez.

**Ampliada:** El consumidor usa poll; Spring administra ese ciclo e invoca el listener. Confirmar un offset registra progreso del grupo. Un rebalance cambia asignaciones y puede provocar reprocesos según el momento de confirmación. La exclusividad de asignación no garantiza exactamente un efecto externo.

## Error frecuente

No confundas lag con pérdida inmediata. Pero si el consumidor no alcanza al productor antes de vencer la retención, puede dejar de tener disponible parte del histórico.

## Práctica

Iniciás otra instancia de learning-api con el mismo grupo. ¿Recibe una copia de cada mensaje? ¿Qué señal buscarías?

### Pista

Observá logs REBALANCE y asignaciones, no solo cantidad de procesos.

### Solución

No recibe copia de todo: el grupo redistribuye las particiones entre sus miembros. Un grupo distinto sí mantiene lectura independiente. Para ejecutar dos aplicaciones web en el mismo equipo también necesitás puertos HTTP distintos; compartir group-id no resuelve conflictos de puerto.

## Profundización

El lag crece si entra más trabajo del que procesás. Revisá tiempo del listener, particiones, límites del pool y dependencia externa. Aumentar consumidores por encima de particiones no incrementa el paralelismo de ese topic en ese grupo.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Listener:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/kafka/LearningConsumers.java`. onText recibe el valor String deserializado.
- **Rebalance:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/kafka/LearningRebalanceListener.java`. Explica qué ocurre al asignar o revocar particiones.

**Comprobá lo aprendido:**

- Sé explicar pull.
- Sé definir rebalanceo.
- Sé diferenciar group de consumer individual.

