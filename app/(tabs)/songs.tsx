import { ScreenHeader } from '@/src/components/ScreenHeader';
import { SongCard } from '@/src/components/SongCard';
import { mockCatalog } from '@/src/data/mockCatalog';
import { getArtistById } from '@/src/domain/selectors';
import { theme } from '@/src/theme/tokens';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function SongsScreen() {
    return (
        <View style={styles.container}>
            <ScreenHeader title="Canciones" subtitle="Descubre el catálogo local" />
            <FlatList
                data={mockCatalog.songs}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const artist = getArtistById(mockCatalog, item.artistaId);
                    const album = mockCatalog.albums.find((entry) => entry.id === item.albumId);

                    return <SongCard song={item} artistName={artist?.nombre} albumTitle={album?.titulo} />;
                }}
                ListEmptyComponent={<Text style={styles.empty}>No hay canciones disponibles.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    list: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 32,
        paddingTop: theme.spacing.sm,
    },
    empty: {
        textAlign: 'center',
        color: theme.colors.muted,
        marginTop: theme.spacing.xl,
    },
});
