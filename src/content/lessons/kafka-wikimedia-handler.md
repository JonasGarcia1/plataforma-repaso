## Concepto

SSE mantiene una conexión HTTP abierta donde el servidor envía cambios. El ejemplo construye un BackgroundEventSource con un BackgroundEventHandler; ese adaptador delega la publicación en WikimediaChangesProducer. Separar responsabilidades permite cambiar la fuente sin reescribir el consumidor.

onMessage recibe el data del cambio de Wikimedia; el handler no sabe cómo se guarda después porque solo publica al topic.

El recorrido de esta práctica:

1. Activar el perfil wikimedia para la fuente real.
2. ApplicationRunner construye BackgroundEventSource.
3. onMessage recibe payload y nombre de evento.
4. WikimediaChangesProducer delega en KafkaTemplate.

## Ejemplo

Fragmento del handler SSE real; requiere el proyecto y la librería okhttp-eventsource.

```java
@Override
public void onMessage(String event, MessageEvent messageEvent) {
    producer.send(event == null ? "wikimedia" : event,
                  messageEvent.getData());
}
```

## En entrevista

**Pregunta:** ¿Por qué no persistir desde el handler SSE?

**Breve:** Acoplaría la lectura externa a la latencia y disponibilidad de MySQL.

**Ampliada:** SSE es un flujo HTTP unidireccional. BackgroundEventSource separa su ejecución del arranque principal, pero eso no elimina límites de buffers ni posibles esperas del producer. Supervisaría errores, reconexión y cierre ordenado del recurso.

## Error frecuente

El handler no selecciona la key por artículo y los envíos asíncronos tampoco garantizan buffering infinito. No atribuyas al ejemplo un control de backpressure completo.

## Práctica

El handler usa event como key. ¿Eso ordena cambios por artículo? ¿Qué ocurre si todos llegan con el mismo nombre de evento?

### Pista

El parámetro event no es automáticamente el ID de un artículo.

### Solución

No asegura afinidad por artículo. Si el nombre se repite, esa key concentra mensajes en una partición. Para orden por artículo habría que extraer una identidad estable del payload y validar el contrato. Esa sería una modificación del backend, no un comportamiento existente.

## Profundización

El perfil wikimedia abre red externa y produce un flujo continuo; comenzá con local para practicar de forma reproducible. El runner actual no expone un cierre gestionado explícito del BackgroundEventSource: antes de usar el patrón en producción, definiría su ciclo de vida y límites.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Runner SSE:** `springboot-kafka-roadmap-course/wikimedia-producer/src/main/java/com/interviewlab/wikimediaproducer/stream/WikimediaStreamRunner.java`. Handler asíncrono del stream real.
- **Producer adaptador:** `springboot-kafka-roadmap-course/wikimedia-producer/src/main/java/com/interviewlab/wikimediaproducer/kafka/WikimediaChangesProducer.java`. Publica sin acoplar el handler al cliente.

**Comprobá lo aprendido:**

- Sé explicar SSE.
- Sé ubicar onMessage.
- Sé distinguir perfil local de wikimedia.

