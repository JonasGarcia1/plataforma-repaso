# DynamoDB y diseño por patrones de acceso

## Concepto

Amazon DynamoDB es una base NoSQL administrada que almacena elementos en tablas. Cada elemento se identifica por una clave primaria: una partition key, o partition key más sort key. La partition key distribuye los elementos; la sort key organiza elementos que comparten esa partición y permite consultas por rango o prefijo.

Diseña la clave desde las consultas que la aplicación necesita realizar. `Query` busca elementos con una clave de partición conocida; no es una búsqueda libre por cualquier campo. Si necesitas buscar por otro atributo, puede hacer falta un índice secundario. Una partition key con muy pocos valores o tráfico concentrado puede crear una partición caliente y limitar el rendimiento.

## Ejemplo

```text
Tabla Pedidos
PK = CUSTOMER#17
SK = ORDER#2026-09-23#42
Otros atributos: estado, total
```

Esta clave permite consultar pedidos del cliente `17` y ordenar o filtrar por la sort key. Una lectura del pedido por identificador global requeriría conocer una clave que lo ubique; puede modelarse con otra tabla o un índice, según los patrones de acceso.

## En entrevista

**Pregunta:** ¿Cómo influye la clave primaria de DynamoDB en los patrones de consulta?

**Breve:** En DynamoDB la clave primaria define cómo localizar y agrupar elementos; el modelo debe responder consultas conocidas. **Ampliada:** da una clave para listar pedidos de un cliente, una para obtener uno puntual y explica el costo de una consulta que no coincide con la clave.
## Error frecuente

Modelar tablas como si fueran relacionales y esperar joins o filtros arbitrarios eficientes. La consulta por un atributo no indexado puede requerir un scan, que lee muchos elementos y escala mal.

## Práctica

Diseña las claves para (a) listar los pedidos de un cliente ordenados por fecha y (b) recuperar todos los pedidos de un cliente en un día. Explica cómo buscarías un pedido por ID global si esa consulta también fuera requerida.

### Pista

La partition key puede agrupar por cliente; la sort key puede incorporar fecha e ID. Asegúrate de que dos pedidos del mismo cliente no choquen en la clave.

### Solución

Usa `PK=CUSTOMER#17` y `SK=ORDER#2026-09-23#42`. Para el día, consulta esa partition key con una condición de prefijo o rango sobre `ORDER#2026-09-23#`. Para buscar solo por ID global sin cliente, la clave de cliente no alcanza: agrega un índice secundario con el ID como clave de búsqueda o diseña otra forma de acceso, evaluando unicidad y distribución. Prueba cada consulta prevista y verifica que no necesite un scan.

## Profundización

[Introducción a DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) · [Patrones de acceso y diseño](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-modeling-nosql.html)
