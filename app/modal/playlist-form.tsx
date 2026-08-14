import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FormInput } from '../../src/components/forms/FormInput';
import { LoadingState } from '../../src/components/common/LoadingState';
import { musicService } from '../../src/services/musicService';
import { Song } from '../../src/types/music';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../src/constants/theme';

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&auto=format&fit=crop&q=80',
];

const GENRE_TAGS = ['Synthwave', 'Lo-Fi', 'Rock', 'Pop', 'EDM', 'Chill', 'Mix'];

export default function PlaylistFormModal() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const isEditing = Boolean(id);

  // Estados del Formulario
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedCover, setSelectedCover] = useState<string>(PRESET_COVERS[0]);
  const [selectedGenre, setSelectedGenre] = useState<string>('Mix');
  const [selectedSongIds, setSelectedSongIds] = useState<string[]>([]);

  // Estados de validación y carga
  const [titleError, setTitleError] = useState<string>('');
  const [availableSongs, setAvailableSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const allSongs = await musicService.getAllSongs();
        setAvailableSongs(allSongs);

        if (id) {
          const detail = await musicService.getPlaylistById(id);
          if (detail) {
            setTitle(detail.playlist.title);
            setDescription(detail.playlist.description || '');
            setSelectedCover(detail.playlist.cover);
            setSelectedGenre(detail.playlist.genreTag || 'Mix');
            setSelectedSongIds(detail.playlist.songIds || []);
          }
        }
      } catch (error) {
        console.error('Error inicializando formulario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFormData();
  }, [id]);

  const validateTitle = (value: string): boolean => {
    if (!value.trim()) {
      setTitleError('El nombre de la playlist es obligatorio.');
      return false;
    }
    if (value.trim().length < 3) {
      setTitleError('El nombre debe tener al menos 3 caracteres.');
      return false;
    }
    setTitleError('');
    return true;
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (titleError) validateTitle(text);
  };

  const toggleSongSelection = (songId: string) => {
    if (selectedSongIds.includes(songId)) {
      setSelectedSongIds(selectedSongIds.filter((sId) => sId !== songId));
    } else {
      setSelectedSongIds([...selectedSongIds, songId]);
    }
  };

  const handleSave = async () => {
    if (!validateTitle(title)) return;

    setIsSubmitting(true);
    try {
      if (isEditing && id) {
        await musicService.updatePlaylist(id, {
          title,
          description,
          cover: selectedCover,
          genreTag: selectedGenre,
          songIds: selectedSongIds,
        });
        Alert.alert('Éxito', '¡Playlist actualizada correctamente!', [
          { text: 'Aceptar', onPress: () => router.back() },
        ]);
      } else {
        await musicService.createPlaylist({
          title,
          description,
          cover: selectedCover,
          genreTag: selectedGenre,
          songIds: selectedSongIds,
        });
        Alert.alert('¡Lista Creada!', 'Tu nueva playlist está lista para escuchar.', [
          { text: 'Ir a mis playlists', onPress: () => router.back() },
        ]);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo guardar la playlist.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingState message="Cargando formulario..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header del Modal */}
      <View style={styles.modalHeader}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => router.back()}
          disabled={isSubmitting}
        >
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.modalTitle}>
          {isEditing ? 'Editar Playlist' : 'Nueva Playlist'}
        </Text>

        <TouchableOpacity
          style={[
            styles.saveHeaderBtn,
            (!title.trim() || isSubmitting) && styles.saveHeaderBtnDisabled,
          ]}
          onPress={handleSave}
          disabled={!title.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color={COLORS.text} />
          ) : (
            <Text style={styles.saveHeaderText}>Guardar</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Vista previa de portada seleccionada */}
        <View style={styles.coverPreviewSection}>
          <Image source={{ uri: selectedCover }} style={styles.coverPreview} />
          <Text style={styles.sectionHeading}>Elige una Portada</Text>
          <View style={styles.presetCoversRow}>
            {PRESET_COVERS.map((coverUrl, idx) => {
              const isSelected = selectedCover === coverUrl;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.presetCoverWrapper,
                    isSelected && styles.presetCoverSelected,
                  ]}
                  onPress={() => setSelectedCover(coverUrl)}
                >
                  <Image source={{ uri: coverUrl }} style={styles.presetCover} />
                  {isSelected ? (
                    <View style={styles.coverSelectedBadge}>
                      <Ionicons name="checkmark" size={14} color={COLORS.text} />
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Campos del Formulario */}
        <FormInput
          label="Título de la Playlist"
          placeholder="Ej: Caminata Nocturna"
          value={title}
          onChangeText={handleTitleChange}
          onBlur={() => validateTitle(title)}
          error={titleError}
          required
        />

        <FormInput
          label="Descripción (Opcional)"
          placeholder="Describe la atmósfera o temas de tu lista..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        {/* Selector de Género / Tag */}
        <Text style={styles.fieldLabel}>Género / Estilo</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreTagsScroll}
        >
          {GENRE_TAGS.map((tag) => {
            const isSelected = selectedGenre === tag;
            return (
              <TouchableOpacity
                key={tag}
                style={[styles.tagChip, isSelected && styles.tagChipSelected]}
                onPress={() => setSelectedGenre(tag)}
              >
                <Text
                  style={[
                    styles.tagText,
                    isSelected && styles.tagTextSelected,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Selector de Canciones */}
        <View style={styles.songsSectionHeader}>
          <Text style={styles.fieldLabel}>Añadir Canciones Iniciales</Text>
          <Text style={styles.songsSelectedCount}>
            {selectedSongIds.length} seleccionadas
          </Text>
        </View>

        <View style={styles.songsListContainer}>
          {availableSongs.map((song) => {
            const isChecked = selectedSongIds.includes(song.id);
            return (
              <TouchableOpacity
                key={song.id}
                style={[
                  styles.songSelectItem,
                  isChecked && styles.songSelectItemChecked,
                ]}
                onPress={() => toggleSongSelection(song.id)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: song.cover }} style={styles.songThumb} />
                <View style={styles.songInfo}>
                  <Text style={styles.songTitle} numberOfLines={1}>
                    {song.title}
                  </Text>
                  <Text style={styles.songArtist} numberOfLines={1}>
                    {song.artist} • {song.duration}
                  </Text>
                </View>
                <View
                  style={[
                    styles.checkboxCircle,
                    isChecked && styles.checkboxCircleChecked,
                  ]}
                >
                  {isChecked ? (
                    <Ionicons name="checkmark" size={14} color={COLORS.text} />
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Botón Guardar Inferior */}
        <TouchableOpacity
          style={[
            styles.saveBottomBtn,
            (!title.trim() || isSubmitting) && styles.saveBottomBtnDisabled,
          ]}
          onPress={handleSave}
          disabled={!title.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color={COLORS.text} />
          ) : (
            <Text style={styles.saveBottomBtnText}>
              {isEditing ? 'Guardar Cambios' : 'Crear Playlist'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
  },
  saveHeaderBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
  },
  saveHeaderBtnDisabled: {
    opacity: 0.5,
  },
  saveHeaderText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  coverPreviewSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  coverPreview: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  sectionHeading: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  presetCoversRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  presetCoverWrapper: {
    position: 'relative',
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  presetCoverSelected: {
    borderColor: COLORS.primary,
  },
  presetCover: {
    width: 54,
    height: 54,
    borderRadius: BORDER_RADIUS.sm - 2,
  },
  coverSelectedBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldLabel: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  genreTagsScroll: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  tagChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryLight,
  },
  tagText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  tagTextSelected: {
    color: COLORS.text,
    fontWeight: '700',
  },
  songsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  songsSelectedCount: {
    color: COLORS.primaryLight,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  songsListContainer: {
    backgroundColor: COLORS.backgroundElevated,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
  },
  songSelectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  songSelectItemChecked: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  songThumb: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.surface,
  },
  songInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  songTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  songArtist: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    marginTop: 2,
  },
  checkboxCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: COLORS.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCircleChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  saveBottomBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBottomBtnDisabled: {
    opacity: 0.5,
  },
  saveBottomBtnText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
  },
});
