## Concepto

El último módulo cierra el flujo: un record Kafka genera una fila MySQL visible por REST. La API GET demuestra un efecto persistente del consumer, no una consulta directa a Kafka.

El JSON source=local aparece como payload almacenado después de iniciar producer y consumer con Docker activo.

El recorrido de esta práctica:

1. Producer local publica el evento fijo.
2. Broker lo conserva en topic.
3. Consumer lo recibe y guarda la entidad.
4. GET /api/wikimedia-events devuelve la proyección.

## Ejemplo

Comandos manuales desde la raíz del backend. El GET consulta MySQL y el script hace una comprobación básica.

```powershell
Invoke-RestMethod 'http://localhost:8081/api/wikimedia-events?limit=20'
# Smoke test existente; requiere las aplicaciones iniciadas:
.\scripts\verify-e2e.ps1
```

## En entrevista

**Pregunta:** ¿El GET lee directamente el topic?

**Breve:** No: lee MySQL, que es una proyección materializada por el consumer.

**Ampliada:** El GET lee una proyección existente, sin consumir Kafka. El controller limita el tamaño entre 1 y 100 ajustando valores, y ordena por ID descendente; no valida rechazando todos los límites fuera de rango. Puede mostrar filas previas a la ejecución actual.

## Error frecuente

Guardar con repository.save no impide duplicados. El script E2E acepta filas existentes; verificá una identidad nueva para demostrar el recorrido de una ejecución concreta.

## Práctica

POST /api/users responde 202 y el GET de Wikimedia devuelve []. Diseñá un diagnóstico y luego explicá el efecto de reiniciar el producer local.

### Pista

Los dos endpoints no comparten topic ni modelo de persistencia.

### Solución

Revisá producer/consumer Wikimedia, topic wikimedia.recentchange.v1, MySQL y errores del listener. El POST de usuarios pertenece a learning-api y no llena esa tabla. Reiniciar el producer local emite la muestra otra vez y puede crear una fila adicional; igualdad de key no evita duplicados.

## Profundización

Continuación opcional: advanced-labs contiene AdvancedKafkaConfig (idempotencia, topics compactados), AdvancedLabService (transacción entre input y audit) y StreamTopology (mapValues a mayúsculas hacia labs.stream.output.v1). Compactación es asíncrona y value null actúa como tombstone. En consumidores transaccionales usá read_committed para excluir abortos.

Límite del código inspeccionado: el template de advanced-labs es transaccional; sendIdempotent y updateState llaman send fuera de executeInTransaction, sin habilitar explícitamente envío no transaccional. Esas rutas requieren corregir/configurar ese uso antes de esperar éxito. Kafka Streams también necesita serdes adecuados para String. Estas extensiones son material de análisis; aquí no se modificó ni ejecutó el backend.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Guardar desde listener:** `springboot-kafka-roadmap-course/wikimedia-consumer/src/main/java/com/interviewlab/wikimediaconsumer/kafka/WikimediaDatabaseConsumer.java`. Transforma ConsumerRecord en entidad y usa save.
- **Endpoint consulta:** `springboot-kafka-roadmap-course/wikimedia-consumer/src/main/java/com/interviewlab/wikimediaconsumer/web/WikimediaEventController.java`. Devuelve los últimos eventos paginados.
- **Swagger consumer:** `springboot-kafka-roadmap-course/wikimedia-consumer/src/main/java/com/interviewlab/wikimediaconsumer/config/WikimediaOpenApiConfiguration.java`. Documenta el endpoint de verificación.

**Comprobá lo aprendido:**

- Sé levantar producer y consumer.
- Sé consultar Swagger del consumer.
- Sé explicar por qué el GET no consume Kafka.

