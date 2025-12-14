# AGENT.md - Guía para Agentes de IA - Frontend LTI

## Contexto del Proyecto

**LTI - Talent Tracking System** es una aplicación full-stack para gestionar procesos de selección de personal. El frontend es una aplicación React que permite a los reclutadores gestionar candidatos, posiciones y procesos de entrevistas.

### Información Clave
- **Framework**: React 18.3.1
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Lenguaje**: TypeScript / JavaScript (mixto)
- **Backend API**: Express.js en `http://localhost:3010`
- **Base de Datos**: PostgreSQL (gestionada por backend)

## Stack Tecnológico del Frontend

### Dependencias Principales

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.23.1",
  "react-bootstrap": "^2.10.2",
  "bootstrap": "^5.3.3",
  "react-bootstrap-icons": "^1.11.4",
  "react-datepicker": "^6.9.0",
  "typescript": "^4.9.5",
  "axios": "implícito (usado en servicios)"
}
```

### Herramientas de Desarrollo
- **ESLint**: Configurado con `react-app` y `react-app/jest`
- **TypeScript**: Modo strict habilitado, target ES5
- **Testing**: Jest + React Testing Library (configurado pero sin tests implementados)

## Estructura de Directorios

```
frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── AddCandidateForm.js
│   │   ├── FileUploader.js
│   │   ├── Positions.tsx
│   │   └── RecruiterDashboard.js
│   ├── services/            # Servicios de comunicación con API
│   │   └── candidateService.js
│   ├── assets/              # Recursos estáticos
│   │   └── lti-logo.png
│   ├── App.tsx             # Componente raíz (actualmente básico)
│   ├── App.js              # Componente raíz alternativo
│   ├── index.tsx           # Punto de entrada
│   ├── index.css           # Estilos globales
│   └── App.css             # Estilos del componente App
├── public/                  # Archivos públicos
│   ├── index.html
│   └── manifest.json
└── package.json
```

## Componentes Existentes

### AddCandidateForm.js
**Ubicación**: `src/components/AddCandidateForm.js`  
**Tipo**: Componente funcional con hooks  
**Responsabilidad**: Formulario completo para crear candidatos

**Estado gestionado:**
- `candidate`: Objeto con firstName, lastName, email, phone, address, educations[], workExperiences[], cv
- `error`: Mensaje de error
- `successMessage`: Mensaje de éxito

**Funcionalidades:**
- Formulario con campos básicos del candidato
- Gestión dinámica de educación (añadir/eliminar)
- Gestión dinámica de experiencia laboral (añadir/eliminar)
- Subida de CV mediante componente FileUploader
- Validación y envío a API `/candidates` (POST)
- Formateo de fechas a YYYY-MM-DD antes de enviar

**Librerías usadas:**
- React Bootstrap (Form, Button, Alert, Card, Container, Row, Col)
- React Bootstrap Icons (Trash)
- React DatePicker para fechas

**Ejemplo de uso del estado:**
```javascript
const [candidate, setCandidate] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    educations: [],
    workExperiences: [],
    cv: null
});
```

### FileUploader.js
**Ubicación**: `src/components/FileUploader.js`  
**Responsabilidad**: Componente para subir archivos (CVs)

**Props esperadas:**
- `onChange`: Callback cuando se selecciona archivo
- `onUpload`: Callback cuando se completa la subida
- `className`: Clases CSS adicionales

**Funcionalidad:**
- Sube archivos a `/upload` (POST multipart/form-data)
- Solo acepta PDF y DOCX
- Retorna `{ filePath, fileType }` al componente padre

### Positions.tsx
**Ubicación**: `src/components/Positions.tsx`  
**Tipo**: Componente funcional TypeScript  
**Responsabilidad**: Listado y gestión de posiciones

**Estado actual:**
- Usa datos mock (`mockPositions`)
- No conectado a API aún

**Funcionalidades:**
- Muestra lista de posiciones en cards
- Filtros de búsqueda (título, fecha, estado, manager)
- Badges de estado (Abierto, Contratado, Cerrado, Borrador)
- Botones de acción (Ver proceso, Editar)

**Tipos TypeScript:**
```typescript
type Position = {
    title: string;
    manager: string;
    deadline: string;
    status: 'Abierto' | 'Contratado' | 'Cerrado' | 'Borrador';
};
```

### RecruiterDashboard.js
**Ubicación**: `src/components/RecruiterDashboard.js`  
**Responsabilidad**: Dashboard principal del reclutador  
**Estado**: [Revisar implementación actual]

## Servicios de API

### candidateService.js
**Ubicación**: `src/services/candidateService.js`

**Funciones disponibles:**

#### `uploadCV(file)`
Sube un archivo CV al servidor.

```javascript
export const uploadCV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await axios.post('http://localhost:3010/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data; // { filePath, fileType }
    } catch (error) {
        throw new Error('Error al subir el archivo:', error.response.data);
    }
};
```

#### `sendCandidateData(candidateData)`
Envía datos de candidato al servidor.

```javascript
export const sendCandidateData = async (candidateData) => {
    try {
        const response = await axios.post('http://localhost:3010/candidates', candidateData);
        return response.data;
    } catch (error) {
        throw new Error('Error al enviar datos del candidato:', error.response.data);
    }
};
```

**Nota**: Actualmente `AddCandidateForm.js` usa `fetch` directamente en lugar de este servicio. Se recomienda usar el servicio para consistencia.

## Endpoints de API Disponibles

### Base URL
`http://localhost:3010`

