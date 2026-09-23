# ECS y Fargate para Spring Boot

## Concepto

En ECS, una task definition describe imagen, CPU/memoria, puertos, roles y logging; una task es una ejecución de esa definición. Un service mantiene el número deseado de tasks saludables y coordina despliegues. Fargate aporta capacidad de cómputo sin que el equipo administre instancias EC2.

## Ejemplo

```text
ECS Service (desiredCount=2) → dos tasks Fargate → ALB distribuye tráfico
```

El execution role permite a ECS descargar la imagen y publicar logs; el task role da permisos a la aplicación, por ejemplo leer una cola. La subred, grupos de seguridad y health check determinan si la task puede arrancar y recibir tráfico. Fargate quita operación de servidores, pero no diseña red, permisos ni capacidad.

## En entrevista

**Breve:** Diferenciá definición, ejecución y servicio ECS; explica qué simplifica Fargate. **Ampliada:** describe cómo diagnosticarías una task que arranca pero no pasa el health check.

## Error frecuente

Dar permisos de aplicación al execution role o asumir que “administrado” significa sin configuración. Mantén roles separados y usa health checks que reflejen disponibilidad real.

## Práctica

Despliega una API Spring Boot con dos tasks. Una queda `UNHEALTHY`; ¿qué revisarías y qué permisos necesita para leer SQS?

### Pista

Sigue el ciclo: descarga de imagen, arranque, conectividad, health check y acceso a servicio. Los permisos de la aplicación van en el task role.

### Solución

Reviso eventos ECS, logs de contenedor, puerto y ruta del health check, variables y conectividad desde la subred. Configuro dos tasks detrás de un ALB y un task role con `ReceiveMessage`, `DeleteMessage` y `GetQueueAttributes` solo para la cola requerida; el execution role conserva permisos para imagen y logs. Pruebo actualización y rollback.

## Profundización

[Amazon ECS: guía del desarrollador](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html) · [AWS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
