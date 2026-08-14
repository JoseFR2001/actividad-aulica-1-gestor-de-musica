import type { Playlist } from "@/src/domain/types";

export const mockPlaylists: Playlist[] = [
  {
    id: "playlist-1",
    titulo: "Para la tarde",
    descripcion: "Pistas suaves y luminosas para caminar sin prisas.",
    cancionesIds: ["song-1", "song-3"],
    creadaPorUsuario: true,
  },
  {
    id: "playlist-2",
    titulo: "Cielo nocturno",
    descripcion:
      "Ritmos de madrugada con brillo sintético y evocación espacial.",
    cancionesIds: ["song-2", "song-4", "song-5"],
    creadaPorUsuario: false,
  },
];
