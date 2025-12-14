# Estrategia y Metodología de Testing

## Tipos de Tests Detectados

### Backend

#### Tests Unitarios
- **Framework**: Jest + ts-jest
- **Ubicación**: Co-locados con código fuente (`.test.ts`)
- **Ejemplos detectados**:
  - `candidateService.test.ts`
  - `positionService.test.ts`
  - `candidateController.test.ts`
  - `positionController.test.ts`

#### Tests de Integración
- **Estado**: [POR COMPLETAR] No se detectan tests de integración explícitos
- **Recomendación**: Añadir tests que verifiquen interacción entre capas

### Frontend

#### Tests Unitarios
- **Framework**: Jest + React Testing Library
- **Estado**: [POR COMPLETAR] No se detectan tests en el código actual
- **Configuración**: Configurado en `package.json` pero sin tests implementados

#### Tests de Componentes
- **Herramienta**: React Testing Library
- **Estado**: [POR COMPLETAR] Pendiente de implementar

## Cobertura Objetivo

### Estado Actual

- **Backend**: Tests parciales implementados
- **Frontend**: Sin tests implementados
- **Cobertura medida**: [POR COMPLETAR] No se detecta herramienta de cobertura configurada

### Objetivos Recomendados

- **Cobertura mínima**: 70% para código crítico
- **Cobertura objetivo**: 80% para servicios y controladores
- **Cobertura de modelos**: 60% (lógica de negocio esencial)

## Herramientas y Frameworks

### Backend

#### Jest
- **Versión**: ^29.7.0
- **Preset**: ts-jest
- **Configuración**: `jest.config.js`

**Configuración detectada:**
```javascript
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
};
```

#### ts-jest
- **Versión**: ^29.1.2
- **Propósito**: Ejecutar tests TypeScript con Jest

### Frontend

#### Jest
- **Configuración**: Integrado con Create React App
- **Preset**: react-app

#### React Testing Library
- **Versión**: ^13.4.0
- **Propósito**: Testing de componentes React

#### @testing-library/user-event
- **Versión**: ^13.5.0
- **Propósito**: Simular interacciones de usuario

## Ejemplos Representativos de Tests

### Test de Servicio (Backend)

**Archivo**: `backend/src/application/services/candidateService.test.ts`

```typescript
import { updateCandidateStage } from './candidateService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    application: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

describe('updateCandidateStage', () => {
  it('should update the candidate stage and return the updated application', async () => {
    // Arrange
    const mockApplication = {
      id: 1,
      positionId: 1,
      candidateId: 1,
      currentInterviewStep: 1,
      applicationDate: new Date(),
      notes: null,
    };

    jest.spyOn(prisma.application, 'findFirst').mockResolvedValue(mockApplication);
    jest.spyOn(prisma.application, 'update').mockResolvedValue({
      ...mockApplication,
      currentInterviewStep: 2,
    });

    // Act
    const result = await updateCandidateStage(1, 1, 2);

    // Assert
    expect(result).toEqual(expect.objectContaining({
      ...mockApplication,
      currentInterviewStep: 2,
    }));
  });
});
```

### Test de Controlador (Backend) - Recomendado

```typescript
import { Request, Response } from 'express';
import { addCandidateController } from './candidateController';
import * as candidateService from '../services/candidateService';

jest.mock('../services/candidateService');

describe('addCandidateController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        
        mockRequest = {
            body: {
                firstName: "Juan",
                email: "juan@example.com"
            }
        };
        
        mockResponse = {
            status: mockStatus,
            json: mockJson
        };
    });

    it('should return 201 when candidate is created successfully', async () => {
        // Arrange
        const mockCandidate = { id: 1, firstName: "Juan", email: "juan@example.com" };
        (candidateService.addCandidate as jest.Mock).mockResolvedValue(mockCandidate);

        // Act
        await addCandidateController(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'Candidate added successfully',
            data: mockCandidate
        });
    });

    it('should return 400 when validation fails', async () => {
        // Arrange
        (candidateService.addCandidate as jest.Mock).mockRejectedValue(
            new Error('Invalid email')
        );

        // Act
        await addCandidateController(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'Error adding candidate',
            error: 'Invalid email'
        });
    });
});
```

### Test de Componente (Frontend) - Recomendado

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddCandidateForm } from './AddCandidateForm';
import * as candidateService from '../services/candidateService';

jest.mock('../services/candidateService');

