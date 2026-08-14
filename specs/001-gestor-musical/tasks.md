# Tasks: Gestor musical

**Input**: Design documents from `/specs/001-gestor-musical/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Expo mobile structure and shared app conventions.

- [x] T001 Create initial app structure per implementation plan in `app/`, `src/`, and `tests/`
- [x] T002 Configure Expo app shell and routing setup in `app/_layout.tsx` and `app/(tabs)/_layout.tsx`
- [x] T003 [P] Configure shared theme and typography tokens in `src/theme/tokens.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Prepare the local data layer, shared domain contracts, and navigation foundation used by every story.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 Define shared domain types and identifiers in `src/domain/types.ts`
- [x] T005 [P] Create mock catalog data fixtures in `src/data/mockSongs.ts`, `src/data/mockArtists.ts`, `src/data/mockAlbums.ts`, `src/data/mockPlaylists.ts`, and `src/data/mockCatalog.ts`
- [x] T006 [P] Implement catalog selectors and derived helpers in `src/domain/selectors.ts`
- [x] T007 Implement favorites state logic in `src/hooks/useFavorites.ts`
- [x] T008 Add shared route metadata and navigation helpers in `src/navigation/routes.ts`
- [x] T009 Create reusable UI cards and screen header components in `src/components/ScreenHeader.tsx`, `src/components/SongCard.tsx`, `src/components/ArtistCard.tsx`, `src/components/AlbumCard.tsx`, and `src/components/PlaylistCard.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Acceder al sistema y explorar la pantalla de inicio (Priority: P1) 🎯 MVP

**Goal**: Deliver the entry flow and the home screen so the user can understand the app and navigate to the main catalog sections.

**Independent Test**: Open the app, reach the access/login flow, and confirm that the home screen shows the main sections and allows navigation to songs, artists, albums, playlists, and favorites.

### Implementation for User Story 1

- [x] T010 [P] [US1] Build the access screen in `app/(auth)/login.tsx`
- [x] T011 [P] [US1] Implement the home screen in `app/(tabs)/index.tsx`
- [x] T012 [US1] Wire the tab navigation and route labels for the main sections in `app/(tabs)/_layout.tsx`
- [ ] T013 [US1] Add home summary cards and content grouping logic in `src/features/catalog/`
- [ ] T014 [US1] Verify accessibility and Spanish labels across the entry and home screens

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Consultar canciones y ver detalle de una canción (Priority: P1)

**Goal**: Enable song discovery and detailed information for the core music catalog flow.

**Independent Test**: Open the songs list, select a song, and confirm the detail screen shows the song metadata and context without needing external systems.

### Implementation for User Story 2

- [x] T015 [P] [US2] Create the songs list screen in `app/(tabs)/songs.tsx`
- [x] T016 [P] [US2] Create the song detail screen in `app/songs/[id].tsx`
- [ ] T017 [US2] Map song metadata and related artist/album data from local mocks in `src/features/catalog/`
- [ ] T018 [US2] Add state handling for selected song and navigation back to the list view
- [ ] T019 [US2] Ensure list/detail consistency for title, artist, duration, and album context

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently.

---

## Phase 5: User Story 3 - Explorar artistas y álbumes (Priority: P2)

**Goal**: Provide catalog browsing by artist and album, including detail views for both.

**Independent Test**: Navigate to artists and albums, select an item, and confirm that the proper summary and relationships are displayed.

### Implementation for User Story 3

- [x] T020 [P] [US3] Create the artists list screen in `app/(tabs)/artists.tsx`
- [x] T021 [P] [US3] Create the artist detail screen in `app/artists/[id].tsx`
- [x] T022 [P] [US3] Create the albums list screen in `app/(tabs)/albums.tsx`
- [x] T023 [P] [US3] Create the album detail screen in `app/albums/[id].tsx`
- [ ] T024 [US3] Connect artist and album relationships to the local mock data model in `src/features/catalog/`
- [ ] T025 [US3] Add empty-state and fallback handling for missing or incomplete artist/album records

**Checkpoint**: At this point, the catalog exploration flow is independently usable.

---

## Phase 6: User Story 4 - Gestionar playlists y detalle de playlist (Priority: P1)

**Goal**: Deliver the playlist experience as a key part of simulated music management.

**Independent Test**: Open the playlists list, select one, and confirm it displays the playlist metadata and songs in an understandable structure.

### Implementation for User Story 4

- [ ] T026 [P] [US4] Create the playlists list screen in `app/(tabs)/playlists.tsx`
- [ ] T027 [P] [US4] Create the playlist detail screen in `app/playlists/[id].tsx`
- [ ] T028 [US4] Attach playlist metadata and song references from `src/data/mockPlaylists.ts` and `src/domain/selectors.ts`
- [ ] T029 [US4] Add playlist-level empty and populated states for readability and navigation
- [ ] T030 [US4] Ensure playlist detail and list screens are consistent with the app’s Spanish labeling and accessibility goals

**Checkpoint**: Playlist management is independently functional and aligned with the product experience.

---

## Phase 7: User Story 5 - Guardar contenido en favoritos (Priority: P2)

**Goal**: Let the user save and revisit preferred items from a dedicated favorites area.

**Independent Test**: Mark an item as favorite and confirm it appears in the favorites screen while remaining navigable.

### Implementation for User Story 5

- [ ] T031 [P] [US5] Create the favorites screen in `app/(tabs)/favorites.tsx`
- [ ] T032 [US5] Extend toggle actions for favorites in the existing card and detail components
- [ ] T033 [US5] Persist favorite selections in local app state using `src/hooks/useFavorites.ts`
- [ ] T034 [US5] Add favorites filtering and cross-view navigation back to the original content
- [ ] T035 [US5] Validate removal and empty-state behavior for favorites

**Checkpoint**: The complete local music manager flow is independently functional.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Finalize shared UX quality and product consistency across all stories.

- [ ] T036 [P] Review and refine keyboard, touch target, contrast, and readability across the app screens
- [ ] T037 [P] Run a product-wide visual consistency pass on home, catalog, playlist, and favorites flows
- [ ] T038 [P] Validate navigation and fallback states for all route-based detail pages in `app/`
- [ ] T039 Perform final pass on Spanish wording, labels, empty states, and metadata formatting across `src/` and `app/`
- [ ] T040 Run the quickstart validation flow from `specs/001-gestor-musical/quickstart.md` and confirm expected outcomes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Story phases (3-7)**: All depend on Foundational completion
- **Polish (Phase 8)**: Depends on all desired story phases being complete

### User Story Dependencies

- **User Story 1 (US1)**: No dependencies on other stories; MVP entry point
- **User Story 2 (US2)**: Depends on the shared catalog foundation; independent from US1 after foundation
- **User Story 3 (US3)**: Depends on the same local data model and navigation foundation
- **User Story 4 (US4)**: Depends on the shared data and UI patterns; independent once foundation exists
- **User Story 5 (US5)**: Depends on favorites state logic and shared catalog entity definitions

### Parallel Opportunities

- `T003` can run in parallel with `T001` and `T002` after setup begins
- `T005` and `T006` can be done in parallel once the data contract is defined
- `T010` and `T011` can be built in parallel during the MVP story
- `T015` and `T016` can run in parallel for the song flow
- `T020`, `T021`, `T022`, and `T023` can be implemented in parallel for the artist and album exploration
- `T026` and `T027` can run in parallel for playlist views
- `T031` and `T032` can be parallelized for the favorites flow
- Final polish tasks can run in parallel across screens and shared interactions

---

## Parallel Example: User Story 2

```bash
# Series of parallel UI tasks for the song flow
Task: "Create the songs list screen in app/(tabs)/songs.tsx"
Task: "Create the song detail screen in app/songs/[id].tsx"
Task: "Map song metadata and related artist/album data from local mocks"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the entry and home experience before adding extra story depth

### Incremental Delivery

1. Build the foundation and local mock data model
2. Add the entry and home flow
3. Add songs and song detail flow
4. Add artist and album discovery
5. Add playlists and favorites
6. Run final polish and validation

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Developer A focuses on the home/login flow
3. Developer B focuses on song and album views
4. Developer C focuses on playlists and favorites
5. Final polish is done together after feature integration
