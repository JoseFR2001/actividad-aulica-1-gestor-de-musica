import { theme } from '@/src/theme/tokens';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.heroGlow} />
            <View style={styles.card}>
                <Text style={styles.eyebrow}>Spolofy</Text>
                <Text style={styles.title}>Tu música en movimiento</Text>
                <Text style={styles.subtitle}>
                    Descubre playlists energéticas, artistas del momento y tus favoritos en una experiencia juvenil y vibrante.
                </Text>

                <View style={styles.list}>
                    <Text style={styles.feature}>• Títulos reales del catálogo</Text>
                    <Text style={styles.feature}>• Álbumes, artistas y tendencias</Text>
                    <Text style={styles.feature}>• Home dinámica y favoritos rápidos</Text>
                </View>

                <Link href="/(tabs)" asChild>
                    <Pressable accessibilityLabel="Entrar a Spolofy" style={styles.button}>
                        <Text style={styles.buttonText}>Empezar gratis</Text>
                    </Pressable>
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
        position: 'relative',
    },
    heroGlow: {
        position: 'absolute',
        top: 80,
        left: 40,
        right: 40,
        height: 220,
        borderRadius: 200,
        backgroundColor: theme.colors.accent,
        opacity: 0.25,
    },
    card: {
        backgroundColor: 'rgba(16, 37, 28, 0.95)',
        borderRadius: theme.radius.lg,
        padding: theme.spacing.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        zIndex: 1,
    },
    eyebrow: {
        color: theme.colors.primary,
        fontWeight: '800',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: theme.spacing.sm,
        fontSize: 18,
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.muted,
        lineHeight: 24,
        marginBottom: theme.spacing.md,
    },
    list: {
        marginBottom: theme.spacing.xl,
    },
    feature: {
        color: theme.colors.text,
        fontSize: 15,
        marginBottom: 8,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 999,
        paddingVertical: theme.spacing.md,
        alignItems: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    buttonText: {
        color: '#07130E',
        fontSize: 18,
        fontWeight: '800',
    },
});
