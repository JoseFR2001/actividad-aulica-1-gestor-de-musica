# UI Contracts: Gestor musical

## Scope

This project does not rely on external backend APIs. The contracts here describe the local UI and data contracts expected by the app screens and the local mock data layer.

## Route contracts

### Login / Entry

- Route: /login or equivalent entry route
- Purpose: provide a clean start screen
- Output: navigation to home screen

### Home

- Route: /home or equivalent root tab
- Purpose: summary dashboard of the main sections
- Output: navigation to songs, artists, albums, playlists, favorites

### Songs list and detail

- List route: /songs
- Detail route: /songs/[id]
- Inputs: selected song identifier
- Output: song metadata and related item context

### Artists list and detail

- List route: /artists
- Detail route: /artists/[id]
- Inputs: selected artist identifier
- Output: artist summary and album/song references

### Albums list and detail

- List route: /albums
- Detail route: /albums/[id]
- Inputs: selected album identifier
- Output: album metadata and grouped songs

### Playlists list and detail

- List route: /playlists
- Detail route: /playlists/[id]
- Inputs: selected playlist identifier
- Output: playlist title, description, and contained songs

### Favorites

- Route: /favorites
- Purpose: show saved items for quick return
- Output: list of favorite songs, albums, artists, or playlists

## Local data contract

All screens consume data from the same local mock dataset. Each entity is represented by a stable identifier and expected metadata fields documented in the data model.

## Non-goals

- Real authentication
- Real streaming
- Real subscriptions
- Real multi-user synchronization
- Social features
- External music service integration
