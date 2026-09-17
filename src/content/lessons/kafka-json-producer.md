## Concepto

Un producer JSON no solo transforma datos: elige la key que determina el orden por entidad. Usar user.id hace que cambios del mismo usuario se enruten de forma consistente.

Dos UserEvent de u-1 mantienen su orden relativo; u-2 puede ir a otra partición y procesarse en paralelo.

El recorrido de esta práctica:

1. Construí UserEvent válido.
2. Tomá su id como key.
3. Publicalo en learning.users.v1.
4. Observá metadata de partición y offset.

## Ejemplo

Fragmento parcial Java 21 / Spring Kafka 3. Se omiten campos, constructor e imports.

```java
// Fragmento del producer real.
public void sendUser(UserEvent user) {
    jsonTemplate.send(usersTopic, user.id(), user);
}
```

## En entrevista

**Pregunta:** ¿La key es obligatoria?

**Breve:** No. Una key de negocio ayuda a mantener afinidad cuando el particionador y el número de particiones permanecen estables.

**Ampliada:** Elegiría la key según la entidad cuyo orden interesa. Una clave con pocos valores puede concentrar carga. Una key nula no necesariamente indica un error: es válida cuando no necesito afinidad y acepto la estrategia de distribución del productor.

## Error frecuente

La frase 'misma key, siempre misma partición' necesita contexto: cantidad de particiones y particionador estables. Tampoco garantiza ejecución serial si después paralelizás manualmente el trabajo del listener.

## Práctica

Publicá dos cambios de u-1 y uno de u-2. ¿Deben u-1 y u-2 quedar en particiones distintas? ¿Repetir u-1 deduplica?

### Pista

Un hash puede enviar claves distintas a la misma partición.

### Solución

Los cambios de u-1 mantienen afinidad mientras no cambien particionador ni cantidad de particiones. u-2 puede caer en la misma o en otra; no hay promesa de separación. Repetir la key no elimina registros. Deduplicar requiere una política explícita, distinta del enrutamiento.

## Profundización

Usá Kafka UI y metadata del consumo para comparar particiones; no infieras la partición por el ID. El laboratorio también ofrece POST /api/events/{key} y KeyedEvent para experimentar con una key visible en la URL.

**Código y guías locales.** Las rutas se resuelven desde la carpeta repaso-roadmap. Se consultan en tu equipo; no son endpoints de esta plataforma ni servicios desplegados en Vercel.

- **sendUser:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/kafka/LearningProducer.java`. Publica JSON en learning.users.v1.
- **UserEvent:** `springboot-kafka-roadmap-course/learning-api/src/main/java/com/interviewlab/learning/model/UserEvent.java`. Contiene id, nombre y email del contrato.

**Comprobá lo aprendido:**

- Sé explicar hash de key.
- Sé justificar user.id.
- Sé relacionar key con orden.

