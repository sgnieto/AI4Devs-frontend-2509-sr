Analiza el codebase completo del proyecto y genera la documentación técnica más exhaustiva posible en archivos markdown, que me ayude a hacer el onboarding en el proyecto. La documentación debe incluir, al menos, los siguientes apartados: guía de desarrollo del proyecto, modelo de datos, documento de arquitectura, estándares generales, estándares de backend y frontend, especificaciones de la API, estándar de documentación, estrategia y metodología de testing, así como cualquier otro documento esencial, y contener solo los diagramas Mermaid estrictamente necesarios que aporten valor real y que facilite la comprensión, y el trabajo tanto para una IA como para un humano.

- Realiza un análisis detallado de la estructura del codebase, sus dependencias, tecnologías principales, patrones de diseño y cualquier archivo de configuración relevante. Resúmelo brevemente en una sección inicial (por ejemplo, en docs/ai-specs/OVERVIEW.md)
- Mantén la persistencia: revisa TODO el codebase y completa cada sección hasta asegurarte de que todas las áreas clave están documentadas siquiera mínimamente, incluso si debes inferir detalles razonables a partir del contexto del código.
- Utiliza chain-of-thought: antes de escribir cada sección, enumera brevemente los puntos clave que incluirás según la estructura y los patrones del codebase.
- Añade ejemplos o fragmentos representativos cuando sea útil para entender el comportamiento, contratos de API, modelos de datos o patrones arquitectónicos. Cuando no dispongas de un ejemplo directo, utiliza [PLACEHOLDER] para indicar dónde se debería insertar el ejemplo y qué tipo de ejemplo sería.
- El formato de salida debe ser una lista de archivos markdown, cada uno con su nombre sugerido y el contenido que debería tener. Estructura tu respuesta en un JSON con el siguiente formato:
  {
  "archivo": "nombre_del_archivo.md",
  "contenido": "contenido_markdown_relevante"
  }

- Incluir para cada documento una sección “Componentes y Patrones” (o integrar en cada apartado) donde:
  - Inventaries y describas los tipos de componentes presentes: controllers, services, models/entidades, repositorios (implícitos o explícitos), value objects, aggregates, DTOs, validators, factories u otros. Indica responsabilidades y rutas de archivo.
  - Indiques el estilo/arquitectura aplicada (p.ej. DDD por capas, monolito en capas, hexagonal si aplica) con evidencias del código (capas application/domain/presentation, uso de Prisma como repositorio, etc.).
  - Enumeres principios aplicados o ausentes (SOLID, SRP, DRY, KISS, YAGNI) y destaques ejemplos concretos donde se cumplen o se violan (referenciando archivo y símbolo). Si no hay evidencia, marca [PLACEHOLDER].
  - Identifiques patrones de diseño usados o no: Service Layer, Repository/ORM wrapper, DTO/Validator, Factory/Builder, Adapter, etc. Si no se detecta alguno, indícalo explícitamente. Siempre aporta ejemplo mínimo o [PLACEHOLDER ejemplo].
  - Usa chain-of-thought visible antes de esta sección para explicar cómo identificaste arquitectura, componentes y patrones.

- Requisitos específicos sobre diagramas Mermaid (versión simplificada)
  - Incluye únicamente diagramas considerados imprescindibles para comprender el sistema.
  - Los diagramas permitidos son:
    - ER Diagram (erDiagram), obligatorio en el documento del modelo de datos.
    - Diagramas C4 (niveles 1, 2 y 3) representados en Mermaid (flowchart o graph siguiendo nomenclatura C4), obligatorios en el documento de arquitectura.
    - Diagramas de infraestructura detallados.
    - Algún diagrama adicional opcional solo si aporta comprensión significativa (p. ej., un sequence diagram para un flujo crítico o un flowchart para un proceso complejo).
  - Evita diagramas redundantes o repetitivos.
  - Todos los diagramas deben ser sintácticamente correctos y estar embebidos en los ficheros Markdown con este formato:

  ```mermaid
  ...diagrama...
  ```

  - Si el codebase no proporciona suficiente información, usa:

  ```mermaid
  %% [PLACEHOLDER]: descripción del diagrama que falta
  ```

