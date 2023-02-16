import { TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../../additionalScreens/DefaultScreenPosts/DefaultScreenPosts";
import CommentsScreen from "../../additionalScreens/CommentsScreen/CommentsScreen";
import MapScreen from "../../additionalScreens/MapScreen/MapScreen";

import { MaterialIcons } from "@expo/vector-icons";

const InnerScreens = createStackNavigator();

export default PostsScreen = () => {

  return (
    <InnerScreens.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: 0.7,
          color: "#212121",
        },
        headerStyle: {
          borderBottomWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
      initialRouteName="DefaultScreen"
    >
      <InnerScreens.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerTitle: "Posts",
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => console.log("Logout Click")}
              style={styles.logout}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <InnerScreens.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          headerTitle: "Comments",
          tabBarHideOnKeyboard: true,
        }}
      />
      <InnerScreens.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerTitle: "Map",
          tabBarHideOnKeyboard: true,
        }}
      />
    </InnerScreens.Navigator>
  );
};

const styles = StyleSheet.create({
  logout: {
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  redirectBtn:{paddingHorizontal: 16,
    paddingVertical: 10,}
});
