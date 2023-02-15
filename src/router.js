import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./screens/auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen/LoginScreen";
import Home from "./screens/mainScreens/Home/Home";

const AuthStack = createStackNavigator();

export default useRouter = (isLogined) => {
  if (!isLogined) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return <Home />;
};
