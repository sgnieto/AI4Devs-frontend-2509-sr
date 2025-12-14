# Generación de tarea técnica markdown
_Exported on 12/14/2025 at 21:19:28 GMT+1 from Cursor (2.2.20)_

---

**User**

Actua como un experto scrum master técnico con experiencia en el proyecto. Quiero que generes una tarea técnica en formato markdown que cumpla con la plantilla @.cursor/templates/technical_task.md para la realización de la tarea @prompts/task.md y lo almacenes en la ruta prompts/technical_task.md

---

**Cursor**


Revisando la plantilla y la tarea para generar la tarea técnica.



Revisando el contexto del proyecto para entender la arquitectura y generar la tarea técnica.



Buscando información sobre routing y la estructura de la aplicación:



Revisando la especificación de la API para entender los endpoints:



Buscando información sobre el endpoint de actualización de etapa:



Revisando el controlador para entender el endpoint de actualización de etapa:



Generando la tarea técnica siguiendo la plantilla:


```markdown
# Tarea Técnica: Implementar interfaz Kanban para gestión de candidatos por posición

- **Descripción:** Crear una página tipo Kanban que permita visualizar y gestionar los candidatos de una posición específica, mostrándolos como tarjetas en columnas que representan las fases del proceso de contratación. La funcionalidad principal es permitir actualizar la fase de un candidato mediante drag and drop (arrastrar y soltar).

- **Requisitos:** Lista clara de requisitos funcionales y técnicos
- **Contexto:** Referencias a arquitectura, patrones, o código existente relevante
- **Criterios de aceptación:** Cómo se valida que la tarea está completa
- **Archivos afectados:** (Opcional) Lista de archivos que probablemente se modificarán

## Descripción

Implementar la interfaz "position" que permite visualizar y gestionar los candidatos de una posición específica mediante un tablero Kanban. Los candidatos se mostrarán como tarjetas en diferentes columnas que representan las fases del proceso de contratación (InterviewSteps). El usuario podrá actualizar la fase en la que se encuentra un candidato arrastrando su tarjeta a la columna correspondiente.

La página debe mostrar:
- El título de la posición en la parte superior con una flecha de navegación para volver al listado de posiciones
- Columnas dinámicas según las fases del proceso de entrevistas
- Tarjetas de candidatos con su nombre completo y puntuación media
- Funcionalidad de drag and drop para mover candidatos entre fases
- Diseño responsive que funcione correctamente en móvil (columnas en vertical ocupando todo el ancho)

## Requisitos

### Requisitos Funcionales

- **R-1:** La página debe mostrar el título de la posición en la parte superior de la interfaz
- **R-2:** Debe incluir una flecha o botón de navegación a la izquierda del título que permita volver al listado de posiciones (`/positions`)
- **R-3:** Debe mostrar tantas columnas como fases (InterviewSteps) haya en el flujo de entrevistas de la posición
- **R-4:** Cada columna debe mostrar el nombre de la fase correspondiente
- **R-5:** Las tarjetas de candidatos deben mostrarse en la columna correspondiente a su fase actual (`currentInterviewStep`)
- **R-6:** Cada tarjeta de candidato debe mostrar el nombre completo del candidato
- **R-7:** Cada tarjeta de candidato debe mostrar su puntuación media (`averageScore`)
- **R-8:** El usuario debe poder arrastrar una tarjeta de candidato y soltarla en otra columna para actualizar su fase
- **R-9:** Al soltar una tarjeta en una nueva columna, se debe actualizar la fase del candidato mediante llamada a la API
- **R-10:** En dispositivos móviles, las columnas deben mostrarse en vertical ocupando todo el ancho disponible
- **R-11:** La página debe manejar estados de carga mientras se obtienen los datos de la API
- **R-12:** La página debe mostrar mensajes de error apropiados si falla la carga de datos o la actualización de fase

### Requisitos Técnicos

- **R-T1:** Crear un nuevo componente React TypeScript en `frontend/src/components/PositionKanban.tsx`
- **R-T2:** Crear un servicio de API en `frontend/src/services/positionService.ts` (o extender si existe) con las siguientes funciones:
  - `getPositionInterviewFlow(positionId: number)`: Llama a `GET /positions/:id/interviewFlow`
  - `getPositionCandidates(positionId: number)`: Llama a `GET /positions/:id/candidates`
  - `updateCandidateStage(candidateId: number, applicationId: number, currentInterviewStep: number)`: Llama a `PUT /candidates/:id/stage`
- **R-T3:** Usar React Bootstrap para los componentes UI base (Container, Card, Row, Col)
- **R-T4:** Implementar drag and drop usando una librería apropiada (recomendado: `react-beautiful-dnd` o `@dnd-kit/core`)
- **R-T5:** Usar React Router para la navegación, obteniendo el `id` de la posición desde los parámetros de la URL
- **R-T6:** Configurar la ruta en `frontend/src/App.js` como `/positions/:id` que renderice el componente PositionKanban
- **R-T7:** Usar `useState` para gestionar el estado de las fases, candidatos y estado de carga
- **R-T8:** Usar `useEffect` para cargar los datos de la API al montar el componente
- **R-T9:** Implementar manejo de errores con try-catch y mostrar mensajes mediante Alert de React Bootstrap
- **R-T10:** Usar variables de entorno para la URL de la API: `process.env.REACT_APP_API_URL`
- **R-T11:** El componente debe ser responsive usando el sistema de grid de Bootstrap (Row/Col)
- **R-T12:** Tipar todas las interfaces TypeScript para los datos de la API (InterviewFlow, Candidate, InterviewStep)

## Contexto

### Arquitectura y Patrones

- **Estructura de componentes:** Seguir el patrón establecido en `frontend/src/components/Positions.tsx` (componente funcional TypeScript)
- **Servicios de API:** Seguir el patrón establecido en `frontend/src/services/candidateService.js` (funciones async que retornan Promises)
- **Routing:** La aplicación usa React Router configurado en `frontend/src/App.js` con BrowserRouter, Routes y Route
- **Estilos:** Usar React Bootstrap 5.3.3 como framework CSS base, siguiendo los estándares en `.cursor/rules/frontend-standards/RULE.md`

### Archivos de Referencia

- **Componente de posiciones:** `frontend/src/components/Positions.tsx` - Ejemplo de componente TypeScript con React Bootstrap
- **Servicio de candidatos:** `frontend/src/services/candidateService.js` - Patrón para servicios de API
- **Configuración de rutas:** `frontend/src/App.js` - Configuración actual de React Router
- **Estándares frontend:** `.cursor/rules/frontend-standards/RULE.md` - Reglas de desarrollo frontend

### Endpoints de API

Según la documentación en `prompts/task.md` y `docs/ai-specs/API_SPEC.md`:

1. **GET /positions/:id/interviewFlow**
   - Retorna el flujo de entrevistas con los pasos ordenados
   - Response: `{ positionName: string, interviewFlow: { id, description, interviewSteps: [{ id, name, orderIndex, ... }] } }`

2. **GET /positions/:id/candidates**
   - Retorna lista de candidatos con su fase actual y puntuación
   - Response: `[{ fullName: string, currentInterviewStep: string, averageScore: number, id: number, applicationId: number }]`

3. **PUT /candidates/:id/stage**
   - Actualiza la fase de un candidato
   - Body: `{ applicationId: number, currentInterviewStep: number }`
   - Response: `{ message: string, data: {...} }`

### Modelo de Datos

Según `backend/prisma/schema.prisma`:
- **InterviewStep:** Representa una fase del proceso (id, name, orderIndex)
- **Application:** Relaciona candidato con posición y tiene `currentInterviewStep` (FK a InterviewStep.id)
- **Candidate:** Tiene `id`, y se relaciona con Application
- Las entrevistas (Interview) tienen `score` que se usa para calcular `averageScore`

## Criterios de Aceptación

- **CA-1:** Al navegar a `/positions/:id`, se muestra la página Kanban con el título de la posición
- **CA-2:** Se muestra una flecha/botón de navegación que permite volver a `/positions`
- **CA-3:** Se cargan y muestran todas las fases del flujo de entrevistas como columnas, ordenadas por `orderIndex`
- **CA-4:** Cada columna muestra el nombre de la fase correspondiente
- **CA-5:** Se cargan y muestran todos los candidatos de la posición en sus columnas correspondientes
- **CA-6:** Cada tarjeta de candidato muestra el nombre completo (`fullName`)
- **CA-7:** Cada tarjeta de candidato muestra la puntuación media (`averageScore`) formateada apropiadamente (ej: "8.5" o "N/A" si no hay puntuación)
- **CA-8:** El usuario puede arrastrar una tarjeta de candidato a otra columna
- **CA-9:** Al soltar una tarjeta en una nueva columna, se realiza la llamada a `PUT /candidates/:id/stage` con los datos correctos (candidateId, applicationId, currentInterviewStep)
- **CA-10:** Después de actualizar exitosamente, la tarjeta aparece en la nueva columna
- **CA-11:** Si la actualización falla, se muestra un mensaje de error al usuario y la tarjeta vuelve a su posición original
- **CA-12:** En dispositivos móviles (viewport < 768px), las columnas se muestran en vertical ocupando todo el ancho
- **CA-13:** Se muestra un indicador de carga mientras se obtienen los datos de la API
- **CA-14:** Se muestran mensajes de error apropiados si falla la carga de datos (Alert de React Bootstrap)
- **CA-15:** Los tests unitarios cubren los casos principales: carga de datos, drag and drop, actualización de fase, manejo de errores
- **CA-16:** El código sigue los estándares del proyecto (TypeScript, React Bootstrap, estructura de servicios)

## Archivos Afectados

### Archivos a Crear

- `frontend/src/components/PositionKanban.tsx` - Componente principal del Kanban
- `frontend/src/services/positionService.ts` - Servicio para llamadas a API de posiciones (o extender si existe)
- `frontend/src/components/PositionKanban.test.tsx` - Tests unitarios del componente

### Archivos a Modificar

- `frontend/src/App.js` - Agregar ruta `/positions/:id` que renderice PositionKanban
- `frontend/package.json` - Agregar dependencia para drag and drop (si no existe): `react-beautiful-dnd` o `@dnd-kit/core` y `@dnd-kit/sortable`

### Archivos de Referencia (No Modificar)

- `frontend/src/components/Positions.tsx` - Referencia para estructura de componente
- `frontend/src/services/candidateService.js` - Referencia para patrón de servicios
- `.cursor/rules/frontend-standards/RULE.md` - Estándares a seguir

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
"Implementado: `frontend/src/components/PositionKanban.tsx` (Requisito R-T1, R-1 a R-12). Servicio: `frontend/src/services/positionService.ts` (Requisito R-T2). Tests: `frontend/src/components/PositionKanban.test.tsx` (15 casos, todos pasando). Validación: Suite completa sin regresiones. Cambios: 3 archivos nuevos, 2 archivos modificados."

```


Tarea técnica generada y guardada en `prompts/technical_task.md`. Incluye:

- **Descripción clara** del objetivo
- **Requisitos funcionales (R-1 a R-12)** y técnicos (R-T1 a R-T12) numerados
- **Contexto** con referencias a:
  - Arquitectura y patrones del proyecto
  - Archivos de referencia existentes
  - Endpoints de API documentados
  - Modelo de datos
- **Criterios de aceptación (CA-1 a CA-16)** para validar la implementación
- **Archivos afectados** (nuevos y modificados)
- **Notas importantes** de la plantilla sobre precisión, tests primero y alcance estricto

La tarea está lista para que un desarrollador la implemente siguiendo los estándares del proyecto y la arquitectura establecida.

