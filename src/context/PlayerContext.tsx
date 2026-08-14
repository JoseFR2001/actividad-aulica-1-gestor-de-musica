import React, { createContext, useContext, useState, useEffect } from 'react';
import { Song } from '../types/music';
import { musicService } from '../services/musicService';
import { INITIAL_SONGS } from '../constants/mocks';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number; // Porcentaje de 0 a 100
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
  playNextSong: () => void;
  toggleFavorite: (songId: string) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Iniciamos por defecto con la primera canción en el MiniPlayer
  const [currentSong, setCurrentSong] = useState<Song | null>(INITIAL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(35);

  // Simulación de avance de la canción mientras está en estado `isPlaying`
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            playNextSong();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSong]);

  const playSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playNextSong = () => {
    const all = INITIAL_SONGS;
    if (!currentSong) {
      setCurrentSong(all[0]);
      setIsPlaying(true);
      return;
    }
    const currentIndex = all.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % all.length;
    setCurrentSong(all[nextIndex]);
    setProgress(0);
  };

  const toggleFavorite = async (songId: string) => {
    try {
      const updated = await musicService.toggleFavorite(songId);
      if (currentSong && currentSong.id === songId) {
        setCurrentSong({ ...currentSong, isFavorite: updated.isFavorite });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        playSong,
        togglePlayPause,
        playNextSong,
        toggleFavorite,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer debe utilizarse dentro de un PlayerProvider');
  }
  return context;
};
