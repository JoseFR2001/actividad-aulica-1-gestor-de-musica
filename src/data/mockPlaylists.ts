import type { Playlist } from "@/src/domain/types";

export const mockPlaylists: Playlist[] = [
  {
    id: "playlist-1",
    titulo: "Para la tarde",
    descripcion: "Pistas suaves y luminosas para caminar sin prisas.",
    cancionesIds: ["song-1", "song-4", "song-7"],
    creadaPorUsuario: true,
  },
  {
    id: "playlist-2",
    titulo: "Cielo nocturno",
    descripcion:
      "Ritmos de madrugada con brillo sintético y una energía muy vigente.",
    cancionesIds: ["song-2", "song-5", "song-9", "song-12"],
    creadaPorUsuario: false,
  },
  {
    id: "playlist-3",
    titulo: "Latin heat",
    descripcion: "Mix de pop y urbano con sabor latino y mucha energía.",
    cancionesIds: ["song-6", "song-8", "song-10", "song-11"],
    creadaPorUsuario: true,
  },
];
