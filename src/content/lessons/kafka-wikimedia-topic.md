## Concepto

El topic Wikimedia es el contrato entre dos aplicaciones. Externalizar su nombre en YAML permite cambiar ambientes sin dispersar strings y deja claro dónde se concentra la infraestructura.

El producer puede pasar de wikimedia.recentchange.v1 a otro nombre por perfil sin editar el método send.

El recorrido de esta práctica:

1. Declarar NewTopic en producer.
2. Configurar app.topic.
3. Inyectar el valor en WikimediaChangesProducer.
4. Verificar el topic en Kafka UI.

## Ejemplo

Fragmento parcial de propiedades; cada servicio mantiene su propia configuración.

```yaml
app.topic: wikimedia.recentchange.v1
spring:
  kafka:
    bootstrap-servers: ${KAFKA_BOOTSTRAP_SERVERS:localhost:29092}
```

## En entrevista

**Pregunta:** ¿Por qué poner el topic en properties?

**Breve:** Permite cambiarlo por ambiente sin tocar la lógica ni recompilar.

**Ampliada:** Externalizar el nombre permite ajustar ambientes sin recompilar, pero sigue siendo un contrato compartido. Un cambio de topic no transporta offsets ni migra el histórico. El sufijo de versión tampoco verifica compatibilidad por sí solo.

## Error frecuente

Cambiar el nombre del topic no migra consumidores existentes: coordiná productor, consumer y retención durante una transición.

## Práctica

Cambiás app.topic solo en el producer. Los envíos no fallan, pero MySQL deja de recibir nuevos datos. Explicá por qué.

### Pista

Configuración centralizada dentro de una app no sincroniza otra app.

### Solución

El producer publica en el nuevo canal y el consumer sigue suscrito al anterior. Compararía configuración efectiva de ambos, topics existentes y offsets. La transición exige coordinar lectores, productores y datos, manteniendo una ventana compatible cuando corresponda.

## Profundización

Las variables de entorno cambian la configuración del artefacto, no autorizan acceso a cualquier broker. Para producción también se necesitarían autenticación, cifrado y permisos por topic. El entorno Compose mostrado es local y pedagógico.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Topic config:** `springboot-kafka-roadmap-course/wikimedia-producer/src/main/java/com/interviewlab/wikimediaproducer/kafka/WikimediaTopicConfig.java`. Declara el canal entre los microservicios.
- **YAML producer:** `springboot-kafka-roadmap-course/wikimedia-producer/src/main/resources/application.yml`. Externaliza broker, topic y perfiles.

**Comprobá lo aprendido:**

- Sé encontrar app.topic.
- Sé localizar NewTopic.
- Sé ver el topic en Kafka UI.

