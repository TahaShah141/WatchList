
export const authFetch = async (endpoint: string, options?: RequestInit): Promise<Response> => {
  return fetch(endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
}

export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};
