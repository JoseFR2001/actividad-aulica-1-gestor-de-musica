export function isFavorite(favorites: Set<string>, itemId: string): boolean {
  return favorites.has(itemId);
}

export function toggleFavoriteId(
  favorites: Set<string>,
  itemId: string,
): Set<string> {
  const next = new Set(favorites);

  if (next.has(itemId)) {
    next.delete(itemId);
    return next;
  }

  next.add(itemId);
  return next;
}
