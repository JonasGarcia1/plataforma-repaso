## Concepto

JSON permite eventos estructurados, pero agrega una responsabilidad: definir un contrato que producer y consumer entiendan igual. JsonDeserializer debe restringir tipos aceptados para no convertir input externo en objetos peligrosos.

UserEvent con id, name y email viaja como JSON; onUser recibe un UserEvent reconstruido, no texto sin tipar.

El recorrido de esta práctica:

1. Modelá el DTO.
2. Configurá JsonSerializer en producer.
3. Configurá JsonDeserializer con tipo confiable.
4. Asociá la factory JSON al listener correspondiente.

## Ejemplo

Fragmento parcial de la configuración Java 21 / Spring Kafka 3; props e imports omitidos.

```java
props.put(JsonDeserializer.TRUSTED_PACKAGES,
    "com.interviewlab.learning.model");
props.put(JsonDeserializer.VALUE_DEFAULT_TYPE, UserEvent.class.getName());
props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
    StringDeserializer.class);
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
    JsonDeserializer.class);
```

## En entrevista

**Pregunta:** ¿Por qué limitar tipos al deserializar?

**Breve:** Permite restringir tipos aceptados; no reemplaza validación de estructura, obligatoriedad ni reglas de negocio.

**Ampliada:** La key sigue siendo String y el value utiliza JSON. El consumidor debe acordar esquema y tipos aceptados. Headers de tipos Java pueden acoplar nombres de clase entre aplicaciones; un contrato entre tecnologías no debería depender accidentalmente de paquetes internos.

## Error frecuente

No habilites paquetes confiables demasiado amplios como solución rápida; restringí el deserializer al modelo del laboratorio.

## Práctica

¿Restringir trusted packages asegura que el email sea válido y que el usuario exista?

### Pista

Tipo permitido, estructura de datos y reglas de negocio son controles diferentes.

### Solución

No. La configuración restringe tipos que el deserializador puede materializar; no ejecuta automáticamente validaciones de negocio ni comprueba una base. Definí contrato, límites de tamaño y validación en el punto adecuado. Otros productores podrían publicar sin pasar por la API REST del curso.

## Profundización

El serializer define el formato en bytes; [contratos de eventos que evolucionan](/leccion/u25-a) explica por qué un JSON válido todavía puede romper a un consumidor anterior.

El curso usa userListenerFactory para UserEvent y keyedListenerFactory para KeyedEvent. No cambies trusted packages a un comodín solo para silenciar un error. Primero verificá tipo esperado, headers y origen del productor.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Configuración JSON:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/config/KafkaClientConfig.java`. Explica serializers, deserializers y trusted packages.
- **Contrato DTO:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/model/UserEvent.java`. El record Java define el payload JSON.

**Comprobá lo aprendido:**

- Sé ubicar JsonSerializer.
- Sé explicar trusted packages.
- Sé comparar String con JSON.
