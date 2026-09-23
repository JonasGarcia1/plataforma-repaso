# Secretos y cifrado

## Concepto

Secrets Manager almacena secretos como credenciales y puede coordinar su rotación; KMS administra claves criptográficas y operaciones de cifrado. Un secreto puede cifrarse con una clave KMS, pero KMS no es una base de datos de credenciales. TLS protege datos en tránsito y el cifrado de almacenamiento protege datos en reposo; ninguno sustituye autorización.

## Ejemplo

```text
Task role de orders → permiso GetSecretValue sobre /prod/orders/db
Secrets Manager → entrega secreto cifrado con KMS → aplicación abre conexión TLS
```

La política IAM controla quién puede leer el secreto y quién puede usar la clave; la política de recursos y el contexto de cifrado pueden agregar restricciones. La rotación solo funciona si la base de datos y el consumidor coordinan las credenciales nuevas.

## En entrevista

**Breve:** Diferenciá almacenamiento/rotación de secretos y administración de claves. **Ampliada:** explica cómo limitarías acceso, rotarías una credencial y verificarías que nunca aparezca en logs.

## Error frecuente

Creer que cifrar un secreto lo hace seguro para cualquier rol. Controla tanto el permiso de lectura como el uso de la clave y audita accesos.

## Práctica

Una API necesita una contraseña de base externa. Diseña la entrega, rotación y respuesta si la nueva contraseña no funciona.

### Pista

La aplicación recupera el secreto con su rol; define un mecanismo de prueba y reversión durante la rotación.

### Solución

Guardo el secreto en Secrets Manager, cifrado con KMS, y doy al task role lectura solo de ese ARN y uso de clave necesario. La rotación cambia credencial en la base, valida conexión y actualiza la versión activa. Si falla, conserva una ruta de rollback segura y alerta. TLS protege conexión; logs registran versión/resultado sin imprimir valor.

## Profundización

[AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) · [AWS KMS: conceptos](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)
