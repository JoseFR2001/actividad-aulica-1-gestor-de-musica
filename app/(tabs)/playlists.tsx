import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../src/components/common/Header';
import { SearchBar } from '../../src/components/common/SearchBar';
import { LoadingState } from '../../src/components/common/LoadingState';
import { EmptyState } from '../../src/components/common/EmptyState';
import { PlaylistCard } from '../../src/components/music/PlaylistCard';
import { musicService } from '../../src/services/musicService';
import { Playlist } from '../../src/types/music';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../src/constants/theme';

export default function PlaylistsScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPlaylists = async () => {
    try {
      const data = await musicService.getPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error('Error obteniendo playlists:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Recargar playlists al enfocar la pantalla (por si se creó o editó una)
  useFocusEffect(
    useCallback(() => {
      fetchPlaylists();
    }, [])
  );

  const handleDeletePlaylist = async (id: string) => {
    try {
      await musicService.deletePlaylist(id);
      setPlaylists((prev) => prev.filter((p) => p.id !== id));
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo eliminar la playlist');
    }
  };

  const filteredPlaylists = playlists.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.genreTag?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Tus Playlists"
        subtitle="Colecciones personalizadas y listas guardadas"
      />

      <View style={styles.contentWrapper}>
        {/* Botón Principal: Crear Nueva Playlist */}
        <TouchableOpacity
          style={styles.createButton}
          activeOpacity={0.85}
          onPress={() => router.push('/modal/playlist-form' as any)}
        >
          <View style={styles.createButtonContent}>
            <View style={styles.createIconCircle}>
              <Ionicons name="add" size={20} color={COLORS.text} />
            </View>
            <Text style={styles.createButtonText}>Crear nueva Playlist</Text>
          </View>
        </TouchableOpacity>

        {/* Buscador dentro de Playlists */}
        <View style={styles.searchWrapper}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar entre tus playlists..."
            onClear={() => setSearchQuery('')}
          />
        </View>

        {/* Resumen */}
        <View style={styles.statsRow}>
          <Text style={styles.statsText}>
            {filteredPlaylists.length}{' '}
            {filteredPlaylists.length === 1 ? 'playlist disponible' : 'playlists disponibles'}
          </Text>
        </View>

        {/* Lista de Playlists */}
        {isLoading ? (
          <LoadingState message="Cargando tus listas de reproducción..." />
        ) : filteredPlaylists.length === 0 ? (
          <EmptyState
            icon="library-outline"
            title="Sin playlists encontradas"
            description={
              searchQuery
                ? `No encontramos nada con el término "${searchQuery}".`
                : 'Todavía no has creado ninguna playlist. ¡Crea tu primera lista ahora!'
            }
            actionLabel="Crear mi primera playlist"
            onAction={() => router.push('/modal/playlist-form' as any)}
          />
        ) : (
          <FlatList
            data={filteredPlaylists}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <PlaylistCard
                playlist={item}
                onPress={(pl) => router.push(`/playlist/${pl.id}` as any)}
                onEdit={(pl) =>
                  router.push({
                    pathname: '/modal/playlist-form' as any,
                    params: { id: pl.id },
                  })
                }
                onDelete={handleDeletePlaylist}
              />
            )}
          />
        )}
      </View>

      {/* Espaciador para el MiniPlayer */}
      <View style={{ height: 75 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm + 4,
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
    justifyContent: 'center',
  },
  createButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  createIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm + 1,
    fontWeight: '700',
  },
  searchWrapper: {
    marginBottom: SPACING.xs,
  },
  statsRow: {
    paddingVertical: SPACING.xs,
  },
  statsText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
});
