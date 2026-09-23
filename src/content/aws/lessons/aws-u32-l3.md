# Backups, cuotas y recuperación

## Concepto

RPO expresa cuánta pérdida de datos se tolera, medida como tiempo; RTO expresa cuánto puede tardar la recuperación. Un backup cubre recuperación de datos, pero no garantiza por sí solo que la aplicación vuelva a prestar servicio. Las cuotas de cuenta y servicio también pueden impedir crecer o reconstruir capacidad durante un incidente.

## Ejemplo

```text
Si el RPO de pedidos es 15 minutos, una copia diaria no alcanza. Si el RTO es 2 horas, el equipo debe restaurar una copia en una cuenta de prueba y medir cuánto tarda en validar la aplicación.
```

AWS Backup centraliza planes y políticas para servicios compatibles; cada servicio conserva detalles de consistencia, retención y restauración. Revisa cuotas relevantes antes del incidente: una recuperación puede necesitar crear más instancias, direcciones o capacidad que el uso normal.

## En entrevista

**Breve:** Convertí RTO/RPO de negocio en frecuencia de respaldo y un procedimiento de restauración medible. **Ampliada:** indica cómo demostrarías que el objetivo se cumple y qué límites podrían frustrar el plan.

## Error frecuente

Tomar el estado “backup completado” como prueba de recuperabilidad. Una restauración puede tardar demasiado, perder relaciones entre datos o requerir cuotas no disponibles.

## Práctica

Un servicio acepta pedidos con RPO de 15 minutos y RTO de 2 horas. Diseña un ejercicio de recuperación y señala una cuota que revisarías.

### Pista

Define punto de recuperación, entorno aislado y criterios de aceptación. Mide restauración y validación de extremo a extremo, no solo la creación del backup.

### Solución

Configuro copias con frecuencia compatible con 15 minutos y retención acordada. En un entorno aislado restauro base y objetos, verifico conteos y consistencia, levanto la API y cronometro hasta aceptar un pedido. Reviso cuotas de cómputo, almacenamiento y direcciones de red; registro resultados y corrijo el plan si excede dos horas.

## Profundización

[AWS Backup: conceptos](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html) · [AWS Service Quotas](https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html)
