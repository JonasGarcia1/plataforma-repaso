import type { Lesson } from '../types';

// Referencias comprobadas al preparar el contenido; ejemplos Java 21 / Boot 3.
export const backendLessons: Lesson[] = [
  {
    "id": "u09-a",
    "unitId": 9,
    "title": "HTTP y contratos REST",
    "description": "Métodos, estados y reintentos con un contrato de pedidos.",
    "minutes": 8,
    "tags": [
      "HTTP",
      "REST",
      "idempotencia",
      "headers",
      "API"
    ],
    "objectives": [
      "Distinguir métodos seguros e idempotentes",
      "Elegir estados coherentes"
    ],
    "prerequisites": [
      "Objetos y excepciones"
    ],
    "resources": [
      {
        "title": "HTTP: semántica oficial (RFC 9110)",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html"
      }
    ]
  },
  {
    "id": "u09-b",
    "unitId": 9,
    "title": "Java EE, Jakarta EE y Servlet",
    "description": "Del contenedor web a Spring MVC, sin confundir especificación e implementación.",
    "minutes": 8,
    "tags": [
      "Jakarta",
      "Java EE",
      "Servlet",
      "MVC"
    ],
    "objectives": [
      "Explicar la evolución javax/jakarta",
      "Reconocer estado compartido en Servlets"
    ],
    "prerequisites": [
      "HTTP"
    ],
    "resources": [
      {
        "title": "Jakarta Servlet: especificación",
        "url": "https://jakarta.ee/specifications/servlet/"
      },
      {
        "title": "Spring Framework 6.2: Web MVC",
        "url": "https://docs.spring.io/spring-framework/reference/6.2/web/webmvc.html"
      }
    ]
  },
  {
    "id": "u09-c",
    "unitId": 9,
    "title": "DTOs y serialización",
    "description": "JSON, XML, Jackson y Gson como contratos de intercambio.",
    "minutes": 8,
    "tags": [
      "DTO",
      "JSON",
      "XML",
      "Jackson",
      "Gson",
      "serialización"
    ],
    "objectives": [
      "Separar contratos y entidades",
      "Validar datos después de deserializar"
    ],
    "prerequisites": [
      "Clases y records"
    ],
    "resources": [
      {
        "title": "Jackson Databind: documentación del proyecto",
        "url": "https://github.com/FasterXML/jackson-databind"
      }
    ]
  },
  {
    "id": "u10-a",
    "unitId": 10,
    "title": "Spring, Boot y dependencias",
    "description": "IoC, beans, scopes, perfiles y configuración explicados desde un caso de uso.",
    "minutes": 8,
    "tags": [
      "Spring",
      "Boot",
      "IoC",
      "DI",
      "beans",
      "scopes",
      "perfiles"
    ],
    "objectives": [
      "Distinguir Spring de Boot",
      "Inyectar por constructor y seleccionar adaptadores"
    ],
    "prerequisites": [
      "Interfaces",
      "SOLID"
    ],
    "resources": [
      {
        "title": "Spring Framework 6.2: contenedor IoC",
        "url": "https://docs.spring.io/spring-framework/reference/6.2/core/beans.html"
      }
    ]
  },
  {
    "id": "u10-b",
    "unitId": 10,
    "title": "MVC, validación y errores",
    "description": "Construir contratos HTTP claros alrededor del negocio.",
    "minutes": 8,
    "tags": [
      "MVC",
      "controller",
      "validación",
      "ProblemDetail",
      "RestControllerAdvice"
    ],
    "objectives": [
      "Separar controlador y servicio",
      "Traducir errores previsibles a HTTP"
    ],
    "prerequisites": [
      "HTTP",
      "Inyección de dependencias"
    ],
    "resources": [
      {
        "title": "Spring Framework 6.2: Web MVC",
        "url": "https://docs.spring.io/spring-framework/reference/6.2/web/webmvc.html"
      }
    ]
  },
  {
    "id": "u10-c",
    "unitId": 10,
    "title": "Postman, OpenAPI y Swagger",
    "description": "Documentar y comprobar un recorrido de creación y consulta.",
    "minutes": 8,
    "tags": [
      "OpenAPI",
      "Swagger",
      "Postman",
      "YAML",
      "versionado"
    ],
    "objectives": [
      "Distinguir especificación y herramientas",
      "Diseñar comprobaciones de contrato"
    ],
    "prerequisites": [
      "HTTP",
      "Spring MVC"
    ],
    "resources": [
      {
        "title": "OpenAPI 3.0.3: especificación",
        "url": "https://spec.openapis.org/oas/v3.0.3"
      }
    ]
  },
  {
    "id": "u11-a",
    "unitId": 11,
    "title": "Modelado, joins y agregaciones",
    "description": "Resolver el ejercicio de alumnos de la sede 504 con promedio mayor a siete.",
    "minutes": 8,
    "tags": [
      "SQL",
      "JOIN",
      "GROUP BY",
      "HAVING",
      "modelado",
      "claves"
    ],
    "objectives": [
      "Elegir cardinalidades y claves",
      "Separar filtros de filas y grupos"
    ],
    "prerequisites": [
      "Colecciones",
      "Predicados"
    ],
    "resources": [
      {
        "title": "PostgreSQL: tutorial oficial",
        "url": "https://www.postgresql.org/docs/current/tutorial.html"
      }
    ]
  },
  {
    "id": "u11-b",
    "unitId": 11,
    "title": "JDBC y conexiones",
    "description": "Parametrizar consultas y liberar recursos con un pool.",
    "minutes": 8,
    "tags": [
      "JDBC",
      "DataSource",
      "PreparedStatement",
      "pool",
      "SQL injection"
    ],
    "objectives": [
      "Usar parámetros sin concatenación",
      "Cerrar conexión, statement y resultado"
    ],
    "prerequisites": [
      "SQL",
      "try-with-resources"
    ],
    "resources": [
      {
        "title": "Oracle: fundamentos de JDBC",
        "url": "https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html"
      }
    ]
  },
  {
    "id": "u11-c",
    "unitId": 11,
    "title": "Transacciones, índices y PL/SQL",
    "description": "Consistencia, planes de ejecución y procesamiento en la base.",
    "minutes": 8,
    "tags": [
      "ACID",
      "EXPLAIN",
      "índices",
      "PL/SQL",
      "cursores",
      "procedimientos"
    ],
    "objectives": [
      "Interpretar costos de índices",
      "Distinguir función, procedimiento y cursor"
    ],
    "prerequisites": [
      "SQL",
      "JDBC"
    ],
    "resources": [
      {
        "title": "PostgreSQL: tutorial oficial",
        "url": "https://www.postgresql.org/docs/current/tutorial.html"
      },
      {
        "title": "Oracle: fundamentos de JDBC",
        "url": "https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html"
      }
    ]
  },
  {
    "id": "u12-a",
    "unitId": 12,
    "title": "JPA, Hibernate y relaciones",
    "description": "Entender entidades, ownership, fetch y cascadas.",
    "minutes": 8,
    "tags": [
      "JPA",
      "Hibernate",
      "Spring Data",
      "mapping",
      "cascade",
      "fetch"
    ],
    "objectives": [
      "Distinguir especificación, implementación y repositorios",
      "Mantener ambos lados de una relación"
    ],
    "prerequisites": [
      "SQL",
      "Objetos"
    ],
    "resources": [
      {
        "title": "Spring Data JPA 3.5",
        "url": "https://docs.spring.io/spring-data/jpa/reference/3.5/"
      }
    ]
  },
  {
    "id": "u12-b",
    "unitId": 12,
    "title": "Consultas, proyecciones y N+1",
    "description": "Seleccionar los datos justos y paginar con orden estable.",
    "minutes": 8,
    "tags": [
      "JPQL",
      "proyecciones",
      "paginación",
      "N+1",
      "Page",
      "Slice"
    ],
    "objectives": [
      "Reconocer consultas N+1",
      "Elegir una proyección y un orden determinista"
    ],
    "prerequisites": [
      "Mapeo JPA"
    ],
    "resources": [
      {
        "title": "Spring Data JPA 3.5",
        "url": "https://docs.spring.io/spring-data/jpa/reference/3.5/"
      }
    ]
  },
  {
    "id": "u12-c",
    "unitId": 12,
    "title": "Transacciones y locking",
    "description": "Versiones, proxies y límites reales de las pruebas con H2.",
    "minutes": 8,
    "tags": [
      "Transactional",
      "locking",
      "Version",
      "H2",
      "rollback",
      "concurrencia"
    ],
    "objectives": [
      "Explicar conflictos optimistas",
      "Evitar trampas de proxies y motores diferentes"
    ],
    "prerequisites": [
      "JPA",
      "Transacciones SQL"
    ],
    "resources": [
      {
        "title": "Spring Data JPA 3.5",
        "url": "https://docs.spring.io/spring-data/jpa/reference/3.5/"
      }
    ]
  },
  {
    "id": "u13-a",
    "unitId": 13,
    "title": "JUnit, Mockito y pruebas de integración",
    "description": "Probar conductas, simular estáticos y controlar respuestas HTTP.",
    "minutes": 8,
    "tags": [
      "JUnit",
      "Mockito",
      "MockServer",
      "TDD",
      "cobertura",
      "tests"
    ],
    "objectives": [
      "Elegir límites unitarios e integración",
      "Diseñar pruebas de fallos y casos límite"
    ],
    "prerequisites": [
      "Excepciones",
      "Spring"
    ],
    "resources": [
      {
        "title": "JUnit 5.12.2: guía",
        "url": "https://docs.junit.org/5.12.2/user-guide/"
      },
      {
        "title": "Mockito: documentación",
        "url": "https://site.mockito.org/"
      },
      {
        "title": "MockServer: simular HTTP",
        "url": "https://www.mock-server.com/"
      }
    ]
  },
  {
    "id": "u13-b",
    "unitId": 13,
    "title": "Logging con contexto",
    "description": "SLF4J, Log4j2 y registros que ayudan a investigar.",
    "minutes": 8,
    "tags": [
      "logging",
      "SLF4J",
      "Log4j2",
      "MDC",
      "niveles"
    ],
    "objectives": [
      "Elegir niveles por impacto",
      "Registrar contexto sin secretos"
    ],
    "prerequisites": [
      "Excepciones"
    ],
    "resources": [
      {
        "title": "Log4j2: manual",
        "url": "https://logging.apache.org/log4j/2.x/manual/index.html"
      }
    ]
  },
  {
    "id": "u13-c",
    "unitId": 13,
    "title": "Métricas, trazas y observabilidad",
    "description": "Investigar latencia con Micrometer y OpenTelemetry.",
    "minutes": 8,
    "tags": [
      "Micrometer",
      "OpenTelemetry",
      "trazas",
      "métricas",
      "percentiles"
    ],
    "objectives": [
      "Relacionar las tres señales",
      "Evitar cardinalidad ilimitada"
    ],
    "prerequisites": [
      "Logging",
      "HTTP"
    ],
    "resources": [
      {
        "title": "Micrometer: referencia",
        "url": "https://docs.micrometer.io/micrometer/reference/"
      },
      {
        "title": "OpenTelemetry: señales",
        "url": "https://opentelemetry.io/docs/concepts/signals/"
      }
    ]
  },
  {
    "id": "u14-a",
    "unitId": 14,
    "title": "Arquitectura hexagonal",
    "description": "Proteger casos de uso mediante puertos y adaptadores.",
    "minutes": 8,
    "tags": [
      "hexagonal",
      "puertos",
      "adaptadores",
      "capas",
      "DIP"
    ],
    "objectives": [
      "Dibujar dependencias hacia el núcleo",
      "Separar negocio de transporte"
    ],
    "prerequisites": [
      "SOLID",
      "Spring"
    ],
    "resources": [
      {
        "title": "Alistair Cockburn: arquitectura hexagonal",
        "url": "https://alistair.cockburn.us/hexagonal-architecture"
      }
    ]
  },
  {
    "id": "u14-b",
    "unitId": 14,
    "title": "DDD y lenguaje del negocio",
    "description": "Entidades, value objects, agregados y bounded contexts.",
    "minutes": 8,
    "tags": [
      "DDD",
      "entidad",
      "value object",
      "agregado",
      "bounded context"
    ],
    "objectives": [
      "Ubicar invariantes en el modelo",
      "Distinguir identidad y valor"
    ],
    "prerequisites": [
      "Arquitectura hexagonal"
    ],
    "resources": [
      {
        "title": "Domain Language: recursos DDD",
        "url": "https://www.domainlanguage.com/ddd/"
      }
    ]
  },
  {
    "id": "u14-c",
    "unitId": 14,
    "title": "Elegir arquitectura con criterio",
    "description": "Monolito modular, microservicios y costos de independencia.",
    "minutes": 8,
    "tags": [
      "microservicios",
      "monolito modular",
      "gateway",
      "arquitectura",
      "tradeoffs"
    ],
    "objectives": [
      "Comparar costos operativos",
      "Justificar límites de módulos y datos"
    ],
    "prerequisites": [
      "DDD",
      "HTTP"
    ],
    "resources": [
      {
        "title": "Spring Modulith: módulos de aplicación",
        "url": "https://docs.spring.io/spring-modulith/reference/"
      }
    ]
  },
  {
    "id": "u15-a",
    "unitId": 15,
    "title": "EDA y fundamentos de Kafka",
    "description": "Eventos, particiones, offsets y grupos con el laboratorio de pedidos.",
    "minutes": 8,
    "tags": [
      "EDA",
      "Kafka",
      "producer",
      "consumer",
      "offset",
      "particiones",
      "grupos"
    ],
    "objectives": [
      "Explicar orden por partición",
      "Distinguir reparto de trabajo de fan-out"
    ],
    "prerequisites": [
      "HTTP",
      "Arquitectura"
    ],
    "resources": [
      {
        "title": "Apache Kafka: documentación oficial",
        "url": "https://kafka.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "u15-b",
    "unitId": 15,
    "title": "Entrega, idempotencia y outbox",
    "description": "Diseñar consumidores que sobrevivan duplicados y caídas.",
    "minutes": 8,
    "tags": [
      "Kafka",
      "idempotencia",
      "outbox",
      "DLQ",
      "retry",
      "exactly-once"
    ],
    "objectives": [
      "Identificar ventanas de fallo",
      "Proponer deduplicación persistente"
    ],
    "prerequisites": [
      "Kafka",
      "Transacciones"
    ],
    "resources": [
      {
        "title": "Apache Kafka: documentación oficial",
        "url": "https://kafka.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "u15-c",
    "unitId": 15,
    "title": "Sagas y consistencia distribuida",
    "description": "Coordinar pasos, compensaciones y resultados desconocidos.",
    "minutes": 8,
    "tags": [
      "saga",
      "consistencia eventual",
      "gateway",
      "contratos",
      "distribuidos"
    ],
    "objectives": [
      "Modelar estados intermedios",
      "Separar timeout de rechazo definitivo"
    ],
    "prerequisites": [
      "Eventos",
      "Idempotencia"
    ],
    "resources": [
      {
        "title": "Apache Kafka: documentación oficial",
        "url": "https://kafka.apache.org/documentation/"
      },
      {
        "title": "Spring Modulith: módulos de aplicación",
        "url": "https://docs.spring.io/spring-modulith/reference/"
      }
    ]
  },
  {
    "id": "u16-a",
    "unitId": 16,
    "title": "Seguridad de una API",
    "description": "Spring Security, JWT, OAuth2, CORS, CSRF y permisos por recurso.",
    "minutes": 8,
    "tags": [
      "seguridad",
      "JWT",
      "OAuth2",
      "CORS",
      "CSRF",
      "SQL injection"
    ],
    "objectives": [
      "Separar identidad de permisos",
      "Explicar límites de tokens y navegador"
    ],
    "prerequisites": [
      "HTTP",
      "Spring"
    ],
    "resources": [
      {
        "title": "Spring Security 6.5: referencia",
        "url": "https://docs.spring.io/spring-security/reference/6.5/"
      }
    ]
  },
  {
    "id": "u16-b",
    "unitId": 16,
    "title": "Caché, JVM y resiliencia",
    "description": "Resolver el catálogo, medir rendimiento y proteger dependencias.",
    "minutes": 8,
    "tags": [
      "Redis",
      "caché",
      "JVM",
      "GC",
      "JFR",
      "timeout",
      "circuit breaker"
    ],
    "objectives": [
      "Definir vencimiento y fallos de caché",
      "Investigar cuellos de botella con evidencia"
    ],
    "prerequisites": [
      "Concurrencia",
      "SQL",
      "Métricas"
    ],
    "resources": [
      {
        "title": "Redis: comandos y uso",
        "url": "https://redis.io/docs/latest/develop/use/"
      },
      {
        "title": "Micrometer: referencia",
        "url": "https://docs.micrometer.io/micrometer/reference/"
      }
    ]
  },
  {
    "id": "u16-c",
    "unitId": 16,
    "title": "Pipelines, calidad y Spring Batch",
    "description": "Entregar cambios verificables y procesar lotes reiniciables.",
    "minutes": 8,
    "tags": [
      "pipelines",
      "SonarQube",
      "calidad",
      "Spring Batch",
      "chunks",
      "restart"
    ],
    "objectives": [
      "Diseñar comprobaciones de entrega",
      "Explicar checkpoints y transacciones por chunk"
    ],
    "prerequisites": [
      "Testing",
      "Transacciones"
    ],
    "resources": [
      {
        "title": "Spring Batch: referencia (seleccionar versión 5.x)",
        "url": "https://docs.spring.io/spring-batch/reference/"
      }
    ]
  }
];

