import type { QuizQuestion } from '../../types';

export const awsQuizzesU27U31: QuizQuestion[] = [
  // U27 — identidad, seguridad y costos
  { id:'aws-quiz-u27-01', unitId:27, lessonId:'aws-u27-l1', prompt:'Una persona necesita acceder puntualmente a la consola. ¿Qué representa un usuario IAM?', correctIndex:0, options:[
    {text:'Una identidad de AWS que puede tener credenciales propias.', explanation:'Un usuario IAM representa una identidad humana o técnica; sus permisos se controlan con políticas.'},
    {text:'Una identidad temporal asumida por un workload.', explanation:'Esa descripción corresponde a un rol IAM asumido, no a un usuario de larga vida.'},
    {text:'Un documento que enumera permisos.', explanation:'Un documento de permisos es una política IAM, que puede adjuntarse a una identidad.'},
    {text:'Un registro de todas las llamadas a AWS.', explanation:'Ese propósito corresponde a CloudTrail y no modela una identidad.'},
  ]},
  { id:'aws-quiz-u27-02', unitId:27, lessonId:'aws-u27-l1', prompt:'Una aplicación en EC2 necesita leer un bucket sin guardar access keys. ¿Qué conviene asignarle?', correctIndex:1, options:[
    {text:'Un usuario IAM compartido con clave estática.', explanation:'Compartir claves dificulta la rotación y expone un secreto que la instancia no necesita guardar.'},
    {text:'Un rol IAM para la instancia con permisos mínimos.', explanation:'El rol entrega credenciales temporales al workload y evita incluir claves permanentes en código.'},
    {text:'Una cuenta root con MFA.', explanation:'La cuenta root no debe usarse para ejecutar aplicaciones ni tareas diarias.'},
    {text:'Un grupo IAM con acceso de administrador.', explanation:'Un grupo agrupa usuarios; además, administrador excede el permiso requerido.'},
  ]},
  { id:'aws-quiz-u27-03', unitId:27, lessonId:'aws-u27-l1', prompt:'El servicio de facturación solo debe publicar en un topic concreto. ¿Qué expresa menor privilegio?', correctIndex:2, options:[
    {text:'Permitir sns:* sobre todos los recursos.', explanation:'El comodín habilita acciones y topics no necesarios para el caso de uso.'},
    {text:'Permitir publicar y administrar usuarios IAM.', explanation:'Administrar identidades no forma parte de publicar un evento de facturación.'},
    {text:'Permitir solo sns:Publish sobre el ARN del topic requerido.', explanation:'Restringir acción y recurso reduce el impacto de una credencial comprometida.'},
    {text:'Dar acceso root solo durante el despliegue.', explanation:'El acceso root no es una estrategia válida para simplificar despliegues de aplicaciones.'},
  ]},
  { id:'aws-quiz-u27-04', unitId:27, lessonId:'aws-u27-l1', prompt:'¿Qué componente de IAM define acciones, recursos y condiciones permitidas o denegadas?', correctIndex:3, options:[
    {text:'Una Availability Zone.', explanation:'Una AZ es un dominio de aislamiento físico dentro de una región.'},
    {text:'Un Security Group.', explanation:'Un Security Group controla tráfico de red, no permisos de API AWS.'},
    {text:'Un presupuesto.', explanation:'AWS Budgets alerta sobre gasto; no autoriza acciones de servicios.'},
    {text:'Una política IAM.', explanation:'La política expresa autorizaciones mediante acciones, recursos, efectos y condiciones.'},
  ]},
  { id:'aws-quiz-u27-05', unitId:27, lessonId:'aws-u27-l2', prompt:'¿Qué ventaja aportan las credenciales temporales para un servicio desplegado?', correctIndex:0, options:[
    {text:'Se rotan automáticamente y no exigen una key fija en el artefacto.', explanation:'Su vigencia limitada reduce exposición y permite que el SDK las renueve mediante el rol.'},
    {text:'Eliminan la necesidad de políticas IAM.', explanation:'Las credenciales temporales siguen obteniendo sus permisos de una política asociada.'},
    {text:'Permiten ignorar la región configurada.', explanation:'Los clientes de AWS todavía necesitan conocer la región del recurso cuando aplica.'},
    {text:'Convierten un rol en una cuenta root.', explanation:'Un rol sigue limitado por sus políticas y relaciones de confianza.'},
  ]},
  { id:'aws-quiz-u27-06', unitId:27, lessonId:'aws-u27-l2', prompt:'En desarrollo local y producción, ¿qué aporta la provider chain del SDK de AWS?', correctIndex:1, options:[
    {text:'Obliga a escribir access keys en application.yml.', explanation:'Eso expone secretos y evita usar el mecanismo de credenciales del entorno.'},
    {text:'Busca credenciales en fuentes estándar según el entorno.', explanation:'Puede usar perfil local, variables o rol de ejecución sin cambiar el código de negocio.'},
    {text:'Convierte una política IAM en un Security Group.', explanation:'Permisos de API y filtrado de red son controles independientes.'},
    {text:'Crea usuarios IAM al iniciar Spring Boot.', explanation:'La cadena resuelve credenciales existentes; no provisiona identidades.'},
  ]},
  { id:'aws-quiz-u27-07', unitId:27, lessonId:'aws-u27-l2', prompt:'Un operador debe acceder por una hora a una cuenta de producción. ¿Qué ofrece STS?', correctIndex:2, options:[
    {text:'Una copia automática de la base RDS.', explanation:'STS maneja identidad temporal; no implementa backup de bases de datos.'},
    {text:'Un endpoint HTTP balanceado.', explanation:'El balanceo HTTP corresponde a servicios como Application Load Balancer.'},
    {text:'Credenciales temporales al asumir una identidad autorizada.', explanation:'STS entrega sesiones limitadas en tiempo según la relación de confianza y políticas.'},
    {text:'Un cifrado de objetos S3 en reposo.', explanation:'El cifrado de S3 usa mecanismos de cifrado y claves, no STS.'},
  ]},
  { id:'aws-quiz-u27-08', unitId:27, lessonId:'aws-u27-l3', prompt:'El gasto mensual proyectado supera lo aceptable. ¿Qué servicio puede alertar antes del cierre?', correctIndex:3, options:[
    {text:'CloudTrail.', explanation:'CloudTrail registra actividad de API, pero no gestiona umbrales de costo previstos.'},
    {text:'IAM Access Analyzer.', explanation:'Access Analyzer ayuda a revisar exposición de permisos, no presupuestos de gasto.'},
    {text:'Route 53.', explanation:'Route 53 resuelve DNS y no calcula proyecciones de costo.'},
    {text:'AWS Budgets.', explanation:'Un presupuesto puede comparar gasto o uso real y previsto contra un umbral configurado.'},
  ]},
  { id:'aws-quiz-u27-09', unitId:27, lessonId:'aws-u27-l3', prompt:'¿Para qué sirven etiquetas consistentes como owner, environment y cost-center?', correctIndex:0, options:[
    {text:'Relacionar recursos con responsabilidad y análisis de costo.', explanation:'Las etiquetas permiten filtrar inventario, asignar gasto y automatizar reglas por contexto.'},
    {text:'Cifrar automáticamente los recursos.', explanation:'Una etiqueta es metadato; no habilita cifrado ni controla acceso por sí sola.'},
    {text:'Aumentar el tamaño de una instancia EC2.', explanation:'La capacidad de cómputo se modifica con tipos de instancia o escalamiento.'},
    {text:'Garantizar recuperación multi-región.', explanation:'La recuperación requiere arquitectura, datos replicados y pruebas, no solo etiquetas.'},
  ]},
  { id:'aws-quiz-u27-10', unitId:27, lessonId:'aws-u27-l3', prompt:'¿Qué práctica describe mejor FinOps en un equipo de producto?', correctIndex:1, options:[
    {text:'Delegar todo costo al área financiera sin datos técnicos.', explanation:'Las decisiones de arquitectura influyen en costo y requieren colaboración entre áreas.'},
    {text:'Tomar decisiones de costo con visibilidad, propiedad y trade-offs.', explanation:'FinOps une uso, presupuesto y valor para que ingeniería asuma decisiones informadas.'},
    {text:'Elegir siempre el servicio de menor precio nominal.', explanation:'El precio unitario no contempla operación, riesgo ni demanda real del sistema.'},
    {text:'Desactivar métricas para reducir facturación.', explanation:'Perder observabilidad puede elevar incidentes y costo total de operación.'},
  ]},

  // U28 — red y cómputo
  { id:'aws-quiz-u28-01', unitId:28, lessonId:'aws-u28-l1', prompt:'¿Qué resuelve una VPC para una aplicación en AWS?', correctIndex:0, options:[
    {text:'Una red virtual aislada con direccionamiento y rutas propias.', explanation:'La VPC define el espacio de red donde se ubican subredes, rutas y recursos.'},
    {text:'Una máquina virtual con sistema operativo.', explanation:'Eso describe una instancia EC2, que puede ubicarse dentro de una VPC.'},
    {text:'Un bucket para archivos estáticos.', explanation:'S3 almacena objetos; no crea segmentación ni rutas de red.'},
    {text:'Un certificado TLS público.', explanation:'Un certificado protege comunicaciones, pero no define la topología de red.'},
  ]},
  { id:'aws-quiz-u28-02', unitId:28, lessonId:'aws-u28-l1', prompt:'Al planificar alta disponibilidad, ¿qué describe una subred de una VPC?', correctIndex:1, options:[
    {text:'Una política que concede permisos a una instancia.', explanation:'Los permisos de API se conceden con IAM roles y policies.'},
    {text:'Un rango CIDR asociado a una sola Availability Zone.', explanation:'Una subred pertenece a una AZ, por eso se usan varias para distribuir componentes.'},
    {text:'Un DNS global que registra dominios.', explanation:'DNS y Route 53 resuelven nombres, no asignan rangos de IP de la VPC.'},
    {text:'Una imagen de contenedor versionada.', explanation:'Las imágenes se almacenan en repositorios como ECR, no en una subred.'},
  ]},
  { id:'aws-quiz-u28-03', unitId:28, lessonId:'aws-u28-l1', prompt:'Una instancia no puede alcanzar un servicio externo. ¿Qué revisa una route table?', correctIndex:2, options:[
    {text:'Los permisos IAM del usuario final.', explanation:'IAM puede bloquear APIs AWS, pero no determina el siguiente salto de paquetes IP.'},
    {text:'El tamaño del disco EBS.', explanation:'El almacenamiento local no explica el encaminamiento de red.'},
    {text:'La ruta asociada al destino y su gateway o NAT.', explanation:'La tabla decide hacia dónde se envía tráfico según el prefijo de destino.'},
    {text:'La versión de Java del proceso.', explanation:'El runtime no reemplaza la configuración de conectividad de la subred.'},
  ]},
  { id:'aws-quiz-u28-04', unitId:28, lessonId:'aws-u28-l1', prompt:'¿Qué necesita una subred para que un recurso tenga acceso directo a Internet?', correctIndex:3, options:[
    {text:'Solo una IP privada.', explanation:'Una IP privada no crea por sí sola una ruta hacia Internet.'},
    {text:'Un usuario IAM con AdministratorAccess.', explanation:'Los permisos IAM no reemplazan gateway, rutas ni dirección pública.'},
    {text:'Una DLQ para mensajes fallidos.', explanation:'Una cola de fallos no participa en conectividad IP saliente o entrante.'},
    {text:'Ruta a un Internet Gateway y una dirección pública cuando corresponda.', explanation:'La asociación de ruta y direccionamiento permiten que el recurso sea alcanzable desde Internet.'},
  ]},
  { id:'aws-quiz-u28-05', unitId:28, lessonId:'aws-u28-l2', prompt:'¿Qué caracteriza a un Security Group asociado a una instancia?', correctIndex:0, options:[
    {text:'Es stateful y controla tráfico de los recursos asociados.', explanation:'Una respuesta permitida se admite automáticamente; las reglas se aplican al recurso.'},
    {text:'Bloquea por orden numérico a nivel de toda subred.', explanation:'Eso se parece a un NACL, que es stateless y opera en subredes.'},
    {text:'Resuelve nombres de dominio.', explanation:'La resolución de nombres corresponde a DNS o Route 53.'},
    {text:'Asigna credenciales temporales al proceso.', explanation:'Las credenciales se obtienen mediante IAM y STS, no por controles de red.'},
  ]},
  { id:'aws-quiz-u28-06', unitId:28, lessonId:'aws-u28-l2', prompt:'¿Qué diferencia práctica tiene una NACL frente a un Security Group?', correctIndex:1, options:[
    {text:'Se adjunta directamente al rol IAM de la instancia.', explanation:'Las NACL se asocian a subredes y no conceden permisos de API.'},
    {text:'Es stateless y exige reglas explícitas de entrada y salida.', explanation:'Al no recordar conexiones, debe permitirse también el tráfico de retorno adecuado.'},
    {text:'Solo admite reglas para HTTP.', explanation:'Puede filtrar distintos protocolos, puertos, orígenes y destinos.'},
    {text:'Sustituye una route table.', explanation:'Filtrar tráfico no determina qué siguiente salto debe usar una subred.'},
  ]},
  { id:'aws-quiz-u28-07', unitId:28, lessonId:'aws-u28-l2', prompt:'¿Qué función cumple DNS para un cliente que llama api.ejemplo.com?', correctIndex:2, options:[
    {text:'Balancear conexiones TCP entre instancias.', explanation:'El balanceo lo realiza un load balancer; DNS solo orienta hacia un destino.'},
    {text:'Cifrar el payload de la API.', explanation:'TLS cifra el canal; DNS no protege por sí mismo el contenido HTTP.'},
    {text:'Traducir el nombre a la dirección o destino configurado.', explanation:'La resolución permite al cliente encontrar el endpoint sin conocer su IP directamente.'},
    {text:'Validar permisos IAM para cada request.', explanation:'IAM puede autorizar APIs AWS, pero DNS no evalúa esas políticas.'},
  ]},
  { id:'aws-quiz-u28-08', unitId:28, lessonId:'aws-u28-l2', prompt:'La empresa debe dirigir un dominio a un ALB con health checks. ¿Qué servicio DNS administrado usaría?', correctIndex:3, options:[
    {text:'Amazon SQS.', explanation:'SQS desacopla productores y consumidores, no administra zonas DNS.'},
    {text:'Amazon ECR.', explanation:'ECR almacena imágenes de contenedor, no registros de dominio.'},
    {text:'AWS Budgets.', explanation:'Budgets alerta sobre gasto y no participa en resolución de nombres.'},
    {text:'Amazon Route 53.', explanation:'Route 53 hospeda zonas y puede enrutar según salud y políticas configuradas.'},
  ]},
  { id:'aws-quiz-u28-09', unitId:28, lessonId:'aws-u28-l3', prompt:'¿Qué responsabilidad conserva el equipo al ejecutar una API en EC2?', correctIndex:0, options:[
    {text:'Parchar y endurecer el sistema operativo invitado.', explanation:'EC2 ofrece control de la instancia, por lo que el cliente opera el sistema y su software.'},
    {text:'Mantener el edificio físico de AWS.', explanation:'AWS opera instalaciones, energía y hardware subyacente.'},
    {text:'Diseñar la red global de Internet.', explanation:'La conectividad global no es una tarea del cliente de EC2.'},
    {text:'Gestionar el firmware de cada host físico.', explanation:'AWS gestiona la infraestructura física y sus componentes de bajo nivel.'},
  ]},
  { id:'aws-quiz-u28-10', unitId:28, lessonId:'aws-u28-l3', prompt:'Una API necesita enrutar /pagos y /catalogo a servicios distintos. ¿Qué aporta un Application Load Balancer?', correctIndex:1, options:[
    {text:'Almacenamiento persistente de objetos.', explanation:'El almacenamiento de objetos corresponde a S3 y no al balanceador.'},
    {text:'Balanceo HTTP/HTTPS con reglas por host o path.', explanation:'Un ALB puede enviar cada solicitud al target group definido por la regla de capa 7.'},
    {text:'Credenciales temporales para los contenedores.', explanation:'Esa función requiere roles IAM y un proveedor de credenciales.'},
    {text:'Colas para trabajo asíncrono.', explanation:'Para desacoplar trabajo se usan servicios como SQS, no ALB.'},
  ]},

  // U29 — S3, distribución y comunicación
  { id:'aws-quiz-u29-01', unitId:29, lessonId:'aws-u29-l1', prompt:'¿Qué es un bucket S3 en un diseño de almacenamiento?', correctIndex:0, options:[
    {text:'El contenedor lógico donde se almacenan objetos S3.', explanation:'El bucket agrupa objetos, políticas y configuración dentro de una región determinada.'},
    {text:'La carpeta física de un servidor Linux.', explanation:'S3 es almacenamiento de objetos y no expone un sistema de archivos tradicional.'},
    {text:'La clave que identifica un objeto dentro del bucket.', explanation:'La key identifica el objeto, mientras el bucket es el contenedor.'},
    {text:'Un rol que autoriza a descargar archivos.', explanation:'IAM autoriza acciones; un bucket almacena contenido y configuración.'},
  ]},
  { id:'aws-quiz-u29-02', unitId:29, lessonId:'aws-u29-l1', prompt:'¿Qué representa la key de un objeto S3?', correctIndex:1, options:[
    {text:'La contraseña de cifrado del archivo.', explanation:'Las claves criptográficas se gestionan mediante KMS u opciones de cifrado, no con la key.'},
    {text:'El identificador del objeto dentro de un bucket.', explanation:'Los prefijos parecen carpetas en la consola, pero la key es un nombre completo de objeto.'},
    {text:'La región donde se creó el bucket.', explanation:'La región pertenece a la configuración del bucket, no a una key individual.'},
    {text:'El ID del usuario que cargó el archivo.', explanation:'La auditoría puede registrar al actor, pero no forma parte necesaria de la key.'},
  ]},
  { id:'aws-quiz-u29-03', unitId:29, lessonId:'aws-u29-l1', prompt:'Un frontend debe descargar una factura privada por cinco minutos. ¿Qué condición debe mantenerse?', correctIndex:2, options:[
    {text:'Hacer público todo el bucket.', explanation:'Publicar el bucket expone objetos que no forman parte de la descarga solicitada.'},
    {text:'Agregar el usuario al grupo administrador.', explanation:'No es necesario conceder permisos amplios para una descarga puntual.'},
    {text:'Conservar el objeto privado y delegar acceso temporal controlado.', explanation:'El acceso puntual debe expirar y no convertir el recurso en público para todos.'},
    {text:'Mover la factura a una instancia EC2.', explanation:'Cambiar de servicio no resuelve la autorización limitada de descarga.'},
  ]},
  { id:'aws-quiz-u29-04', unitId:29, lessonId:'aws-u29-l1', prompt:'¿Qué resuelve una URL firmada de S3?', correctIndex:3, options:[
    {text:'Un aumento de capacidad del bucket.', explanation:'S3 escala almacenamiento sin que una URL firmada cambie su capacidad.'},
    {text:'La replicación automática entre regiones.', explanation:'La replicación se configura como una regla separada de S3.'},
    {text:'La clasificación de costos por etiqueta.', explanation:'Las etiquetas ayudan al costo, pero no autorizan una descarga temporal.'},
    {text:'Acceso temporal y acotado a un objeto sin hacerlo público.', explanation:'La firma y expiración delegan una operación concreta con alcance limitado.'},
  ]},
  { id:'aws-quiz-u29-05', unitId:29, lessonId:'aws-u29-l2', prompt:'Un operador borra por error un objeto importante. ¿Qué habilita versionado S3?', correctIndex:0, options:[
    {text:'Recuperar una versión anterior si la retención y permisos lo permiten.', explanation:'Versioning conserva versiones; un delete suele crear un marcador en lugar de borrar el historial.'},
    {text:'Evitar cualquier modificación futura del objeto.', explanation:'Para inmutabilidad existen controles adicionales como Object Lock según el caso.'},
    {text:'Convertir cada objeto en una base relacional.', explanation:'Versionado no cambia el modelo de almacenamiento de objetos.'},
    {text:'Eliminar automáticamente costos antiguos.', explanation:'La eliminación o transición se define mediante lifecycle policies.'},
  ]},
  { id:'aws-quiz-u29-06', unitId:29, lessonId:'aws-u29-l2', prompt:'Los backups deben pasar a una clase más barata tras 90 días. ¿Qué mecanismo usarías?', correctIndex:1, options:[
    {text:'Un Security Group con reglas de salida.', explanation:'Los Security Groups filtran red y no administran ciclo de vida de objetos.'},
    {text:'Una regla lifecycle de S3.', explanation:'Lifecycle puede transicionar o expirar objetos según edad, prefijo o etiquetas.'},
    {text:'Una Route Table nueva.', explanation:'Las rutas de VPC no modifican almacenamiento ni clases S3.'},
    {text:'Un usuario IAM adicional.', explanation:'Una identidad nueva no automatiza transición de objetos antiguos.'},
  ]},
  { id:'aws-quiz-u29-07', unitId:29, lessonId:'aws-u29-l2', prompt:'¿Qué límite tiene el cifrado en reposo de S3?', correctIndex:2, options:[
    {text:'Impide que un administrador lea cualquier dato.', explanation:'Un principal autorizado y la clave correspondiente puede acceder según las políticas.'},
    {text:'Sustituye HTTPS para clientes externos.', explanation:'TLS protege el tránsito; cifrado en reposo cubre una frontera diferente.'},
    {text:'No reemplaza políticas de acceso ni clasificación de datos.', explanation:'Un objeto cifrado aún puede exponerse si su bucket policy o permisos son incorrectos.'},
    {text:'Evita crear versiones del mismo objeto.', explanation:'Versioning y cifrado son configuraciones independientes de S3.'},
  ]},
  { id:'aws-quiz-u29-08', unitId:29, lessonId:'aws-u29-l3', prompt:'Usuarios distribuidos consumen imágenes de un bucket con baja latencia. ¿Qué aporta CloudFront?', correctIndex:3, options:[
    {text:'Una base de datos transaccional para pedidos.', explanation:'RDS ofrece servicios relacionales; CloudFront es una red de distribución.'},
    {text:'Un repositorio de imágenes Docker.', explanation:'ECR almacena imágenes de contenedor, no acelera contenido web a usuarios finales.'},
    {text:'Un sistema de permisos IAM.', explanation:'CloudFront puede integrarse con controles, pero no reemplaza IAM como sistema de autorización.'},
    {text:'Una CDN que entrega contenido desde ubicaciones cercanas.', explanation:'La caché en edge locations reduce recorridos al origen para contenido adecuado.'},
  ]},
  { id:'aws-quiz-u29-09', unitId:29, lessonId:'aws-u29-l3', prompt:'¿Qué decisión facilita mover un dominio entre orígenes sin cambiar el frontend?', correctIndex:0, options:[
    {text:'Usar DNS con un nombre estable y actualizar su destino.', explanation:'El cliente usa el dominio; Route 53 puede apuntarlo al nuevo recurso o distribución.'},
    {text:'Hardcodear la IP pública en JavaScript.', explanation:'La IP fija acopla el cliente y dificulta cambios, certificados y balanceo.'},
    {text:'Publicar el bucket completo sin restricciones.', explanation:'La exposición pública no es necesaria para mantener una URL estable.'},
    {text:'Cambiar el nombre de cada objeto S3.', explanation:'Los nombres de objetos no resuelven la referencia de dominio de la aplicación.'},
  ]},
  { id:'aws-quiz-u29-10', unitId:29, lessonId:'aws-u29-l3', prompt:'Una aplicación debe enviar un correo de confirmación de compra. ¿Qué servicio está orientado a ese envío?', correctIndex:1, options:[
    {text:'Amazon S3.', explanation:'S3 almacena objetos y no es un servicio de entrega de correo electrónico.'},
    {text:'Amazon SES.', explanation:'SES está diseñado para enviar correo transaccional o masivo con controles de identidad.'},
    {text:'Amazon Route 53.', explanation:'Route 53 administra DNS, aunque DNS puede contener registros de correo.'},
    {text:'Amazon EBS.', explanation:'EBS provee volúmenes de bloque para instancias, no correo saliente.'},
  ]},

  // U30 — datos y caché
  { id:'aws-quiz-u30-01', unitId:30, lessonId:'aws-u30-l1', prompt:'Un sistema requiere SQL, transacciones y un motor relacional administrado. ¿Qué encaja mejor?', correctIndex:0, options:[
    {text:'Amazon RDS.', explanation:'RDS administra motores relacionales y tareas operativas sin eliminar el diseño de esquema del cliente.'},
    {text:'Amazon S3.', explanation:'S3 es almacenamiento de objetos y no provee joins ni transacciones SQL relacionales.'},
    {text:'Amazon SQS.', explanation:'SQS es una cola de mensajes, no un motor persistente para consultas SQL.'},
    {text:'Amazon CloudFront.', explanation:'CloudFront distribuye contenido y no administra bases de datos.'},
  ]},
  { id:'aws-quiz-u30-02', unitId:30, lessonId:'aws-u30-l1', prompt:'¿Qué cubre Multi-AZ en RDS para una base de producción?', correctIndex:1, options:[
    {text:'Escalar lecturas desde todas las réplicas automáticamente.', explanation:'Las réplicas de lectura y Multi-AZ tienen objetivos distintos de arquitectura.'},
    {text:'Una réplica de espera para failover ante falla de infraestructura.', explanation:'Multi-AZ prioriza disponibilidad y recuperación del writer, no una lectura directa de la standby.'},
    {text:'Eliminar la necesidad de backups.', explanation:'Alta disponibilidad no reemplaza copias, retención ni pruebas de restauración.'},
    {text:'Evitar bloquear transacciones concurrentes.', explanation:'El aislamiento y los locks del motor siguen existiendo con Multi-AZ.'},
  ]},
  { id:'aws-quiz-u30-03', unitId:30, lessonId:'aws-u30-l1', prompt:'El pool de conexiones se agota bajo carga. ¿Qué interpretación es más sana?', correctIndex:2, options:[
    {text:'Aumentarlo sin medir siempre soluciona el problema.', explanation:'Más conexiones pueden trasladar la saturación al motor y empeorar la latencia.'},
    {text:'Cada request debe abrir una conexión física nueva.', explanation:'Crear conexiones repetidamente agrega costo y evita controlar la concurrencia.'},
    {text:'Hay que revisar concurrencia, consultas lentas y límite del motor.', explanation:'El pool es un recurso finito; se dimensiona con evidencia y se libera cada préstamo.'},
    {text:'Conviene desactivar los timeouts de base.', explanation:'Sin límites, solicitudes lentas pueden retener conexiones y agravar el agotamiento.'},
  ]},
  { id:'aws-quiz-u30-04', unitId:30, lessonId:'aws-u30-l2', prompt:'En DynamoDB, ¿qué elige la partición física donde se distribuye un ítem?', correctIndex:3, options:[
    {text:'El nombre de la tabla solamente.', explanation:'El nombre identifica la tabla, pero no define la distribución de cada ítem.'},
    {text:'El usuario IAM que escribe.', explanation:'IAM autoriza la operación y no determina la ubicación de datos.'},
    {text:'La fecha de creación del ítem.', explanation:'Una fecha puede formar parte de una key, pero no es la regla por sí sola.'},
    {text:'La partition key.', explanation:'DynamoDB usa el valor de la clave de partición para distribuir y localizar ítems.'},
  ]},
  { id:'aws-quiz-u30-05', unitId:30, lessonId:'aws-u30-l2', prompt:'¿Qué permite modelar una sort key junto a una partition key?', correctIndex:0, options:[
    {text:'Orden y consultas por rango dentro de la misma partición lógica.', explanation:'Permite, por ejemplo, consultar eventos de un pedido por fecha sin escanear toda la tabla.'},
    {text:'Un join automático con otra tabla.', explanation:'DynamoDB no ofrece joins relacionales; se modelan accesos y duplicación controlada.'},
    {text:'Una réplica multi-región sin configuración.', explanation:'La replicación global requiere una configuración y decisión de arquitectura adicional.'},
    {text:'Una política de IAM para el ítem.', explanation:'Los permisos se definen en IAM; la sort key modela acceso a datos.'},
  ]},
  { id:'aws-quiz-u30-06', unitId:30, lessonId:'aws-u30-l2', prompt:'¿Cuál es el primer paso al diseñar una tabla DynamoDB?', correctIndex:1, options:[
    {text:'Normalizar todas las entidades como en un modelo SQL.', explanation:'DynamoDB se diseña para patrones de acceso y puede denormalizar datos deliberadamente.'},
    {text:'Listar consultas y patrones de acceso que el sistema necesita.', explanation:'Las keys e índices se eligen para responder lecturas y escrituras concretas.'},
    {text:'Crear un índice para cada atributo.', explanation:'Cada índice tiene costo de escritura y debe justificarse por una consulta real.'},
    {text:'Elegir primero el nombre de la tabla.', explanation:'El nombre no define eficiencia ni capacidad de consultar los datos requeridos.'},
  ]},
  { id:'aws-quiz-u30-07', unitId:30, lessonId:'aws-u30-l2', prompt:'Dos workers intentan actualizar el mismo estado una vez. ¿Qué aporta una escritura condicional?', correctIndex:2, options:[
    {text:'Garantiza orden global entre todas las tablas.', explanation:'La condición protege un ítem o operación; no ordena todos los datos del sistema.'},
    {text:'Convierte la operación en una transacción SQL.', explanation:'DynamoDB tiene sus propios mecanismos; una condición no es SQL relacional.'},
    {text:'Aplica el cambio solo si la condición esperada se cumple.', explanation:'Sirve para evitar sobrescrituras o duplicados cuando se verifica versión o inexistencia.'},
    {text:'Elimina la necesidad de reintentos.', explanation:'Un conflicto puede requerir recargar estado o resolver según la regla de negocio.'},
  ]},
  { id:'aws-quiz-u30-08', unitId:30, lessonId:'aws-u30-l3', prompt:'¿Qué propósito tiene ElastiCache en una arquitectura de lectura frecuente?', correctIndex:3, options:[
    {text:'Persistir el único registro legal de una transacción.', explanation:'Una caché no suele ser la fuente de verdad para datos transaccionales críticos.'},
    {text:'Ejecutar migraciones de esquema SQL.', explanation:'Las migraciones pertenecen al motor de base y a herramientas como Flyway.'},
    {text:'Reemplazar permisos de acceso a APIs.', explanation:'La caché no autoriza usuarios ni servicios por sí misma.'},
    {text:'Reducir latencia y carga al reutilizar datos en memoria.', explanation:'Redis o Memcached pueden servir lecturas repetidas con una política de consistencia definida.'},
  ]},
  { id:'aws-quiz-u30-09', unitId:30, lessonId:'aws-u30-l3', prompt:'En cache-aside, ¿qué hace la aplicación ante un cache miss?', correctIndex:0, options:[
    {text:'Lee la fuente de verdad y guarda el resultado según su política.', explanation:'La aplicación controla la lectura, el TTL y qué ocurre si la caché está indisponible.'},
    {text:'Devuelve siempre un 404 sin consultar la base.', explanation:'Un miss indica ausencia en caché, no necesariamente ausencia del dato de negocio.'},
    {text:'Espera a que Redis reconstruya el dato solo.', explanation:'Redis no conoce la fuente de verdad ni cómo reconstruir el valor de aplicación.'},
    {text:'Publica el dato en Internet para compartirlo.', explanation:'Una caché interna no necesita hacer público contenido para atender un miss.'},
  ]},
  { id:'aws-quiz-u30-10', unitId:30, lessonId:'aws-u30-l3', prompt:'Tras actualizar un catálogo, algunos clientes siguen viendo el precio viejo. ¿Qué debe decidirse?', correctIndex:1, options:[
    {text:'Cambiar el tipo de instancia EC2.', explanation:'La capacidad no define cuándo una copia cacheada se invalida o expira.'},
    {text:'La estrategia de invalidación o TTL aceptable para ese dato.', explanation:'La frescura tolerable determina si se borra, actualiza o espera expiración de la entrada.'},
    {text:'Eliminar todos los logs de la aplicación.', explanation:'Quitar evidencia no corrige un problema de coherencia de caché.'},
    {text:'Dar permisos root a Redis.', explanation:'Los permisos amplios no resuelven la política de consistencia de los precios.'},
  ]},

  // U31 — mensajería e integración
  { id:'aws-quiz-u31-01', unitId:31, lessonId:'aws-u31-l1', prompt:'Un producer genera pedidos más rápido de lo que el worker puede procesar. ¿Qué aporta SQS?', correctIndex:0, options:[
    {text:'Una cola duradera que desacopla ritmo de producción y consumo.', explanation:'Los productores pueden encolar trabajo y los consumers procesarlo según capacidad disponible.'},
    {text:'Un balanceador HTTP de capa 7.', explanation:'ALB distribuye solicitudes web y no conserva trabajo pendiente para consumers.'},
    {text:'Una base de datos relacional.', explanation:'RDS almacena datos con SQL; no es una cola de trabajo administrada.'},
    {text:'Un registro DNS público.', explanation:'DNS resuelve destinos y no modela procesamiento asíncrono.'},
  ]},
  { id:'aws-quiz-u31-02', unitId:31, lessonId:'aws-u31-l1', prompt:'Un worker recibe un mensaje de SQS y necesita procesarlo durante dos minutos. ¿Qué controla visibility timeout?', correctIndex:1, options:[
    {text:'La retención total de mensajes durante días.', explanation:'La retención es una configuración separada de cuánto tiempo queda oculto tras recibirse.'},
    {text:'El período en que el mensaje queda oculto a otros consumers.', explanation:'Debe cubrir el procesamiento esperado para reducir entregas concurrentes del mismo mensaje.'},
    {text:'La validez del token IAM del worker.', explanation:'IAM controla autenticación y autorización, no visibilidad de mensajes.'},
    {text:'El tiempo máximo de respuesta HTTP del API Gateway.', explanation:'Ese timeout pertenece a otra frontera y no a la cola SQS.'},
  ]},
  { id:'aws-quiz-u31-03', unitId:31, lessonId:'aws-u31-l1', prompt:'¿Qué consecuencia debe asumir un consumer con entrega al menos una vez?', correctIndex:2, options:[
    {text:'Nunca verá el mismo mensaje dos veces.', explanation:'Los reintentos o fallos antes del delete pueden producir una nueva entrega.'},
    {text:'Procesará mensajes en orden global garantizado.', explanation:'El orden depende del tipo de cola y configuración; no es general para todos los casos.'},
    {text:'Puede recibir duplicados y debe proteger sus efectos.', explanation:'La lógica debe ser idempotente o deduplicar usando una clave persistente apropiada.'},
    {text:'No necesita registrar errores de procesamiento.', explanation:'Los fallos siguen requiriendo observabilidad y una política de reintentos o DLQ.'},
  ]},
  { id:'aws-quiz-u31-04', unitId:31, lessonId:'aws-u31-l1', prompt:'¿Cuándo debe un worker borrar un mensaje recibido de SQS?', correctIndex:3, options:[
    {text:'Apenas lo recibe para liberar la cola.', explanation:'Si falla después de borrarlo, el trabajo se pierde sin poder reintentarse.'},
    {text:'Antes de validar el payload.', explanation:'Un payload inválido necesita una política explícita; borrarlo temprano elimina evidencia.'},
    {text:'Solo al arrancar el proceso.', explanation:'El delete está asociado al receipt handle de un mensaje procesado específico.'},
    {text:'Después de completar con éxito el efecto que representa.', explanation:'Confirmar al final permite que un fallo deje el mensaje disponible para nueva entrega.'},
  ]},
  { id:'aws-quiz-u31-05', unitId:31, lessonId:'aws-u31-l2', prompt:'Un evento PedidoCreado debe llegar a facturación y notificaciones. ¿Qué modelo ofrece SNS?', correctIndex:0, options:[
    {text:'Publicación a un topic con múltiples suscriptores.', explanation:'SNS permite fan-out hacia varias colas, funciones o endpoints suscritos al mismo evento.'},
    {text:'Una única cola consumida por un worker.', explanation:'Ese patrón corresponde a SQS y reparte trabajo entre consumidores competidores.'},
    {text:'Un motor SQL para almacenar pedidos.', explanation:'SNS no persiste un modelo relacional ni reemplaza la base de negocio.'},
    {text:'Un proxy HTTP para rutas de una API.', explanation:'El enrutamiento HTTP es función de un gateway o balanceador, no de un topic SNS.'},
  ]},
  { id:'aws-quiz-u31-06', unitId:31, lessonId:'aws-u31-l2', prompt:'Varios servicios quieren reaccionar a eventos de dominios distintos con reglas de filtrado. ¿Qué aporta EventBridge?', correctIndex:1, options:[
    {text:'Un volumen de bloque para una EC2.', explanation:'EBS ofrece almacenamiento de bloque y no enruta eventos entre servicios.'},
    {text:'Un bus de eventos con reglas que enrutan por patrón.', explanation:'Las reglas pueden seleccionar source, detail-type o contenido para entregar a targets.'},
    {text:'Un endpoint DNS con failover.', explanation:'DNS no conserva ni filtra eventos de negocio.'},
    {text:'Una base de datos caché administrada.', explanation:'ElastiCache acelera datos, pero no implementa enrutamiento de eventos.'},
  ]},
  { id:'aws-quiz-u31-07', unitId:31, lessonId:'aws-u31-l2', prompt:'¿Qué debe definir un contrato de evento que evolucionará entre productores y consumers?', correctIndex:2, options:[
    {text:'Solo el nombre del topic.', explanation:'El topic identifica el canal, pero no describe los campos ni versiones del payload.'},
    {text:'El tipo de instancia del producer.', explanation:'La infraestructura del producer no es el contrato consumido por otros servicios.'},
    {text:'Esquema, semántica, versión y reglas de compatibilidad.', explanation:'Los consumidores necesitan saber qué significa cada campo y cómo se introducen cambios seguros.'},
    {text:'La contraseña del usuario que publicó.', explanation:'Los secretos nunca deben convertirse en parte del contrato de evento.'},
  ]},
  { id:'aws-quiz-u31-08', unitId:31, lessonId:'aws-u31-l3', prompt:'Tras varios intentos, un mensaje sigue fallando por un payload inválido. ¿Qué objetivo tiene una DLQ?', correctIndex:3, options:[
    {text:'Reemplazar todos los logs de aplicación.', explanation:'La DLQ complementa logs y métricas, pero no sustituye la observabilidad del consumer.'},
    {text:'Garantizar que el mensaje nunca se investigue.', explanation:'Justamente conserva un fallo aislado para poder analizarlo y decidir su tratamiento.'},
    {text:'Convertir el mensaje en una respuesta HTTP exitosa.', explanation:'La cola no cambia la semántica de la operación fallida ni la hace exitosa.'},
    {text:'Aislar mensajes problemáticos sin bloquear el flujo principal.', explanation:'Permite conservar contexto y definir corrección o reproceso fuera del camino normal.'},
  ]},
  { id:'aws-quiz-u31-09', unitId:31, lessonId:'aws-u31-l3', prompt:'¿Qué configura una redrive policy de SQS?', correctIndex:0, options:[
    {text:'Cuántas recepciones fallidas derivan un mensaje a una DLQ.', explanation:'El máximo de receives evita reintentos infinitos antes de aislar el mensaje.'},
    {text:'El cifrado TLS de la VPC.', explanation:'TLS de red y redrive de colas son configuraciones independientes.'},
    {text:'Los permisos root de un consumer.', explanation:'Los consumers deben usar IAM mínimo y la redrive policy no concede permisos.'},
    {text:'El escalamiento automático de EC2.', explanation:'La política de reenvío no ajusta capacidad de cómputo.'},
  ]},
  { id:'aws-quiz-u31-10', unitId:31, lessonId:'aws-u31-l3', prompt:'Un consumer puede procesar el mismo pedido tras una caída. ¿Qué significa implementar idempotencia?', correctIndex:1, options:[
    {text:'Evitar registrar el resultado del procesamiento.', explanation:'Se necesita evidencia o una clave para decidir si el efecto ya fue aplicado.'},
    {text:'Repetir el mensaje sin duplicar el efecto de negocio.', explanation:'Una clave única, versión o registro transaccional puede proteger la operación ante reentregas.'},
    {text:'Asegurar que SQS entregue exactamente una vez.', explanation:'La idempotencia de negocio protege al consumer; no cambia por sí sola la garantía de entrega.'},
    {text:'Eliminar todos los reintentos del sistema.', explanation:'Los reintentos son útiles para fallos transitorios cuando el efecto está protegido.'},
  ]},
];
