## Concepto

Las garantías de entrega dependen de dónde puede caer el proceso y cuándo se confirma cada paso. At-most-once confirma antes de procesar y puede perder trabajo; at-least-once procesa antes de confirmar y puede repetirlo después de una caída. “Exactly-once” solo es preciso si se nombra el alcance y las fronteras coordinadas.

En el producer, la idempotencia de Kafka evita que ciertos reintentos de la misma sesión agreguen copias duplicadas al log. Una transacción Kafka puede hacer atómica la escritura a varios topics junto con offsets consumidos cuando todo el flujo queda dentro de Kafka. Una transacción JPA que escribe en MySQL y un commit de offset Kafka siguen siendo dos sistemas y no se vuelven una sola transacción por activar `@Transactional`.

Para materializar pedidos en MySQL, una estrategia común es procesar primero el efecto y luego confirmar el offset, aceptando que el record pueda repetirse. Una clave de evento estable con restricción única o una tabla inbox dentro de la misma transacción local permite que el efecto sea idempotente.

## Ejemplo

```text
consumer lee PedidoPagado
  → guarda pedido en MySQL
  → confirma offset Kafka

si cae entre guardar y confirmar:
  → Kafka lo entrega otra vez
  → clave única de eventId evita repetir el efecto
```

Si se confirma el offset antes de guardar, una caída entre ambos pasos puede saltarse el evento definitivamente.

## En entrevista

**Pregunta:** ¿Kafka garantiza exactamente una actualización de pedido en MySQL?

**Breve:** No automáticamente; el offset y la escritura externa no comparten una transacción Kafka.

**Ampliada:** Kafka puede coordinar transacciones entre offsets y records Kafka, y el producer idempotente puede deduplicar reintentos de publicación dentro de su alcance. Para una base externa, queda una ventana entre el commit Kafka y el commit de la base. Definiría el orden de procesamiento, una identidad estable del evento y una restricción o inbox durable; después comprobaría el comportamiento ante caídas.

## Error frecuente

No uses “exactly-once” como promesa universal ni confundas idempotencia del producer con idempotencia del negocio. Reintentar una operación de pago dos veces con el mismo payload puede cobrar dos veces si el sistema de pagos no recibe una clave idempotente.

## Práctica

El consumer guarda `PedidoPagado` en MySQL y el proceso cae antes de confirmar el offset. Al volver, Kafka entrega el evento otra vez. ¿Cómo evitarías que la segunda entrega repita el efecto?

### Pista

La deduplicación debe sobrevivir al reinicio y confirmarse junto con el cambio local.

### Solución

Asignaría un `eventId` estable al evento y guardaría ese ID con una restricción única o registro inbox en la misma transacción de MySQL que aplica el cambio al pedido. En la redelivery, detectar el ID existente permite tratarlo como ya aplicado; luego el consumer puede confirmar el offset. Un mapa en memoria no basta porque se pierde al reiniciar.

## Profundización

Spring Kafka ofrece modos de ack, manejo transaccional y tratamiento de errores que deben configurarse según la frontera de datos y el nivel de paralelismo. Los commits por lote, listeners concurrentes, retry topics y rebalances alteran dónde aparece una repetición. Diseñá y probá la ventana de fallo real. Para el flujo exclusivamente Kafka-to-Kafka, consumidores transaccionales deben leer con `read_committed` si no deben observar datos abortados.

**Fuentes oficiales:** [Apache Kafka 3.9: message delivery semantics](https://kafka.apache.org/39/design/design/), [Apache Kafka 3.9: producer configs e idempotencia](https://kafka.apache.org/39/configuration/producer-configs/), [Spring Kafka 3.3: exactly-once semantics](https://docs.spring.io/spring-kafka/reference/3.3/kafka/exactly-once.html).

**Comprobá lo aprendido:**

- Sé ubicar ventanas de pérdida y reproceso.
- Sé distinguir idempotencia del producer y del negocio.
- Sé proponer deduplicación durable para una base externa.
