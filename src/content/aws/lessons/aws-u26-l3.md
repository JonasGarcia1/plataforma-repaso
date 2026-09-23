# Well-Architected y decisiones iniciales

## Concepto

AWS Well-Architected es un marco para revisar decisiones y riesgos de una carga de trabajo. Sus seis pilares son excelencia operativa, seguridad, fiabilidad, eficiencia del rendimiento, optimización de costos y sostenibilidad. Sirve para hacer preguntas y priorizar mejoras; no certifica que una arquitectura sea correcta ni reemplaza requisitos del negocio.

Una revisión parte de una carga concreta, identifica resultados esperados y examina cómo se comporta ante cambios y fallos. Cada hallazgo debería relacionar un riesgo con una acción, su prioridad y una forma de comprobar el resultado.

## Ejemplo

```text
Requisito: confirmar pedidos aun cuando un consumidor se reinicie.
Riesgo de fiabilidad: un mensaje puede procesarse otra vez.
Decisión: hacer idempotente el consumidor y conservar mensajes fallidos en una DLQ.
Verificación: provocar una reentrega y comprobar que el pedido se registra una sola vez.
```

La misma decisión se puede revisar desde otros pilares: ¿quién puede leer el mensaje?, ¿qué métrica alerta sobre acumulación?, ¿cuánto cuesta conservarlo?, ¿el mecanismo puede operarse con el equipo disponible?

## En entrevista

**Breve:** Usá los seis pilares como lentes para encontrar riesgos, no como una receta. **Ampliada:** explicá un requisito, la decisión tomada, una alternativa y la evidencia que demostraría que la solución cumple.

## Error frecuente

Tratar una lista de buenas prácticas como una garantía universal. Una cola con DLQ no resuelve automáticamente duplicados ni recuperación: hay que diseñar el consumidor y ensayar el reproceso.

## Práctica

Para el flujo de pedidos del ejemplo, propone una mejora de seguridad, una de operación y una de costo. Para cada una, escribe qué riesgo reduce y cómo la comprobarías.

### Pista

Haz que cada mejora responda a un riesgo observable. Evitá propuestas genéricas como “agregar monitoreo” sin indicar qué métrica y qué acción dispararía.

### Solución

Seguridad: permitir que el rol del consumidor lea solo su cola y comprobar con una prueba de acceso que otro rol no pueda hacerlo. Operación: alertar si crece la antigüedad del mensaje más viejo y probar que el equipo recibe y atiende la alerta. Costo: establecer una retención acorde con el reproceso y revisar el costo de almacenamiento; verificar que los mensajes necesarios aún se puedan recuperar. Las prioridades dependen del impacto y de los objetivos del sistema.

## Profundización

[AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
