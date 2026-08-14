import { fetchTrendingTracks } from '@/src/data/musicApi';
import { theme } from '@/src/theme/tokens';
import { formatDuration } from '@/src/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SongDetailScreen() {
    const params = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [song, setSong] = useState<{ id: string; title: string; artist: string; album: string; cover: string; duration: number; preview?: string } | null>(null);
    const [progress, setProgress] = useState(42);

    useEffect(() => {
        const loadSong = async () => {
            try {
                const tracks = await fetchTrendingTracks(50);
                const foundTrack = tracks.find((t) => t.id === params.id);
                if (foundTrack) {
                    setSong({
                        id: foundTrack.id,
                        title: foundTrack.title,
                        artist: foundTrack.artist,
                        album: foundTrack.album,
                        cover: foundTrack.cover,
                        duration: foundTrack.duration,
                        preview: foundTrack.preview,
                    });
                }
            } catch (error) {
                console.warn('Error loading song:', error);
            }
        };

        loadSong();
    }, [params.id]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 12 : prev + 8));
        }, 1400);

        return () => clearInterval(interval);
    }, []);

    if (!song) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Cargando canción...</Text>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>Atrás</Text>
                </Pressable>
            </View>
        );
    }

    const bars = useMemo(() => Array.from({ length: 16 }, (_, index) => 18 + ((index * 17) % 40)), []);

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

            <Image source={{ uri: song.cover }} style={styles.cover} />

            <Text style={styles.title}>{song.title}</Text>
            <Text style={styles.artist}>{song.artist}</Text>

            <View style={styles.visualizer}>
                {bars.map((height, index) => (
                    <View
                        key={`${song.id}-${index}`}
                        style={{
                            width: 6,
                            height,
                            borderRadius: 999,
                            backgroundColor: index % 2 === 0 ? theme.colors.primary : theme.colors.accent,
                            opacity: 0.6 + ((index % 5) * 0.08),
                        }}
                    />
                ))}
            </View>

            <View style={styles.progressWrapper}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
                <View style={styles.timeRow}>
                    <Text style={styles.timeText}>1:12</Text>
                    <Text style={styles.timeText}>{formatDuration(song.duration)}</Text>
                </View>
            </View>

            <View style={styles.controls}>
                <Pressable style={styles.controlButton}>
                    <Ionicons name="shuffle" size={22} color={theme.colors.text} />
                </Pressable>
                <Pressable style={styles.controlButton}>
                    <Ionicons name="play-back" size={24} color={theme.colors.text} />
                </Pressable>
                <Pressable style={styles.playButton}>
                    <Ionicons name="pause" size={28} color="#07130E" />
                </Pressable>
                <Pressable style={styles.controlButton}>
                    <Ionicons name="play-forward" size={24} color={theme.colors.text} />
                </Pressable>
                <Pressable style={styles.controlButton}>
                    <Ionicons name="repeat" size={22} color={theme.colors.text} />
                </Pressable>
            </View>

            <View style={styles.panel}>
                <Text style={styles.panelTitle}>Álbum</Text>
                <Text style={styles.panelText}>{song.album}</Text>
                <Text style={styles.panelSubtext}>Artista: {song.artist}</Text>
            </View>

            <View style={styles.panel}>
                <Text style={styles.panelTitle}>Acerca de esta canción</Text>
                <Text style={styles.description}>Disfruta de esta canción en la mejor calidad de audio. Todos nuestros tracks están optimizados para la mejor experiencia de escucha.</Text>
            </View>

            {song.preview && (
                <View style={styles.panel}>
                    <Text style={styles.panelTitle}>Vista previa</Text>
                    <Text style={styles.panelText}>Escucha un adelanto de esta canción</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { padding: theme.spacing.lg, paddingBottom: 60 },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.md,
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
    cover: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.lg,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.4,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 12 },
        elevation: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: theme.colors.text,
        marginBottom: 6,
    },
    artist: {
        fontSize: 16,
        color: theme.colors.primary,
        fontWeight: '700',
        marginBottom: theme.spacing.lg,
    },
    visualizer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 5,
        marginBottom: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
    },
    progressWrapper: {
        marginBottom: theme.spacing.lg,
    },
    progressBar: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 999,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: 999,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        color: theme.colors.muted,
        fontSize: 12,
        fontWeight: '600',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
    controlButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.06)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.4,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,
    },
    panel: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    panelTitle: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 6,
    },
    panelText: {
        color: theme.colors.muted,
        lineHeight: 22,
    },
    panelSubtext: {
        color: theme.colors.muted,
        fontSize: 13,
        marginTop: 8,
    },
    description: {
        color: theme.colors.muted,
        lineHeight: 22,
        fontSize: 14,
    },
    emptyState: {
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
