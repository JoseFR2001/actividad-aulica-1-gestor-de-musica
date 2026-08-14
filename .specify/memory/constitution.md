<!--
Sync Impact Report
- Version change: 0.0.0 -> 1.0.0
- Modified principles: N/A -> I. Experiencia de usuario prioritaria, II. Arquitectura sin backend, III. Datos simulados y contratos explícitos, IV. Calidad y pruebas obligatorias, V. Accesibilidad, rendimiento y simplicidad
- Added sections: Requisitos de tecnología y arquitectura; Flujo de desarrollo; Gobierno del proyecto
- Removed sections: N/A
- Deferred items: Ninguno
-->

# Constitución del Proyecto Gestor de Música

## Core Principles

### I. Experiencia de usuario prioritaria

Toda funcionalidad del gestor musical debe diseñarse para resolver una necesidad real del usuario y ofrecer una experiencia fluida, clara y útil en la primera interacción. La navegación, el contenido y el control de la música deben ser comprensibles sin entrenamiento previo, y cada pantalla debe priorizar la velocidad de acceso a la información relevante.

La interfaz MUST ser consistente, legible y accionable. Cada flujo principal debe requerir el menor número de pasos posible, y cualquier acción con impacto visible debe devolver retroalimentación inmediata al usuario. El criterio de éxito no es solo que la funcionalidad exista, sino que el usuario pueda entenderla, usarla y confiar en ella sin dudas.

### II. Arquitectura sin backend y centrada en React + Expo

El proyecto se desarrolla como una aplicación frontend con React, Expo y expo-router, sin backend propio ni servicios de infraestructura externos para la lógica de negocio. La aplicación debe funcionar con datos locales, mocks o almacenamiento del cliente cuando sea necesario, y no debe depender de una API externa para cumplir los requisitos principales del producto.

Toda nueva funcionalidad MUST respetar este modelo de arquitectura. Se prohíben los patrones que introducen dependencias backend innecesarias, y cualquier servicio externo debe justificarse explícitamente como una necesidad de negocio y no como una solución por defecto. La simplicidad y la autonomía del cliente son principios no negociables para mantener velocidad de desarrollo y previsibilidad del sistema.

### III. Datos simulados y contratos explícitos

Los datos del proyecto deben representarse con mocks realistas, consistentes y documentados, y cada entidad clave del dominio musical debe contar con un contrato claro de estructura, campos y reglas de negocio. El proyecto MUST definir cómo se modelan artistas, álbumes, playlists, canciones, listas de reproducción y estados de reproducción, así como los comportamientos esperados al interactuar con ellos.

No se aceptan mocks ambiguos ni datos artificiales que oculten reglas del negocio. Si una funcionalidad requiere estados como reproducción, pausa, favoritos, orden de canciones o edición de listas, esos estados deben estar definidos de forma explícita y verificables. La calidad del producto depende de la claridad del dominio y de la consistencia de los datos simulados.

### IV. Calidad y pruebas obligatorias

Toda nueva funcionalidad debe desarrollarse con criterio de calidad, y cualquier cambio funcional debe tener una validación explícita antes de integrarse. La entrega de una característica sin verificación no cumple la constitución. El equipo MUST definir escenarios clave, validar el comportamiento esperado y comprobar que la interfaz se comporta correctamente en los caminos principales y en los casos límite.

Se prioriza una revisión realista del producto sobre la cantidad de código. Los defectos conocidos deben reproducirse antes de corregirse, y los cambios con riesgo de regresión deben probarse en contextos relevantes. La regla es simple: sin validación, no hay aceptación.

### V. Accesibilidad, rendimiento y simplicidad

La experiencia musical debe ser usable en distintos tamaños de pantalla, con buenas prácticas de accesibilidad y una navegación clara. La aplicación MUST considerar contrastes adecuados, componentes con tamaños táctiles razonables, textos legibles, estados visuales claros y soporte para lectura por pantalla cuando la plataforma lo permita.

La complejidad técnica MUST estar justificada por un beneficio concreto para la experiencia del usuario. Se evita la sobreingeniería, los estados duplicados y las abstracciones innecesarias. Cuando dos soluciones cumplen el requisito, la más simple, mantenible y predecible tiene prioridad.

## Requisitos de tecnología y arquitectura

El producto se apoyará en el stack siguiente:

- React como base de la interfaz de usuario.
- Expo como entorno de ejecución y desarrollo de la aplicación móvil.
- expo-router para la navegación basada en rutas.
- TypeScript como lenguaje preferido para mayor claridad y mantenimiento del código.
- Mocks y fixtures locales para representar datos y flujos del dominio musical.
- Sin backend propio ni lógica de persistencia en servidor para el caso base del proyecto.

Las reglas de implementación son las siguientes:

- Los componentes MUST estar orientados a un único propósito y deben reutilizarse solo cuando aportan claridad.
- Los datos de prueba MUST reflejar escenarios reales del uso diario del gestor musical.
- La configuración de rutas, pantallas y navegación MUST mantenerse coherente con la estructura del proyecto.
- El contenido de la interfaz MUST estar en español como idioma principal, salvo excepciones expresamente justificadas.
- La aplicación MUST evitar secretos, claves y dependencias externas no esenciales para la funcionalidad principal.
- La experiencia debe ejecutarse de forma fiable en entorno local y sin requerir infraestructura adicional.

## Flujo de desarrollo

El trabajo del proyecto debe seguir un flujo claro y repetible:

1. Definir la necesidad del usuario y el alcance de la funcionalidad antes de iniciar el desarrollo.
2. Describir los escenarios clave y los criterios de aceptación antes de implementar cambios.
3. Diseñar la interfaz y los datos de prueba con el dominio musical definido.
4. Implementar la funcionalidad con el menor nivel de complejidad compatible con la necesidad.
5. Validar el resultado con pruebas o comprobaciones de comportamiento en el entorno del producto.
6. Revisar que la solución mantiene el enfoque de simplicidad, accesibilidad y coherencia del sistema.

Se prohíben las entregas “a ciegas” sin definición clara del problema ni validación del resultado. Todo cambio debe poder explicarse con un objetivo de negocio o de experiencia de usuario, y no solo como una modificación técnica sin justificación.

## Gobierno

Esta constitución gobierna el desarrollo del proyecto y prevalece sobre prácticas informales, decisiones aisladas o documentación contradictoria. Cualquier norma de proceso, diseño o implementación que contradiga esta constitución debe corregirse antes de continuar.

Las decisiones de cambio MUST registrarse de forma explícita. Toda modificación de esta constitución debe incluir:

- un resumen del cambio;
- la justificación de la necesidad del ajuste;
- la revisión del impacto sobre principios, reglas y flujo de trabajo;
- la versión actualizada según la política semántica.

La política de versionado sigue semver:

- MAJOR: cambios incompatibles en el gobierno o eliminación o redefinición de principios fundamentales.
- MINOR: incorporación de nuevos principios o ampliación material de reglas existentes.
- PATCH: correcciones de redacción, clarificaciones, limpieza editorial o ajustes no semánticos.

La revisión de cumplimiento MUST realizarse en cada cambio relevante del producto. El equipo debe validar que nuevas decisiones sigan la constitución, que no se introduzcan excepciones silenciosas y que el ajuste de reglas quede documentado. Si una práctica contradice la constitución, debe corregirse antes de aceptar el cambio.

**Version**: 1.0.0 | **Ratified**: 2026-08-14 | **Last Amended**: 2026-08-14
