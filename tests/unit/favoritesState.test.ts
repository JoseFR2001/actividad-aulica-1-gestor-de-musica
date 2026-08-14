import { describe, expect, it } from "@jest/globals";
import { isFavorite, toggleFavoriteId } from "../../src/hooks/useFavorites";

describe("favorites state", () => {
  it("adds then removes favorites by id", () => {
    const initial = new Set<string>();
    const added = toggleFavoriteId(initial, "song-1");
    expect(isFavorite(added, "song-1")).toBe(true);

    const removed = toggleFavoriteId(added, "song-1");
    expect(isFavorite(removed, "song-1")).toBe(false);
  });
});
