# Documentación técnica para extracción
_Exported on 12/14/2025 at 21:12:21 GMT+1 from Cursor (2.2.20)_

---

**User**

@.cursor/prompts/extraer-doc-tecnica.md 

---

**Cursor**


Analizando el codebase para generar la documentación técnica. Explorando la estructura del proyecto.



Leyendo archivos clave para entender la estructura del proyecto:



Explorando el código fuente para entender la arquitectura y los patrones:



Revisando más archivos para completar el análisis:



Revisando algunos archivos de test y modelos adicionales:



Creando la estructura de directorios y generando la documentación técnica. Empezando por los documentos principales:



Generando los documentos de documentación técnica, empezando por el OVERVIEW:


```markdown
# Resumen del Proyecto - LTI Talent Tracking System

## Descripción General

**LTI - Talent Tracking System** es una aplicación full-stack diseñada para gestionar procesos de selección de personal. El sistema permite administrar candidatos, posiciones laborales, flujos de entrevistas y aplicaciones, facilitando el seguimiento completo del ciclo de reclutamiento.

## Stack Tecnológico

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **ORM**: Prisma
- **Base de Datos**: PostgreSQL
- **Testing**: Jest + ts-jest
- **Linting**: ESLint + Prettier

### Frontend
- **Framework**: React 18.3.1
- **Lenguaje**: TypeScript / JavaScript
- **Build Tool**: Create React App (react-scripts)
- **UI Library**: React Bootstrap 2.10.2
- **Routing**: React Router DOM 6.23.1
- **HTTP Client**: Axios (implícito en servicios)
- **Testing**: Jest + React Testing Library

### Infraestructura
- **Contenedores**: Docker Compose
- **Base de Datos**: PostgreSQL (contenedor Docker)
- **Gestión de Archivos**: Multer (subida de CVs)

## Arquitectura del Proyecto

El proyecto sigue una **arquitectura en capas** inspirada en **Domain-Driven Design (DDD)**:

```
backend/
├── src/
│   ├── domain/          # Modelos de dominio (entidades)
│   ├── application/     # Lógica de aplicación (servicios, validadores)
│   ├── presentation/    # Controladores y capa de presentación
│   └── routes/          # Definición de rutas API
├── prisma/              # Schema y migraciones de base de datos
└── tests/               # Tests unitarios e integración

frontend/
├── src/
│   ├── components/      # Componentes React
│   ├── services/        # Servicios de comunicación con API
│   └── assets/          # Recursos estáticos
└── public/              # Archivos públicos
```

## Principales Funcionalidades

1. **Gestión de Candidatos**
   - Creación y consulta de candidatos
   - Gestión de educación y experiencia laboral
   - Subida y almacenamiento de CVs (PDF, DOCX)
   - Actualización de etapas de entrevista

2. **Gestión de Posiciones**
   - Creación y consulta de posiciones laborales
   - Asociación de flujos de entrevistas
   - Consulta de candidatos por posición

3. **Gestión de Entrevistas**
   - Flujos de entrevistas configurables
   - Pasos de entrevista ordenados
   - Seguimiento de aplicaciones y entrevistas

## Estado del Proyecto

- **Versión**: 0.0.0.001
- **Estado**: En desarrollo activo
- **Base de Datos**: PostgreSQL con Prisma ORM
- **API**: RESTful con especificación OpenAPI 3.0.0

## Puntos Clave de la Arquitectura

### Patrones Aplicados
- **Domain-Driven Design (DDD)**: Separación en capas de dominio, aplicación y presentación
- **Service Layer**: Servicios de aplicación que orquestan la lógica de negocio
- **Repository Pattern**: Implementado implícitamente mediante Prisma Client
- **DTO/Validator Pattern**: Validación centralizada en la capa de aplicación

### Principios SOLID
- **SRP**: Separación de responsabilidades por capas
- **DIP**: Dependencia de abstracciones (Prisma como abstracción de BD)
- **OCP**: Extensibilidad mediante servicios y controladores

### Áreas de Mejora Identificadas
- Separación más clara entre modelos de dominio y acceso a datos (repositorios explícitos)
- Implementación de interfaces para servicios
- Factory pattern para creación de entidades complejas
- Mejora en el manejo de errores y logging estructurado

## Próximos Pasos

Para comenzar con el proyecto, consulta:
- [Guía de Desarrollo](./GUIA_DESARROLLO.md) - Setup local y flujo de trabajo
- [Arquitectura](./ARQUITECTURA.md) - Detalles arquitectónicos y diagramas
- [Modelo de Datos](./MODELO_DATOS.md) - Esquema de base de datos y relaciones

```


Generando los documentos principales:


```markdown
# Guía de Desarrollo del Proyecto

## Setup Local

### Prerrequisitos

- **Node.js**: Versión 16 o superior
- **npm**: Versión 8 o superior (o yarn/pnpm equivalentes)
- **Docker**: Versión 20 o superior (para base de datos PostgreSQL)
- **TypeScript**: Instalado globalmente o vía npm (versión 4.9.5+)
- **Git**: Para control de versiones

### Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd AI4Devs-frontend-2509-sr
```

2. **Instalar dependencias del backend**
```bash
cd backend
npm install
```

3. **Instalar dependencias del frontend**
```bash
cd ../frontend
npm install
```

4. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto o en `backend/` con:
```env
DATABASE_URL="postgresql://LTIdbUser:D1ymf8wyQEGthFR1E9xhCq@localhost:5432/LTIdb"
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=mydatabase
DB_PORT=5432
```

5. **Iniciar base de datos con Docker**
```bash
# Desde la raíz del proyecto
docker-compose up -d
```

