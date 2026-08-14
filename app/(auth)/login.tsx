import { theme } from '@/src/theme/tokens';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.eyebrow}>Gestor musical</Text>
                <Text style={styles.title}>Accede a tu biblioteca</Text>
                <Text style={styles.subtitle}>
                    Explora canciones, artistas, álbumes y playlists desde un catálogo local y organizado.
                </Text>

                <View style={styles.list}>
                    <Text style={styles.feature}>• Inicio con resumen del catálogo</Text>
                    <Text style={styles.feature}>• Búsqueda rápida por canciones y artistas</Text>
                    <Text style={styles.feature}>• Favoritos y playlists personalizadas</Text>
                </View>

                <Link href="/(tabs)" asChild>
                    <Pressable accessibilityLabel="Entrar al gestor musical" style={styles.button}>
                        <Text style={styles.buttonText}>Entrar</Text>
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
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    eyebrow: {
        color: theme.colors.primary,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: theme.spacing.sm,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.muted,
        lineHeight: 22,
        marginBottom: theme.spacing.md,
    },
    list: {
        marginBottom: theme.spacing.xl,
    },
    feature: {
        color: theme.colors.text,
        fontSize: 15,
        marginBottom: 6,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radius.md,
        paddingVertical: theme.spacing.md,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});
