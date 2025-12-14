# Prompts iniciales

He realizado el ejercicio siguiendo el siguiente flujo.

## Preparación del proyecto para trabajar con agentes

- **Generación de documentación de onboarding**: Primero he ejecutado el siguient [prompt](../.cursor/prompts/extraer-doc-tecnica.md) para generar la documentación técnica de onboarding, teniendo en cuenta temas funcionales y técnicos, arquitectura, estándares, patrones...
- **Generación del fichero AGENT.md para el proyecto de frontend**. Para que tenga el contexto adecuado cada vez que trabaje con el proyecto.
- **Generación de reglas basadas en las prácticas empleadas en el proyecto**. Proporcionando la URL de la documentación de Cursor y la documentación generada, le he pedido que genere las reglas aplicables al proyecto.

Ver conversación del [chat](cursor_documentaci_n_t_cnica_para_extra.md)

## Preparación de la tarea.

Teniendo en cuenta la [imagen](1718804691954.avif) y la [descripción de la tarea](task.md) proporcionado para el ejercicio, he realizado un ticket de una tarea tecnica utilizando la plantilla [technical_task.md](../.cursor/templates/technical_task.md), para utilizarla posteriormente por el agente [dev](../.cursor/agents/dev.md) para desarrollarla.

Ver conversación del [chat](cursor_generaci_n_de_tarea_t_cnica_mark.md)

## Desarrollo de la tarea

Le he indicado al agente [dev](../.cursor/agents/dev.md) que ejecutase la tarea generada en el paso anterior. La ejecución ha sido rápida, pero al intentar probarlo el agente ha detectado problemas de configuración que no había verificado previamente y que he tenido que corregir sobre la marcha con su ayuda.

Finalmente, tras resolver unos problemas de seed, que he resuelto manualmente. Al realizar una prueba, había unos datos que no se estaban devolviendo bien, y con ayuda del agente, hemos realizado cambios en el backend para poder disponer de la información necesaria.

Ver conversación del [chat](cursor_development_agent_technical_task.md)
