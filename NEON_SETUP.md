# Configuración de Base de Datos Neon

## Pasos para conectar tu proyecto a Neon

### 1. Obtener la cadena de conexión de Neon

1. Ve a tu proyecto en Neon: https://console.neon.tech/app/projects/withered-sun-04927872
2. En el dashboard, busca la sección **Connection Details** o **Connection String**
3. Copia la cadena de conexión que se ve así:
   ```
   postgresql://[usuario]:[contraseña]@[host]/neondb?sslmode=require
   ```

### 2. Configurar el archivo .env

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza la línea `DATABASE_URL` con tu cadena de conexión real de Neon:
   ```env
   DATABASE_URL="postgresql://tu-usuario:tu-contraseña@tu-host.neon.tech/neondb?sslmode=require"
   ```

### 3. Ejecutar las migraciones de Prisma

Una vez configurada la conexión, ejecuta los siguientes comandos:

```bash
# Generar el cliente de Prisma
npx prisma generate

# Aplicar las migraciones a la base de datos
npx prisma migrate deploy

# O si quieres crear una nueva migración
npx prisma migrate dev

# (Opcional) Poblar la base de datos con datos de prueba
npx prisma db seed
```

### 4. Verificar la conexión

Puedes verificar que la conexión funciona correctamente con:

```bash
# Abrir Prisma Studio para ver tus datos
npx prisma studio
```

## Notas importantes

- **Seguridad**: Nunca compartas tu archivo `.env` ni lo subas a Git (ya está en `.gitignore`)
- **Producción**: Para producción, configura las variables de entorno en tu plataforma de hosting (Vercel, Railway, etc.)
- **SSL**: Neon requiere conexiones SSL, por eso la cadena incluye `?sslmode=require`

## Solución de problemas

### Error: "Can't reach database server"

- Verifica que la cadena de conexión sea correcta
- Asegúrate de que tu IP esté permitida en Neon (por defecto permite todas)

### Error: "Authentication failed"

- Verifica el usuario y contraseña en la cadena de conexión
- Regenera la contraseña en Neon si es necesario

### Error: "Database does not exist"

- Verifica que el nombre de la base de datos sea correcto (debería ser `neondb`)
- Crea la base de datos en el dashboard de Neon si no existe
