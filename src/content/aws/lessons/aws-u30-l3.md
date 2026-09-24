# RDS, DynamoDB o ElastiCache

## Concepto

RDS, DynamoDB y ElastiCache resuelven necesidades distintas. RDS guarda datos relacionales y permite SQL y transacciones. DynamoDB guarda elementos NoSQL con acceso diseñado alrededor de claves y patrones de consulta. ElastiCache ofrece cachés en memoria, por ejemplo Redis OSS o Valkey, para lecturas de baja latencia; normalmente no debe ser la única copia de datos que el sistema necesita conservar.

Al elegir, compara el modelo del dato, las consultas, consistencia requerida, latencia, volumen, disponibilidad y carga operativa. Una caché puede acelerar lecturas repetidas, pero introduce expiración e invalidación: si cambia la fuente de verdad, hay que decidir cuándo la copia cacheada deja de ser válida.

## Ejemplo

```text
GET /catalogo/42 → buscar cache key producto:42
  hit: devolver resultado cacheado
  miss: leer fuente de verdad, guardar con TTL de 5 minutos y responder
Al actualizar producto 42: invalidar producto:42 después de confirmar la escritura.
```

RDS podría ser la fuente de verdad si se requieren relaciones y transacciones; DynamoDB si las consultas son conocidas y se ajustan a claves. ElastiCache puede complementar cualquiera para lecturas frecuentes, si el beneficio medido supera su costo y complejidad.

## En entrevista

**Pregunta:** ¿Cuándo elegirías RDS, DynamoDB o ElastiCache?

**Breve:** RDS prioriza SQL y relaciones; DynamoDB patrones de acceso por clave; ElastiCache acelera datos reconstruibles o recargables. **Ampliada:** compara las opciones para un catálogo y explica la estrategia si la caché pierde una entrada.
## Error frecuente

Guardar en caché como única copia un dato que no se puede reconstruir, o asumir que TTL garantiza datos frescos. El TTL limita cuánto dura una entrada, pero puede haber datos obsoletos hasta que venza.

## Práctica

Un catálogo se consulta muchas veces y se actualiza ocasionalmente. Elige una fuente de verdad y una estrategia de caché; explica cómo responder a un cache miss y cómo evitar servir una actualización antigua indefinidamente.

### Pista

La caché debe poder reconstruirse desde la fuente. Define TTL e invalidación para las escrituras, y observa hit ratio y latencia.

### Solución

Elige RDS si el catálogo necesita consultas relacionales o DynamoDB si sus accesos conocidos encajan con claves. Mantén allí la fuente de verdad. En un miss lee el registro, almacénalo con TTL y responde. Tras actualizar, invalida la entrada correspondiente; el TTL funciona como límite adicional si falla la invalidación. Si la caché está vacía o indisponible, la aplicación debe poder volver a leer la fuente y responder dentro de sus límites. Mide hit ratio, latencia y carga de la base para confirmar el beneficio.

## Profundización

[Amazon ElastiCache](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html) · [Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html) · [Introducción a DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
