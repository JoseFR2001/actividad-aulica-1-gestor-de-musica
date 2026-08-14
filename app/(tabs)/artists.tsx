import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../src/components/common/Header';
import { SearchBar } from '../../src/components/common/SearchBar';
import { LoadingState } from '../../src/components/common/LoadingState';
import { EmptyState } from '../../src/components/common/EmptyState';
import { ArtistCard } from '../../src/components/music/ArtistCard';
import { musicService } from '../../src/services/musicService';
import { Artist } from '../../src/types/music';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../src/constants/theme';

export default function ArtistsScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'following'>('all');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchArtists = async () => {
    setIsLoading(true);
    try {
      const data = await musicService.getArtists(searchQuery);
      if (filterMode === 'following') {
        setArtists(data.filter((a) => a.isFollowed));
      } else {
        setArtists(data);
      }
    } catch (error) {
      console.error('Error obteniendo artistas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, [searchQuery, filterMode]);

  const handleToggleFollow = async (artistId: string) => {
    try {
      const updated = await musicService.toggleFollowArtist(artistId);
      setArtists((prev) =>
        prev.map((a) => (a.id === artistId ? { ...a, isFollowed: updated.isFollowed } : a))
      );
    } catch (error) {
      console.error('Error cambiando seguimiento de artista:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Artistas"
        subtitle="Explora creadores y bandas destacadas"
      />

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar artistas por nombre o género..."
          onClear={() => setSearchQuery('')}
        />
      </View>

      {/* Selector de pestañas: Todos vs Siguiendo */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, filterMode === 'all' && styles.tabBtnActive]}
          onPress={() => setFilterMode('all')}
        >
          <Text
            style={[
              styles.tabText,
              filterMode === 'all' && styles.tabTextActive,
            ]}
          >
            Todos los Artistas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabBtn,
            filterMode === 'following' && styles.tabBtnActive,
          ]}
          onPress={() => setFilterMode('following')}
        >
          <Text
            style={[
              styles.tabText,
              filterMode === 'following' && styles.tabTextActive,
            ]}
          >
            Siguiendo
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Artistas */}
      {isLoading ? (
        <LoadingState message="Cargando artistas..." />
      ) : artists.length === 0 ? (
        <EmptyState
          icon="people-outline"
          title="Sin artistas encontrados"
          description={
            filterMode === 'following'
              ? 'Aún no sigues a ningún artista. Explora la pestaña "Todos".'
              : 'No hay coincidencias para tu búsqueda.'
          }
          actionLabel={filterMode === 'following' ? 'Ver todos los artistas' : undefined}
          onAction={() => setFilterMode('all')}
        />
      ) : (
        <FlatList
          data={artists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ArtistCard
              artist={item}
              onToggleFollow={handleToggleFollow}
            />
          )}
        />
      )}

      {/* Espaciador inferior para el MiniPlayer */}
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
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: SPACING.xs + 2,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.sm,
  },
  tabBtnActive: {
    backgroundColor: COLORS.backgroundElevated,
  },
  tabText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.text,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
});
