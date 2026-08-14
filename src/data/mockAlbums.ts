import type { Album } from "@/src/domain/types";

export const mockAlbums: Album[] = [
  {
    id: "album-1",
    titulo: "Maldición",
    artistaId: "artist-1",
    anio: 2024,
    descripcion:
      "Un disco con energía urbana, letras directas y un sentimiento muy actual.",
    cancionesIds: ["song-1", "song-2"],
  },
  {
    id: "album-2",
    titulo: "Noche eterna",
    artistaId: "artist-1",
    anio: 2023,
    descripcion:
      "Líneas íntimas y ritmos densos para los momentos más oscuros y reflexivos.",
    cancionesIds: ["song-3"],
  },
  {
    id: "album-3",
    titulo: "Te amo",
    artistaId: "artist-2",
    anio: 2024,
    descripcion: "Pop latino con brillo, actitud y melodías muy pegadizas.",
    cancionesIds: ["song-4", "song-5"],
  },
  {
    id: "album-4",
    titulo: "Frida",
    artistaId: "artist-2",
    anio: 2022,
    descripcion:
      "Un trabajo con melodías amplias y una identidad muy visual y moderna.",
    cancionesIds: ["song-6"],
  },
  {
    id: "album-5",
    titulo: "Lali",
    artistaId: "artist-3",
    anio: 2025,
    descripcion:
      "Un mix de pop, dance y personalidad que explora la energía del escenario.",
    cancionesIds: ["song-7", "song-8"],
  },
  {
    id: "album-6",
    titulo: "Antes de Ameri",
    artistaId: "artist-4",
    anio: 2024,
    descripcion:
      "Trap, actitud y hooks certeros con un enfoque muy contemporáneo.",
    cancionesIds: ["song-9", "song-10"],
  },
  {
    id: "album-7",
    titulo: "La ausencia",
    artistaId: "artist-5",
    anio: 2025,
    descripcion:
      "Un viaje intenso con una mezcla de rap y melodía muy atractiva.",
    cancionesIds: ["song-11", "song-12"],
  },
];
