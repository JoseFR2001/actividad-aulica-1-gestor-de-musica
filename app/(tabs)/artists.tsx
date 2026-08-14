import { ArtistCard } from '@/src/components/ArtistCard';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { mockCatalog } from '@/src/data/mockCatalog';
import { theme } from '@/src/theme/tokens';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function ArtistsScreen() {
    return (
        <View style={styles.container}>
            <ScreenHeader title="Artistas" subtitle="Explora por estilo y trayectoria" />
            <FlatList
                data={mockCatalog.artists}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => <ArtistCard artist={item} />}
                ListEmptyComponent={<Text style={styles.empty}>No hay artistas disponibles.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    list: { paddingHorizontal: theme.spacing.lg, paddingBottom: 32, paddingTop: theme.spacing.sm },
    empty: { textAlign: 'center', color: theme.colors.muted, marginTop: theme.spacing.xl },
});
