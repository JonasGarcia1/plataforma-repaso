# CloudTrail y auditoría

## Concepto

CloudTrail registra actividad de la cuenta asociada a llamadas de API: quién actuó, qué operación hizo, cuándo y desde qué origen. El historial de eventos ayuda a investigar cambios recientes; un trail puede entregar eventos a S3 y alimentar consultas y alertas. CloudTrail responde preguntas de auditoría, mientras CloudWatch se usa para señales operativas de aplicaciones.

## Ejemplo

```text
Una política IAM cambia a las 14:05 y la API de pedidos empieza a recibir AccessDenied. Busca en CloudTrail el evento de cambio, identidad, recurso y hora; usa los logs de la API para encontrar las solicitudes afectadas.
```

Un evento de administración como `PutRolePolicy` puede explicar quién alteró permisos. Los valores sensibles pueden omitirse o redactarse; no trates el registro como captura completa de cada dato enviado por una aplicación.

## En entrevista

**Breve:** Usá CloudTrail para reconstruir acciones de API en la cuenta y CloudWatch para observar el comportamiento del servicio. **Ampliada:** describe qué atributos buscarías y cómo preservarías los registros para una investigación posterior.

## Error frecuente

Confiar solo en logs de aplicación para auditar cambios IAM: quien modifica la infraestructura puede no pasar por esa aplicación. Configurá retención y acceso al trail según el riesgo, y monitoreá que el registro siga activo.

## Práctica

Después de un cambio de rol, una Lambda dejó de leer una tabla. Indica qué evento buscarías y cómo comprobarías el efecto en la función.

### Pista

Acotá primero hora y recurso. Luego compara la identidad y la política antes/después con los errores de autorización observados por la función.

### Solución

Buscaría eventos de administración de IAM, como `PutRolePolicy` o `AttachRolePolicy`, por hora y rol; revisaría identidad, origen, recurso y resultado. En CloudWatch Logs correlacionaría invocaciones y `AccessDenied`, sin registrar credenciales. Confirmaría la política efectiva con una prueba de acceso mínima y documentaría la reversión si el cambio fue accidental.

## Profundización

[AWS CloudTrail: guía del usuario](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html) · [Historial de eventos de CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html)
