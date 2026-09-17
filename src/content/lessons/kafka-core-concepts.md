## Concepto

Un cluster reúne brokers; cada broker almacena particiones. La partición es la unidad de orden y paralelismo. Un offset identifica una posición dentro de esa partición; no es una identidad global ni una cantidad de filas de negocio.

Las ventas de customer-42 con la misma key terminan en la misma partición: se conserva el orden de sus cambios, pero no un orden global entre todos los clientes.

El recorrido de esta práctica:

1. Producer elige topic y opcionalmente key.
2. El particionador decide una partición.
3. El broker anexa el record y asigna offset.
4. El consumer lee y confirma su progreso por partición.

## Ejemplo

Ejemplo conceptual: el mismo número de offset puede existir en particiones distintas.

```text
Topic: pedidos
Partición 0: offset 12 → key=pedido-42
Partición 1: offset 12 → key=pedido-73
Grupo inventario: progreso independiente por partición
Grupo auditoría: otro progreso sobre el mismo topic
```

## En entrevista

**Pregunta:** ¿Kafka garantiza orden global dentro de un topic?

**Breve:** El orden se garantiza por partición. Una key estable ayuda a enrutar una entidad bajo configuración de particionamiento estable.

**Ampliada:** Orden significa orden dentro de una partición. Con particionador y cantidad de particiones estables, una key consistente conserva afinidad. Cambiar el número de particiones puede cambiar el destino de la misma key; no prometería orden histórico global tras ese cambio.

## Error frecuente

Una key estable no garantiza siempre la misma partición si cambiás particionador, número de particiones o asignás partición explícitamente. Más consumidores tampoco aceleran un grupo sin particiones disponibles.

## Práctica

Un topic tiene tres particiones y cinco consumidores de un mismo grupo. ¿Cuántos pueden tener particiones asignadas? ¿Offset 12 identifica un evento global?

### Pista

La asignación clásica reparte particiones, no mensajes individuales sueltos.

### Solución

Como máximo tres miembros de ese grupo tienen asignación. Offset 12 solo identifica posición junto a topic y partición. Otro grupo puede leer esas mismas particiones por su cuenta. Incluso con asignación exclusiva, un fallo y reproceso pueden repetir efectos: el negocio debe tolerarlo.

## Profundización

Los offsets no son contadores de filas que deban ser consecutivos: compactación y registros de control pueden crear huecos en lo visible. Lag suele medirse comparando el final del log y el offset confirmado; eso no prueba que todos los efectos externos se hayan aplicado correctamente.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Topics:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/config/KafkaTopics.java`. Cada NewTopic declara un log lógico con tres particiones.
- **Evento con key:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/model/KeyedEvent.java`. La key de negocio hace que eventos relacionados viajen a la misma partición.
- **Broker/ZooKeeper:** `springboot-kafka-roadmap-course/docker/kafka-zookeeper/server.properties`. Muestra el broker único, sus listeners y su conexión histórica a ZooKeeper.

**Comprobá lo aprendido:**

- Sé definir cluster y broker.
- Sé explicar dónde vive el orden.
- Sé explicar para qué sirve una key.

