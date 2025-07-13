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

export const getUpcomingMovies = async (): Promise<MovieT[]> => {
  const endpoint = `${process.env.TMDB_BASE_URL}/movie/upcoming`;
  try {
    const response = await authFetch(endpoint);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
}

export const getNowPlayingMovies = async (): Promise<MovieT[]> => {
  const endpoint = `${process.env.TMDB_BASE_URL}/movie/now_playing`;
  try {
    const response = await authFetch(endpoint);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return [];
  }
}

export const getTopRatedMovies = async (): Promise<MovieT[]> => {
  const endpoint = `${process.env.TMDB_BASE_URL}/movie/top_rated`;
  try {
    const response = await authFetch(endpoint);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
}

export const getSimilarMovies = async (id: string): Promise<MovieT[]> => {
  const endpoint = `${process.env.TMDB_BASE_URL}/movie/${id}/similar`;
  try {
    const response = await authFetch(endpoint);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return [];
  }
}

export const getRecommendedMovies = async (id: string): Promise<MovieT[]> => {
  const endpoint = `${process.env.TMDB_BASE_URL}/movie/${id}/recommendations`;
  try {
    const response = await authFetch(endpoint);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
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