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

