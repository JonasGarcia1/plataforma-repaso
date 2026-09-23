# Credenciales temporales y cadena del SDK

## Concepto

El AWS SDK for Java 2.x necesita credenciales para firmar solicitudes. Su cadena predeterminada busca credenciales en fuentes configuradas para el proceso; por ejemplo, variables de entorno, perfiles compartidos y credenciales ofrecidas por el runtime de AWS. La primera fuente disponible se usa. Por eso un perfil local puede prevalecer sobre el rol que esperabas usar si el proceso hereda esas variables o configuración.

Las credenciales temporales incluyen una clave de acceso, una clave secreta y un token de sesión, y expiran. En AWS, un rol asociado al runtime permite obtenerlas sin guardar una clave permanente en el código. En la computadora del desarrollador se puede usar un perfil configurado mediante AWS CLI, preferentemente con acceso temporal o federado.

## Ejemplo

```java
S3Client s3 = S3Client.builder()
    .region(Region.US_EAST_1)
    .build();
```

El SDK selecciona la región indicada y, al no especificarse un proveedor de credenciales, consulta su cadena predeterminada. El código no incluye claves. El perfil, variables o rol disponibles dependen del entorno desde donde se ejecuta.

## En entrevista

**Breve:** El SDK puede obtener credenciales de un perfil local o del rol del runtime mediante su cadena de proveedores. **Ampliada:** explica por qué el mismo artefacto puede usar fuentes distintas en desarrollo y AWS, y qué revisarías ante `Unable to load credentials`.

## Error frecuente

Guardar access keys en `application.properties`, código o variables versionadas. También es fácil diagnosticar mal la fuente activa: revisa variables, perfil seleccionado y rol asociado al runtime, sin imprimir secretos.

## Práctica

Describe cómo ejecutarías la misma aplicación localmente y en una tarea AWS. Incluye cómo evitas claves en el repositorio y cómo verificas qué identidad obtuvo el permiso.

### Pista

Configura una fuente local para desarrollo y un rol para el runtime. La identidad efectiva puede verificarse con `sts:GetCallerIdentity` usando las mismas credenciales del proceso.

### Solución

Localmente configura un perfil compartido con acceso temporal/federado y selecciona ese perfil para el proceso. En AWS asocia un rol al servicio que ejecuta la aplicación y otorga al rol solo las acciones requeridas. No agregues claves al artefacto. Ejecuta `GetCallerIdentity` en cada entorno para confirmar la cuenta y el ARN; si el SDK no encuentra credenciales, revisa perfil, variables y configuración del rol.

## Profundización

[Cadena de credenciales del SDK Java](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html) · [Credenciales temporales de IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html)
