## Concepto

Kafka es una plataforma distribuida para publicar y leer flujos de records. Una partición funciona como un log ordenado de solo anexado; los records permanecen según la política de retención y no se eliminan porque un consumer los lea. Productores y grupos de consumidores pueden trabajar a ritmos diferentes.

Un checkout publica PedidoCreado. Facturación, stock y analítica pueden leer el mismo evento sin que checkout dependa de esas tres aplicaciones.

El recorrido conceptual:

1. Identificá el hecho: por ejemplo, pedido-creado.
2. El producer lo publica en un topic sin conocer a sus lectores.
3. Cada consumer group procesa el flujo con su propio progreso.

El log no es una cola que asigna un record a un único consumidor global ni una base consultable por clave. Si varios sistemas necesitan el evento, cada grupo conserva su posición independiente. La lección de consumer groups y offsets explica esa asignación y progreso con más detalle.

## Ejemplo

Diagrama conceptual de lectura; no ejecuta servicios.

```text
Fuente → Producer → Topic / particiones → Consumer group → Proyección
                           └────────────→ Otro group → Otro resultado
```

## En entrevista

**Pregunta:** ¿Por qué Kafka no es solo una cola?

**Breve:** Porque conserva eventos como un log duradero: varios grupos pueden leerlos y reprocesarlos según sus propios offsets.

**Ampliada:** Para `PedidoCreado`, stock y notificaciones pueden usar grupos separados si ambos deben procesar todos los eventos. Leer no borra el record. Kafka puede retenerlo para replay durante la ventana configurada; para consultar pedidos por ID construiría una proyección adecuada, en vez de buscar dentro del topic.

## Error frecuente

No confundas el log con una cola que borra al leer ni con una tabla SQL. Los offsets permiten continuar o volver a leer mientras los records sigan retenidos; las consultas de negocio suelen resolverse con consumers y proyecciones.

## Práctica

Diseñá el recorrido de `PedidoCreado` para Inventario y Notificaciones. ¿Qué permite que una caída de Inventario no detenga Notificaciones?

### Pista

Los records están en el topic; los offsets confirman progreso por grupo y partición.

### Solución

Publicaría el evento una vez en el topic y asignaría un group id a cada consumidor lógico. Notificaciones avanza su progreso aunque Inventario esté detenido. Al volver, Inventario retoma su propio offset confirmado mientras los records necesarios sigan disponibles. Si la retención ya los eliminó, debe existir una fuente externa o procedimiento de recuperación; `earliest` no recupera datos borrados.

## Profundización

Kafka conviene cuando varios lectores independientes necesitan un flujo durable, desacoplamiento temporal o la posibilidad de reprocesar. Una llamada HTTP sencilla puede ser más clara si el emisor necesita una respuesta inmediata del destinatario. Elegir eventos exige definir contrato, retención, manejo de duplicados y cómo consultar el resultado, además de publicar.

Seguí con [conceptos centrales y terminología](/leccion/kafka-core-concepts) para ubicar el registro dentro de topic, partición y broker. El entorno y los proyectos llegan después de las unidades conceptuales.

**Fuente oficial:** [Apache Kafka 3.9: diseño y garantías](https://kafka.apache.org/39/design/design/).

**Comprobá lo aprendido:**

- Sé explicar qué es un evento.
- Sé distinguir topic de endpoint REST.
- Sé nombrar dos consumers independientes del mismo evento.
