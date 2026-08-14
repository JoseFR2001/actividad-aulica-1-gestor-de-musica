import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Artist } from '../../types/music';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../constants/theme';

interface ArtistCardProps {
  artist: Artist;
  onToggleFollow: (artistId: string) => void;
  onPress?: (artist: Artist) => void;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  onToggleFollow,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress?.(artist)}
    >
      <Image source={{ uri: artist.avatar }} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {artist.name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {artist.tracksCount} temas • {artist.genre}
        </Text>
        {artist.bio ? (
          <Text style={styles.bio} numberOfLines={1}>
            {artist.bio}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[
          styles.followButton,
          artist.isFollowed ? styles.followingButton : styles.unfollowedButton,
        ]}
        onPress={() => onToggleFollow(artist.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={artist.isFollowed ? 'checkmark' : 'add'}
          size={16}
          color={artist.isFollowed ? COLORS.text : COLORS.textInverse}
        />
        <Text
          style={[
            styles.followText,
            artist.isFollowed
              ? styles.followingText
              : styles.unfollowedText,
          ]}
        >
          {artist.isFollowed ? 'Siguiendo' : 'Seguir'}
        </Text>
      </TouchableOpacity>
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
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.surface,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
    marginRight: SPACING.sm,
  },
  name: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
  },
  meta: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    marginTop: 2,
  },
  bio: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs - 1,
    marginTop: 3,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.full,
    gap: 4,
  },
  unfollowedButton: {
    backgroundColor: COLORS.text,
  },
  followingButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  followText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
  },
  unfollowedText: {
    color: COLORS.textInverse,
  },
  followingText: {
    color: COLORS.textSecondary,
  },
});