6. **Configurar Prisma**
```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

7. **Poblar base de datos (opcional)**
```bash
cd backend
ts-node prisma/seed.ts
```

8. **Compilar backend**
```bash
cd backend
npm run build
```

## Gestión de Dependencias

### Backend

- **Gestor de paquetes**: npm
- **Scripts disponibles**:
  - `npm start`: Ejecuta el servidor en producción (requiere build previo)
  - `npm run dev`: Ejecuta en modo desarrollo con hot-reload (ts-node-dev)
  - `npm run build`: Compila TypeScript a JavaScript
  - `npm test`: Ejecuta tests con Jest
  - `npm run prisma:generate`: Genera Prisma Client
  - `npm run prisma:init`: Inicializa Prisma

### Frontend

- **Gestor de paquetes**: npm
- **Scripts disponibles**:
  - `npm start`: Inicia servidor de desarrollo (puerto 3000)
  - `npm run build`: Crea build de producción
  - `npm test`: Ejecuta tests
  - `npm run eject`: Expone configuración de Create React App (irreversible)

## Convenciones de Ramas y Flujo de Trabajo Git

### Modelo de Branching

El proyecto utiliza un modelo de branching simplificado:

- **`main`** o **`master`**: Rama principal de producción
- **`develop`**: Rama de desarrollo (si existe)
- **`feature/*`**: Nuevas funcionalidades
- **`fix/*`**: Corrección de bugs
- **`hotfix/*`**: Correcciones urgentes para producción

### Flujo de Trabajo

1. **Crear rama desde develop/main**
```bash
git checkout -b feature/nombre-funcionalidad
```

2. **Desarrollar y commitear cambios**
```bash
git add .
git commit -m "feat: descripción del cambio"
```

3. **Push y crear Pull Request**
```bash
git push origin feature/nombre-funcionalidad
```

### Convenciones de Commits

Seguir el formato **Conventional Commits**:

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (sin afectar código)
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

Ejemplos:
```
feat: añadir endpoint para actualizar etapa de candidato
fix: corregir validación de email en formulario
docs: actualizar documentación de API
refactor: separar lógica de validación en módulo independiente
```

## Flujo de Contribución

### Proceso de Pull Request

1. **Antes de crear PR**
   - [ ] Código compila sin errores
   - [ ] Tests pasan (`npm test`)
   - [ ] No hay errores de linting
   - [ ] Código sigue los estándares del proyecto
   - [ ] Documentación actualizada si es necesario

2. **Crear Pull Request**
   - Título descriptivo siguiendo convenciones de commits
   - Descripción clara de los cambios
   - Referenciar issues relacionados (si aplica)
   - Incluir screenshots/capturas si hay cambios visuales

3. **Code Review**
   - Al menos una aprobación requerida
   - Resolver comentarios antes de merge
   - Mantener PR actualizado con la rama base

### Checklist de Contribución

- [ ] Código sigue los estándares de estilo (ESLint/Prettier)
- [ ] Tests unitarios añadidos/modificados según corresponda
- [ ] Documentación actualizada
- [ ] Sin console.logs de debug
- [ ] Variables de entorno documentadas si son nuevas
- [ ] Sin dependencias innecesarias añadidas

## Desarrollo Local

### Ejecutar Backend

```bash
cd backend
npm run dev
# Servidor disponible en http://localhost:3010
```

### Ejecutar Frontend

```bash
cd frontend
npm start
# Aplicación disponible en http://localhost:3000
```

### Ejecutar Tests

**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
npm test
```

## Herramientas CLI

### Prisma CLI

```bash
# Generar Prisma Client
npx prisma generate

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Abrir Prisma Studio (GUI para BD)
npx prisma studio

# Resetear base de datos (CUIDADO: borra datos)
npx prisma migrate reset
```

### TypeScript

```bash
# Verificar tipos sin compilar
npx tsc --noEmit

# Compilar proyecto
npm run build
```

## Troubleshooting

### Problemas Comunes

1. **Error de conexión a base de datos**
   - Verificar que Docker esté corriendo: `docker ps`
   - Verificar variables de entorno en `.env`
   - Verificar que el puerto 5432 no esté ocupado

2. **Errores de Prisma**
   - Ejecutar `npx prisma generate` después de cambios en schema
   - Verificar que las migraciones estén aplicadas: `npx prisma migrate status`

3. **Errores de compilación TypeScript**
   - Limpiar cache: `rm -rf node_modules dist && npm install`
   - Verificar versión de TypeScript: `npx tsc --version`

4. **Problemas con dependencias**
   - Eliminar `node_modules` y `package-lock.json`
   - Ejecutar `npm install` nuevamente

## Entornos

### Desarrollo
- Backend: `http://localhost:3010`
- Frontend: `http://localhost:3000`
- Base de datos: `localhost:5432`

### Producción
- [POR COMPLETAR] Configuración de producción
- Variables de entorno específicas de producción
- Build optimizado del frontend

## Recursos Adicionales

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de Express](https://expressjs.com/)
- [Documentación de React](https://react.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

```

```markdown
# Modelo de Datos

## Descripción General

El modelo de datos del sistema LTI está diseñado para gestionar el ciclo completo de reclutamiento: desde la captación de candidatos hasta el seguimiento de entrevistas y aplicaciones. El modelo sigue un diseño relacional normalizado utilizando PostgreSQL como base de datos.

## Arquitectura de Datos

El sistema utiliza **Prisma ORM** como capa de abstracción sobre PostgreSQL, proporcionando type-safety y facilitando las migraciones. El modelo está definido en `backend/prisma/schema.prisma`.

## Entidades Principales

### Candidate (Candidato)

Entidad central que representa a un candidato en el sistema.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `firstName` (String, VarChar(100)): Nombre
- `lastName` (String, VarChar(100)): Apellido
- `email` (String, VarChar(255), unique): Correo electrónico único
- `phone` (String?, VarChar(15)): Teléfono (opcional)
- `address` (String?, VarChar(100)): Dirección (opcional)

**Relaciones:**
- `educations`: Uno a muchos con `Education`
- `workExperiences`: Uno a muchos con `WorkExperience`
- `resumes`: Uno a muchos con `Resume`
- `applications`: Uno a muchos con `Application`

**Responsabilidades:**
- Almacenar información personal del candidato
- Actuar como agregado raíz para educación, experiencia y CVs
- Mantener integridad referencial con aplicaciones

### Education (Educación)

Representa el historial educativo de un candidato.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `institution` (String, VarChar(100)): Institución educativa
- `title` (String, VarChar(250)): Título obtenido
- `startDate` (DateTime): Fecha de inicio
- `endDate` (DateTime?): Fecha de finalización (opcional)
- `candidateId` (Int, FK): Referencia a Candidate

**Relaciones:**
- `candidate`: Muchos a uno con `Candidate`

### WorkExperience (Experiencia Laboral)

Representa el historial laboral de un candidato.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `company` (String, VarChar(100)): Empresa
- `position` (String, VarChar(100)): Cargo ocupado
- `description` (String?, VarChar(200)): Descripción (opcional)
- `startDate` (DateTime): Fecha de inicio
- `endDate` (DateTime?): Fecha de finalización (opcional)
- `candidateId` (Int, FK): Referencia a Candidate

**Relaciones:**
- `candidate`: Muchos a uno con `Candidate`

### Resume (Currículum)

Almacena información sobre los archivos de CV subidos.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `filePath` (String, VarChar(500)): Ruta del archivo
- `fileType` (String, VarChar(50)): Tipo MIME del archivo
- `uploadDate` (DateTime): Fecha de subida
- `candidateId` (Int, FK): Referencia a Candidate

**Relaciones:**
- `candidate`: Muchos a uno con `Candidate`

### Company (Empresa)

Representa las empresas que publican posiciones.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `name` (String, unique): Nombre de la empresa (único)

**Relaciones:**
- `employees`: Uno a muchos con `Employee`
- `positions`: Uno a muchos con `Position`

### Employee (Empleado)

Representa empleados de empresas que pueden realizar entrevistas.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `companyId` (Int, FK): Referencia a Company
- `name` (String): Nombre del empleado
- `email` (String, unique): Correo electrónico único
- `role` (String): Rol del empleado
- `isActive` (Boolean, default: true): Estado activo/inactivo

**Relaciones:**
- `company`: Muchos a uno con `Company`
- `interviews`: Uno a muchos con `Interview`

### Position (Posición)

Representa una posición laboral abierta.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `companyId` (Int, FK): Referencia a Company
- `interviewFlowId` (Int, FK): Referencia a InterviewFlow
- `title` (String): Título de la posición
- `description` (String): Descripción breve
- `status` (String, default: "Draft"): Estado (Draft, Published, Closed)
- `isVisible` (Boolean, default: false): Visibilidad pública
- `location` (String): Ubicación
- `jobDescription` (String): Descripción detallada del trabajo
- `requirements` (String?): Requisitos
- `responsibilities` (String?): Responsabilidades
- `salaryMin` (Float?): Salario mínimo
- `salaryMax` (Float?): Salario máximo
- `employmentType` (String?): Tipo de empleo
- `benefits` (String?): Beneficios
- `companyDescription` (String?): Descripción de la empresa
- `applicationDeadline` (DateTime?): Fecha límite de aplicación
- `contactInfo` (String?): Información de contacto

**Relaciones:**
- `company`: Muchos a uno con `Company`
- `interviewFlow`: Muchos a uno con `InterviewFlow`
- `applications`: Uno a muchos con `Application`

### InterviewType (Tipo de Entrevista)

Define tipos de entrevistas disponibles (técnica, cultural, etc.).

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `name` (String): Nombre del tipo
- `description` (String?): Descripción

**Relaciones:**
- `interviewSteps`: Uno a muchos con `InterviewStep`

### InterviewFlow (Flujo de Entrevista)

Define un flujo completo de entrevistas para una posición.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `description` (String?): Descripción del flujo

**Relaciones:**
- `interviewSteps`: Uno a muchos con `InterviewStep`
- `positions`: Uno a muchos con `Position`

### InterviewStep (Paso de Entrevista)

Representa un paso específico dentro de un flujo de entrevistas.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `interviewFlowId` (Int, FK): Referencia a InterviewFlow
- `interviewTypeId` (Int, FK): Referencia a InterviewType
- `name` (String): Nombre del paso
- `orderIndex` (Int): Orden dentro del flujo

**Relaciones:**
- `interviewFlow`: Muchos a uno con `InterviewFlow`
- `interviewType`: Muchos a uno con `InterviewType`
- `applications`: Uno a muchos con `Application` (paso actual)
- `interviews`: Uno a muchos con `Interview`

### Application (Aplicación)

Representa la aplicación de un candidato a una posición.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `positionId` (Int, FK): Referencia a Position
- `candidateId` (Int, FK): Referencia a Candidate
- `applicationDate` (DateTime): Fecha de aplicación
- `currentInterviewStep` (Int, FK): Referencia a InterviewStep (paso actual)
- `notes` (String?): Notas adicionales

**Relaciones:**
- `position`: Muchos a uno con `Position`
- `candidate`: Muchos a uno con `Candidate`
- `interviewStep`: Muchos a uno con `InterviewStep` (paso actual)
- `interviews`: Uno a muchos con `Interview`

### Interview (Entrevista)

Representa una entrevista realizada.

**Atributos:**
- `id` (Int, PK, autoincrement): Identificador único
- `applicationId` (Int, FK): Referencia a Application
- `interviewStepId` (Int, FK): Referencia a InterviewStep
- `employeeId` (Int, FK): Referencia a Employee (entrevistador)
- `interviewDate` (DateTime): Fecha de la entrevista
- `result` (String?): Resultado (Aprobado, Rechazado, Pendiente)
- `score` (Int?): Puntuación numérica
- `notes` (String?): Notas de la entrevista

**Relaciones:**
- `application`: Muchos a uno con `Application`
- `interviewStep`: Muchos a uno con `InterviewStep`
- `employee`: Muchos a uno con `Employee`

## Diagrama de Entidades y Relaciones (ER)

```mermaid
erDiagram
    Candidate {
        int id PK
        string firstName
        string lastName
        string email UK
        string phone
        string address
    }
    
    Education {
        int id PK
        string institution
        string title
        datetime startDate
        datetime endDate
        int candidateId FK
    }
    
    WorkExperience {
        int id PK
        string company
        string position
        string description
        datetime startDate
        datetime endDate
        int candidateId FK
    }
    
    Resume {
        int id PK
        string filePath
        string fileType
        datetime uploadDate
        int candidateId FK
    }
    
    Company {
        int id PK
        string name UK
    }
    
    Employee {
        int id PK
        int companyId FK
        string name
        string email UK
        string role
        boolean isActive
    }
    
    InterviewType {
        int id PK
        string name
        string description
    }
    
    InterviewFlow {
        int id PK
        string description
    }
    
    InterviewStep {
        int id PK
        int interviewFlowId FK
        int interviewTypeId FK
        string name
        int orderIndex
    }
    
    Position {
        int id PK
        int companyId FK
        int interviewFlowId FK
        string title
        string description
        string status
        boolean isVisible
        string location
        string jobDescription
        string requirements
        string responsibilities
        float salaryMin
        float salaryMax
        string employmentType
        string benefits
        string companyDescription
        datetime applicationDeadline
        string contactInfo
    }
    
    Application {
        int id PK
        int positionId FK
        int candidateId FK
        datetime applicationDate
        int currentInterviewStep FK
        string notes
    }
    
    Interview {
        int id PK
        int applicationId FK
        int interviewStepId FK
        int employeeId FK
        datetime interviewDate
        string result
        int score
        string notes
    }
    
    Candidate ||--o{ Education : "tiene"
    Candidate ||--o{ WorkExperience : "tiene"
    Candidate ||--o{ Resume : "tiene"
    Candidate ||--o{ Application : "aplica"
    Company ||--o{ Employee : "emplea"
    Company ||--o{ Position : "publica"
    InterviewType ||--o{ InterviewStep : "define"
    InterviewFlow ||--o{ InterviewStep : "contiene"
    InterviewFlow ||--o{ Position : "usa"
    InterviewStep ||--o{ Application : "paso_actual"
    InterviewStep ||--o{ Interview : "tipo"
    Position ||--o{ Application : "recibe"
    Application ||--o{ Interview : "tiene"
    Employee ||--o{ Interview : "realiza"
```

## Patrones de Acceso a Datos

### Agregados

El modelo sigue el patrón de **Agregados de DDD**:

- **Agregado Candidate**: Raíz del agregado que contiene `Education`, `WorkExperience`, `Resume` y `Application`
  - Las operaciones sobre estos objetos deben pasar por `Candidate`
  - Mantiene consistencia transaccional

### Consultas Típicas

1. **Obtener candidato completo con relaciones**
```typescript
const candidate = await prisma.candidate.findUnique({
  where: { id },
  include: {
    educations: true,
    workExperiences: true,
    resumes: true,
    applications: {
      include: {
        position: { select: { id: true, title: true } },
        interviews: { select: { interviewDate: true, score: true } }
      }
    }
  }
});
```

2. **Obtener candidatos por posición**
```typescript
const applications = await prisma.application.findMany({
  where: { positionId },
  include: {
    candidate: true,
    interviews: true,
    interviewStep: true
  }
});
```

3. **Obtener flujo de entrevistas de una posición**
```typescript
const position = await prisma.position.findUnique({
  where: { id: positionId },
  include: {
    interviewFlow: {
      include: {
        interviewSteps: true
      }
    }
  }
});
```

## Consideraciones de Diseño

### Normalización
- Modelo normalizado hasta 3NF
- Evita redundancia de datos
- Mantiene integridad referencial

### Índices
- Índices únicos en campos `email` (Candidate, Employee)
- Índices únicos en `name` (Company)
- Claves foráneas indexadas automáticamente por Prisma

### Constraints
- Validación a nivel de base de datos mediante Prisma
- Constraints de unicidad en campos críticos
- Validación de tipos mediante TypeScript + Prisma

### Migraciones
- Migraciones versionadas en `backend/prisma/migrations/`
- Historial completo de cambios de esquema
- Soporte para rollback mediante Prisma

## Ejemplos de Uso

### Crear Candidato con Relaciones
```typescript
const candidate = new Candidate({
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan.perez@example.com",
  educations: [
    { institution: "Universidad", title: "Ingeniería", startDate: "2010-01-01" }
  ],
  workExperiences: [
    { company: "Empresa", position: "Desarrollador", startDate: "2015-01-01" }
  ]
});
await candidate.save();
```

### Actualizar Etapa de Entrevista
```typescript
const application = await Application.findOneByPositionCandidateId(applicationId, candidateId);
application.currentInterviewStep = newStepId;
await application.save();
```

## Mejoras Futuras Sugeridas

- [ ] Implementar soft deletes para mantener historial
- [ ] Añadir campos de auditoría (createdAt, updatedAt, createdBy)
- [ ] Considerar desnormalización para consultas frecuentes
- [ ] Implementar versionado de CVs (historial de cambios)
- [ ] Añadir índices compuestos para consultas frecuentes

```


Generando el documento de arquitectura con diagramas C4:


```markdown
# Documento de Arquitectura

## Visión General de la Arquitectura

El sistema LTI sigue una **arquitectura monolítica en capas** inspirada en **Domain-Driven Design (DDD)**. La aplicación se divide en tres capas principales: **presentación**, **aplicación** y **dominio**, con una separación clara de responsabilidades.

### Tipo de Arquitectura

- **Monolito en capas**: Backend y frontend como aplicaciones separadas pero desplegadas juntas
- **Arquitectura orientada a capas**: Separación clara entre presentación, lógica de negocio y acceso a datos
- **Patrón MVC adaptado**: Controladores, Servicios y Modelos

## Componentes Principales y Responsabilidades

### Backend

#### Capa de Presentación (`presentation/`)
- **Controladores**: Manejan requests HTTP, validan entrada, formatean respuestas
  - `candidateController.ts`: Endpoints relacionados con candidatos
  - `positionController.ts`: Endpoints relacionados con posiciones
- **Rutas**: Definen endpoints y asocian controladores
  - `candidateRoutes.ts`: Rutas `/candidates/*`
  - `positionRoutes.ts`: Rutas `/position/*`

#### Capa de Aplicación (`application/`)
- **Servicios**: Orquestan lógica de negocio y coordinan entre modelos
  - `candidateService.ts`: Lógica de negocio para candidatos
  - `positionService.ts`: Lógica de negocio para posiciones
  - `fileUploadService.ts`: Gestión de subida de archivos
- **Validadores**: Validan datos de entrada según reglas de negocio
  - `validator.ts`: Validaciones centralizadas

#### Capa de Dominio (`domain/`)
- **Modelos**: Entidades de dominio con lógica de negocio
  - `Candidate.ts`, `Education.ts`, `WorkExperience.ts`, `Resume.ts`
  - `Position.ts`, `Application.ts`, `Interview.ts`
  - `Company.ts`, `Employee.ts`, `InterviewFlow.ts`, `InterviewStep.ts`, `InterviewType.ts`

#### Infraestructura
- **Prisma ORM**: Abstracción de acceso a datos
- **Express**: Framework web
- **Multer**: Manejo de archivos

### Frontend

#### Componentes (`components/`)
- `AddCandidateForm.js`: Formulario de creación de candidatos
- `FileUploader.js`: Componente de subida de archivos
- `Positions.tsx`: Listado y gestión de posiciones
- `RecruiterDashboard.js`: Dashboard principal

#### Servicios (`services/`)
- `candidateService.js`: Comunicación con API de candidatos
  - `uploadCV()`: Subida de CV
  - `sendCandidateData()`: Envío de datos de candidato

## Flujos Principales

### Flujo de Creación de Candidato

1. **Frontend**: Usuario completa formulario y sube CV
2. **Frontend Service**: `uploadCV()` sube archivo a `/upload`
3. **Backend**: `fileUploadService` guarda archivo y retorna ruta
4. **Frontend Service**: `sendCandidateData()` envía datos a `/candidates`
5. **Backend Controller**: `addCandidateController` recibe request
6. **Backend Service**: `addCandidate` valida y crea entidades
7. **Domain Model**: `Candidate.save()` persiste en BD mediante Prisma
8. **Response**: Retorna candidato creado con ID

### Flujo de Consulta de Candidatos por Posición

1. **Frontend**: Solicita candidatos de una posición
2. **Backend Controller**: `getCandidatesByPosition` recibe request
3. **Backend Service**: `getCandidatesByPositionService` consulta BD
4. **Prisma**: Query con joins a `Application`, `Candidate`, `Interview`
5. **Backend Service**: Calcula promedio de scores
6. **Response**: Retorna lista formateada

### Flujo de Actualización de Etapa de Entrevista

1. **Frontend**: Usuario actualiza etapa de candidato
2. **Backend Controller**: `updateCandidateStageController` recibe request
3. **Backend Service**: `updateCandidateStage` busca aplicación
4. **Domain Model**: `Application.save()` actualiza `currentInterviewStep`
5. **Response**: Retorna aplicación actualizada

## Diagramas C4

### C4 Nivel 1: Diagrama de Contexto

```mermaid
graph TB
    User[Usuario<br/>Reclutador] --> WebApp[Aplicación Web<br/>React Frontend]
    User --> API[API REST<br/>Express Backend]
    
    WebApp --> API
    API --> Database[(Base de Datos<br/>PostgreSQL)]
    API --> FileSystem[Almacenamiento<br/>Archivos CV]
    
    subgraph "Sistema LTI"
        WebApp
        API
        Database
        FileSystem
    end
```

**Descripción**: El sistema interactúa con usuarios reclutadores a través de una aplicación web React. El backend Express expone una API REST que se comunica con PostgreSQL para datos y sistema de archivos para CVs.

### C4 Nivel 2: Diagrama de Contenedores

```mermaid
graph TB
    Browser[Navegador Web] --> Frontend[Frontend React<br/>Puerto 3000]
    Browser --> API[Backend Express<br/>Puerto 3010]
    
    Frontend --> API
    
    API --> Prisma[Prisma ORM]
    Prisma --> PostgreSQL[(PostgreSQL<br/>Puerto 5432)]
    
    API --> Multer[Multer<br/>File Upload]
    Multer --> FileSystem[Sistema de Archivos<br/>uploads/]
    
    subgraph "Contenedor Docker"
        PostgreSQL
    end
    
    subgraph "Aplicación Backend"
        API
        Prisma
        Multer
    end
    
    subgraph "Aplicación Frontend"
        Frontend
    end
```

**Descripción**: 
- **Frontend React**: Aplicación SPA servida en desarrollo por react-scripts
- **Backend Express**: API REST con TypeScript
- **PostgreSQL**: Base de datos relacional en contenedor Docker
- **Sistema de Archivos**: Almacenamiento de CVs subidos

### C4 Nivel 3: Diagrama de Componentes (Backend)

```mermaid
graph TB
    HTTP[HTTP Request] --> Routes[Routes Layer]
    
    Routes --> CandidateRoutes[candidateRoutes]
    Routes --> PositionRoutes[positionRoutes]
    Routes --> UploadRoute[Upload Route]
    
    CandidateRoutes --> CandidateController[candidateController]
    PositionRoutes --> PositionController[positionController]
    UploadRoute --> FileUploadService[fileUploadService]
    
    CandidateController --> CandidateService[candidateService]
    PositionController --> PositionService[positionService]
    
    CandidateService --> Validator[validator]
    CandidateService --> CandidateModel[Candidate Model]
    CandidateService --> EducationModel[Education Model]
    CandidateService --> WorkExpModel[WorkExperience Model]
    CandidateService --> ResumeModel[Resume Model]
    
    PositionService --> PositionModel[Position Model]
    PositionService --> ApplicationModel[Application Model]
    
    CandidateModel --> PrismaClient[Prisma Client]
    EducationModel --> PrismaClient
    WorkExpModel --> PrismaClient
    ResumeModel --> PrismaClient
    PositionModel --> PrismaClient
    ApplicationModel --> PrismaClient
    
    PrismaClient --> Database[(PostgreSQL)]
    FileUploadService --> FileSystem[File System]
    
    subgraph "Capa de Presentación"
        Routes
        CandidateRoutes
        PositionRoutes
        UploadRoute
        CandidateController
        PositionController
    end
    
    subgraph "Capa de Aplicación"
        CandidateService
        PositionService
        FileUploadService
        Validator
    end
    
    subgraph "Capa de Dominio"
        CandidateModel
        EducationModel
        WorkExpModel
        ResumeModel
        PositionModel
        ApplicationModel
    end
    
    subgraph "Infraestructura"
        PrismaClient
        Database
        FileSystem
    end
```

**Descripción**: 
- **Capa de Presentación**: Rutas y controladores manejan HTTP
- **Capa de Aplicación**: Servicios orquestan lógica, validadores validan entrada
- **Capa de Dominio**: Modelos encapsulan lógica de negocio y acceso a datos
- **Infraestructura**: Prisma Client abstrae acceso a BD

## Decisiones de Diseño

### Patrones Aplicados

1. **Domain-Driven Design (DDD)**
   - Separación en capas de dominio, aplicación y presentación
   - Modelos de dominio con lógica de negocio
   - Agregados (Candidate como raíz de agregado)

2. **Service Layer Pattern**
   - Servicios de aplicación coordinan operaciones complejas
   - Separación entre lógica de negocio y presentación

3. **Repository Pattern (Implícito)**
   - Prisma Client actúa como repositorio
   - Modelos de dominio encapsulan acceso a datos

4. **DTO/Validator Pattern**
   - Validación centralizada en `validator.ts`
   - Separación de validación de lógica de negocio

### Trade-offs Detectados

1. **Modelos de Dominio con Acceso a Datos**
   - **Actual**: Modelos contienen métodos `save()` que usan Prisma directamente
   - **Trade-off**: Facilita uso pero acopla dominio a infraestructura
   - **Mejora sugerida**: Separar en repositorios explícitos

2. **Validación en Capa de Aplicación**
   - **Actual**: Validación en servicios antes de crear modelos
   - **Trade-off**: Validación separada de modelos puede llevar a inconsistencias
   - **Mejora sugerida**: Validación también en constructores de modelos

3. **Falta de Interfaces**
   - **Actual**: Sin interfaces TypeScript para servicios
   - **Trade-off**: Menor testabilidad y acoplamiento
   - **Mejora sugerida**: Definir interfaces para servicios

### Dependencias Clave

- **Prisma**: ORM que genera tipos TypeScript desde schema
- **Express**: Framework web minimalista
- **TypeScript**: Type safety y mejor DX
- **React**: Framework frontend declarativo
- **Docker**: Contenedorización de PostgreSQL

## Flujo de Datos

### Request Flow

```
HTTP Request
  ↓
Express Middleware (CORS, JSON parser, Prisma injection)
  ↓
Route Handler
  ↓
Controller (validación básica, manejo de errores)
  ↓
Service (lógica de negocio, validación)
  ↓
Domain Model (creación/actualización)
  ↓
Prisma Client (query a BD)
  ↓
PostgreSQL
```

### Response Flow

```
PostgreSQL
  ↓
Prisma Client (resultado tipado)
  ↓
Domain Model (instancia con lógica)
  ↓
Service (transformación/formateo)
  ↓
Controller (formato HTTP response)
  ↓
Express (serialización JSON)
  ↓
HTTP Response
```

## Escalabilidad y Rendimiento

### Consideraciones Actuales

- **Monolito**: Fácil de desarrollar y desplegar
- **Base de datos única**: Posible cuello de botella en escalado horizontal
- **Sin caché**: Todas las consultas van a BD
- **Archivos locales**: Limitado por almacenamiento del servidor

### Mejoras Sugeridas

- [ ] Implementar caché (Redis) para consultas frecuentes
- [ ] Migrar archivos a almacenamiento en la nube (S3, Azure Blob)
- [ ] Implementar paginación en endpoints de listado
- [ ] Considerar separación de lectura/escritura (CQRS)
- [ ] Añadir índices en consultas frecuentes

## Seguridad Arquitectónica

- **CORS**: Configurado para permitir solo `http://localhost:3000`
- **Validación**: Validación de entrada en múltiples capas
- **Type Safety**: TypeScript previene errores de tipo
- **SQL Injection**: Prisma previene inyección SQL mediante queries parametrizadas

## Observaciones

- La arquitectura actual es adecuada para un MVP y desarrollo inicial
- La separación en capas facilita mantenimiento y testing
- Existen oportunidades de mejora en desacoplamiento (repositorios, interfaces)
- El uso de Prisma simplifica acceso a datos pero acopla a PostgreSQL

```


Generando los documentos de estándares:


```markdown
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

```

```markdown
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

```


Generando los documentos restantes:


```markdown
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

```

```markdown
# Especificaciones de la API

## Información General

- **Base URL**: `http://localhost:3010`
- **Versión**: 1.0.0
- **Formato**: JSON
- **Especificación**: OpenAPI 3.0.0 (definida en `backend/api-spec.yaml`)

## Endpoints

### POST /candidates

Añade un nuevo candidato al sistema.

**Método**: `POST`  
**Ruta**: `/candidates`  
**Descripción**: Crea un nuevo candidato con su información personal, educación, experiencia laboral y CV.

**Request Body:**
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@example.com",
  "phone": "656874937",
  "address": "Calle Ejemplo 123, Madrid",
  "educations": [
    {
      "institution": "Universidad Complutense",
      "title": "Ingeniería Informática",
      "startDate": "2010-09-01",
      "endDate": "2014-06-30"
    }
  ],
  "workExperiences": [
    {
      "company": "Tech Corp",
      "position": "Desarrollador Senior",
      "description": "Desarrollo de aplicaciones web",
      "startDate": "2015-01-15",
      "endDate": "2020-03-31"
    }
  ],
  "cv": {
    "filePath": "uploads/1715760936750-cv.pdf",
    "fileType": "application/pdf"
  }
}
```

**Validaciones:**
- `firstName`: String, 2-100 caracteres, solo letras y espacios
- `lastName`: String, 2-100 caracteres, solo letras y espacios
- `email`: String, formato email válido, único
- `phone`: String opcional, formato español (6, 7, 9 seguido de 8 dígitos)
- `address`: String opcional, máximo 100 caracteres
- `educations`: Array opcional de objetos Education
- `workExperiences`: Array opcional de objetos WorkExperience
- `cv`: Objeto opcional con `filePath` y `fileType`

**Response 201 Created:**
```json
{
  "message": "Candidate added successfully",
  "data": {
    "id": 1,
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@example.com",
    "phone": "656874937",
    "address": "Calle Ejemplo 123, Madrid",
    "educations": [
      {
        "id": 1,
        "institution": "Universidad Complutense",
        "title": "Ingeniería Informática",
        "startDate": "2010-09-01T00:00:00.000Z",
        "endDate": "2014-06-30T00:00:00.000Z",
        "candidateId": 1
      }
    ],
    "workExperiences": [
      {
        "id": 1,
        "company": "Tech Corp",
        "position": "Desarrollador Senior",
        "description": "Desarrollo de aplicaciones web",
        "startDate": "2015-01-15T00:00:00.000Z",
        "endDate": "2020-03-31T00:00:00.000Z",
        "candidateId": 1
      }
    ],
    "resumes": [
      {
        "id": 1,
        "filePath": "uploads/1715760936750-cv.pdf",
        "fileType": "application/pdf",
        "uploadDate": "2024-05-15T10:30:00.000Z",
        "candidateId": 1
      }
    ]
  }
}
```

**Response 400 Bad Request:**
```json
{
  "message": "Error adding candidate",
  "error": "Invalid email"
}
```

**Errores posibles:**
- `400`: Datos inválidos (validación fallida)
- `400`: Email ya existe en la base de datos
- `500`: Error interno del servidor

---

### GET /candidates/:id

Obtiene un candidato por su ID.

**Método**: `GET`  
**Ruta**: `/candidates/:id`  
**Descripción**: Retorna la información completa de un candidato incluyendo educación, experiencia, CVs y aplicaciones.

**Parámetros de URL:**
- `id` (Integer, requerido): ID del candidato

**Response 200 OK:**
```json
{
  "id": 1,
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@example.com",
  "phone": "656874937",
  "address": "Calle Ejemplo 123, Madrid",
  "educations": [
    {
      "id": 1,
      "institution": "Universidad Complutense",
      "title": "Ingeniería Informática",
      "startDate": "2010-09-01T00:00:00.000Z",
      "endDate": "2014-06-30T00:00:00.000Z",
      "candidateId": 1
    }
  ],
  "workExperiences": [
    {
      "id": 1,
      "company": "Tech Corp",
      "position": "Desarrollador Senior",
      "startDate": "2015-01-15T00:00:00.000Z",
      "endDate": "2020-03-31T00:00:00.000Z",
      "candidateId": 1
    }
  ],
  "resumes": [
    {
      "id": 1,
      "filePath": "uploads/1715760936750-cv.pdf",
      "fileType": "application/pdf",
      "uploadDate": "2024-05-15T10:30:00.000Z",
      "candidateId": 1
    }
  ],
  "applications": [
    {
      "id": 1,
      "positionId": 1,
      "candidateId": 1,
      "applicationDate": "2024-05-20T09:00:00.000Z",
      "currentInterviewStep": 1,
      "notes": null,
      "position": {
        "id": 1,
        "title": "Desarrollador Full Stack"
      },
      "interviews": [
        {
          "interviewDate": "2024-05-25T10:00:00.000Z",
          "interviewStep": {
            "name": "Entrevista Técnica"
          },
          "score": 8,
          "notes": "Excelente conocimiento técnico"
        }
      ]
    }
  ]
}
```

**Response 400 Bad Request:**
```json
{
  "error": "Invalid ID format"
}
```

**Response 404 Not Found:**
```json
{
  "error": "Candidate not found"
}
```

**Response 500 Internal Server Error:**
```json
{
  "error": "Internal Server Error"
}
```

---

### PUT /candidates/:id

Actualiza la etapa de entrevista de un candidato.

**Método**: `PUT`  
**Ruta**: `/candidates/:id`  
**Descripción**: Actualiza el paso actual de entrevista de una aplicación específica de un candidato.

**Parámetros de URL:**
- `id` (Integer, requerido): ID del candidato

**Request Body:**
```json
{
  "applicationId": 1,
  "currentInterviewStep": 2
}
```

**Validaciones:**
- `applicationId`: Integer, requerido
- `currentInterviewStep`: Integer, requerido, debe existir en InterviewStep

**Response 200 OK:**
```json
{
  "message": "Candidate stage updated successfully",
  "data": {
    "id": 1,
    "positionId": 1,
    "candidateId": 1,
    "applicationDate": "2024-05-20T09:00:00.000Z",
    "currentInterviewStep": 2,
    "notes": null,
    "interviews": [
      {
        "interviewDate": "2024-05-25T10:00:00.000Z",
        "interviewStep": "Entrevista Técnica",
        "score": 8
      }
    ]
  }
}
```

**Response 400 Bad Request:**
```json
{
  "message": "Error updating candidate stage",
  "error": "Invalid position ID format"
}
```

**Response 404 Not Found:**
```json
{
  "message": "Application not found",
  "error": "Error: Application not found"
}
```

---

### POST /upload

Sube un archivo (CV) al servidor.

**Método**: `POST`  
**Ruta**: `/upload`  
**Descripción**: Sube un archivo PDF o DOCX al servidor y retorna la ruta y tipo del archivo.

**Content-Type**: `multipart/form-data`

**Request Body:**
- `file` (File, requerido): Archivo a subir (PDF o DOCX, máximo 10MB)

**Validaciones:**
- Tipo de archivo: Solo `application/pdf` o `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- Tamaño máximo: 10MB

**Response 200 OK:**
```json
{
  "filePath": "uploads/1715760936750-cv.pdf",
  "fileType": "application/pdf"
}
```

**Response 400 Bad Request:**
```json
{
  "error": "Invalid file type, only PDF and DOCX are allowed!"
}
```

**Response 500 Internal Server Error:**
```json
{
  "error": "Error during the file upload process"
}
```

---

### GET /position/:id/candidates

Obtiene todos los candidatos de una posición específica.

**Método**: `GET`  
**Ruta**: `/position/:id/candidates`  
**Descripción**: Retorna una lista de candidatos que han aplicado a una posición, incluyendo su etapa actual de entrevista y puntuación promedio.

**Parámetros de URL:**
- `id` (Integer, requerido): ID de la posición

**Response 200 OK:**
```json
[
  {
    "fullName": "Juan Pérez",
    "currentInterviewStep": "Entrevista Técnica",
    "averageScore": 8.5,
    "id": 1,
    "applicationId": 1
  },
  {
    "fullName": "María García",
    "currentInterviewStep": "Entrevista Cultural",
    "averageScore": 7.0,
    "id": 2,
    "applicationId": 2
  }
]
```

**Response 500 Internal Server Error:**
```json
{
  "message": "Error retrieving candidates",
  "error": "Error retrieving candidates by position"
}
```

---

### GET /position/:id/interviewflow

Obtiene el flujo de entrevistas de una posición.

**Método**: `GET`  
**Ruta**: `/position/:id/interviewflow`  
**Descripción**: Retorna el flujo de entrevistas configurado para una posición, incluyendo todos los pasos ordenados.

**Parámetros de URL:**
- `id` (Integer, requerido): ID de la posición

**Response 200 OK:**
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
        "interviewFlowId": 1,
        "interviewTypeId": 2,
        "name": "Entrevista Técnica",
        "orderIndex": 2
      },
      {
        "id": 3,
        "interviewFlowId": 1,
        "interviewTypeId": 3,
        "name": "Entrevista Cultural",
        "orderIndex": 3
      }
    ]
  }
}
```

**Response 404 Not Found:**
```json
{
  "message": "Position not found",
  "error": "Position not found"
}
```

## Manejo de Errores

### Códigos HTTP

- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **400 Bad Request**: Datos inválidos o error de validación
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error interno del servidor

### Formato de Errores

Todos los errores siguen un formato consistente:

```json
{
  "message": "Descripción del error",
  "error": "Detalle técnico del error"
}
```

O formato simplificado:

```json
{
  "error": "Mensaje de error"
}
```

## Cabeceras HTTP

### Request Headers

- `Content-Type: application/json` (para JSON)
- `Content-Type: multipart/form-data` (para uploads)

### Response Headers

- `Content-Type: application/json`
- `Access-Control-Allow-Origin: http://localhost:3000` (CORS)

## Versionado de API

**Estado actual**: Sin versionado explícito en URLs.

**Recomendación**: Implementar versionado cuando haya cambios breaking:
- `/api/v1/candidates`
- `/api/v2/candidates`

## Políticas de Compatibilidad

[POR COMPLETAR] No hay política formal de compatibilidad definida.

**Recomendación**:
- Mantener compatibilidad hacia atrás durante al menos 6 meses
- Usar versionado para cambios breaking
- Documentar deprecaciones con suficiente antelación

## Ejemplo de Flujo Completo

### Sequence Diagram: Crear Candidato con CV

```mermaid
sequenceDiagram
    participant Client as Cliente Frontend
    participant UploadAPI as POST /upload
    participant FileSystem as Sistema de Archivos
    participant CandidateAPI as POST /candidates
    participant Service as CandidateService
    participant Validator as Validator
    participant Model as Candidate Model
    participant DB as PostgreSQL

    Client->>UploadAPI: POST /upload (multipart/form-data)
    UploadAPI->>FileSystem: Guardar archivo
    FileSystem-->>UploadAPI: Ruta del archivo
    UploadAPI-->>Client: { filePath, fileType }
    
    Client->>CandidateAPI: POST /candidates (JSON)
    CandidateAPI->>Service: addCandidate(data)
    Service->>Validator: validateCandidateData(data)
    Validator-->>Service: Validación OK
    Service->>Model: new Candidate(data)
    Model->>DB: prisma.candidate.create()
    DB-->>Model: Candidato creado
    Model->>DB: prisma.education.create()
    Model->>DB: prisma.workExperience.create()
    Model->>DB: prisma.resume.create()
    Model-->>Service: Candidato completo
    Service-->>CandidateAPI: Candidato
    CandidateAPI-->>Client: 201 Created + datos
```

## Notas Adicionales

- Todos los endpoints requieren CORS desde `http://localhost:3000`
- Las fechas se manejan en formato ISO 8601
- Los IDs son enteros autoincrementales
- El email de candidatos debe ser único en el sistema
- Los archivos se almacenan en `../uploads/` relativo al backend

```


Generando los documentos restantes:


```markdown
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

```

```markdown
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

```


Generando los últimos documentos: seguridad, observabilidad e infraestructura:


```markdown
# Seguridad y Cumplimiento

## Mecanismos de Autenticación y Autorización

### Estado Actual

[POR COMPLETAR] **No se detecta implementación de autenticación o autorización.**

El sistema actualmente:
- No requiere autenticación para acceder a endpoints
- No implementa control de acceso basado en roles
- No valida tokens o sesiones

### Recomendaciones

#### Autenticación

**Opciones recomendadas:**
1. **JWT (JSON Web Tokens)**
   - Tokens stateless
   - Expiración configurable
   - Firma con secreto o clave pública/privada

2. **OAuth2**
   - Para integración con proveedores externos (Google, Microsoft)
   - Flujo de autorización estándar

3. **Sesiones**
   - Cookies HTTP-only
   - Almacenamiento en Redis o base de datos

**Ejemplo de implementación JWT:**
```typescript
import jwt from 'jsonwebtoken';

const generateToken = (user: User) => {
    return jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
    );
};

const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!);
};
```

#### Autorización

**Roles sugeridos:**
- `ADMIN`: Acceso completo
- `RECRUITER`: Gestión de candidatos y posiciones
- `INTERVIEWER`: Solo acceso a entrevistas asignadas
- `VIEWER`: Solo lectura

**Middleware de autorización:**
```typescript
const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user; // Inyectado por middleware de autenticación
        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};

// Uso
router.post('/candidates', authenticate, authorize('RECRUITER', 'ADMIN'), addCandidate);
```

## Gestión de Secretos y Credenciales

### Variables de Entorno

**Archivo `.env`** (no versionado):
```env
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h

# API Keys (si aplica)
EXTERNAL_API_KEY=your-api-key

# Otros secretos
ENCRYPTION_KEY=your-encryption-key
```

**Archivo `.env.example`** (versionado):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=change-me-in-production
JWT_EXPIRES_IN=24h
```

### Buenas Prácticas

- ✅ **No versionar `.env`**: Incluido en `.gitignore`
- ✅ **`.env.example`**: Template versionado
- ⚠️ **Mejora**: Usar vaults para producción (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault)

### Gestión en Producción

[POR COMPLETAR] **Recomendaciones:**
- Usar servicios de gestión de secretos (AWS Secrets Manager, Azure Key Vault)
- Rotación regular de secretos
- Separar secretos por entorno (dev, staging, prod)
- No hardcodear secretos en código

## Prácticas de Hardening

### Validación de Entrada

**Estado actual:**
- ✅ Validación en `validator.ts` para candidatos
- ✅ Validación de tipos de archivo (PDF, DOCX)
- ✅ Validación de tamaño de archivo (10MB)

**Mejoras recomendadas:**
- [ ] Validación de todos los endpoints
- [ ] Sanitización de entrada (prevenir XSS)
- [ ] Validación de tipos más estricta
- [ ] Rate limiting en endpoints públicos

### Sanitización

**Ejemplo de sanitización:**
```typescript
import DOMPurify from 'isomorphic-dompurify';

const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input, { 
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: []
    });
};
```

### Protección CSRF

[POR COMPLETAR] **No implementado.**

**Recomendación:**
- Usar tokens CSRF para formularios
- Validar origen de requests
- Usar SameSite cookies

### Protección XSS

**Estado:**
- ⚠️ Frontend: React escapa automáticamente, pero validar entrada
- ⚠️ Backend: Sanitizar datos antes de almacenar

**Recomendaciones:**
- Sanitizar entrada en backend
- Validar y escapar output en frontend
- Usar Content Security Policy (CSP)

### Protección SQL Injection

**Estado:**
- ✅ **Prisma previene SQL injection** mediante queries parametrizadas
- ✅ No se usa SQL raw sin parámetros

**Buenas prácticas mantenidas:**
```typescript
// ✅ Seguro - Prisma parametriza automáticamente
const candidate = await prisma.candidate.findUnique({
    where: { email: userInput }
});

// ❌ Evitar - SQL raw sin validación
// const result = await prisma.$queryRaw(`SELECT * FROM candidate WHERE email = '${userInput}'`);
```

### Headers de Seguridad

**Middleware recomendado:**
```typescript
import helmet from 'helmet';

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));
```

**Headers recomendados:**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`
- `Content-Security-Policy: ...`

## Manejo de Datos Sensibles

### Encriptación en Tránsito

**Estado actual:**
- ⚠️ **HTTP en desarrollo**: Comunicación no encriptada
- [POR COMPLETAR] **HTTPS en producción**: Debe implementarse

**Recomendaciones:**
- Usar HTTPS/TLS en producción
- Certificados SSL válidos
- Redirigir HTTP a HTTPS
- HSTS (HTTP Strict Transport Security)

### Encriptación en Reposo

**Estado actual:**
- ⚠️ **Datos en BD**: No encriptados (PostgreSQL sin encriptación de columnas)
- ⚠️ **Archivos**: CVs almacenados sin encriptación

**Recomendaciones:**
- [ ] Encriptar datos sensibles en BD (emails, teléfonos)
- [ ] Encriptar archivos almacenados
- [ ] Usar encriptación a nivel de disco (si es posible)

### Pseudonimización

[POR COMPLETAR] **No implementado.**

**Recomendación para datos personales:**
- Pseudonimizar datos en logs
- Anonimizar datos en backups
- Considerar para cumplimiento GDPR

### Logs y PII (Personally Identifiable Information)

**Estado actual:**
- ⚠️ **Logs**: Pueden contener PII (emails, nombres en console.log)
- ⚠️ **No hay política de retención de logs**

**Recomendaciones:**
- [ ] No loguear PII en logs de aplicación
- [ ] Pseudonimizar datos en logs
- [ ] Política de retención de logs (ej: 30 días)
- [ ] Logs estructurados sin datos sensibles

**Ejemplo:**
```typescript
// ❌ Evitar
logger.info('Candidate created', { email: candidate.email, phone: candidate.phone });

// ✅ Mejor
logger.info('Candidate created', { candidateId: candidate.id });
```

## Cumplimiento Normativo

### GDPR (General Data Protection Regulation)

**Consideraciones:**
- [POR COMPLETAR] **Derecho al olvido**: Implementar eliminación de datos
- [POR COMPLETAR] **Portabilidad de datos**: Exportar datos del usuario
- [POR COMPLETAR] **Consentimiento**: Gestionar consentimiento para procesamiento de datos
- [POR COMPLETAR] **Notificación de brechas**: Proceso para notificar brechas de seguridad

**Recomendaciones:**
- Implementar endpoints para eliminar datos personales
- Implementar exportación de datos en formato estándar
- Documentar qué datos se procesan y por qué
- Política de privacidad clara

### Retención de Datos

[POR COMPLETAR] **No hay política definida.**

**Recomendaciones:**
- Definir períodos de retención por tipo de dato
- Implementar eliminación automática de datos antiguos
- Backup y restauración con consideraciones de retención

**Ejemplo:**
```typescript
// Job para eliminar datos antiguos
const deleteOldCandidates = async () => {
    const cutoffDate = new Date();
    cutoffDate.setFullYear(cutoffDate.getFullYear() - 2); // 2 años
    
    await prisma.candidate.deleteMany({
        where: {
            createdAt: {
                lt: cutoffDate
            },
            // Solo si no tienen aplicaciones activas
            applications: {
                none: {
                    currentInterviewStep: {
                        not: null
                    }
                }
            }
        }
    });
};
```

## Flujo de Autenticación (Recomendado)

```mermaid
sequenceDiagram
    participant User as Usuario
    participant Frontend as Frontend
    participant AuthAPI as POST /auth/login
    participant JWT as JWT Service
    participant DB as PostgreSQL

    User->>Frontend: Credenciales (email, password)
    Frontend->>AuthAPI: POST /auth/login
    AuthAPI->>DB: Verificar credenciales
    DB-->>AuthAPI: Usuario válido
    AuthAPI->>JWT: Generar token
    JWT-->>AuthAPI: Token JWT
    AuthAPI-->>Frontend: { token, user }
    Frontend->>Frontend: Almacenar token (localStorage/sessionStorage)
    
    Note over Frontend,AuthAPI: Requests subsecuentes
    Frontend->>Frontend: Añadir header Authorization: Bearer <token>
    Frontend->>AuthAPI: Request con token
    AuthAPI->>JWT: Verificar token
    JWT-->>AuthAPI: Token válido
    AuthAPI->>DB: Procesar request
    DB-->>AuthAPI: Datos
    AuthAPI-->>Frontend: Response
```

## Checklist de Seguridad

### Implementación Inmediata

- [ ] Implementar autenticación (JWT recomendado)
- [ ] Implementar autorización basada en roles
- [ ] Configurar HTTPS en producción
- [ ] Añadir headers de seguridad (Helmet)
- [ ] Validar y sanitizar toda la entrada
- [ ] No loguear PII en logs

### Mejoras a Mediano Plazo

- [ ] Implementar rate limiting
- [ ] Encriptar datos sensibles en BD
- [ ] Implementar CSRF protection
- [ ] Política de retención de datos
- [ ] Cumplimiento GDPR
- [ ] Auditoría de seguridad

### Mejoras a Largo Plazo

- [ ] Penetration testing
- [ ] Security monitoring
- [ ] Incident response plan
- [ ] Security training para desarrolladores

## Recursos Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [GDPR Compliance Guide](https://gdpr.eu/)

```

```markdown
# Observabilidad, Logging y Monitorización

## Estrategia de Logging

### Estado Actual

**Implementación básica:**
- Uso de `console.log` para logging básico
- Logging de requests HTTP con timestamp
- Formato: `${new Date().toISOString()} - ${req.method} ${req.path}`

**Ejemplo detectado:**
```typescript
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
```

### Niveles de Log

**Recomendación: Implementar niveles estructurados**

- **DEBUG**: Información detallada para debugging
- **INFO**: Eventos informativos normales
- **WARN**: Advertencias que no impiden funcionamiento
- **ERROR**: Errores que requieren atención
- **FATAL**: Errores críticos que detienen la aplicación

### Formato de Log

**Recomendación: Logging estructurado (JSON)**

**Formato actual (texto plano):**
```
2024-05-15T10:30:00.000Z - POST /candidates
```

**Formato recomendado (JSON estructurado):**
```json
{
  "timestamp": "2024-05-15T10:30:00.000Z",
  "level": "INFO",
  "message": "Request received",
  "method": "POST",
  "path": "/candidates",
  "requestId": "abc123",
  "userId": "user-456",
  "ip": "192.168.1.1"
}
```

### Implementación Recomendada

#### Winston (Logger Estructurado)

```typescript
import winston from 'winston';

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'lti-backend' },
    transports: [
        new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error' 
        }),
        new winston.transports.File({ 
            filename: 'logs/combined.log' 
        }),
    ],
});

// En desarrollo, también a consola
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

export default logger;
```

#### Uso en la Aplicación

```typescript
import logger from './utils/logger';

// Info
logger.info('Candidate created', { candidateId: 123 });

// Error
logger.error('Database error', { 
    error: error.message, 
    stack: error.stack,
    candidateId: 123 
});

// Warning
logger.warn('Email already exists', { email: 'test@example.com' });

// Debug
logger.debug('Query executed', { query: 'SELECT * FROM candidate' });
```

## Correlación de Peticiones

### Request ID

**Implementación recomendada:**

```typescript
import { v4 as uuidv4 } from 'uuid';

// Middleware para generar Request ID
app.use((req: Request, res: Response, next: NextFunction) => {
    req.id = uuidv4();
    res.setHeader('X-Request-ID', req.id);
    next();
});

// Logger con Request ID
const loggerWithRequest = (req: Request) => {
    return {
        info: (message: string, meta?: any) => {
            logger.info(message, { requestId: req.id, ...meta });
        },
        error: (message: string, error: Error, meta?: any) => {
            logger.error(message, { 
                requestId: req.id, 
                error: error.message,
                stack: error.stack,
                ...meta 
            });
        }
    };
};

// Uso en controladores
export const addCandidateController = async (req: Request, res: Response) => {
    const log = loggerWithRequest(req);
    log.info('Creating candidate');
    
    try {
        // ...
    } catch (error) {
        log.error('Error creating candidate', error);
    }
};
```

## Métricas de Aplicación

### Métricas Recomendadas

#### Métricas de Negocio
- Número de candidatos creados por día
- Número de aplicaciones por posición
- Tiempo promedio de proceso de entrevista
- Tasa de conversión por etapa

#### Métricas Técnicas
- Latencia de endpoints (p50, p95, p99)
- Tasa de errores por endpoint
- Throughput (requests por segundo)
- Tiempo de respuesta de base de datos

### Implementación con Prometheus

[POR COMPLETAR] **No implementado.**

**Ejemplo recomendado:**
```typescript
import client from 'prom-client';

// Registrar métricas
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 2, 5]
});

// Middleware para capturar métricas
app.use((req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        httpRequestDuration
            .labels(req.method, req.route?.path || req.path, res.statusCode)
            .observe(duration);
    });
    
    next();
});

// Endpoint para métricas
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});
```

## Integraciones con Herramientas de Monitorización

### APM (Application Performance Monitoring)

**Opciones recomendadas:**
- **New Relic**: APM completo
- **Datadog**: Monitoring y logging
- **Sentry**: Error tracking
- **Elastic APM**: Open source

### Error Tracking

**Sentry (Ejemplo):**
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
});

// Capturar errores
try {
    // código
} catch (error) {
    Sentry.captureException(error);
    throw error;
}
```

### Log Aggregation

**Opciones:**
- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Loki** (Grafana)
- **CloudWatch** (AWS)
- **Azure Monitor** (Azure)

## Alerting

### Alertas Recomendadas

[POR COMPLETAR] **No implementado.**

**Alertas críticas:**
- Tasa de errores > 5%
- Latencia p95 > 2 segundos
- Disponibilidad < 99%
- Errores de base de datos

**Alertas de advertencia:**
- Tasa de errores > 1%
- Latencia p95 > 1 segundo
- Uso de memoria > 80%
- Uso de CPU > 80%

### Implementación con Prometheus + Alertmanager

```yaml
# alerts.yml
groups:
  - name: lti_backend
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        annotations:
          summary: "High error rate detected"
          
      - alert: HighLatency
        expr: histogram_quantile(0.95, http_request_duration_seconds) > 2
        for: 5m
        annotations:
          summary: "High latency detected"
```

## Health Checks

### Endpoint de Health

**Implementación recomendada:**
```typescript
app.get('/health', async (req, res) => {
    const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        checks: {
            database: await checkDatabase(),
            disk: checkDiskSpace(),
            memory: checkMemory()
        }
    };
    
    const isHealthy = Object.values(health.checks).every(check => check.status === 'ok');
    res.status(isHealthy ? 200 : 503).json(health);
});

const checkDatabase = async () => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return { status: 'ok' };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};
```

## Buenas Prácticas Recomendadas

### Logging

1. **No loguear PII**: Evitar emails, teléfonos, direcciones en logs
2. **Logging estructurado**: Usar JSON para facilitar parsing
3. **Niveles apropiados**: Usar niveles correctos (debug, info, warn, error)
4. **Contexto suficiente**: Incluir información relevante (requestId, userId)
5. **Performance**: No bloquear operaciones con logging síncrono

### Métricas

1. **Métricas relevantes**: Medir lo que importa para el negocio
2. **Cardinalidad baja**: Evitar labels con alta cardinalidad
3. **Agregación**: Pre-agregar cuando sea posible
4. **Retención**: Definir períodos de retención apropiados

### Alertas

1. **Alertas accionables**: Solo alertar sobre problemas que requieren acción
2. **Evitar ruido**: Configurar thresholds apropiados
3. **Runbooks**: Documentar cómo resolver alertas
4. **Escalación**: Definir proceso de escalación

## Mejoras Recomendadas

1. **Implementar logger estructurado** (Winston o Pino)
2. **Añadir Request ID** para correlación
3. **Implementar métricas** (Prometheus)
4. **Configurar error tracking** (Sentry)
5. **Health checks** para monitoreo de disponibilidad
6. **Dashboard de métricas** (Grafana)
7. **Alertas configuradas** para problemas críticos
8. **Log aggregation** para análisis centralizado

## Ejemplo de Configuración Completa

```typescript
// logger.ts
import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';

export const createLogger = (requestId?: string) => {
    return winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json()
        ),
        defaultMeta: { 
            service: 'lti-backend',
            requestId: requestId || uuidv4()
        },
        transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/combined.log' }),
            ...(process.env.NODE_ENV !== 'production' 
                ? [new winston.transports.Console({ format: winston.format.simple() })]
                : [])
        ]
    });
};

// middleware.ts
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    req.id = uuidv4();
    req.logger = createLogger(req.id);
    
    res.setHeader('X-Request-ID', req.id);
    
    req.logger.info('Request received', {
        method: req.method,
        path: req.path,
        ip: req.ip
    });
    
    next();
};
```

Esta configuración proporciona observabilidad completa del sistema.

```


Generando el último documento: infraestructura, despliegue y DevOps:


```markdown
# Infraestructura, Despliegue y DevOps

## Descripción de la Infraestructura

### Infraestructura Actual (Desarrollo)

**Arquitectura inferida:**
- **Backend**: Servidor Node.js/Express ejecutándose localmente
- **Frontend**: Servidor de desarrollo de Create React App
- **Base de Datos**: PostgreSQL en contenedor Docker
- **Almacenamiento**: Sistema de archivos local para CVs

### Infraestructura Recomendada (Producción)

**Opciones:**

1. **Monolito en servidor único**
   - Servidor con Node.js
   - PostgreSQL en mismo servidor o separado
   - Nginx como reverse proxy
   - Almacenamiento de archivos en servidor o S3

2. **Contenedores (Docker)**
   - Backend en contenedor
   - Frontend servido como estático (Nginx)
   - PostgreSQL en contenedor o servicio gestionado
   - Volúmenes para archivos o S3

3. **Cloud (AWS/Azure/GCP)**
   - Backend en EC2/App Service/Cloud Run
   - Frontend en S3/Blob Storage + CloudFront/CDN
   - PostgreSQL en RDS/Cloud SQL
   - Archivos en S3/Blob Storage

## Diagrama de Arquitectura de Despliegue

```mermaid
graph TB
    subgraph "Internet"
        Users[Usuarios]
    end
    
    subgraph "CDN / Load Balancer"
        LB[Load Balancer<br/>Nginx/Cloud Load Balancer]
    end
    
    subgraph "Frontend"
        FrontendStatic[Frontend Build<br/>React Static Files]
        NginxFrontend[Nginx<br/>Serving Static Files]
    end
    
    subgraph "Backend Services"
        Backend1[Backend Container 1<br/>Node.js/Express]
        Backend2[Backend Container 2<br/>Node.js/Express]
    end
    
    subgraph "Base de Datos"
        PostgreSQL[(PostgreSQL<br/>Primary)]
        PostgreSQLReplica[(PostgreSQL<br/>Replica)]
    end
    
    subgraph "Almacenamiento"
        FileStorage[S3 / Blob Storage<br/>CVs y Archivos]
    end
    
    subgraph "Monitoring"
        Prometheus[Prometheus<br/>Métricas]
        Grafana[Grafana<br/>Dashboards]
        ELK[ELK Stack<br/>Logs]
    end
    
    Users --> LB
    LB --> FrontendStatic
    LB --> Backend1
    LB --> Backend2
    
    FrontendStatic --> NginxFrontend
    
    Backend1 --> PostgreSQL
    Backend2 --> PostgreSQL
    PostgreSQL --> PostgreSQLReplica
    
    Backend1 --> FileStorage
    Backend2 --> FileStorage
    
    Backend1 --> Prometheus
    Backend2 --> Prometheus
    Prometheus --> Grafana
    Backend1 --> ELK
    Backend2 --> ELK
```

## Diagrama de Entornos

```mermaid
graph LR
    subgraph "Desarrollo"
        DevGit[Git<br/>develop branch]
        DevLocal[Desarrollo Local<br/>localhost:3000/3010]
        DevDB[(PostgreSQL<br/>Docker Local)]
    end
    
    subgraph "Staging"
        StagingGit[Git<br/>staging branch]
        StagingCI[CI/CD Pipeline]
        StagingServer[Staging Server<br/>staging.example.com]
        StagingDB[(PostgreSQL<br/>Staging)]
    end
    
    subgraph "Producción"
        ProdGit[Git<br/>main branch]
        ProdCI[CI/CD Pipeline]
        ProdServer[Production Server<br/>app.example.com]
        ProdDB[(PostgreSQL<br/>Production)]
    end
    
    DevGit --> DevLocal
    DevLocal --> DevDB
    
    StagingGit --> StagingCI
    StagingCI --> StagingServer
    StagingServer --> StagingDB
    
    ProdGit --> ProdCI
    ProdCI --> ProdServer
    ProdServer --> ProdDB
    
    StagingCI -.->|Manual Approval| ProdCI
```

## Diagrama del Pipeline CI/CD

```mermaid
flowchart LR
    Start[Git Push] --> Trigger[Trigger CI/CD]
    
    Trigger --> Lint[Lint Code<br/>ESLint/Prettier]
    Lint -->|Fail| Fail1[Fail Build]
    Lint -->|Pass| TypeCheck[Type Check<br/>TypeScript]
    
    TypeCheck -->|Fail| Fail2[Fail Build]
    TypeCheck -->|Pass| Test[Run Tests<br/>Jest]
    
    Test -->|Fail| Fail3[Fail Build]
    Test -->|Pass| Coverage[Check Coverage<br/>Min 70%]
    
    Coverage -->|Fail| Fail4[Fail Build]
    Coverage -->|Pass| Build[Build Application<br/>npm run build]
    
    Build -->|Fail| Fail5[Fail Build]
    Build -->|Pass| Docker[Build Docker Image]
    
    Docker -->|Fail| Fail6[Fail Build]
    Docker -->|Pass| Security[Security Scan<br/>Snyk/Trivy]
    
    Security -->|Fail| Fail7[Fail Build]
    Security -->|Pass| DeployStaging[Deploy to Staging]
    
    DeployStaging --> E2E[E2E Tests<br/>Playwright/Cypress]
    E2E -->|Fail| Fail8[Fail Build]
    E2E -->|Pass| Approval{Manual<br/>Approval?}
    
    Approval -->|No| End1[End]
    Approval -->|Yes| DeployProd[Deploy to Production]
    
    DeployProd --> Smoke[Smoke Tests]
    Smoke -->|Fail| Rollback[Rollback]
    Smoke -->|Pass| Notify[Notify Team]
    Notify --> End2[End]
    
    Fail1 --> End3[End]
    Fail2 --> End3
    Fail3 --> End3
    Fail4 --> End3
    Fail5 --> End3
    Fail6 --> End3
    Fail7 --> End3
    Fail8 --> End3
    Rollback --> End3
```

## Configuración por Entorno

### Variables de Entorno

**Desarrollo (.env.development):**
```env
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/lti_dev
JWT_SECRET=dev-secret-key
LOG_LEVEL=debug
API_URL=http://localhost:3010
FRONTEND_URL=http://localhost:3000
```

**Staging (.env.staging):**
```env
NODE_ENV=staging
DATABASE_URL=postgresql://user:password@staging-db:5432/lti_staging
JWT_SECRET=staging-secret-key
LOG_LEVEL=info
API_URL=https://api-staging.example.com
FRONTEND_URL=https://staging.example.com
```

**Producción (.env.production):**
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@prod-db:5432/lti_prod
JWT_SECRET=${JWT_SECRET_FROM_VAULT}
LOG_LEVEL=warn
API_URL=https://api.example.com
FRONTEND_URL=https://app.example.com
```

### Feature Flags

[POR COMPLETAR] **No implementado.**

**Recomendación:**
```typescript
import { FeatureFlags } from './config/featureFlags';

if (FeatureFlags.ENABLE_NEW_CANDIDATE_FORM) {
    // Nueva funcionalidad
} else {
    // Funcionalidad antigua
}
```

## Pipelines CI/CD

### GitHub Actions (Ejemplo)

**`.github/workflows/ci.yml`:**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop, staging]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm ci
      - run: cd backend && npm run lint
      - run: cd frontend && npm ci
      - run: cd frontend && npm run build

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm ci
      - run: cd backend && npm test -- --coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/lcov.info

  build:
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm ci && npm run build
      - run: cd frontend && npm ci && npm run build

  deploy-staging:
    needs: [build]
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Staging
        run: |
          # Comandos de despliegue a staging
          
  deploy-production:
    needs: [build]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Production
        run: |
          # Comandos de despliegue a producción
```

### GitLab CI (Alternativa)

**`.gitlab-ci.yml`:**
```yaml
stages:
  - lint
  - test
  - build
  - deploy

lint:
  stage: lint
  script:
    - cd backend && npm ci && npm run lint
    - cd frontend && npm ci && npm run build

test:
  stage: test
  script:
    - cd backend && npm ci && npm test -- --coverage
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'

build:
  stage: build
  script:
    - cd backend && npm ci && npm run build
    - cd frontend && npm ci && npm run build
  artifacts:
    paths:
      - backend/dist
      - frontend/build

deploy-staging:
  stage: deploy
  script:
    - echo "Deploy to staging"
  only:
    - staging

deploy-production:
  stage: deploy
  script:
    - echo "Deploy to production"
  only:
    - main
  when: manual
```

## Requisitos de Rendimiento y Escalabilidad

### Rendimiento Actual

**Limitaciones detectadas:**
- Sin caché: Todas las consultas van a BD
- Sin paginación: Endpoints de listado pueden retornar muchos registros
- Archivos locales: Limitado por almacenamiento del servidor
- Sin CDN: Frontend servido desde mismo servidor

### Objetivos de Rendimiento

- **Latencia p95**: < 500ms para endpoints de lectura
- **Latencia p95**: < 1s para endpoints de escritura
- **Throughput**: > 100 requests/segundo
- **Disponibilidad**: 99.9% uptime

### Estrategias de Escalabilidad

1. **Horizontal Scaling**
   - Múltiples instancias de backend
   - Load balancer para distribución
   - Base de datos con réplicas de lectura

2. **Caché**
   - Redis para caché de consultas frecuentes
   - Caché de respuestas HTTP
   - CDN para assets estáticos

3. **Optimización de Base de Datos**
   - Índices en consultas frecuentes
   - Paginación en listados
   - Connection pooling

4. **Almacenamiento**
   - Migrar archivos a S3/Blob Storage
   - CDN para distribución de archivos

## Docker y Contenedores

### Docker Compose (Desarrollo)

**`docker-compose.yml` (actual):**
```yaml
version: "3.1"

services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - ${DB_PORT}:5432
```

### Dockerfile Backend (Recomendado)

**`backend/Dockerfile`:**
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npx prisma generate

EXPOSE 3010

CMD ["node", "dist/index.js"]
```

### Dockerfile Frontend (Recomendado)

**`frontend/Dockerfile`:**
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## Mejoras Recomendadas

1. **CI/CD**: Implementar pipeline completo
2. **Contenedores**: Dockerizar aplicación completa
3. **Orquestación**: Considerar Kubernetes para producción
4. **Monitoring**: Implementar APM y alertas
5. **Backup**: Estrategia de backup automatizado
6. **Disaster Recovery**: Plan de recuperación ante desastres
7. **Scaling**: Configurar auto-scaling
8. **SSL/TLS**: Certificados y HTTPS
9. **CDN**: Para assets estáticos
10. **Caché**: Redis para mejorar rendimiento

## Recursos Adicionales

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Kubernetes](https://kubernetes.io/docs/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)

```


Creando un índice para facilitar la navegación:


```markdown
# Documentación Técnica - LTI Talent Tracking System

Bienvenido a la documentación técnica completa del proyecto LTI. Esta documentación está diseñada para facilitar el onboarding de nuevos desarrolladores y proporcionar una referencia completa del sistema.

## Índice de Documentos

### 1. [Resumen del Proyecto](./OVERVIEW.md)
Visión general del proyecto, stack tecnológico, arquitectura y estado actual.

### 2. [Guía de Desarrollo](./GUIA_DESARROLLO.md)
Setup local, gestión de dependencias, convenciones de Git, flujo de contribución y troubleshooting.

### 3. [Modelo de Datos](./MODELO_DATOS.md)
Descripción completa de entidades, relaciones, diagrama ER y patrones de acceso a datos.

### 4. [Arquitectura](./ARQUITECTURA.md)
Arquitectura del sistema, componentes principales, flujos, diagramas C4 y decisiones de diseño.

### 5. [Estándares Generales](./ESTANDARES_GENERALES.md)
Principios SOLID, DRY, KISS, YAGNI, linters, normas de estilo y convenciones de commits.

### 6. [Estándares de Backend](./ESTANDARES_BACKEND.md)
Guías específicas para Node.js/Express/TypeScript, estructura, manejo de errores, logging y testing.

### 7. [Estándares de Frontend](./ESTANDARES_FRONTEND.md)
Guías específicas para React/TypeScript, componentes, hooks, routing, llamadas a API y testing.

### 8. [Especificaciones de API](./API_SPEC.md)
Documentación completa de endpoints, request/response, manejo de errores y ejemplos.

### 9. [Estándares de Documentación](./DOCUMENTACION.md)
Estructura de documentación, convenciones de comentarios, herramientas y proceso de mantenimiento.

### 10. [Estrategia de Testing](./TESTING.md)
Tipos de tests, cobertura, herramientas, ejemplos y estrategia por capas.

### 11. [Seguridad y Cumplimiento](./SEGURIDAD.md)
Autenticación, autorización, gestión de secretos, hardening, manejo de datos sensibles y GDPR.

### 12. [Observabilidad](./OBSERVABILIDAD.md)
Logging estructurado, métricas, correlación de peticiones, integraciones y alertas.

### 13. [Infraestructura y DevOps](./INFRAESTRUCTURA.md)
Arquitectura de despliegue, entornos, pipelines CI/CD, Docker y escalabilidad.

## Inicio Rápido

Si eres nuevo en el proyecto, te recomendamos seguir este orden:

1. **Comienza con** [Resumen del Proyecto](./OVERVIEW.md) para entender el contexto general
2. **Sigue con** [Guía de Desarrollo](./GUIA_DESARROLLO.md) para configurar tu entorno
3. **Revisa** [Arquitectura](./ARQUITECTURA.md) para entender la estructura del sistema
4. **Consulta** [Modelo de Datos](./MODELO_DATOS.md) para entender el esquema de base de datos
5. **Lee** los estándares relevantes según tu área de trabajo (Backend o Frontend)

## Convenciones de la Documentación

- **[POR COMPLETAR]**: Secciones que requieren información adicional o implementación
- **[PLACEHOLDER]**: Ejemplos o contenido que debe ser completado con información real
- **Diagramas Mermaid**: Todos los diagramas están en formato Mermaid y pueden visualizarse en GitHub o editores compatibles

## Mantenimiento

Esta documentación debe actualizarse cuando:
- Se añaden nuevas funcionalidades
- Se modifican comportamientos existentes
- Se cambia la estructura de datos
- Se añaden nuevos endpoints
- Se realizan cambios arquitectónicos

## Contribuir a la Documentación

Al contribuir código, asegúrate de:
- Actualizar la documentación relevante
- Mantener ejemplos actualizados
- Añadir diagramas cuando sea necesario
- Seguir las convenciones establecidas en [Estándares de Documentación](./DOCUMENTACION.md)

## Recursos Adicionales

- [README Principal](../../README.md) - Información general del proyecto
- [API Specification](../../backend/api-spec.yaml) - Especificación OpenAPI
- [Modelo de Datos Backend](../../backend/ModeloDatos.md) - Documentación original del modelo
- [Buenas Prácticas](../../backend/ManifestoBuenasPracticas.md) - Guía de buenas prácticas

## Contacto

Para preguntas o sugerencias sobre la documentación, contacta al equipo de desarrollo o crea un issue en el repositorio.

```


Documentación técnica generada. Resumen:

## Documentación generada

Se crearon 14 documentos en `docs/ai-specs/`:

### Documentos principales

1. **README.md** - Índice y guía de navegación
2. **OVERVIEW.md** - Resumen del proyecto y stack tecnológico
3. **GUIA_DESARROLLO.md** - Setup local, Git, contribución
4. **MODELO_DATOS.md** - Entidades, relaciones y diagrama ER
5. **ARQUITECTURA.md** - Diagramas C4 (niveles 1, 2 y 3) y decisiones de diseño
6. **ESTANDARES_GENERALES.md** - SOLID, DRY, linters, convenciones
7. **ESTANDARES_BACKEND.md** - Guías Node.js/Express/TypeScript
8. **ESTANDARES_FRONTEND.md** - Guías React/TypeScript
9. **API_SPEC.md** - Especificaciones de endpoints con ejemplos
10. **DOCUMENTACION.md** - Estándares de documentación y comentarios
11. **TESTING.md** - Estrategia de testing y ejemplos
12. **SEGURIDAD.md** - Autenticación, autorización, hardening, GDPR
13. **OBSERVABILIDAD.md** - Logging, métricas, monitorización
14. **INFRAESTRUCTURA.md** - Diagramas de despliegue, entornos y CI/CD

### Características

- Diagramas Mermaid: ER, C4 (3 niveles), secuencia, flujos de CI/CD
- Análisis de arquitectura: DDD, capas, patrones aplicados
- Componentes y patrones: inventario y descripción
- Principios SOLID: evaluación con ejemplos
- Secciones marcadas: [POR COMPLETAR] donde falta información
- Ejemplos de código: TypeScript/JavaScript relevantes
- En español: toda la documentación

### Diagramas incluidos

- Diagrama ER del modelo de datos
- Diagrama C4 Nivel 1 (Contexto)
- Diagrama C4 Nivel 2 (Contenedores)
- Diagrama C4 Nivel 3 (Componentes Backend)
- Diagrama de arquitectura de despliegue
- Diagrama de entornos (dev/staging/prod)
- Diagrama de pipeline CI/CD
- Diagrama de secuencia (flujo de creación de candidato)

La documentación está lista para facilitar el onboarding y servir como referencia técnica del proyecto.

---

**User**

Create the AGENT.md file in frontend with all the related and important information according the project that need an agent to work with the frontend of the project, take advantage of the information generate in docs/ai-specs folder

---

**Cursor**


Revisando la documentación y la estructura del frontend para crear `AGENT.md` con la información necesaria para trabajar con el frontend.



Revisando algunos componentes para entender mejor la estructura:



Contenido para `frontend/AGENT.md` con la información necesaria para trabajar con el frontend:

```markdown
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

### RecruiterDashboard.js
**Ubicación**: `src/components/RecruiterDashboard.js`  
**Responsabilidad**: Dashboard principal del reclutador  
**Estado**: [Revisar implementación]

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
    
    const response = await axios.post('http://localhost:3010/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data; // { filePath, fileType }
};
```

#### `sendCandidateData(candidateData)`
Envía datos de candidato al servidor.

```javascript
export const sendCandidateData = async (candidateData) => {
    const response = await axios.post('http://localhost:3010/candidates', candidateData);
    return response.data;
};
```

**Nota**: Actualmente `AddCandidateForm.js` usa `fetch` directamente en lugar de este servicio.

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
  "data": { /* candidato creado con id */ }
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
  "educations": [ /* ... */ ],
  "workExperiences": [ /* ... */ ],
  "resumes": [ /* ... */ ],
  "applications": [ /* ... */ ]
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

