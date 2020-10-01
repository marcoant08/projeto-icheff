import { StatusBar } from "expo-status-bar";
import React from "react";
import AuthProvider from "./src/contexts/auth";
import TemasProvider from "./src/contexts/temas";
import { Lobster_400Regular, useFonts } from "@expo-google-fonts/lobster";
import { Arimo_400Regular, Arimo_700Bold } from "@expo-google-fonts/arimo";
import { AppLoading } from "expo";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
    Arimo_400Regular,
    Arimo_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <TemasProvider>
          <StatusBar style="light" />
          <Routes />
        </TemasProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
