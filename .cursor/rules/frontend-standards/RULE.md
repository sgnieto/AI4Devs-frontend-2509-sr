---
description: "Estándares y mejores prácticas para desarrollo frontend con React, TypeScript y React Bootstrap"
globs:
  - "frontend/**/*.tsx"
  - "frontend/**/*.ts"
  - "frontend/**/*.jsx"
  - "frontend/**/*.js"
alwaysApply: false
---

# Reglas de Frontend - LTI Project

## Estructura y Organización

- Los componentes React deben estar en `frontend/src/components/`
- Los servicios de API deben estar en `frontend/src/services/`
- Los assets estáticos deben estar en `frontend/src/assets/`
- Preferir componentes funcionales con hooks sobre clases
- Preferir TypeScript para nuevos componentes (migrar JS a TS gradualmente)

## Nomenclatura

- **Componentes**: PascalCase (`AddCandidateForm`, `RecruiterDashboard`)
- **Archivos de componentes**: PascalCase o camelCase según el componente
- **Servicios**: camelCase (`candidateService.js`)
- **Hooks personalizados**: Prefijo `use` (`useCandidate`, `usePosition`)
- **Variables y funciones**: camelCase
- **Constantes**: UPPER_SNAKE_CASE

## Componentes React

### Estructura de Componentes Funcionales

```typescript
import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

interface ComponentProps {
    title: string;
    onSubmit: (data: any) => void;
}

export const ComponentName: React.FC<ComponentProps> = ({ title, onSubmit }) => {
    const [state, setState] = useState<Type>(initialValue);
    
    useEffect(() => {
        // Efectos secundarios
    }, [dependencies]);
    
    return (
        <Container>
            {/* JSX */}
        </Container>
    );
};
```

### Hooks

- Usar `useState` para estado local del componente
- Usar `useEffect` para efectos secundarios (llamadas API, suscripciones)
- Usar `useCallback` para memoizar funciones pasadas como props
- Usar `useMemo` para memoizar valores calculados
- Siempre incluir dependencias correctas en arrays de dependencias

### Props

- Tipar props con interfaces TypeScript cuando sea posible
- Usar `React.FC<Props>` para componentes funcionales
- Documentar props complejas con JSDoc

## Estilos

- Usar React Bootstrap para componentes UI (Form, Button, Card, Container, Row, Col)
- Usar Bootstrap 5.3.3 como framework CSS base
- Usar sistema de grid de Bootstrap (Row/Col) para layouts responsivos
- Evitar estilos inline cuando sea posible
- Usar clases de Bootstrap antes que CSS personalizado

## Manejo de Estado

- Estado local: `useState` para estado del componente
- Estado del servidor: Llamadas a API desde servicios en `services/`
- No usar estado global a menos que sea necesario (evaluar Context API o Redux)
- Usar `useMemo` y `useCallback` para optimización cuando sea necesario

## Comunicación con API

- Todas las llamadas a API deben ir a través de servicios en `services/`
- Usar funciones async que retornan Promises
- Manejar errores con try-catch y mostrar mensajes al usuario
- Formatear datos antes de enviar (ej: fechas a YYYY-MM-DD)
- Usar variables de entorno para URL de API: `process.env.REACT_APP_API_URL`

### Ejemplo de Servicio

```typescript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010';

export const fetchData = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/endpoint/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
};
```

## Formularios

- Usar estado controlado: todos los inputs controlados por estado React
- Validación básica en frontend (HTML5 required, formatos)
- Validación completa en backend
- Mostrar mensajes de éxito/error mediante Alert de React Bootstrap
- Formatear datos antes de enviar (fechas a YYYY-MM-DD)

### Manejo de Fechas

```typescript
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// En el componente
const [startDate, setStartDate] = useState<Date | null>(null);

// Antes de enviar a API
const formattedDate = startDate ? startDate.toISOString().slice(0, 10) : '';
```

## Manejo de Errores

- Siempre usar try-catch en funciones async
- Mostrar mensajes de error al usuario mediante Alert de React Bootstrap
- No usar console.log para errores en producción
- Implementar Error Boundaries para manejo global de errores

## Accesibilidad

- Añadir `aria-label` a botones con solo iconos
- Asegurar navegación por teclado en todos los elementos interactivos
- Usar elementos semánticos HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
- Headings jerárquicos (h1, h2, h3)
- Cumplir con WCAG AA (contraste mínimo 4.5:1)

## Performance

- Usar `React.memo` para componentes que se re-renderizan frecuentemente
- Implementar code splitting con lazy loading de rutas
- Optimizar imágenes (lazy loading)
- Monitorear tamaño del bundle

## Routing

- Configurar React Router en `App.tsx` o `App.js`
- Usar `BrowserRouter`, `Routes`, `Route` de `react-router-dom`
- Lazy load de componentes de ruta cuando sea posible

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Positions = lazy(() => import('./components/Positions'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<RecruiterDashboard />} />
                    <Route path="/candidates" element={<AddCandidateForm />} />
                    <Route path="/positions" element={<Positions />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
```

## Testing

- Crear tests co-locados con componentes (`.test.tsx` o `.test.ts`)
- Usar React Testing Library para testing de componentes
- Usar `@testing-library/user-event` para simular interacciones
- Seguir patrón AAA (Arrange-Act-Assert)
- Mockear servicios y dependencias externas

### Estructura de Test

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
    it('renders correctly', () => {
        render(<ComponentName prop="value" />);
        expect(screen.getByText(/text/i)).toBeInTheDocument();
    });
    
    it('handles user interaction', () => {
        const onSubmit = jest.fn();
        render(<ComponentName onSubmit={onSubmit} />);
        
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        expect(onSubmit).toHaveBeenCalled();
    });
});
```

## TypeScript

- Preferir TypeScript para nuevos componentes
- Usar interfaces para props y tipos de datos
- Evitar `any` cuando sea posible, usar tipos específicos
- Habilitar modo strict en TypeScript

## Variables de Entorno

- Usar `.env` para configuración
- Prefijo `REACT_APP_` para variables accesibles en el código
- No versionar `.env`, sí versionar `.env.example`

## Antipatrones a Evitar

- ❌ No usar clases para componentes nuevos
- ❌ No hacer llamadas directas a API desde componentes (usar servicios)
- ❌ No usar `console.log` en producción
- ❌ No hardcodear URLs de API
- ❌ No usar `any` sin justificación
- ❌ No crear componentes con demasiadas responsabilidades
- ❌ No duplicar lógica de validación o formateo

