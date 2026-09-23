# S3 y DynamoDB desde Java

## Concepto

El SDK Java 2.x modela llamadas AWS con clientes tipados y requests explícitos. S3 guarda objetos identificados por bucket y key; DynamoDB guarda ítems consultables a partir de claves diseñadas para los patrones de acceso. Valida entradas antes de construir requests y traduce excepciones del SDK a resultados comprensibles para el dominio.

## Ejemplo

```java
PutObjectRequest request = PutObjectRequest.builder()
    .bucket(bucket).key("orders/123.json").contentType("application/json").build();
s3.putObject(request, RequestBody.fromFile(file));
```

Para DynamoDB, una consulta por `partitionKey` y rango de `sortKey` aprovecha la clave; un scan recorre la tabla y puede ser costoso. Reutiliza clientes de larga vida. Para streams de S3, cierra el stream aunque la lectura falle.

## En entrevista

**Breve:** Diferenciá el almacenamiento de objetos de S3 del acceso por claves y patrones de DynamoDB. **Ampliada:** explica cómo evitarías sobrescrituras accidentales, scans innecesarios y filtraciones en logs.

## Error frecuente

Diseñar DynamoDB como una base relacional y esperar joins, o asumir que el nombre de una key S3 representa una carpeta real. El modelo y la consulta deben seguir el contrato de acceso.

## Práctica

Implementa un repositorio de pedidos: guardar un JSON en S3 y registrar su estado en DynamoDB. ¿Qué harías si una operación termina y la otra falla?

### Pista

Son dos escrituras independientes y no forman una transacción conjunta. Define cuál es fuente de verdad y cómo detectar o reparar el estado parcial.

### Solución

Inyecto clientes reutilizables. Guardo el objeto con key determinista y metadata de versión; registro estado con una condición que impida duplicar la transición. Si S3 funciona y DynamoDB falla, guardo estado recuperable y reintento idempotentemente o ejecuto compensación; registro IDs y resultado, nunca el contenido sensible. Una prueba cubre éxito y fallo entre pasos.

## Profundización

[S3 con AWS SDK for Java](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/examples-s3.html) · [DynamoDB con AWS SDK for Java](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/examples-dynamodb.html)
