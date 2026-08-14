import { theme } from '@/src/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type ScreenHeaderProps = {
    title: string;
    subtitle?: string;
};

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
    const isBrandHeader = title === 'Spolofy';

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.brandGroup}>
                    {isBrandHeader ? <View style={styles.brandMark}><Text style={styles.brandMarkText}>S</Text></View> : null}
                    <Text style={isBrandHeader ? styles.brand : styles.title}>{isBrandHeader ? 'Spolofy' : title}</Text>
                </View>
                <View style={styles.actions}>
                    <View style={styles.iconButton}>
                        <Ionicons name="search-outline" size={18} color={theme.colors.text} />
                    </View>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>SP</Text>
                    </View>
                </View>
            </View>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.md,
        backgroundColor: theme.colors.background,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brandGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    brandMark: {
        width: 28,
        height: 28,
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandMarkText: {
        color: '#07130E',
        fontWeight: '900',
        fontSize: 14,
    },
    brand: {
        fontSize: 32,
        fontWeight: '900',
        color: theme.colors.primary,
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: theme.colors.text,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#153126',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#07130E',
        fontWeight: '900',
        fontSize: 12,
    },
    subtitle: {
        marginTop: theme.spacing.xs,
        color: theme.colors.muted,
        fontSize: 15,
    },
});
