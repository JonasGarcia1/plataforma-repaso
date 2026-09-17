# Revisión editorial: unidades 1–8

Se redactaron 24 lecciones con teoría, ejemplos, respuestas de entrevista, errores frecuentes, ejercicios, pistas y soluciones. Las capturas y el temario del usuario orientaron la cobertura. El contenido se conserva integrado en la plataforma, sin etiquetas de procedencia de documentos personales.

## Correcciones frente a materiales originales

- Fusión de arrays: concatenar y ordenar incumple la restricción de una pasada; se reemplazó por dos índices, O(n+m).
- Factorial: se definió dominio 0..20 para long, validación de negativos y overflow, junto con costos de pila.
- Sobrescritura: la subclase sobrescribe el método de la superclase, no al revés; se permite retorno covariante.
- Inicialización static: ocurre en la inicialización de clase; cargar una clase no implica necesariamente inicializarla inmediatamente.
- Wrappers: se corrigió la lista de los ocho tipos y se explicó null, unboxing e igualdad.
- Singleton: no equivale a una instancia entre procesos ni vuelve seguro el estado mutable por sí solo.
- Caché de catálogos: no requiere obligatoriamente Singleton y Factory Method; se evita sobreingeniería.
- Git: reset, restore, rm y amend tienen efectos diferentes; no se describen todos como equivalentes para deshacer cambios.
- Cobertura de pruebas y herramientas de calidad no equivalen a garantía de corrección.

## Verificación

Referencias oficiales abiertas durante autoría: Learn Java, Comparator Java 21, Git Reference y Maven dependency mechanism. Los ejemplos señalan si son ejecutables, clases compilables sin main o fragmentos contextuales.

Se verificaron los ocho encabezados pedagógicos en las 24 lecciones. Con javac 21.0.12 se compilaron satisfactoriamente 20 grupos de ejemplos: 18 bloques de declaraciones completas y los fragmentos de ordenamiento y factorial envueltos en una clase de prueba. Se ejecutaron los 10 programas que incluyen main y se comprobaron sus resultados esperados. Se verificaron mediante assertions: fusión original, entrada vacía y duplicados/negativos; bubble y quicksort en siete entradas cada uno, incluidos vacío, ordenado, inverso y repetidos; factorial 0, 5, equivalencia recursiva/iterativa de 0 a 20 y rechazo de -1 y 21. Los ejemplos SOLID son alternativas contextuales antes/después, explícitamente no presentadas como un único archivo compilable. Los archivos auxiliares de QA se generaron fuera del repositorio, en un directorio temporal.

Los identificadores u01-a..u08-c se mantienen estables. El banco de preguntas vive separado de las lecciones y utiliza respuestas pedagógicas revisadas, sin metadatos de procedencia de documentos personales.
