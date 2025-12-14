# Estándares y Prácticas de Documentación

## Estructura Recomendada de la Documentación

### Directorios de Documentación

```
docs/
├── ai-specs/              # Documentación técnica (esta carpeta)
│   ├── OVERVIEW.md
│   ├── GUIA_DESARROLLO.md
│   ├── MODELO_DATOS.md
│   ├── ARQUITECTURA.md
│   └── ...
├── api/                    # [POR COMPLETAR] Documentación de API
│   └── api-spec.yaml      # Especificación OpenAPI
└── user-guides/            # [POR COMPLETAR] Guías de usuario
```

### Tipos de Documentos

1. **Documentación Técnica** (`docs/ai-specs/`)
   - Arquitectura y diseño
   - Modelo de datos
   - Estándares de desarrollo
   - Guías de desarrollo

2. **Documentación de API** (`docs/api/` o `backend/api-spec.yaml`)
   - Especificación OpenAPI
   - Ejemplos de uso
   - Guías de integración

3. **Documentación de Usuario** (`docs/user-guides/`)
   - Manuales de usuario
   - Guías de uso de funcionalidades
   - FAQs

4. **README Principal** (`README.md`)
   - Descripción del proyecto
   - Setup inicial
   - Enlaces a documentación

## Convenciones de Comentarios en Código

### TypeScript/JavaScript

#### JSDoc para Funciones Públicas

```typescript
/**
 * Añade un nuevo candidato al sistema.
 * 
 * @param candidateData - Datos del candidato incluyendo educación, experiencia y CV
 * @returns Promise que resuelve con el candidato creado
 * @throws Error si la validación falla o el email ya existe
 * 
 * @example
 * const candidate = await addCandidate({
 *   firstName: "Juan",
 *   email: "juan@example.com",
 *   // ...
 * });
 */
export const addCandidate = async (candidateData: any) => {
    // ...
};
```

#### Comentarios Inline

- **Cuándo usar**: Para explicar lógica compleja o decisiones no obvias
- **Formato**: Comentarios en español o inglés (consistente)

```typescript
// Validar email antes de crear para evitar duplicados
validateEmail(candidateData.email);

// Prisma error code P2002 = unique constraint violation
if (error.code === 'P2002') {
    throw new Error('The email already exists in the database');
}
```

#### Comentarios TODO/FIXME

```typescript
// TODO: Implementar validación de CV en modelo de dominio
// FIXME: Manejar caso cuando candidateId es null
// NOTE: Esta validación debe moverse a la capa de dominio
```

### Comentarios en Modelos de Dominio

```typescript
/**
 * Representa un candidato en el sistema de reclutamiento.
 * 
 * Actúa como agregado raíz para Education, WorkExperience y Resume.
 * 
 * @class Candidate
 */
export class Candidate {
    /**
     * Identificador único del candidato.
     * Undefined si el candidato aún no ha sido persistido.
     */
    id?: number;
    
    /**
     * Email del candidato. Debe ser único en el sistema.
     */
    email: string;
    
    // ...
}
```

## Herramientas de Documentación Detectadas

### OpenAPI/Swagger

- **Archivo**: `backend/api-spec.yaml`
- **Versión**: OpenAPI 3.0.0
- **Herramientas**: 
  - `swagger-jsdoc`: Para generar especificación desde comentarios
  - `swagger-ui-express`: Para servir UI de Swagger

**Uso recomendado:**
```typescript
/**
 * @swagger
 * /candidates:
 *   post:
 *     summary: Add a new candidate
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       201:
 *         description: Candidate created successfully
 */
```

### JSDoc

- **Estado**: No configurado explícitamente
- **Recomendación**: Usar JSDoc para documentar funciones públicas

### TypeScript

- **Type Safety**: Los tipos TypeScript actúan como documentación
- **Interfaces**: Documentar interfaces con comentarios JSDoc

```typescript
/**
 * Datos requeridos para crear un candidato.
 */
interface CandidateInput {
    /** Nombre del candidato (2-100 caracteres) */
    firstName: string;
    /** Email único del candidato */
    email: string;
    // ...
}
```

## Cómo Mantener y Actualizar la Documentación

### Proceso de Actualización

1. **Actualizar documentación cuando:**
   - Se añade nueva funcionalidad
   - Se modifica comportamiento existente
   - Se cambia estructura de datos
   - Se añaden nuevos endpoints

2. **Checklist de actualización:**
   - [ ] Actualizar `API_SPEC.md` si hay cambios en endpoints
   - [ ] Actualizar `MODELO_DATOS.md` si hay cambios en schema
   - [ ] Actualizar `ARQUITECTURA.md` si hay cambios arquitectónicos
   - [ ] Actualizar `GUIA_DESARROLLO.md` si hay cambios en setup
   - [ ] Actualizar comentarios JSDoc en código afectado
   - [ ] Actualizar `api-spec.yaml` si hay cambios en API

### Responsabilidades

