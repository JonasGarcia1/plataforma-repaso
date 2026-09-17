## Concepto

Spring MVC convierte el JSON HTTP en UserEvent y Bean Validation controla sus reglas antes de publicar. Esto protege el borde, mientras que los consumers pueden asumir un contrato básico coherente.

Un email inválido devuelve error HTTP y no crea record; un email válido devuelve 202 y llega al topic.

El recorrido de esta práctica:

1. Swagger envía JSON.
2. Jackson construye UserEvent.
3. @Valid evalúa restricciones.
4. Solo si es válido se llama al producer.

## Ejemplo

Petición manual al laboratorio local; no se ejecuta desde esta lección.

```powershell
Invoke-RestMethod http://localhost:8080/api/users `
    -Method Post -ContentType 'application/json' `
    -Body '{"id":"u-1","name":"Ana","email":"ana@example.com"}'
```

## En entrevista

**Pregunta:** ¿Kafka valida mi DTO?

**Breve:** No: Kafka transporta bytes. La validación de este ejemplo ocurre antes, en Spring MVC.

**Ampliada:** Spring MVC convierte el JSON; @Valid evalúa las restricciones del record. Eso no significa que Kafka valide payloads. Separaría formato, obligatoriedad y reglas como usuario ya registrado. Deserializar correctamente no confirma ninguna de esas reglas por sí solo.

## Error frecuente

El email del UserEvent local usa @Email sin @NotBlank. No afirmar que está obligado a venir solo porque el endpoint lleva @Valid.

## Práctica

Probá email='no-es-email', id vacío y email omitido. ¿Las tres entradas necesariamente fallan con el DTO actual?

### Pista

@Email y @NotBlank expresan restricciones distintas.

### Solución

Email mal formado incumple @Email e id vacío incumple @NotBlank. En el DTO actual email solo tiene @Email: null es válido para esa restricción y no implica obligatoriedad. Para exigir presencia habría que agregar una restricción explícita y probarla. El curso no modifica ese backend.

## Profundización

UserEvent actualmente comparte contrato REST y evento. Es didáctico, pero en un sistema evolutivo puede convenir separar DTO de entrada y contrato publicado. La validación del borde no protege contra otros productores que escriban directamente en el topic.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **Endpoint JSON:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/web/LearningController.java`. El método user aplica @Valid.
- **Reglas del DTO:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/model/UserEvent.java`. Anotaciones de validación del request.

**Comprobá lo aprendido:**

- Sé provocar un 400 de validación.
- Sé enviar un JSON válido.
- Sé explicar dónde se corta el flujo inválido.