#### POST /upload
Sube un archivo (CV).

**Content-Type**: `multipart/form-data`  
**Body**: `file` (File object)

**Response 200:**
```json
{
  "filePath": "uploads/1715760936750-cv.pdf",
  "fileType": "application/pdf"
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
    "description": "Flujo estándar",
    "interviewSteps": [
      {
        "id": 1,
        "name": "Screening Inicial",
        "orderIndex": 1
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
  firstName: string;        // 2-100 chars, solo letras
  lastName: string;         // 2-100 chars, solo letras
  email: string;            // formato email, único
  phone?: string;           // formato español opcional
  address?: string;         // max 100 chars opcional
  educations?: Education[];
  workExperiences?: WorkExperience[];
  cv?: { filePath: string; fileType: string };
}
```

### Education (Educación)
```typescript
interface Education {
  id?: number;
  institution: string;      // max 100 chars
  title: string;            // max 100 chars
  startDate: string;        // YYYY-MM-DD
  endDate?: string;         // YYYY-MM-DD opcional
  candidateId?: number;
}
```

### WorkExperience (Experiencia Laboral)
```typescript
interface WorkExperience {
  id?: number;
  company: string;          // max 100 chars
  position: string;         // max 100 chars
  description?: string;     // max 200 chars opcional
  startDate: string;        // YYYY-MM-DD
  endDate?: string;         // YYYY-MM-DD opcional
  candidateId?: number;
}
```

