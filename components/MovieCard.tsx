import { Image, Text, TouchableOpacity, View } from "react-native";

import { MovieT } from "@/types";
import { useRouter } from "expo-router";

type MovieCardProps = {
  movie: MovieT;
  variant?: "grid" | "horizontal";
};

export const MovieCard = ({ movie, variant = "grid" }: MovieCardProps) => {
  const router = useRouter();

  const containerClasses = variant === "grid" ? "p-1.5 w-1/3" : "mr-4";
  const imageContainerClasses = variant === "grid" ? "rounded-sm overflow-hidden" : "rounded-sm overflow-hidden w-28 h-40";
  const imageClasses = variant === "grid" ? "w-full aspect-[2/3]" : "w-full h-full";
  const placeholderClasses = variant === "grid" ? "w-full aspect-[2/3] bg-neutral-900 justify-center items-center p-1" : "w-full h-full bg-neutral-900 justify-center items-center p-1";

  return (
    <TouchableOpacity onPress={() => router.push(`/movie/${movie.id}`)} className={containerClasses}>
      <View className={imageContainerClasses}>
        {movie.poster_path ? 
          <Image source={{ uri: `${process.env.TMDB_IMAGE_BASE_URL}/t/p/w500${movie.poster_path}`}} className={imageClasses} />
          :
          <View className={placeholderClasses}>
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
  );
};
