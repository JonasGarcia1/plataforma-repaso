## Concepto

Un cluster reúne brokers; cada broker almacena réplicas de particiones. Un topic agrupa particiones; cada partición es un log ordenado al que se anexan records. Un record puede tener key, value, timestamp y headers. Su offset identifica una posición dentro de una partición, no un ID global ni una fila de negocio.

Los cambios de `pedido-42` publicados con la misma key suelen ir a la misma partición cuando se mantienen el particionador y el número de particiones. Kafka preserva allí su orden relativo; no ofrece un orden global entre pedidos.

El recorrido de esta práctica:

1. Producer elige topic y opcionalmente key.
2. El particionador decide una partición.
3. El broker anexa el record y asigna offset.
4. El consumer lee records de la partición. La asignación a grupos y el progreso confirmado se estudian en la lección de consumer groups y offsets.

## Ejemplo

Ejemplo conceptual: el mismo número de offset puede existir en particiones distintas.

```text
Topic: pedidos
Partición 0: offset 12 → key=pedido-42
Partición 1: offset 12 → key=pedido-73
Los offsets pertenecen a particiones, no son IDs globales
Cada consumer group conserva su propio progreso
```

## En entrevista

**Pregunta:** ¿Kafka garantiza orden global dentro de un topic?

**Breve:** El orden se garantiza por partición. Una key estable ayuda a enrutar una entidad bajo configuración de particionamiento estable.

**Ampliada:** El broker agrega cada record a una partición y le asigna un offset local a ese log. Una key ayuda al particionador a mantener afinidad y orden por entidad si la estrategia y la cantidad de particiones no cambian. Otro pedido puede estar simultáneamente en otra partición; no existe un offset común que establezca el orden global.

## Error frecuente

No interpretes una key como garantía incondicional de partición: el resultado depende del particionador, cantidad de particiones y asignación explícita. Tampoco uses el offset como ID universal ni lo confundas con una posición confirmada por el grupo.

## Práctica

Dos eventos del mismo pedido tienen la misma key y se publican en un topic de tres particiones. ¿Qué propiedad se espera mientras el particionamiento se mantenga estable? ¿Offset 12 identifica un evento global?

### Pista

El orden se define dentro de una partición; cada partición tiene su espacio de offsets.

### Solución

La key estable tiende a dirigir los eventos de ese pedido a la misma partición, por lo que se conserva el orden relativo allí mientras no cambie el particionador o la cantidad de particiones. Offset 12 solo identifica una posición junto a topic y partición. Los grupos y consumidores asignados se explican en la lección siguiente; un fallo todavía puede provocar reproceso.

## Profundización

Los offsets no son contadores de filas que deban aparecer consecutivos: compactación y registros de control pueden dejar huecos en los records visibles. Una key nula es válida, pero no ofrece afinidad de negocio. Para preservar orden por entidad, elegí una key estable antes de publicar.

Una partición aumenta las opciones de paralelismo, pero también crea un límite de orden: Kafka no promete un orden total entre particiones. Más adelante vas a comparar ese paralelismo con el número de miembros de un grupo y con la disponibilidad de réplicas. Esas son decisiones distintas; sumar particiones no aumenta por sí solo las copias de cada una.

Continuá con [consumer groups y offsets](/leccion/kafka-groups-offsets) para ver cómo lectores independientes avanzan sobre esas particiones.

**Fuente oficial:** [Apache Kafka 3.9: diseño y particiones](https://kafka.apache.org/39/design/design/).

**Comprobá lo aprendido:**

- Sé definir cluster y broker.
- Sé explicar dónde vive el orden.
- Sé explicar para qué sirve una key.
