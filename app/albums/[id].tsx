import { ScreenHeader } from '@/src/components/ScreenHeader';
import { mockCatalog } from '@/src/data/mockCatalog';
import { getAlbumSongs, getArtistById } from '@/src/domain/selectors';
import { theme } from '@/src/theme/tokens';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AlbumDetailScreen() {
    const params = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const album = mockCatalog.albums.find((item) => item.id === params.id);

    if (!album) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No se encontró el álbum.</Text>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>Atrás</Text>
                </Pressable>
            </View>
        );
    }

    const artist = getArtistById(mockCatalog, album.artistaId);
    const songs = getAlbumSongs(mockCatalog, album.id);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <ScreenHeader title={album.titulo} subtitle={artist?.nombre ?? 'Artista desconocido'} />
            <View style={styles.panel}>
                <Text style={styles.title}>Descripción</Text>
                <Text style={styles.text}>{album.descripcion}</Text>
            </View>
            <View style={styles.panel}>
                <Text style={styles.title}>Canciones</Text>
                {songs.length > 0 ? (
                    songs.map((song) => <Text key={song.id} style={styles.item}>{song.titulo}</Text>)
                ) : (
                    <Text style={styles.empty}>Sin canciones asociadas.</Text>
                )}
            </View>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>Atrás</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { paddingBottom: 32 },
    panel: { marginHorizontal: theme.spacing.lg, backgroundColor: theme.colors.card, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.border, padding: theme.spacing.md, marginTop: theme.spacing.md },
    title: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
    text: { color: theme.colors.muted, lineHeight: 22 },
    item: { color: theme.colors.text, paddingVertical: 6, fontSize: 15 },
    empty: { color: theme.colors.muted },
    backButton: { marginHorizontal: theme.spacing.lg, marginTop: theme.spacing.lg, backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: theme.spacing.md, alignItems: 'center' },
    backText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
    emptyText: { color: theme.colors.text, fontSize: 18, fontWeight: '700' },
});
