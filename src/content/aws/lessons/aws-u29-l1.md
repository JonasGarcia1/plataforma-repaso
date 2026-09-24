# S3: objetos, buckets y claves

## Concepto

Amazon S3 es almacenamiento de objetos. Un bucket es un contenedor creado en una región; dentro se guardan objetos. Cada objeto tiene datos y una clave que lo identifica dentro del bucket, como `comprobantes/2026/orden-42.pdf`. Los prefijos que parecen carpetas son parte de la clave; no son directorios tradicionales.

S3 conviene para archivos y datos que se acceden como objetos, como imágenes, documentos o respaldos. Una clave no es secreta ni concede permiso. El acceso se controla con IAM, políticas de bucket y otros controles; por defecto, el acceso público debe mantenerse bloqueado salvo un requisito explícito y revisado.

## Ejemplo

```java
PutObjectRequest request = PutObjectRequest.builder()
    .bucket("comprobantes-pedidos")
    .key("2026/orden-42.pdf")
    .contentType("application/pdf")
    .build();
s3.putObject(request, RequestBody.fromFile(Path.of("orden-42.pdf")));
```

El cliente envía bytes al bucket y la clave indicada. El código necesita permiso `s3:PutObject` sobre ese recurso; para leerlo necesita `s3:GetObject`. Configura el bucket para bloquear acceso público y evita poner información personal en nombres de bucket o claves que aparezcan en logs.

## En entrevista

**Pregunta:** ¿Cómo identificás un objeto de S3 y qué diferencia hay entre bucket, key y contenido?

**Breve:** S3 guarda objetos identificados por bucket y clave; es apropiado para archivos, no una carpeta compartida con operaciones de sistema de archivos. **Ampliada:** describe cómo subes un documento y limitas el acceso a una aplicación.
## Error frecuente

Suponer que conocer la URL o la clave basta para acceder, o hacer público un bucket para que una aplicación pueda leer un objeto. La aplicación debe usar una identidad autorizada; el bloqueo público no reemplaza IAM.

## Práctica

Una API debe guardar comprobantes PDF y permitir que solo el rol de la API lea y escriba objetos bajo `comprobantes/`. Define bucket, clave y permisos; indica una prueba que confirme que otro rol no accede.

### Pista

Separa el ARN del bucket del ARN de sus objetos. Limita `PutObject` y `GetObject` al prefijo requerido y bloquea acceso público.

### Solución

Crea un bucket privado, por ejemplo `pedidos-documentos`, y guarda cada archivo con una clave como `comprobantes/orden-42.pdf`. Al rol de la API otorga `s3:PutObject` y `s3:GetObject` sobre `arn:aws:s3:::pedidos-documentos/comprobantes/*`. No incluyas `s3:ListBucket` si no necesita enumerar objetos. Verifica que el rol de la API opere con el archivo y que un rol distinto reciba acceso denegado.

## Profundización

[Guía de usuario de Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) · [Bloquear acceso público](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html)
