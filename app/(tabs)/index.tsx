import { ScreenHeader } from '@/src/components/ScreenHeader';
import { mockCatalog } from '@/src/data/mockCatalog';
import { getCatalogSummary } from '@/src/domain/selectors';
import { theme } from '@/src/theme/tokens';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const summary = getCatalogSummary(mockCatalog);

const sections = [
    { label: 'Canciones', value: summary.totalSongs, href: '/(tabs)/songs' as const },
    { label: 'Artistas', value: summary.totalArtists, href: '/(tabs)/artists' as const },
    { label: 'Álbumes', value: summary.totalAlbums, href: '/(tabs)/albums' as const },
    { label: 'Playlists', value: summary.totalPlaylists, href: '/(tabs)/playlists' as const },
];

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <ScreenHeader title="Inicio" subtitle="Tu biblioteca musical local" />

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
                <Text style={styles.panelTitle}>Resumen</Text>
                <Text style={styles.panelText}>
                    El catálogo incluye {summary.totalSongs} canciones, {summary.totalArtists} artistas y {summary.totalPlaylists} playlists listas para explorar.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        paddingBottom: 32,
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
});