## Convenciones y Estándares

### Nomenclatura
- **Componentes**: PascalCase (`AddCandidateForm`, `RecruiterDashboard`)
- **Archivos de componentes**: PascalCase o camelCase según componente
- **Servicios**: camelCase (`candidateService.js`)
- **Hooks personalizados**: Prefijo `use` (`useCandidate`, `usePosition`)

### Estructura de Componentes
- Preferir componentes funcionales con hooks
- Usar TypeScript cuando sea posible (migrar JS a TS gradualmente)
- Estado local con `useState`
- Efectos secundarios con `useEffect`

### Estilos
- **React Bootstrap**: Componentes UI principales
- **Bootstrap 5.3.3**: Framework CSS base
- **CSS Global**: `App.css`, `index.css`
- **Clases**: Usar clases de Bootstrap, añadir clases personalizadas cuando sea necesario

### Manejo de Estado
- **Estado Local**: `useState` para estado del componente
- **Estado Global**: No implementado (considerar Context API o Redux si crece)
- **Estado del Servidor**: Llamadas directas a API desde componentes o servicios

### Routing
- **React Router DOM 6.23.1**: Disponible pero no configurado explícitamente
- **Recomendación**: Configurar rutas en `App.tsx` o `App.js`

### Validación
- Validación básica en formularios (HTML5 required)
- Validación completa en backend
- **Recomendación**: Implementar React Hook Form + Yup/Zod

