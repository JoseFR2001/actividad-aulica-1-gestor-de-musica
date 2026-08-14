import type { Album } from '@/src/domain/types';
import { theme } from '@/src/theme/tokens';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type AlbumCardProps = {
    album: Album;
    artistName?: string;
};

export function AlbumCard({ album, artistName }: AlbumCardProps) {
    return (
        <Link href={`/albums/${album.id}`} asChild>
            <Pressable style={styles.card}>
                <View style={styles.cover}>
                    <Text style={styles.coverText}>{album.titulo.slice(0, 2).toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{album.titulo}</Text>
                    <Text style={styles.meta}>{artistName ?? 'Artista desconocido'}</Text>
                    <Text style={styles.meta}>{album.anio}</Text>
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
    cover: {
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: theme.colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    coverText: {
        color: '#1F2937',
        fontWeight: '800',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.text,
    },
    meta: {
        marginTop: 4,
        color: theme.colors.muted,
        fontSize: 13,
    },
});
