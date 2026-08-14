# Quickstart: Gestor musical

## Purpose

This guide provides the validation flow for the simulated music manager feature. It is designed to prove the app behaves as described in the specification without requiring a backend, database, or streaming platform.

## Prerequisites

- Expo environment configured locally
- Node.js and package manager available
- Mobile emulator or device preview configured

## Setup

1. Install project dependencies.
2. Start the Expo app in development mode.
3. Open the app in a simulator or device preview.

## Validation scenarios

### 1. Entry and home flow

- Launch the app.
- Confirm the login or access view appears.
- Confirm the home screen provides quick access to songs, artists, albums, playlists, and favorites.
- Verify the layout is legible in Spanish.

### 2. Catalog browsing

- Open the songs view.
- Select a song from the list.
- Confirm the detail view shows metadata and related context.
- Repeat this flow for an artist and an album.

### 3. Playlist exploration

- Open the playlists screen.
- Select an existing playlist.
- Verify the playlist detail shows the collection of songs and the metadata for the group.

### 4. Favorites flow

- Mark a song or playlist as favorite.
- Navigate to the favorites view.
- Confirm the saved item appears and can be revisited from the collection.

### 5. Empty and edge states

- Validate that empty or missing catalog states still present a meaningful screen instead of a broken UI.
- Check that navigation back to the list view succeeds from detail screens.

## Expected outcomes

- All main views are reachable from the top-level navigation.
- Users can understand the music catalog without a backend or real service.
- The app demonstrates the intended simulated music manager experience within the permitted feature scope.
