# Research: Gestor musical

## Decision

The feature will be implemented as a single Expo mobile app with route-based screens and locally defined mock catalogs. The product will prioritize a clear tab-and-detail navigation model, Spanish UI, and a no-backend architecture.

## Rationale

The specification explicitly prohibits backend, database, social systems, AI recommendations, and real streaming. The best design is therefore a client-only app that simulates the music manager experience with explicit local entities: usuarios, canciones, artistas, álbumes, playlists and favoritos.

This choice keeps the product aligned with the constitution, reduces technical risk, and makes it easy to validate flow-by-flow in a mobile interface. The app can still feel complete because navigation patterns, hierarchy, and simulated content are designed around the actual user journeys in the spec.

## Alternatives considered

### 1. Full-stack mock architecture

- Rejected because it would imply unnecessary backend scaffolding and break the “no backend” rule.
- It also introduces complexity that is not needed for a single-user simulated experience.

### 2. Real streaming-style data model

- Rejected because the spec explicitly forbids real music playback, real streaming, downloads, and external integrations.
- It would create a mismatch between product intent and allowed scope.

### 3. Shared social or multi-user flows

- Rejected because the feature description excludes followers, chat, sharing, and synchronization.
- These features would expand scope beyond the intended local music manager experience.

## Technical findings

- Route-based navigation fits Expo + expo-router naturally for multiple app views and detail pages.
- Local data modules are the simplest source of truth for the catalog and user interactions.
- Favorites and playlist state can be managed in local app state without server persistence.
- UI contracts should be lightweight and domain-oriented rather than API-oriented, because the app is data-local and UI-first.

## Open points resolved

- No remaining clarification is required for the core product scope.
- The remaining design decisions are implementation-level and can be handled in tasks, not in the spec.
