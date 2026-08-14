export const routes = {
  auth: {
    login: "/(auth)/login",
  },
  tabs: {
    home: "/(tabs)",
    songs: "/(tabs)/songs",
    artists: "/(tabs)/artists",
    albums: "/(tabs)/albums",
    playlists: "/(tabs)/playlists",
    favorites: "/(tabs)/favorites",
  },
  details: {
    song: (id: string) => `/songs/${id}`,
    artist: (id: string) => `/artists/${id}`,
    album: (id: string) => `/albums/${id}`,
    playlist: (id: string) => `/playlists/${id}`,
  },
};
