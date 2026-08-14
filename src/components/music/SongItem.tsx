import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Song } from '../../types/music';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/theme';

interface SongItemProps {
  song: Song;
  isPlaying?: boolean;
  onPress: (song: Song) => void;
  onToggleFavorite?: (songId: string) => void;
  showIndex?: number;
}

export const SongItem: React.FC<SongItemProps> = ({
  song,
  isPlaying = false,
  onPress,
  onToggleFavorite,
  showIndex,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isPlaying && styles.playingContainer]}
      activeOpacity={0.7}
      onPress={() => onPress(song)}
    >
      {showIndex !== undefined ? (
        <Text style={[styles.indexText, isPlaying && styles.playingText]}>
          {showIndex}
        </Text>
      ) : null}

      <Image source={{ uri: song.cover }} style={styles.cover} />

      <View style={styles.infoContainer}>
        <Text
          style={[styles.title, isPlaying && styles.playingText]}
          numberOfLines={1}
        >
          {song.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist} {song.genre ? `• ${song.genre}` : ''}
        </Text>
      </View>

      <Text style={styles.duration}>{song.duration}</Text>

      {onToggleFavorite ? (
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onToggleFavorite(song.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={song.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={song.isFavorite ? COLORS.favorite : COLORS.textMuted}
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'transparent',
    marginBottom: SPACING.xs,
  },
  playingContainer: {
    backgroundColor: 'rgba(0, 122, 255, 0.12)',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  indexText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    width: 24,
    textAlign: 'center',
    marginRight: SPACING.xs,
  },
  cover: {
    width: 46,
    height: 46,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.surface,
  },
  infoContainer: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm + 1,
    fontWeight: '600',
  },
  playingText: {
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  artist: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    marginTop: 2,
  },
  duration: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs,
    marginHorizontal: SPACING.sm,
  },
  actionBtn: {
    padding: SPACING.xs,
  },
});