### Endpoints Relevantes para Frontend

#### POST /candidates
Crea un nuevo candidato.

**Request Body:**
```json
{
  "firstName": "string (2-100 chars, solo letras)",
  "lastName": "string (2-100 chars, solo letras)",
  "email": "string (formato email válido, único)",
  "phone": "string opcional (formato español: 6|7|9 seguido de 8 dígitos)",
  "address": "string opcional (max 100 chars)",
  "educations": [
    {
      "institution": "string (max 100 chars)",
      "title": "string (max 100 chars)",
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD (opcional)"
    }
  ],
  "workExperiences": [
    {
      "company": "string (max 100 chars)",
      "position": "string (max 100 chars)",
      "description": "string opcional (max 200 chars)",
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD (opcional)"
    }
  ],
  "cv": {
    "filePath": "string",
    "fileType": "string (application/pdf o application/vnd.openxmlformats-officedocument.wordprocessingml.document)"
  }
}
```

**Response 201:**
```json
{
  "message": "Candidate added successfully",
  "data": {
    "id": 1,
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@example.com",
    "educations": [ /* ... */ ],
    "workExperiences": [ /* ... */ ],
    "resumes": [ /* ... */ ]
  }
}
```

**Response 400:**
```json
{
  "message": "Error adding candidate",
  "error": "Invalid email" // u otro error de validación
}
```

#### GET /candidates/:id
Obtiene un candidato por ID.

**Response 200:**
```json
{
  "id": 1,
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "phone": "656874937",
  "address": "Calle Ejemplo 123",
  "educations": [
    {
      "id": 1,
      "institution": "Universidad",
      "title": "Ingeniería",
      "startDate": "2010-09-01T00:00:00.000Z",
      "endDate": "2014-06-30T00:00:00.000Z",
      "candidateId": 1
    }
  ],
  "workExperiences": [ /* ... */ ],
  "resumes": [ /* ... */ ],
  "applications": [ /* ... */ ]
}
```

**Response 404:**
```json
{
  "error": "Candidate not found"
}
```

#### PUT /candidates/:id
Actualiza etapa de entrevista de un candidato.

**Request Body:**
```json
{
  "applicationId": 1,
  "currentInterviewStep": 2
}
```

**Response 200:**
```json
{
  "message": "Candidate stage updated successfully",
  "data": {
    "id": 1,
    "positionId": 1,
    "candidateId": 1,
    "currentInterviewStep": 2,
    "interviews": [ /* ... */ ]
  }
}
```

#### POST /upload
Sube un archivo (CV).

**Content-Type**: `multipart/form-data`  
**Body**: `file` (File object)

