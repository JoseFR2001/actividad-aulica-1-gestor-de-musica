import type { Artist } from "@/src/domain/types";

export const mockArtists: Artist[] = [
  {
    id: "artist-1",
    nombre: "Auralia",
    generoPrincipal: "Indie pop",
    biografia:
      "Proyecto de pop emocional con melodías impulsadas por sintetizadores y letras íntimas.",
    imagen:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=700&q=80",
    albumsIds: ["album-1"],
  },
  {
    id: "artist-2",
    nombre: "Noche clara",
    generoPrincipal: "Folk",
    biografia:
      "Banda acústica que fusiona paisajes rurales con arreglos modernos y cálidos.",
    imagen:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80",
    albumsIds: ["album-2"],
  },
  {
    id: "artist-3",
    nombre: "Orbe solar",
    generoPrincipal: "Electrónica",
    biografia:
      "Artista de electrónica atmosférica con texturas evocadoras y ritmos sedantes.",
    imagen:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80",
    albumsIds: ["album-3"],
  },
];
