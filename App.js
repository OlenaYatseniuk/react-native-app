import { useEffect } from "react";
import { Provider } from "react-redux";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { store } from "./src/redux/store";

import Main from "./src/components/Main/Main";

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
    return null;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
