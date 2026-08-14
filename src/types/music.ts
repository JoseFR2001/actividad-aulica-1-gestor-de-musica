/**
 * Definición de Tipos e Interfaces de SoundWave
 * Utilizados en componentes, servicios mock y contextos globales.
 */

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;         // Formato "mm:ss", ej: "3:45"
  durationSeconds: number;  // Para cálculos de duración total
  cover: string;            // URL de la imagen de portada
  isFavorite: boolean;
  album?: string;
  genre?: string;
  plays?: number;
}

export interface Artist {
  id: string;
  name: string;
  tracksCount: number;
  genre: string;
  avatar: string;
  isFollowed: boolean;
  bio?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  creator: string;
  tracksCount: number;
  cover: string;
  songIds: string[];
  genreTag?: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  stats: {
    playedCount: string;
    artistsCount: number;
    playlistsCount: number;
  };
}

export interface CreatePlaylistDTO {
  title: string;
  description?: string;
  cover?: string;
  genreTag?: string;
  songIds?: string[];
}

export interface UpdatePlaylistDTO {
  title?: string;
  description?: string;
  cover?: string;
  genreTag?: string;
  songIds?: string[];
}

export type MusicFilter = 'all' | 'title' | 'artist' | 'genre' | 'duration';
export type SortOrder = 'recent' | 'az' | 'duration';
