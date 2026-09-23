# Repaso · Backend Java y AWS

Plataforma personal de estudio en español con dos módulos: **Backend Java** (5 etapas, 25 unidades, 87 lecciones, 195 preguntas y 250 quizzes) y **AWS & Cloud** (5 etapas, 13 unidades, 41 lecciones, 65 preguntas y 130 quizzes). React + Vite + TypeScript; no requiere cuenta ni backend.

## Abrir en tu computadora

Requiere Node.js 22.12+ (verificado con 24.12) y npm. Desde esta carpeta:

```sh
npm ci
npm run dev
```

No necesitás iniciar Kafka, Docker, Spring Boot ni AWS para estudiar o practicar en la plataforma.

## Usar la plataforma

- **Mi espacio:** continuar la última lección, progreso por etapas y temas para reforzar.
- **Backend Java:** las 25 unidades abiertas, agrupadas en cinco etapas.
- **AWS & Cloud:** 13 unidades desde fundamentos de nube hasta un proyecto integrador de pedidos con servicios AWS.
- **Lecciones:** objetivos, prerrequisitos enlazados, explicación, código copiable, respuestas orientativas, práctica con pista/solución ocultas y profundización desplegable.
- **Preguntas:** filtros por unidad, etapa y favoritos. Incluye 260 preguntas con respuestas revisadas y vinculadas a sus lecciones.
- **Práctica:** quiz con explicación de las cuatro opciones; simulacro abierto con autoevaluación. Cada sesión toma hasta 10 preguntas distintas (menos si la unidad filtrada no tiene suficientes).
- **Recursos:** glosario y documentación filtrados por módulo; guías para laboratorios enlazados desde sus módulos.
- **Progreso:** exportación/importación JSON con revisión antes de reemplazar datos. Leer no completa una lección automáticamente.

El progreso pertenece a este navegador y origen (dominio + puerto). El progreso de localhost no aparece automáticamente en Vercel: exportá e importá la copia. Borrar datos del navegador elimina la copia local. Las respuestas libres de los simulacros no se guardan; sí la autoevaluación. La aplicación avisa si el almacenamiento no está disponible.

## Validar

```sh
npm test
npm run build
npm run preview
```

Las pruebas comprueban los catálogos, las referencias entre módulos y lecciones, las 22 lecciones Kafka, opciones de quizzes, búsqueda, importación/exportación, recuperación ante datos inválidos y preferencias de apariencia.

## Mantener y ampliar el contenido

- `src/content/lessons/` y `src/content/aws/lessons/`: Markdown por módulo, cargado bajo demanda.
- `src/content/fundamentals.ts`, `backend.ts` y `kafka.ts`: metadatos tipados; `units.ts` organiza etapas y unidades.
- `src/content/aws/`: etapas, unidades, lecciones, glosario, preguntas y quizzes AWS.
- `src/content/catalog.ts`: catálogo común consumido por las pantallas compartidas.
- `questions.ts` y `quizzes.ts`: preguntas y sus relaciones con lecciones.
- `src/lib/study.ts`: búsqueda, muestreo y validación del progreso portable.
- `src/types.ts`: contratos compartidos; los identificadores son estables para conservar progreso.

Las lecciones usan `## Concepto`, `## Ejemplo`, `## En entrevista`, `## Error frecuente`, `## Práctica`, `### Pista`, `### Solución`, `## Profundización`. Los encabezados controlan el índice y los desplegables. La apariencia sigue el sistema en la primera visita y permite elegir Claro, Oscuro o Sistema. Los IDs Java y el progreso v1 permanecen estables; los IDs AWS usan el prefijo `aws-`.

## Decisiones de contenido

Ejemplos principales: Java 21; Spring Boot 3.5 y Kafka 3.9 en los laboratorios Java. Los fragmentos parciales y pseudocódigo están identificados. Completar lecciones no equivale a experiencia profesional.

La plataforma presenta contenido y enlaza laboratorios externos desde Recursos. No ejecuta código ni requiere iniciar servicios para estudiar; cada laboratorio indica sus propios requisitos y pasos.
