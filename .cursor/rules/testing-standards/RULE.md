---
description: "Estrategias y mejores prácticas para testing en backend y frontend con Jest y React Testing Library"
globs:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.test.js"
  - "**/*.test.jsx"
alwaysApply: false
---

# Reglas de Testing - LTI Project

## Estrategia General

- Tests co-locados con código fuente (`.test.ts`, `.test.tsx` junto al archivo)
- Cobertura objetivo: 70% mínimo, 80% para servicios y controladores
- Seguir patrón AAA (Arrange-Act-Assert)
- Tests independientes: cada test debe poder ejecutarse de forma aislada

## Backend Testing

### Framework
- **Jest** + **ts-jest** para tests TypeScript
- Configuración en `jest.config.js`

### Estructura de Test

```typescript
import { functionToTest } from './module';
import { PrismaClient } from '@prisma/client';

// Mock de dependencias externas
jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn(() => ({
            model: {
                create: jest.fn(),
                findUnique: jest.fn(),
                update: jest.fn(),
            }
        }))
    };
});

describe('functionToTest', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('should do something when conditions are met', async () => {
        // Arrange
        const input = { /* datos de prueba */ };
        const expectedOutput = { /* resultado esperado */ };
        
        // Act
        const result = await functionToTest(input);
        
        // Assert
        expect(result).toEqual(expectedOutput);
    });
    
    it('should throw error when validation fails', async () => {
        // Arrange
        const invalidInput = { /* datos inválidos */ };
        
        // Act & Assert
        await expect(functionToTest(invalidInput)).rejects.toThrow('Error message');
    });
});
```

### Tests de Servicios
- Mockear Prisma Client
- Testear casos de éxito y error
- Verificar llamadas a modelos de dominio
- Validar transformación de datos

### Tests de Controladores
- Mockear servicios
- Testear códigos HTTP correctos
- Verificar formato de respuestas
- Testear manejo de errores

## Frontend Testing

### Framework
- **Jest** + **React Testing Library**
- **@testing-library/user-event** para interacciones

### Estructura de Test

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComponentName } from './ComponentName';
import * as service from '../services/service';

jest.mock('../services/service');

describe('ComponentName', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('renders correctly', () => {
        render(<ComponentName prop="value" />);
        expect(screen.getByText(/text/i)).toBeInTheDocument();
    });
    
    it('handles user interaction', async () => {
        const onSubmit = jest.fn();
        render(<ComponentName onSubmit={onSubmit} />);
        
        fireEvent.change(screen.getByLabelText(/input/i), {
            target: { value: 'test' }
        });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        
        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
                // ...
            }));
        });
    });
    
    it('displays error message when API fails', async () => {
        (service.fetchData as jest.Mock).mockRejectedValue(
            new Error('API Error')
        );
        
        render(<ComponentName />);
        
        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });
    });
});
```

### Tests de Componentes
- Renderizar componente
- Verificar elementos en DOM
- Simular interacciones de usuario
- Verificar llamadas a servicios
- Testear estados de carga y error

## Mocking

### Backend
- Mockear Prisma Client
- Mockear servicios externos
- Usar `jest.fn()` para funciones mock

### Frontend
- Mockear servicios de API
- Mockear módulos externos
- Usar `jest.mock()` para mockear módulos completos

## Nombres de Tests

- Descriptivos: describir qué se está probando
- Formato: "should [acción] when [condición]"
- Ejemplos:
  - `should return candidate when id is valid`
  - `should throw error when email is invalid`
  - `should update state when form is submitted`

## Cobertura

- Objetivo mínimo: 70% para código crítico
- Objetivo servicios/controladores: 80%
- Objetivo modelos: 60%
- Ejecutar `npm test -- --coverage` para verificar

## Mejores Prácticas

- Un assert por test cuando sea posible
- Tests rápidos (< 100ms para unitarios)
- Datos de test realistas pero simples
- Limpiar estado después de cada test (`beforeEach`, `afterEach`)
- No testear implementación, testear comportamiento
- Mockear dependencias externas, no código interno

## Antipatrones a Evitar

- ❌ Tests que dependen de otros tests
- ❌ Tests que no limpian estado
- ❌ Tests que testean implementación en lugar de comportamiento
- ❌ Tests con lógica compleja (mantener tests simples)
- ❌ No mockear dependencias externas

