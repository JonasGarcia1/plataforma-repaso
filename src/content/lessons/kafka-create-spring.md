## Concepto

Spring Boot combina convenciones, auto-configuración e inyección de dependencias. Maven organiza módulos y dependencias; el wrapper fija una forma reproducible de compilar sin instalar Maven globalmente.

LearningController recibe LearningProducer por constructor. Spring crea ambos beans y los conecta; el controller no necesita conocer cómo construir el producer.

El recorrido de esta práctica:

1. Abrí el pom.xml raíz como proyecto Maven.
2. Ubicá el módulo y su clase @SpringBootApplication.
3. Dejá que Spring escanee components bajo el paquete raíz.
4. Ejecutá tests desde la raíz del reactor.

## Ejemplo

Fragmento didáctico Java 21 / Spring Boot 3; requiere imports y el bean LearningProducer del módulo.

```java
// Fragmento del patrón utilizado en LearningController.
@RestController
class Entrada {
    private final LearningProducer producer;
    Entrada(LearningProducer producer) {
        this.producer = producer;
    }
}
```

## En entrevista

**Pregunta:** ¿Qué aporta IoC?

**Breve:** Spring crea y conecta dependencias como controllers y servicios, reduciendo acoplamiento y facilitando pruebas.

**Ampliada:** Boot combina autoconfiguración y dependencias acordes a su versión; Maven compila y administra el proyecto. El wrapper descarga Maven, pero no instala Java 21 ni enciende Docker. Cada módulo conserva sus dependencias y su punto de entrada.

## Error frecuente

No mezcles dependencias de todos los servicios en un único módulo: pierde sentido la separación entre API, producer y consumer.

## Práctica

El controller crea LearningProducer con new dentro de cada request. ¿Qué perdés y cómo lo corregirías?

### Pista

Revisá quién construye KafkaTemplate y aplica configuración.

### Solución

La construcción manual puede quedar fuera del contenedor, duplicar configuración y dificultar pruebas. Recibiría LearningProducer por constructor, con @Service y sus dependencias gestionadas. En pruebas puedo construir el controller con un doble sin iniciar Kafka.

## Profundización

Seguí LearningApiApplication → KafkaClientConfig → LearningProducer → LearningController. Una configuración explícita es útil para aprender factories, aunque Boot pueda autoconfigurar partes del flujo. No agregues clases de otro módulo esperando que el component scan las encuentre automáticamente.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **POM raíz:** `springboot-kafka-roadmap-course/pom.xml`. Lista módulos y define versiones compartidas.
- **Punto de entrada:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/LearningApiApplication.java`. Inicia Spring y descubre componentes del módulo.
- **POM learning-api:** `springboot-kafka-roadmap-course/learning-api/pom.xml`. Declara Web, Validation, Kafka y Swagger.

**Comprobá lo aprendido:**

- Sé encontrar la clase principal.
- Sé explicar IoC en una frase.
- Sé ejecutar el reactor Maven.

