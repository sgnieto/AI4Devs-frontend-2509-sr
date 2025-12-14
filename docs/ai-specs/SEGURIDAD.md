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

