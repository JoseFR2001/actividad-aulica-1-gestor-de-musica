import type { Album } from "@/src/domain/types";

export const mockAlbums: Album[] = [
  {
    id: "album-1",
    titulo: "Luz de madrugada",
    artistaId: "artist-1",
    anio: 2024,
    descripcion:
      "Un disco de pop nocturno centrado en la claridad emocional después de una tormenta.",
    cancionesIds: ["song-1", "song-2"],
  },
  {
    id: "album-2",
    titulo: "Senderos de piedra",
    artistaId: "artist-2",
    anio: 2023,
    descripcion:
      "Folk íntimo con paisajes sonoros de caminos y memoria colectiva.",
    cancionesIds: ["song-3"],
  },
  {
    id: "album-3",
    titulo: "Horizonte eléctrico",
    artistaId: "artist-3",
    anio: 2025,
    descripcion:
      "Electrónica cerebral con ráfagas de luz, brillo y profundidad.",
    cancionesIds: ["song-4", "song-5"],
  },
];
