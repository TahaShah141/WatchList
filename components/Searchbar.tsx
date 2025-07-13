import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

type SearchbarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export const Searchbar: React.FC<SearchbarProps> = ({ value, onChangeText }) => {
  return (
    <View className="flex-row bg-neutral-800 rounded-full px-4 items-center mx-4 my-4 border border-neutral-700">
      <Ionicons name="search" size={20} color="#aaa" className="mr-2" />
      <TextInput
        className="flex-1 text-white text-base font-medium py-3"
        placeholder="Search for a movie..."
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} className="p-1.5">
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};
