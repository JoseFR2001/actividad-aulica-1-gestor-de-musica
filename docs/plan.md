# SoundWave - Plan Técnico de Arquitectura (plan.md)

## 1. Estructura de Directorios del Proyecto

```text
gestor-de-musica/
├── docs/                          # Documentación del proceso SDD
│   ├── spec.md                    # Especificación funcional
│   ├── plan.md                    # Este documento de arquitectura técnica
│   ├── tasks.md                   # Plan de tareas atómicas e incrementales
│   ├── AGENTS.md                  # Reglas del proyecto y directivas
│   └── PROCESO.md                 # Registro paso a paso del desarrollo
│
├── app/                           # Expo Router - Pantallas y Rutas
│   ├── (tabs)/                    # Navegación por Pestañas (Bottom Tabs)
│   │   ├── _layout.tsx            # Configuración visual de la barra de tabs
│   │   ├── index.tsx              # Pantalla Home / Inicio
│   │   ├── songs.tsx              # Pantalla Explorar Canciones
│   │   ├── playlists.tsx          # Pantalla Tus Playlists
│   │   └── artists.tsx            # Pantalla Artistas Seguidos
│   ├── playlist/
│   │   └── [id].tsx               # Pantalla dinámica de Detalle de Playlist
│   ├── modal/
│   │   └── playlist-form.tsx      # Modal de Alta y Edición de Playlists
│   └── _layout.tsx                # Root Layout (Stack + Context Providers)
│
├── src/
│   ├── constants/
│   │   ├── theme.ts               # Paleta de colores Dark/Blue, tipografías y espaciado
│   │   └── mocks.ts               # Conjunto de datos iniciales tipados
│   ├── types/
│   │   └── music.ts               # Interfaces TypeScript (Song, Artist, Playlist, etc.)
│   ├── services/
│   │   └── musicService.ts        # Funciones asíncronas con Promise + setTimeout
│   ├── context/
│   │   └── PlayerContext.tsx      # Estado global del reproductor y favoritos
│   └── components/
│       ├── common/
│       │   ├── Header.tsx         # Cabecera reutilizable
│       │   ├── LoadingState.tsx   # Spinner / Skeleton de carga
│       │   ├── EmptyState.tsx     # Vista de estado vacío informativa
│       │   └── SearchBar.tsx      # Barra de búsqueda con limpieza
│       ├── music/
│       │   ├── SongItem.tsx       # Fila de canción con botón de favorito
│       │   ├── PlaylistCard.tsx   # Tarjeta de playlist con acciones
│       │   ├── ArtistCard.tsx     # Tarjeta de artista
│       │   └── MiniPlayer.tsx     # Reproductor flotante persistente
│       └── forms/
│           └── FormInput.tsx      # Input de formulario con mensaje de error integrado
```

---

## 2. Modelos de Datos (TypeScript Types)

- `Song`: `{ id: string; title: string; artist: string; duration: string; cover: string; isFavorite: boolean; album?: string; genre?: string; }`
- `Artist`: `{ id: string; name: string; tracksCount: number; genre: string; avatar: string; isFollowed: boolean; }`
- `Playlist`: `{ id: string; title: string; description?: string; creator: string; tracksCount: number; cover: string; songIds: string[]; createdAt: string; }`
- `User`: `{ name: string; username: string; avatar: string; stats: { played: string; artists: number; playlists: number; } }`

---

## 3. Capa de Servicios Mock (`src/services/musicService.ts`)

La capa simulará peticiones a una API REST con `async/await` y una latencia artificial de entre 500ms y 800ms:
- `getRecentSongs()`: Retorna canciones escuchadas recientemente.
- `getAllSongs(query?: string, genre?: string)`: Retorna canciones con filtro opcional.
- `toggleFavorite(songId: string)`: Alterna el estado de favorito de una canción.
- `getPlaylists()`: Retorna todas las listas de reproducción.
- `getPlaylistById(id: string)`: Retorna el detalle de una playlist con sus canciones asociadas.
- `createPlaylist(data: CreatePlaylistDTO)`: Valida e inserta una nueva playlist en memoria.
- `updatePlaylist(id: string, data: UpdatePlaylistDTO)`: Modifica una playlist existente.
- `deletePlaylist(id: string)`: Elimina una playlist.
- `getArtists()`: Retorna la lista de artistas seguidos.

---

## 4. Gestión de Estado Global (`PlayerContext`)
Se utiliza la API Context de React para sincronizar:
- `currentSong`: Canción activa en reproducción.
- `isPlaying`: Booleano del estado de reproducción.
- `playbackProgress`: Progreso actual de la canción (0% a 100%).
- `playSong(song: Song)`: Acción para cargar y reproducir una canción.
- `togglePlayPause()`: Alternar pausa / reproducción.

---

## 5. Diseño y Sistema de Tokens (`src/constants/theme.ts`)
- **Fondo Principal**: `#0D1117` / `#151219` (Dark Theme Premium).
- **Superficie / Tarjetas**: `#161B22` / `#1E1E1E`.
- **Color Primario (Acento)**: `#007AFF` / `#2979FF` (Azul eléctrico característico de SoundWave).
- **Color Secundario**: `#BB86FC` / `#53E076`.
- **Textos**: `#FFFFFF` (Primario), `#A0A6B2` (Secundario/Muted).
- **Error**: `#FF5252`.
