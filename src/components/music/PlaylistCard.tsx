import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Playlist } from '../../types/music';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../constants/theme';

interface PlaylistCardProps {
  playlist: Playlist;
  onPress: (playlist: Playlist) => void;
  onEdit?: (playlist: Playlist) => void;
  onDelete?: (playlistId: string) => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  onPress,
  onEdit,
  onDelete,
}) => {
  const handleDeleteConfirm = () => {
    Alert.alert(
      'Eliminar Playlist',
      `¿Estás seguro de que deseas eliminar "${playlist.title}"? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDelete?.(playlist.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress(playlist)}
    >
      <Image source={{ uri: playlist.cover }} style={styles.cover} />

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {playlist.title}
          </Text>
          {playlist.genreTag ? (
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{playlist.genreTag}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.description} numberOfLines={1}>
          {playlist.description || `Creada por ${playlist.creator}`}
        </Text>

        <Text style={styles.tracksCount}>
          {playlist.tracksCount} {playlist.tracksCount === 1 ? 'canción' : 'canciones'}
        </Text>
      </View>

      {/* Botones de acción rápida */}
      <View style={styles.actions}>
        {onEdit ? (
          <TouchableOpacity
            style={styles.actionIconBtn}
            onPress={() => onEdit(playlist)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="pencil" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        ) : null}

        {onDelete ? (
          <TouchableOpacity
            style={styles.actionIconBtn}
            onPress={handleDeleteConfirm}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="trash-outline" size={18} color={COLORS.error} />
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundElevated,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cover: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.surface,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
    marginRight: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    flexShrink: 1,
  },
  tagBadge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagText: {
    color: COLORS.primaryLight,
    fontSize: FONT_SIZES.xs - 2,
    fontWeight: '700',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    marginTop: 3,
  },
  tracksCount: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  actionIconBtn: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