**Validaciones:**
- Solo PDF y DOCX permitidos
- Tamaño máximo: 10MB

**Response 200:**
```json
{
  "filePath": "uploads/1715760936750-cv.pdf",
  "fileType": "application/pdf"
}
```

**Response 400:**
```json
{
  "error": "Invalid file type, only PDF and DOCX are allowed!"
}
```

#### GET /position/:id/candidates
Obtiene candidatos de una posición.

**Response 200:**
```json
[
  {
    "fullName": "Juan Pérez",
    "currentInterviewStep": "Entrevista Técnica",
    "averageScore": 8.5,
    "id": 1,
    "applicationId": 1
  }
]
```

#### GET /position/:id/interviewflow
Obtiene flujo de entrevistas de una posición.

**Response 200:**
```json
{
  "positionName": "Desarrollador Full Stack",
  "interviewFlow": {
    "id": 1,
    "description": "Flujo estándar de entrevistas técnicas",
    "interviewSteps": [
      {
        "id": 1,
        "interviewFlowId": 1,
        "interviewTypeId": 1,
        "name": "Screening Inicial",
        "orderIndex": 1
      },
      {
        "id": 2,
        "name": "Entrevista Técnica",
        "orderIndex": 2
      }
    ]
  }
}
```

## Modelos de Datos Relevantes

### Candidate (Candidato)
```typescript
interface Candidate {
  id?: number;
  firstName: string;        // 2-100 chars, solo letras y espacios
  lastName: string;         // 2-100 chars, solo letras y espacios
  email: string;            // formato email válido, único
  phone?: string;           // formato español opcional (6|7|9 + 8 dígitos)
  address?: string;         // max 100 chars opcional
  educations?: Education[];
  workExperiences?: WorkExperience[];
  resumes?: Resume[];
  applications?: Application[];
  cv?: { 
    filePath: string; 
    fileType: string 
  };
}
```

### Education (Educación)
```typescript
interface Education {
  id?: number;
  institution: string;      // max 100 chars
  title: string;            // max 100 chars (en BD: 250)
  startDate: string;        // YYYY-MM-DD o DateTime ISO
  endDate?: string;         // YYYY-MM-DD o DateTime ISO opcional
  candidateId?: number;
}
```

### WorkExperience (Experiencia Laboral)
```typescript
interface WorkExperience {
  id?: number;
  company: string;          // max 100 chars
  position: string;          // max 100 chars
  description?: string;      // max 200 chars opcional
  startDate: string;        // YYYY-MM-DD o DateTime ISO
  endDate?: string;         // YYYY-MM-DD o DateTime ISO opcional
  candidateId?: number;
}
```

### Resume (Currículum)
```typescript
interface Resume {
  id?: number;
  filePath: string;         // max 500 chars
  fileType: string;         // max 50 chars (MIME type)
  uploadDate?: string;      // DateTime ISO
  candidateId?: number;
}
```

### Position (Posición)
```typescript
interface Position {
  id?: number;
  title: string;
  description: string;
  status: string;           // "Draft", "Published", "Closed"
  isVisible: boolean;
  location: string;
  jobDescription: string;
  requirements?: string;
  responsibilities?: string;
  salaryMin?: number;
  salaryMax?: number;
  employmentType?: string;
  benefits?: string;
  companyDescription?: string;
  applicationDeadline?: string; // DateTime ISO
  contactInfo?: string;
}
```

## Convenciones y Estándares

### Nomenclatura
- **Componentes**: PascalCase (`AddCandidateForm`, `RecruiterDashboard`, `Positions`)
- **Archivos de componentes**: PascalCase o camelCase según componente
- **Servicios**: camelCase (`candidateService.js`)
- **Hooks personalizados**: Prefijo `use` (`useCandidate`, `usePosition`)
- **Variables y funciones**: camelCase
- **Constantes**: UPPER_SNAKE_CASE

### Estructura de Componentes
- **Preferir componentes funcionales** con hooks sobre clases
- **TypeScript cuando sea posible**: Migrar JS a TS gradualmente
- **Estado local**: Usar `useState` para estado del componente
- **Efectos secundarios**: Usar `useEffect` para llamadas API, suscripciones
- **Props tipadas**: Usar TypeScript interfaces para props cuando sea posible

