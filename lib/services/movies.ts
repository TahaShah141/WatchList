import { MovieT } from "@/types";
import { authFetch } from "../utils";

export const getMovies = async (searchTerm: string): Promise<MovieT[]> => {
  console.log("SEARCHING", searchTerm)
  const endpoint = `${process.env.TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`;
  try {
    const response = await authFetch(endpoint);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movie:', error);
    return [];
  }
}