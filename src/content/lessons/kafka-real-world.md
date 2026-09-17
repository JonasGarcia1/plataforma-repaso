## Concepto

El caso Wikimedia transforma eventos públicos en una proyección local. Separar producer y consumer permite que la ingesta continúe aunque MySQL esté lento, y que la persistencia evolucione sin modificar la fuente SSE.

Un pico de ediciones incrementa lag en el consumer, pero el producer no necesita esperar a la base de datos por cada cambio.

El recorrido de esta práctica:

1. Wikimedia emite un cambio SSE.
2. Producer lo transforma en record Kafka.
3. Broker retiene el evento.
4. Consumer lo persiste en MySQL.

## Ejemplo

Arquitectura real del laboratorio; el perfil local permite estudiar sin acceder al stream externo.

```text
Perfil local ─┐
              ├→ wikimedia-producer → wikimedia.recentchange.v1
Wikimedia SSE ┘                             ↓
                                  wikimedia-consumer
                                           ↓
                                   MySQL → GET HTTP
```

## En entrevista

**Pregunta:** ¿Qué ocurre si MySQL se atrasa?

**Breve:** Kafka retiene eventos; el consumer acumula lag y puede recuperar a su propio ritmo.

**Ampliada:** Kafka conecta aplicaciones que no comparten proceso ni transacción de base. La tabla es un modelo de lectura derivado, útil para consultar por HTTP. El evento puede servir a otro grupo sin agregarle una llamada remota al productor.

## Error frecuente

Kafka no elimina la necesidad de monitorear lag: desacoplar no significa que el consumer tenga capacidad infinita.

## Práctica

MySQL está detenido y Wikimedia sigue produciendo. ¿Qué puede continuar y qué límite hay que vigilar?

### Pista

Desacoplamiento temporal no equivale a almacenamiento ilimitado.

### Solución

El productor puede seguir publicando mientras Kafka esté disponible y tenga capacidad. El consumer falla o queda atrasado al persistir. Revisaría lag, retención, disco y política de reintentos. Si se excede la retención, el histórico requerido puede desaparecer antes de recuperarlo.

## Profundización

Este backend educativo no implementa todos los controles de producción. Un fallo entre guardar y confirmar progreso puede repetir filas. Monitorear solamente que ambos procesos estén vivos no demuestra que el flujo entregue datos correctamente.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Arquitectura:** `springboot-kafka-roadmap-course/README.md`. Diagrama del pipeline completo.
- **POM raíz:** `springboot-kafka-roadmap-course/pom.xml`. Mantiene los dos servicios bajo el mismo reactor Maven.

**Comprobá lo aprendido:**

- Sé dibujar el pipeline.
- Sé explicar buffer durable.
- Sé definir lag del consumer.

