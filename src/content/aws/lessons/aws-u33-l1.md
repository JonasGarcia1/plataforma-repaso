# SDK Java 2.x y configuración por entorno

## Concepto

Un cliente del SDK resuelve credenciales, región y transporte para invocar un servicio. En AWS, usa la cadena de proveedores para obtener credenciales temporales del rol; para pruebas, se puede dirigir el cliente a un endpoint alternativo. Mantén estas diferencias fuera de la lógica de negocio y evita claves permanentes en el código.

## Ejemplo

```java
S3Client s3 = S3Client.builder()
    .region(Region.US_EAST_1)
    .credentialsProvider(DefaultCredentialsProvider.create())
    .build();
```

La región determina el destino regional y participa en la firma de solicitudes. En un entorno de práctica, un perfil puede aportar región y credenciales de prueba; cualquier endpoint override debe activarse solo mediante configuración local explícita. Cierra clientes al apagar la aplicación, no en cada request.

## En entrevista

**Pregunta:** ¿Qué configura un cliente del SDK y cómo elegirías la fuente de credenciales?

**Breve:** Configurá el SDK por ambiente con región explícita y credenciales provistas por el entorno. **Ampliada:** explica cómo una aplicación local y una carga en AWS obtienen configuraciones distintas sin exponer secretos.
## Error frecuente

Empaquetar endpoint local o credenciales ficticias en el artefacto productivo. Separa configuración de perfiles y falla al iniciar si una configuración requerida no está definida.

## Práctica

Diseña la configuración de un `S3Client` para desarrollo y producción. Describe cómo comprobar que cada perfil llega al destino correcto.

### Pista

La aplicación debe decidir el destino por configuración; las credenciales deben venir de proveedores adecuados al entorno.

### Solución

En AWS usaría región configurada y `DefaultCredentialsProvider`, que puede resolver el rol de ejecución. En desarrollo, un perfil separado aportaría credenciales ficticias y endpoint local explícito. Un test de configuración valida endpoint y región esperados; el despliegue revisa que no exista override ni secreto local.

## Profundización

[AWS SDK for Java 2.x: selección de región](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/region-selection.html) · [Cadena de proveedores de credenciales](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html)
