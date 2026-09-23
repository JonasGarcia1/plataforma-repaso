# Imágenes de contenedor y ECR

## Concepto

Una imagen empaqueta aplicación y dependencias en capas reproducibles; Amazon ECR almacena y distribuye imágenes privadas para ECS, EKS y otros consumidores autorizados. La identidad que publica necesita permisos de escritura; el rol de ejecución necesita permisos de lectura. Mantener esos permisos separados reduce el impacto de una credencial comprometida.

## Ejemplo

```text
CI construye orders:git-sha → escanea → publica en ECR → ECS descarga por digest
```

Una etiqueta ayuda a las personas a encontrar una versión, pero puede moverse. Para identificar exactamente qué se desplegó, conserva el digest. No incluyas secretos en `Dockerfile`, argumentos de build ni capas: borrar el archivo en una capa posterior no quita el valor de la imagen anterior.

## En entrevista

**Breve:** ECR guarda imágenes y controla quién puede publicarlas o descargarlas. **Ampliada:** describe trazabilidad, escaneo y entrega de credenciales de runtime sin incluir secretos en la imagen.

## Error frecuente

Desplegar `latest` como única referencia y perder trazabilidad. Usa un tag inmutable relacionado con el commit y registra el digest que consumió el servicio.

## Práctica

Diseña el camino de una imagen Spring Boot desde CI hasta ECS. Identifica quién necesita permiso de push y quién de pull.

### Pista

Distingue identidad de CI de rol de ejecución. Sigue la imagen por digest y revisa escaneo antes de promoverla.

### Solución

CI construye y prueba la imagen, la escanea y publica en ECR con tag de commit; registra digest. El rol de CI obtiene push limitado al repositorio y el rol de ejecución solo pull. ECS despliega ese digest y permite rollback a uno conocido. Secretos se inyectan en runtime desde un almacén autorizado.

## Profundización

[Amazon ECR: conceptos](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html) · [Escaneo de imágenes en ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html)
