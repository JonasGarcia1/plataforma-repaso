## Concepto

MySQL guarda una proyección para consultas HTTP. Kafka conserva la historia de eventos; la tabla se optimiza para leer lo que la aplicación necesita, por eso no reemplaza al topic ni viceversa.

El payload original se conserva en @Lob, mientras id y receivedAt permiten ordenar los últimos eventos para el endpoint.

El recorrido de esta práctica:

1. Configurar datasource.
2. Mapear WikimediaEvent con JPA.
3. Usar repository para persistencia/consulta.
4. Exponer GET paginado para verificar resultado.

## Ejemplo

Fragmento parcial basado en la entidad real; LONGTEXT es específico de MySQL.

```java
@Entity
@Table(name = "wikimedia_events")
class WikimediaEvent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String eventKey;
    private Instant receivedAt;
    @Lob @Column(columnDefinition = "LONGTEXT")
    private String payload;
    // Constructores y accesores omitidos.
}
```

## En entrevista

**Pregunta:** ¿Por qué @Lob?

**Breve:** Permite mapear contenido grande; el laboratorio concreta el almacenamiento con LONGTEXT. No valida JSON ni elimina límites de tamaño.

**Ampliada:** JPA mapea entidades; Spring Data aporta el repositorio. La tabla es una proyección consultable. Su esquema y sus índices deben responder a las consultas reales. ddl-auto=update facilita el laboratorio, pero una migración versionada permite revisar y reproducir cambios de esquema.

## Error frecuente

LONGTEXT no es un contrato portable entre motores y @Lob no garantiza capacidad ilimitada ni validez del contenido.

## Práctica

¿La anotación @Lob valida el JSON o permite guardar mensajes sin límite? ¿receivedAt es la fecha original de Wikimedia?

### Pista

Tipo de almacenamiento, validación y semántica temporal son independientes.

### Solución

@Lob indica almacenamiento grande; el mapeo local agrega LONGTEXT, pero siguen existiendo límites de base, driver y tamaño de mensaje. No valida JSON. receivedAt se asigna con Instant.now al construir la entidad: describe recepción local, no necesariamente el momento del evento externo.

## Profundización

La entidad actual conserva payload y key pero no topic, partición u offset. Si necesitás auditoría exacta o deduplicación por posición, ampliar el esquema requiere una migración y definir el alcance de identidad. No asumas que el ID autogenerado es el ID del evento original.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Entidad JPA:** `springboot-kafka-roadmap-course/wikimedia-consumer/src/main/java/com/interviewlab/wikimediaconsumer/persistence/WikimediaEvent.java`. Id, key, payload @Lob y fecha.
- **Repositorio:** `springboot-kafka-roadmap-course/wikimedia-consumer/src/main/java/com/interviewlab/wikimediaconsumer/persistence/WikimediaEventRepository.java`. Acceso paginado a MySQL.
- **Datasource:** `springboot-kafka-roadmap-course/wikimedia-consumer/src/main/resources/application.yml`. URL, usuario y contraseña configurables.

**Comprobá lo aprendido:**

- Sé explicar proyección.
- Sé justificar @Lob.
- Sé localizar datasource y repository.

