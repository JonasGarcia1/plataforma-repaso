import type { Lesson } from '../types';

// Unidades 17–20 conservan el recorrido práctico original; U17 incorpora un fundamento
// de consumer groups y U39 reúne fundamentos operativos avanzados de Kafka.
export const kafkaLessons: Lesson[] = [
  {
    "id": "kafka-overview",
    "unitId": 17,
    "title": "Apache Kafka: overview",
    "description": "Ubicá producer, broker, topic, consumer y base de datos antes de escribir configuración.",
    "minutes": 8,
    "tags": [
      "Kafka",
      "event streaming",
      "producer",
      "broker",
      "consumer",
      "retención"
    ],
    "objectives": [
      "Ubicá producer, broker, topic, consumer y base de datos antes de escribir configuración.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [],
    "resources": [
      {
        "title": "Apache Kafka: documentación",
        "url": "https://kafka.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "kafka-core-concepts",
    "unitId": 17,
    "title": "Conceptos centrales y terminología",
    "description": "Diferenciá topic, partición y offset; son los tres niveles que aparecen una y otra vez en logs, Kafka UI y entrevistas.",
    "minutes": 8,
    "tags": [
      "topics",
      "particiones",
      "offset",
      "key",
      "consumer groups",
      "lag"
    ],
    "objectives": [
      "Diferenciá topic, partición y offset; son los tres niveles que aparecen una y otra vez en logs, Kafka UI y entrevistas.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": ["kafka-overview"],
    "resources": [
      {
        "title": "Apache Kafka: documentación",
        "url": "https://kafka.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "kafka-install-kafka",
    "unitId": 18,
    "title": "Instalar y configurar Apache Kafka",
    "description": "Entendé los puertos del entorno: Kafka interno usa kafka:9092 y las aplicaciones Windows usan localhost:29092.",
    "minutes": 8,
    "tags": [
      "Docker",
      "Kafka 3.9",
      "ZooKeeper",
      "KRaft",
      "listeners",
      "puertos"
    ],
    "objectives": [
      "Entendé los puertos del entorno: Kafka interno usa kafka:9092 y las aplicaciones Windows usan localhost:29092.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "kafka-groups-offsets"
    ],
    "resources": [
      {
        "title": "Kafka 4: KRaft y retirada de ZooKeeper",
        "url": "https://kafka.apache.org/40/getting-started/upgrade/"
      },
      {
        "title": "Apache Kafka: documentación",
        "url": "https://kafka.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "kafka-create-spring",
    "unitId": 18,
    "title": "Crear y preparar el proyecto Spring Boot",
    "description": "Identificá el punto de entrada, las dependencias y el rol de auto-configuración.",
    "minutes": 8,
    "tags": [
      "Spring Boot",
      "Maven",
      "IoC",
      "beans",
      "Java 21",
      "constructor"
    ],
    "objectives": [
      "Identificá el punto de entrada, las dependencias y el rol de auto-configuración.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "kafka-install-kafka"
    ],
    "resources": [
      {
        "title": "Spring Framework 6.2: contenedor IoC",
        "url": "https://docs.spring.io/spring-framework/reference/6.2/core/beans.html"
      }
    ]
  },
  {
    "id": "kafka-groups-offsets",
    "unitId": 17,
    "title": "Consumer groups y offsets",
    "description": "Entendé cómo un grupo distribuye particiones y conserva su progreso independiente.",
    "minutes": 9,
    "tags": ["consumer group", "offsets", "commits", "lag", "replay"],
    "objectives": [
      "Distinguir posición de un record y offset confirmado por un grupo.",
      "Explicar asignación de particiones y progreso independiente por grupo.",
      "Predecir qué puede releer un consumer al reiniciarse."
    ],
    "prerequisites": ["kafka-core-concepts"],
    "resources": [
      { "title": "Apache Kafka 3.9: Consumer groups", "url": "https://kafka.apache.org/39/design/design/" },
      { "title": "Apache Kafka 3.9: Consumer configs", "url": "https://kafka.apache.org/39/configuration/consumer-configs/" },
      { "title": "Spring Kafka 3.3: Listener containers", "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/receiving-messages/message-listener-container.html" }
    ]
  },
  {
    "id": "kafka-string-config",
    "unitId": 18,
    "title": "Configurar producer y consumer para texto",
    "description": "Seguí el camino configuración → factory → producer/listener y encontrá acks=all, group id y earliest.",
    "minutes": 8,
    "tags": [
      "ProducerFactory",
      "ConsumerFactory",
      "KafkaTemplate",
      "StringSerializer",
      "acks",
      "earliest"
    ],
    "objectives": [
      "Seguí el camino configuración → factory → producer/listener y encontrá acks=all, group id y earliest.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Crear y preparar el proyecto Spring Boot"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: publicar mensajes",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/sending-messages.html"
      }
    ]
  },
  {
    "id": "kafka-create-topic",
    "unitId": 18,
    "title": "Crear Kafka topics",
    "description": "Conectá el bean NewTopic con la vista Topics de Kafka UI.",
    "minutes": 8,
    "tags": [
      "NewTopic",
      "particiones",
      "replicación",
      "ISR",
      "compactación",
      "advanced-labs"
    ],
    "objectives": [
      "Conectá el bean NewTopic con la vista Topics de Kafka UI.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Configurar producer y consumer para texto"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: publicar mensajes",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/sending-messages.html"
      }
    ]
  },
  {
    "id": "kafka-producer-string",
    "unitId": 18,
    "title": "Crear un Kafka producer de texto",
    "description": "Seguí el camino servicio → KafkaTemplate → topic learning.text.v1.",
    "minutes": 8,
    "tags": [
      "producer",
      "KafkaTemplate",
      "send",
      "CompletableFuture",
      "acks",
      "texto"
    ],
    "objectives": [
      "Seguí el camino servicio → KafkaTemplate → topic learning.text.v1.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Crear Kafka topics"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: publicar mensajes",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/sending-messages.html"
      }
    ]
  },
  {
    "id": "kafka-rest-string",
    "unitId": 18,
    "title": "Crear REST API para enviar un mensaje",
    "description": "Separá la confirmación HTTP de la ejecución del consumer.",
    "minutes": 8,
    "tags": [
      "REST",
      "202",
      "text/plain",
      "NotBlank",
      "Swagger",
      "asincronía"
    ],
    "objectives": [
      "Separá la confirmación HTTP de la ejecución del consumer.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Crear un Kafka producer de texto"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: publicar mensajes",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/sending-messages.html"
      }
    ]
  },
  {
    "id": "kafka-consumer-string",
    "unitId": 18,
    "title": "Crear un Kafka consumer de texto",
    "description": "Observá un listener, su group id y el offset que avanza tras consumir.",
    "minutes": 8,
    "tags": [
      "KafkaListener",
      "poll",
      "consumer group",
      "rebalance",
      "offset",
      "lag"
    ],
    "objectives": [
      "Observá un listener, su group id y el offset que avanza tras consumir.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Crear REST API para enviar un mensaje"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: recibir mensajes",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/receiving-messages.html"
      }
    ]
  },
  {
    "id": "kafka-json-configuration",
    "unitId": 18,
    "title": "Configurar producer y consumer para JSON",
    "description": "Compará StringSerializer/StringDeserializer con las factories JSON y su seguridad.",
    "minutes": 8,
    "tags": [
      "JSON",
      "JsonSerializer",
      "JsonDeserializer",
      "trusted packages",
      "DTO",
      "contrato"
    ],
    "objectives": [
      "Compará StringSerializer/StringDeserializer con las factories JSON y su seguridad.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Crear un Kafka consumer de texto"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: serialización y deserialización",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/serdes.html"
      }
    ]
  },
  {
    "id": "kafka-json-producer",
    "unitId": 18,
    "title": "Crear producer para mensajes JSON",
    "description": "Relacioná DTO, key, partición y orden por usuario.",
    "minutes": 8,
    "tags": [
      "JSON",
      "UserEvent",
      "key",
      "particionamiento",
      "orden",
      "hot partition"
    ],
    "objectives": [
      "Relacioná DTO, key, partición y orden por usuario.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Configurar producer y consumer para JSON"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: serialización y deserialización",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/serdes.html"
      }
    ]
  },
  {
    "id": "kafka-json-rest",
    "unitId": 18,
    "title": "Crear REST API para enviar JSON",
    "description": "Distinguí validación REST de deserialización Kafka.",
    "minutes": 8,
    "tags": [
      "JSON",
      "Valid",
      "Bean Validation",
      "Email",
      "NotBlank",
      "REST"
    ],
    "objectives": [
      "Distinguí validación REST de deserialización Kafka.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Crear producer para mensajes JSON"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: serialización y deserialización",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/serdes.html"
      }
    ]
  },
  {
    "id": "kafka-json-consumer",
    "unitId": 18,
    "title": "Crear consumer que consume JSON",
    "description": "Entendé la simetría entre serialización del producer y deserialización del consumer.",
    "minutes": 8,
    "tags": [
      "JSON",
      "KafkaListener",
      "UserEvent",
      "deserialización",
      "errores",
      "DLQ"
    ],
    "objectives": [
      "Entendé la simetría entre serialización del producer y deserialización del consumer.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Crear REST API para enviar JSON"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: serialización y deserialización",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/serdes.html"
      }
    ]
  },
  {
    "id": "kafka-real-world",
    "unitId": 19,
    "title": "Arquitectura de dos microservicios",
    "description": "Explicá por qué MySQL no se conecta directamente al stream Wikimedia.",
    "minutes": 8,
    "tags": [
      "Wikimedia",
      "SSE",
      "microservicios",
      "proyección",
      "MySQL",
      "retención"
    ],
    "objectives": [
      "Explicá por qué MySQL no se conecta directamente al stream Wikimedia.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Crear consumer que consume JSON"
    ],
    "resources": [
      {
        "title": "Apache Kafka: documentación",
        "url": "https://kafka.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "kafka-multi-module",
    "unitId": 19,
    "title": "Proyecto Maven multi-módulo",
    "description": "Diferenciá módulo Maven de microservicio desplegable.",
    "minutes": 8,
    "tags": [
      "Maven",
      "multi-módulo",
      "reactor",
      "dependencias",
      "microservicios"
    ],
    "objectives": [
      "Diferenciá módulo Maven de microservicio desplegable.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Arquitectura de dos microservicios"
    ],
    "resources": [
      {
        "title": "Spring Framework 6.2: contenedor IoC",
        "url": "https://docs.spring.io/spring-framework/reference/6.2/core/beans.html"
      }
    ]
  },
  {
    "id": "kafka-wikimedia-topic",
    "unitId": 19,
    "title": "Configurar producer Wikimedia y su topic",
    "description": "Relacioná aplicación YAML, NewTopic y producer.",
    "minutes": 8,
    "tags": [
      "Wikimedia",
      "NewTopic",
      "properties",
      "perfiles",
      "contratos",
      "topics"
    ],
    "objectives": [
      "Relacioná aplicación YAML, NewTopic y producer.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Proyecto Maven multi-módulo"
    ],
    "resources": [
      {
        "title": "Apache Kafka: documentación",
        "url": "https://kafka.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "kafka-wikimedia-handler",
    "unitId": 19,
    "title": "Event handler SSE y publicación asíncrona",
    "description": "Interpretá SSE como adaptador de entrada y Kafka como frontera de desacoplamiento.",
    "minutes": 8,
    "tags": [
      "Wikimedia",
      "SSE",
      "ApplicationRunner",
      "profiles",
      "handler",
      "backpressure"
    ],
    "objectives": [
      "Interpretá SSE como adaptador de entrada y Kafka como frontera de desacoplamiento.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Configurar producer Wikimedia y su topic"
    ],
    "resources": [
      {
        "title": "Apache Kafka: documentación",
        "url": "https://kafka.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "kafka-test-wikimedia",
    "unitId": 19,
    "title": "Ejecutar y testear el producer Wikimedia",
    "description": "Separá prueba unitaria del contrato de publicación y prueba integrada con Docker.",
    "minutes": 8,
    "tags": [
      "Wikimedia",
      "JUnit",
      "Mockito",
      "KafkaTemplate",
      "E2E",
      "perfil local"
    ],
    "objectives": [
      "Separá prueba unitaria del contrato de publicación y prueba integrada con Docker.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Event handler SSE y publicación asíncrona"
    ],
    "resources": [
      {
        "title": "Mockito: documentación",
        "url": "https://site.mockito.org/"
      },
      {
        "title": "Spring Kafka 3.3: publicar mensajes",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/sending-messages.html"
      }
    ]
  },
  {
    "id": "kafka-consumer-setup",
    "unitId": 20,
    "title": "Crear y configurar el consumer real",
    "description": "Localizá broker, group, offset reset y datasource en el YAML.",
    "minutes": 8,
    "tags": [
      "consumer",
      "group-id",
      "earliest",
      "offset reset",
      "datasource",
      "MySQL"
    ],
    "objectives": [
      "Localizá broker, group, offset reset y datasource en el YAML.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Ejecutar y testear el producer Wikimedia"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: recibir mensajes",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/receiving-messages.html"
      },
      {
        "title": "Spring Data JPA 3.5: referencia",
        "url": "https://docs.spring.io/spring-data/jpa/reference/3.5/"
      }
    ]
  },
  {
    "id": "kafka-consumer-implementation",
    "unitId": 20,
    "title": "Implementar el consumer Wikimedia y observar reprocesos",
    "description": "Entendé por qué ConsumerRecord aporta más información que el payload solo.",
    "minutes": 8,
    "tags": [
      "ConsumerRecord",
      "at-least-once",
      "offset",
      "JPA",
      "idempotencia",
      "trazabilidad"
    ],
    "objectives": [
      "Entendé por qué ConsumerRecord aporta más información que el payload solo.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Crear y configurar el consumer real"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: recibir mensajes",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/receiving-messages.html"
      },
      {
        "title": "Spring Data JPA 3.5: referencia",
        "url": "https://docs.spring.io/spring-data/jpa/reference/3.5/"
      }
    ]
  },
  {
    "id": "kafka-mysql",
    "unitId": 20,
    "title": "Configurar MySQL Database",
    "description": "Diferenciá entidad, repositorio, datasource y esquema generado para el laboratorio.",
    "minutes": 8,
    "tags": [
      "MySQL",
      "JPA",
      "Lob",
      "LONGTEXT",
      "proyección",
      "datasource",
      "migraciones"
    ],
    "objectives": [
      "Diferenciá entidad, repositorio, datasource y esquema generado para el laboratorio.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Implementar el consumer Wikimedia y observar reprocesos"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: recibir mensajes",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/receiving-messages.html"
      },
      {
        "title": "Spring Data JPA 3.5: referencia",
        "url": "https://docs.spring.io/spring-data/jpa/reference/3.5/"
      }
    ]
  },
  {
    "id": "kafka-save-wikimedia",
    "unitId": 20,
    "title": "Guardar Wikimedia data en MySQL",
    "description": "Cerrá el flujo completo: fuente → Kafka → listener → MySQL → API de consulta.",
    "minutes": 8,
    "tags": [
      "E2E",
      "MySQL",
      "proyección",
      "GET",
      "Streams",
      "transacciones",
      "advanced-labs"
    ],
    "objectives": [
      "Cerrá el flujo completo: fuente → Kafka → listener → MySQL → API de consulta.",
      "Resolver la práctica y explicar qué evidencia confirma el resultado."
    ],
    "prerequisites": [
      "Configurar MySQL Database"
    ],
    "resources": [
      {
        "title": "Spring Kafka 3.3: recibir mensajes",
        "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/receiving-messages.html"
      },
      {
        "title": "Spring Data JPA 3.5: referencia",
        "url": "https://docs.spring.io/spring-data/jpa/reference/3.5/"
      }
    ]
  },
  {
    "id": "kafka-replication-acks",
    "unitId": 39,
    "title": "Réplicas, ISR y acknowledgments",
    "description": "Relacioná factor de réplica, réplicas sincronizadas y acks con durabilidad y disponibilidad.",
    "minutes": 10,
    "tags": ["replication factor", "leader", "ISR", "acks", "min.insync.replicas"],
    "objectives": [
      "Describir leader, followers e ISR para una partición.",
      "Comparar acks=0, acks=1 y acks=all sin prometer durabilidad absoluta.",
      "Explicar el intercambio entre disponibilidad de escritura y mínimo de réplicas sincronizadas."
    ],
    "prerequisites": ["kafka-core-concepts"],
    "resources": [
      { "title": "Apache Kafka 3.9: Design and replication", "url": "https://kafka.apache.org/39/design/design/" },
      { "title": "Apache Kafka 3.9: Producer configs", "url": "https://kafka.apache.org/39/configuration/producer-configs/" },
      { "title": "Apache Kafka 3.9: Topic configs", "url": "https://kafka.apache.org/39/configuration/topic-level-configs/" }
    ]
  },
  {
    "id": "kafka-retention-compaction",
    "unitId": 39,
    "title": "Retención por tiempo y compactación",
    "description": "Elegí entre conservar historia por una ventana y conservar el último estado conocido por key.",
    "minutes": 10,
    "tags": ["retention.ms", "retention.bytes", "cleanup.policy", "compaction", "tombstone"],
    "objectives": [
      "Distinguir retención delete de limpieza compactada por key.",
      "Explicar la limpieza asíncrona, los tombstones y los huecos entre offsets.",
      "Elegir una política según se necesite historia de eventos o estado reconstruible."
    ],
    "prerequisites": ["kafka-core-concepts"],
    "resources": [
      { "title": "Apache Kafka 3.9: Topic configs", "url": "https://kafka.apache.org/39/configuration/topic-level-configs/" },
      { "title": "Apache Kafka 3.9: Log compaction", "url": "https://kafka.apache.org/39/design/design/" }
    ]
  },
  {
    "id": "kafka-delivery-semantics",
    "unitId": 39,
    "title": "Entrega, commits e idempotencia",
    "description": "Ubicá las ventanas de fallo entre publicar, procesar, persistir el efecto y confirmar el offset.",
    "minutes": 11,
    "tags": ["at-most-once", "at-least-once", "exactly-once", "commit", "idempotencia"],
    "objectives": [
      "Comparar at-most-once, at-least-once y exactly-once por alcance.",
      "Reconocer cuándo una caída puede causar pérdida o reproceso.",
      "Elegir una estrategia durable de idempotencia para efectos en una base externa."
    ],
    "prerequisites": ["kafka-groups-offsets", "kafka-replication-acks"],
    "resources": [
      { "title": "Apache Kafka 3.9: Message delivery semantics", "url": "https://kafka.apache.org/39/design/design/" },
      { "title": "Apache Kafka 3.9: Producer configs", "url": "https://kafka.apache.org/39/configuration/producer-configs/" },
      { "title": "Spring Kafka 3.3: Exactly once semantics", "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/exactly-once.html" }
    ]
  },
  {
    "id": "kafka-rebalance-scaling",
    "unitId": 39,
    "title": "Rebalances y escalado de consumers",
    "description": "Predecí cómo una modificación del grupo distribuye particiones y afecta el paralelismo.",
    "minutes": 10,
    "tags": ["rebalance", "assignment", "consumer group", "concurrency", "lag"],
    "objectives": [
      "Explicar por qué se reasignan particiones cuando cambia un grupo.",
      "Relacionar cantidad de particiones con consumidores activos y paralelismo.",
      "Identificar rebalances frecuentes, particiones calientes y límites de escalado."
    ],
    "prerequisites": ["kafka-groups-offsets", "kafka-delivery-semantics"],
    "resources": [
      { "title": "Apache Kafka 3.9: Consumer groups", "url": "https://kafka.apache.org/39/design/design/" },
      { "title": "Apache Kafka 3.9: Consumer configs", "url": "https://kafka.apache.org/39/configuration/consumer-configs/" },
      { "title": "Spring Kafka 3.3: Listener concurrency", "url": "https://docs.spring.io/spring-kafka/reference/3.3/kafka/receiving-messages/message-listener-container.html" }
    ]
  }
];
