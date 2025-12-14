# Estándares de Desarrollo Generales

## Principios Generales de Calidad de Código

### SOLID

El proyecto sigue los principios SOLID con diferentes niveles de implementación:

#### Single Responsibility Principle (SRP)
- ✅ **Cumplido**: Separación en capas (presentación, aplicación, dominio)
- ✅ **Cumplido**: Controladores solo manejan HTTP, servicios solo lógica de negocio
- ⚠️ **Mejora**: Modelos de dominio también manejan acceso a datos (debería estar en repositorios)

#### Open/Closed Principle (OCP)
- ✅ **Cumplido**: Servicios extensibles mediante composición
- ⚠️ **Mejora**: Falta uso de interfaces para extensión sin modificación

#### Liskov Substitution Principle (LSP)
- ✅ **Cumplido**: No hay herencia que pueda violar LSP
- ✅ **Cumplido**: Uso de composición sobre herencia

#### Interface Segregation Principle (ISP)
- ⚠️ **Mejora**: No se usan interfaces TypeScript extensivamente
- **Recomendación**: Definir interfaces para servicios

#### Dependency Inversion Principle (DIP)
- ⚠️ **Parcial**: Modelos dependen directamente de Prisma Client
- **Recomendación**: Inyectar dependencias mediante constructor

### DRY (Don't Repeat Yourself)

- ✅ **Cumplido**: Validación centralizada en `validator.ts`
- ✅ **Cumplido**: Servicios reutilizables
- ⚠️ **Mejora**: Lógica de guardado repetida en modelos (candidato para abstracción)

### KISS (Keep It Simple, Stupid)

- ✅ **Cumplido**: Arquitectura simple y directa
- ✅ **Cumplido**: Sin sobre-ingeniería

### YAGNI (You Aren't Gonna Need It)

- ✅ **Cumplido**: Solo funcionalidades necesarias implementadas
- ✅ **Cumplido**: Sin abstracciones prematuras

## Linters y Herramientas de Calidad

### Backend

- **ESLint**: Configurado con `eslint-config-prettier` y `eslint-plugin-prettier`
- **Prettier**: Formateo automático de código
- **TypeScript**: Compilador con modo `strict` habilitado

**Configuración detectada:**
```json
{
  "eslint": "^9.2.0",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-prettier": "^5.1.3",
  "prettier": "^3.2.5"
}
```

### Frontend

- **ESLint**: Configurado con `react-app` y `react-app/jest`
- **TypeScript**: Compilador con modo `strict` habilitado

**Configuración detectada:**
```json
{
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  }
}
```

### Ejecutar Linters

**Backend:**
```bash
cd backend
npx eslint src/**/*.ts
npx prettier --check src/**/*.ts
```

**Frontend:**
```bash
cd frontend
npm run build  # TypeScript verifica tipos
```

## Normas de Estilo Compartidas

### Nomenclatura

- **Archivos**: camelCase para archivos TypeScript/JavaScript
  - Ejemplo: `candidateService.ts`, `addCandidateForm.js`
- **Clases**: PascalCase
  - Ejemplo: `Candidate`, `Education`, `WorkExperience`
- **Funciones/Métodos**: camelCase
  - Ejemplo: `addCandidate()`, `findCandidateById()`
- **Constantes**: UPPER_SNAKE_CASE
  - Ejemplo: `MAX_FILE_SIZE`, `DATABASE_URL`
- **Variables**: camelCase
  - Ejemplo: `candidateData`, `applicationId`

### Estructura de Archivos

- **Backend**: Organización por capas (domain, application, presentation)
- **Frontend**: Organización por tipo (components, services, assets)
- **Tests**: Co-locados con código fuente (`.test.ts` junto al archivo)

### Indentación y Formato

- **Espacios**: 2 espacios (no tabs)
- **Líneas**: Máximo recomendado 100-120 caracteres
- **Punto y coma**: Opcional (según configuración de Prettier)
- **Comillas**: Comillas simples para strings (según Prettier)

## Convenciones de Commits

### Formato

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
chore: actualizar dependencias
```

### Referencias a Issues

Incluir referencias en footer:
```
feat: añadir autenticación

