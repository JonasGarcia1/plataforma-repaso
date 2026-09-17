## Concepto

El multi-módulo separa compilación, dependencias y puntos de entrada sin perder un build común. Es útil para estudiar límites claros antes de decidir despliegues y repositorios separados.

learning-api depende de Spring Web y Kafka; wikimedia-consumer agrega JPA y MySQL porque esa responsabilidad no corresponde al producer.

El recorrido de esta práctica:

1. El parent POM lista módulos.
2. Cada módulo declara dependencias mínimas.
3. Cada aplicación tiene su @SpringBootApplication.
4. Maven ejecuta el reactor completo desde la raíz.

## Ejemplo

Comandos manuales desde la raíz del backend con Java 21 configurado.

```powershell
.\mvnw.cmd test
.\mvnw.cmd -pl wikimedia-producer test
.\mvnw.cmd -pl wikimedia-consumer spring-boot:run
```

## En entrevista

**Pregunta:** ¿Multi-módulo implica microservicios?

**Breve:** No necesariamente; aquí sí lo son porque corren y escalan como aplicaciones separadas.

**Ampliada:** El reactor compila módulos con sus dependencias. -pl selecciona proyectos; si uno depende de módulos hermanos puede necesitar -am o que estén instalados. No copiaría dependencias JPA a Wikimedia producer solo por compartir POM padre.

## Error frecuente

Un monolito puede estar bien modularizado. Multi-módulo no significa automáticamente microservicios ni independencia operativa.

## Práctica

Un proyecto tiene cuatro módulos Maven pero produce un único ejecutable. ¿Es una arquitectura de cuatro microservicios?

### Pista

La organización del build y la unidad de despliegue son dimensiones diferentes.

### Solución

No. Multi-módulo permite organizar responsabilidades y dependencias, incluso dentro de un monolito modular. En este laboratorio existen aplicaciones con puntos de entrada separados. Para hablar de independencia real también debemos revisar datos, contratos, despliegue y operación.

## Profundización

advanced-labs es el cuarto módulo, opcional y con puerto 8082. Incluye configuración de topics, servicio transaccional y StreamTopology. Su presencia en el reactor no inicia sus procesos automáticamente. Revisá README y sus requisitos antes de ejecutarlo.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Parent POM:** `springboot-kafka-roadmap-course/pom.xml`. Lista learning-api, producer, consumer y advanced-labs.
- **Entrada producer:** `springboot-kafka-roadmap-course/wikimedia-producer/src/main/java/com/interviewlab/wikimediaproducer/WikimediaProducerApplication.java`. Proceso Spring Boot independiente.
- **Entrada consumer:** `springboot-kafka-roadmap-course/wikimedia-consumer/src/main/java/com/interviewlab/wikimediaconsumer/WikimediaConsumerApplication.java`. Proceso Spring Boot independiente.

**Comprobá lo aprendido:**

- Sé leer el reactor Maven.
- Sé identificar el POM padre.
- Sé explicar por qué consumer incluye JPA.

