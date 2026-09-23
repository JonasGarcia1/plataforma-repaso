# RDS para datos relacionales

## Concepto

Amazon Relational Database Service (RDS) ofrece bases de datos relacionales administradas, como PostgreSQL y MySQL. El equipo elige el motor, tamaño, almacenamiento, red y configuración de respaldo; AWS opera tareas de infraestructura de la base según el motor y las opciones elegidas. La aplicación sigue siendo responsable del esquema, consultas, credenciales y uso eficiente de conexiones.

Una base relacional conviene cuando el dominio usa relaciones, SQL y transacciones. Una configuración Multi-AZ mantiene una instancia en espera en otra zona y puede hacer failover ante ciertos problemas de instancia o zona. No es lo mismo que una réplica de lectura ni sustituye los backups: una copia que replica un borrado también puede propagar el error.

## Ejemplo

```text
Pedido(id, cliente_id, estado)
LineaPedido(pedido_id, producto_id, cantidad, precio)
```

Una transacción puede crear el pedido y sus líneas juntas o revertir los cambios si una operación falla. La API se conecta al endpoint de RDS desde una red autorizada. Un pool reutiliza conexiones; el máximo del pool debe considerar cuántas instancias de la aplicación pueden abrir conexiones a la vez.

## En entrevista

**Breve:** RDS administra infraestructura de motores relacionales; Multi-AZ aporta failover y backups permiten recuperar datos según su retención. **Ampliada:** explica por qué el dominio necesita SQL/transacciones y cómo manejarías conexiones y restauración.

## Error frecuente

Confundir standby Multi-AZ con backup o con una réplica usada para escalar lecturas. El failover busca disponibilidad; una restauración desde backup aborda ciertos borrados o daños lógicos. Debes ensayar ambos caminos y medir su tiempo.

## Práctica

La creación de un pedido debe guardar cabecera y líneas en conjunto. Elige entre RDS y una base instalada por el equipo en una VM, y enumera dos responsabilidades que aún conserva la aplicación.

### Pista

Busca relaciones y una transacción que abarque varias escrituras. Recuerda separar operación de infraestructura de diseño y operación de la base como dato de negocio.

### Solución

RDS es una opción natural porque ofrece motor SQL administrado y transacciones para crear cabecera y líneas de forma atómica. Frente a instalar una base en una VM, el equipo delega más tareas de infraestructura, pero todavía elige motor y configuración, diseña esquema y consultas, limita credenciales y dimensiona el pool. Configura backups y practica una restauración; configura Multi-AZ si el objetivo exige failover, sin tratarlo como sustituto de la restauración.

## Profundización

[Guía de usuario de Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html) · [Alta disponibilidad Multi-AZ](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
