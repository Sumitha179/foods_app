import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import '@/global.css';

// Ensure splash screen stays until fonts load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, err] = useFonts({
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if (err) {
      console.error('Font loading error:', err);
    } else if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, err]);

  if (!fontsLoaded) return null;

  return <Stack />;
}