describe('AddCandidateForm', () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders form fields', () => {
        render(<AddCandidateForm onSubmit={mockOnSubmit} />);
        
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('calls onSubmit when form is submitted with valid data', async () => {
        render(<AddCandidateForm onSubmit={mockOnSubmit} />);
        
        fireEvent.change(screen.getByLabelText(/first name/i), {
            target: { value: 'Juan' }
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'juan@example.com' }
        });
        
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    firstName: 'Juan',
                    email: 'juan@example.com'
                })
            );
        });
    });

    it('displays validation errors', async () => {
        render(<AddCandidateForm onSubmit={mockOnSubmit} />);
        
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        
        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        });
    });
});
```

## Estrategia de Testing por Capas

### Capa de Dominio (Models)

**Objetivo**: Validar lógica de negocio encapsulada en modelos

**Tests a implementar:**
- Validación de invariantes del dominio
- Métodos de negocio (si existen)
- Construcción correcta de objetos

**Ejemplo:**
```typescript
describe('Candidate', () => {
    it('should create candidate with valid data', () => {
        const data = {
            firstName: "Juan",
            lastName: "Pérez",
            email: "juan@example.com"
        };
        
        const candidate = new Candidate(data);
        
        expect(candidate.firstName).toBe("Juan");
        expect(candidate.email).toBe("juan@example.com");
    });

    it('should throw error when email is invalid', () => {
        const data = {
            firstName: "Juan",
            email: "invalid-email"
        };
        
        expect(() => new Candidate(data)).toThrow('Invalid email');
    });
});
```

### Capa de Aplicación (Services)

**Objetivo**: Validar orquestación de lógica de negocio

**Tests a implementar:**
- Flujos completos de operaciones
- Manejo de errores
- Validación de entrada
- Coordinación entre modelos

**Cobertura objetivo**: 80%

### Capa de Presentación (Controllers)

**Objetivo**: Validar manejo de HTTP requests/responses

**Tests a implementar:**
- Mapeo correcto de requests a servicios
- Formato correcto de responses
- Códigos HTTP apropiados
- Manejo de errores HTTP

**Cobertura objetivo**: 70%

### Capa de Infraestructura

**Objetivo**: Validar integración con sistemas externos

**Tests a implementar:**
- [POR COMPLETAR] Tests de integración con Prisma
- [POR COMPLETAR] Tests de integración con sistema de archivos
- [POR COMPLETAR] Tests E2E de flujos completos

## Patrones de Testing

### AAA Pattern (Arrange-Act-Assert)

```typescript
it('should do something', () => {
    // Arrange: Preparar datos y mocks
    const input = { /* ... */ };
    const expectedOutput = { /* ... */ };
    
    // Act: Ejecutar la función a testear
    const result = functionToTest(input);
    
    // Assert: Verificar el resultado
    expect(result).toEqual(expectedOutput);
});
```

### Mocking

**Prisma Client:**
```typescript
jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn(() => ({
            candidate: {
                create: jest.fn(),
                findUnique: jest.fn(),
            }
        }))
    };
});
```

**Servicios:**
```typescript
jest.mock('../services/candidateService');
```

## Configuración de Cobertura

### Jest Coverage

**Configurar en `package.json`:**
```json
{
  "scripts": {
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{ts,tsx}",
      "!src/**/*.test.{ts,tsx}",
      "!src/**/*.d.ts"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 70,
        "functions": 70,
        "lines": 70,
        "statements": 70
      }
    }
  }
}
```

## Tests E2E (End-to-End)

### Estado Actual

[POR COMPLETAR] No se detectan tests E2E.

### Recomendaciones

- **Herramienta**: Playwright o Cypress
- **Objetivo**: Validar flujos completos de usuario
- **Ejemplos**:
  - Flujo completo de creación de candidato
  - Flujo de actualización de etapa de entrevista
  - Flujo de subida de CV

## Mejoras Recomendadas

1. **Aumentar cobertura de tests**: Implementar tests faltantes
2. **Tests de integración**: Añadir tests que verifiquen interacción entre capas
3. **Tests E2E**: Implementar tests end-to-end para flujos críticos
4. **Mocking mejorado**: Usar factories para crear datos de test
5. **Test fixtures**: Crear fixtures reutilizables
6. **CI/CD integration**: Ejecutar tests automáticamente en CI/CD
7. **Coverage reporting**: Integrar reportes de cobertura en CI/CD

## Ejecutar Tests

### Backend

```bash
cd backend
npm test                    # Ejecutar todos los tests
npm test -- --watch         # Modo watch
npm test -- --coverage      # Con cobertura
npm test candidateService   # Tests específicos
```

### Frontend

```bash
cd frontend
npm test                    # Ejecutar todos los tests
npm test -- --watch         # Modo watch
npm test -- --coverage      # Con cobertura
```

## Mejores Prácticas

1. **Tests independientes**: Cada test debe poder ejecutarse de forma aislada
2. **Nombres descriptivos**: Nombres de tests que describan qué se está probando
3. **Un assert por test**: Idealmente, un solo assert por test (cuando sea posible)
4. **Tests rápidos**: Tests unitarios deben ser rápidos (< 100ms)
5. **Mocking apropiado**: Mockear dependencias externas, no código interno
6. **Datos de test**: Usar datos realistas pero simples
7. **Cleanup**: Limpiar estado después de cada test

