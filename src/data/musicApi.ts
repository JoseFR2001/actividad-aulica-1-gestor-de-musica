// ===== DEEZER API TYPES =====
export type DeezerTrack = {
  id: number;
  title: string;
  artist: { id: number; name: string };
  album: { id: number; title: string; cover_medium?: string };
  duration: number;
  preview?: string;
};

export type DeezerArtist = {
  id: number;
  name: string;
  picture_medium?: string;
  nb_fan?: number;
};

export type DeezerAlbum = {
  id: number;
  title: string;
  artist: { id: number; name: string };
  cover_medium?: string;
  release_date?: string;
};

export type DeezerPlaylist = {
  id: number;
  title: string;
  description: string;
  picture_medium?: string;
  nb_tracks?: number;
};

// ===== NORMALIZED TYPES =====
export type NormalizedTrack = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  cover: string;
  duration: number;
  preview?: string;
  genre?: string;
};

export type NormalizedArtist = {
  id: string;
  name: string;
  image: string;
  followers?: number;
  genres?: string[];
};

export type NormalizedAlbum = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  cover: string;
  releaseDate?: string;
  trackCount?: number;
};

export type NormalizedPlaylist = {
  id: string;
  title: string;
  description: string;
  cover: string;
  trackCount?: number;
};

// ===== NORMALIZATION FUNCTIONS =====
export function normalizeTrack(track: DeezerTrack): NormalizedTrack {
  return {
    id: `track-${track.id}`,
    title: track.title,
    artist: track.artist?.name ?? "Artista desconocido",
    artistId: `artist-${track.artist?.id}`,
    album: track.album?.title ?? "Álbum sin título",
    albumId: `album-${track.album?.id}`,
    cover:
      track.album?.cover_medium ??
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    duration: track.duration ?? 180,
    preview: track.preview,
  };
}

function normalizeArtist(artist: DeezerArtist): NormalizedArtist {
  return {
    id: `artist-${artist.id}`,
    name: artist.name,
    image:
      artist.picture_medium ??
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    followers: artist.nb_fan,
  };
}

function normalizeAlbum(album: DeezerAlbum): NormalizedAlbum {
  return {
    id: `album-${album.id}`,
    title: album.title,
    artist: album.artist?.name ?? "Artista desconocido",
    artistId: `artist-${album.artist?.id}`,
    cover:
      album.cover_medium ??
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    releaseDate: album.release_date,
  };
}

function normalizePlaylist(playlist: DeezerPlaylist): NormalizedPlaylist {
  return {
    id: `playlist-${playlist.id}`,
    title: playlist.title,
    description: playlist.description,
    cover:
      playlist.picture_medium ??
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    trackCount: playlist.nb_tracks,
  };
}

// ===== DEEZER API FUNCTIONS =====
const DEEZER_BASE_URL = "https://api.deezer.com";

export async function fetchTrendingTracks(
  limit: number = 12,
): Promise<NormalizedTrack[]> {
  try {
    const response = await fetch(
      `${DEEZER_BASE_URL}/chart/0/tracks?limit=${limit}`,
    );
    if (!response.ok) throw new Error("Failed to fetch trending tracks");

    const data = await response.json();
    const tracks = Array.isArray(data?.data) ? data.data : [];
    return tracks.map((track: DeezerTrack) => normalizeTrack(track));
  } catch (error) {
    console.warn("Error fetching trending tracks:", error);
    return getFallbackTracks();
  }
}

export async function fetchArtistById(
  artistId: string,
): Promise<NormalizedArtist | null> {
  try {
    const id = artistId.replace("artist-", "");
    const response = await fetch(`${DEEZER_BASE_URL}/artist/${id}`);
    if (!response.ok) throw new Error("Failed to fetch artist");

    const data = await response.json();
    return normalizeArtist(data);
  } catch (error) {
    console.warn("Error fetching artist:", error);
    return null;
  }
}

export async function fetchArtistTracks(
  artistId: string,
  limit: number = 10,
): Promise<NormalizedTrack[]> {
  try {
    const id = artistId.replace("artist-", "");
    const response = await fetch(
      `${DEEZER_BASE_URL}/artist/${id}/top?limit=${limit}`,
    );
    if (!response.ok) throw new Error("Failed to fetch artist tracks");

    const data = await response.json();
    const tracks = Array.isArray(data?.data) ? data.data : [];
    return tracks.map((track: DeezerTrack) => normalizeTrack(track));
  } catch (error) {
    console.warn("Error fetching artist tracks:", error);
    return [];
  }
}

