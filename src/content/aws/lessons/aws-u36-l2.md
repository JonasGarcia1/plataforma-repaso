# Disponibilidad y recuperación

## Concepto

Alta disponibilidad busca continuar ante fallos esperables, como perder una instancia o una zona. Recuperación ante desastre prepara la restauración tras eventos mayores, incluida pérdida regional o corrupción lógica. Multi-AZ puede reducir interrupciones, mientras backups y réplicas tienen comportamientos y riesgos distintos; define RTO/RPO y prueba cada mecanismo.

## Ejemplo

```text
Falla una instancia: el balanceador deja de enviarle tráfico y ECS la reemplaza.
Borrado accidental en la base: recuperar desde un punto anterior, validar y redirigir tráfico.
```

Una réplica puede copiar una eliminación o corrupción rápidamente; no siempre reemplaza un backup independiente. El plan debe incluir dependencias, datos, DNS o tráfico, permisos y quién toma la decisión de failover.

## En entrevista

**Pregunta:** ¿Cómo distinguirías alta disponibilidad de recuperación ante desastre?

**Breve:** Asocia el mecanismo al tipo de fallo y al objetivo de recuperación. **Ampliada:** compara failover automático multi-AZ con restauración desde backup y cómo validarías ambos.
## Error frecuente

Prometer continuidad con una réplica sin probar el proceso ni comprender qué errores replica. Mide recuperación y comprueba integridad antes de declarar el servicio restaurado.

## Práctica

El servicio debe tolerar una falla de AZ y también recuperarse de un borrado lógico de pedidos. Propón controles distintos y una prueba para cada uno.

### Pista

Una interrupción física y un cambio lógico dañino requieren caminos diferentes. No dejes que el mecanismo de continuidad replique el daño sin una copia recuperable.

### Solución

Distribuyo API y base según soporte multi-AZ, con balanceo y health checks para sustituir capacidad. Para borrado lógico, conservo backups/PITR y restauro a un entorno aislado; comparo integridad y luego redirijo tráfico. Ejercito failover midiendo interrupción y restauración midiendo RTO/RPO.

## Profundización

[Pilar de confiabilidad de AWS Well-Architected](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html) · [Recuperación a un punto en el tiempo de RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html)
