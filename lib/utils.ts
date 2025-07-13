
export const authFetch = async (endpoint: string, options?: RequestInit): Promise<Response> => {
  return fetch(endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }
  })
}
