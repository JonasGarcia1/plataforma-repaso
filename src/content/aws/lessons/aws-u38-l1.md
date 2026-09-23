# Preparar el entorno local con Floci

## Concepto

El laboratorio usa Floci como emulador local de algunas operaciones AWS. Docker ejecuta el servicio y los clientes AWS CLI/SDK apuntan al endpoint `http://localhost:4566`. El perfil `floci` mantiene esa configuración separada de los perfiles de una cuenta real; sus claves `test` / `test` son ficticias y solo sirven para el entorno local. El proyecto necesita Java 21, Maven, Docker y AWS CLI v2.

## Ejemplo

Desde la carpeta del laboratorio, iniciá Floci con el montaje de Docker que necesita el runtime Lambda:

```powershell
docker compose -f compose.yaml -f compose.lambda.yaml up -d
docker compose ps
$env:AWS_PROFILE = 'floci'
./scripts/init-floci.ps1
aws --profile floci --endpoint-url http://localhost:4566 s3 list-buckets
```

El perfil debe tener región `us-east-1` y credenciales ficticias. El archivo de configuración se llama `~/.aws/config` y declara `[profile floci]`; `~/.aws/credentials` declara `[floci]` con `aws_access_key_id = test` y `aws_secret_access_key = test`. El script prepara el bucket, colas y tabla usados por los ejemplos. Si una llamada no funciona, revisá primero `docker compose ps`, el perfil activo y el endpoint.

### Resultado esperado

Floci aparece en estado activo y la CLI lista el bucket de práctica. La salida del script informa las URL de las colas. Si el script dice que un recurso ya existe, consultalo con la CLI antes de volver a crearlo.

## En entrevista

**Breve:** ¿Cómo evitás que un test local escriba por accidente en AWS? **Ampliada:** separá perfil, endpoint, credenciales y configuración de la aplicación; explicá cómo comprobarías el destino antes de ejecutar una operación destructiva.

## Error frecuente

Confiar en que `AWS_PROFILE=floci` por sí solo redirige una llamada al emulador. El perfil selecciona credenciales y región; el endpoint local también debe quedar explícito en la CLI o en la configuración SDK.

## Práctica

Iniciá Floci, prepará los recursos y verificá la lista de buckets. Identificá qué valor distingue una llamada local de una llamada a AWS.

### Pista

Buscá el endpoint de la solicitud, el perfil activo y la región que se envían al cliente.

### Solución

La solicitud debe usar `http://localhost:4566`, el perfil `floci` y las claves ficticias. La CLI lista `repaso-orders` en el entorno local. Antes de seguir, confirmá que no estás usando variables de credenciales reales en esa terminal.

## Profundización

[Abrir el paso 1 del laboratorio en GitHub](https://github.com/JonasGarcia1/aws-java-floci-labs#paso-1-preparar-floci-y-los-recursos)

En el repositorio del laboratorio, este paso corresponde a `compose.yaml`, `compose.lambda.yaml`, `scripts/init-floci.ps1` y la sección “Paso 1” del README. La matriz de servicios compatibles indica el alcance que ofrece el emulador para cada servicio y operación.

[Floci: servicios compatibles](https://floci.io/floci/services/) · [AWS CLI: perfiles con nombre](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)