- Incluye en la documentación:
  - 1. Guía de desarrollo del proyecto
    - Setup local (prerrequisitos, instalación, variables de entorno).
    - Gestión de dependencias y herramientas (gestores de paquetes, scripts de build, herramientas CLI).
    - Convenciones de ramas y flujo de trabajo Git (branching model, pull requests, code reviews).
    - Flujo de contribución (cómo abrir issues, PRs, checklist de contribución).
  - 2. Modelo de datos
    - Entidades, atributos y relaciones (bases de datos, modelos de dominio, DTOs, etc.).
    - Diagrama de entidades y relaciones. ER Mermaid (erDiagram) del sistema.
    - Ejemplos de uso de los modelos en la lógica de negocio (consultas típicas, agregados, patrones de acceso).
  - 3. Documento de arquitectura
    - Visión general de la arquitectura (monolito, microservicios, capas, módulos).
    - Componentes principales y sus responsabilidades.
    - Flujos principales (por ejemplo: autenticación, flujo de una transacción típica, procesamiento batch).
    - Diagramas imprescindibles (ambos en Mermaid con sintaxis compatible):
      - C4 Nivel 1 (Diagrama de Contexto)
      - C4 Nivel 2 (Diagrama de Contenedores)
      - C4 Nivel 3 (Diagrama de Componentes)
    - Opcional: un único sequenceDiagram para un flujo crítico si mejora la comprensión.
    - Decisiones de diseño relevantes (patrones usados, trade-offs detectados, dependencias clave).
  - 4. Estándares y prácticas de documentación
    - Estructura recomendada de la documentación interna (directorios, tipos de documentos).
    - Convenciones de comentarios en código (formato, tags, anotaciones especiales).
    - Herramientas de documentación detectadas (por ejemplo: Swagger/OpenAPI, JSDoc, Sphinx, etc.).
    - Cómo mantener y actualizar la documentación (procesos, responsabilidades sugeridas).
  - 5. Estándares de desarrollo generales
    - Principios generales de calidad de código, patrones y antipatrón(es) a evitar.
    - Linters
    - Normas de estilo compartidas entre backend, frontend y otros componentes.
    - Convenciones de commits (formato, tags, referencia a issues).
    - Criterios mínimos de calidad antes de merge (tests, revisión, cobertura).
  - 6. Estándares de backend
    - Guías específicas por lenguaje y framework detectado (por ejemplo: Node.js, Java, Python, etc.).
    - Linters
    - Convenciones de estructura de carpetas y módulos backend.
    - Estándares de manejo de errores, logging y validación de datos.
    - Reglas de versionado y deprecación de endpoints o servicios internos.
  - 7. Estándares de frontend
    - Guías específicas por framework (por ejemplo: React, Vue, Angular, etc.).
    - Linters
    - Convenciones de estructura de componentes, hooks, stores, estilos, etc.
    - Estándares de accesibilidad y UX mínimos si se deducen.
    - Prácticas recomendadas para manejo de estado, routing, llamadas a API.
  - 8. Especificaciones de la API
    - Listado de endpoints con método HTTP, ruta, descripción y responsabilidades.
    - Parámetros de entrada, cabeceras relevantes, cuerpo de request y tipos de respuesta.
    - Opcional: un único sequenceDiagram para un endpoint representativo.
    - Ejemplos de request/response (usar [PLACEHOLDER] cuando sea necesario).
    - Manejo de errores: tipos de errores, códigos HTTP, mensajes esperados.
    - Reglas de versionado de la API y políticas de compatibilidad detectadas o inferidas.
  - 9. Seguridad y cumplimiento
    - Mecanismos de autenticación y autorización utilizados (JWT, OAuth2, sesiones, roles, permisos).
    - Gestión de secretos y credenciales (variables de entorno, vaults, ficheros de configuración).
    - Prácticas de hardening observadas o recomendadas (validación de entrada, sanitización, protección CSRF/XSS/SQLi, configuración de headers de seguridad).
    - Manejo de datos sensibles (encriptación en tránsito y en reposo, pseudonimización, logs y PII).
    - Consideraciones de cumplimiento normativo que se puedan inferir (p.ej. RGPD/GDPR, retención de datos) y puntos marcados como [POR COMPLETAR] si no es posible confirmarlo.
    - Opcional: si hay algún flujo complejo, un sequenceDiagram del flujo. Por ejemplo: funcionamiento de vaults o de login.
  - 10. Estrategia y metodología de testing
    - Tipos de tests detectados (unitarios, integración, end-to-end, contract testing, snapshot testing, etc.).
    - Cobertura objetivo u observada (por módulos, paquetes o componentes).
    - Herramientas y frameworks de testing utilizados.
    - Ejemplos representativos de tests (estructura, patrones de verificación).
    - Estrategia sugerida de testing por capas, incluyendo recomendaciones [POR COMPLETAR] cuando no haya información suficiente.
  - 11. Observabilidad, logging y monitorización
    - Estrategia de logging (niveles de log, formato, correlación de peticiones).
    - Métricas de aplicación y de infraestructura si se infieren (latencia, errores, throughput).
    - Integraciones con herramientas de monitorización, tracing o alerting (si se detectan).
    - Buenas prácticas recomendadas para mejorar observabilidad cuando el codebase no las cubra explícitamente.
  - 12. Infraestructura, despliegue y DevOps
    - Descripción de la infraestructura inferida (contenedores, Kubernetes, servidores, servicios gestionados).
    - Pipelines CI/CD (build, tests, despliegue, entornos: dev/staging/prod).
    - Configuración por entorno (variables, flags, feature toggles) y cómo se gestionan.
    - Requisitos de rendimiento y escalabilidad si se infieren (limitaciones, puntos de contención).
    - Diagramas obligatorio-mínimos para este apartado:
      - Diagrama de arquitectura de despliegue:
        - Nivel contenedores/servicios.
        - Formato sugerido: flowchart LR o graph TD estilo C4 nivel 3.
        - Debe mostrar:
          - Servicios principales
          - Bases de datos o colas
          - Gateways / cargas
          - Comunicaciones internas
      - Diagrama de entornos
        - Representación clara de dev/staging/prod.
        - Con conexiones relevantes (CI/CD → entornos).
        - Debe mostrar claramente diferencias entre entornos.
      - Diagrama del pipeline CI/CD (detallado)
        - Jobs, fases, validaciones, artefactos, reglas de despliegue.
        - Representación en flowchart LR o sequenceDiagram.
      - Diagramas opcionales permitidos:
        - Diagrama de red o subredes (VPC, security groups).
        - Diagrama de resiliencia (fallback, colas, circuit breaker).
  - 13. Cualquier documento adicional relevante
    - Guías específicas por subproyecto o componente (por ejemplo: jobs batch, workers, microservicios independientes, librerías internas).
    - Notas de migración o upgrade (bases de datos, cambios de framework, refactors relevantes).
    - FAQ técnico o “hoja de ruta” técnica si se puede inferir a partir de comentarios, issues o código.

- Asegúrate de que, en cada sección de la documentación, el razonamiento y explicación venga antes de exponer ejemplos o conclusiones.
- Mantén el contenido en español claro y técnico, evitando ambigüedades para que tanto humanos como sistemas automáticos puedan interpretar adecuadamente la documentación.
- Extensión orientativa: cada archivo debe cubrir todos los aspectos clave de su cometido, pero puede dejar secciones marcadas como [POR COMPLETAR] o [PLACEHOLDER] si la información en el codebase es insuficiente o debe ser inferida.
- Incluye 2 ejemplos de archivo de documentación en la respuesta mostrando: nombre del archivo (por ejemplo, "API_SPEC.md") y un ejemplo realista del contenido que incluiría empleando placeholders.
- Una vez definidos todos los documentos, genera los ficheros en la carpeta docs/ai-specs

Recordatorio:
Analiza completamente el codebase y genera exhaustivamente toda la documentación necesaria en archivos markdown. Resume tu razonamiento y los puntos clave de cada sección antes de los ejemplos o esquemas y mantén el formato JSON solicitado en la salida.
