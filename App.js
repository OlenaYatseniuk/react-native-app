import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

import RegistrationScreen from "./src/screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    async function loadFonts() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.log(error.message);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  return <RegistrationScreen />;
  // return <LoginScreen />;
}
