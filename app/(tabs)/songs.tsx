import { ScreenHeader } from '@/src/components/ScreenHeader';
import { fetchTrendingTracks } from '@/src/data/musicApi';
import { theme } from '@/src/theme/tokens';
import { formatDuration } from '@/src/utils/formatters';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function SongsScreen() {
    const [tracks, setTracks] = useState<Array<{ id: string; title: string; artist: string; album: string; cover: string; duration: number }>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTracks = async () => {
            try {
                const data = await fetchTrendingTracks(50);
                setTracks(
                    data.map((track) => ({
                        id: track.id,
                        title: track.title,
                        artist: track.artist,
                        album: track.album,
                        cover: track.cover,
                        duration: track.duration,
                    }))
                );
            } catch (error) {
                console.warn('Error loading tracks:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTracks();
    }, []);

    return (
        <View style={styles.container}>
            <ScreenHeader title="Spolofy" subtitle="Top tracks mundial" />
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loaderText}>Cargando canciones...</Text>
                </View>
            ) : (
                <FlatList
                    data={tracks}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <Link href={{ pathname: '/songs/[id]', params: { id: item.id } }} asChild>
                            <Pressable style={styles.songCard}>
                                <Image source={{ uri: item.cover }} style={styles.cover} />
                                <View style={styles.songInfo}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.artist}>{item.artist}</Text>
                                    <Text style={styles.album}>{item.album}</Text>
                                </View>
                                <Text style={styles.duration}>{formatDuration(item.duration)}</Text>
                            </Pressable>
                        </Link>
                    )}
                    ListEmptyComponent={<Text style={styles.empty}>No hay canciones disponibles.</Text>}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        marginTop: theme.spacing.md,
        color: theme.colors.muted,
    },
    list: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 120,
        paddingTop: theme.spacing.sm,
    },
    songCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    cover: {
        width: 62,
        height: 62,
        borderRadius: 16,
        marginRight: theme.spacing.md,
    },
    songInfo: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '800',
        color: theme.colors.text,
    },
    artist: {
        color: theme.colors.primary,
        fontWeight: '700',
        marginTop: 4,
    },
    album: {
        color: theme.colors.muted,
        marginTop: 2,
    },
    duration: {
        color: theme.colors.text,
        fontWeight: '700',
        marginLeft: theme.spacing.sm,
    },
    empty: {
        textAlign: 'center',
        color: theme.colors.muted,
        marginTop: theme.spacing.xl,
    },
});
