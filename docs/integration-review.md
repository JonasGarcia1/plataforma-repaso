# Revisión de integración

## Revisión editorial

Las lecciones de programación funcional usan el contexto de Java 21. Los constructores antiguos de wrappers no se recomiendan. Los patrones tienen ejemplos mínimos y sus límites se explican sin convertir el catálogo en un tratado. El ordenamiento utiliza Comparator sin restas que puedan desbordar; el catálogo de productos se mantiene como ejemplo de caché.

El banco integra preguntas reformuladas y respuestas revisadas, sin referencias a documentos personales. La integración posterior de Kafka y su deduplicación se describen en `kafka-bank-review.md`; el laboratorio asociado se conserva como `springboot-kafka-roadmap-course`.

## Comprobaciones de la entrega inicial, anteriores a la integración Kafka

- TypeScript y compilación de producción correctos, sin advertencias de tamaño; Markdown y resaltado de código cargados bajo demanda.
- Integridad de 48 lecciones, 124 preguntas y 32 quizzes; referencias y opciones válidas.
- 19 pruebas automatizadas aprobadas: búsqueda, filtros, favoritos, sesiones, persistencia e importación/exportación. Incluyen no sobrescribir almacenamiento dañado al abrir una lección.
- Revisión del navegador en escritorio y celular (viewport solicitado de 390 × 844), incluida navegación, búsqueda y código con scroll propio. El documento no presenta desbordamiento horizontal.
- Vista compilada servida con Vite Preview: las URLs `/` y `/leccion/u03-c` responden HTTP 200 con el shell de la SPA.
- Java: ver evidencia y límites detallados en `fundamentals-review.md` y `backend-review.md`.

La validación de interfaz no arranca los laboratorios Kafka/Spring ni certifica los fragmentos de infraestructura como aplicaciones independientes. El despliegue efectivo en Vercel queda para la etapa de publicación.
