# SoundWave - Especificación Funcional (spec.md)

## 1. Visión del Producto
**SoundWave** es una aplicación móvil para la gestión y exploración de música, artistas favoritos y playlists personalizadas. Permite a los usuarios descubrir canciones, organizar su biblioteca musical, crear y editar playlists con validación de datos y simular la reproducción de música mediante un reproductor flotante persistente (*MiniPlayer*).

---

## 2. Historias de Usuario (User Stories)

### HU1 - Exploración y Home
- **Como** usuario aficionado a la música,
- **Quiero** ver una pantalla de inicio con pistas escuchadas recientemente y playlists destacadas,
- **Para** acceder rápidamente a mi contenido preferido.

### HU2 - Búsqueda y Filtrado de Canciones
- **Como** usuario,
- **Quiero** buscar canciones por título o artista y filtrarlas por género/duración,
- **Para** encontrar canciones específicas en mi biblioteca.

### HU3 - Gestión de Favoritos
- **Como** usuario,
- **Quiero** marcar o desmarcar canciones como "Me Gusta" (favoritas) mediante un botón de corazón,
- **Para** consultar mi lista consolidada de canciones favoritas en tiempo real.

### HU4 - Gestión de Playlists (CRUD)
- **Como** usuario,
- **Quiero** crear nuevas playlists mediante un formulario con validación, así como ver la lista de mis playlists, editarlas o eliminarlas,
- **Para** organizar mi música según mis estados de ánimo o momentos del día.

### HU5 - Detalle de Playlist / Artista
- **Como** usuario,
- **Quiero** seleccionar una playlist o artista para ver el listado de canciones que contiene, su duración total y portada,
- **Para** visualizar los detalles antes de reproducirla.

### HU6 - MiniPlayer Persistente
- **Como** usuario,
- **Quiero** contar con un reproductor compacto visible en la parte inferior de la pantalla mientras navego,
- **Para** pausar, reanudar o ver la canción en reproducción sin perder la navegación actual.

---

## 3. Especificación de Pantallas

### Pantalla 1: Inicio (`app/(tabs)/index.tsx`)
- **Cabecera**: Saludo dinámico ("Buenos días, Alex"), avatar de perfil y acceso a configuración.
- **Sección "Escuchado recientemente"**: Carrusel horizontal con tarjetas de canciones (portada, título y artista).
- **Sección "Playlists destacadas"**: Cuadrícula/lista con accesos directos a playlists populares.
- **Estados**: Indicador de carga durante la obtención de datos y estado vacío si no hay recientes.

### Pantalla 2: Explorar Canciones (`app/(tabs)/songs.tsx`)
- **Buscador**: Barra de búsqueda interactiva en tiempo real.
- **Filtros**: Chips interactivos de filtro (Todos, Título, Artista, Duración).
- **Lista**: Listado vertical de canciones con título, artista, duración, botón de favorito interactivo y menú de acciones.

### Pantalla 3: Tus Playlists (`app/(tabs)/playlists.tsx`)
- **Botón de acción principal**: "Crear nueva Playlist" que abre el formulario modal.
- **Listado de Playlists**: Tarjetas con portada, título, cantidad de canciones, creador, botón de editar y botón de eliminar con confirmación.
- **Estados**: Manejo de estado vacío ("No tienes playlists creadas todavía") y estado de carga.

### Pantalla 4: Artistas Seguidos (`app/(tabs)/artists.tsx`)
- **Listado/Grid**: Tarjetas de artistas seguidos con avatar circular, nombre del artista, género principal y cantidad de canciones disponibles.
- **Interacción**: Botón para seguir/dejar de seguir.

### Pantalla 5: Detalle de Playlist / Favoritos (`app/playlist/[id].tsx`)
- **Header dinámico**: Imagen de portada en gran tamaño, título de la playlist, descripción, métricas (cantidad de canciones, duración estimada total).
- **Acciones**: Botón "Reproducción Aleatoria" (*Shuffle Play*) y botón para añadir más canciones.
- **Lista de pistas**: Pistas numeradas con opción de reproducción inmediata al tocarlas.

### Pantalla 6: Formulario Crear/Editar Playlist (`app/modal/playlist-form.tsx`)
- **Campos del formulario**:
  - Título de la Playlist (*Obligatorio, min 3 caracteres*).
  - Descripción (*Opcional, max 100 caracteres*).
  - Selección de Portada (*Selector de iconos / colores o URL de imagen con fallback visual*).
  - Categoría / Género (*Dropdown o selector tipo chips*).
- **Validaciones**: Mensajes de error claros bajo cada campo inválido y deshabilitación del botón de guardar si el formulario no es válido.

---

## 4. Criterios de Aceptación Globales
1. **Sin backend real**: Toda la data proviene de funciones asíncronas en `src/services/` con retardo artificial (`500ms - 1000ms`).
2. **Manejo de estados UI**: Toda pantalla muestra un indicador de carga (`ActivityIndicator`) mientras los datos se resuelven y un mensaje ilustrativo cuando la lista está vacía.
3. **Navegación fluida**: Uso de tabs inferiores con `expo-router` y stack screens para detalles y modales.
4. **Compatibilidad móvil**: Funciona de manera nativa en Expo Go tanto en Android como en iOS sin errores de renderizado.

---

## 5. Fuera de Alcance (Out of Scope)
- Streaming de audio binario real desde servidores remotos (se simula el estado de reproducción y progreso en el MiniPlayer).
- Autenticación OAuth real con proveedores externos (Spotify/Apple Music).
- Procesamiento de pagos o suscripciones Premium.