export async function fetchPopularArtists(
  limit: number = 10,
): Promise<NormalizedArtist[]> {
  try {
    const response = await fetch(
      `${DEEZER_BASE_URL}/chart/0/artists?limit=${limit}`,
    );
    if (!response.ok) throw new Error("Failed to fetch popular artists");

    const data = await response.json();
    const artists = Array.isArray(data?.data) ? data.data : [];
    return artists.map((artist: DeezerArtist) => normalizeArtist(artist));
  } catch (error) {
    console.warn("Error fetching popular artists:", error);
    return [];
  }
}

export async function searchTracks(
  query: string,
  limit: number = 10,
): Promise<NormalizedTrack[]> {
  try {
    const response = await fetch(
      `${DEEZER_BASE_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
    );
    if (!response.ok) throw new Error("Failed to search tracks");

    const data = await response.json();
    const tracks = Array.isArray(data?.data) ? data.data : [];
    return tracks.map((track: DeezerTrack) => normalizeTrack(track));
  } catch (error) {
    console.warn("Error searching tracks:", error);
    return [];
  }
}

export async function searchArtists(
  query: string,
  limit: number = 10,
): Promise<NormalizedArtist[]> {
  try {
    const response = await fetch(
      `${DEEZER_BASE_URL}/search/artist?q=${encodeURIComponent(query)}&limit=${limit}`,
    );
    if (!response.ok) throw new Error("Failed to search artists");

    const data = await response.json();
    const artists = Array.isArray(data?.data) ? data.data : [];
    return artists.map((artist: DeezerArtist) => normalizeArtist(artist));
  } catch (error) {
    console.warn("Error searching artists:", error);
    return [];
  }
}

export async function fetchPlaylistTracks(
  playlistId: string,
): Promise<NormalizedTrack[]> {
  try {
    const id = playlistId.replace("playlist-", "");
    const response = await fetch(
      `${DEEZER_BASE_URL}/playlist/${id}/tracks?limit=50`,
    );
    if (!response.ok) throw new Error("Failed to fetch playlist tracks");

    const data = await response.json();
    const tracks = Array.isArray(data?.data) ? data.data : [];
    return tracks.map((track: DeezerTrack) => normalizeTrack(track));
  } catch (error) {
    console.warn("Error fetching playlist tracks:", error);
    return [];
  }
}

export async function fetchAlbumTracks(
  albumId: string,
): Promise<NormalizedTrack[]> {
  try {
    const id = albumId.replace("album-", "");
    const response = await fetch(
      `${DEEZER_BASE_URL}/album/${id}/tracks?limit=50`,
    );
    if (!response.ok) throw new Error("Failed to fetch album tracks");

    const data = await response.json();
    const tracks = Array.isArray(data?.data) ? data.data : [];
    return tracks.map((track: DeezerTrack) => normalizeTrack(track));
  } catch (error) {
    console.warn("Error fetching album tracks:", error);
    return [];
  }
}

export async function fetchPlaylistById(
  playlistId: string,
): Promise<DeezerPlaylist | null> {
  try {
    const id = playlistId.replace("playlist-", "");
    const response = await fetch(`${DEEZER_BASE_URL}/playlist/${id}`);
    if (!response.ok) throw new Error("Failed to fetch playlist");

    return await response.json();
  } catch (error) {
    console.warn("Error fetching playlist:", error);
    return null;
  }
}

// ===== FALLBACK DATA =====
function getFallbackTracks(): NormalizedTrack[] {
  return [
    {
      id: "track-fallback-1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      artistId: "artist-fallback-1",
      album: "After Hours",
      albumId: "album-fallback-1",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
      duration: 200,
    },
    {
      id: "track-fallback-2",
      title: "Heat Waves",
      artist: "Glass Animals",
      artistId: "artist-fallback-2",
      album: "Dreamland",
      albumId: "album-fallback-2",
      cover:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
      duration: 239,
    },
    {
      id: "track-fallback-3",
      title: "As It Was",
      artist: "Harry Styles",
      artistId: "artist-fallback-3",
      album: "Harry's House",
      albumId: "album-fallback-3",
      cover:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
      duration: 173,
    },
  ];
}
