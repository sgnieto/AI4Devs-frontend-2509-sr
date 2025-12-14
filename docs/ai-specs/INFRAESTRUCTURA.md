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

