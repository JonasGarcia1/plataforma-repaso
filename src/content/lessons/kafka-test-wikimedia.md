## Concepto

Las pruebas unitarias validan la intención del código de forma rápida; las pruebas integradas validan que componentes reales se comuniquen. Necesitás ambas para distinguir un error de lógica de un error de infraestructura.

WikimediaChangesProducerTest no abre Kafka: verifica que send invoque template.send con wikimedia.recentchange.v1 y local-article-1.

El recorrido de esta práctica:

1. Ejecutá el test con KafkaTemplate mockeado.
2. Verificá topic, key y payload esperados.
3. Levantá Docker y ambos servicios.
4. Consultá MySQL o ejecutá verify-e2e.ps1.

## Ejemplo

Fragmento del test unitario con Mockito; producer y kafkaTemplate se preparan en el test original.

```java
producer.send("local-article-1", "{\"source\":\"local\"}");
verify(kafkaTemplate).send(
    "wikimedia.recentchange.v1",
    "local-article-1",
    "{\"source\":\"local\"}"
);
```

## En entrevista

**Pregunta:** ¿Qué prueba Mockito y qué no?

**Breve:** Prueba la invocación correcta del template; no confirma red, broker ni persistencia.

**Ampliada:** La prueba unitaria aísla la intención de publicación; integración verifica serializers, broker y persistencia. Una verificación fuerte distingue datos de ejecuciones anteriores. La existencia de filas es útil como smoke test, pero insuficiente para garantizar cada envío.

## Error frecuente

verify-e2e.ps1 no compara identidad nueva ni payload y termina con éxito ante cualquier resultado no vacío. No presentarlo como prueba concluyente de entrega del evento recién publicado.

## Práctica

El test de Mockito pasa y verify-e2e.ps1 encuentra una fila. ¿Prueban que el evento de esta ejecución llegó completo?

### Pista

Buscá correlación única y qué observa realmente cada prueba.

### Solución

Mockito solo verifica la invocación del template. El script actual acepta cualquier fila existente, incluso una antigua, y no confirma los listeners de texto/usuarios. Para verificar una entrega nueva usá un identificador exclusivo y comprobá ese registro y su payload con un tiempo límite.

## Profundización

LocalSamplePublisher publica una muestra en cada arranque con key local-article-1. Esa key no es una deduplicación automática: reiniciar puede crear otra fila. El script se conserva como recurso del laboratorio, con este alcance explícito.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Perfil local:** `springboot-kafka-roadmap-course/wikimedia-producer/src/main/java/com/interviewlab/wikimediaproducer/stream/LocalSamplePublisher.java`. Publica el evento fijo al completar el arranque.
- **Prueba unitaria:** `springboot-kafka-roadmap-course/wikimedia-producer/src/test/java/com/interviewlab/wikimediaproducer/kafka/WikimediaChangesProducerTest.java`. Mockea KafkaTemplate y verifica el record.
- **Verificación E2E:** `springboot-kafka-roadmap-course/scripts/verify-e2e.ps1`. Comprueba el flujo cuando los servicios están levantados.

**Comprobá lo aprendido:**

- Sé ejecutar el test del producer.
- Sé definir mock.
- Sé explicar qué cubre E2E.

