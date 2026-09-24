## Concepto

Un rebalance vuelve a asignar particiones a los miembros de un consumer group. Puede ocurrir al entrar o salir un consumer, cambiar la suscripción o perderse la señal de que un miembro sigue activo. Durante la transición puede pausarse parte del consumo; los offsets confirmados determinan desde dónde continúan los nuevos propietarios.

En un grupo, una partición solo puede tener un consumer miembro asignado a la vez. Por eso la cantidad de particiones limita el paralelismo máximo de ese grupo: con tres particiones, sumar una cuarta instancia no crea trabajo adicional si no se agregan particiones. Si hay más consumidores que particiones, algunos quedan sin asignación.

Para procesar pedidos, aumentar instancias ayuda cuando las particiones reciben carga equilibrada y el procesamiento permite esa concurrencia. Una partición caliente por una key muy repetida puede seguir acumulando lag aunque queden consumers libres.

## Ejemplo

```text
Topic pedidos: 3 particiones
Grupo stock antes: consumer A → p0, p1 | consumer B → p2
Grupo stock después de escalar a 5: solo 3 miembros pueden tener asignación
Grupo notificaciones: mantiene asignación y offsets propios
```

El reparto exacto depende del assignor y del protocolo del grupo.

## En entrevista

**Pregunta:** ¿Agregar consumers siempre reduce el lag?

**Breve:** No; el grupo necesita particiones disponibles y trabajo distribuido entre ellas.

**Ampliada:** Una nueva instancia provoca una asignación de particiones según el protocolo y el assignor. El número de particiones pone un límite al paralelismo activo de un grupo, y una key dominante puede concentrar la carga en una sola partición. Antes de escalar, mediría lag por partición, tiempo de procesamiento, dependencias externas y frecuencia de rebalances.

## Error frecuente

No escales consumidores indefinidamente esperando más throughput, ni reinicies procesos repetidamente ante lag: ambos pueden forzar rebalances sin aumentar capacidad útil. Añadir particiones también puede cambiar el mapeo de una key con el particionador por defecto; revisá el requisito de orden antes del cambio.

## Práctica

Un topic de pedidos tiene tres particiones y dos consumers en el grupo `stock`. El equipo escala a cinco instancias, pero el lag de la partición 0 sigue creciendo. ¿Qué gana con el escalado y qué medirías ahora?

### Pista

Separá el número total de procesos del número y distribución de particiones asignadas.

### Solución

Hay como máximo tres miembros activos con particiones asignadas; dos instancias adicionales no aumentan el paralelismo de ese topic en ese grupo. Revisaría lag y tasa de entrada por partición, distribución de keys, duración de cada pedido y cuellos de botella como MySQL. Si una key concentra eventos, escalar puede dejar libre capacidad en otras particiones sin aliviar la caliente.

## Profundización

El cliente clásico usa heartbeats, session timeout y límites como `max.poll.interval.ms` para detectar miembros que no progresan según lo esperado. Spring Kafka puede ejecutar varios consumers por listener container mediante `concurrency`, pero la asignación sigue limitada por las particiones disponibles. La estrategia incremental y los protocolos nuevos dependen de la versión de broker y cliente; no supongas que las opciones de Kafka 4.x aplican al laboratorio Kafka 3.9.

**Fuentes oficiales:** [Apache Kafka 3.9: consumer groups](https://kafka.apache.org/39/design/design/), [Apache Kafka 3.9: consumer configs](https://kafka.apache.org/39/configuration/consumer-configs/), [Spring Kafka 3.3: listener containers y concurrency](https://docs.spring.io/spring-kafka/reference/3.3/kafka/receiving-messages/message-listener-container.html).

**Comprobá lo aprendido:**

- Sé explicar qué provoca un rebalance.
- Sé relacionar particiones y paralelismo de un grupo.
- Sé diagnosticar por qué una partición caliente mantiene lag.
