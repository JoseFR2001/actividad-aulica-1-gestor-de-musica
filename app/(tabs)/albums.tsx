import { AlbumCard } from '@/src/components/AlbumCard';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { mockCatalog } from '@/src/data/mockCatalog';
import { getArtistById } from '@/src/domain/selectors';
import { theme } from '@/src/theme/tokens';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function AlbumsScreen() {
    return (
        <View style={styles.container}>
            <ScreenHeader title="Álbumes" subtitle="Descubre colecciones por artista" />
            <FlatList
                data={mockCatalog.albums}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const artist = getArtistById(mockCatalog, item.artistaId);
                    return <AlbumCard album={item} artistName={artist?.nombre} />;
                }}
                ListEmptyComponent={<Text style={styles.empty}>No hay álbumes disponibles.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    list: { paddingHorizontal: theme.spacing.lg, paddingBottom: 32, paddingTop: theme.spacing.sm },
    empty: { textAlign: 'center', color: theme.colors.muted, marginTop: theme.spacing.xl },
});
