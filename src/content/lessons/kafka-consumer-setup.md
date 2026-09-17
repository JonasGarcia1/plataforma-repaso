## Concepto

El consumer real configura su identidad de group, cómo reinicia y cómo llega a MySQL. Es una aplicación autónoma: tiene su puerto, su YAML y su Swagger aunque consuma datos publicados por otro módulo.

Un group nuevo con earliest puede cargar eventos ya retenidos; si ya confirmó offsets, sigue desde su última posición sin releer todo.

El recorrido de esta práctica:

1. Definí bootstrap server.
2. Asigná wikimedia-database-group.
3. Elegí earliest para grupos nuevos.
4. Configurá datasource con variables de entorno.

## Ejemplo

Fragmento parcial de application.yml del consumer; datasource y serializers se consultan en el archivo local.

```yaml
spring:
  kafka:
    bootstrap-servers: ${KAFKA_BOOTSTRAP_SERVERS:localhost:29092}
    consumer:
      group-id: wikimedia-database-group
      auto-offset-reset: earliest
app.topic: wikimedia.recentchange.v1
```

## En entrevista

**Pregunta:** ¿Cuándo aplica auto-offset-reset=earliest?

**Breve:** Cuando no existe un offset confirmado válido, incluido el caso de una posición fuera de retención.

**Ampliada:** El group-id identifica progreso por partición y permite coordinar instancias. Kafka y datasource son configuraciones diferentes: conectarse al broker no demuestra acceso a MySQL. Revisaría por separado URL, disponibilidad y credenciales de cada dependencia.

## Error frecuente

auto-offset-reset también interviene ante offsets fuera del rango válido, no solamente con grupos nuevos. Retención y replay deben planificarse juntos.

## Práctica

Creás un grupo nuevo cuando el topic conserva solo los últimos dos días. ¿earliest recupera toda la historia del sistema?

### Pista

Earliest se refiere a lo disponible, no a datos ya eliminados.

### Solución

Recupera desde la posición más antigua aún retenida cuando no hay offset válido. No trae eventos anteriores a la retención. Si ya existe progreso válido del grupo, retoma desde allí. Antes de cambiar group-id revisá si volver a persistir el histórico duplicará filas.

## Profundización

El curso usa variables MYSQL_URL, MYSQL_USER y MYSQL_PASSWORD con defaults de laboratorio. No copies esos defaults a producción ni registres credenciales. Para investigar consumer inactivo, revisá suscripción, asignación, errores de persistencia y offsets antes de reiniciarlo repetidamente.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **YAML consumer:** `springboot-kafka-roadmap-course/wikimedia-consumer/src/main/resources/application.yml`. Separa Kafka, JPA, MySQL, puerto y Swagger.
- **POM consumer:** `springboot-kafka-roadmap-course/wikimedia-consumer/pom.xml`. Dependencias Web, Kafka, JPA y MySQL.

**Comprobá lo aprendido:**

- Sé ubicar group-id.
- Sé comparar earliest/latest.
- Sé explicar variables MYSQL_URL.

