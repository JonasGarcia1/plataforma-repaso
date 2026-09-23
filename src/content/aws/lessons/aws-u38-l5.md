# Verificar el flujo y limpiar el entorno

## Concepto

La prueba integral debe comprobar cada frontera: aceptación HTTP, objeto en S3, mensaje en SQS, invocación del handler y fila en DynamoDB. Una respuesta exitosa de la API no prueba que el consumidor ya terminó. Logs y métricas del entorno ayudan a encontrar dónde se detuvo el recorrido. Floci permite practicar las operaciones compatibles de forma local; no comprueba permisos efectivos, cuotas, latencia, disponibilidad, durabilidad ni todas las semánticas de AWS real.

## Ejemplo

Con los servicios levantados, enviá un `orderId` único y consultá los efectos en cada servicio mediante los comandos de la guía del laboratorio. El repositorio incluye pruebas Maven, por lo que se puede ejecutar:

```powershell
$env:AWS_PROFILE = 'floci'
$env:AWS_ENDPOINT_URL = 'http://localhost:4566'
mvn test
docker compose ps
```

Después de registrar la evidencia, eliminá los recursos creados y detené Floci:

```powershell
.\scripts\cleanup-floci.ps1
```

El script borra la función y el mapping, las colas, la tabla y el bucket del emulador, y luego detiene el contenedor. `docker compose down` por sí solo no elimina esos recursos internos de Floci ni borra el código del proyecto.

### Resultado esperado

Para el pedido de prueba, podés correlacionar la respuesta de la API, la clave S3, el mensaje procesado y el registro DynamoDB. Al terminar, `docker compose ps` ya no muestra el servicio de Floci en ejecución.

## En entrevista

**Breve:** ¿Qué valida una integración local? **Ampliada:** separá la evidencia del emulador de las propiedades que solo se validan en AWS o con pruebas de carga/operación específicas.

## Error frecuente

Usar una prueba verde local como afirmación general de compatibilidad de producción. La cobertura depende de la versión del emulador y de las operaciones utilizadas; documentá ese alcance con precisión.

## Práctica

Recorré un pedido de punta a punta, guardá las observaciones y luego detené los servicios. Indicá una garantía que verificaste localmente y otra que no verificaste.

### Pista

Sigue un ID estable por cada paso y revisá explícitamente los servicios antes de limpiar.

### Solución

La prueba integral del README termina con `OK` cuando el pedido y duplicado se procesaron, y el mensaje inválido llegó a la DLQ. Demuestra el recorrido implementado en Floci 2.1.0; no demuestra permisos IAM, cuotas, latencia de producción o disponibilidad administrada. Se ejecuta `cleanup-floci.ps1` y se comprueba Docker; cualquier validación AWS real es optativa y debe usar una cuenta aislada, permisos mínimos y presupuesto.

## Profundización

[Abrir el paso 5 del laboratorio en GitHub](https://github.com/JonasGarcia1/aws-java-floci-labs#paso-5-verificar-y-limpiar)

Los pasos 1 a 5 del README del laboratorio describen el flujo completo, los comandos y los archivos de cada etapa. La función local necesita el socket Docker para iniciar el runtime; mantené ese acceso limitado al entorno de práctica.

[Floci: servicio Lambda](https://floci.io/floci/services/lambda/) · [AWS Lambda: estrategias de prueba](https://docs.aws.amazon.com/lambda/latest/dg/testing-guide.html)
