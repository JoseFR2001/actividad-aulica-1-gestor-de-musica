# SoundWave - Lista de Tareas de Implementación (tasks.md)

Este plan desglosa el desarrollo en tareas atómicas y verificables, siguiendo la metodología Spec-Driven Development (SDD). Cada tarea fue implementada, probada y verificada.

---

### [x] T01 - Sistema de Diseño, Tokens y Tipos TypeScript
- **Archivos**: `src/constants/theme.ts`, `src/types/music.ts`
- **Descripción**: Definir los tokens de diseño (paleta SoundWave Blue/Dark, espaciados, tipografías) y las interfaces de TypeScript (`Song`, `Artist`, `Playlist`, `UserProfile`, etc.).
- **Criterio de Verificación**: Tipos exportados y compilación estricta de TypeScript con 0 errores.

---

### [x] T02 - Capa de Mocks y Servicios Asíncronos con Latencia
- **Archivos**: `src/constants/mocks.ts`, `src/services/musicService.ts`
- **Descripción**: Crear la base de datos mock y el servicio `musicService` con funciones asíncronas (`Promise` + `setTimeout` 500-600ms) para simular llamadas API reales (CRUD de playlists, favoritos, canciones y artistas).
- **Criterio de Verificación**: Las funciones retornan promesas que resuelven datos tipados tras el retardo.

---

### [x] T03 - Componentes Comunes Base (UI States y Elementos)
- **Archivos**: `src/components/common/LoadingState.tsx`, `src/components/common/EmptyState.tsx`, `src/components/common/Header.tsx`, `src/components/common/SearchBar.tsx`, `src/components/music/SongItem.tsx`
- **Descripción**: Implementar componentes reutilizables con soporte para estados de carga, vacío, barras de búsqueda y filas de canciones con botón de "Me Gusta".
- **Criterio de Verificación**: Componentes renderizables con props tipadas y estilos consistentes.

---

### [x] T04 - Estado Global del Reproductor y MiniPlayer Flotante
- **Archivos**: `src/context/PlayerContext.tsx`, `src/components/music/MiniPlayer.tsx`, `app/_layout.tsx`
- **Descripción**: Implementar el `PlayerContext` para gestionar la canción en reproducción, progreso y play/pause, e integrarlo con el `MiniPlayer` flotante persistente en el layout principal.
- **Criterio de Verificación**: Al seleccionar una canción se actualiza el `MiniPlayer` y se puede pausar/reanudar con barra de progreso reactiva.

---

### [x] T05 - Navegación Principal (Tabs) y Pantalla 1: Inicio (Home)
- **Archivos**: `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `app/index.tsx`
- **Descripción**: Configurar la barra de pestañas inferiores con iconos de `@expo/vector-icons` y construir la pantalla Home con saludo, carrusel de canciones recientes y accesos directos a playlists.
- **Criterio de Verificación**: Navegación por tabs funcional y renderizado de canciones recientes con su estado de carga.

---

### [x] T06 - Pantalla 2: Explorar Canciones y Pantalla 4: Artistas Seguidos
- **Archivos**: `app/(tabs)/songs.tsx`, `app/(tabs)/artists.tsx`, `src/components/music/ArtistCard.tsx`
- **Descripción**: Construir la vista de exploración de canciones con buscador interactivo y chips de filtro, y la pantalla de artistas seguidos con selector de seguimiento.
- **Criterio de Verificación**: Filtrado de canciones en tiempo real y toggle de seguimiento de artistas.

---

### [x] T07 - Pantalla 3: Tus Playlists y Pantalla 5: Detalle de Playlist
- **Archivos**: `app/(tabs)/playlists.tsx`, `src/components/music/PlaylistCard.tsx`, `app/playlist/[id].tsx`
- **Descripción**: Construir la vista de listado de playlists con botón de acción para crear nueva lista, opciones de eliminar playlist, y la vista dinámica de detalle (`[id].tsx`) con cabecera de portada, métricas, reproducción aleatoria y lista de canciones.
- **Criterio de Verificación**: Navegación desde la tarjeta de playlist al detalle y eliminación funcional de una playlist.

---

### [x] T08 - Pantalla 6: Formulario Crear/Editar Playlist con Validación
- **Archivos**: `app/modal/playlist-form.tsx`, `src/components/forms/FormInput.tsx`
- **Descripción**: Implementar el modal de alta/edición de playlist con validación de campos en tiempo real (nombre obligatorio >3 caracteres, selector de portada, tags) y persistencia en memoria mediante el servicio mock.
- **Criterio de Verificación**: Validación visual de errores, bloqueo del botón si hay campos inválidos y guardado exitoso reflejado en la lista.