## Patrones y Prácticas

### Comunicación con API
1. **Servicios centralizados**: Funciones async en `services/`
2. **Manejo de errores**: Try-catch con mensajes de error
3. **Formateo de datos**: Formatear antes de enviar (ej: fechas a YYYY-MM-DD)

### Componentes
1. **Separación de responsabilidades**: Componentes pequeños y enfocados
2. **Reutilización**: Componentes reutilizables cuando sea posible
3. **Props**: Tipar props con TypeScript cuando sea posible

### Formularios
1. **Estado controlado**: Todos los inputs controlados por estado
2. **Validación**: Validación básica en frontend, completa en backend
3. **Feedback**: Mostrar mensajes de éxito/error al usuario

## Mejoras Recomendadas (Para Implementar)

1. **API Client centralizado**: Crear instancia de Axios con configuración base
2. **Variables de entorno**: Usar `.env` para `REACT_APP_API_URL`
3. **Error Boundaries**: Implementar para manejo de errores global
4. **Loading states**: Añadir indicadores de carga
5. **Validación de formularios**: React Hook Form + Yup
6. **Routing**: Configurar React Router
7. **TypeScript**: Migrar componentes JS a TS
8. **Tests**: Implementar tests con React Testing Library
9. **Estado global**: Evaluar Context API si es necesario
10. **Optimización**: Code splitting, lazy loading

