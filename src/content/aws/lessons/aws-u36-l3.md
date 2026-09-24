# Timeouts, reintentos y costo

## Concepto

Un timeout limita cuánto espera una llamada; un retry repite una operación ante fallos clasificados como transitorios. Reintentos sin límite pueden aumentar carga y costo durante una degradación. Usa presupuesto de tiempo total, backoff con jitter y una política de idempotencia coherente con el efecto.

## Ejemplo

```text
Cliente → intento 1 → timeout → espera aleatoria creciente → intento 2
Máximo: 3 intentos y 5 s totales; un error de validación no se reintenta.
```

El SDK Java tiene estrategia de reintento configurable y defaults que pueden variar según cliente/versión; conoce la configuración efectiva. Para una escritura, un timeout no demuestra que el servidor no la aplicó: usa clave idempotente o condición para que repetirla no duplique el efecto.

## En entrevista

**Pregunta:** ¿Cómo limitarías el impacto de retries y timeouts durante una degradación?

**Breve:** Limitá duración e intentos y reintenta solo fallos transitorios con protección contra duplicados. **Ampliada:** explica qué puede significar un timeout de escritura y cómo controlarías el costo de la política.
## Error frecuente

Reintentar una solicitud no idempotente a ciegas: el primer intento pudo completarse aunque la respuesta se haya perdido. Evita multiplicar retries en varias capas sin un presupuesto común.

## Práctica

Una API crea pedidos en DynamoDB; el cliente recibe timeout. Diseña la repetición segura y una política acotada.

### Pista

Haz que cada intento use la misma clave de pedido y distingue error transitorio de validación o conflicto de negocio.

### Solución

Uso `orderId` como clave estable y una escritura condicional para crear solo si no existe; una repetición devuelve el estado ya creado. Configuro timeout de conexión y request, pocos intentos con backoff exponencial y jitter, y un deadline total. Mido errores, latencia y llamadas por operación para vigilar costo; no reintento validación.

## Profundización

[Estrategias de reintento del SDK Java](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/retry-strategy.html) · [Optimización de costos de Well-Architected](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)
