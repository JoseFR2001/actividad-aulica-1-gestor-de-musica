import type { Song } from "@/src/domain/types";

export const mockSongs: Song[] = [
  {
    id: "song-1",
    titulo: "Ciudad de sueños",
    artistaId: "artist-1",
    albumId: "album-1",
    duracionSegundos: 214,
    genero: "Indie pop",
    descripcion:
      "Un tema que abre la noche con un pulso luminoso y mucha emoción.",
    favorito: true,
  },
  {
    id: "song-2",
    titulo: "Vértigo en la lluvia",
    artistaId: "artist-1",
    albumId: "album-1",
    duracionSegundos: 248,
    genero: "Alternativo",
    descripcion: "Una melodía con brillo de sintetizador y un ritmo lateante.",
  },
  {
    id: "song-3",
    titulo: "Río sin destino",
    artistaId: "artist-2",
    albumId: "album-2",
    duracionSegundos: 196,
    genero: "Folk",
    descripcion: "Instrumentación cálida y letras de recorrido interior.",
  },
  {
    id: "song-4",
    titulo: "Después del amanecer",
    artistaId: "artist-3",
    albumId: "album-3",
    duracionSegundos: 263,
    genero: "Electrónica",
    descripcion:
      "Transición atmosférica con energía contenida y muy evocadora.",
  },
  {
    id: "song-5",
    titulo: "Velas del puerto",
    artistaId: "artist-3",
    albumId: "album-3",
    duracionSegundos: 233,
    genero: "Synthwave",
    descripcion:
      "Un cierre nocturno con líneas melódicas profundas y espaciales.",
  },
];
