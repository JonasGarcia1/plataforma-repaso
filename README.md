# Repaso · Backend Java

Plataforma personal de estudio en español: **5 etapas, 20 unidades, 70 lecciones, 157 preguntas y 40 quizzes**, desde fundamentos hasta un laboratorio completo de Spring Boot + Kafka. React + Vite + TypeScript, sin cuentas ni backend. Los servicios Java de los laboratorios se ejecutan por separado.

## Abrir en tu computadora

Requiere Node.js 22.12+ (verificado con 24.12) y npm. Desde esta carpeta:

```sh
npm ci
npm run dev
```

No necesitás iniciar Kafka, Docker ni Spring Boot para estudiar o practicar en la plataforma.

## Usar la plataforma

- **Mi espacio:** continuar la última lección, progreso por etapas y temas para reforzar.
- **Roadmap Java:** las 20 unidades abiertas, agrupadas en cinco etapas, con búsqueda por conceptos y estados manuales.
- **Lecciones:** objetivos, prerrequisitos enlazados, explicación, código copiable, respuestas orientativas, práctica con pista/solución ocultas y profundización desplegable.
- **Preguntas:** filtros por unidad, etapa y favoritos. Incluye 157 respuestas revisadas y vinculadas a sus lecciones.
- **Práctica:** quiz con explicación de las cuatro opciones; simulacro abierto con autoevaluación. Cada sesión toma hasta 10 preguntas distintas (menos si la unidad filtrada no tiene suficientes).
- **Recursos:** glosario, documentación y pasos para usar los laboratorios locales, incluido `springboot-kafka-roadmap-course/advanced-labs`.
- **Progreso:** exportación/importación JSON con revisión antes de reemplazar datos. Leer no completa una lección automáticamente.

El progreso pertenece a este navegador y origen (dominio + puerto). El progreso de localhost no aparece automáticamente en Vercel: exportá e importá la copia. Borrar datos del navegador elimina la copia local. Las respuestas libres de los simulacros no se guardan; sí la autoevaluación. La aplicación avisa si el almacenamiento no está disponible.

## Validar

```sh
npm test
npm run build
npm run preview
```

Las pruebas comprueban integridad del contenido, las 22 lecciones Kafka, opciones de quizzes, búsqueda, selección sin repetición, importación/exportación, recuperación ante datos inválidos y preferencias de apariencia. La revisión Java y sus límites están en `docs/fundamentals-review.md`, `docs/backend-review.md` y `docs/kafka-bank-review.md`.

## Mantener y ampliar el contenido

- `src/content/lessons/`: Markdown de cada lección, cargado bajo demanda.
- `src/content/fundamentals.ts`, `backend.ts` y `kafka.ts`: metadatos tipados; `units.ts` organiza etapas y unidades.
- `questions.ts` y `quizzes.ts`: preguntas y sus relaciones con lecciones.
- `src/lib/study.ts`: búsqueda, muestreo y validación del progreso portable.
- `src/types.ts`: contratos compartidos; los identificadores son estables para conservar progreso.

Las lecciones usan `## Concepto`, `## Ejemplo`, `## En entrevista`, `## Error frecuente`, `## Práctica`, `### Pista`, `### Solución`, `## Profundización`. Los encabezados controlan el índice y los desplegables. La apariencia sigue el sistema en la primera visita y permite elegir Claro, Oscuro o Sistema. Para incorporar Frontend/React/AWS se agregarán contenidos y navegación por módulo sobre estos mismos componentes, sin cambiar los IDs Java existentes.

## Decisiones de contenido

Ejemplos principales: Java 21; Spring Boot 3.5 y Kafka 3.9 en el laboratorio cuando corresponde. El entorno Kafka conserva ZooKeeper solo con fines didácticos y las lecciones explican la alternativa actual con KRaft. Los fragmentos parciales y pseudocódigo están identificados. Los temas senior enseñan criterios y límites; completar lecciones no equivale a experiencia profesional. Las fuentes externas son documentación complementaria y las tipografías web usan Google Fonts con fuentes locales de respaldo.