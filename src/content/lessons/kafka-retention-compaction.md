## Concepto

Con `cleanup.policy=delete`, Kafka elimina segmentos antiguos según límites como `retention.ms` o `retention.bytes`. La retención define cuánto tiempo o espacio queda disponible para que los consumers lean o vuelvan a leer; Kafka no espera a que cada consumer confirme antes de limpiar los datos vencidos.

Con `cleanup.policy=compact`, un cleaner trabaja en segundo plano y conserva al menos el valor más reciente conocido para cada key dentro de una partición. Los registros más nuevos pueden convivir con versiones anteriores hasta que la compactación avance. Los offsets originales no se renumeran, así que leer puede mostrar huecos. Un record con key y value `null` es un tombstone que marca una eliminación lógica; también se conserva por un período antes de limpiarse.

Para pedidos, un topic de hechos `PedidoCreado`, `PedidoPagado` y `PedidoEnviado` suele requerir una ventana de historia. Un topic de estado `pedido-id → estado-actual` puede usar compactación si su objetivo es reconstruir el último estado por key. Compactar no es archivar toda la historia ni deduplicar operaciones de negocio.

## Ejemplo

```text
pedidos.eventos (delete): creado → pagado → enviado → historia dentro de retención

pedidos.estado (compact): pedido-42 → creado
                         pedido-42 → pagado
                         pedido-42 → enviado
                         tras limpieza: puede quedar el último valor por key
```

La limpieza no ocurre necesariamente al publicar el tercer record; se realiza de forma asíncrona sobre segmentos elegibles.

## En entrevista

**Pregunta:** ¿Qué elegirías para reconstruir el estado actual de cada pedido?

**Breve:** Un topic compactado con una key estable por pedido puede conservar el último valor de cada key.

**Ampliada:** Primero definiría si necesito todos los hechos para auditar o solo el último estado para reconstruir una tabla. Retención por tiempo/tamaño conserva una ventana de log y elimina segmentos antiguos. Compactación conserva el valor más reciente por key, con limpieza eventual; tombstones y retención de tombstones también afectan la reconstrucción.

## Error frecuente

No asumas que compactación borra duplicados inmediatamente, que elimina versiones en el momento o que los offsets se vuelven consecutivos. Tampoco uses un topic compactado como sustituto de una política de auditoría si la historia completa debe conservarse.

## Práctica

Un pedido publica tres cambios con key `pedido-42`. El equipo quiere que una aplicación nueva reconstruya el estado actual, pero auditoría necesita cada transición por un año. ¿Qué topics y políticas evaluarías?

### Pista

Estado actual e historial completo son dos necesidades de lectura distintas.

### Solución

Mantendría un topic de eventos con política y retención acordes a la obligación de auditoría. Para restaurar rápidamente el último estado, evaluaría un topic compactado separado, con una key estable por pedido y valores que representen el estado completo necesario. Probaría la reconstrucción incluyendo tombstones y no asumiría que compaction terminó al momento de la escritura.

## Profundización

`delete` y `compact` pueden configurarse juntos (`delete,compact`), combinando eliminación por retención con limpieza por key. El costo y la recuperación dependen de cantidad de particiones, volumen, tamaño de segmentos y velocidad de consumers. Definí retención como requisito de recuperación: si un consumer queda atrás más que la ventana disponible, necesitará otra fuente para recomponer datos.

**Fuentes oficiales:** [Apache Kafka 3.9: topic-level configs](https://kafka.apache.org/39/configuration/topic-level-configs/), [Apache Kafka 3.9: log compaction](https://kafka.apache.org/39/design/design/), [Apache Kafka: diseño y compactación](https://kafka.apache.org/39/design/design/).

**Comprobá lo aprendido:**

- Sé comparar política `delete` y `compact`.
- Sé explicar cuándo se limpia un tombstone.
- Sé elegir entre un topic de eventos y uno de estado.
