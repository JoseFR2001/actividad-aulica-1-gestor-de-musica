import { mockCatalog } from '@/src/data/mockCatalog';
import { getPlaylistSongs } from '@/src/domain/selectors';
import { theme } from '@/src/theme/tokens';
import { formatDuration } from '@/src/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PlaylistDetailScreen() {
    const params = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const playlist = mockCatalog.playlists.find((entry) => entry.id === params.id);

    if (!playlist) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No se encontró la playlist.</Text>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>Atrás</Text>
                </Pressable>
            </View>
        );
    }

    const songs = getPlaylistSongs(mockCatalog, playlist.id);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.topRow}>
                <Pressable onPress={() => router.back()} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
                </Pressable>
                <View style={styles.brandBadge}>
                    <View style={styles.brandMark}><Text style={styles.brandMarkText}>S</Text></View>
                    <Text style={styles.brand}>Spolofy</Text>
                </View>
                <Pressable style={styles.iconButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.text} />
                </Pressable>
            </View>

            <View style={styles.heroCard}>
                <View style={styles.cover}>
                    <Text style={styles.coverText}>{songs.length}</Text>
                </View>
                <View style={styles.heroContent}>
                    <Text style={styles.eyebrow}>{playlist.creadaPorUsuario ? 'Tu lista' : 'Curada'}</Text>
                    <Text style={styles.title}>{playlist.titulo}</Text>
                    <Text style={styles.description}>{playlist.descripcion}</Text>
                    <Text style={styles.stats}>{songs.length} canciones · 15 min</Text>
                </View>
            </View>

            <View style={styles.actionRow}>
                <Pressable style={styles.primaryAction}><Text style={styles.primaryText}>Reproducir</Text></Pressable>
                <Pressable style={styles.secondaryAction}><Ionicons name="heart-outline" size={20} color={theme.colors.text} /></Pressable>
            </View>

            <View style={styles.panel}>
                <Text style={styles.panelTitle}>Canciones</Text>
                {songs.length > 0 ? (
                    songs.map((song, index) => (
                        <View key={song.id} style={styles.trackRow}>
                            <Text style={styles.trackIndex}>{index + 1}</Text>
                            <View style={styles.trackInfo}>
                                <Text style={styles.trackTitle}>{song.titulo}</Text>
                                <Text style={styles.trackArtist}>{song.genero}</Text>
                            </View>
                            <Text style={styles.trackDuration}>{formatDuration(song.duracionSegundos)}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.empty}>La playlist está vacía.</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { paddingBottom: 32 },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.md,
    },
    iconButton: {
        width: 38,
        height: 38,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.06)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    brandMark: {
        width: 20,
        height: 20,
        borderRadius: 8,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandMarkText: {
        color: '#07130E',
        fontWeight: '900',
        fontSize: 10,
    },
    brand: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.colors.primary,
    },
    heroCard: {
        marginHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.md,
        backgroundColor: theme.colors.card,
        borderRadius: 26,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cover: {
        width: 92,
        height: 92,
        borderRadius: 24,
        backgroundColor: '#2CE38A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    coverText: {
        color: '#07130E',
        fontWeight: '900',
        fontSize: 30,
    },
    heroContent: { flex: 1 },
    eyebrow: {
        color: theme.colors.primary,
        fontWeight: '800',
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontSize: 11,
    },
    title: { color: theme.colors.text, fontSize: 26, fontWeight: '900', marginTop: 6 },
    description: { color: theme.colors.muted, marginTop: 6, lineHeight: 20 },
    stats: { color: theme.colors.muted, marginTop: 8, fontSize: 12 },
    actionRow: {
        marginHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    primaryAction: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        borderRadius: 999,
        paddingVertical: 12,
        alignItems: 'center',
    },
    primaryText: {
        color: '#07130E',
        fontWeight: '900',
    },
    secondaryAction: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#153126',
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    panel: {
        marginHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.md,
        marginTop: theme.spacing.md,
    },
    panelTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
    trackRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    trackIndex: { width: 20, color: theme.colors.muted, fontWeight: '700' },
    trackInfo: { flex: 1 },
    trackTitle: { color: theme.colors.text, fontWeight: '700' },
    trackArtist: { color: theme.colors.muted, fontSize: 12, marginTop: 2 },
    trackDuration: { color: theme.colors.muted, fontWeight: '700' },
    empty: { color: theme.colors.muted },
    backButton: { marginHorizontal: theme.spacing.lg, marginTop: theme.spacing.lg, backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: theme.spacing.md, alignItems: 'center' },
    backText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
    emptyText: { color: theme.colors.text, fontSize: 18, fontWeight: '700' },
});
