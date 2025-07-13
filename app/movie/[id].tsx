import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MovieDetailsT } from "@/types";
import { formatRuntime } from "@/lib/utils";
import { getMovie } from "@/lib/services/movies";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

export default function MovieDetail() {
  const { id } = useLocalSearchParams();

  const { data: movieDetails, isLoading: isMovieLoading, isError, error } = useQuery<MovieDetailsT | undefined>({
    queryFn: () => getMovie(id as string),
    queryKey: ["movies", id],
    enabled: !!id,
  });

  if (isMovieLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-black p-5">
        <Text className="text-base text-red-600 text-center mb-4">
          Error: {error?.message || 'Failed to load movie details.'}
        </Text>
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-base text-neutral-400">Movie details not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView contentContainerClassName="pb-10">
        <ImageBackground
          source={{
            uri: movieDetails.backdrop_path
              ? `${process.env.TMDB_IMAGE_BASE_URL}/t/p/original${movieDetails.backdrop_path}`
              : 'https://placehold.co/384x216/cccccc/333333?text=No+Backdrop',
          }}
          className="w-full h-72 justify-end"
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
            className="absolute bottom-0 w-full h-32"
          />
        </ImageBackground>

        <View className="px-5 -mt-20">
          <View className="flex-row items-end">
            <Image
              source={{
                uri: movieDetails.poster_path
                  ? `${process.env.TMDB_IMAGE_BASE_URL}/t/p/w500${movieDetails.poster_path}`
                  : 'https://placehold.co/256x384/cccccc/333333?text=No+Poster',
              }}
              className="w-32 h-48 rounded-lg bg-neutral-800"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1 mb-2">
              <Text className="text-white text-2xl font-bold">
                {movieDetails.title}
              </Text>
              {movieDetails.tagline ? (
                <Text className="text-neutral-400 italic mt-1">
                  {movieDetails.tagline}
                </Text>
              ) : null}
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-white text-lg font-semibold">Overview</Text>
            <Text className="text-neutral-300 mt-2 leading-6">
              {movieDetails.overview || 'No overview available.'}
            </Text>
          </View>

          <View className="mt-6 flex-row justify-around bg-neutral-900 p-4 rounded-lg">
            <View className="items-center">
              <Text className="text-white font-bold text-lg">
                {movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : 'N/A'}
              </Text>
              <Text className="text-neutral-400 text-sm">Rating</Text>
            </View>
            <View className="items-center">
              <Text className="text-white font-bold text-lg">
                {movieDetails.runtime ? formatRuntime(movieDetails.runtime) : 'N/A'}
              </Text>
              <Text className="text-neutral-400 text-sm">Runtime</Text>
            </View>
            <View className="items-center">
              <Text className="text-white font-bold text-lg">
                {movieDetails.release_date ? new Date(movieDetails.release_date).getFullYear() : 'N/A'}
              </Text>
              <Text className="text-neutral-400 text-sm">Year</Text>
            </View>
          </View>

          <View className="mt-8 flex-row justify-between gap-4">
            <TouchableOpacity className="bg-neutral-800 flex-1 items-center justify-center rounded-lg p-3">
              <Ionicons name="add" size={24} color="#fff" />
              <Text className="text-white text-xs font-bold mt-1">Watchlist</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-neutral-800 flex-1 items-center justify-center rounded-lg p-3">
              <Ionicons name="star" size={24} color="#fff" />
              <Text className="text-white text-xs font-bold mt-1">Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-neutral-800 flex-1 items-center justify-center rounded-lg p-3">
              <Ionicons name="checkmark-done" size={24} color="#fff" />
              <Text className="text-white text-xs font-bold mt-1">Watched</Text>
            </TouchableOpacity>
          </View>

          {movieDetails.genres && movieDetails.genres.length > 0 && (
            <View className="mt-6">
              <Text className="text-white text-lg font-semibold">Genres</Text>
              <View className="flex-row flex-wrap mt-2">
                {movieDetails.genres.map((genre) => (
                  <View key={genre.id} className="bg-neutral-800 px-3 py-1 rounded-full mr-2 mb-2">
                    <Text className="text-white">{genre.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
