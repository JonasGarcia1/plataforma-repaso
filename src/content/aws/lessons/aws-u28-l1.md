# VPC, subredes y rutas

## Concepto

Una VPC (Virtual Private Cloud) es una red virtual aislada dentro de una región de AWS. Se define con uno o más rangos IP en notación CIDR, por ejemplo `10.0.0.0/16`. Una subred divide ese espacio y pertenece a una sola zona de disponibilidad. Cada subred se asocia a una tabla de rutas que indica el siguiente destino para el tráfico.

Una subred no es pública por su nombre. En general se considera pública cuando su tabla de rutas ofrece salida hacia un Internet Gateway (IGW); para que una instancia sea alcanzable desde Internet también necesita dirección pública y reglas de red que permitan el tráfico. Una subred privada no tiene esa ruta directa. Si sus recursos necesitan iniciar conexiones IPv4 a Internet, suele usarse un NAT Gateway en una subred pública. Los VPC endpoints permiten acceder a ciertos servicios AWS sin salir por Internet.

## Ejemplo

```text
VPC 10.0.0.0/16
  subred pública 10.0.1.0/24 → 0.0.0.0/0 al IGW
  subred privada 10.0.2.0/24 → sin ruta directa al IGW
```

Un balanceador público puede ubicarse en subredes públicas y enviar tráfico a una API en subredes privadas. Una base de datos puede quedar en otras subredes privadas. La API no necesita ser accesible directamente desde Internet para responder a través del balanceador.

## En entrevista

**Breve:** La VPC define la red, las subredes separan rangos y AZ, y las tablas de rutas determinan por dónde sale el tráfico. **Ampliada:** recorre el camino del cliente al balanceador, a la API y a la base; justifica qué componentes requieren ruta pública.

## Error frecuente

Llamar privada a una subred solo porque así se llama. Revisa su tabla de rutas, el IGW/NAT asociado y las direcciones de las instancias. No agregues una ruta `0.0.0.0/0` a un IGW a una subred de base de datos para resolver una dependencia sin evaluar su exposición.

## Práctica

Diseña una VPC para un balanceador, una API y una base de datos. Usa CIDR sin solapamientos y explica qué salida a Internet necesita cada capa.

### Pista

El cliente debe alcanzar el balanceador. La base debe aceptar conexiones de la API, no de cualquier dirección de Internet. Pregunta si la API realmente necesita iniciar conexiones externas.

### Solución

Asigna un rango a la VPC y subredes distintas en al menos dos AZ para el balanceador y la API si se requiere alta disponibilidad. El balanceador recibe la ruta al IGW; la API y la base quedan en subredes privadas. Permite que la API llegue al puerto de la base mediante reglas de seguridad. Si la API requiere actualizaciones o servicios externos, diseña una salida controlada con NAT o endpoints según el destino. Verifica rutas de ida y respuesta, además de que los rangos CIDR no se superpongan.

## Profundización

[Qué es Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) · [Tablas de rutas](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)
