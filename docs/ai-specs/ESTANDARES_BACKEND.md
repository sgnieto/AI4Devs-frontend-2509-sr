# Estándares de Backend

## Guías Específicas para Node.js/Express/TypeScript

### Estructura de Carpetas y Módulos

El backend sigue una estructura en capas basada en DDD:

```
backend/src/
├── domain/              # Modelos de dominio (entidades)
│   └── models/
├── application/         # Lógica de aplicación
│   ├── services/        # Servicios de aplicación
│   └── validator.ts     # Validadores
├── presentation/        # Capa de presentación
│   └── controllers/     # Controladores HTTP
├── routes/              # Definición de rutas
└── index.ts            # Punto de entrada
```

### Convenciones de Nomenclatura

- **Archivos de servicios**: `[entidad]Service.ts`
  - Ejemplo: `candidateService.ts`, `positionService.ts`
- **Archivos de controladores**: `[entidad]Controller.ts`
  - Ejemplo: `candidateController.ts`, `positionController.ts`
- **Archivos de rutas**: `[entidad]Routes.ts`
  - Ejemplo: `candidateRoutes.ts`, `positionRoutes.ts`
- **Modelos de dominio**: PascalCase, nombre de archivo igual a clase
  - Ejemplo: `Candidate.ts` contiene clase `Candidate`

### Estructura de Servicios

Los servicios deben:
1. Recibir datos validados
2. Orquestar lógica de negocio
3. Coordinar entre modelos de dominio
4. Retornar resultados o lanzar errores

**Ejemplo:**
```typescript
export const addCandidate = async (candidateData: any) => {
    // 1. Validar (o delegar a validator)
    validateCandidateData(candidateData);
    
    // 2. Crear modelo de dominio
    const candidate = new Candidate(candidateData);
    
    // 3. Persistir
    const savedCandidate = await candidate.save();
    
    // 4. Retornar resultado
    return savedCandidate;
};
```

### Estructura de Controladores

Los controladores deben:
1. Extraer datos del request
2. Llamar al servicio correspondiente
3. Manejar errores y formatear respuestas HTTP
4. Retornar códigos HTTP apropiados

**Ejemplo:**
```typescript
export const addCandidateController = async (req: Request, res: Response) => {
    try {
        const candidateData = req.body;
        const candidate = await addCandidate(candidateData);
        res.status(201).json({ 
            message: 'Candidate added successfully', 
            data: candidate 
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ 
                message: 'Error adding candidate', 
                error: error.message 
            });
        } else {
            res.status(400).json({ 
                message: 'Error adding candidate', 
                error: 'Unknown error' 
            });
        }
    }
};
```

### Estructura de Modelos de Dominio

Los modelos deben:
1. Encapsular lógica de negocio
2. Proporcionar métodos para persistencia
3. Validar invariantes del dominio
4. Usar Prisma Client para acceso a datos

**Ejemplo:**
```typescript
export class Candidate {
    id?: number;
    firstName: string;
    email: string;
    // ... otros campos
    
    constructor(data: any) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.email = data.email;
        // Validaciones básicas pueden ir aquí
    }
    
    async save() {
        // Lógica de persistencia usando Prisma
        if (this.id) {
            return await prisma.candidate.update({
                where: { id: this.id },
                data: { /* ... */ }
            });
        } else {
            return await prisma.candidate.create({
                data: { /* ... */ }
            });
        }
    }
    
    static async findOne(id: number): Promise<Candidate | null> {
        const data = await prisma.candidate.findUnique({
            where: { id }
        });
        return data ? new Candidate(data) : null;
    }
}
```

## Linters Backend

### ESLint

**Configuración detectada:**
- `eslint`: ^9.2.0
- `eslint-config-prettier`: ^9.1.0
- `eslint-plugin-prettier`: ^5.1.3

**Reglas aplicadas:**
- Integración con Prettier para formateo
- TypeScript rules (si está configurado)

**Ejecutar:**
```bash
cd backend
npx eslint src/**/*.ts
```

### Prettier

**Configuración:**
- Formateo automático según reglas de Prettier
- Integrado con ESLint

**Ejecutar:**
```bash
npx prettier --write src/**/*.ts
npx prettier --check src/**/*.ts
```

## Manejo de Errores

### Estrategia de Manejo

1. **Errores de Validación**: Lanzar `Error` con mensaje descriptivo
   ```typescript
   if (!email || !EMAIL_REGEX.test(email)) {
       throw new Error('Invalid email');
   }
   ```

2. **Errores de Base de Datos**: Capturar y transformar en errores de dominio
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

3. **Errores en Controladores**: Manejar y formatear respuestas HTTP
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

### Tipos de Errores

- **400 Bad Request**: Datos inválidos, validación fallida
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Errores inesperados del servidor

## Logging

### Estrategia Actual

