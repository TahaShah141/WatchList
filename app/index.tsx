import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Text, View } from "react-native";

import { MovieCard } from "@/components/MovieCard";
import { MovieT } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "@/components/Searchbar";
import { getMovies } from "@/lib/services/movies";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: movies, isLoading: isMovieLoading } = useQuery<MovieT[]>({
    queryFn: () => getMovies(debouncedSearchTerm),
    queryKey: ["movies", debouncedSearchTerm],
    enabled: !!debouncedSearchTerm,
  });

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        {isMovieLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
          </View>
        ) : movies && movies.length > 0 ? (
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={({ id }) => `${id}`}
            numColumns={3}
            contentContainerClassName="py-4 px-4"
          />
        ) : debouncedSearchTerm ? (
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-white text-lg text-center">
              No movies found for "{debouncedSearchTerm}"
            </Text>
            <Text className="text-neutral-400 mt-2 text-center">
              Try searching for something else.
            </Text>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-white text-2xl font-bold">Find your next watch</Text>
            <Text className="text-neutral-400 mt-2 text-center">
              Search for a movie by title to get started.
            </Text>
          </View>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View className="px-4 py-2">
          <Searchbar value={searchTerm} onChangeText={setSearchTerm} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}