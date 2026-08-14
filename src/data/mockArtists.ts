import type { Artist } from "@/src/domain/types";

export const mockArtists: Artist[] = [
  {
    id: "artist-1",
    nombre: "Luck Ra",
    generoPrincipal: "Trap / rap",
    biografia:
      "Luck Ra combina letras profundas, sensibilidad urbana y un estilo muy cercano al pop urbano actual.",
    imagen:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
    albumsIds: ["album-1", "album-2"],
  },
  {
    id: "artist-2",
    nombre: "Tini",
    generoPrincipal: "Pop / urbano",
    biografia:
      "Tini aporta energía, melodía y una presencia muy fuerte en el pop latino contemporáneo.",
    imagen:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
    albumsIds: ["album-3", "album-4"],
  },
  {
    id: "artist-3",
    nombre: "Lali",
    generoPrincipal: "Pop / electrónica",
    biografia:
      "Lali mezcla pop, dance y actitud con una marca muy clara de identidad propia.",
    imagen:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
    albumsIds: ["album-5"],
  },
  {
    id: "artist-4",
    nombre: "Duki",
    generoPrincipal: "Trap / hip hop",
    biografia:
      "Duki es una referencia del trap argentino con hooks memorables y una presencia visual muy fuerte.",
    imagen:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
    albumsIds: ["album-6"],
  },
  {
    id: "artist-5",
    nombre: "Tiago PZK",
    generoPrincipal: "Rap / urbano",
    biografia:
      "Tiago PZK fusiona intensidad rítmica y melodía con una propuesta muy actual del rap latino.",
    imagen:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=700&q=80",
    albumsIds: ["album-7"],
  },
];
