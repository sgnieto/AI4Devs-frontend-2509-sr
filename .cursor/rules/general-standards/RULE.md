---
description: "Principios generales de desarrollo: SOLID, DRY, nomenclatura, formato de código y convenciones de commits"
alwaysApply: true
---

# Reglas Generales - LTI Project

## Principios SOLID

### Single Responsibility Principle (SRP)
- Cada clase/función debe tener una única responsabilidad
- Separar validación, lógica de negocio y acceso a datos
- Controladores solo manejan HTTP, servicios solo lógica de negocio

### Open/Closed Principle (OCP)
- Abierto para extensión, cerrado para modificación
- Usar composición sobre herencia
- Definir interfaces para extensión sin modificación

### Liskov Substitution Principle (LSP)
- Las clases derivadas deben poder sustituir a las clases base
- Preferir composición sobre herencia

### Interface Segregation Principle (ISP)
- Interfaces pequeñas y específicas
- Definir interfaces TypeScript para servicios y contratos

### Dependency Inversion Principle (DIP)
- Depender de abstracciones, no de implementaciones concretas
- Inyectar dependencias mediante constructor cuando sea posible

## DRY (Don't Repeat Yourself)

- Centralizar validación en módulos de validación
- Reutilizar servicios y funciones comunes
- Extraer lógica duplicada a funciones/helpers
- No repetir código de manejo de errores

## KISS (Keep It Simple, Stupid)

- Mantener código simple y directo
- Evitar sobre-ingeniería
- No crear abstracciones prematuras

## YAGNI (You Aren't Gonna Need It)

- Solo implementar funcionalidades necesarias
- No crear código "por si acaso"
- Evitar abstracciones innecesarias

## Nomenclatura

### Archivos
- **Backend TypeScript/JavaScript**: camelCase (`candidateService.ts`)
- **Frontend Componentes**: PascalCase o camelCase según componente
- **Tests**: Co-locados con código (`.test.ts`, `.test.tsx`)

### Código
- **Clases**: PascalCase (`Candidate`, `Education`)
- **Funciones/Métodos**: camelCase (`addCandidate`, `findById`)
- **Variables**: camelCase (`candidateData`, `applicationId`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`, `API_URL`)
- **Interfaces/Types**: PascalCase (`CandidateInput`, `ApiResponse`)

## Estructura de Archivos

### Backend
```
backend/src/
├── domain/models/      # Modelos de dominio
├── application/
│   ├── services/       # Servicios de aplicación
│   └── validator.ts    # Validadores
├── presentation/
│   └── controllers/    # Controladores
└── routes/             # Rutas
```

### Frontend
```
frontend/src/
├── components/         # Componentes React
├── services/           # Servicios de API
└── assets/            # Recursos estáticos
```

## Formato de Código

- **Indentación**: 2 espacios (no tabs)
- **Líneas**: Máximo 100-120 caracteres
- **Punto y coma**: Según configuración de Prettier
- **Comillas**: Según configuración de Prettier (preferir simples)
- Ejecutar Prettier antes de commit

## Convenciones de Commits

Seguir **Conventional Commits**:

```
<tipo>(<ámbito>): <descripción>

[body opcional]

[footer opcional]
```

### Tipos
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (sin afectar lógica)
- `refactor`: Refactorización de código
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento
- `perf`: Mejoras de rendimiento
- `ci`: Cambios en CI/CD

### Ámbitos (Opcional)
- `backend`: Cambios en backend
- `frontend`: Cambios en frontend
- `api`: Cambios en API
- `db`: Cambios en base de datos
- `config`: Cambios de configuración

### Ejemplos
```
feat(backend): añadir endpoint para actualizar etapa de candidato
fix(frontend): corregir validación de email en formulario
docs: actualizar documentación de API
refactor(backend): separar lógica de validación en módulo independiente
test(backend): añadir tests para candidateService
```

## Criterios de Calidad Pre-Merge

- [ ] Código compila sin errores (`npm run build`)
- [ ] Todos los tests pasan (`npm test`)
- [ ] Sin errores de linting (`npx eslint`)
- [ ] Sin errores de TypeScript
- [ ] Funcionalidad probada manualmente
- [ ] Documentación actualizada si es necesario
- [ ] Sin `console.log` de debug
- [ ] Sin código comentado muerto
- [ ] Commits con mensajes descriptivos

## Antipatrones a Evitar

### God Objects
❌ Clases con demasiadas responsabilidades
✅ Separar en múltiples clases con responsabilidades específicas

### Código Duplicado
❌ Repetir lógica en múltiples lugares
✅ Extraer a funciones/helpers reutilizables

### Magic Numbers/Strings
❌ Valores hardcodeados sin constantes
✅ Definir constantes con nombres descriptivos

### Deep Nesting
❌ Anidación excesiva de condicionales
✅ Usar early returns y optional chaining

### Acceso Directo a Infraestructura
❌ Acceder directamente a BD desde controladores
✅ Usar servicios y capas de abstracción

## Buenas Prácticas

- Validación temprana de entrada
- Manejo explícito de errores con tipos específicos
- Aprovechar TypeScript para type safety
- Tests unitarios para lógica de negocio
- Documentación JSDoc para funciones públicas
- Variables de entorno para configuración
- Logging estructurado (cuando se implemente)

## TypeScript

- Habilitar modo strict
- Evitar `any` cuando sea posible
- Usar interfaces para contratos
- Tipar funciones y parámetros
- Usar tipos de unión cuando sea apropiado

## Variables de Entorno

- No versionar archivos `.env`
- Versionar `.env.example` con valores de ejemplo
- Usar prefijos apropiados (`REACT_APP_` para frontend)
- Documentar variables de entorno necesarias

