import { describe, expect, it } from "@jest/globals";
import { normalizeTrack } from "../../src/data/musicApi";

describe("music api normalization", () => {
  it("maps a Deezer-like payload to a local song shape", () => {
    const normalized = normalizeTrack({
      id: 99,
      title: "Midnight Echo",
      artist: { id: 1, name: "Nova Bloom" },
      album: { id: 2, title: "Afterglow",
        cover_medium: "https://example.com/cover.jpg",
      },
      duration: 210,
      preview: "https://example.com/preview.mp3",
    });

    expect(normalized.title).toBe("Midnight Echo");
    expect(normalized.artist).toBe("Nova Bloom");
    expect(normalized.album).toBe("Afterglow");
    expect(normalized.duration).toBe(210);
  });
});
