export type MovieT = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  overview: string
  poster_path: string | null
  release_date: string
  title: string
}

export type MovieDetailsT = {
  id: number;
  title: string;
  overview: string;
  tagline?: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  homepage?: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path?: string;
    backdrop_path?: string;
  };
};