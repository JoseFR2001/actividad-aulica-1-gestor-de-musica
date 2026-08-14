export type Song = {
  id: string;
  titulo: string;
  artistaId: string;
  albumId: string;
  duracionSegundos: number;
  genero: string;
  descripcion: string;
  favorito?: boolean;
};

export type Artist = {
  id: string;
  nombre: string;
  generoPrincipal: string;
  biografia: string;
  imagen: string;
  albumsIds: string[];
};

export type Album = {
  id: string;
  titulo: string;
  artistaId: string;
  anio: number;
  descripcion: string;
  cancionesIds: string[];
};

export type Playlist = {
  id: string;
  titulo: string;
  descripcion: string;
  cancionesIds: string[];
  creadaPorUsuario: boolean;
};

export type Catalog = {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
};

export type CatalogSummary = {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalPlaylists: number;
};
