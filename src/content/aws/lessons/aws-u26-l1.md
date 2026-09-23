# Qué es AWS y cómo funciona la nube

## Concepto

AWS (Amazon Web Services) es una plataforma de servicios en la nube: alquilás capacidad y servicios bajo demanda en vez de comprar y operar toda la infraestructura propia. La nube permite aprovisionar recursos por API y pagar según uso, pero el equipo sigue tomando decisiones sobre arquitectura, acceso, datos y costos.

IaaS ofrece recursos básicos que el cliente configura, como una máquina virtual EC2. PaaS administra más componentes de la plataforma para que el equipo se concentre en desplegar la aplicación. SaaS entrega una aplicación lista para usar. “Administrado” describe cuánto trabajo operativo delegás; no es una cuarta capa rígida y puede aplicarse a bases de datos, colas y otros servicios.

## Ejemplo

```text
Una API de pedidos puede correr en EC2, donde el equipo parchea el sistema operativo y configura el runtime; en una plataforma administrada, AWS se ocupa de más tareas de infraestructura; como SaaS, un servicio externo podría ofrecer directamente una función de negocio. En los tres casos el equipo decide quién accede y qué datos guarda.
```

AWS opera la infraestructura física. El cliente conserva responsabilidades que dependen del servicio, como configurar permisos, proteger datos, desplegar código y definir respaldos. Delegar la operación de servidores no delega automáticamente esas decisiones.

## En entrevista

**Breve:** AWS ofrece recursos y servicios bajo demanda. Elegí el modelo según el control que necesitás y las tareas que tu equipo puede operar. **Ampliada:** compará dos opciones para una API y nombrá una responsabilidad que AWS asume y otra que conserva el equipo.

## Error frecuente

Decir que “la nube se opera sola”. Una base administrada puede encargarse de tareas de infraestructura, pero todavía hay que definir acceso, capacidad, retención y recuperación. La frontera exacta depende del servicio.

## Práctica

Un equipo pequeño necesita una API de pedidos y una base SQL. Compara una VM con una base instalada manualmente frente a una base relacional administrada. Para cada opción, anota una tarea que el equipo opera y una que delega.

### Pista

Separá las tareas de infraestructura (máquinas y parches) de las tareas de aplicación y datos (permisos, esquema y recuperación).

### Solución

Con una VM, el equipo mantiene el sistema operativo y también administra la base instalada allí. Con una base administrada, AWS opera más tareas de infraestructura de la base, pero el equipo elige motor, configura credenciales y red, diseña el esquema y comprueba que pueda restaurar datos. La VM da más control; la base administrada reduce trabajo operativo. La elección depende del control, capacidades y requisitos del sistema.

## Profundización

[Qué es la computación en la nube](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/what-is-cloud-computing.html) · [Modelo de responsabilidad compartida](https://aws.amazon.com/compliance/shared-responsibility-model/)
