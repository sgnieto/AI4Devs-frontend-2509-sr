# Estándares de Frontend

## Guías Específicas para React/TypeScript

### Estructura de Componentes

El frontend utiliza React con Create React App como base:

```
frontend/src/
├── components/          # Componentes React
│   ├── AddCandidateForm.js
│   ├── FileUploader.js
│   ├── Positions.tsx
│   └── RecruiterDashboard.js
├── services/            # Servicios de comunicación con API
│   └── candidateService.js
├── assets/              # Recursos estáticos
└── App.tsx             # Componente raíz
```

### Convenciones de Nomenclatura

- **Componentes**: PascalCase
  - Ejemplo: `AddCandidateForm`, `RecruiterDashboard`, `Positions`
- **Archivos de componentes**: PascalCase o camelCase según el componente
  - Ejemplo: `AddCandidateForm.js`, `Positions.tsx`
- **Hooks personalizados**: Prefijo `use`
  - Ejemplo: `useCandidate`, `usePosition`
- **Servicios**: camelCase
  - Ejemplo: `candidateService.js`

### Estructura de Componentes

**Componente Funcional (Recomendado):**
```typescript
import React from 'react';

interface Props {
    title: string;
    onSubmit: (data: any) => void;
}

export const AddCandidateForm: React.FC<Props> = ({ title, onSubmit }) => {
    const [formData, setFormData] = React.useState({});
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {/* JSX */}
        </form>
    );
};
```

**Componente de Clase (Legacy):**
```javascript
import React, { Component } from 'react';

class AddCandidateForm extends Component {
    constructor(props) {
        super(props);
        this.state = { /* ... */ };
    }
    
    render() {
        return (/* JSX */);
    }
}
```

### Convenciones de Hooks

- **useState**: Para estado local del componente
- **useEffect**: Para efectos secundarios (llamadas API, suscripciones)
- **useCallback**: Para memoizar funciones pasadas como props
- **useMemo**: Para memoizar valores calculados

**Ejemplo:**
```typescript
const [candidates, setCandidates] = useState<Candidate[]>([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
    const fetchCandidates = async () => {
        setLoading(true);
        try {
            const data = await candidateService.getCandidates();
            setCandidates(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    fetchCandidates();
}, []);
```

## Linters Frontend

### ESLint

**Configuración detectada:**
```json
{
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  }
}
```

**Reglas aplicadas:**
- Reglas de React App (Create React App)
- Reglas de Jest para tests

**Ejecutar:**
```bash
cd frontend
npm run build  # Verifica tipos y linting
```

### TypeScript

- **Modo strict**: Habilitado
- **JSX**: `react-jsx` (nuevo transform)
- **Target**: ES5

## Convenciones de Estilos

### Librería UI

- **React Bootstrap**: Versión 2.10.2
- **Bootstrap**: Versión 5.3.3
- **React Bootstrap Icons**: Para iconos

### Estilos

- **CSS Modules**: [POR COMPLETAR] No detectado uso de CSS modules
- **Styled Components**: [POR COMPLETAR] No detectado
- **CSS Global**: `App.css`, `index.css`

**Recomendación:**
- Usar CSS modules o styled-components para estilos scoped
- Evitar estilos globales cuando sea posible

### Estructura de Estilos

```css
/* Componente específico */
.AddCandidateForm {
    /* Estilos */
}

.AddCandidateForm__input {
    /* BEM naming */
}
```

## Manejo de Estado

### Estado Local

- **useState**: Para estado local del componente
- **useReducer**: Para estado complejo (no detectado en código actual)

### Estado Global

[POR COMPLETAR] No se detecta uso de:
- Redux
- Context API
- Zustand
- Otros gestores de estado

**Recomendación**: Evaluar necesidad de estado global según crezca la aplicación.

### Estado del Servidor

- **Axios**: Para llamadas HTTP (implícito en servicios)
- **Servicios**: Funciones async en `services/` para comunicación con API

**Ejemplo:**
```javascript
export const sendCandidateData = async (candidateData) => {
    try {
        const response = await axios.post(
            'http://localhost:3010/candidates', 
            candidateData
        );
        return response.data;
    } catch (error) {
        throw new Error('Error al enviar datos del candidato:', error.response.data);
    }
};
```

## Routing

### React Router DOM

