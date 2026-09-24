## Concepto

Un consumer group representa una suscripción lógica. Kafka asigna las particiones suscritas entre los miembros activos del grupo; en el protocolo clásico, una partición se asigna a un solo miembro del grupo a la vez. Un grupo distinto puede leer el mismo topic de forma independiente.

El progreso confirmado se guarda por group id, topic y partición, dentro del topic interno `__consumer_offsets`. Un record tiene un offset dentro de su partición; el offset confirmado indica desde dónde puede continuar el grupo. En el cliente Kafka, el commit guarda la posición siguiente que se leerá, por eso no conviene interpretar el número como “último efecto de negocio confirmado”.

Para `PedidoCreado`, Stock y Notificaciones usan grupos diferentes si ambos deben recibir cada pedido. Dos instancias de Stock con el mismo group id reparten sus particiones; no reciben cada una una copia completa.

## Ejemplo

Ejemplo conceptual: el avance no pertenece al topic en común, sino a cada grupo y partición.

```text
Topic pedidos
  partición 0: ... offset 41 → PedidoCreado(pedido-42)
  partición 1: ... offset 18 → PedidoCreado(pedido-73)

Grupo stock:         progreso propio en p0 y p1
Grupo notificaciones: otro progreso propio en p0 y p1
```

## En entrevista

**Pregunta:** ¿Qué pasa con los mensajes cuando se reinicia un consumer?

**Breve:** El grupo reanuda desde su offset confirmado; puede releer records posteriores si el procesamiento ocurrió antes de confirmar el avance.

**Ampliada:** Los offsets se guardan por grupo y partición, no por instancia del proceso. Si dos aplicaciones usan el mismo group id, cooperan en el mismo consumo. Un grupo nuevo no tiene posición confirmada y puede comenzar según `auto.offset.reset`. En Kafka, `earliest` aplica cuando no existe un offset válido; no obliga a rebobinar un grupo que ya tiene uno.

## Error frecuente

No confundas el offset del record con el commit del grupo ni supongas que `earliest` significa “volver al principio cada vez”. Tampoco el commit confirma automáticamente una escritura en MySQL: son operaciones separadas salvo que se diseñe una coordinación específica.

## Práctica

Stock y Notificaciones consumen `pedidos`. Stock se detiene luego de procesar un pedido, antes de confirmar el avance; Notificaciones continúa con su grupo. ¿Qué ocurre cuando Stock vuelve?

### Pista

Cada grupo tiene avance separado, y el efecto de la aplicación y el commit del offset no son una sola transacción.

### Solución

Notificaciones conserva su propio progreso y no queda bloqueado por Stock. Si el efecto de Stock se guardó pero el grupo todavía no confirmó ese record, puede volver a procesarlo. Stock debe hacer el efecto idempotente o deduplicarlo con una identidad durable. Al volver también necesita que el record siga dentro de la retención configurada.

## Profundización

En Spring Kafka, `@KafkaListener` y su listener container administran la interacción con el consumer. `groupId`, `enable.auto.commit` y `AckMode` cambian cómo se identifica el grupo y cuándo se confirman posiciones; entender el comportamiento efectivo del container importa más que inferirlo del retorno de un método listener. `auto.offset.reset` es una política de inicio cuando Kafka no dispone de una posición válida, no una política de replay permanente.

**Fuentes oficiales:** [Apache Kafka 3.9: introducción a consumers y groups](https://kafka.apache.org/39/design/design/), [Apache Kafka 3.9: consumer configs](https://kafka.apache.org/39/configuration/consumer-configs/), [Spring Kafka 3.3: listener containers y commits](https://docs.spring.io/spring-kafka/reference/3.3/kafka/receiving-messages/message-listener-container.html).

**Comprobá lo aprendido:**

- Sé distinguir offset del record y progreso confirmado del grupo.
- Sé explicar por qué dos grupos independientes pueden procesar el mismo evento.
- Sé predecir cuándo una caída puede repetir el efecto.