- **Desarrolladores**: Mantener documentación actualizada en PRs
- **Tech Lead/Arquitecto**: Revisar documentación en code reviews
- **Documentación técnica**: Mantener `docs/ai-specs/` actualizado

### Versionado de Documentación

- **Estrategia**: Documentación en rama `main` refleja estado actual
- **Historial**: Git mantiene historial de cambios
- **Tags**: [POR COMPLETAR] Considerar tags para versiones importantes

## Estándares de Redacción

### Idioma

- **Documentación técnica**: Español (según preferencia del proyecto)
- **Comentarios en código**: Español o inglés (consistente)
- **Nombres de variables/funciones**: Inglés (convención estándar)

### Estilo

- **Claridad**: Lenguaje claro y directo
- **Precisión**: Información técnica precisa
- **Ejemplos**: Incluir ejemplos cuando sea útil
- **Formato**: Markdown para documentos, JSDoc para código

### Estructura de Documentos

1. **Título y descripción breve**
2. **Tabla de contenidos** (para documentos largos)
3. **Secciones organizadas jerárquicamente**
4. **Ejemplos de código** cuando sea relevante
5. **Referencias** a otros documentos

## Documentación de API

### OpenAPI Specification

- **Ubicación**: `backend/api-spec.yaml`
- **Formato**: YAML
- **Versión**: 3.0.0

### Generación de Documentación

**Opción 1: Desde código (swagger-jsdoc)**
```typescript
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LTI API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts'], // Rutas a escanear
};

const swaggerSpec = swaggerJsdoc(options);
```

**Opción 2: Archivo YAML manual**
- Mantener `api-spec.yaml` actualizado manualmente
- Servir con `swagger-ui-express`

### Servir Documentación Swagger

```typescript
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './api-spec.yaml';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

## Documentación de Código

### Niveles de Documentación

1. **Alto nivel**: README, documentación de arquitectura
2. **Nivel de módulo**: Comentarios en archivos, JSDoc de clases
3. **Nivel de función**: JSDoc de funciones públicas
4. **Nivel de línea**: Comentarios inline para lógica compleja

### Qué Documentar

**Siempre documentar:**
- Funciones públicas de servicios
- Interfaces y tipos complejos
- Decisiones de diseño no obvias
- Lógica de negocio compleja
- Workarounds y hacks temporales

**No documentar:**
- Código autoexplicativo
- Implementaciones triviales
- Variables con nombres descriptivos

## Herramientas Recomendadas

### Generación de Documentación

- **TypeDoc**: Genera documentación desde TypeScript
- **JSDoc**: Genera documentación desde comentarios JSDoc
- **Swagger/OpenAPI**: Documentación de API

### Visualización

- **Swagger UI**: Para documentación de API
- **Markdown viewers**: Para documentación en Markdown
- **GitHub/GitLab**: Renderizado automático de Markdown

## Mejoras Recomendadas

1. **TypeDoc**: Configurar para generar documentación automática desde TypeScript
2. **Swagger UI**: Servir documentación interactiva en desarrollo
3. **README mejorado**: Añadir badges, ejemplos, enlaces
4. **CHANGELOG**: Mantener changelog de cambios importantes
5. **Guías de contribución**: Documentar proceso de contribución
6. **Diagramas**: Mantener diagramas actualizados con cambios arquitectónicos

## Ejemplo de Documentación Completa

### Archivo de Servicio

```typescript
/**
 * Servicio para gestión de candidatos.
 * 
 * Este servicio orquesta la lógica de negocio relacionada con candidatos,
 * incluyendo validación, creación y actualización.
 * 
 * @module candidateService
 */

import { Candidate } from '../domain/models/Candidate';
import { validateCandidateData } from './validator';

/**
 * Añade un nuevo candidato al sistema.
 * 
 * Valida los datos del candidato, crea las entidades de dominio
 * necesarias y persiste en la base de datos.
 * 
 * @param candidateData - Datos del candidato
 * @param candidateData.firstName - Nombre del candidato (2-100 caracteres)
 * @param candidateData.lastName - Apellido del candidato (2-100 caracteres)
 * @param candidateData.email - Email único del candidato
 * @param candidateData.phone - Teléfono opcional (formato español)
 * @param candidateData.educations - Array opcional de educación
 * @param candidateData.workExperiences - Array opcional de experiencia laboral
 * @param candidateData.cv - Objeto opcional con información de CV
 * 
 * @returns Promise que resuelve con el candidato creado
 * 
 * @throws {Error} Si la validación falla
 * @throws {Error} Si el email ya existe en la base de datos
 * 
 * @example
 * ```typescript
 * const candidate = await addCandidate({
 *   firstName: "Juan",
 *   lastName: "Pérez",
 *   email: "juan.perez@example.com",
 *   educations: [{
 *     institution: "Universidad",
 *     title: "Ingeniería",
 *     startDate: "2010-01-01"
 *   }]
 * });
 * ```
 */
export const addCandidate = async (candidateData: any) => {
    // Implementación...
};
```

Este nivel de documentación facilita el mantenimiento y onboarding de nuevos desarrolladores.

