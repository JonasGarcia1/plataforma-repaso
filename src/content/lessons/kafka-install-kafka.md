## Concepto

Docker Compose evita instalaciones nativas y hace reproducible el entorno. El broker tiene una dirección interna para contenedores y otra externa para las aplicaciones Windows; confundirlas es una causa frecuente de Connection refused.

El comando CLI corre dentro del contenedor kafka y usa kafka:9092; learning-api corre en Windows y por eso usa localhost:29092.

El recorrido de esta práctica:

1. Abrí una terminal en la raíz de springboot-kafka-roadmap-course.
2. Ejecutá docker compose up --build -d para levantar ZooKeeper, Kafka, MySQL y Kafka UI.
3. Ejecutá docker compose ps y comprobá que los cuatro servicios estén en estado running.
4. Seguí docker compose logs -f kafka hasta que el broker termine de iniciar; Ctrl+C solo deja de mirar logs, no detiene los contenedores.
5. Ejecutá .\mvnw.cmd test para compilar y validar los módulos.
6. Iniciá learning-api, wikimedia-consumer y wikimedia-producer en tres terminales separadas.
7. Abrí Kafka UI en localhost:8088 y luego Swagger en los puertos 8080 y 8081.

## Ejemplo

Comandos para ejecutar manualmente desde springboot-kafka-roadmap-course, con Java 21 y Docker disponibles.

```powershell
docker compose up --build -d
docker compose ps
.\mvnw.cmd test
# En terminales separadas:
.\mvnw.cmd -pl learning-api spring-boot:run
.\mvnw.cmd -pl wikimedia-consumer spring-boot:run
.\mvnw.cmd -pl wikimedia-producer spring-boot:run
```

## En entrevista

**Pregunta:** ¿ZooKeeper es la opción moderna?

**Breve:** No. Está aquí por motivos educativos; Kafka moderno usa KRaft.

**Ampliada:** El bootstrap es el contacto inicial; luego el cliente utiliza direcciones anunciadas por los brokers. Configurar solo el puerto inicial no arregla metadata que anuncia un host inaccesible. El curso conserva Kafka 3.9 con ZooKeeper; Kafka 4 retiró ese modo y usa KRaft.

## Error frecuente

El volumen Kafka puede fallar por permisos en Windows. No borres volúmenes salvo que aceptes perder mensajes y MySQL del laboratorio.

## Práctica

Kafka UI funciona, pero una aplicación Windows intenta conectarse a kafka:9092 y falla. Diagnosticá sin borrar volúmenes.

### Pista

El nombre kafka pertenece a la red de Compose.

### Solución

La aplicación del host usa localhost:29092; Kafka UI y herramientas dentro de Compose usan kafka:9092. Comprobaría variables de entorno, listeners anunciados y disponibilidad. Que Kafka UI abra no significa que learning-api o MySQL hayan iniciado. Evitaría eliminar datos para corregir un error de dirección.

## Profundización

Kafka UI: localhost:8088; Swagger learning-api: localhost:8080/swagger-ui/index.html; Swagger consumer: localhost:8081/swagger-ui.html. Son servicios locales, no publicados por esta plataforma. docker compose down conserva volúmenes; agregar -v los elimina y destruye mensajes y MySQL del laboratorio.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Docker Compose:** `springboot-kafka-roadmap-course/docker-compose.yml`. Define los cuatro servicios del laboratorio.
- **Broker + ZooKeeper:** `springboot-kafka-roadmap-course/docker/kafka-zookeeper/server.properties`. Explica listeners, directorio de logs y ZooKeeper.
- **Configuración local:** `springboot-kafka-roadmap-course/learning-api/src/main/resources/application.yml`. Muestra localhost:29092 como bootstrap server externo.

**Comprobá lo aprendido:**

- Sé listar contenedores activos.
- Sé elegir el bootstrap server correcto.
- Sé explicar ZooKeeper frente a KRaft.

