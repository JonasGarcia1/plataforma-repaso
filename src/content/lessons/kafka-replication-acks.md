## Concepto

Cada partición tiene un leader que recibe lecturas y escrituras; las réplicas follower copian su log. El replication factor cuenta cuántas réplicas se asignan. El conjunto ISR contiene las réplicas consideradas sincronizadas con el leader.

El productor elige cuánto espera con `acks`: `0` no espera respuesta del broker, `1` espera la confirmación del leader y `all` (equivalente a `-1`) espera las réplicas que estén actualmente en ISR. `min.insync.replicas` fija el mínimo de ISR requerido para aceptar una escritura con `acks=all`. Así, RF=3 y min ISR=2 permiten escribir con dos réplicas sincronizadas; si el ISR cae a una, esa escritura falla para proteger el nivel requerido.

En la API de pedidos, esperar más confirmaciones puede reducir el riesgo de perder una escritura ante una falla, a costa de rechazar escrituras cuando no quedan suficientes réplicas disponibles. `acks=all` no significa que todas las réplicas asignadas respondan siempre: significa las réplicas que componen el ISR en ese momento.

## Ejemplo

```text
Topic pedidos, RF=3, min.insync.replicas=2
Partición 0: broker A (leader), broker B y C (followers)
ISR: A, B

producer acks=all → A y B confirman → escritura aceptada
ISR: A
producer acks=all → no alcanza min ISR=2 → escritura rechazada
```

En un laboratorio con un solo broker, RF=1 es la única topología realista. Configurar `acks=all` ahí no crea una segunda copia ni prueba failover.

## En entrevista

**Pregunta:** ¿`acks=all` garantiza que el pedido nunca se perderá?

**Breve:** No por sí solo; depende de ISR, `min.insync.replicas`, el estado del cluster y la confirmación que observa el productor.

**Ampliada:** `acks=all` pide confirmar desde el ISR actual. Con `min.insync.replicas` se puede exigir un mínimo de réplicas sincronizadas, equilibrando durabilidad y disponibilidad. El `CompletableFuture` de `KafkaTemplate.send` permite observar éxito o fallo de esa publicación según la configuración. Eso no confirma que el consumer haya actualizado una base de datos ni que toda la operación HTTP sea durable.

## Error frecuente

No traduzcas `acks=all` como “todas las réplicas configuradas siempre” ni confundas factor de réplica con ISR. Un broker único no demuestra tolerancia a fallos; un topic con ISR por debajo del mínimo puede rechazar escrituras aunque el producer siga conectado.

## Práctica

Un topic de pedidos usa RF=3 y `min.insync.replicas=2`. Una réplica follower deja de estar sincronizada y el ISR queda en dos. ¿Puede escribirse con `acks=all`? ¿Qué cambia si también cae el follower restante?

### Pista

Compará el tamaño del ISR con el mínimo exigido en cada momento.

### Solución

Con dos miembros en ISR la escritura puede aceptarse si ambos la confirman. Si el ISR queda en uno, el mínimo de dos ya no se cumple y una escritura con `acks=all` falla. Esto sacrifica disponibilidad temporal de escritura para conservar la política de durabilidad elegida.

## Profundización

La idempotencia del producer previene duplicados causados por reintentos de transporte dentro de su alcance; no evita que la aplicación publique dos veces un pedido por dos solicitudes distintas. Para una política productiva, revisá también elecciones de leader y tratamiento de réplicas fuera de sincronía; ningún ajuste aislado garantiza sobrevivir a cualquier combinación de pérdida de brokers o datos.

**Fuentes oficiales:** [Apache Kafka 3.9: replicación y garantías de escritura](https://kafka.apache.org/39/design/design/), [Apache Kafka 3.9: producer configs](https://kafka.apache.org/39/configuration/producer-configs/), [Apache Kafka 3.9: topic-level configs](https://kafka.apache.org/39/configuration/topic-level-configs/).

**Comprobá lo aprendido:**

- Sé distinguir replication factor e ISR.
- Sé explicar el rol de `acks` y `min.insync.replicas`.
- Sé nombrar el límite de un laboratorio con un solo broker.