Closes #123
Fixes #456
```

## Criterios Mínimos de Calidad Antes de Merge

### Checklist Pre-Merge

- [ ] **Compilación**: Código compila sin errores (`npm run build`)
- [ ] **Tests**: Todos los tests pasan (`npm test`)
- [ ] **Linting**: Sin errores de linting (`npx eslint`)
- [ ] **Type Safety**: Sin errores de TypeScript
- [ ] **Funcionalidad**: Funcionalidad probada manualmente
- [ ] **Documentación**: Documentación actualizada si es necesario
- [ ] **Sin console.logs**: Eliminados logs de debug
- [ ] **Sin código comentado**: Código muerto eliminado
- [ ] **Commits limpios**: Commits con mensajes descriptivos

### Code Review

**Requisitos:**
- Al menos una aprobación de otro desarrollador
- Resolver todos los comentarios antes de merge
- Mantener PR actualizado con rama base

**Aspectos a revisar:**
- Correcta separación de responsabilidades
- Uso adecuado de patrones del proyecto
- Manejo de errores apropiado
- Tests adecuados para nueva funcionalidad
- Sin regresiones en funcionalidad existente

## Antipatrones a Evitar

### ❌ Evitar

1. **God Objects**: Clases con demasiadas responsabilidades
   ```typescript
   // ❌ Mal
   class CandidateManager {
     save() { }
     validate() { }
     sendEmail() { }
     generateReport() { }
   }
   
   // ✅ Bien
   class CandidateService {
     save() { }
   }
   class CandidateValidator {
     validate() { }
   }
   ```

2. **Código Duplicado**: Repetir lógica en múltiples lugares
   ```typescript
   // ❌ Mal
   function saveCandidate() {
     if (!email.includes('@')) throw new Error('Invalid email');
     // ...
   }
   function updateCandidate() {
     if (!email.includes('@')) throw new Error('Invalid email');
     // ...
   }
   
   // ✅ Bien
   function validateEmail(email: string) {
     if (!email.includes('@')) throw new Error('Invalid email');
   }
   ```

3. **Magic Numbers/Strings**: Valores hardcodeados sin constantes
   ```typescript
   // ❌ Mal
   if (status === "Draft") { }
   
   // ✅ Bien
   const POSITION_STATUS = {
     DRAFT: "Draft",
     PUBLISHED: "Published"
   };
   if (status === POSITION_STATUS.DRAFT) { }
   ```

4. **Deep Nesting**: Anidación excesiva de condicionales
   ```typescript
   // ❌ Mal
   if (candidate) {
     if (candidate.email) {
       if (candidate.email.includes('@')) {
         // ...
       }
     }
   }
   
   // ✅ Bien
   if (!candidate?.email?.includes('@')) {
     return;
   }
   // ...
   ```

5. **Acceso Directo a BD desde Controladores**: Saltarse capas
   ```typescript
   // ❌ Mal
   export const addCandidate = async (req, res) => {
     const candidate = await prisma.candidate.create({ data: req.body });
   };
   
   // ✅ Bien
   export const addCandidate = async (req, res) => {
     const candidate = await candidateService.addCandidate(req.body);
   };
   ```

## Buenas Prácticas Recomendadas

### ✅ Recomendado

1. **Validación Temprana**: Validar entrada lo antes posible
2. **Manejo de Errores Explícito**: Usar try-catch y tipos de error específicos
3. **Type Safety**: Aprovechar TypeScript para prevenir errores
4. **Tests Unitarios**: Cubrir lógica de negocio con tests
5. **Documentación en Código**: Comentarios JSDoc para funciones públicas
6. **Constantes para Configuración**: Variables de entorno para configuración
7. **Logging Estructurado**: Usar niveles de log apropiados

## Herramientas de Desarrollo

### Recomendadas

- **VS Code**: Editor recomendado
- **Extensiones útiles**:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - Prisma
  - GitLens

### Scripts Útiles

```bash
# Verificar tipos sin compilar
npx tsc --noEmit

# Formatear código
npx prettier --write src/**/*.ts

# Verificar formato
npx prettier --check src/**/*.ts

# Ejecutar tests en modo watch
npm test -- --watch
```

## Métricas de Calidad

### Objetivos

- **Cobertura de tests**: [POR COMPLETAR] Objetivo mínimo sugerido: 70%
- **Errores de TypeScript**: 0 errores en compilación
- **Errores de ESLint**: 0 errores críticos
- **Complejidad ciclomática**: Máximo recomendado 10 por función

### Herramientas de Análisis

- [POR COMPLETAR] Configurar herramientas de análisis estático
- [POR COMPLETAR] Integrar en CI/CD

