# Seguridad de red y DNS

## Concepto

Los security groups son firewalls asociados a interfaces de red de recursos. Tienen reglas de entrada y salida y son stateful: el tráfico de respuesta a una conexión permitida se acepta automáticamente. Las Network ACL (NACL) se aplican a nivel de subred, son stateless y requieren reglas para ambos sentidos. Se evalúan en orden numérico y la primera regla que coincide determina el resultado.

DNS traduce nombres como `api.ejemplo.com` a destinos que los clientes pueden resolver. Route 53 es el servicio DNS administrado de AWS; una respuesta DNS ayuda a encontrar un destino, pero no autoriza el acceso. El security group y otros controles deciden si el tráfico puede llegar al recurso.

## Ejemplo

```text
Clientes → HTTPS/443 → security group del balanceador
Balanceador → HTTPS/8443 → security group de la API
API → TCP/5432 → security group de PostgreSQL
```

Cada regla usa como origen el security group del componente anterior cuando corresponde. Así, la base acepta tráfico de la API aunque cambien sus direcciones IP. Una zona alojada de Route 53 puede publicar `api.ejemplo.com` apuntando al balanceador; el nombre no abre puertos ni reemplaza sus reglas.

## En entrevista

**Pregunta:** ¿Qué significa que un security group sea stateful?

**Breve:** Los security groups filtran interfaces y son stateful; las NACL filtran subredes y son stateless. DNS resuelve nombres, mientras los controles de red autorizan conexiones. **Ampliada:** dibuja las reglas mínimas desde el cliente hasta la base y explica dónde configurarías el nombre DNS.
## Error frecuente

Abrir la base a `0.0.0.0/0` o creer que un nombre DNS vuelve privado un recurso público. Una dirección difícil de adivinar no es control de acceso. Limita la regla al origen esperado y valida también las rutas.

## Práctica

Define reglas para que un cliente de Internet acceda a una API mediante un balanceador y la API consulte PostgreSQL. La base no debe aceptar conexiones directas de Internet. Añade dónde publicarías `api.ejemplo.com`.

### Pista

Escribe por cada salto: protocolo y puerto, quién inicia la conexión y qué grupo identifica al origen.

### Solución

Permite TCP/443 desde los clientes al security group del balanceador. Permite el puerto de la API desde el security group del balanceador al security group de la API. Permite TCP/5432 desde el security group de la API al de PostgreSQL. No crees una regla pública para la base. En Route 53, crea el registro DNS apropiado para dirigir el nombre al balanceador. Comprueba que el DNS resuelve y que el intento directo a la base falla.

## Profundización

[Security groups de VPC](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html) · [Network ACLs](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html) · [Conceptos de Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)
