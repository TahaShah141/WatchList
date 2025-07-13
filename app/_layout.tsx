import '@/global.css';

import { Providers } from '@/components/Providers';
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Providers>
      <Stack screenOptions={{headerShown: false}} />
    </Providers>
  )
}
