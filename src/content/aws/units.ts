import type { Unit } from '../../types';

export const awsStages = [
  { id: 'aws-fundamentos-cloud', name: 'Fundamentos cloud', description: 'Comprendé los bloques básicos de la nube y sus límites.', topics: 'Modelos · Identidad · Redes · Cómputo', color: 'blue' },
  { id: 'aws-servicios-integracion', name: 'Servicios e integración', description: 'Elegí servicios de almacenamiento, datos, eventos y operación.', topics: 'S3 · Datos · Mensajería · Observabilidad', color: 'cyan' },
  { id: 'aws-java', name: 'Java en AWS', description: 'Conectá aplicaciones Java y Spring Boot con servicios de AWS.', topics: 'SDK Java · Lambda · Contenedores', color: 'teal' },
  { id: 'aws-arquitectura-operacion', name: 'Arquitectura y operación', description: 'Tomá decisiones seguras, resilientes y conscientes del costo.', topics: 'Seguridad · Resiliencia · Proyecto', color: 'indigo' },
  { id: 'aws-proyecto-floci', name: 'Proyecto AWS con Floci', description: 'Recorré una aplicación de pedidos con servicios AWS simulados localmente.', topics: 'Spring Boot · S3 · SQS · Lambda · DynamoDB', color: 'violet' },
] as const;

export const awsUnits: Unit[] = [
  { id: 26, order: 1, title: 'Nube y arquitectura global', description: 'Ubicá servicios, responsabilidades y decisiones de arquitectura.', level: 'Fundamentos cloud', icon: 'globe' },
  { id: 27, order: 2, title: 'Identidad y costos', description: 'Controlá quién accede y cuánto cuesta cada entorno.', level: 'Fundamentos cloud', icon: 'shield' },
  { id: 28, order: 3, title: 'Redes y cómputo', description: 'Conectá redes privadas con capacidad de cómputo escalable.', level: 'Fundamentos cloud', icon: 'network' },
  { id: 29, order: 4, title: 'Almacenamiento y entrega', description: 'Guardá objetos y acercá contenido a sus consumidores.', level: 'Servicios e integración', icon: 'database' },
  { id: 30, order: 5, title: 'Datos', description: 'Elegí almacenamiento relacional, NoSQL o caché según el acceso.', level: 'Servicios e integración', icon: 'database' },
  { id: 31, order: 6, title: 'Mensajería y eventos', description: 'Desacoplá productores y consumidores con entregas confiables.', level: 'Servicios e integración', icon: 'workflow' },
  { id: 32, order: 7, title: 'Operación y recuperación', description: 'Observá sistemas y preparate para fallos y recuperación.', level: 'Servicios e integración', icon: 'test' },
  { id: 33, order: 8, title: 'SDK Java y Spring Boot', description: 'Usá servicios AWS desde código Java con configuración segura.', level: 'Java en AWS', icon: 'braces' },
  { id: 34, order: 9, title: 'AWS Lambda con Java 21', description: 'Construí funciones orientadas a eventos y probalas localmente.', level: 'Java en AWS', icon: 'cpu' },
  { id: 35, order: 10, title: 'Contenedores y despliegue de Java', description: 'Empaquetá y elegí dónde ejecutar una aplicación Java.', level: 'Java en AWS', icon: 'blocks' },
  { id: 36, order: 11, title: 'Seguridad y resiliencia', description: 'Protegé datos y servicios ante errores, picos y dependencias lentas.', level: 'Arquitectura y operación', icon: 'shield' },
  { id: 37, order: 12, title: 'Proyecto integrador: pedidos en AWS', description: 'Diseñá y probá un flujo de pedidos local y en AWS opcional.', level: 'Arquitectura y operación', icon: 'workflow' },
  { id: 38, order: 13, title: 'Proyecto AWS con Floci', description: 'Ejecutá localmente una API de pedidos y su procesamiento con S3, SQS, Lambda y DynamoDB.', level: 'Proyecto AWS con Floci', icon: 'workflow' },
];
