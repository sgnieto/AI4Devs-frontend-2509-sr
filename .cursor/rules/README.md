# Reglas de Cursor - LTI Project

Este directorio contiene las reglas de Cursor para mantener estándares de código, arquitectura, testing y documentación en el proyecto LTI.

## Estructura

Cada regla está organizada en una carpeta con un archivo `RULE.md` que incluye metadatos de frontmatter para controlar cómo se aplica la regla.

## Reglas Disponibles

### `general-standards/`
**Tipo**: Always Apply  
**Descripción**: Principios generales de desarrollo (SOLID, DRY, nomenclatura, formato de código y convenciones de commits)  
**Aplicación**: Se aplica automáticamente en cada sesión de chat

### `frontend-standards/`
**Tipo**: Apply to Specific Files  
**Descripción**: Estándares y mejores prácticas para desarrollo frontend con React, TypeScript y React Bootstrap  
**Aplicación**: Se aplica cuando trabajas con archivos en `frontend/**/*.{tsx,ts,jsx,js}`

### `backend-standards/`
**Tipo**: Apply to Specific Files  
**Descripción**: Estándares y mejores prácticas para desarrollo backend con Node.js, Express, TypeScript y Prisma siguiendo arquitectura DDD  
**Aplicación**: Se aplica cuando trabajas con archivos en `backend/**/*.{ts,js}`

### `testing-standards/`
**Tipo**: Apply to Specific Files  
**Descripción**: Estrategias y mejores prácticas para testing en backend y frontend con Jest y React Testing Library  
**Aplicación**: Se aplica cuando trabajas con archivos de test `**/*.test.{ts,tsx,js,jsx}`

### `documentation-standards/`
**Tipo**: Apply Intelligently  
**Descripción**: Estándares para documentación en código: JSDoc, comentarios inline y documentación de componentes  
**Aplicación**: Se aplica cuando Agent decide que es relevante según el contexto

### `architecture-standards/`
**Tipo**: Apply Intelligently  
**Descripción**: Reglas de arquitectura en capas (DDD), separación de responsabilidades y flujos de datos  
**Aplicación**: Se aplica cuando Agent decide que es relevante según el contexto

## Uso

Estas reglas son referenciadas automáticamente por Cursor cuando trabajas en el proyecto. Puedes:

- **Aplicar manualmente**: Mencionar una regla con `@` en el chat (ej: `@frontend-standards`)
- **Ver configuración**: Ir a `Cursor Settings > Rules, Commands` para ver y gestionar todas las reglas

## Referencias

Para más detalles, consultar:
- `../docs/ai-specs/ESTANDARES_FRONTEND.md` - Estándares completos de frontend
- `../docs/ai-specs/ESTANDARES_BACKEND.md` - Estándares completos de backend
- `../docs/ai-specs/ESTANDARES_GENERALES.md` - Estándares generales
- `../docs/ai-specs/ARQUITECTURA.md` - Arquitectura del sistema
- `../docs/ai-specs/TESTING.md` - Estrategia de testing
- `../docs/ai-specs/DOCUMENTACION.md` - Estándares de documentación

## Filosofía DRY

Estas reglas están organizadas para evitar duplicación:
- Reglas generales en `general-standards/` (aplicables a todo, siempre activas)
- Reglas específicas separadas por área (frontend, backend)
- Reglas contextuales que se aplican cuando son relevantes
- Referencias cruzadas cuando sea necesario
- Ejemplos reutilizables en cada archivo

## Formato de Reglas

Cada regla sigue el formato estándar de Cursor:

```markdown
---
description: "Descripción de la regla"
globs:
  - "patrón/**/*.ts"
alwaysApply: false
---

# Contenido de la regla
```

- **description**: Descripción que ayuda a Agent a decidir cuándo aplicar la regla
- **globs**: Patrones de archivos para aplicar automáticamente
- **alwaysApply**: Si es `true`, se aplica en cada sesión de chat
