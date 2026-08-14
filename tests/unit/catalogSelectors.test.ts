import { describe, expect, it } from "@jest/globals";
import { mockCatalog } from "../../src/data/mockCatalog";
import {
  getArtistById,
  getCatalogSummary,
  getSongById,
  getSongsByArtist,
} from "../../src/domain/selectors";

describe("catalog selectors", () => {
  it("exposes a summary with total counts", () => {
    const summary = getCatalogSummary(mockCatalog);

    expect(summary.totalSongs).toBeGreaterThan(0);
    expect(summary.totalArtists).toBeGreaterThan(0);
    expect(summary.totalAlbums).toBeGreaterThan(0);
    expect(summary.totalPlaylists).toBeGreaterThan(0);
  });

  it("retrieves a song and related artist data", () => {
    const song = getSongById(mockCatalog, "song-1");
    expect(song).toBeTruthy();
    expect(song?.titulo).toBe("Ciudad de sueños");
    expect(getArtistById(mockCatalog, song?.artistaId ?? "")?.nombre).toBe(
      "Auralia",
    );
  });

  it("filters songs by artist", () => {
    const artistSongs = getSongsByArtist(mockCatalog, "artist-1");
    expect(artistSongs.length).toBeGreaterThan(0);
    expect(artistSongs.every((song) => song.artistaId === "artist-1")).toBe(
      true,
    );
  });
});
