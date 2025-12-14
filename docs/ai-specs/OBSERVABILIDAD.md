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

