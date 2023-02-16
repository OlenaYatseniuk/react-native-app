import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { useNavigation } from "@react-navigation/native";

const MainTab = createBottomTabNavigator();

export default Home = () => {
  const navigation = useNavigation();

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 85,
          paddingLeft: 60,
          paddingRight: 60,
          borderTopWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.1)",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#212121",
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: 0.8,
        },
        tabBarHideOnKeyboard: true
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => {
            return (
              <View
                style={{
                  ...styles.iconWrapper,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <Ionicons
                  name="grid-outline"
                  size={24}
                  color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <View
                style={{
                  ...styles.iconWrapper,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <AntDesign
                  name="plus"
                  size={size}
                  color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          },
          headerTitle: "Create a new post",
          headerStyle: {
            borderBottomWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.3)",
          },
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Posts")}
              style={styles.redirectBtn}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
        name="Create posts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => {
            return (
              <View
                style={{
                  ...styles.iconWrapper,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <Feather
                  name="user"
                  size={24}
                  color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  redirectBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconWrapper: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
