import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { MovieCard } from "@/components/MovieCard";
import { MovieT } from "@/types";
import { Link } from "expo-router";

type MovieListSectionProps = {
  title: string;
  movies: MovieT[];
  seeAllHref: string;
};

export const MovieListSection: React.FC<MovieListSectionProps> = ({
  title,
  movies,
  seeAllHref,
}) => {
  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center mx-4 mb-4">
        <Text className="text-white text-xl font-bold">{title}</Text>
        <Link href={seeAllHref} asChild>
          <TouchableOpacity>
            <Text className="text-neutral-400">See All</Text>
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