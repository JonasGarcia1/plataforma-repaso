# Integración del banco Spring Boot + Kafka

Las 40 preguntas del curso `springboot-kafka-course/src/course-data.js` se integraron semánticamente en el banco inicial: **33 preguntas nuevas**, **4 ampliaciones de preguntas existentes** y **3 formulaciones adicionales agrupadas con preguntas nuevas**. La ampliación junior a senior posterior lleva la plataforma a **195 preguntas** y **52 quizzes**; las ocho preguntas de Kafka de esta revisión se conservan, dos por cada unidad 17–20.

Los IDs previos se conservan para mantener resultados guardados. Las preguntas nuevas usan IDs `q-kafka-*` y los quizzes `quiz-kafka-*`. Los enlaces emplean las lecciones `kafka-*` integradas; los ejemplos locales mantienen la referencia al laboratorio `springboot-kafka-roadmap-course`.

Se quitaron los campos de procedencia de todas las preguntas y se retiraron los inventarios y scripts de auditoría que dependían de documentos personales. No cambia el contenido pedagógico ajeno a las cuatro ampliaciones señaladas.

## Cobertura de las 40 preguntas

La posición corresponde al orden del banco del curso. Una agrupación reúne explicaciones que responden al mismo problema sin generar tarjetas repetidas.

| N.º | Tema del curso | ID integrado | Tratamiento |
|---:|---|---|---|
| 1 | Kafka | q-kafka-overview | Nueva |
| 2 | Topic | q-kafka-topic | Nueva |
| 3 | Partición | q-kafka-particion | Nueva |
| 4 | Broker | q-kafka-broker | Nueva |
| 5 | ZooKeeper / KRaft | q-kafka-kraft-zookeeper | Nueva |
| 6 | Producer | q-kafka-producer | Nueva |
| 7 | Consumer | q-kafka-consumer-pull | Nueva, agrupada con 20 y 34 |
| 8 | Consumer group | q-kafka-grupos | Ampliación conservando ID |
| 9 | Offset | q-kafka-offset | Nueva |
| 10 | Tolerancia a fallos | q-kafka-tolerancia-fallos | Nueva |
| 11 | Replication factor | q-kafka-replication-factor | Nueva |
| 12 | Leader, follower e ISR | q-kafka-isr | Nueva |
| 13 | Retención | q-kafka-retencion | Nueva |
| 14 | Exactly-once | q-kafka-exactly-once | Nueva |
| 15 | Transacciones | q-kafka-transacciones | Nueva |
| 16 | Kafka Streams | q-kafka-streams | Nueva |
| 17 | Compactación | q-kafka-compactacion | Nueva |
| 18 | Throughput | q-kafka-throughput | Nueva |
| 19 | Cuándo no usar Kafka | q-kafka-cuando-no | Nueva |
| 20 | Pull / push | q-kafka-consumer-pull | Agrupada con 7 |
| 21 | KafkaTemplate | q-kafka-template | Nueva |
| 22 | KafkaListener | q-kafka-listener | Nueva |
| 23 | HTTP 202 | q-kafka-http-202 | Nueva |
| 24 | Validar DTO | q-kafka-validacion-dto | Nueva |
| 25 | Responsabilidades de módulos | q-kafka-modulos-laboratorio | Nueva |
| 26 | Inyección por constructor | q-spring-boot | Ampliación conservando ID |
| 27 | Mock de KafkaTemplate | q-kafka-template-mock | Nueva |
| 28 | Prueba E2E | q-kafka-e2e | Nueva |
| 29 | Proyección | q-kafka-proyeccion | Nueva, agrupada con 30 |
| 30 | GET y consulta a MySQL | q-kafka-proyeccion | Agrupada con 29 |
| 31 | Lob | q-kafka-jpa-lob | Nueva |
| 32 | Migraciones | q-kafka-migraciones | Nueva |
| 33 | Diagnosticar GET vacío | q-kafka-diagnostico-vacio | Nueva |
| 34 | Backpressure | q-kafka-consumer-pull | Agrupada con 7 |
| 35 | Logs del evento | q-logging | Ampliación conservando ID |
| 36 | Key de negocio | q-kafka-key-negocio | Nueva |
| 37 | API idempotente | q-rest-http | Ampliación conservando ID |
| 38 | Límites de Compose | q-kafka-compose-limites | Nueva |
| 39 | Configuración externa | q-kafka-config-externa | Nueva |
| 40 | Evolución JSON | q-kafka-evolucion-json | Nueva |

## Precisión técnica

- El modo ZooKeeper se identifica como histórico; las instalaciones Kafka 4.x usan KRaft.
- La afinidad de una key requiere particionamiento consistente; cambiar la cantidad de particiones puede afectar la distribución.
- Pull no limita automáticamente colas internas ni evita que un consumidor lento supere la retención.
- Replicación, ISR, confirmaciones e idempotencia se distinguen de una garantía de efectos únicos en MySQL.
- Una transacción no significa que todos los consumidores vean todos los topics simultáneamente.
- La compactación es asíncrona y la conservación de tombstones tiene límites.
- `@Lob` depende del dialecto y no valida JSON ni implica ausencia de límites.
- 202, mock y prueba E2E explican exactamente qué resultado comprueban y qué queda fuera.

Se cotejaron las garantías con [el diseño oficial de Kafka](https://kafka.apache.org/41/design/design/) y [el envío de mensajes en Spring Kafka](https://docs.spring.io/spring-kafka/reference/kafka/sending-messages.html). El banco distingue teoría de alta disponibilidad de lo comprobable en un laboratorio con un broker.
