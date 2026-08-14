import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../src/components/common/Header';
import { LoadingState } from '../../src/components/common/LoadingState';
import { EmptyState } from '../../src/components/common/EmptyState';
import { musicService } from '../../src/services/musicService';
import { Song, Playlist, UserProfile } from '../../src/types/music';
import { usePlayer } from '../../src/context/PlayerContext';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from '../../src/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { playSong, currentSong, isPlaying } = usePlayer();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [recentSongs, setRecentSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const loadDashboardData = async () => {
    try {
      const [userData, recents, playlistsData] = await Promise.all([
        musicService.getUserProfile(),
        musicService.getRecentSongs(),
        musicService.getPlaylists(),
      ]);
      setUser(userData);
      setRecentSongs(recents);
      setPlaylists(playlistsData);
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    loadDashboardData();
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Buenos días';
    if (hours < 20) return 'Buenas tardes';
    return 'Buenas noches';
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="SoundWave" />
        <LoadingState message="Cargando tu música personalizada..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="SoundWave"
        subtitle={`${getGreeting()}, ${user?.name || 'Oyente'}`}
        avatarUrl={user?.avatar}
        rightActionIcon="search-outline"
        onRightAction={() => router.push('/(tabs)/songs' as any)}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Banner de Bienvenida / Quick Play */}
        <View style={styles.heroCard}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTag}>DESTACADO DE HOY</Text>
            <Text style={styles.heroTitle}>Sintetizadores & Neón</Text>
            <Text style={styles.heroSubtitle}>
              Sumérgete en lo mejor del Synthwave y Retro electro.
            </Text>
            <TouchableOpacity
              style={styles.heroButton}
              activeOpacity={0.8}
              onPress={() => {
                if (recentSongs.length > 0) playSong(recentSongs[0]);
              }}
            >
              <Ionicons name="play" size={18} color={COLORS.text} />
              <Text style={styles.heroButtonText}>Reproducir Mix</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
            }}
            style={styles.heroImage}
          />
        </View>

        {/* Sección: Escuchado recientemente */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Escuchado recientemente</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/songs' as any)}>
            <Text style={styles.seeAllText}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        {recentSongs.length === 0 ? (
          <EmptyState
            title="Sin canciones recientes"
            description="Explora el catálogo y reproduce tu primera canción."
          />
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recentSongs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => {
              const isCurrentPlaying = currentSong?.id === item.id && isPlaying;
              return (
                <TouchableOpacity
                  style={styles.recentCard}
                  activeOpacity={0.8}
                  onPress={() => playSong(item)}
                >
                  <View style={styles.coverWrapper}>
                    <Image source={{ uri: item.cover }} style={styles.recentCover} />
                    <View
                      style={[
                        styles.cardPlayBadge,
                        isCurrentPlaying && styles.cardPlayingBadge,
                      ]}
                    >
                      <Ionicons
                        name={isCurrentPlaying ? 'pause' : 'play'}
                        size={16}
                        color={COLORS.text}
                      />
                    </View>
                  </View>
                  <Text style={styles.recentTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.recentArtist} numberOfLines={1}>
                    {item.artist}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {/* Sección: Tus Playlists */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tus Playlists destacadas</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/playlists' as any)}>
            <Text style={styles.seeAllText}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.playlistGrid}>
          {playlists.slice(0, 4).map((pl) => (
            <TouchableOpacity
              key={pl.id}
              style={styles.playlistCard}
              activeOpacity={0.8}
              onPress={() => router.push(`/playlist/${pl.id}` as any)}
            >
              <Image source={{ uri: pl.cover }} style={styles.playlistCover} />
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistTitle} numberOfLines={1}>
                  {pl.title}
                </Text>
                <Text style={styles.playlistTracks}>
                  {pl.tracksCount} temas • {pl.genreTag || 'Música'}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.textMuted}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Espaciador inferior para no tapar con el MiniPlayer */}
        <View style={{ height: 90 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  heroCard: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    backgroundColor: COLORS.backgroundElevated,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  heroTag: {
    color: COLORS.primaryLight,
    fontSize: FONT_SIZES.xs - 1,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.lg,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    marginVertical: SPACING.xs,
    lineHeight: 16,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'flex-start',
    marginTop: SPACING.xs,
    gap: 6,
  },
  heroButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
  },
  heroImage: {
    width: 90,
    height: 90,
    borderRadius: BORDER_RADIUS.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
  seeAllText: {
    color: COLORS.primaryLight,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  horizontalList: {
    paddingLeft: SPACING.md,
    paddingRight: SPACING.sm,
  },
  recentCard: {
    width: 135,
    marginRight: SPACING.md,
  },
  coverWrapper: {
    position: 'relative',
  },
  recentCover: {
    width: 135,
    height: 135,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  cardPlayBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPlayingBadge: {
    backgroundColor: COLORS.primary,
  },
  recentTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginTop: SPACING.xs + 2,
  },
  recentArtist: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    marginTop: 2,
  },
  playlistGrid: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundElevated,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  playlistCover: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.surface,
  },
  playlistInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  playlistTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm + 1,
    fontWeight: '600',
  },
  playlistTracks: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    marginTop: 2,
  },
  arrowIcon: {
    marginRight: SPACING.xs,
  },
});