- **Versión**: 6.23.1
- **Configuración**: [POR COMPLETAR] No detectada configuración de rutas explícita

**Ejemplo recomendado:**
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RecruiterDashboard />} />
                <Route path="/candidates" element={<AddCandidateForm />} />
                <Route path="/positions" element={<Positions />} />
            </Routes>
        </BrowserRouter>
    );
}
```

## Llamadas a API

### Servicios

- **Ubicación**: `src/services/`
- **Patrón**: Funciones async que retornan Promises
- **Manejo de errores**: Try-catch con throw de errores

**Ejemplo:**
```javascript
export const uploadCV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await axios.post(
            'http://localhost:3010/upload', 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error al subir el archivo:', error.response.data);
    }
};
```

### Mejoras Recomendadas

- [ ] Crear instancia de Axios con configuración base
- [ ] Interceptores para manejo de errores global
- [ ] Interceptores para añadir tokens de autenticación
- [ ] Variables de entorno para URL de API

**Ejemplo:**
```typescript
// apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010',
    timeout: 10000,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Manejo global de errores
        if (error.response?.status === 401) {
            // Redirigir a login
        }
        return Promise.reject(error);
    }
);

export default apiClient;
```

## Estándares de Accesibilidad

### ARIA Labels

[POR COMPLETAR] No se detecta uso explícito de ARIA labels.

**Recomendación:**
```tsx
<button aria-label="Añadir candidato">
    <PlusIcon />
</button>
```

### Navegación por Teclado

- Asegurar que todos los elementos interactivos sean accesibles por teclado
- Orden de tab lógico
- Focus visible

### Contraste de Colores

- Cumplir con WCAG AA (contraste mínimo 4.5:1)
- [POR COMPLETAR] Verificar en implementación

### Semántica HTML

- Usar elementos semánticos (`<nav>`, `<main>`, `<section>`, `<article>`)
- Headings jerárquicos (h1, h2, h3)

## Prácticas Recomendadas

### Performance

1. **Memoización**: Usar `React.memo`, `useMemo`, `useCallback` cuando sea necesario
2. **Code Splitting**: Lazy loading de rutas
   ```typescript
   const Positions = React.lazy(() => import('./components/Positions'));
   ```
3. **Imágenes**: Optimización y lazy loading
4. **Bundle Size**: Monitorear tamaño del bundle

### Manejo de Errores

**Error Boundaries:**
```typescript
class ErrorBoundary extends React.Component {
    state = { hasError: false };
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return <h1>Algo salió mal.</h1>;
        }
        return this.props.children;
    }
}
```

### Validación de Formularios

[POR COMPLETAR] No se detecta librería de validación de formularios.

**Recomendaciones:**
- React Hook Form para validación
- Yup o Zod para esquemas de validación

**Ejemplo:**
```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email().required(),
    firstName: yup.string().min(2).required(),
});

const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
});
```

## Testing Frontend

### Framework

- **Jest**: Framework de testing
- **React Testing Library**: Para testing de componentes
- **@testing-library/user-event**: Para simular interacciones de usuario

### Estructura de Tests

[POR COMPLETAR] No se detectan tests en el código actual.

**Ejemplo recomendado:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { AddCandidateForm } from './AddCandidateForm';

describe('AddCandidateForm', () => {
    it('renders form fields', () => {
        render(<AddCandidateForm onSubmit={jest.fn()} />);
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    });
    
    it('calls onSubmit when form is submitted', () => {
        const onSubmit = jest.fn();
        render(<AddCandidateForm onSubmit={onSubmit} />);
        
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        
        expect(onSubmit).toHaveBeenCalled();
    });
});
```

## Mejoras Recomendadas

1. **TypeScript**: Migrar componentes JavaScript a TypeScript
2. **Estado Global**: Evaluar necesidad de Context API o Redux
3. **Validación de Formularios**: Implementar React Hook Form
4. **Manejo de Errores**: Error Boundaries y manejo global de errores
5. **Testing**: Añadir tests para componentes críticos
6. **Accesibilidad**: Mejorar ARIA labels y navegación por teclado
7. **Performance**: Implementar code splitting y lazy loading
8. **Variables de Entorno**: Usar `.env` para configuración
9. **API Client**: Crear cliente de API centralizado con Axios
10. **Estilos**: Considerar CSS modules o styled-components

