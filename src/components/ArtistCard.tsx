import type { Artist } from '@/src/domain/types';
import { theme } from '@/src/theme/tokens';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ArtistCardProps = {
    artist: Artist;
};

export function ArtistCard({ artist }: ArtistCardProps) {
    return (
        <Link href={`/artists/${artist.id}`} asChild>
            <Pressable style={styles.card}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{artist.nombre.slice(0, 2).toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{artist.nombre}</Text>
                    <Text style={styles.meta}>{artist.generoPrincipal}</Text>
                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    avatarText: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
    name: {
        fontSize: 17,
        fontWeight: '700',
        color: theme.colors.text,
    },
    meta: {
        marginTop: 4,
        color: theme.colors.muted,
        fontSize: 13,
    },
});
