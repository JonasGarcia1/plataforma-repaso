# SNS y EventBridge

## Concepto

Amazon SNS es un servicio pub/sub: un publisher publica en un topic y SNS distribuye el mensaje a sus suscriptores, como varias colas SQS, funciones Lambda o endpoints HTTP. Es útil para fan-out cuando varios consumidores deben recibir una notificación sobre el mismo hecho.

Amazon EventBridge es un bus de eventos que recibe eventos y aplica reglas para seleccionar y enrutar eventos a destinos compatibles. Las reglas pueden filtrar por campos del evento. Es útil para conectar productores y consumidores por eventos con menor acoplamiento. Los dos servicios tienen políticas de reintento y límites propios; la elección depende de filtrado, tipos de destino, orden y operación requerida.

## Ejemplo

```text
Hecho: pedido confirmado
SNS: distribuir una notificación equivalente a cola de inventario y cola de correo
EventBridge: filtrar {"source":"pedidos","detail-type":"PedidoConfirmado"}
             y enrutar a destinos distintos según estado o región
```

En ambos casos los consumidores deben manejar fallos y posibles entregas repetidas. SNS no reemplaza el almacenamiento duradero de trabajo de cada consumidor; para conservar y procesar independientemente se suele suscribir una cola SQS por consumidor.

## En entrevista

**Breve:** SNS distribuye publicaciones a suscriptores; EventBridge filtra y enruta eventos mediante reglas. **Ampliada:** recomienda uno para notificar varios destinos del mismo mensaje y otro para enrutar distintos tipos de eventos según su contenido.

## Error frecuente

Elegir por familiaridad sin revisar los destinos, garantías y forma de reprocesar. Una suscripción directa puede acoplar al publicador con disponibilidad del consumidor; una cola por consumidor permite acumular trabajo y aislar ritmos.

## Práctica

Al confirmarse un pedido deben iniciarse inventario y correo. Luego, los pedidos internacionales deben activar además una validación especial. Diseña una alternativa con SNS y otra con EventBridge; explica cuándo cada patrón conviene.

### Pista

Para el primer requisito todos reciben el mismo hecho. Para el segundo, importa filtrar por un campo del evento y añadir un destino condicional.

### Solución

Con SNS publica `PedidoConfirmado` en un topic y suscribe una cola SQS para inventario y otra para correo; cada consumidor procesa a su ritmo. Con EventBridge publica el evento en un bus, crea reglas para `PedidoConfirmado` hacia esos destinos y una regla que filtre `region=internacional` hacia la validación especial. SNS es directo para fan-out de una notificación uniforme; EventBridge conviene cuando el ruteo depende del contenido o hay varios tipos de evento. En ambos casos configura permisos y manejo de fallos en los destinos.

## Profundización

[Amazon SNS](https://docs.aws.amazon.com/sns/latest/dg/welcome.html) · [Amazon EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html)
