import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LoadingState } from '../../src/components/common/LoadingState';
import { EmptyState } from '../../src/components/common/EmptyState';
import { SongItem } from '../../src/components/music/SongItem';
import { SearchBar } from '../../src/components/common/SearchBar';
import { musicService } from '../../src/services/musicService';
import { Playlist, Song } from '../../src/types/music';
import { usePlayer } from '../../src/context/PlayerContext';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../src/constants/theme';

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { playSong, currentSong, isPlaying, toggleFavorite } = usePlayer();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPlaylistDetail = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await musicService.getPlaylistById(id);
      if (data) {
        setPlaylist(data.playlist);
        setSongs(data.songs);
      }
    } catch (error) {
      console.error('Error cargando detalle de playlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylistDetail();
  }, [id]);

  const handleShufflePlay = () => {
    if (songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      playSong(songs[randomIndex]);
    }
  };

  const handleToggleFavorite = async (songId: string) => {
    await toggleFavorite(songId);
    setSongs((prev) =>
      prev.map((s) => (s.id === songId ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  };

  // Calcular duración total estimada
  const totalDurationMinutes = Math.round(
    songs.reduce((acc, song) => acc + (song.durationSeconds || 180), 0) / 60
  );

  const filteredSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <LoadingState message="Cargando detalles de la lista..." />
      </SafeAreaView>
    );
  }

  if (!playlist) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <EmptyState
          title="Playlist no encontrada"
          description="La lista seleccionada no existe o fue eliminada."
          actionLabel="Volver a mis playlists"
          onAction={() => router.back()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Barra de navegación superior */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.navTitle} numberOfLines={1}>
          {playlist.title}
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            router.push({
              pathname: '/modal/playlist-form' as any,
              params: { id: playlist.id },
            })
          }
        >
          <Ionicons name="pencil" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* Portada en gran tamaño */}
            <Image source={{ uri: playlist.cover }} style={styles.heroCover} />

            <Text style={styles.title}>{playlist.title}</Text>
            <Text style={styles.description}>{playlist.description}</Text>

            {/* Métricas */}
            <View style={styles.statsRow}>
              <Text style={styles.statsBadge}>
                {songs.length} canciones
              </Text>
              <Text style={styles.statsDot}>•</Text>
              <Text style={styles.statsBadge}>
                {totalDurationMinutes} min aprox
              </Text>
              {playlist.genreTag ? (
                <>
                  <Text style={styles.statsDot}>•</Text>
                  <Text style={styles.statsTag}>{playlist.genreTag}</Text>
                </>
              ) : null}
            </View>

            {/* Botón de Reproducción Aleatoria (Shuffle Play) */}
            <TouchableOpacity
              style={styles.shuffleButton}
              activeOpacity={0.8}
              onPress={handleShufflePlay}
            >
              <Ionicons name="shuffle" size={22} color={COLORS.text} />
              <Text style={styles.shuffleText}>Reproducción Aleatoria</Text>
            </TouchableOpacity>

            {/* Buscador dentro de la lista */}
            <View style={styles.searchBox}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Filtrar canciones de esta lista..."
                onClear={() => setSearchQuery('')}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="musical-notes-outline"
            title="Sin canciones"
            description={
              searchQuery
                ? 'No hay canciones que coincidan con la búsqueda.'
                : 'Esta playlist todavía no contiene pistas.'
            }
          />
        }
        renderItem={({ item, index }) => (
          <SongItem
            song={item}
            showIndex={index + 1}
            isPlaying={currentSong?.id === item.id && isPlaying}
            onPress={playSong}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    maxWidth: 220,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  heroCover: {
    width: 180,
    height: 180,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZES.xl,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 300,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  statsBadge: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs,
  },
  statsDot: {
    color: COLORS.textMuted,
    marginHorizontal: 6,
  },
  statsTag: {
    color: COLORS.primaryLight,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  shuffleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.xs,
    width: '100%',
    marginBottom: SPACING.md,
  },
  shuffleText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
  searchBox: {
    width: '100%',
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
});
