import type {
  Album,
  Artist,
  Catalog,
  CatalogSummary,
  Playlist,
  Song,
} from "@/src/domain/types";

export function getCatalogSummary(catalog: Catalog): CatalogSummary {
  return {
    totalSongs: catalog.songs.length,
    totalArtists: catalog.artists.length,
    totalAlbums: catalog.albums.length,
    totalPlaylists: catalog.playlists.length,
  };
}

export function getSongById(catalog: Catalog, id: string): Song | undefined {
  return catalog.songs.find((song) => song.id === id);
}

export function getArtistById(
  catalog: Catalog,
  id: string,
): Artist | undefined {
  return catalog.artists.find((artist) => artist.id === id);
}

export function getAlbumById(catalog: Catalog, id: string): Album | undefined {
  return catalog.albums.find((album) => album.id === id);
}

export function getPlaylistById(
  catalog: Catalog,
  id: string,
): Playlist | undefined {
  return catalog.playlists.find((playlist) => playlist.id === id);
}

export function getSongsByArtist(catalog: Catalog, artistId: string): Song[] {
  return catalog.songs.filter((song) => song.artistaId === artistId);
}

export function getAlbumSongs(catalog: Catalog, albumId: string): Song[] {
  return catalog.songs.filter((song) => song.albumId === albumId);
}

export function getPlaylistSongs(catalog: Catalog, playlistId: string): Song[] {
  const playlist = getPlaylistById(catalog, playlistId);

  if (!playlist) {
    return [];
  }

  return playlist.cancionesIds
    .map((songId) => getSongById(catalog, songId))
    .filter((song): song is Song => Boolean(song));
}
