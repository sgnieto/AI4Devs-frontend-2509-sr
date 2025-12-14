---
description: "Estándares para documentación en código: JSDoc, comentarios inline y documentación de componentes"
alwaysApply: false
---

# Reglas de Documentación - LTI Project

## Documentación en Código

### JSDoc para Funciones Públicas

Todas las funciones públicas deben tener documentación JSDoc:

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

### Comentarios Inline

- Usar para explicar lógica compleja o decisiones no obvias
- Formato: español o inglés (mantener consistencia)
- Evitar comentarios obvios que repiten el código

```typescript
// Validar email antes de crear para evitar duplicados
validateEmail(candidateData.email);

// Prisma error code P2002 = unique constraint violation
if (error.code === 'P2002') {
    throw new Error('The email already exists in the database');
}
```

### Comentarios TODO/FIXME

```typescript
// TODO: Implementar validación de CV en modelo de dominio
// FIXME: Manejar caso cuando candidateId es null
// NOTE: Esta validación debe moverse a la capa de dominio
```

### Documentación de Clases

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
}
```

## Documentación de Componentes React

### Props con TypeScript

```typescript
interface ComponentProps {
    /** Título del componente */
    title: string;
    /** Callback cuando se envía el formulario */
    onSubmit: (data: any) => void;
}

export const Component: React.FC<ComponentProps> = ({ title, onSubmit }) => {
    // ...
};
```

## Documentación de API

### Swagger/OpenAPI

Usar comentarios Swagger para documentar endpoints:

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

## Qué Documentar

### Siempre Documentar
- Funciones públicas de servicios
- Interfaces y tipos complejos
- Decisiones de diseño no obvias
- Lógica de negocio compleja
- Workarounds y hacks temporales
- Props de componentes públicos

### No Documentar
- Código autoexplicativo
- Implementaciones triviales
- Variables con nombres descriptivos
- Funciones privadas simples

## Mantenimiento de Documentación

- Actualizar documentación cuando se modifica código
- Mantener ejemplos actualizados
- Eliminar documentación obsoleta
- Revisar documentación en code reviews

## Estructura de Documentación

- README.md: Descripción general y setup
- docs/ai-specs/: Documentación técnica detallada
- JSDoc en código: Documentación de API y funciones
- Comentarios inline: Explicaciones de lógica compleja