## Comandos Útiles

```bash
# Desarrollo
npm start              # Inicia servidor de desarrollo (puerto 3000)

# Build
npm run build          # Crea build de producción

# Testing
npm test              # Ejecuta tests (configurado pero sin tests)

# Linting
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

## Referencias a Documentación

Para información más detallada, consultar:
- `../docs/ai-specs/ESTANDARES_FRONTEND.md` - Estándares completos de frontend
- `../docs/ai-specs/API_SPEC.md` - Especificación completa de API
- `../docs/ai-specs/ARQUITECTURA.md` - Arquitectura del sistema
- `../docs/ai-specs/MODELO_DATOS.md` - Modelo de datos completo

## Notas Importantes para Agentes

1. **Backend debe estar corriendo**: El frontend requiere el backend en `http://localhost:3010`
2. **Formato de fechas**: Siempre enviar fechas como `YYYY-MM-DD` (string)
3. **Validación**: El backend valida todos los datos, pero el frontend debe hacer validación básica
4. **Manejo de errores**: Siempre mostrar mensajes de error al usuario
5. **Estado mixto**: Algunos componentes son JS, otros TS - mantener consistencia al crear nuevos
6. **React Bootstrap**: Usar componentes de React Bootstrap en lugar de HTML nativo cuando sea posible
7. **Responsive**: Usar sistema de grid de Bootstrap (Row/Col) para layouts responsivos
```

Este archivo proporciona la información necesaria para que un agente trabaje con el frontend. ¿Quieres que lo cree en el directorio `frontend/`?

```markdown
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
}### Herramientas de Desarrollo
- **ESLint**: Configurado con `react-app` y `react-app/jest`
- **TypeScript**: Modo strict habilitado, target ES5
- **Testing**: Jest + React Testing Library (configurado pero sin tests implementados)

## Estructura de Directorios

```

```plaintext

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

### RecruiterDashboard.js
**Ubicación**: `src/components/RecruiterDashboard.js`  
**Responsabilidad**: Dashboard principal del reclutador  
**Estado**: [Revisar implementación]

## Servicios de API

### candidateService.js
**Ubicación**: `src/services/candidateService.js`

**Funciones disponibles:**

#### `uploadCV(file)`
Sube un archivo CV al servidor.
pt
export const uploadCV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post('http://localhost:3010/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data; // { filePath, fileType }
};#### `sendCandidateData(candidateData)`
Envía datos de candidato al servidor.
ript
export const sendCandidateData = async (candidateData) => {
    const response = await axios.post('http://localhost:3010/candidates', candidateData);
    return response.data;
};**Nota**: Actualmente `AddCandidateForm.js` usa `fetch` directamente en lugar de este servicio.

## Endpoints de API Disponibles

### Base URL
`http://localhost:3010`

### Endpoints Relevantes para Frontend

#### POST /candidates
Crea un nuevo candidato.

**Request Body:**
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
}**Response 201:**
{
  "message": "Candidate added successfully",
  "data": { /* candidato creado con id */ }
}**Response 400:**
{
  "message": "Error adding candidate",
  "error": "Invalid email" // u otro error de validación
}#### GET /candidates/:id
Obtiene un candidato por ID.

**Response 200:**
{
  "id": 1,
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "educations": [ /* ... */ ],
  "workExperiences": [ /* ... */ ],
  "resumes": [ /* ... */ ],
  "applications": [ /* ... */ ]
}#### PUT /candidates/:id
Actualiza etapa de entrevista de un candidato.

**Request Body:**
{
  "applicationId": 1,
  "currentInterviewStep": 2
}#### POST /upload
Sube un archivo (CV).

**Content-Type**: `multipart/form-data`  
**Body**: `file` (File object)

**Response 200:**
{
  "filePath": "uploads/1715760936750-cv.pdf",
  "fileType": "application/pdf"
}#### GET /position/:id/candidates
Obtiene candidatos de una posición.

**Response 200:**
[
  {
    "fullName": "Juan Pérez",
    "currentInterviewStep": "Entrevista Técnica",
    "averageScore": 8.5,
    "id": 1,
    "applicationId": 1
  }
]#### GET /position/:id/interviewflow
Obtiene flujo de entrevistas de una posición.

**Response 200:**n
{
  "positionName": "Desarrollador Full Stack",
  "interviewFlow": {
    "id": 1,
    "description": "Flujo estándar",
    "interviewSteps": [
      {
        "id": 1,
        "name": "Screening Inicial",
        "orderIndex": 1
      }
    ]
  }
}## Modelos de Datos Relevantes

### Candidate (Candidato)ypescript
interface Candidate {
  id?: number;
  firstName: string;        // 2-100 chars, solo letras
  lastName: string;         // 2-100 chars, solo letras
  email: string;            // formato email, único
  phone?: string;           // formato español opcional
  address?: string;         // max 100 chars opcional
  educations?: Education[];
  workExperiences?: WorkExperience[];
  cv?: { filePath: string; fileType: string };
}### Education (Educación)ypescript
interface Education {
  id?: number;
  institution: string;      // max 100 chars
  title: string;            // max 100 chars
  startDate: string;        // YYYY-MM-DD
  endDate?: string;         // YYYY-MM-DD opcional
  candidateId?: number;
}### WorkExperience (Experiencia Laboral)ript
interface WorkExperience {
  id?: number;
  company: string;          // max 100 chars
  position: string;         // max 100 chars
  description?: string;     // max 200 chars opcional
  startDate: string;        // YYYY-MM-DD
  endDate?: string;         // YYYY-MM-DD opcional
  candidateId?: number;
}## Convenciones y Estándares

### Nomenclatura
- **Componentes**: PascalCase (`AddCandidateForm`, `RecruiterDashboard`)
- **Archivos de componentes**: PascalCase o camelCase según componente
- **Servicios**: camelCase (`candidateService.js`)
- **Hooks personalizados**: Prefijo `use` (`useCandidate`, `usePosition`)

### Estructura de Componentes
- Preferir componentes funcionales con hooks
- Usar TypeScript cuando sea posible (migrar JS a TS gradualmente)
- Estado local con `useState`
- Efectos secundarios con `useEffect`

### Estilos
- **React Bootstrap**: Componentes UI principales
- **Bootstrap 5.3.3**: Framework CSS base
- **CSS Global**: `App.css`, `index.css`
- **Clases**: Usar clases de Bootstrap, añadir clases personalizadas cuando sea necesario

### Manejo de Estado
- **Estado Local**: `useState` para estado del componente
- **Estado Global**: No implementado (considerar Context API o Redux si crece)
- **Estado del Servidor**: Llamadas directas a API desde componentes o servicios

### Routing
- **React Router DOM 6.23.1**: Disponible pero no configurado explícitamente
- **Recomendación**: Configurar rutas en `App.tsx` o `App.js`

### Validación
- Validación básica en formularios (HTML5 required)
- Validación completa en backend
- **Recomendación**: Implementar React Hook Form + Yup/Zod

## Patrones y Prácticas

### Comunicación con API
1. **Servicios centralizados**: Funciones async en `services/`
2. **Manejo de errores**: Try-catch con mensajes de error
3. **Formateo de datos**: Formatear antes de enviar (ej: fechas a YYYY-MM-DD)

### Componentes
1. **Separación de responsabilidades**: Componentes pequeños y enfocados
2. **Reutilización**: Componentes reutilizables cuando sea posible
3. **Props**: Tipar props con TypeScript cuando sea posible

### Formularios
1. **Estado controlado**: Todos los inputs controlados por estado
2. **Validación**: Validación básica en frontend, completa en backend
3. **Feedback**: Mostrar mensajes de éxito/error al usuario

## Mejoras Recomendadas (Para Implementar)

1. **API Client centralizado**: Crear instancia de Axios con configuración base
2. **Variables de entorno**: Usar `.env` para `REACT_APP_API_URL`
3. **Error Boundaries**: Implementar para manejo de errores global
4. **Loading states**: Añadir indicadores de carga
5. **Validación de formularios**: React Hook Form + Yup
6. **Routing**: Configurar React Router
7. **TypeScript**: Migrar componentes JS a TS
8. **Tests**: Implementar tests con React Testing Library
9. **Estado global**: Evaluar Context API si es necesario
10. **Optimización**: Code splitting, lazy loading

## Comandos Útiles

# Desarrollo
npm start              # Inicia servidor de desarrollo (puerto 3000)

# Build
npm run build          # Crea build de producción

# Testing
npm test              # Ejecuta tests (configurado pero sin tests)

# Linting
npm run build          # Verifica tipos TypeScript y linting## Configuración del Entorno

### Variables de Entorno (Recomendadas)
Crear `.env` en `frontend/`:
REACT_APP_API_URL=http://localhost:3010### CORS
El backend está configurado para permitir CORS desde `http://localhost:3000`.

## Referencias a Documentación

Para información más detallada, consultar:
- `../docs/ai-specs/ESTANDARES_FRONTEND.md` - Estándares completos de frontend
- `../docs/ai-specs/API_SPEC.md` - Especificación completa de API
- `../docs/ai-specs/ARQUITECTURA.md` - Arquitectura del sistema
- `../docs/ai-specs/MODELO_DATOS.md` - Modelo de datos completo

## Notas Importantes para Agentes

1. **Backend debe estar corriendo**: El frontend requiere el backend en `http://localhost:3010`
2. **Formato de fechas**: Siempre enviar fechas como `YYYY-MM-DD` (string)
3. **Validación**: El backend valida todos los datos, pero el frontend debe hacer validación básica
4. **Manejo de errores**: Siempre mostrar mensajes de error al usuario
5. **Estado mixto**: Algunos componentes son JS, otros TS - mantener consistencia al crear nuevos
6. **React Bootstrap**: Usar componentes de React Bootstrap en lugar de HTML nativo cuando sea posible
7. **Responsive**: Usar sistema de grid de Bootstrap (Row/Col) para layouts responsivos
```

```plaintext

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

### RecruiterDashboard.js
**Ubicación**: `src/components/RecruiterDashboard.js`  
**Responsabilidad**: Dashboard principal del reclutador  
**Estado**: [Revisar implementación]

## Servicios de API

### candidateService.js
**Ubicación**: `src/services/candidateService.js`

**Funciones disponibles:**

#### `uploadCV(file)`
Sube un archivo CV al servidor.
pt
export const uploadCV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post('http://localhost:3010/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data; // { filePath, fileType }
};#### `sendCandidateData(candidateData)`
Envía datos de candidato al servidor.
ript
export const sendCandidateData = async (candidateData) => {
    const response = await axios.post('http://localhost:3010/candidates', candidateData);
    return response.data;
};**Nota**: Actualmente `AddCandidateForm.js` usa `fetch` directamente en lugar de este servicio.

## Endpoints de API Disponibles

### Base URL
`http://localhost:3010`

### Endpoints Relevantes para Frontend

#### POST /candidates
Crea un nuevo candidato.

**Request Body:**
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
}**Response 201:**
{
  "message": "Candidate added successfully",
  "data": { /* candidato creado con id */ }
}**Response 400:**
{
  "message": "Error adding candidate",
  "error": "Invalid email" // u otro error de validación
}#### GET /candidates/:id
Obtiene un candidato por ID.

**Response 200:**
{
  "id": 1,
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "educations": [ /* ... */ ],
  "workExperiences": [ /* ... */ ],
  "resumes": [ /* ... */ ],
  "applications": [ /* ... */ ]
}#### PUT /candidates/:id
Actualiza etapa de entrevista de un candidato.

**Request Body:**
{
  "applicationId": 1,
  "currentInterviewStep": 2
}#### POST /upload
Sube un archivo (CV).

**Content-Type**: `multipart/form-data`  
**Body**: `file` (File object)

**Response 200:**
{
  "filePath": "uploads/1715760936750-cv.pdf",
  "fileType": "application/pdf"
}#### GET /position/:id/candidates
Obtiene candidatos de una posición.

**Response 200:**
[
  {
    "fullName": "Juan Pérez",
    "currentInterviewStep": "Entrevista Técnica",
    "averageScore": 8.5,
    "id": 1,
    "applicationId": 1
  }
]#### GET /position/:id/interviewflow
Obtiene flujo de entrevistas de una posición.

**Response 200:**n
{
  "positionName": "Desarrollador Full Stack",
  "interviewFlow": {
    "id": 1,
    "description": "Flujo estándar",
    "interviewSteps": [
      {
        "id": 1,
        "name": "Screening Inicial",
        "orderIndex": 1
      }
    ]
  }
}## Modelos de Datos Relevantes

### Candidate (Candidato)ypescript
interface Candidate {
  id?: number;
  firstName: string;        // 2-100 chars, solo letras
  lastName: string;         // 2-100 chars, solo letras
  email: string;            // formato email, único
  phone?: string;           // formato español opcional
  address?: string;         // max 100 chars opcional
  educations?: Education[];
  workExperiences?: WorkExperience[];
  cv?: { filePath: string; fileType: string };
}### Education (Educación)ypescript
interface Education {
  id?: number;
  institution: string;      // max 100 chars
  title: string;            // max 100 chars
  startDate: string;        // YYYY-MM-DD
  endDate?: string;         // YYYY-MM-DD opcional
  candidateId?: number;
}### WorkExperience (Experiencia Laboral)ript
interface WorkExperience {
  id?: number;
  company: string;          // max 100 chars
  position: string;         // max 100 chars
  description?: string;     // max 200 chars opcional
  startDate: string;        // YYYY-MM-DD
  endDate?: string;         // YYYY-MM-DD opcional
  candidateId?: number;
}## Convenciones y Estándares

### Nomenclatura
- **Componentes**: PascalCase (`AddCandidateForm`, `RecruiterDashboard`)
- **Archivos de componentes**: PascalCase o camelCase según componente
- **Servicios**: camelCase (`candidateService.js`)
- **Hooks personalizados**: Prefijo `use` (`useCandidate`, `usePosition`)

### Estructura de Componentes
- Preferir componentes funcionales con hooks
- Usar TypeScript cuando sea posible (migrar JS a TS gradualmente)
- Estado local con `useState`
- Efectos secundarios con `useEffect`

### Estilos
- **React Bootstrap**: Componentes UI principales
- **Bootstrap 5.3.3**: Framework CSS base
- **CSS Global**: `App.css`, `index.css`
- **Clases**: Usar clases de Bootstrap, añadir clases personalizadas cuando sea necesario

### Manejo de Estado
- **Estado Local**: `useState` para estado del componente
- **Estado Global**: No implementado (considerar Context API o Redux si crece)
- **Estado del Servidor**: Llamadas directas a API desde componentes o servicios

### Routing
- **React Router DOM 6.23.1**: Disponible pero no configurado explícitamente
- **Recomendación**: Configurar rutas en `App.tsx` o `App.js`

### Validación
- Validación básica en formularios (HTML5 required)
- Validación completa en backend
- **Recomendación**: Implementar React Hook Form + Yup/Zod

## Patrones y Prácticas

### Comunicación con API
1. **Servicios centralizados**: Funciones async en `services/`
2. **Manejo de errores**: Try-catch con mensajes de error
3. **Formateo de datos**: Formatear antes de enviar (ej: fechas a YYYY-MM-DD)

### Componentes
1. **Separación de responsabilidades**: Componentes pequeños y enfocados
2. **Reutilización**: Componentes reutilizables cuando sea posible
3. **Props**: Tipar props con TypeScript cuando sea posible

### Formularios
1. **Estado controlado**: Todos los inputs controlados por estado
2. **Validación**: Validación básica en frontend, completa en backend
3. **Feedback**: Mostrar mensajes de éxito/error al usuario

## Mejoras Recomendadas (Para Implementar)

1. **API Client centralizado**: Crear instancia de Axios con configuración base
2. **Variables de entorno**: Usar `.env` para `REACT_APP_API_URL`
3. **Error Boundaries**: Implementar para manejo de errores global
4. **Loading states**: Añadir indicadores de carga
5. **Validación de formularios**: React Hook Form + Yup
6. **Routing**: Configurar React Router
7. **TypeScript**: Migrar componentes JS a TS
8. **Tests**: Implementar tests con React Testing Library
9. **Estado global**: Evaluar Context API si es necesario
10. **Optimización**: Code splitting, lazy loading

## Comandos Útiles

# Desarrollo
npm start              # Inicia servidor de desarrollo (puerto 3000)

# Build
npm run build          # Crea build de producción

# Testing
npm test              # Ejecuta tests (configurado pero sin tests)

