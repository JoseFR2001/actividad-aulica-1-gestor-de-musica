import { fetchArtistById, fetchArtistTracks } from '@/src/data/musicApi';
import { theme } from '@/src/theme/tokens';
import { formatDuration } from '@/src/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ArtistDetailScreen() {
    const params = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [artist, setArtist] = useState<{ name: string; image: string; followers?: number } | null>(null);
    const [tracks, setTracks] = useState<Array<{ id: string; title: string; artist: string; duration: number }>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArtistData = async () => {
            try {
                const artistData = await fetchArtistById(params.id);
                if (artistData) {
                    setArtist(artistData);
                    const tracksData = await fetchArtistTracks(params.id, 10);
                    setTracks(
                        tracksData.map((track) => ({
                            id: track.id,
                            title: track.title,
                            artist: track.artist,
                            duration: track.duration,
                        }))
                    );
                }
            } catch (error) {
                console.warn('Error loading artist:', error);
            } finally {
                setLoading(false);
            }
        };

        loadArtistData();
    }, [params.id]);

    if (loading) {
        return (
            <View style={styles.loadingState}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (!artist) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No se encontró el artista.</Text>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>Atrás</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.topRow}>
                <Pressable onPress={() => router.back()} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
                </Pressable>
                <View style={styles.brandBadge}>
                    <View style={styles.brandMark}>
                        <Text style={styles.brandMarkText}>S</Text>
                    </View>
                    <Text style={styles.brand}>Spolofy</Text>
                </View>
                <Pressable style={styles.iconButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.text} />
                </Pressable>
            </View>

            <View style={styles.heroCard}>
                <Image source={{ uri: artist.image }} style={styles.artistImage} />
                <View style={styles.heroContent}>
                    <Text style={styles.eyebrow}>Artista</Text>
                    <Text style={styles.artistName}>{artist.name}</Text>
                    <Text style={styles.followers}>{artist.followers ? (artist.followers / 1000000).toFixed(1) : '1'}M seguidores</Text>
                </View>
            </View>

            <View style={styles.actionBar}>
                <Pressable style={styles.primaryAction}>
                    <Text style={styles.primaryText}>Seguir</Text>
                </Pressable>
                <Pressable style={styles.secondaryAction}>
                    <Ionicons name="shuffle" size={18} color={theme.colors.text} />
                </Pressable>
            </View>

            <View style={styles.panel}>
                <Text style={styles.title}>Biografía</Text>
                <Text style={styles.text}>Disfruta de la música de {artist.name}. Uno de los artistas más populares en Spolofy.</Text>
            </View>

            {tracks.length > 0 && (
                <View style={styles.panel}>
                    <Text style={styles.title}>Top canciones</Text>
                    {tracks.map((track, index) => (
                        <View key={track.id} style={styles.songRow}>
                            <Text style={styles.songNumber}>{index + 1}</Text>
                            <View style={styles.songMeta}>
                                <Text style={styles.songTitle}>{track.title}</Text>
                                <Text style={styles.songGenre}>{track.artist}</Text>
                            </View>
                            <Text style={styles.songDuration}>{formatDuration(track.duration)}</Text>
                        </View>
                    ))}
                </View>
            )}
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
        marginBottom: theme.spacing.lg,
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
        fontSize: 12,
    },
    brand: {
        color: theme.colors.text,
        fontWeight: '700',
        fontSize: 12,
    },
    heroCard: {
        marginHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        flexDirection: 'row',
        gap: theme.spacing.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    artistImage: {
        width: 120,
        height: 120,
        borderRadius: theme.radius.lg,
    },
    heroContent: {
        flex: 1,
        justifyContent: 'center',
    },
    eyebrow: {
        color: theme.colors.primary,
        fontWeight: '700',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    artistName: {
        fontSize: 24,
        fontWeight: '900',
        color: theme.colors.text,
        marginTop: 6,
    },
    followers: {
        color: theme.colors.muted,
        marginTop: 8,
        fontWeight: '600',
    },
    actionBar: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    primaryAction: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radius.md,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    primaryText: {
        color: '#07130E',
        fontWeight: '700',
        fontSize: 14,
    },
    secondaryAction: {
        width: 48,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    panel: {
        marginHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    title: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    text: {
        color: theme.colors.muted,
        lineHeight: 22,
    },
    songRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    songNumber: {
        width: 28,
        textAlign: 'center',
        color: theme.colors.muted,
        fontWeight: '600',
        marginRight: theme.spacing.md,
    },
    songMeta: {
        flex: 1,
    },
    songTitle: {
        color: theme.colors.text,
        fontWeight: '700',
    },
    songGenre: {
        color: theme.colors.muted,
        fontSize: 12,
        marginTop: 4,
    },
    songDuration: {
        color: theme.colors.muted,
        fontWeight: '600',
        fontSize: 12,
    },
    emptyState: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingState: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: theme.colors.muted,
        fontSize: 16,
        marginBottom: theme.spacing.lg,
    },
    backButton: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    backText: {
        color: theme.colors.text,
        fontWeight: '700',
    },
});
