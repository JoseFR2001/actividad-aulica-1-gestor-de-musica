import { mockCatalog } from '@/src/data/mockCatalog';
import { theme } from '@/src/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const currentTrack = mockCatalog.songs[0];

export function MiniPlayer() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isFavorite, setIsFavorite] = useState(true);
    const [progress, setProgress] = useState(34);

    useEffect(() => {
        if (!isPlaying) {
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 10 : prev + 2));
        }, 1200);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <View style={styles.container}>
            <View style={styles.player}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80' }} style={styles.cover} />

                <View style={styles.info}>
                    <Text style={styles.title}>{currentTrack.titulo}</Text>
                    <Text style={styles.artist}>{mockCatalog.artists.find((artist) => artist.id === currentTrack.artistaId)?.nombre}</Text>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                </View>

                <View style={styles.actions}>
                    <Pressable onPress={() => setIsFavorite((prev) => !prev)} style={styles.actionButton}>
                        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={18} color={isFavorite ? '#FF5ACD' : theme.colors.text} />
                    </Pressable>
                    <Pressable onPress={() => setIsPlaying((prev) => !prev)} style={styles.playButton}>
                        <Ionicons name={isPlaying ? 'pause' : 'play'} size={18} color="#07130E" />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 12,
        right: 12,
        bottom: 78,
        zIndex: 20,
    },
    player: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#121d19',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#214336',
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.24,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 10 },
        elevation: 12,
    },
    cover: {
        width: 52,
        height: 52,
        borderRadius: 12,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        color: theme.colors.text,
        fontWeight: '800',
        fontSize: 14,
    },
    artist: {
        color: theme.colors.muted,
        fontSize: 11,
        marginTop: 2,
    },
    progressTrack: {
        height: 3,
        backgroundColor: '#1f332d',
        borderRadius: 999,
        overflow: 'hidden',
        marginTop: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: 999,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        gap: 10,
    },
    actionButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#183B2D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
