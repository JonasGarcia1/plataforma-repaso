## Concepto

Kafka se usa cuando un hecho de negocio debe sobrevivir al proceso que lo produjo y ser aprovechado por varios sistemas. El cambio importante no es una librería: es pensar en eventos inmutables, en vez de llamadas directas entre aplicaciones.

Un checkout publica PedidoCreado. Facturación, stock y analítica pueden leer el mismo evento sin que checkout dependa de esas tres aplicaciones.

El recorrido de esta práctica:

1. Identificá el hecho: por ejemplo, pedido-creado.
2. El producer lo publica en un topic sin conocer a sus lectores.
3. Cada consumer group decide cuándo y cómo procesarlo.

## Ejemplo

Diagrama conceptual de lectura; no ejecuta servicios.

```text
Fuente → Producer → Topic / particiones → Consumer group → Proyección
                           └────────────→ Otro group → Otro resultado
```

## En entrevista

**Pregunta:** ¿Por qué Kafka no es solo una cola?

**Breve:** Porque conserva eventos como un log duradero: varios grupos pueden leerlos y reprocesarlos según sus propios offsets.

**Ampliada:** Para un pedido creado usaría grupos separados si stock y notificaciones requieren todos los eventos. Un consumidor que lee no borra el registro. Tampoco consultaría pedidos por ID directamente sobre un topic: construiría una proyección para esa consulta.

## Error frecuente

No trates un topic como una tabla SQL: Kafka entrega un flujo secuencial; las consultas se resuelven con consumers, proyecciones o herramientas específicas.

## Práctica

Explicá qué sucede si Inventario se detiene diez minutos mientras Notificaciones sigue activo.

### Pista

Cada grupo mantiene progreso independiente, pero la retención del topic es finita.

### Solución

Notificaciones puede continuar. Inventario acumula retraso y, al volver, retoma sus offsets si los registros aún están retenidos. Si la retención los eliminó, Kafka no puede reconstruirlos por sí solo. La recuperación exige capacidad suficiente y un mecanismo externo cuando ya no existe el histórico.

## Profundización

El laboratorio tiene un broker y fines educativos. Distingue los topics learning.* del circuito wikimedia.recentchange.v1. Los primeros solo producen logs pedagógicos; el segundo alimenta MySQL. La plataforma web no inicia Java ni Docker.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **README.md:** `springboot-kafka-roadmap-course/README.md`. Describe el objetivo, la arquitectura y el orden de estudio.
- **Punto de entrada:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/LearningApiApplication.java`. Spring Boot arranca desde esta clase y descubre los beans del módulo.

**Comprobá lo aprendido:**

- Sé explicar qué es un evento.
- Sé distinguir topic de endpoint REST.
- Sé nombrar dos consumers independientes del mismo evento.

