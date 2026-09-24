# Empaquetado y pruebas de Lambda

## Concepto

El paquete desplegado debe incluir clases compiladas, dependencias y configuración de handler que coincida con el runtime. Una prueba unitaria verifica lógica; una prueba de integración comprueba serialización, configuración y comportamiento del runtime o disparador. Ninguna prueba aislada garantiza permisos o límites de la cuenta productiva.

## Ejemplo

```text
Evento JSON → deserialización OrderEvent → handler → OrderService → resultado JSON
```

Construye el artefacto de forma reproducible y prueba el mismo tipo de evento que recibirá el disparador. La inicialización fuera del handler puede reutilizar clientes; mide primero el cold start y el tamaño del paquete antes de optimizar dependencias.

## En entrevista

**Pregunta:** ¿Qué elementos debe incluir el paquete desplegable de una Lambda Java?

**Breve:** Verificá lógica, contrato del evento y paquete de despliegue con niveles de prueba distintos. **Ampliada:** explica qué aporta una prueba local y qué aún debe validarse en AWS.
## Error frecuente

Tratar una prueba unitaria como evidencia de que el ZIP/JAR, handler y permisos configurados funcionarán. Incluye una comprobación del artefacto y una prueba de integración representativa.

## Práctica

Un handler Java funciona en unit tests pero falla al desplegar con `ClassNotFoundException`. Propón cómo reproducir y prevenir el error.

### Pista

Inspecciona el artefacto final y compara nombre de clase, dependencias, handler configurado y runtime.

### Solución

Construyo el paquete con el comando de despliegue reproducible, inspecciono su contenido y ejecuto una prueba de invocación con evento de ejemplo. Verifico que el handler apunte a la clase y método correctos y que dependencias estén incluidas. En AWS reviso logs de inicialización y configuración del runtime; mantengo la prueba de negocio separada.

## Profundización

[Empaquetar funciones Lambda Java](https://docs.aws.amazon.com/lambda/latest/dg/java-package.html) · [Estrategias para probar Lambda](https://docs.aws.amazon.com/lambda/latest/dg/testing-guide.html)