### Estilos
- **React Bootstrap**: Componentes UI principales (Form, Button, Card, Container, Row, Col)
- **Bootstrap 5.3.3**: Framework CSS base
- **CSS Global**: `App.css`, `index.css` para estilos globales
- **Clases**: Usar clases de Bootstrap, añadir clases personalizadas cuando sea necesario
- **Responsive**: Usar sistema de grid de Bootstrap (Row/Col) para layouts responsivos

### Manejo de Estado
- **Estado Local**: `useState` para estado del componente
- **Estado Global**: No implementado actualmente (considerar Context API o Redux si crece)
- **Estado del Servidor**: Llamadas directas a API desde componentes o servicios
- **Memoización**: Usar `useMemo`, `useCallback` cuando sea necesario para performance

### Routing
- **React Router DOM 6.23.1**: Disponible pero no configurado explícitamente en código actual
- **Recomendación**: Configurar rutas en `App.tsx` o `App.js`
- **Ejemplo de configuración**:
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

### Validación
- **Validación básica**: HTML5 required en formularios
- **Validación completa**: En backend (ver `backend/src/application/validator.ts`)
- **Recomendación**: Implementar React Hook Form + Yup/Zod para validación en frontend

### Manejo de Errores
- **Try-catch**: En funciones async
- **Mensajes de error**: Mostrar al usuario mediante Alert de React Bootstrap
- **Error Boundaries**: [POR IMPLEMENTAR] Para manejo de errores global

## Patrones y Prácticas

### Comunicación con API
1. **Servicios centralizados**: Funciones async en `services/`
2. **Manejo de errores**: Try-catch con mensajes de error descriptivos
3. **Formateo de datos**: Formatear antes de enviar (ej: fechas a YYYY-MM-DD)
4. **Loading states**: [POR IMPLEMENTAR] Añadir indicadores de carga

### Componentes
1. **Separación de responsabilidades**: Componentes pequeños y enfocados
2. **Reutilización**: Componentes reutilizables cuando sea posible
3. **Props**: Tipar props con TypeScript cuando sea posible
4. **Composición**: Preferir composición sobre herencia

### Formularios
1. **Estado controlado**: Todos los inputs controlados por estado React
2. **Validación**: Validación básica en frontend, completa en backend
3. **Feedback**: Mostrar mensajes de éxito/error al usuario
4. **Formateo**: Formatear datos antes de enviar (fechas, etc.)

### Fechas
- **Formato de entrada**: React DatePicker con formato `yyyy-MM-dd`
- **Formato de envío**: Convertir a string `YYYY-MM-DD` antes de enviar a API
- **Ejemplo**:
```javascript
startDate: education.startDate ? education.startDate.toISOString().slice(0, 10) : ''
```

## Mejoras Recomendadas (Para Implementar)

1. **API Client centralizado**: Crear instancia de Axios con configuración base
   ```typescript
   // apiClient.ts
   import axios from 'axios';
   const apiClient = axios.create({
       baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010',
       timeout: 10000,
   });
   ```

2. **Variables de entorno**: Usar `.env` para `REACT_APP_API_URL`
   ```env
   REACT_APP_API_URL=http://localhost:3010
   ```

3. **Error Boundaries**: Implementar para manejo de errores global
4. **Loading states**: Añadir indicadores de carga (spinners)
5. **Validación de formularios**: React Hook Form + Yup/Zod
6. **Routing**: Configurar React Router con rutas definidas
7. **TypeScript**: Migrar componentes JS a TS gradualmente
8. **Tests**: Implementar tests con React Testing Library
9. **Estado global**: Evaluar Context API si es necesario
10. **Optimización**: Code splitting, lazy loading de rutas
11. **Accesibilidad**: Mejorar ARIA labels y navegación por teclado

## Comandos Útiles

