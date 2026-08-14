import { ScreenHeader } from '@/src/components/ScreenHeader';
import { mockCatalog } from '@/src/data/mockCatalog';
import { getSongById } from '@/src/domain/selectors';
import { theme } from '@/src/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen() {
    const [favorites, setFavorites] = useState<Set<string>>(new Set(['song-1', 'playlist-1']));

    const items = useMemo(() => {
        const favoriteSongs = Array.from(favorites)
            .map((id) => (id.startsWith('song-') ? getSongById(mockCatalog, id) : null))
            .filter(Boolean)
            .map((song) => ({
                id: song!.id,
                title: song!.titulo,
                type: 'Canción',
                subtitle: song!.genero,
            }));

        const favoritePlaylists = mockCatalog.playlists
            .filter((playlist) => favorites.has(playlist.id))
            .map((playlist) => ({
                id: playlist.id,
                title: playlist.titulo,
                type: 'Playlist',
                subtitle: playlist.descripcion,
            }));

        return [...favoriteSongs, ...favoritePlaylists];
    }, [favorites]);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <View style={styles.container}>
            <ScreenHeader title="Favoritos" subtitle="Tus pistas guardadas" />
            <View style={styles.summary}>
                <Text style={styles.summaryLabel}>Guardados</Text>
                <Text style={styles.summaryValue}>{items.length}</Text>
            </View>
            <FlatList
                data={items}
                keyExtractor={(item) => `${item.type}-${item.id}`}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.info}>
                            <Text style={styles.type}>{item.type}</Text>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.subtitle}>{item.subtitle}</Text>
                        </View>
                        <Pressable onPress={() => toggleFavorite(item.id)} style={styles.iconButton}>
                            <Ionicons name={favorites.has(item.id) ? 'heart' : 'heart-outline'} size={18} color={favorites.has(item.id) ? '#FF5ACD' : theme.colors.text} />
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>Todavía no tienes favoritos.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    summary: {
        marginHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: { color: theme.colors.muted, fontWeight: '700' },
    summaryValue: { color: theme.colors.primary, fontWeight: '900', fontSize: 22 },
    list: { paddingHorizontal: theme.spacing.lg, paddingBottom: 32, paddingTop: theme.spacing.sm },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
    },
    info: { flex: 1 },
    type: { color: theme.colors.primary, fontWeight: '700', marginBottom: 4 },
    title: { color: theme.colors.text, fontSize: 16, fontWeight: '700' },
    subtitle: { color: theme.colors.muted, marginTop: 4 },
    iconButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#153126',
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: { textAlign: 'center', color: theme.colors.muted, marginTop: theme.spacing.xl },
});
