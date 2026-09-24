import type { Unit, Level, StageDefinition } from '../types';
export const stages: StageDefinition[] = [
 {id:'fundamentos',name:'Fundamentos',description:'Construí una base que puedas explicar.',topics:'Java · POO · Colecciones · Algoritmos',color:'blue'},
 {id:'java-aplicado',name:'Java aplicado',description:'Convertí conceptos en código con criterio.',topics:'Streams · Concurrencia · SOLID',color:'cyan'},
 {id:'backend-profesional',name:'Backend profesional',description:'Llevá tus ideas a APIs y datos reales.',topics:'Spring · SQL · JPA · Testing',color:'teal'},
 {id:'profundizacion-senior',name:'Profundización senior',description:'Aprendé a decidir, medir y anticipar fallos.',topics:'DDD · EDA · Seguridad · Rendimiento',color:'indigo'},
 {id:'spring-boot-kafka',name:'Spring Boot + Kafka',description:'Entendé Kafka y después construí un flujo de eventos completo.',topics:'Fundamentos · Garantías · Spring Kafka · Persistencia',color:'brand'},
];
export const levels: Level[] = stages.map(stage=>stage.name);
const unitDefinitions: Unit[] = [
 {id:1,order:1,title:'Herramientas y equipo',description:'Del primer build a un cambio compartido con el equipo.',level:levels[0],icon:'terminal'},
 {id:2,order:2,title:'Java y orientación a objetos',description:'Entendé el lenguaje y modelá problemas con objetos.',level:levels[0],icon:'braces'},
 {id:3,order:3,title:'Colecciones y genéricos',description:'Elegí, compará y ordená estructuras con criterio.',level:levels[0],icon:'layers'},
 {id:4,order:4,title:'Algoritmos y complejidad',description:'Resolvé problemas y explicá cuánto cuesta tu solución.',level:levels[0],icon:'network'},
 {id:5,order:5,title:'Diseño y calidad',description:'SOLID y patrones en pequeñas dosis para escribir cambios más claros.',level:levels[0],icon:'puzzle'},
 {id:21,order:6,title:'Entorno, depuración y terminal',description:'Encontrá fallos, leé el contexto y ejecutá Java con criterio.',level:levels[0],icon:'terminal'},
 {id:6,order:7,title:'Excepciones y archivos',description:'Controlá los errores y cuidá los recursos.',level:levels[1],icon:'file'},
 {id:7,order:8,title:'Programación funcional',description:'Transformá datos con lambdas, Streams y Optional.',level:levels[1],icon:'workflow'},
 {id:8,order:9,title:'Java moderno y concurrencia',description:'Escribí código expresivo y entendé el trabajo concurrente.',level:levels[1],icon:'cpu'},
 {id:22,order:10,title:'Memoria y robustez Java',description:'Entendé referencias, memoria, tiempo y límites de entrada.',level:levels[1],icon:'cpu'},
 {id:9,order:11,title:'Web y Java empresarial',description:'Conectá HTTP, REST y los contratos de tus APIs.',level:levels[2],icon:'globe'},
 {id:10,order:12,title:'Spring y APIs',description:'De la inyección de dependencias a una API documentada.',level:levels[2],icon:'leaf'},
 {id:11,order:13,title:'SQL y JDBC',description:'Consultá, modelá y protegé la integridad de tus datos.',level:levels[2],icon:'database'},
 {id:12,order:14,title:'JPA y Spring Data',description:'Persistí objetos sin perder de vista las consultas.',level:levels[2],icon:'layers'},
 {id:13,order:15,title:'Testing y observabilidad',description:'Comprobá el comportamiento y entendé qué pasa en producción.',level:levels[2],icon:'test'},
 {id:23,order:16,title:'APIs operables',description:'Diseñá, comprobá y operá APIs preparadas para evolucionar.',level:levels[2],icon:'globe'},
 {id:14,order:17,title:'Arquitectura',description:'Separá responsabilidades y defendé decisiones de diseño.',level:levels[3],icon:'blocks'},
 {id:15,order:18,title:'Eventos y sistemas distribuidos',description:'Conectá servicios y razoná sobre mensajes y fallos.',level:levels[3],icon:'network'},
 {id:16,order:19,title:'Seguridad y operación',description:'Protegé, medí y operá un backend con criterio.',level:levels[3],icon:'shield'},
 {id:24,order:20,title:'Decisiones y resiliencia',description:'Elegí límites, protegé dependencias y medí compromisos.',level:levels[3],icon:'shield'},
 {id:17,order:21,title:'Fundamentos de Kafka',description:'Entendé los registros, topics, particiones, grupos y offsets antes de configurar herramientas.',level:levels[4],icon:'network'},
 {id:39,order:22,title:'Funcionamiento y garantías de Kafka',description:'Razoná sobre réplicas, durabilidad, conservación, entregas y rebalanceos.',level:levels[4],icon:'network'},
 {id:25,order:23,title:'Contratos y operación de eventos',description:'Evolucioná esquemas y comprendé fallos, seguridad y capacidad.',level:levels[4],icon:'network'},
 {id:18,order:24,title:'Mensajería con Spring Boot',description:'Prepará el entorno y publicá y consumí texto y JSON con Spring Kafka.',level:levels[4],icon:'workflow'},
 {id:19,order:25,title:'Caso real: productor Wikimedia',description:'Conectá un stream externo con un producer desacoplado.',level:levels[4],icon:'globe'},
 {id:20,order:26,title:'Consumer, persistencia y operación',description:'Persistí eventos y razoná sobre entregas, fallos y reprocesos.',level:levels[4],icon:'database'},
];
export const units = [...unitDefinitions].sort((left,right)=>left.order-right.order);
export const unitById = new Map(units.map(unit=>[unit.id,unit]));
