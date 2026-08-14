import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../src/components/common/Header';
import { SearchBar } from '../../src/components/common/SearchBar';
import { LoadingState } from '../../src/components/common/LoadingState';
import { EmptyState } from '../../src/components/common/EmptyState';
import { SongItem } from '../../src/components/music/SongItem';
import { musicService } from '../../src/services/musicService';
import { Song, MusicFilter } from '../../src/types/music';
import { usePlayer } from '../../src/context/PlayerContext';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../src/constants/theme';

const FILTER_CHIPS: { label: string; value: MusicFilter | 'favorites' }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Título', value: 'title' },
  { label: 'Artista', value: 'artist' },
  { label: 'Género', value: 'genre' },
  { label: 'Favoritos ❤️', value: 'favorites' },
];

export default function SongsScreen() {
  const { playSong, currentSong, isPlaying, toggleFavorite } = usePlayer();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<MusicFilter | 'favorites'>('all');
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSongs = async () => {
    setIsLoading(true);
    try {
      if (selectedFilter === 'favorites') {
        const favs = await musicService.getFavoriteSongs();
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          setSongs(
            favs.filter(
              (s) =>
                s.title.toLowerCase().includes(q) ||
                s.artist.toLowerCase().includes(q)
            )
          );
        } else {
          setSongs(favs);
        }
      } else {
        const data = await musicService.getAllSongs(searchQuery, selectedFilter);
        setSongs(data);
      }
    } catch (error) {
      console.error('Error obteniendo canciones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [searchQuery, selectedFilter]);

  const handleToggleFavorite = async (songId: string) => {
    await toggleFavorite(songId);
    // Refrescar lista local para actualizar los corazones
    setSongs((prev) =>
      prev.map((s) => (s.id === songId ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Explorar Canciones" subtitle="Catálogo musical y búsqueda avanzada" />

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar por canción, artista o género..."
          onClear={() => setSearchQuery('')}
        />
      </View>

      {/* Chips de Filtros */}
      <View style={styles.filterChipsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChipsScroll}
        >
          {FILTER_CHIPS.map((chip) => {
            const isSelected = selectedFilter === chip.value;
            return (
              <TouchableOpacity
                key={chip.value}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => setSelectedFilter(chip.value)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.chipText, isSelected && styles.chipTextSelected]}
                >
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Resumen de resultados */}
      <View style={styles.resultsInfo}>
        <Text style={styles.resultsCount}>
          {songs.length} {songs.length === 1 ? 'canción encontrada' : 'canciones encontradas'}
        </Text>
      </View>

      {/* Lista de Canciones */}
      {isLoading ? (
        <LoadingState message="Buscando en el catálogo..." />
      ) : songs.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title="No se encontraron canciones"
          description={
            searchQuery
              ? `No hay coincidencias para "${searchQuery}". Intenta con otro término.`
              : 'No hay canciones en esta categoría.'
          }
          actionLabel={searchQuery ? 'Limpiar búsqueda' : undefined}
          onAction={() => {
            setSearchQuery('');
            setSelectedFilter('all');
          }}
        />
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
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
      )}

      {/* Espacio para MiniPlayer */}
      <View style={{ height: 75 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.xs,
  },
  filterChipsWrapper: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  filterChipsScroll: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryLight,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: COLORS.text,
    fontWeight: '700',
  },
  resultsInfo: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  resultsCount: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs,
  },
  listContent: {
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
});
