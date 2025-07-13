import { MovieDetailsT, MovieT } from "@/types";

import { authFetch } from "../utils";

export const searchMovies = async (searchTerm: string): Promise<MovieT[]> => {
  const endpoint = `${process.env.TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`;
  try {
    const response = await authFetch(endpoint);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

export const getPopularMovies = async (): Promise<MovieT[]> => {
  const endpoint = `${process.env.TMDB_BASE_URL}/movie/popular`;
  try {
    const response = await authFetch(endpoint);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
}

export const getMovie = async (id: string): Promise<MovieDetailsT | undefined> => {

  const endpoint = `${process.env.TMDB_BASE_URL}/movie/${id}`

  try {
    const response = await authFetch(endpoint);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return undefined
  }
} 