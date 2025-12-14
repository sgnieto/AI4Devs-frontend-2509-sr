# Guía de Desarrollo del Proyecto

## Setup Local

### Prerrequisitos

- **Node.js**: Versión 16 o superior
- **npm**: Versión 8 o superior (o yarn/pnpm equivalentes)
- **Docker**: Versión 20 o superior (para base de datos PostgreSQL)
- **TypeScript**: Instalado globalmente o vía npm (versión 4.9.5+)
- **Git**: Para control de versiones

### Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd AI4Devs-frontend-2509-sr
```

2. **Instalar dependencias del backend**
```bash
cd backend
npm install
```

3. **Instalar dependencias del frontend**
```bash
cd ../frontend
npm install
```

4. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto o en `backend/` con:
```env
DATABASE_URL="postgresql://LTIdbUser:D1ymf8wyQEGthFR1E9xhCq@localhost:5432/LTIdb"
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=mydatabase
DB_PORT=5432
```

5. **Iniciar base de datos con Docker**
```bash
# Desde la raíz del proyecto
docker-compose up -d
```

6. **Configurar Prisma**
```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

7. **Poblar base de datos (opcional)**
```bash
cd backend
ts-node prisma/seed.ts
```

8. **Compilar backend**
```bash
cd backend
npm run build
```

## Gestión de Dependencias

### Backend

- **Gestor de paquetes**: npm
- **Scripts disponibles**:
  - `npm start`: Ejecuta el servidor en producción (requiere build previo)
  - `npm run dev`: Ejecuta en modo desarrollo con hot-reload (ts-node-dev)
  - `npm run build`: Compila TypeScript a JavaScript
  - `npm test`: Ejecuta tests con Jest
  - `npm run prisma:generate`: Genera Prisma Client
  - `npm run prisma:init`: Inicializa Prisma

### Frontend

- **Gestor de paquetes**: npm
- **Scripts disponibles**:
  - `npm start`: Inicia servidor de desarrollo (puerto 3000)
  - `npm run build`: Crea build de producción
  - `npm test`: Ejecuta tests
  - `npm run eject`: Expone configuración de Create React App (irreversible)

## Convenciones de Ramas y Flujo de Trabajo Git

### Modelo de Branching

El proyecto utiliza un modelo de branching simplificado:

- **`main`** o **`master`**: Rama principal de producción
- **`develop`**: Rama de desarrollo (si existe)
- **`feature/*`**: Nuevas funcionalidades
- **`fix/*`**: Corrección de bugs
- **`hotfix/*`**: Correcciones urgentes para producción

### Flujo de Trabajo

1. **Crear rama desde develop/main**
```bash
git checkout -b feature/nombre-funcionalidad
```

2. **Desarrollar y commitear cambios**
```bash
git add .
git commit -m "feat: descripción del cambio"
```

3. **Push y crear Pull Request**
```bash
git push origin feature/nombre-funcionalidad
```

### Convenciones de Commits

Seguir el formato **Conventional Commits**:

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (sin afectar código)
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

Ejemplos:
```
feat: añadir endpoint para actualizar etapa de candidato
fix: corregir validación de email en formulario
docs: actualizar documentación de API
refactor: separar lógica de validación en módulo independiente
```

## Flujo de Contribución

### Proceso de Pull Request

1. **Antes de crear PR**
   - [ ] Código compila sin errores
   - [ ] Tests pasan (`npm test`)
   - [ ] No hay errores de linting
   - [ ] Código sigue los estándares del proyecto
   - [ ] Documentación actualizada si es necesario

2. **Crear Pull Request**
   - Título descriptivo siguiendo convenciones de commits
   - Descripción clara de los cambios
   - Referenciar issues relacionados (si aplica)
   - Incluir screenshots/capturas si hay cambios visuales

3. **Code Review**
   - Al menos una aprobación requerida
   - Resolver comentarios antes de merge
   - Mantener PR actualizado con la rama base

### Checklist de Contribución

- [ ] Código sigue los estándares de estilo (ESLint/Prettier)
- [ ] Tests unitarios añadidos/modificados según corresponda
- [ ] Documentación actualizada
- [ ] Sin console.logs de debug
- [ ] Variables de entorno documentadas si son nuevas
- [ ] Sin dependencias innecesarias añadidas

## Desarrollo Local

### Ejecutar Backend

```bash
cd backend
npm run dev
# Servidor disponible en http://localhost:3010
```

### Ejecutar Frontend

```bash
cd frontend
npm start
# Aplicación disponible en http://localhost:3000
```

### Ejecutar Tests

**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
npm test
```

## Herramientas CLI

### Prisma CLI

```bash
# Generar Prisma Client
npx prisma generate

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Abrir Prisma Studio (GUI para BD)
npx prisma studio

# Resetear base de datos (CUIDADO: borra datos)
npx prisma migrate reset
```

### TypeScript

```bash
# Verificar tipos sin compilar
npx tsc --noEmit

# Compilar proyecto
npm run build
```

## Troubleshooting

### Problemas Comunes

1. **Error de conexión a base de datos**
   - Verificar que Docker esté corriendo: `docker ps`
   - Verificar variables de entorno en `.env`
   - Verificar que el puerto 5432 no esté ocupado

2. **Errores de Prisma**
   - Ejecutar `npx prisma generate` después de cambios en schema
   - Verificar que las migraciones estén aplicadas: `npx prisma migrate status`

3. **Errores de compilación TypeScript**
   - Limpiar cache: `rm -rf node_modules dist && npm install`
   - Verificar versión de TypeScript: `npx tsc --version`

4. **Problemas con dependencias**
   - Eliminar `node_modules` y `package-lock.json`
   - Ejecutar `npm install` nuevamente

## Entornos

### Desarrollo
- Backend: `http://localhost:3010`
- Frontend: `http://localhost:3000`
- Base de datos: `localhost:5432`

### Producción
- [POR COMPLETAR] Configuración de producción
- Variables de entorno específicas de producción
- Build optimizado del frontend

## Recursos Adicionales

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de Express](https://expressjs.com/)
- [Documentación de React](https://react.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

