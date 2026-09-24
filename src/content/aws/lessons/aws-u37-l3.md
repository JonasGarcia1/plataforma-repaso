# Despliegue opcional con SAM y limpieza

## Concepto

AWS SAM describe recursos serverless como infraestructura y ofrece comandos para construir, probar localmente y desplegar un stack en una cuenta. Un despliegue real crea recursos facturables y necesita región, permisos, presupuesto y plan de reversión. Eliminar el stack tampoco garantiza que todos los recursos retenidos o externos desaparezcan.

## Ejemplo

```text
sam validate → sam build → revisar cambios → sam deploy
verificar API y logs → sam delete → revisar recursos retenidos
```

Usa un stack y nombres aislados para práctica. Revisa el conjunto de cambios antes de aplicarlo; limita el rol a los recursos necesarios. Después del despliegue, verifica una solicitud representativa y alarma/logs. Antes de borrar, identifica datos que deban conservarse; después confirma recursos, colas, buckets y logs según la política definida.

## En entrevista

**Pregunta:** ¿Qué recursos y riesgos incluye un despliegue con AWS SAM?

**Breve:** Describí el ciclo de infraestructura declarativa desde validación hasta limpieza verificable. **Ampliada:** explica cómo reducirías el alcance y el costo de una práctica en una cuenta compartida.
## Error frecuente

Asumir que cerrar la terminal revierte un deploy o que `sam delete` elimina recursos retenidos con políticas de conservación. Mantén inventario y confirma el estado final en la cuenta.

## Práctica

Prepara un despliegue de prueba con presupuesto, región y permisos acotados. Define qué revisar antes y cómo demostrar que no quedan recursos activos.

### Pista

Lee los cambios propuestos y lista recursos que pueden persistir por retención o quedar fuera del stack.

### Solución

Valido plantilla, uso una cuenta/stack de práctica y presupuesto con alerta; el rol permite solo operaciones necesarias. Reviso cambios, despliego el mínimo, pruebo endpoint y logs, y luego elimino el stack. Compruebo recursos retenidos, datos y servicios dependientes en consola/API y registro evidencia de limpieza.

## Profundización

[AWS SAM: conceptos](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) · [Construir y probar aplicaciones SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-build.html) · [Eliminar una aplicación SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference-sam-delete.html)