# Linting
npm run build          # Verifica tipos TypeScript y linting## Configuración del Entorno

### Variables de Entorno (Recomendadas)
Crear `.env` en `frontend/`:
REACT_APP_API_URL=http://localhost:3010### CORS
El backend está configurado para permitir CORS desde `http://localhost:3000`.

## Referencias a Documentación

Para información más detallada, consultar:
- `../docs/ai-specs/ESTANDARES_FRONTEND.md` - Estándares completos de frontend
- `../docs/ai-specs/API_SPEC.md` - Especificación completa de API
- `../docs/ai-specs/ARQUITECTURA.md` - Arquitectura del sistema
- `../docs/ai-specs/MODELO_DATOS.md` - Modelo de datos completo

## Notas Importantes para Agentes

1. **Backend debe estar corriendo**: El frontend requiere el backend en `http://localhost:3010`
2. **Formato de fechas**: Siempre enviar fechas como `YYYY-MM-DD` (string)
3. **Validación**: El backend valida todos los datos, pero el frontend debe hacer validación básica
4. **Manejo de errores**: Siempre mostrar mensajes de error al usuario
5. **Estado mixto**: Algunos componentes son JS, otros TS - mantener consistencia al crear nuevos
6. **React Bootstrap**: Usar componentes de React Bootstrap en lugar de HTML nativo cuando sea posible
7. **Responsive**: Usar sistema de grid de Bootstrap (Row/Col) para layouts responsivos
```

```javascript
export const uploadCV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post('http://localhost:3010/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data; // { filePath, fileType }
};
```

```javascript
export const sendCandidateData = async (candidateData) => {
    const response = await axios.post('http://localhost:3010/candidates', candidateData);
    return response.data;
};
```

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

```json
{
  "message": "Candidate added successfully",
  "data": { /* candidato creado con id */ }
}
```

```json
{
  "message": "Error adding candidate",
  "error": "Invalid email" // u otro error de validación
}
```

```json
{
  "id": 1,
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "educations": [ /* ... */ ],
  "workExperiences": [ /* ... */ ],
  "resumes": [ /* ... */ ],
  "applications": [ /* ... */ ]
}
```

```json
{
  "applicationId": 1,
  "currentInterviewStep": 2
}
```

```json
{
  "filePath": "uploads/1715760936750-cv.pdf",
  "fileType": "application/pdf"
}
```

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

```json
{
  "positionName": "Desarrollador Full Stack",
  "interviewFlow": {
    "id": 1,
    "description": "Flujo estándar",
    "interviewSteps": [
      {
        "id": 1,
        "name": "Screening Inicial",
        "orderIndex": 1
      }
    ]
  }
}
```

```typescript
interface Candidate {
  id?: number;
  firstName: string;        // 2-100 chars, solo letras
  lastName: string;         // 2-100 chars, solo letras
  email: string;            // formato email, único
  phone?: string;           // formato español opcional
  address?: string;         // max 100 chars opcional
  educations?: Education[];
  workExperiences?: WorkExperience[];
  cv?: { filePath: string; fileType: string };
}
```

```typescript
interface Education {
  id?: number;
  institution: string;      // max 100 chars
  title: string;            // max 100 chars
  startDate: string;        // YYYY-MM-DD
  endDate?: string;         // YYYY-MM-DD opcional
  candidateId?: number;
}
```

```typescript
interface WorkExperience {
  id?: number;
  company: string;          // max 100 chars
  position: string;         // max 100 chars
  description?: string;     // max 200 chars opcional
  startDate: string;        // YYYY-MM-DD
  endDate?: string;         // YYYY-MM-DD opcional
  candidateId?: number;
}
```

```shellscript
# Desarrollo
npm start              # Inicia servidor de desarrollo (puerto 3000)

# Build
npm run build          # Crea build de producción

# Testing
npm test              # Ejecuta tests (configurado pero sin tests)

# Linting
npm run build          # Verifica tipos TypeScript y linting
```

```plaintext
REACT_APP_API_URL=http://localhost:3010
```

```plaintext

Este archivo proporciona la información necesaria para que un agente trabaje con el frontend. ¿Quieres que lo cree en el directorio `frontend/`?
```

---

**User**

almacena la información en frontend/AGENT.md

---

**Cursor**


Escribiendo el contenido completo en `frontend/AGENT.md`.


```markdown
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

```


He creado el archivo `frontend/AGENT.md` con la información necesaria para trabajar con el frontend del proyecto.

El documento incluye:

- **Contexto del proyecto**: Descripción y stack tecnológico
- **Estructura de directorios**: Organización del código
- **Componentes existentes**: Detalles de cada componente (AddCandidateForm, FileUploader, Positions, RecruiterDashboard)
- **Servicios de API**: Funciones disponibles en `candidateService.js`
- **Endpoints de API**: Especificación de endpoints con ejemplos de request/response
- **Modelos de datos**: Interfaces TypeScript de las entidades principales
- **Convenciones y estándares**: Nomenclatura, estructura, estilos, manejo de estado, routing
- **Patrones y prácticas**: Comunicación con API, componentes, formularios
- **Mejoras recomendadas**: Lista de mejoras pendientes
- **Comandos útiles**: Scripts npm disponibles
- **Configuración**: Variables de entorno y requisitos
- **Flujos de usuario**: Flujos principales del sistema
- **Ejemplos de código**: Ejemplos prácticos para crear componentes, llamadas a API, manejo de fechas
- **Notas importantes**: Puntos críticos para agentes

El archivo está listo y puede servir como referencia para agentes de IA que trabajen con el frontend del proyecto.

---

**User**

Genera las reglas de cursor necesarias para el cumplimiento de los estándares de frontend, cumplimiento de la arquitectura, estrategias de testing, documentación y resto de aspectos definidos en ai-specs. almacena las reglas en la carpeta .cursor/rules. utiliza la filosofía DRY

---

**Cursor**


Revisando la documentación de `ai-specs` para extraer los estándares y generar reglas de Cursor. Leyendo los documentos clave:



Creando reglas de Cursor organizadas por área, siguiendo DRY. Generando los archivos en `.cursor/rules/`:


```markdown
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

```

```markdown
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

```

```markdown
# Reglas Generales - LTI Project

## Principios SOLID

### Single Responsibility Principle (SRP)
- Cada clase/función debe tener una única responsabilidad
- Separar validación, lógica de negocio y acceso a datos
- Controladores solo manejan HTTP, servicios solo lógica de negocio

### Open/Closed Principle (OCP)
- Abierto para extensión, cerrado para modificación
- Usar composición sobre herencia
- Definir interfaces para extensión sin modificación

### Liskov Substitution Principle (LSP)
- Las clases derivadas deben poder sustituir a las clases base
- Preferir composición sobre herencia

### Interface Segregation Principle (ISP)
- Interfaces pequeñas y específicas
- Definir interfaces TypeScript para servicios y contratos

### Dependency Inversion Principle (DIP)
- Depender de abstracciones, no de implementaciones concretas
- Inyectar dependencias mediante constructor cuando sea posible

## DRY (Don't Repeat Yourself)

- Centralizar validación en módulos de validación
- Reutilizar servicios y funciones comunes
- Extraer lógica duplicada a funciones/helpers
- No repetir código de manejo de errores

## KISS (Keep It Simple, Stupid)

- Mantener código simple y directo
- Evitar sobre-ingeniería
- No crear abstracciones prematuras

## YAGNI (You Aren't Gonna Need It)

- Solo implementar funcionalidades necesarias
- No crear código "por si acaso"
- Evitar abstracciones innecesarias

## Nomenclatura

### Archivos
- **Backend TypeScript/JavaScript**: camelCase (`candidateService.ts`)
- **Frontend Componentes**: PascalCase o camelCase según componente
- **Tests**: Co-locados con código (`.test.ts`, `.test.tsx`)

