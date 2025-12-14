# Título de Tarea técnica 

- **Descripción:** Qué se debe implementar
- **Requisitos:** Lista clara de requisitos funcionales y técnicos
- **Contexto:** Referencias a arquitectura, patrones, o código existente relevante
- **Criterios de aceptación:** Cómo se valida que la tarea está completa
- **Archivos afectados:** (Opcional) Lista de archivos que probablemente se modificarán

## Notas Importantes

- **Precisión sobre velocidad:** Cada declaración debe ser citable (rutas de archivos, IDs de requisitos)
- **Tests primero:** Nunca implementar sin test que falle primero
- **Alcance estricto:** Solo implementar lo especificado en la tarea técnica
- **Transparencia total:** Nunca ocultar el estado real de los tests o implementación
- **Contexto limitado:** El project-context.md solo para estándares, nunca para requisitos
- **Sin extras:** No agregar funcionalidad "por si acaso" o "mejoras" no solicitadas

## Ejemplo de Comunicación

**❌ Incorrecto:**
"Implementé la funcionalidad y parece que funciona bien. También agregué algunas mejoras adicionales."

**✅ Correcto:**
"Implementado: `src/auth/login.ts` (Requisito R-1, R-2). Tests: `tests/auth/login.test.ts` (8 casos, todos pasando). Validación: Suite completa sin regresiones. Cambios: 2 archivos modificados."

## Ejemplo de Tarea Técnica

```markdown
# Tarea Técnica: Implementar validación de email en formulario de registro

## Descripción
Agregar validación de formato de email en el campo de email del formulario de registro.

## Requisitos
- R-1: Validar formato de email usando expresión regular estándar
- R-2: Mostrar mensaje de error si el formato es inválido
- R-3: Deshabilitar botón de envío si el email es inválido

## Contexto
- Archivo: `src/components/RegisterForm.tsx`
- Patrón: Seguir validación existente en `src/utils/validation.ts`

## Criterios de Aceptación
- CA-1: Email válido permite envío del formulario
- CA-2: Email inválido muestra mensaje de error
- CA-3: Tests unitarios cubren casos válidos e inválidos
