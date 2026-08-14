/**
 * Capa de Servicios Mock de SoundWave
 * Simula una API REST con persistencia en memoria y latencia artificial
 * para forzar y demostrar estados de carga, vacío y error en la UI.
 */

import {
  INITIAL_SONGS,
  INITIAL_PLAYLISTS,
  INITIAL_ARTISTS,
  MOCK_USER,
} from '../constants/mocks';
import {
  Song,
  Artist,
  Playlist,
  UserProfile,
  CreatePlaylistDTO,
  UpdatePlaylistDTO,
  MusicFilter,
} from '../types/music';

// Estado en memoria durante la sesión
let songsDb: Song[] = JSON.parse(JSON.stringify(INITIAL_SONGS));
let playlistsDb: Playlist[] = JSON.parse(JSON.stringify(INITIAL_PLAYLISTS));
let artistsDb: Artist[] = JSON.parse(JSON.stringify(INITIAL_ARTISTS));
let userDb: UserProfile = JSON.parse(JSON.stringify(MOCK_USER));

// Función auxiliar para simular latencia de red (500ms - 800ms)
const simulateNetworkDelay = <T>(data: T, delayMs: number = 600): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(data)));
    }, delayMs);
  });
};

export const musicService = {
  /**
   * Obtiene el perfil de usuario actual
   */
  async getUserProfile(): Promise<UserProfile> {
    return simulateNetworkDelay(userDb, 400);
  },

  /**
   * Obtiene las canciones escuchadas recientemente
   */
  async getRecentSongs(): Promise<Song[]> {
    const recents = songsDb.slice(0, 5);
    return simulateNetworkDelay(recents, 600);
  },

  /**
   * Obtiene todas las canciones con soporte para búsqueda y filtrado
   */
  async getAllSongs(query: string = '', filter: MusicFilter = 'all'): Promise<Song[]> {
    let filtered = [...songsDb];
    const q = query.trim().toLowerCase();

    if (q) {
      filtered = filtered.filter((s) => {
        if (filter === 'title') return s.title.toLowerCase().includes(q);
        if (filter === 'artist') return s.artist.toLowerCase().includes(q);
        if (filter === 'genre') return s.genre?.toLowerCase().includes(q);
        return (
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          s.album?.toLowerCase().includes(q) ||
          s.genre?.toLowerCase().includes(q)
        );
      });
    }

    return simulateNetworkDelay(filtered, 500);
  },

  /**
   * Obtiene la lista de canciones marcadas como favoritas ("Me Gusta")
   */
  async getFavoriteSongs(): Promise<Song[]> {
    const favorites = songsDb.filter((s) => s.isFavorite);
    return simulateNetworkDelay(favorites, 500);
  },

  /**
   * Alterna el estado de favorito de una canción
   */
  async toggleFavorite(songId: string): Promise<Song> {
    const songIndex = songsDb.findIndex((s) => s.id === songId);
    if (songIndex === -1) {
      throw new Error(`Canción con id ${songId} no encontrada`);
    }

    songsDb[songIndex].isFavorite = !songsDb[songIndex].isFavorite;

    // Sincronizar con la playlist 'Tus Me Gusta' (id 'p1')
    const favPlaylist = playlistsDb.find((p) => p.id === 'p1');
    if (favPlaylist) {
      if (songsDb[songIndex].isFavorite) {
        if (!favPlaylist.songIds.includes(songId)) {
          favPlaylist.songIds.push(songId);
        }
      } else {
        favPlaylist.songIds = favPlaylist.songIds.filter((id) => id !== songId);
      }
      favPlaylist.tracksCount = favPlaylist.songIds.length;
    }

    return simulateNetworkDelay(songsDb[songIndex], 300);
  },

  /**
   * Obtiene todas las playlists
   */
  async getPlaylists(): Promise<Playlist[]> {
    return simulateNetworkDelay(playlistsDb, 600);
  },

  /**
   * Obtiene el detalle de una playlist con sus canciones completas
   */
  async getPlaylistById(id: string): Promise<{ playlist: Playlist; songs: Song[] } | null> {
    const playlist = playlistsDb.find((p) => p.id === id);
    if (!playlist) {
      return simulateNetworkDelay(null, 500);
    }

    const songs = songsDb.filter((s) => playlist.songIds.includes(s.id));
    return simulateNetworkDelay({ playlist, songs }, 600);
  },

  /**
   * Crea una nueva playlist con validaciones
   */
  async createPlaylist(dto: CreatePlaylistDTO): Promise<Playlist> {
    if (!dto.title || dto.title.trim().length < 3) {
      throw new Error('El título debe tener al menos 3 caracteres.');
    }

    const newPlaylist: Playlist = {
      id: `p_${Date.now()}`,
      title: dto.title.trim(),
      description: dto.description?.trim() || 'Sin descripción',
      creator: userDb.name,
      tracksCount: dto.songIds?.length || 0,
      cover:
        dto.cover ||
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
      songIds: dto.songIds || [],
      genreTag: dto.genreTag || 'Mix',
      createdAt: new Date().toISOString().split('T')[0],
    };

    playlistsDb.unshift(newPlaylist);
    userDb.stats.playlistsCount = playlistsDb.length;

    return simulateNetworkDelay(newPlaylist, 600);
  },

  /**
   * Modifica una playlist existente
   */
  async updatePlaylist(id: string, dto: UpdatePlaylistDTO): Promise<Playlist> {
    const index = playlistsDb.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Playlist ${id} no encontrada`);
    }

    if (dto.title !== undefined && dto.title.trim().length < 3) {
      throw new Error('El título debe tener al menos 3 caracteres.');
    }

    const current = playlistsDb[index];
    const updated: Playlist = {
      ...current,
      title: dto.title !== undefined ? dto.title.trim() : current.title,
      description: dto.description !== undefined ? dto.description.trim() : current.description,
      cover: dto.cover || current.cover,
      genreTag: dto.genreTag || current.genreTag,
      songIds: dto.songIds || current.songIds,
      tracksCount: dto.songIds ? dto.songIds.length : current.tracksCount,
    };

    playlistsDb[index] = updated;
    return simulateNetworkDelay(updated, 500);
  },

  /**
   * Elimina una playlist
   */
  async deletePlaylist(id: string): Promise<boolean> {
    const index = playlistsDb.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Playlist con id ${id} no existe`);
    }

    playlistsDb.splice(index, 1);
    userDb.stats.playlistsCount = playlistsDb.length;

    return simulateNetworkDelay(true, 500);
  },

  /**
   * Obtiene la lista de artistas seguidos
   */
  async getArtists(query: string = ''): Promise<Artist[]> {
    let filtered = [...artistsDb];
    const q = query.trim().toLowerCase();

    if (q) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.genre.toLowerCase().includes(q)
      );
    }

    return simulateNetworkDelay(filtered, 600);
  },

  /**
   * Alterna el estado de seguimiento de un artista
   */
  async toggleFollowArtist(artistId: string): Promise<Artist> {
    const artistIndex = artistsDb.findIndex((a) => a.id === artistId);
    if (artistIndex === -1) {
      throw new Error(`Artista con id ${artistId} no encontrado`);
    }

    artistsDb[artistIndex].isFollowed = !artistsDb[artistIndex].isFollowed;
    return simulateNetworkDelay(artistsDb[artistIndex], 300);
  },
};
