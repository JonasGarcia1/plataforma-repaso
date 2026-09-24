# CloudWatch: métricas, logs y alarmas

## Concepto

CloudWatch reúne señales operativas. Una métrica es una serie numérica agregable; un log conserva eventos con contexto. Una alarma evalúa una métrica en una ventana y puede notificar o iniciar una acción. Ninguna señal explica por sí sola la causa: para investigar conviene correlacionar métricas, logs y trazas.

## Ejemplo

```text
La API de pedidos publica p95 de latencia, tasa de 5xx y mensajes pendientes en SQS. Una alarma de errores sostenidos avisa al equipo; el log del requestId permite hallar qué dependencia tardó.
```

Una métrica personalizada necesita nombre, unidad, período y dimensiones acotadas, como `Service=orders` y `Environment=prod`. No uses un requestId como dimensión: cada valor crea una serie distinta y puede elevar costos. Incluí el requestId en logs estructurados para buscar una ejecución puntual.

## En entrevista

**Pregunta:** ¿Cómo combinarías métricas, logs y alarmas de CloudWatch durante un incidente?

**Breve:** Separá métricas para detectar cambios, logs para entender eventos y alarmas para iniciar una respuesta. **Ampliada:** explica qué síntoma medirías, qué umbral sería accionable y cómo pasarías de la alarma al request afectado.
## Error frecuente

Alarmar cada métrica con cualquier desviación produce ruido. Elegí señales que representen impacto al usuario, definí período y evaluación, y asigná un responsable y un runbook.

## Práctica

La latencia p95 de `POST /pedidos` sube y aumenta la cantidad de mensajes en SQS. Propón dos métricas, una alarma y los campos de log para investigar.

### Pista

Separá síntoma de causa: una señal mide demora o acumulación; el log debe permitir seguir el pedido sin guardar datos personales.

### Solución

Publicaría p95 y tasa de 5xx de la API, además de `ApproximateAgeOfOldestMessage` de la cola. Alarmaría por latencia o edad sostenida durante varios períodos. Logs JSON con `requestId`, `orderId` seudonimizado, etapa, duración y resultado permiten correlacionar; una dimensión `Service` mantiene acotada la cardinalidad.

## Profundización

[Amazon CloudWatch: conceptos](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) · [Alarmas de CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html)
