# Costos, presupuestos y etiquetas

## Concepto

El costo de AWS puede depender del tiempo de ejecución, solicitudes, datos almacenados y transferidos, entre otros factores. Las etiquetas son pares clave-valor que ayudan a identificar recursos, por ejemplo `Environment=dev` y `Owner=equipo-pedidos`. Tras activarlas como etiquetas de asignación de costos, pueden ayudar a agrupar el gasto atribuido a recursos etiquetados; no todos los cargos se asignan directamente a un recurso.

AWS Budgets permite definir un presupuesto y recibir avisos cuando el gasto real o previsto supera umbrales. Una alerta informa: por sí sola no detiene ni limita el consumo. Para prevenir gastos inesperados también se necesitan límites de diseño, cuotas, controles operativos y eliminación de recursos temporales.

## Ejemplo

```text
Un entorno de prueba etiqueta sus recursos con Environment=dev, Owner=plataforma y Application=pedidos. Un presupuesto mensual de desarrollo envía una alerta al 80 % del importe previsto y otra al superarlo. El equipo investiga el aumento y apaga recursos de prueba que ya no necesita.
```

El presupuesto y la etiqueta responden a preguntas distintas: el primero alerta sobre gasto; las segundas ayudan a organizar y analizarlo. Conviene acordar nombres y aplicarlos de forma consistente.

## En entrevista

**Pregunta:** ¿Cómo ayudan las etiquetas a atribuir y controlar costos de AWS?

**Breve:** Las etiquetas ayudan a atribuir gasto y Budgets avisa sobre umbrales; ninguna de las dos funciones bloquea automáticamente el consumo. **Ampliada:** explica cómo detectarías gasto de un entorno y qué acción operativa sigue a una alerta.
## Error frecuente

Asumir que una alerta es un tope o que etiquetar todos los recursos representa cada cargo de la factura. Revisa el detalle de costos, cargos compartidos y recursos sin etiqueta; define quién recibe la alerta y qué hace.

## Práctica

Propón dos etiquetas y dos umbrales para un entorno de pruebas. Indica quién recibe cada aviso y cómo evitarías que recursos olvidados sigan generando cargos.

### Pista

Elige etiquetas que respondan quién es dueño y a qué entorno o aplicación pertenece el recurso. La acción posterior a la alerta debe ser concreta.

### Solución

Usa, por ejemplo, `Environment=dev` y `Application=pedidos`; agrega `Owner` si el equipo necesita asignar responsables. Configura avisos de gasto real y previsto, por ejemplo al 80 % y al 100 % del presupuesto mensual, enviados al responsable del entorno. El aviso inicia una revisión; el equipo identifica el recurso, lo apaga o elimina si ya no se necesita y confirma que no quedan recursos facturables. Los porcentajes e importe deben ajustarse al presupuesto real.

## Profundización

[Administrar AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) · [Etiquetar recursos AWS](https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html)
