# EC2, ECS, EKS o Lambda

## Concepto

Elegí cómputo según duración y forma de carga, necesidad de control, patrón de escalado y capacidad operativa del equipo. EC2 entrega control del servidor; ECS organiza contenedores; EKS ofrece Kubernetes administrado pero mantiene responsabilidades de clúster y plataforma; Lambda ejecuta funciones ante eventos con límites de duración y entorno.

## Ejemplo

```text
API Java siempre activa y simple de operar → ECS/Fargate puede encajar.
Procesamiento breve disparado por eventos → Lambda puede encajar.
Necesidad de control del SO → EC2; ecosistema Kubernetes existente → evaluar EKS.
```

No decidas por el nombre del servicio: compara costos a la carga prevista, arranque, duración, estado, conexiones, despliegue y habilidades del equipo. “Serverless” cambia qué infraestructura se opera, pero no elimina límites, observabilidad ni diseño de resiliencia.

## En entrevista

**Pregunta:** ¿Cómo elegirías entre EC2, ECS, EKS y Lambda según la carga?

**Breve:** Presentá requisitos primero y compara el costo operativo y técnico de dos opciones. **Ampliada:** indica qué dato de carga o restricción podría cambiar tu recomendación.
## Error frecuente

Elegir EKS solo porque el equipo conoce Kubernetes, aunque no necesite sus APIs ni tenga capacidad para operar la plataforma. La complejidad también es un costo.

## Práctica

Una API web estable recibe tráfico constante y un job procesa lotes cada noche. Recomienda opciones iniciales y menciona dos requisitos que podrían cambiar cada elección.

### Pista

Separa la carga continua del trabajo por lotes. Pregunta por duración, picos, dependencias, tolerancia a arranque y necesidad de control del sistema.

### Solución

Probaría ECS/Fargate para la API si el equipo quiere contenedores sin administrar hosts, y Lambda o una task programada para lotes si duración y límites encajan. Tráfico muy variable, ejecución prolongada, requisito de GPU, control del SO o Kubernetes ya operado pueden cambiar la decisión. Validaría costo y comportamiento con una carga representativa.

## Profundización

[Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) · [Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) · [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
