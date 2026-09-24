# Pruebas locales de integraciones AWS

## Concepto

Las pruebas locales aceleran el ciclo de desarrollo al levantar dependencias controladas y ejercitar solicitudes del SDK sin desplegar cada cambio. Pueden comprobar serialización, configuración de clientes y flujos básicos entre componentes. Una opción es Floci, un emulador local compatible con operaciones específicas; también se pueden usar dobles de prueba, contenedores de servicios compatibles o una cuenta AWS aislada.

## Ejemplo

```text
Test de integración → cliente SDK con endpoint local → S3: PutObject/GetObject
La misma suite en AWS controlada valida permisos, cuotas y comportamiento del servicio real.
```

El endpoint alternativo y las credenciales ficticias deben estar limitados al perfil de prueba. La fidelidad depende de las operaciones implementadas por el emulador: no prueba políticas IAM reales, cuotas, latencia, consistencia completa ni todas las integraciones administradas. La prueba local es una capa de feedback, no evidencia de producción.

## En entrevista

**Pregunta:** ¿Qué puede validar una prueba local con emuladores y qué requiere el entorno AWS real?

**Breve:** Usa pruebas locales para ciclos rápidos y reserva validaciones en AWS para propiedades que el entorno local no reproduce. **Ampliada:** explica cómo elegir entre mocks, emulación y una cuenta de prueba según el riesgo.
## Error frecuente

Interpretar una prueba verde del emulador como garantía de que permisos, reintentos o límites de AWS funcionarán igual. Documenta exactamente qué operación cubre la prueba.

## Práctica

Prueba `PutObject/GetObject` y envío/consumo SQS mediante un endpoint local. Anota tres afirmaciones que la suite puede sostener y tres que requieren AWS real.

### Pista

La suite valida el contrato ejercitado y el flujo de aplicación. Pregunta qué depende de identidad, infraestructura administrada o condiciones de carga reales.

### Solución

Puede demostrar que el cliente se configura, que el objeto se escribe/lee y que el consumidor maneja el evento y duplicados simulados. No demuestra IAM efectivo, cuotas, latencia, durabilidad ante fallas ni paridad de todas las operaciones. En Floci, confirmaría primero cobertura de esas APIs; complementaría con una prueba en cuenta aislada con rol mínimo, presupuesto y limpieza automatizada.

## Profundización

[AWS SDK Java: configuración de endpoint](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/endpoint-config.html) · [AWS Lambda: estrategias de prueba](https://docs.aws.amazon.com/lambda/latest/dg/testing-guide.html) · [Floci: servicios compatibles](https://floci.io/floci/services/)

Para pasar del concepto al recorrido ejecutable, seguí la [unidad 38: Preparar el entorno local con Floci](/aws/leccion/aws-u38-l1). Allí están los pasos del proyecto Java y sus límites de emulación.
