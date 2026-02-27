import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore, useHealthStore } from '@/store/store';
import { useEffect } from 'react';



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { restoreSession } = useAuthStore();
  const { restoreEntries } = useHealthStore();

  useEffect(() => {
    restoreSession();
    restoreEntries()
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="app/dashboard" />
        <Stack.Screen name="app/addHealthEntry" />
        <Stack.Screen name="app/healthHistory" />
        <Stack.Screen name="app/[id]" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
