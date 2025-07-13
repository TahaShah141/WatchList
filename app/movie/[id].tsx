import { Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function MovieDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-xl">Movie ID: {id}</Text>
    </View>
  );
}