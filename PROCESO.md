# Documento de Proceso de Desarrollo - SoundWave (PROCESO.md)
**Actividad Áulica Nº 1** - Taller Complementario: React Native II  
**Metodología**: Spec-Driven Development (SDD)  
**Proyecto**: SoundWave - Gestor de Música y Playlists  

---

## 1. Etapa 1: Investigación Previa
> *Las respuestas detalladas a las preguntas teóricas fueron elaboradas en conjunto por la pareja de trabajo y registradas en el documento de trabajo colaborativo.*

### Síntesis de Conceptos Clave:
- **React Native**: Permite escribir aplicaciones móviles multiplataforma usando JavaScript/TypeScript y React, compilando a vistas nativas reales del sistema operativo mediante el nuevo motor / Fabric / TurboModules.
- **Expo & Expo Router**: Expo proporciona un conjunto de herramientas y librerías estandarizadas sobre React Native. `expo-router` introduce un sistema de enrutamiento basado en el sistema de archivos (*file-based routing*), idéntico al modelo de Next.js, simplificando la navegación tipo Stack y Tabs.
- **Spec-Driven Development (SDD)**: Enfoque donde la IA actúa como asistente guiado por especificaciones estrictas (`spec.md`), arquitectura técnica (`plan.md`) y tareas atómicas (`tasks.md`), evitando el "vibe coding" caótico y garantizando que todo el código sea comprensible y auditable.
- **Mocks Asíncronos**: Simulación de una API REST mediante `Promise` y `setTimeout` que fuerza al frontend a gestionar estados de latencia (`isLoading`), estados vacíos (`isEmpty`) y posibles errores.

---

## 2. Etapa 2: Reglas y Especificación (SDD)

### 2.1 Constitución (`AGENTS.md`)
- **Prompt utilizado**: *"Generar las reglas del proyecto fijando Expo SDK 54, expo-router, TypeScript estricto, paleta de colores SoundWave y servicios mock asíncronos obligatorios."*
- **Ajustes manuales**: Se agregó la directiva explícita de incluir obligatoriamente manejo de estados (`isLoading`, `isEmpty`, `error`) en todas las vistas con listados.

### 2.2 Especificación Funcional (`spec.md`)
- **Prompt utilizado**: *"Crear la especificación funcional para la app SoundWave, detallando historias de usuario para exploración de canciones, favoritos, gestión de playlists (CRUD), detalle de lista y mini-reproductor flotante persistente."*
- **Revisión crítica de lo propuesto por la IA**:
  - *Se descartó*: Integración de streaming de audio real y autenticación OAuth compleja por estar fuera del alcance de un prototipo.
  - *Se incorporó*: Validación estricta en el formulario de creación/edición de playlist (longitud mínima, descripción, portada).

---

## 3. Etapa 3: Plan Técnico y Tareas

### 3.1 Arquitectura (`plan.md`)
- Se definió la estructura modular separando vistas en `app/`, lógica de servicios en `src/services/`, componentes reutilizables en `src/components/` y estado global en `src/context/`.

### 3.2 Lista de Tareas (`tasks.md`)
- Se dividió el trabajo en 8 tareas atómicas (T01 a T08) para asegurar avances incrementales, testeables en Expo Go y con commits independientes.

---

## 4. Etapa 4: Setup del Entorno
- Inicialización con `create-expo-app` en Expo SDK 54.
- Ejecución de `reset-project` para limpiar la plantilla de demostración y preparar una estructura limpia.
- Configuración de `tsconfig.json` para estrictez de tipos TypeScript.

---

## 5. Etapa 5: Bitácora de Desarrollo por Tareas

### T01 - Sistema de Diseño, Tokens y Tipos TypeScript
- **Prompt utilizado**: *"Definir el sistema de diseño centralizado en `src/constants/theme.ts` con la paleta Dark/Blue de SoundWave y las interfaces TypeScript en `src/types/music.ts`."*
- **Qué generó la IA**: Paleta de colores (`COLORS`), constantes de espaciado (`SPACING`), tipografías (`FONT_SIZES`), sombras y los tipos `Song`, `Artist`, `Playlist`, `UserProfile`, `CreatePlaylistDTO`.
- **Ajustes realizados**: Se agregaron propiedades opcionales para tags de género y duraciones en segundos para cálculos de tiempo total.
- **Verificación**: Compilación de tipos TypeScript exitosa con `tsc --noEmit`.

---

### T02 - Capa de Mocks y Servicios Asíncronos con Latencia
- **Prompt utilizado**: *"Implementar `src/constants/mocks.ts` y el servicio `src/services/musicService.ts` con funciones asíncronas simulando retardos de 500-600ms."*
- **Qué generó la IA**: Base de datos en memoria con canciones, playlists, artistas y perfil de usuario, junto a funciones `getAllSongs`, `getRecentSongs`, `getPlaylists`, `createPlaylist`, `updatePlaylist`, `deletePlaylist`, `toggleFavorite`, `toggleFollowArtist`.
- **Ajustes realizados**: Se implementó una sincronización en memoria para que marcar favorito actualice la playlist "Tus Me Gusta".
- **Verificación**: Las funciones retornan promesas que simulan latencia realista y mutan el estado de la sesión correctamente.

