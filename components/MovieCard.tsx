import { Image, Text, TouchableOpacity, View } from "react-native";

import { MovieT } from "@/types";
import { useRouter } from "expo-router";

type MovieCardProps = {
  movie: MovieT
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/movie/${movie.id}`)} className="py-2 w-1/3 px-2">
      <View className="rounded-md overflow-hidden">
        {movie.poster_path ? 
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}} className="w-full aspect-[2/3]" />
          :
          <View className="w-full aspect-[2/3] bg-neutral-900 justify-center items-center p-1">
            <View className="items-center">
              <Text className="text-white text-center font-bold text-sm">
                {movie.title}
              </Text>
              <Text className="text-neutral-300 text-xs">
                {movie.release_date}
              </Text>
            </View>
          </View>
        }
      </View>
    </TouchableOpacity>
  )
}
