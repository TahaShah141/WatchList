import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/lib/services/movies";

import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { MovieListSection } from "@/components/MovieListSection";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueries } from "@tanstack/react-query";

export default function Index() {
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

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1">
        <View className="flex-row justify-between items-center mx-4 my-4">
          <Text className="text-white text-3xl font-bold">WatchList</Text>
          <Link href="/search" asChild>
            <TouchableOpacity>
              <Ionicons name="search" size={28} color="white" />
            </TouchableOpacity>
          </Link>
        </View>

        {upcomingMovies && upcomingMovies.length > 0 && (
          <MovieListSection
            title="Coming Soon"
            movies={upcomingMovies}
            seeAllHref="/movies/upcoming"
          />
        )}

        {nowPlayingMovies && nowPlayingMovies.length > 0 && (
          <MovieListSection
            title="Now Playing"
            movies={nowPlayingMovies}
            seeAllHref="/movies/now-playing"
          />
        )}

        {popularMovies && popularMovies.length > 0 && (
          <MovieListSection
            title="Popular"
            movies={popularMovies}
            seeAllHref="/movies/popular"
          />
        )}

        {topRatedMovies && topRatedMovies.length > 0 && (
          <MovieListSection
            title="Top Rated"
            movies={topRatedMovies}
            seeAllHref="/movies/top-rated"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
