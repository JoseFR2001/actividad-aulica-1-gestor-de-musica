import { ScreenHeader } from '@/src/components/ScreenHeader';
import { fetchPopularArtists, fetchTrendingTracks } from '@/src/data/musicApi';
import { theme } from '@/src/theme/tokens';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    const [trending, setTrending] = useState<Array<{ id: string; title: string; artist: string; cover: string }>>([]);
    const [artistsCount, setArtistsCount] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                const tracks = await fetchTrendingTracks(8);
                setTrending(tracks.slice(0, 4).map((track) => ({ id: track.id, title: track.title, artist: track.artist, cover: track.cover })));
                
                const artists = await fetchPopularArtists(50);
                setArtistsCount(artists.length);
            } catch (error) {
                console.warn('Error loading home data:', error);
            }
        };

        loadData();
    }, []);

    const sections = [
        { label: 'Canciones', value: '50+', href: '/(tabs)/songs' as const },
        { label: 'Artistas', value: artistsCount || '20+', href: '/(tabs)/artists' as const },
        { label: 'Playlists', value: '100+', href: '/(tabs)/playlists' as const },
        { label: 'Álbumes', value: '50+', href: '/(tabs)/albums' as const },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <ScreenHeader title="Spolofy" subtitle="Descubre tu siguiente favorito" />

            <View style={styles.heroCard}>
                <Text style={styles.heroEyebrow}>Trending ahora</Text>
                <Text style={styles.heroTitle}>Música para cada momento</Text>
                <Text style={styles.heroText}>Escucha las canciones más populares del mundo en tiempo real.</Text>
            </View>

            <View style={styles.grid}>
                {sections.map((section) => (
                    <Link key={section.label} href={section.href} asChild>
                        <Pressable accessibilityRole="button" style={styles.card}>
                            <Text style={styles.cardValue}>{section.value}</Text>
                            <Text style={styles.cardLabel}>{section.label}</Text>
                        </Pressable>
                    </Link>
                ))}
            </View>

            <View style={styles.panel}>
                <Text style={styles.panelTitle}>Acerca de Spolofy</Text>
                <Text style={styles.panelText}>
                    Spolofy te conecta con millones de canciones de artistas de todo el mundo. Descubre música nueva, crea playlists y disfruta de una experiencia de audio de calidad premium.
                </Text>
            </View>

            {trending.length > 0 ? (
                <View style={styles.panel}>
                    <Text style={styles.panelTitle}>Top de hoy</Text>
                    {trending.map((track) => (
                        <View key={track.id} style={styles.trackRow}>
                            <Image source={{ uri: track.cover }} style={styles.trackCover} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.trackTitle}>{track.title}</Text>
                                <Text style={styles.trackArtist}>{track.artist}</Text>
                            </View>
                            <Text style={styles.trackTag}>Top</Text>
                        </View>
                    ))}
                </View>
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        paddingBottom: 120,
    },
    heroCard: {
        marginHorizontal: theme.spacing.lg,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.lg,
        backgroundColor: '#1CA86B',
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.md,
        shadowColor: '#2CE38A',
        shadowOpacity: 0.35,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
    },
    heroEyebrow: {
        color: '#061A12',
        fontWeight: '800',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    heroTitle: {
        color: '#061A12',
        fontSize: 26,
        fontWeight: '900',
    },
    heroText: {
        color: '#0D2A1F',
        marginTop: 8,
        lineHeight: 22,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: theme.spacing.lg,
        justifyContent: 'space-between',
        gap: theme.spacing.sm,
    },
    card: {
        width: '48%',
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.lg,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.3,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },
    cardValue: {
        fontSize: 28,
        fontWeight: '800',
        color: theme.colors.primary,
    },
    cardLabel: {
        marginTop: 6,
        color: theme.colors.text,
        fontSize: 15,
        fontWeight: '600',
    },
    panel: {
        marginHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.lg,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.22,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 5,
    },
    panelTitle: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
    },
    panelText: {
        color: theme.colors.muted,
        lineHeight: 22,
    },
    trackRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
        paddingTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    trackCover: {
        width: 52,
        height: 52,
        borderRadius: 14,
        marginRight: theme.spacing.md,
    },
    trackTitle: {
        color: theme.colors.text,
        fontWeight: '700',
    },
    trackArtist: {
        color: theme.colors.muted,
        marginTop: 4,
    },
    trackTag: {
        fontSize: 10,
        fontWeight: '800',
        color: '#07130E',
        backgroundColor: theme.colors.primary,
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
});
