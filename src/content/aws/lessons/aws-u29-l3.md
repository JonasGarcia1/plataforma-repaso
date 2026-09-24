# CloudFront, Route 53 y SES

## Concepto

Amazon CloudFront es una CDN: distribuye contenido desde ubicaciones cercanas a los usuarios y puede reducir latencia y carga en el origen. Solo sirve respuestas desde caché según las políticas configuradas; contenido dinámico o personalizado requiere una política adecuada para no entregar una respuesta de un usuario a otro.

Amazon Route 53 aloja zonas DNS y responde consultas de nombres, por ejemplo para dirigir un dominio a un balanceador o una distribución. Amazon SES envía y recibe correo. Para enviar desde un dominio propio se debe verificar el dominio y configurar autenticación DNS; las cuentas nuevas pueden tener restricciones de sandbox y cuotas.

## Ejemplo

```text
www.tienda.example → Route 53 resuelve a CloudFront
CloudFront → obtiene imágenes públicas del origen S3 y las cachea según TTL
api.tienda.example → Route 53 dirige al ALB; la API responde datos personalizados
La API envía confirmaciones con SES desde un dominio verificado
```

El contenido cacheable, como imágenes con claves versionadas, se beneficia de CDN. Una respuesta que contiene el estado privado de un pedido no debe cachearse como si fuera igual para todos los clientes.

## En entrevista

**Pregunta:** ¿Cómo decide CloudFront si puede responder desde su caché?

**Breve:** CloudFront acelera entrega con una caché configurable; Route 53 resuelve nombres; SES gestiona correo. **Ampliada:** asigna cada servicio a una parte del flujo y nombra una configuración necesaria antes de entregar contenido o enviar correo.
## Error frecuente

Asumir que CloudFront cachea todo de forma segura o que SES puede enviar desde cualquier dominio recién creado. Define TTL y claves de caché según el contenido; verifica el dominio, SPF/DKIM y límites de envío de SES.

## Práctica

Propón servicios para un sitio con imágenes públicas, una API con datos personalizados y correos de confirmación. Explica qué se cachea, cómo se resuelve el dominio y qué habilita el envío.

### Pista

Clasifica las respuestas de la API como personalizadas. El DNS encuentra destinos, la CDN entrega contenido cacheable y el servicio de correo necesita autorización del dominio.

### Solución

Usa CloudFront para imágenes públicas con TTL definido y Route 53 para publicar el nombre del sitio y dirigirlo a la distribución. Dirige el nombre de la API al ALB y configura su respuesta personalizada para no quedar compartida en caché entre usuarios. Usa SES para confirmaciones después de verificar el dominio y configurar autenticación y cuotas de envío. Prueba una imagen repetida para observar la caché y valida que dos usuarios no reciban la respuesta privada del otro.

## Profundización

[Introducción a CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) · [Guía de Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html) · [Guía de Amazon SES](https://docs.aws.amazon.com/ses/latest/dg/Welcome.html)
