# Data Model: Gestor musical

## Overview

The application uses a local domain model that mirrors the simulated music experience without requiring persistent storage or backend services. The model is designed for navigation, display, and state transitions in the UI.

## Entities

### Usuario

Represents the person interacting with the app.

- id: string
- nombre: string
- idiomaPreferido: "es"
- favoritos: string[]
- playlistsFavoritas: string[]

Validation rules:

- id must be unique
- nombre must be non-empty
- favoritos must reference valid song or playlist identifiers

### Canción

Represents a playable or displayable track in the local catalog.

- id: string
- titulo: string
- artistaId: string
- albumId: string
- duracionSegundos: number
- genero: string
- descripcion: string
- favorito: boolean

Validation rules:

- titulo and artistaId are required
- duracionSegundos must be greater than 0
- albumId must resolve to an existing album when present

### Artista

Represents a musician or band.

- id: string
- nombre: string
- generoPrincipal: string
- biografia: string
- imagen: string
- albumsIds: string[]

Validation rules:

- nombre must be non-empty
- albumIds must reference valid albums if populated

### Álbum

Represents a collection of songs.

- id: string
- titulo: string
- artistaId: string
- anio: number
- descripcion: string
- cancionesIds: string[]

Validation rules:

- titulo and artistaId are required
- cancionesIds must be valid song identifiers

### Playlist

Represents a curated grouping of songs.

- id: string
- titulo: string
- descripcion: string
- cancionesIds: string[]
- creadaPorUsuario: boolean

Validation rules:

- titulo must be non-empty
- cancionesIds may be empty for a valid but empty list

### Favorito

Represents a user-selected item in the favorites collection.

- id: string
- tipo: "cancion" | "playlist" | "album" | "artista"
- entidadId: string
- agregadoEn: string

Validation rules:

- entidadId must resolve to a valid item in the local dataset
- tipo must match the referenced entity category

## Relationships

- A user has many favorite items.
- An artist has many albums.
- An album contains many songs.
- A song belongs to one artist and one album.
- A playlist contains many songs.
- A user can access local favorite items without backend synchronization.

## State transitions

- Favorite toggled on/off
- Playlist created or opened
- Song selected from list to detail view
- Artist selected from list to detail view
- Album selected from list to detail view
- Navigation returns to previous list screen

## Design constraints

- No server-side persistence
- No real media playback state
- No external provider integration
- All relationships must be derivable from static local fixtures
