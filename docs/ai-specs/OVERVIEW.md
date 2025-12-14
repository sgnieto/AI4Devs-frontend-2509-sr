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

