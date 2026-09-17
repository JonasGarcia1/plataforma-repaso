# Revisión de contenido Backend

## Entrega

24 lecciones, tres por unidad (09–16), con ocho encabezados pedagógicos estables, prácticas y soluciones. Metadatos en src/content/backend.ts. Redacción en español y ejemplos de pedidos, persistencia y eventos.

## Ejemplos y laboratorios

El laboratorio `springboot-kafka-order-events-lab` permite relacionar pedidos y eventos. El curso adicional `springboot-kafka-roadmap-course` desarrolla publicación, consumo y proyección en MySQL.

El ejercicio de promedio mayor a siete en sede 504 usa un esquema simplificado explicitado para enseñar JOIN/GROUP BY/HAVING; mantiene la condición estricta > 7. El ejercicio de caché razona sobre un catálogo estable y sus límites de actualización.

## Correcciones pedagógicas

- Una subconsulta no es siempre peor que un join; se mide el plan.
- Funciones/procedimientos se invocan según dialecto; PL/SQL está identificado como Oracle.
- Stored procedures que concatenan SQL dinámico no eliminan SQL injection.
- Microservicios y hexagonal no hacen trivial extraer un módulo: datos, contratos, operación y transacciones también cambian.
- HTTP idempotente no exige idénticas respuestas.
- Spring singleton no equivale a instancia global por clase.
- JPA, Hibernate y Spring Data son capas distintas; fetch y cascade tienen propósitos distintos.
- El laboratorio tiene Java 21 y Spring Boot 3.5.16. Su deduplicación en memoria no sobrevive reinicios ni implementa outbox.
- JWT no implica cifrado ni autorización a cualquier recurso; CORS no sustituye autenticación.
- Cobertura no prueba calidad, y exactamente una vez en Kafka no cubre cualquier efecto externo.

## Verificación

Se comprobaron por navegación enlaces oficiales a RFC 9110, Jakarta Servlet, Jackson, Spring Framework 6.2, Spring Data JPA 3.5, Spring Security 6.5, OpenAPI 3.0.3, PostgreSQL, JDBC, JUnit 5.12.2, Mockito, MockServer, Log4j2, Micrometer, OpenTelemetry, Kafka, Redis, Spring Batch, Cockburn, Domain Language y Spring Modulith.

Los enlaces de documentación general pueden mostrar versiones posteriores; los ejemplos están marcados Java 21 / Boot 3 y el recurso Batch indica seleccionar 5.x.

Se revisó estructura de 24 lecciones (348–394 palabras contando código). Los fragmentos de Spring/SQL requieren clases, dependencias o esquemas omitidos y están marcados parciales o conceptuales; no se presentan como programas ejecutados. No se levantaron Kafka, bases ni aplicaciones Java durante esta redacción. La compilación de React y las pruebas de UI pertenecen a la integración de la plataforma.
