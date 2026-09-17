## Concepto

La API REST es una puerta síncrona hacia un flujo asíncrono. Validar en el borde evita publicar basura y 202 Accepted comunica que el trabajo posterior está delegado a Kafka y sus consumers.

Body hola Kafka produce un record; body vacío es rechazado antes de tocar Kafka.

El recorrido de esta práctica:

1. Swagger invoca POST /api/messages.
2. Spring valida @NotBlank.
3. El controller delega en LearningProducer.
4. La respuesta 202 vuelve sin esperar el listener.

## Ejemplo

Petición de práctica local, con Docker y learning-api iniciados por vos.

```powershell
Invoke-RestMethod http://localhost:8080/api/messages `
    -Method Post -ContentType 'text/plain' -Body 'hola Kafka'
```

## En entrevista

**Pregunta:** ¿Por qué 202 y no 201?

**Breve:** El contrato acepta trabajo posterior; 202 no afirma que se haya completado. El estado elegido depende de qué resultado confirma la API.

**Ampliada:** 202 comunica aceptación para procesamiento posterior. 201 correspondería a un recurso cuya creación ya está confirmada, pero no hay una regla universal que prohíba 201 en cualquier arquitectura con Kafka. La elección depende del contrato y de qué resultado se haya completado.

## Error frecuente

No traduzcas 202 como 'persistido en Kafka'. El producer básico no espera confirmación. Tampoco asumas que los mensajes de texto se guardan en la tabla Wikimedia.

## Práctica

Compará enviar 'hola Kafka', enviar solo espacios y recibir 202 sin observar el listener.

### Pista

Separá validación HTTP, aceptación y procesamiento.

### Solución

El texto válido debe alcanzar sendText; solo espacios incumple @NotBlank. Un 202 no demuestra que el consumer terminó ni que MySQL tenga una fila. Revisá el topic learning.text.v1 y sus logs. MySQL pertenece al circuito Wikimedia, no a este endpoint.

## Profundización

El controller devuelve un mapa con status y topic, sin operación consultable ni seguimiento durable. Una API productiva podría devolver un identificador de trabajo y un endpoint de estado. Esa capacidad no existe actualmente en la práctica local.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Controller REST:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/web/LearningController.java`. El método message usa @RequestBody y 202 Accepted.
- **Documentación API:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/web/OpenApiConfiguration.java`. Swagger convierte el navegador en el cliente de práctica.

**Comprobá lo aprendido:**

- Sé probar el endpoint en Swagger.
- Sé explicar @NotBlank.
- Sé justificar el 202.

