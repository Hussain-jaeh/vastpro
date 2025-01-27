import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import "../global.css";
import { AuthProvider } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
 
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { flex: 1 },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="Registration" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
          <Toast />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