---

### T03 - Componentes Comunes Base (UI States y Elementos)
- **Prompt utilizado**: *"Crear los componentes reutilizables `LoadingState`, `EmptyState`, `Header`, `SearchBar` y `SongItem`."*
- **Qué generó la IA**: Componentes con StyleSheet nativo, soporte para spinners de carga, estados vacíos con botón de acción, barra de búsqueda con auto-limpieza y filas de canciones con indicador de favorito.
- **Ajustes realizados**: Se mejoró el espaciado táctil (`hitSlop`) de los botones de acción para mejorar la experiencia en dispositivos móviles.
- **Verificación**: Renderizado correcto con TypeScript y estilos visuales consistentes.

---

### T04 - Estado Global del Reproductor y MiniPlayer Flotante
- **Prompt utilizado**: *"Crear el contexto `PlayerContext` para el estado de la canción en reproducción y el componente `MiniPlayer` flotante persistente sobre los tabs."*
- **Qué generó la IA**: `PlayerProvider` con temporizador reactivo para la barra de progreso, alternador de play/pause y el componente `MiniPlayer` con portada, datos de pista, botón de favorito y controles.
- **Ajustes realizados**: Posicionamiento absoluto ajustado por encima de la barra de pestañas inferiores para evitar solapamiento.
- **Verificación**: Al presionar play en cualquier pista, el `MiniPlayer` se activa y muestra el avance continuo de la canción.

---

### T05 - Navegación Principal (Tabs) y Pantalla 1: Inicio (Home)
- **Prompt utilizado**: *"Configurar `app/(tabs)/_layout.tsx` y la pantalla `app/(tabs)/index.tsx` con saludo personalizado, carrusel horizontal de canciones recientes y tarjetas de playlists."*
- **Qué generó la IA**: Enrutador de pestañas inferiores con iconos de Ionicons (`Inicio`, `Canciones`, `Playlists`, `Artistas`), hero card promocional, carrusel horizontal y estado de carga (`LoadingState`) con refresco mediante `RefreshControl`.
- **Ajustes realizados**: Redirección desde la ruta raíz `app/index.tsx` hacia `/(tabs)`.
- **Verificación**: Navegación fluida entre pestañas e interacción táctil con las canciones del carrusel.

---

### T06 - Pantalla 2: Explorar Canciones y Pantalla 4: Artistas Seguidos
- **Prompt utilizado**: *"Construir las pantallas `app/(tabs)/songs.tsx` con buscador y chips de filtro, y `app/(tabs)/artists.tsx` con tarjeta `ArtistCard` y botón seguir/dejar de seguir."*
- **Qué generó la IA**: Vista de catálogo de canciones con filtros rápidos (Todos, Título, Artista, Género, Favoritos) y pantalla de artistas con selector de pestañas (Todos vs Siguiendo).
- **Ajustes realizados**: Integración del buscador instantáneo para filtrar tanto en canciones como en artistas sin requerir llamadas extras.
- **Verificación**: Filtros reactivos en tiempo real y persistencia del estado de seguimiento de artistas.

---

### T07 - Pantalla 3: Tus Playlists y Pantalla 5: Detalle de Playlist
- **Prompt utilizado**: *"Crear `app/(tabs)/playlists.tsx` con `PlaylistCard` y la pantalla dinámica `app/playlist/[id].tsx` con carátula ampliada, duración total, modo aleatorio y canciones."*
- **Qué generó la IA**: Lista de playlists con confirmación de alerta nativa antes de eliminar, navegación a la ruta dinámica `playlist/[id]`, cálculo de minutos totales y botón *Shuffle Play*.
- **Ajustes realizados**: Soporte para recargar automáticamente la lista al volver del formulario mediante el hook `useFocusEffect`.
- **Verificación**: Creación, visualización de detalle y eliminación de listas de reproducción funcionando correctamente.

---

### T08 - Pantalla 6: Formulario Crear/Editar Playlist con Validación
- **Prompt utilizado**: *"Construir el modal `app/modal/playlist-form.tsx` con el componente `FormInput`, selector visual de portadas, tags de género y validación obligatoria del título."*
- **Qué generó la IA**: Modal con validación en tiempo real (longitud mínima de 3 caracteres), selector de carátulas predefinidas, selección de pistas con checkboxes y botón de guardado con retroalimentación.
- **Ajustes realizados**: Manejo dual para modo creación y modo edición si se recibe un parámetro `id`.
- **Verificación**: Bloqueo del botón de guardado ante títulos vacíos y guardado exitoso reflejado en la pestaña de Playlists.

---

## 6. Etapa 6: Conclusiones y Aprendizajes
- **Beneficio del SDD**: Escribir las especificaciones y descomponer el trabajo en tareas atómicas previno errores de arquitectura y permitió tener un control total sobre cada línea de código para la defensa oral.
- **Manejo de Estados**: La simulación de latencia con mocks asíncronos obligó a diseñar una interfaz robusta con estados de carga claros y pantallas vacías informativas.
- **Resultado**: La aplicación SoundWave cumple el 100% de los requisitos funcionales de la cátedra con una experiencia fluida y diseño moderno en Expo SDK 54.