- **Console.log**: Uso básico de `console.log` para logging
- **Formato**: `console.log(\`${new Date().toISOString()} - ${req.method} ${req.path}\`)`

### Mejoras Recomendadas

- [ ] Implementar logger estructurado (Winston, Pino)
- [ ] Niveles de log (debug, info, warn, error)
- [ ] Logging de requests HTTP con middleware
- [ ] Correlación de requests (request ID)

**Ejemplo recomendado:**
```typescript
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Uso
logger.info('Candidate created', { candidateId: 123 });
logger.error('Database error', { error: error.message });
```

## Validación de Datos

### Validación en Capa de Aplicación

Validación centralizada en `application/validator.ts`:

```typescript
export const validateCandidateData = (data: any) => {
    validateName(data.firstName);
    validateName(data.lastName);
    validateEmail(data.email);
    validatePhone(data.phone);
    // ...
};
```

### Reglas de Validación

- **Nombres**: Regex para caracteres alfabéticos y acentos españoles
- **Email**: Regex estándar de email
- **Teléfono**: Regex para números españoles (6, 7, 9 seguidos de 8 dígitos)
- **Fechas**: Formato YYYY-MM-DD
- **Longitudes**: Según restricciones de BD (VarChar)

### Validación en Modelos

[POR COMPLETAR] Actualmente no hay validación en constructores de modelos. Se recomienda añadir validación básica en constructores.

## Reglas de Versionado y Deprecación

### Versionado de API

- **Actual**: Sin versionado explícito en URLs
- **Recomendación**: Implementar versionado cuando haya cambios breaking
  - Ejemplo: `/api/v1/candidates`, `/api/v2/candidates`

### Deprecación de Endpoints

[POR COMPLETAR] No hay proceso formal de deprecación. Se recomienda:

1. Marcar endpoint como deprecated en documentación
2. Añadir header `Deprecation: true` en respuestas
3. Proporcionar endpoint alternativo si existe
4. Mantener durante período de gracia (ej: 6 meses)
5. Eliminar después del período de gracia

## Prácticas Específicas

### Uso de Prisma

- **Generar Client**: Ejecutar `npx prisma generate` después de cambios en schema
- **Migraciones**: Usar `npx prisma migrate dev` para desarrollo
- **Queries**: Usar tipos generados por Prisma para type safety
- **Transacciones**: [POR COMPLETAR] No se detectan transacciones explícitas

**Ejemplo:**
```typescript
// Usar tipos generados
import { Prisma } from '@prisma/client';

const candidate = await prisma.candidate.create({
    data: {
        firstName: "Juan",
        email: "juan@example.com"
    }
});
```

### Middleware de Express

**Middleware actual:**
- `express.json()`: Parseo de JSON
- `cors`: Configurado para `http://localhost:3000`
- Prisma injection: Middleware personalizado para inyectar Prisma Client

**Recomendaciones:**
- [ ] Añadir middleware de logging
- [ ] Añadir middleware de manejo de errores global
- [ ] Añadir rate limiting para producción

### Gestión de Archivos

- **Multer**: Usado para subida de archivos
- **Almacenamiento**: Sistema de archivos local (`../uploads/`)
- **Validación**: Solo PDF y DOCX permitidos
- **Límite**: 10MB por archivo

**Mejoras sugeridas:**
- [ ] Validar tamaño antes de subir
- [ ] Escanear archivos para malware
- [ ] Almacenar en servicio en la nube (S3, Azure Blob)

## Testing Backend

### Framework

- **Jest**: Framework de testing
- **ts-jest**: Preset para TypeScript
- **Configuración**: `jest.config.js`

### Estructura de Tests

- **Co-locados**: Tests junto al código fuente (`.test.ts`)
- **Nomenclatura**: `[archivo].test.ts`

**Ejemplo:**
```typescript
import { updateCandidateStage } from './candidateService';

describe('updateCandidateStage', () => {
    it('should update the candidate stage', async () => {
        // Arrange
        const mockApplication = { /* ... */ };
        
        // Act
        const result = await updateCandidateStage(1, 1, 2);
        
        // Assert
        expect(result).toEqual(expect.objectContaining({
            currentInterviewStep: 2
        }));
    });
});
```

### Mocking

- **Prisma**: Mock de Prisma Client en tests
- **Ejemplo detectado**: Mock de `@prisma/client` en tests

## Mejoras Recomendadas

1. **Repositorios Explícitos**: Separar acceso a datos de modelos de dominio
2. **Interfaces para Servicios**: Definir contratos con interfaces TypeScript
3. **Logging Estructurado**: Implementar logger profesional
4. **Manejo de Errores Mejorado**: Clases de error personalizadas
5. **Transacciones**: Usar transacciones de Prisma para operaciones complejas
6. **Validación en Modelos**: Añadir validación en constructores
7. **Dependency Injection**: Inyectar Prisma Client en lugar de importarlo directamente

