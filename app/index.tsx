import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { MovieCard } from "@/components/MovieCard";
import { MovieT } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPopularMovies } from "@/lib/services/movies";
import { useQuery } from "@tanstack/react-query";

export default function Index() {
  const { data: popularMovies, isLoading: isPopularMoviesLoading } = useQuery<MovieT[]>({
    queryFn: getPopularMovies,
    queryKey: ["popularMovies"],
  });

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Text className="text-white text-3xl font-bold text-center my-4">Popular Movies</Text>
      {isPopularMoviesLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : popularMovies && popularMovies.length > 0 ? (
        <FlatList
          data={popularMovies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={({ id }) => `${id}`}
          numColumns={3}
          contentContainerClassName="py-4 px-4"
        />
      ) : (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-white text-lg text-center">
            No popular movies found.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}