import type { Catalog } from "@/src/domain/types";
import { mockAlbums } from "./mockAlbums";
import { mockArtists } from "./mockArtists";
import { mockPlaylists } from "./mockPlaylists";
import { mockSongs } from "./mockSongs";

export const mockCatalog: Catalog = {
  songs: mockSongs,
  artists: mockArtists,
  albums: mockAlbums,
  playlists: mockPlaylists,
};
