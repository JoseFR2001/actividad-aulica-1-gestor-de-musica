import { theme } from '@/src/theme/tokens';
import { StyleSheet, Text, View } from 'react-native';

type ScreenHeaderProps = {
    title: string;
    subtitle?: string;
};

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
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
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: theme.colors.text,
    },
    subtitle: {
        marginTop: theme.spacing.xs,
        color: theme.colors.muted,
        fontSize: 15,
    },
});
