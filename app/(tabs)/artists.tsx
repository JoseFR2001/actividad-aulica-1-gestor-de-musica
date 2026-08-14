import { ScreenHeader } from '@/src/components/ScreenHeader';
import { fetchPopularArtists } from '@/src/data/musicApi';
import { theme } from '@/src/theme/tokens';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function ArtistsScreen() {
    const [artists, setArtists] = useState<Array<{ id: string; name: string; image: string }>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const data = await fetchPopularArtists(20);
                setArtists(
                    data.map((artist) => ({
                        id: artist.id,
                        name: artist.name,
                        image: artist.image,
                    }))
                );
            } catch (error) {
                console.warn('Error loading artists:', error);
            } finally {
                setLoading(false);
            }
        };

        loadArtists();
    }, []);

    return (
        <View style={styles.container}>
            <ScreenHeader title="Artistas" subtitle="Top artistas mundial" />
            <View style={styles.featuredBanner}>
                <View>
                    <Text style={styles.bannerLabel}>Populares ahora</Text>
                    <Text style={styles.bannerTitle}>Descubre talentos</Text>
                </View>
                <Text style={styles.bannerBadge}>+1M</Text>
            </View>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={artists}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <View style={styles.artistRow}>
                            <Image source={{ uri: item.image }} style={styles.artistImage} />
                            <View style={styles.artistInfo}>
                                <Text style={styles.artistName}>{item.name}</Text>
                                <Text style={styles.artistGenre}>Artista popular</Text>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.empty}>No hay artistas disponibles.</Text>}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    featuredBanner: {
        marginHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        backgroundColor: '#1A3E30',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 20,
        padding: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bannerLabel: {
        color: theme.colors.primary,
        fontWeight: '700',
        fontSize: 11,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    bannerTitle: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '800',
        marginTop: 6,
    },
    bannerBadge: {
        color: '#07130E',
        backgroundColor: theme.colors.primary,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontWeight: '800',
        fontSize: 11,
    },
    list: { paddingHorizontal: theme.spacing.lg, paddingBottom: 120, paddingTop: theme.spacing.sm },
    artistRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    artistImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: theme.spacing.md,
    },
    artistInfo: {
        flex: 1,
    },
    artistName: {
        fontSize: 16,
        fontWeight: '800',
        color: theme.colors.text,
    },
    artistGenre: {
        fontSize: 12,
        color: theme.colors.muted,
        marginTop: 4,
    },
    empty: { textAlign: 'center', color: theme.colors.muted, marginTop: theme.spacing.xl },
});
