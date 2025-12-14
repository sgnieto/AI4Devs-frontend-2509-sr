---
description: "Estándares y mejores prácticas para desarrollo backend con Node.js, Express, TypeScript y Prisma siguiendo arquitectura DDD"
globs:
  - "backend/**/*.ts"
  - "backend/**/*.js"
alwaysApply: false
---

# Reglas de Backend - LTI Project

## Arquitectura en Capas (DDD)

- **Capa de Presentación** (`presentation/`): Controladores y rutas
- **Capa de Aplicación** (`application/`): Servicios y validadores
- **Capa de Dominio** (`domain/`): Modelos de dominio
- **Infraestructura**: Prisma ORM, Express, Multer

### Separación de Responsabilidades

- **Controladores**: Solo manejan HTTP (request/response), validación básica, formateo
- **Servicios**: Orquestan lógica de negocio, coordinan entre modelos
- **Modelos**: Encapsulan lógica de dominio y acceso a datos
- **Validadores**: Validación centralizada en `application/validator.ts`

## Nomenclatura

- **Archivos de servicios**: `[entidad]Service.ts` (ej: `candidateService.ts`)
- **Archivos de controladores**: `[entidad]Controller.ts` (ej: `candidateController.ts`)
- **Archivos de rutas**: `[entidad]Routes.ts` (ej: `candidateRoutes.ts`)
- **Modelos de dominio**: PascalCase, nombre de archivo igual a clase (ej: `Candidate.ts`)
- **Funciones/Métodos**: camelCase
- **Constantes**: UPPER_SNAKE_CASE

## Estructura de Servicios

```typescript
import { Model } from '../domain/models/Model';
import { validateData } from '../validator';

export const serviceFunction = async (data: any) => {
    // 1. Validar
    validateData(data);
    
    // 2. Crear modelo de dominio
    const model = new Model(data);
    
    // 3. Persistir
    const saved = await model.save();
    
    // 4. Retornar
    return saved;
};
```

## Estructura de Controladores

```typescript
import { Request, Response } from 'express';
import { serviceFunction } from '../services/service';

export const controllerFunction = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await serviceFunction(data);
        res.status(201).json({ 
            message: 'Operation successful', 
            data: result 
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ 
                message: 'Error message', 
                error: error.message 
            });
        } else {
            res.status(500).json({ 
                message: 'Unknown error' 
            });
        }
    }
};
```

## Estructura de Modelos de Dominio

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Model {
    id?: number;
    // ... propiedades
    
    constructor(data: any) {
        this.id = data.id;
        // ... inicialización
    }
    
    async save() {
        if (this.id) {
            return await prisma.model.update({
                where: { id: this.id },
                data: { /* ... */ }
            });
        } else {
            return await prisma.model.create({
                data: { /* ... */ }
            });
        }
    }
    
    static async findOne(id: number): Promise<Model | null> {
        const data = await prisma.model.findUnique({
            where: { id }
        });
        return data ? new Model(data) : null;
    }
}
```

## Manejo de Errores

### Errores de Validación
```typescript
if (!email || !EMAIL_REGEX.test(email)) {
    throw new Error('Invalid email');
}
```

### Errores de Base de Datos
```typescript
try {
    return await prisma.candidate.create({ data });
} catch (error: any) {
    if (error.code === 'P2002') {
        throw new Error('The email already exists in the database');
    }
    throw error;
}
```

### Errores en Controladores
```typescript
catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ 
            message: 'Error', 
            error: error.message 
        });
    } else {
        res.status(500).json({ 
            message: 'Unknown error' 
        });
    }
}
```

## Validación

- Validación centralizada en `application/validator.ts`
- Validar en servicios antes de crear modelos
- Usar regex y validaciones de longitud según esquema de BD
- Lanzar errores descriptivos para validación fallida

## Prisma

- Usar tipos generados por Prisma para type safety
- No usar SQL raw sin validación
- Manejar errores específicos de Prisma (P2002, P2025, etc.)
- Usar transacciones para operaciones complejas cuando sea necesario

## Códigos HTTP

- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **400 Bad Request**: Datos inválidos o error de validación
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error interno del servidor

## Middleware

- Usar middleware de Express para funcionalidad transversal
- Inyectar Prisma Client mediante middleware
- Configurar CORS apropiadamente
- Usar `express.json()` para parseo de JSON

## Testing

- Tests co-locados con código fuente (`.test.ts`)
- Mockear Prisma Client en tests
- Seguir patrón AAA (Arrange-Act-Assert)
- Testear casos de éxito y error

### Estructura de Test

```typescript
import { functionToTest } from './module';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn(() => ({
            model: {
                create: jest.fn(),
                findUnique: jest.fn(),
            }
        }))
    };
});

describe('functionToTest', () => {
    it('should do something', async () => {
        // Arrange
        const input = { /* ... */ };
        
        // Act
        const result = await functionToTest(input);
        
        // Assert
        expect(result).toEqual(expect.objectContaining({
            // ...
        }));
    });
});
```

## Antipatrones a Evitar

- ❌ No acceder directamente a Prisma desde controladores (usar servicios)
- ❌ No poner lógica de negocio en controladores
- ❌ No duplicar validación (usar validator centralizado)
- ❌ No usar `any` sin justificación
- ❌ No hardcodear valores mágicos (usar constantes)
- ❌ No crear funciones con demasiadas responsabilidades

