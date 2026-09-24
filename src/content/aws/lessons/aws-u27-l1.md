# IAM: usuarios, roles y políticas

## Concepto

AWS Identity and Access Management (IAM) controla qué identidades pueden realizar acciones sobre recursos de AWS. Un usuario IAM es una identidad con credenciales propias; para aplicaciones y servicios suele preferirse un rol, que entrega credenciales temporales a quien lo asume. Una política es un documento que expresa permisos; puede asociarse a una identidad o a un recurso.

Una declaración de política suele incluir `Effect` (Allow o Deny), `Action` (operación), `Resource` (recurso) y, si hace falta, `Condition`. IAM evalúa las políticas aplicables: un `Allow` debe cubrir la solicitud y un `Deny` explícito la bloquea. Limitar acciones y recursos reduce el daño posible si una credencial se expone.

## Ejemplo

```json
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::catalogo/*"
}
```

Esta declaración permite leer objetos cuyas claves estén dentro del bucket `catalogo`. No permite listar el bucket (`s3:ListBucket`) ni subir o borrar objetos. Para listarlo se necesita una declaración separada con el ARN del bucket sin `/*`.

## En entrevista

**Pregunta:** ¿Cómo aplicarías mínimo privilegio con políticas IAM para una aplicación?

**Breve:** IAM combina identidades y políticas para autorizar acciones sobre recursos; un rol entrega acceso temporal y una política limita ese acceso. **Ampliada:** describe principal, acción y recurso de un permiso y cómo verificarías tanto el acceso esperado como el denegado.
## Error frecuente

Usar `Action: "*"` y `Resource: "*"` para resolver un error de permisos. Primero identifica la llamada que falla y agrega solo la acción y el recurso requeridos. Para un objeto y para listar un bucket se necesitan acciones y alcances distintos.

## Práctica

Una tarea Java debe leer el objeto `inventario/actual.csv` del bucket `catalogo` y no debe listar otros objetos ni escribir. Escribe el permiso mínimo y una prueba negativa.

### Pista

La acción de lectura de un objeto es `s3:GetObject`. El recurso se expresa con el ARN del objeto; el comodín representa las claves dentro de ese bucket.

### Solución

Usa `Allow`, `s3:GetObject` y `arn:aws:s3:::catalogo/inventario/actual.csv` para autorizar solo ese objeto. Comprueba que `GetObject` funciona y que `PutObject` y la lectura de otro objeto reciben acceso denegado. Si la tarea necesita cualquier objeto bajo `inventario/`, amplía el ARN a `arn:aws:s3:::catalogo/inventario/*`; no agregues `ListBucket` salvo que el programa realmente necesite enumerar claves.

## Profundización

[Introducción a IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) · [Políticas de acceso](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)