```bash
# Desarrollo
cd frontend
npm start              # Inicia servidor de desarrollo (puerto 3000)

# Build
npm run build          # Crea build de producción

# Testing
npm test              # Ejecuta tests (configurado pero sin tests implementados)

# Linting y Type Checking
npm run build          # Verifica tipos TypeScript y linting
```

## Configuración del Entorno

### Variables de Entorno (Recomendadas)
Crear `.env` en `frontend/`:
```env
REACT_APP_API_URL=http://localhost:3010
```

### CORS
El backend está configurado para permitir CORS desde `http://localhost:3000`.

### Requisitos
- **Node.js**: Versión 16 o superior
- **npm**: Versión 8 o superior
- **Backend corriendo**: El frontend requiere el backend en `http://localhost:3010`

## Flujos de Usuario Principales

### Flujo de Creación de Candidato
1. Usuario completa formulario en `AddCandidateForm`
2. Usuario sube CV mediante `FileUploader`
3. `FileUploader` llama a `POST /upload` y obtiene `{ filePath, fileType }`
4. Usuario completa educación y experiencia laboral (opcional)
5. Al enviar, `AddCandidateForm` formatea fechas a YYYY-MM-DD
6. Se envía `POST /candidates` con todos los datos
7. Se muestra mensaje de éxito o error

### Flujo de Consulta de Candidatos por Posición
1. Usuario navega a vista de posiciones
2. Selecciona una posición
3. Se llama a `GET /position/:id/candidates`
4. Se muestra lista de candidatos con etapa actual y puntuación

## Referencias a Documentación

Para información más detallada, consultar:
- `../docs/ai-specs/ESTANDARES_FRONTEND.md` - Estándares completos de frontend
- `../docs/ai-specs/API_SPEC.md` - Especificación completa de API
- `../docs/ai-specs/TESTING.md` - Estrategia y Metodología de Testing
- `../docs/ai-specs/ARQUITECTURA.md` - Arquitectura del sistema
- `../docs/ai-specs/MODELO_DATOS.md` - Modelo de datos completo
- `../docs/ai-specs/OVERVIEW.md` - Resumen general del proyecto

## Notas Importantes para Agentes

1. **Backend debe estar corriendo**: El frontend requiere el backend en `http://localhost:3010`
2. **Formato de fechas**: Siempre enviar fechas como `YYYY-MM-DD` (string) a la API
3. **Validación**: El backend valida todos los datos, pero el frontend debe hacer validación básica
4. **Manejo de errores**: Siempre mostrar mensajes de error al usuario mediante Alert de React Bootstrap
5. **Estado mixto**: Algunos componentes son JS, otros TS - mantener consistencia al crear nuevos
6. **React Bootstrap**: Usar componentes de React Bootstrap en lugar de HTML nativo cuando sea posible
7. **Responsive**: Usar sistema de grid de Bootstrap (Row/Col) para layouts responsivos
8. **Código existente**: Revisar componentes existentes antes de crear nuevos para mantener consistencia
9. **Servicios**: Usar servicios de `services/` en lugar de llamadas directas a API cuando sea posible
10. **TypeScript**: Preferir TypeScript para nuevos componentes

## Ejemplos de Código

### Crear un nuevo componente funcional con TypeScript
```typescript
import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

interface MyComponentProps {
    title: string;
    onSubmit: (data: any) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onSubmit }) => {
    const [data, setData] = useState<string>('');
    
    useEffect(() => {
        // Efectos secundarios
    }, []);
    
    const handleSubmit = () => {
        onSubmit(data);
    };
    
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MyComponent;
```

### Llamada a API desde componente
```typescript
import { useState, useEffect } from 'react';
import { sendCandidateData } from '../services/candidateService';

const MyComponent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleSubmit = async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const result = await sendCandidateData(data);
            console.log('Success:', result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        // JSX
    );
};
```

### Manejo de fechas
```typescript
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const [startDate, setStartDate] = useState<Date | null>(null);

// En el formulario
<DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    dateFormat="yyyy-MM-dd"
    placeholderText="Fecha de inicio"
/>

// Antes de enviar a API
const formattedDate = startDate ? startDate.toISOString().slice(0, 10) : '';
```

