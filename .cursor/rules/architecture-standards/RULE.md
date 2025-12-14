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

