import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { MovieCard } from "@/components/MovieCard";
import { MovieT } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPopularMovies } from "@/lib/services/movies";
import { useQuery } from "@tanstack/react-query";

export default function PopularMoviesScreen() {
  const { data: movies, isLoading: isMovieLoading } = useQuery<MovieT[]>({
    queryFn: getPopularMovies,
    queryKey: ["popularMoviesFull"],
  });

  if (isMovieLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator />
      </View>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-4">
        <Text className="text-white text-lg text-center">
          No popular movies found.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Text className="text-white text-3xl font-bold text-center my-4">Popular Movies</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={({ id }) => `${id}`}
        numColumns={3}
        contentContainerClassName="py-4 px-4"
      />
    </SafeAreaView>
  );
}
