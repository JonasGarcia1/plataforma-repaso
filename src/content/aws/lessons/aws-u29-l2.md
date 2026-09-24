# Acceso, versionado y ciclo de vida S3

## Concepto

S3 ofrece clases de almacenamiento con distintos precios y condiciones de recuperación. Una regla de ciclo de vida (lifecycle) puede transicionar objetos a otra clase o eliminarlos después de un plazo. La transición puede reducir costo de almacenamiento, pero algunas clases cobran recuperación o requieren una duración mínima.

El versionado conserva versiones de un objeto cuando se sobrescribe o elimina. Un borrado normal en un bucket versionado suele crear un marcador de eliminación; las versiones anteriores siguen almacenadas hasta que se eliminen explícitamente o una regla lifecycle las expire. Versionado ayuda a recuperarse de ciertos errores, pero no reemplaza una política de backup ni protege contra toda acción autorizada.

## Ejemplo

```text
Comprobantes activos: clase Standard para acceso frecuente.
Tras 90 días: transición a una clase de archivo si el negocio tolera su tiempo de recuperación.
Tras 7 años: expiración según la retención aprobada; definir también qué hacer con versiones no actuales.
```

El período debe responder a requisitos de negocio y legales, no a un número elegido solo por comodidad. Antes de activar expiración, prueba la regla con objetos de ejemplo y confirma qué versiones se borrarán.

## En entrevista

**Pregunta:** ¿Cuándo aplicarías una regla de ciclo de vida de S3?

**Breve:** Versionado conserva revisiones; lifecycle automatiza transición o expiración según reglas. **Ampliada:** compara recuperación de una sobrescritura con el archivado y explica el costo o plazo que cambia.
## Error frecuente

Confundir transición a almacenamiento de archivo con borrado, o asumir que borrar la versión actual elimina todo. Revisá versiones no actuales, marcadores de eliminación, costos de recuperación y retención exigida.

## Práctica

Los comprobantes se consultan durante tres meses y deben conservarse siete años. Diseña una política conceptual que permita corregir una sobrescritura y archive documentos antiguos. Indica qué validar antes de expirar datos.

### Pista

Activa versionado para cambios accidentales. Separa la transición de clase de la eliminación final y especifica el tratamiento de versiones no actuales.

### Solución

Habilita versionado y mantén los objetos recientes en una clase de acceso frecuente. Después de tres meses, considera una clase de archivo cuyo tiempo y costo de recuperación satisfagan el requisito. Define expiración solo al cumplirse siete años y añade una regla explícita para versiones no actuales, de acuerdo con la política de retención. Prueba con objetos ficticios que la versión anterior se pueda recuperar y que la regla no elimine contenido antes del plazo aprobado.

## Profundización

[Versionado de S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html) · [Administración del ciclo de vida](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)