### Código
- **Clases**: PascalCase (`Candidate`, `Education`)
- **Funciones/Métodos**: camelCase (`addCandidate`, `findById`)
- **Variables**: camelCase (`candidateData`, `applicationId`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`, `API_URL`)
- **Interfaces/Types**: PascalCase (`CandidateInput`, `ApiResponse`)

## Estructura de Archivos

### Backend
```
backend/src/
├── domain/models/      # Modelos de dominio
├── application/
│   ├── services/       # Servicios de aplicación
│   └── validator.ts    # Validadores
├── presentation/
│   └── controllers/    # Controladores
└── routes/             # Rutas
```

### Frontend
```
frontend/src/
├── components/         # Componentes React
├── services/           # Servicios de API
└── assets/            # Recursos estáticos
```

## Formato de Código

- **Indentación**: 2 espacios (no tabs)
- **Líneas**: Máximo 100-120 caracteres
- **Punto y coma**: Según configuración de Prettier
- **Comillas**: Según configuración de Prettier (preferir simples)
- Ejecutar Prettier antes de commit

## Convenciones de Commits

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
```

## Criterios de Calidad Pre-Merge

- [ ] Código compila sin errores (`npm run build`)
- [ ] Todos los tests pasan (`npm test`)
- [ ] Sin errores de linting (`npx eslint`)
- [ ] Sin errores de TypeScript
- [ ] Funcionalidad probada manualmente
- [ ] Documentación actualizada si es necesario
- [ ] Sin `console.log` de debug
- [ ] Sin código comentado muerto
- [ ] Commits con mensajes descriptivos

## Antipatrones a Evitar

### God Objects
❌ Clases con demasiadas responsabilidades
✅ Separar en múltiples clases con responsabilidades específicas

### Código Duplicado
❌ Repetir lógica en múltiples lugares
✅ Extraer a funciones/helpers reutilizables

### Magic Numbers/Strings
❌ Valores hardcodeados sin constantes
✅ Definir constantes con nombres descriptivos

### Deep Nesting
❌ Anidación excesiva de condicionales
✅ Usar early returns y optional chaining

### Acceso Directo a Infraestructura
❌ Acceder directamente a BD desde controladores
✅ Usar servicios y capas de abstracción

## Buenas Prácticas

- Validación temprana de entrada
- Manejo explícito de errores con tipos específicos
- Aprovechar TypeScript para type safety
- Tests unitarios para lógica de negocio
- Documentación JSDoc para funciones públicas
- Variables de entorno para configuración
- Logging estructurado (cuando se implemente)

## TypeScript

- Habilitar modo strict
- Evitar `any` cuando sea posible
- Usar interfaces para contratos
- Tipar funciones y parámetros
- Usar tipos de unión cuando sea apropiado

## Variables de Entorno

- No versionar archivos `.env`
- Versionar `.env.example` con valores de ejemplo
- Usar prefijos apropiados (`REACT_APP_` para frontend)
- Documentar variables de entorno necesarias

```

```markdown
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

```

```markdown
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

```

```markdown
# Reglas de Arquitectura - LTI Project

## Arquitectura en Capas (DDD)

El proyecto sigue una arquitectura en capas inspirada en Domain-Driven Design:

### Backend

```
presentation/     → Controladores y rutas (HTTP)
application/      → Servicios y validadores (Lógica de aplicación)
domain/           → Modelos de dominio (Lógica de negocio)
infrastructure/   → Prisma, Express, Multer
```

### Reglas de Capas

- **Presentación NO debe** acceder directamente a dominio o infraestructura
- **Aplicación NO debe** acceder directamente a infraestructura (excepto a través de modelos)
- **Dominio NO debe** depender de capas superiores
- **Flujo**: Request → Controller → Service → Model → Prisma → Database

### Frontend

```
components/       → Componentes React (UI)
services/         → Comunicación con API
assets/           → Recursos estáticos
```

### Reglas de Frontend

- Componentes NO deben hacer llamadas directas a API (usar servicios)
- Servicios centralizan toda comunicación con backend
- Componentes pequeños y enfocados en presentación

## Patrones Aplicados

### Service Layer Pattern
- Servicios orquestan lógica de negocio
- Separación entre lógica de negocio y presentación

### Repository Pattern (Implícito)
- Prisma Client actúa como repositorio
- Modelos encapsulan acceso a datos

### DTO/Validator Pattern
- Validación centralizada en validators
- Separación de validación de lógica de negocio

## Flujos de Datos

### Request Flow (Backend)
```
HTTP Request
  ↓
Express Middleware
  ↓
Route Handler
  ↓
Controller (validación básica)
  ↓
Service (lógica de negocio)
  ↓
Domain Model
  ↓
Prisma Client
  ↓
PostgreSQL
```

### Response Flow (Backend)
```
PostgreSQL
  ↓
Prisma Client
  ↓
Domain Model
  ↓
Service (transformación)
  ↓
Controller (formato HTTP)
  ↓
HTTP Response
```

### Frontend Flow
```
User Action
  ↓
Component Event Handler
  ↓
Service (API call)
  ↓
Backend API
  ↓
Component State Update
  ↓
UI Re-render
```

## Separación de Responsabilidades

### Controladores
- Extraer datos del request
- Llamar al servicio correspondiente
- Manejar errores y formatear respuestas HTTP
- Retornar códigos HTTP apropiados

### Servicios
- Recibir datos validados
- Orquestar lógica de negocio
- Coordinar entre modelos de dominio
- Retornar resultados o lanzar errores

### Modelos
- Encapsular lógica de negocio
- Proporcionar métodos para persistencia
- Validar invariantes del dominio
- Usar Prisma Client para acceso a datos

## Principios Arquitectónicos

### Single Responsibility
- Cada capa tiene una responsabilidad clara
- Cada componente/clase tiene una única razón para cambiar

### Dependency Direction
- Dependencias fluyen hacia abajo (presentación → aplicación → dominio)
- Capas superiores dependen de capas inferiores
- No hay dependencias circulares

### Encapsulación
- Modelos de dominio encapsulan lógica de negocio
- Servicios encapsulan orquestación
- Controladores encapsulan manejo HTTP

## Antipatrones Arquitectónicos a Evitar

- ❌ Saltarse capas (ej: controlador accediendo directamente a Prisma)
- ❌ Lógica de negocio en controladores
- ❌ Acceso a datos en servicios (debe estar en modelos)
- ❌ Dependencias circulares entre módulos
- ❌ Acoplamiento fuerte entre capas

## Mejoras Arquitectónicas Recomendadas

- Separar acceso a datos de modelos de dominio (repositorios explícitos)
- Implementar interfaces para servicios
- Factory pattern para creación de entidades complejas
- Dependency injection para desacoplamiento

```

```markdown
# Reglas de Cursor - LTI Project

Este directorio contiene las reglas de Cursor para mantener estándares de código, arquitectura, testing y documentación en el proyecto LTI.

## Archivos de Reglas

### `frontend-rules.md`
Reglas específicas para el desarrollo frontend:
- Estructura y organización de componentes React
- Nomenclatura y convenciones
- Manejo de estado y comunicación con API
- Estilos y accesibilidad
- Testing de componentes

### `backend-rules.md`
Reglas específicas para el desarrollo backend:
- Arquitectura en capas (DDD)
- Estructura de servicios, controladores y modelos
- Manejo de errores y validación
- Uso de Prisma ORM
- Testing de backend

### `general-rules.md`
Reglas generales aplicables a todo el proyecto:
- Principios SOLID, DRY, KISS, YAGNI
- Nomenclatura y formato de código
- Convenciones de commits (Conventional Commits)
- Criterios de calidad pre-merge
- Antipatrones a evitar

### `testing-rules.md`
Reglas para testing:
- Estrategia de testing (backend y frontend)
- Estructura de tests
- Mocking y mejores prácticas
- Cobertura objetivo

### `documentation-rules.md`
Reglas para documentación:
- JSDoc para funciones públicas
- Comentarios inline
- Documentación de componentes
- Mantenimiento de documentación

### `architecture-rules.md`
Reglas de arquitectura:
- Arquitectura en capas (DDD)
- Patrones aplicados
- Flujos de datos
- Separación de responsabilidades
- Principios arquitectónicos

## Uso

Estas reglas son referenciadas automáticamente por Cursor cuando trabajas en el proyecto. Asegúrate de seguir estas reglas al:

- Crear nuevos componentes o servicios
- Refactorizar código existente
- Escribir tests
- Documentar código
- Realizar code reviews

## Referencias

Para más detalles, consultar:
- `../docs/ai-specs/ESTANDARES_FRONTEND.md` - Estándares completos de frontend
- `../docs/ai-specs/ESTANDARES_BACKEND.md` - Estándares completos de backend
- `../docs/ai-specs/ESTANDARES_GENERALES.md` - Estándares generales
- `../docs/ai-specs/ARQUITECTURA.md` - Arquitectura del sistema
- `../docs/ai-specs/TESTING.md` - Estrategia de testing
- `../docs/ai-specs/DOCUMENTACION.md` - Estándares de documentación

## Filosofía DRY

Estas reglas están organizadas para evitar duplicación:
- Reglas generales en `general-rules.md` (aplicables a todo)
- Reglas específicas separadas por área (frontend, backend)
- Referencias cruzadas cuando sea necesario
- Ejemplos reutilizables en cada archivo

```


Verificando que los archivos se hayan creado correctamente:



Reglas de Cursor creadas en `.cursor/rules/`. Resumen:

## Archivos creados

1. **`frontend-rules.md`** — Reglas de frontend
   - Estructura y organización de componentes React
   - Nomenclatura y convenciones
   - Manejo de estado, API, formularios
   - Estilos, accesibilidad, performance
   - Testing de componentes

2. **`backend-rules.md`** — Reglas de backend
   - Arquitectura en capas (DDD)
   - Estructura de servicios, controladores, modelos
   - Manejo de errores y validación
   - Uso de Prisma ORM
   - Testing de backend

3. **`general-rules.md`** — Reglas generales
   - Principios SOLID, DRY, KISS, YAGNI
   - Nomenclatura y formato
   - Conventional Commits
   - Criterios de calidad pre-merge
   - Antipatrones a evitar

4. **`testing-rules.md`** — Reglas de testing
   - Estrategia backend y frontend
   - Estructura de tests (patrón AAA)
   - Mocking y mejores prácticas
   - Cobertura objetivo

5. **`documentation-rules.md`** — Reglas de documentación
   - JSDoc para funciones públicas
   - Comentarios inline
   - Documentación de componentes
   - Mantenimiento de documentación

6. **`architecture-rules.md`** — Reglas de arquitectura
   - Arquitectura en capas (DDD)
   - Patrones aplicados
   - Flujos de datos
   - Separación de responsabilidades

7. **`README.md`** — Índice y guía de uso

## Características

- DRY: reglas generales centralizadas, específicas por área
- Organización: separación por dominio
- Ejemplos: código de ejemplo en cada regla
- Referencias: enlaces a documentación detallada
- Antipatrones: qué evitar con ejemplos

Las reglas están listas para que Cursor las use automáticamente al trabajar en el proyecto.

---

**User**

Quiero que revises la documentación de cómo generar las reglas de cursor en https://cursor.com/es/docs/context/rules y adaptes las reglas necesarias si es necesario

---

**Cursor**


Revisando la documentación oficial y reorganizando las reglas según el formato de Cursor: cada regla debe ser una carpeta con un `RULE.md` que incluya frontmatter. Reorganizando las reglas:



Reorganizando las reglas al formato de Cursor: cada regla será una carpeta con un `RULE.md` que incluya frontmatter. Reorganizando:



Reorganizando las reglas al formato de Cursor: cada regla será una carpeta con un `RULE.md` que incluya frontmatter. Leyendo los archivos actuales y reorganizándolos:



Reorganizando las reglas al formato de Cursor: cada regla será una carpeta con un `RULE.md` que incluya frontmatter. Creando las carpetas y archivos:



Creando los archivos `RULE.md` en cada carpeta con el formato correcto y frontmatter:


```markdown
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

```

```markdown
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

```

```markdown
---
description: "Principios generales de desarrollo: SOLID, DRY, nomenclatura, formato de código y convenciones de commits"
alwaysApply: true
---

# Reglas Generales - LTI Project

## Principios SOLID

### Single Responsibility Principle (SRP)
- Cada clase/función debe tener una única responsabilidad
- Separar validación, lógica de negocio y acceso a datos
- Controladores solo manejan HTTP, servicios solo lógica de negocio

### Open/Closed Principle (OCP)
- Abierto para extensión, cerrado para modificación
- Usar composición sobre herencia
- Definir interfaces para extensión sin modificación

### Liskov Substitution Principle (LSP)
- Las clases derivadas deben poder sustituir a las clases base
- Preferir composición sobre herencia

### Interface Segregation Principle (ISP)
- Interfaces pequeñas y específicas
- Definir interfaces TypeScript para servicios y contratos

### Dependency Inversion Principle (DIP)
- Depender de abstracciones, no de implementaciones concretas
- Inyectar dependencias mediante constructor cuando sea posible

## DRY (Don't Repeat Yourself)

- Centralizar validación en módulos de validación
- Reutilizar servicios y funciones comunes
- Extraer lógica duplicada a funciones/helpers
- No repetir código de manejo de errores

## KISS (Keep It Simple, Stupid)

- Mantener código simple y directo
- Evitar sobre-ingeniería
- No crear abstracciones prematuras

## YAGNI (You Aren't Gonna Need It)

- Solo implementar funcionalidades necesarias
- No crear código "por si acaso"
- Evitar abstracciones innecesarias

## Nomenclatura

### Archivos
- **Backend TypeScript/JavaScript**: camelCase (`candidateService.ts`)
- **Frontend Componentes**: PascalCase o camelCase según componente
- **Tests**: Co-locados con código (`.test.ts`, `.test.tsx`)

### Código
- **Clases**: PascalCase (`Candidate`, `Education`)
- **Funciones/Métodos**: camelCase (`addCandidate`, `findById`)
- **Variables**: camelCase (`candidateData`, `applicationId`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`, `API_URL`)
- **Interfaces/Types**: PascalCase (`CandidateInput`, `ApiResponse`)

## Estructura de Archivos

### Backend
```
backend/src/
├── domain/models/      # Modelos de dominio
├── application/
│   ├── services/       # Servicios de aplicación
│   └── validator.ts    # Validadores
├── presentation/
│   └── controllers/    # Controladores
└── routes/             # Rutas
```

### Frontend
```
frontend/src/
├── components/         # Componentes React
├── services/           # Servicios de API
└── assets/            # Recursos estáticos
```

## Formato de Código

- **Indentación**: 2 espacios (no tabs)
- **Líneas**: Máximo 100-120 caracteres
- **Punto y coma**: Según configuración de Prettier
- **Comillas**: Según configuración de Prettier (preferir simples)
- Ejecutar Prettier antes de commit

## Convenciones de Commits

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
```

## Criterios de Calidad Pre-Merge

- [ ] Código compila sin errores (`npm run build`)
- [ ] Todos los tests pasan (`npm test`)
- [ ] Sin errores de linting (`npx eslint`)
- [ ] Sin errores de TypeScript
- [ ] Funcionalidad probada manualmente
- [ ] Documentación actualizada si es necesario
- [ ] Sin `console.log` de debug
- [ ] Sin código comentado muerto
- [ ] Commits con mensajes descriptivos

## Antipatrones a Evitar

### God Objects
❌ Clases con demasiadas responsabilidades
✅ Separar en múltiples clases con responsabilidades específicas

### Código Duplicado
❌ Repetir lógica en múltiples lugares
✅ Extraer a funciones/helpers reutilizables

### Magic Numbers/Strings
❌ Valores hardcodeados sin constantes
✅ Definir constantes con nombres descriptivos

### Deep Nesting
❌ Anidación excesiva de condicionales
✅ Usar early returns y optional chaining

### Acceso Directo a Infraestructura
❌ Acceder directamente a BD desde controladores
✅ Usar servicios y capas de abstracción

## Buenas Prácticas

- Validación temprana de entrada
- Manejo explícito de errores con tipos específicos
- Aprovechar TypeScript para type safety
- Tests unitarios para lógica de negocio
- Documentación JSDoc para funciones públicas
- Variables de entorno para configuración
- Logging estructurado (cuando se implemente)

## TypeScript

- Habilitar modo strict
- Evitar `any` cuando sea posible
- Usar interfaces para contratos
- Tipar funciones y parámetros
- Usar tipos de unión cuando sea apropiado

## Variables de Entorno

- No versionar archivos `.env`
- Versionar `.env.example` con valores de ejemplo
- Usar prefijos apropiados (`REACT_APP_` para frontend)
- Documentar variables de entorno necesarias

```

```markdown
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

```

```markdown
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

```

```markdown
---
description: "Reglas de arquitectura en capas (DDD), separación de responsabilidades y flujos de datos"
alwaysApply: false
---

# Reglas de Arquitectura - LTI Project

## Arquitectura en Capas (DDD)

El proyecto sigue una arquitectura en capas inspirada en Domain-Driven Design:

### Backend

```
presentation/     → Controladores y rutas (HTTP)
application/      → Servicios y validadores (Lógica de aplicación)
domain/           → Modelos de dominio (Lógica de negocio)
infrastructure/   → Prisma, Express, Multer
```

### Reglas de Capas

- **Presentación NO debe** acceder directamente a dominio o infraestructura
- **Aplicación NO debe** acceder directamente a infraestructura (excepto a través de modelos)
- **Dominio NO debe** depender de capas superiores
- **Flujo**: Request → Controller → Service → Model → Prisma → Database

### Frontend

```
components/       → Componentes React (UI)
services/         → Comunicación con API
assets/           → Recursos estáticos
```

### Reglas de Frontend

- Componentes NO deben hacer llamadas directas a API (usar servicios)
- Servicios centralizan toda comunicación con backend
- Componentes pequeños y enfocados en presentación

## Patrones Aplicados

### Service Layer Pattern
- Servicios orquestan lógica de negocio
- Separación entre lógica de negocio y presentación

### Repository Pattern (Implícito)
- Prisma Client actúa como repositorio
- Modelos encapsulan acceso a datos

### DTO/Validator Pattern
- Validación centralizada en validators
- Separación de validación de lógica de negocio

## Flujos de Datos

### Request Flow (Backend)
```
HTTP Request
  ↓
Express Middleware
  ↓
Route Handler
  ↓
Controller (validación básica)
  ↓
Service (lógica de negocio)
  ↓
Domain Model
  ↓
Prisma Client
  ↓
PostgreSQL
```

### Response Flow (Backend)
```
PostgreSQL
  ↓
Prisma Client
  ↓
Domain Model
  ↓
Service (transformación)
  ↓
Controller (formato HTTP)
  ↓
HTTP Response
```

### Frontend Flow
```
User Action
  ↓
Component Event Handler
  ↓
Service (API call)
  ↓
Backend API
  ↓
Component State Update
  ↓
UI Re-render
```

## Separación de Responsabilidades

### Controladores
- Extraer datos del request
- Llamar al servicio correspondiente
- Manejar errores y formatear respuestas HTTP
- Retornar códigos HTTP apropiados

### Servicios
- Recibir datos validados
- Orquestar lógica de negocio
- Coordinar entre modelos de dominio
- Retornar resultados o lanzar errores

### Modelos
- Encapsular lógica de negocio
- Proporcionar métodos para persistencia
- Validar invariantes del dominio
- Usar Prisma Client para acceso a datos

## Principios Arquitectónicos

### Single Responsibility
- Cada capa tiene una responsabilidad clara
- Cada componente/clase tiene una única razón para cambiar

### Dependency Direction
- Dependencias fluyen hacia abajo (presentación → aplicación → dominio)
- Capas superiores dependen de capas inferiores
- No hay dependencias circulares

### Encapsulación
- Modelos de dominio encapsulan lógica de negocio
- Servicios encapsulan orquestación
- Controladores encapsulan manejo HTTP

## Antipatrones Arquitectónicos a Evitar

- ❌ Saltarse capas (ej: controlador accediendo directamente a Prisma)
- ❌ Lógica de negocio en controladores
- ❌ Acceso a datos en servicios (debe estar en modelos)
- ❌ Dependencias circulares entre módulos
- ❌ Acoplamiento fuerte entre capas

## Mejoras Arquitectónicas Recomendadas

- Separar acceso a datos de modelos de dominio (repositorios explícitos)
- Implementar interfaces para servicios
- Factory pattern para creación de entidades complejas
- Dependency injection para desacoplamiento

```


Eliminando los archivos antiguos y actualizando el README:


```markdown
# Reglas de Cursor - LTI Project

Este directorio contiene las reglas de Cursor para mantener estándares de código, arquitectura, testing y documentación en el proyecto LTI.

## Estructura

Cada regla está organizada en una carpeta con un archivo `RULE.md` que incluye metadatos de frontmatter para controlar cómo se aplica la regla.

## Reglas Disponibles

### `general-standards/`
**Tipo**: Always Apply  
**Descripción**: Principios generales de desarrollo (SOLID, DRY, nomenclatura, formato de código y convenciones de commits)  
**Aplicación**: Se aplica automáticamente en cada sesión de chat

### `frontend-standards/`
**Tipo**: Apply to Specific Files  
**Descripción**: Estándares y mejores prácticas para desarrollo frontend con React, TypeScript y React Bootstrap  
**Aplicación**: Se aplica cuando trabajas con archivos en `frontend/**/*.{tsx,ts,jsx,js}`

### `backend-standards/`
**Tipo**: Apply to Specific Files  
**Descripción**: Estándares y mejores prácticas para desarrollo backend con Node.js, Express, TypeScript y Prisma siguiendo arquitectura DDD  
**Aplicación**: Se aplica cuando trabajas con archivos en `backend/**/*.{ts,js}`

### `testing-standards/`
**Tipo**: Apply to Specific Files  
**Descripción**: Estrategias y mejores prácticas para testing en backend y frontend con Jest y React Testing Library  
**Aplicación**: Se aplica cuando trabajas con archivos de test `**/*.test.{ts,tsx,js,jsx}`

### `documentation-standards/`
**Tipo**: Apply Intelligently  
**Descripción**: Estándares para documentación en código: JSDoc, comentarios inline y documentación de componentes  
**Aplicación**: Se aplica cuando Agent decide que es relevante según el contexto

### `architecture-standards/`
**Tipo**: Apply Intelligently  
**Descripción**: Reglas de arquitectura en capas (DDD), separación de responsabilidades y flujos de datos  
**Aplicación**: Se aplica cuando Agent decide que es relevante según el contexto

## Uso

Estas reglas son referenciadas automáticamente por Cursor cuando trabajas en el proyecto. Puedes:

- **Aplicar manualmente**: Mencionar una regla con `@` en el chat (ej: `@frontend-standards`)
- **Ver configuración**: Ir a `Cursor Settings > Rules, Commands` para ver y gestionar todas las reglas

## Referencias

Para más detalles, consultar:
- `../docs/ai-specs/ESTANDARES_FRONTEND.md` - Estándares completos de frontend
- `../docs/ai-specs/ESTANDARES_BACKEND.md` - Estándares completos de backend
- `../docs/ai-specs/ESTANDARES_GENERALES.md` - Estándares generales
- `../docs/ai-specs/ARQUITECTURA.md` - Arquitectura del sistema
- `../docs/ai-specs/TESTING.md` - Estrategia de testing
- `../docs/ai-specs/DOCUMENTACION.md` - Estándares de documentación

## Filosofía DRY

Estas reglas están organizadas para evitar duplicación:
- Reglas generales en `general-standards/` (aplicables a todo, siempre activas)
- Reglas específicas separadas por área (frontend, backend)
- Reglas contextuales que se aplican cuando son relevantes
- Referencias cruzadas cuando sea necesario
- Ejemplos reutilizables en cada archivo

## Formato de Reglas

Cada regla sigue el formato estándar de Cursor:

```markdown
---
description: "Descripción de la regla"
globs:
  - "patrón/**/*.ts"
alwaysApply: false
---

# Contenido de la regla
```

- **description**: Descripción que ayuda a Agent a decidir cuándo aplicar la regla
- **globs**: Patrones de archivos para aplicar automáticamente
- **alwaysApply**: Si es `true`, se aplica en cada sesión de chat

```


Verificando la estructura final:



Reglas reorganizadas según la [documentación oficial de Cursor](https://cursor.com/es/docs/context/rules). Resumen de cambios:

## Cambios realizados

### Estructura actualizada
- Cada regla está en una carpeta con un archivo `RULE.md`
- Cada `RULE.md` incluye frontmatter con metadatos:
  - `description`: Descripción para que Agent decida cuándo aplicarla
  - `globs`: Patrones de archivos para aplicación automática
  - `alwaysApply`: Control de aplicación automática

### Reglas creadas

1. **`general-standards/`** — Always Apply
   - Se aplica en cada sesión de chat
   - Principios SOLID, DRY, nomenclatura, commits

2. **`frontend-standards/`** — Apply to Specific Files
   - Se aplica con archivos en `frontend/**/*.{tsx,ts,jsx,js}`
   - Estándares de React, TypeScript, React Bootstrap

3. **`backend-standards/`** — Apply to Specific Files
   - Se aplica con archivos en `backend/**/*.{ts,js}`
   - Estándares de Node.js, Express, TypeScript, Prisma, DDD

4. **`testing-standards/`** — Apply to Specific Files
   - Se aplica con archivos de test `**/*.test.{ts,tsx,js,jsx}`
   - Estrategias de testing con Jest y React Testing Library

5. **`documentation-standards/`** — Apply Intelligently
   - Agent decide cuándo aplicarla según el contexto
   - Estándares de JSDoc y documentación

6. **`architecture-standards/`** — Apply Intelligently
   - Agent decide cuándo aplicarla según el contexto
   - Reglas de arquitectura DDD y separación de responsabilidades

### Mejoras implementadas

- Formato correcto: cada regla es una carpeta con `RULE.md`
- Frontmatter configurado: metadatos para control de aplicación
- Patrones glob: aplicación automática según archivos
- `alwaysApply`: reglas generales siempre activas
- README actualizado: documentación de uso y estructura

Las reglas están listas y Cursor las aplicará según el contexto de trabajo. Puedes verificar y gestionar las reglas en `Cursor Settings > Rules, Commands`.

