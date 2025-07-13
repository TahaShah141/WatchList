import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { MovieCard } from "@/components/MovieCard";
import { MovieT } from "@/types";

type MovieListSectionProps = {
  title: string;
  movies: MovieT[];
  seeAllHref: "/movies/upcoming" | "/movies/now-playing" | "/movies/popular" | "/movies/top-rated";
  iconName: keyof typeof Ionicons.glyphMap;
};

export const MovieListSection: React.FC<MovieListSectionProps> = ({
  title,
  movies,
  seeAllHref,
  iconName,
}) => {
  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center mx-4 mb-4">
        <View className="flex-row items-center">
          <Ionicons name={iconName} size={20} color="white" className="mr-2" />
          <Text className="text-white text-xl font-bold self-center">{title}</Text>
        </View>
        <Link href={seeAllHref} asChild>
          <TouchableOpacity className="flex-row items-center">
              <Text className="text-neutral-400">See All</Text>
              <Ionicons name="chevron-forward" size={16} color="#a3a3a3" />
            </TouchableOpacity>
        </Link>
      </View>
      <FlatList
        data={movies.slice(0, 10)} // Display only the first 10 entries
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <MovieCard movie={item} variant="horizontal" />} 
        contentContainerClassName="px-4"
      />
    </View>
  );
};