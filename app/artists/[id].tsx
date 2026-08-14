import { ScreenHeader } from '@/src/components/ScreenHeader';
import { mockCatalog } from '@/src/data/mockCatalog';
import { getAlbumById } from '@/src/domain/selectors';
import { theme } from '@/src/theme/tokens';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ArtistDetailScreen() {
    const params = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const artist = mockCatalog.artists.find((item) => item.id === params.id);

    if (!artist) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No se encontró el artista.</Text>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>Volver</Text>
                </Pressable>
            </View>
        );
    }

    const albums = artist.albumsIds.map((id) => getAlbumById(mockCatalog, id)).filter(Boolean) as Array<{ id: string; titulo: string }>;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <ScreenHeader title={artist.nombre} subtitle={artist.generoPrincipal} />
            <View style={styles.panel}>
                <Text style={styles.title}>Biografía</Text>
                <Text style={styles.text}>{artist.biografia}</Text>
            </View>
            <View style={styles.panel}>
                <Text style={styles.title}>Álbumes</Text>
                {albums.length > 0 ? (
                    albums.map((album) => (
                        <Text key={album.id} style={styles.item}>{album.titulo}</Text>
                    ))
                ) : (
                    <Text style={styles.empty}>Sin álbumes asociados.</Text>
                )}
            </View>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>Volver</Text>
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
