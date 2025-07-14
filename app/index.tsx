import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, searchMovies } from "@/lib/services/movies";
import { useQueries, useQuery } from "@tanstack/react-query";

import { MovieCard } from "@/components/MovieCard";
import { MovieListSection } from "@/components/MovieListSection";
import { MovieT } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "@/components/Searchbar";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useState } from "react";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: searchedMovies, isLoading: isSearchedMoviesLoading } = useQuery<MovieT[]>({
    queryFn: () => searchMovies(debouncedSearchTerm),
    queryKey: ["searchedMovies", debouncedSearchTerm],
    enabled: !!debouncedSearchTerm,
  });

  const [
    { data: upcomingMovies, isLoading: isUpcomingMoviesLoading },
    { data: nowPlayingMovies, isLoading: isNowPlayingMoviesLoading },
    { data: popularMovies, isLoading: isPopularMoviesLoading },
    { data: topRatedMovies, isLoading: isTopRatedMoviesLoading },
  ] = useQueries({
    queries: [
      {
        queryFn: getUpcomingMovies,
        queryKey: ["upcomingMovies"],
      },
      {
        queryFn: getNowPlayingMovies,
        queryKey: ["nowPlayingMovies"],
      },
      {
        queryFn: getPopularMovies,
        queryKey: ["popularMovies"],
      },
      {
        queryFn: getTopRatedMovies,
        queryKey: ["topRatedMovies"],
      },
    ],
  });

  const isLoading = isUpcomingMoviesLoading || isNowPlayingMoviesLoading || isPopularMoviesLoading || isTopRatedMoviesLoading;

  if (isLoading && !debouncedSearchTerm) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        <View className="flex-row justify-between items-center mx-4 my-4">
          <Text className="text-white text-3xl font-bold">WatchList</Text>
        </View>

        {debouncedSearchTerm ? (
          isSearchedMoviesLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator />
            </View>
          ) : searchedMovies && searchedMovies.length > 0 ? (
            <>
              <Text className="text-white text-xl font-bold mx-4 mb-2">Search Results for "{debouncedSearchTerm}"</Text>
              <FlatList
                data={searchedMovies}
                renderItem={({ item }) => <MovieCard movie={item} />}
                keyExtractor={({ id }) => `${id}`}
                numColumns={3}
                contentContainerClassName="py-4 px-4"
              />
            </>
          ) : (
            <View className="flex-1 items-center justify-center px-4">
              <Text className="text-white text-lg text-center">
                No movies found for "{debouncedSearchTerm}"
              </Text>
              <Text className="text-neutral-400 mt-2 text-center">
                Try searching for something else.
              </Text>
            </View>
          )
        ) : (
          <ScrollView className="flex-1">
            {upcomingMovies && upcomingMovies.length > 0 && (
              <MovieListSection
                title="Coming Soon"
                movies={upcomingMovies}
                seeAllHref="/movies/upcoming"
                iconName="calendar-outline"
              />
            )}

            {nowPlayingMovies && nowPlayingMovies.length > 0 && (
              <MovieListSection
                title="Now Playing"
                movies={nowPlayingMovies}
                seeAllHref="/movies/now-playing"
                iconName="film-outline"
              />
            )}

            {popularMovies && popularMovies.length > 0 && (
              <MovieListSection
                title="Popular"
                movies={popularMovies}
                seeAllHref="/movies/popular"
                iconName="flame-outline"
              />
            )}

            {topRatedMovies && topRatedMovies.length > 0 && (
              <MovieListSection
                title="Top Rated"
                movies={topRatedMovies}
                seeAllHref="/movies/top-rated"
                iconName="star-outline"
              />
            )}
          </ScrollView>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View className="px-4">
          <Searchbar value={searchTerm} onChangeText={setSearchTerm} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
