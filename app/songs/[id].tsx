import { mockCatalog } from '@/src/data/mockCatalog';
import { getAlbumById, getArtistById } from '@/src/domain/selectors';
import { theme } from '@/src/theme/tokens';
import { formatDuration } from '@/src/utils/formatters';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SongDetailScreen() {
    const params = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const song = mockCatalog.songs.find((entry) => entry.id === params.id);

    if (!song) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No se encontró la canción.</Text>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>Volver</Text>
                </Pressable>
            </View>
        );
    }

    const artist = getArtistById(mockCatalog, song.artistaId);
    const album = getAlbumById(mockCatalog, song.albumId);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.eyebrow}>Canción</Text>
            <Text style={styles.title}>{song.titulo}</Text>
            <Text style={styles.meta}>{artist?.nombre ?? 'Artista desconocido'}</Text>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Duración</Text>
                <Text style={styles.infoValue}>{formatDuration(song.duracionSegundos)}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Género</Text>
                <Text style={styles.infoValue}>{song.genero}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Álbum</Text>
                <Text style={styles.infoValue}>{album?.titulo ?? 'Sin álbum'}</Text>
            </View>

            <View style={styles.panel}>
                <Text style={styles.panelTitle}>Descripción</Text>
                <Text style={styles.description}>{song.descripcion}</Text>
            </View>

            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>Volver a canciones</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { padding: theme.spacing.lg },
    eyebrow: { color: theme.colors.primary, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
    title: { fontSize: 30, fontWeight: '800', color: theme.colors.text },
    meta: { fontSize: 16, color: theme.colors.muted, marginTop: 6, marginBottom: theme.spacing.lg },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    infoLabel: { color: theme.colors.muted, fontSize: 14 },
    infoValue: { color: theme.colors.text, fontWeight: '600', fontSize: 14 },
    panel: { backgroundColor: theme.colors.card, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.border, padding: theme.spacing.md, marginTop: theme.spacing.lg },
    panelTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 6 },
    description: { color: theme.colors.muted, lineHeight: 22 },
    backButton: { marginTop: theme.spacing.lg, backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: theme.spacing.md, alignItems: 'center' },
    backText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
    emptyText: { color: theme.colors.text, fontSize: 18, fontWeight: '700' },
});
