# Regiones, zonas y disponibilidad

## Concepto

Una región de AWS es un área geográfica independiente. Cada región contiene varias zonas de disponibilidad (AZ): grupos separados de centros de datos con infraestructura y fallos de energía y red diseñados para ser independientes. Una ubicación de borde acerca ciertos servicios, como la entrega de contenido, a los usuarios; no es una región ni una AZ.

Desplegar copias en más de una AZ puede mantener una aplicación disponible ante la interrupción de una zona. Para que funcione, las instancias, el balanceo y los datos deben tener una estrategia compatible. “Multi-AZ” reduce algunos riesgos; no protege por sí solo contra errores de aplicación, borrados ni una interrupción regional.

## Ejemplo

```text
Una API tiene instancias en AZ-a y AZ-b detrás de un balanceador con health checks. Si AZ-a deja de responder, el balanceador deja de enviarle tráfico. La base también debe poder atender durante ese fallo; una sola instancia de base en AZ-a seguiría siendo un punto único de falla.
```

La selección de región también afecta latencia, residencia de datos, servicios disponibles y costo. Replicar entre regiones es una decisión distinta de distribuir entre AZ dentro de una región y requiere definir cómo se copian y recuperan los datos.

## En entrevista

**Breve:** La región es un área geográfica y las AZ son ubicaciones aisladas dentro de ella. Multi-AZ ayuda ante fallos de zona si todos los componentes críticos tienen una estrategia compatible. **Ampliada:** señala un componente que debe sobrevivir junto a las instancias y explica cómo probarías el failover.

## Error frecuente

Confundir varias subredes con alta disponibilidad. Dos subredes en la misma AZ no distribuyen la carga entre zonas; verificá la AZ de cada subred y dónde se ejecutan los componentes.

## Práctica

Dibuja una API con balanceador, dos instancias en AZ distintas y una base. Explica qué sigue funcionando si falla una AZ y qué pregunta queda abierta sobre los datos.

### Pista

Recorre el camino de la solicitud y luego el de lectura/escritura a la base. Una instancia disponible no sirve si su dependencia crítica queda aislada.

### Solución

El balanceador debe tener nodos en subredes de AZ distintas y enviar solicitudes solo a instancias sanas. Las instancias de la API también deben distribuirse entre ambas AZ. Para la base hay que confirmar una configuración multi-AZ o una alternativa de recuperación que satisfaga el tiempo de interrupción aceptado; no alcanza con asumir que la base cambia de zona automáticamente. La prueba consiste en retirar o simular la pérdida de una instancia/zona y medir errores y recuperación.

## Profundización

[Infraestructura global de AWS](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/global-infrastructure.html)
