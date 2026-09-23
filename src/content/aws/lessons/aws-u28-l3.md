# EC2, balanceo y escalado

## Concepto

Amazon EC2 ofrece máquinas virtuales llamadas instancias. Elegís una familia y tamaño según CPU, memoria, red y carga; también seleccionás imagen, almacenamiento, red y permisos. AWS opera el hardware físico, mientras el equipo administra el sistema operativo y el software instalado en la instancia.

Un Application Load Balancer (ALB) recibe solicitudes HTTP/HTTPS y las distribuye a destinos como instancias sanas. Los health checks verifican si un destino puede recibir tráfico. EC2 Auto Scaling mantiene una cantidad deseada de instancias y puede cambiarla según políticas y métricas, por ejemplo la utilización promedio de CPU o solicitudes por destino.

El escalado vertical aumenta el tamaño de una máquina; el horizontal agrega máquinas. El horizontal mejora capacidad y tolerancia a fallos, pero exige que la aplicación y sus dependencias puedan trabajar con varias instancias.

## Ejemplo

```text
ALB → target group de instancias EC2
Auto Scaling: mínimo 2, deseado 2, máximo 6
Política: aumentar capacidad si suben las solicitudes por destino; quitarla gradualmente cuando la demanda baja.
```

Si una instancia no responde al health check, el ALB deja de enviarle solicitudes; Auto Scaling puede reemplazarla. Esto no corrige una base de datos saturada: esa dependencia requiere límites y métricas propios.

## En entrevista

**Breve:** EC2 da control de una máquina virtual; un ALB reparte tráfico entre destinos sanos y Auto Scaling ajusta la cantidad de instancias. **Ampliada:** explica qué métrica impulsa el escalado, cómo se detecta una instancia fallida y qué dependencia podría seguir siendo un cuello de botella.

## Error frecuente

Suponer que más instancias siempre aumentan el rendimiento. Si todas compiten por una base saturada, solo aumenta la presión. Observa latencia y errores de extremo a extremo además de CPU, y define límites de capacidad.

## Práctica

Una API recibe picos de tráfico y una instancia puede fallar. Propón la configuración conceptual de balanceo y escalado, incluyendo qué medirías y qué comportamiento validarías.

### Pista

Usa destinos en más de una AZ, health checks para retirar instancias que no responden y una métrica ligada a la carga real. Incluye un mínimo y máximo.

### Solución

Coloca un ALB frente a un grupo de instancias EC2 en al menos dos AZ. Configura health checks y Auto Scaling con capacidad mínima suficiente para el tráfico normal y un máximo acorde al presupuesto y a la capacidad de las dependencias. Ajusta escalado con una métrica como solicitudes por destino y observa latencia, tasa de errores y saturación. Prueba que una instancia no sana deja de recibir tráfico y que el grupo la reemplaza; después comprueba qué sucede cuando la base se aproxima a su límite.

## Profundización

[Conceptos de Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) · [Elastic Load Balancing](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html) · [EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
