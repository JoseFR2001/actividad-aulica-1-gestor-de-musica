import { ScreenHeader } from "@/src/components/ScreenHeader";
import { mockCatalog } from "@/src/data/mockCatalog";
import { getPlaylistSongs } from "@/src/domain/selectors";
import { theme } from "@/src/theme/tokens";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const playlistColors = ["#2CE38A", "#4DD6FF", "#FF5ACD", "#FFB84D"];

export default function PlaylistsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Playlists" subtitle="Colecciones de tu biblioteca" />
      <FlatList
        data={mockCatalog.playlists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => {
          const songs = getPlaylistSongs(mockCatalog, item.id);
          const accent = playlistColors[index % playlistColors.length];
          return (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/playlists/[id]",
                  params: { id: item.id },
                })
              }
              style={[styles.card, { borderColor: accent }]}
            >
              <View style={[styles.cover, { backgroundColor: accent }]}>
                <Text style={styles.coverText}>{songs.length}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.title}>{item.titulo}</Text>
                <Text style={styles.meta}>{item.descripcion}</Text>
                <View style={styles.footer}>
                  <Text style={styles.count}>{songs.length} canciones</Text>
                  {item.creadaPorUsuario ? (
                    <Text style={styles.tag}>Tu lista</Text>
                  ) : (
                    <Text style={styles.tag}>Curada</Text>
                  )}
                </View>
              </View>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay playlists disponibles.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  list: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 32,
    paddingTop: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  cover: {
    width: 72,
    height: 72,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  coverText: {
    color: "#07130E",
    fontWeight: "900",
    fontSize: 20,
  },
  info: { flex: 1 },
  title: { fontSize: 17, fontWeight: "800", color: theme.colors.text },
  meta: { color: theme.colors.muted, marginTop: 6, lineHeight: 20 },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  count: { color: theme.colors.primary, fontWeight: "700" },
  tag: {
    color: theme.colors.text,
    backgroundColor: "#183B2D",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: "700",
  },
  empty: {
    textAlign: "center",
    color: theme.colors.muted,
    marginTop: theme.spacing.xl,
  },
});
