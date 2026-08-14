import type { Song } from '@/src/domain/types';
import { theme } from '@/src/theme/tokens';
import { formatDuration } from '@/src/utils/formatters';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type SongCardProps = {
    song: Song;
    artistName?: string;
    albumTitle?: string;
};

export function SongCard({ song, artistName, albumTitle }: SongCardProps) {
    return (
        <Link href={`/songs/${song.id}`} asChild>
            <Pressable style={styles.card}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{song.titulo}</Text>
                    <Text style={styles.badge}>{formatDuration(song.duracionSegundos)}</Text>
                </View>
                <Text style={styles.meta}>{artistName ?? 'Artista desconocido'}</Text>
                {albumTitle ? <Text style={styles.meta}>{albumTitle}</Text> : null}
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.card,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: theme.colors.text,
        flex: 1,
    },
    badge: {
        fontSize: 12,
        color: theme.colors.primary,
        fontWeight: '700',
        backgroundColor: theme.colors.primarySoft,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
    },
    meta: {
        marginTop: 4,
        color: theme.colors.muted,
        fontSize: 13,
    },
});
