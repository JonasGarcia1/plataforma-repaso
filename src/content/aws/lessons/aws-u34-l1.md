# Handlers Lambda con Java 21

## Concepto

Lambda invoca un handler con un evento y un contexto de ejecución. El handler adapta el formato de entrada al caso de uso y devuelve o confirma el resultado según el tipo de integración. Mantener la lógica de negocio en una clase independiente facilita probarla sin construir el runtime de Lambda.

## Ejemplo

```java
public class OrderHandler implements RequestHandler<OrderEvent, Result> {
  private final OrderService service = new OrderService();

  public Result handleRequest(OrderEvent event, Context context) {
    return service.process(event);
  }
}
```

Lambda puede reutilizar el entorno entre invocaciones, así que inicializar un cliente AWS fuera del handler evita trabajo repetido. No guardes en campos datos mutables de una solicitud: podrían sobrevivir y mezclarse con otra invocación. El cold start ocurre cuando se prepara un entorno nuevo y varía con runtime, paquete y configuración.

## En entrevista

**Breve:** El handler adapta evento y contexto y delega el trabajo. **Ampliada:** describe qué inicializarías una vez, qué estado evitarías compartir y cómo probarías un evento inválido.

## Error frecuente

Suponer que cada invocación recibe un proceso limpio. Trata el entorno como reutilizable y evita datos de usuario o estado de request en campos estáticos.

## Práctica

Implementa el flujo de un evento `OrderCreated` con validación, caso de uso y resultado. Indica qué probarías sin invocar AWS.

### Pista

El evento es una frontera externa: valida campos obligatorios y transforma el formato antes de llamar al dominio.

### Solución

El handler valida `eventId` y `orderId`, crea un comando del dominio y delega a `OrderService`. Pruebo el servicio con eventos válidos, incompletos y duplicados; una prueba del handler confirma mapeo y resultado. Registro request ID y resultado, sin incluir datos sensibles.

## Profundización

[Handlers de Lambda para Java](https://docs.aws.amazon.com/lambda/latest/dg/java-handler.html) · [Runtime de Java en Lambda](https://docs.aws.amazon.com/lambda/latest/dg/lambda-java.html)
