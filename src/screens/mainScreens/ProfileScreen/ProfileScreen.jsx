import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { logOutUser } from "../../../redux/auth/authOperations";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

import { MaterialIcons, SimpleLineIcons, Feather } from "@expo/vector-icons";

export default ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutUser);
  };

  const getAllUserPosts = async () => {
    try {
      const filter = query(
        collection(db, "posts"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(filter);
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("Error in loading all user posts", error.message);
    }
  };

  useEffect(() => {
    getAllUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/images/photo_BG.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.postsContainer}>
          <View style={styles.avatarContainer}>
            <ImageBackground
              style={styles.avatar}
              source={require("../../../../assets/images/default-avatar.jpg")}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={logOut}
            style={styles.logout}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.loginWrapper}>
            <Text style={styles.login}>{login}</Text>
          </View>
          {!userPosts.length && (
            <View>
              <Text style={styles.noPostsText}>
                You haven't no posts yet. 
              </Text>
              <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.redirectBtn}
                      onPress={() => navigation.navigate("Create posts")}
                    >
                      <Text style={styles.redirectText}>
                        To change this you can tap here
                      </Text>
                    </TouchableOpacity>
            </View>
          )}
          <FlatList
            data={userPosts}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.postWrapper}>
                <Image style={styles.image} source={{ uri: item.photo }} />
                <View style={styles.infoBox}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.infoWrapper}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate("CommentsScreen", {
                          postId: item.id,
                          photo: item.photo,
                        })
                      }
                      style={styles.commentsWrapper}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={styles.commentsCount}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate("MapScreen", item)}
                      style={styles.locationWrapper}
                    >
                      <SimpleLineIcons
                        style={styles.locationIcon}
                        name="location-pin"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={styles.location}>{item.location}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  postsContainer: {
    height: "80%",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // position:'relative'
  },
  avatarContainer: {
    alignSelf: "center",
    transform: [{ translateY: -60 }],
    position: "absolute",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatar: {
    height: 120,
    width: 120,
    resizeMode: "cover",
  },
  logout: {
    position: "absolute",
    right: 0,
    top: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  loginWrapper: {
    marginTop: 60,
    marginBottom: 30,
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.8,
    color: "#212121",
  },
  postWrapper: {
    paddingBottom: 20,
    marginTop: 10,
  },
  image: {
    borderRadius: 8,
    height: 240,
    width: "100%",
  },
  infoBox: {
    marginTop: 8,
    paddingHorizontal: 5,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.7,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  commentsWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  commentsCount: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#BDBDBD",
    lineHeight: 19,
    letterSpacing: 0.7,
    marginLeft: 5,
  },
  locationWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  location: { textDecorationLine: "underline", marginLeft: 5 },
  redirectText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
  noPostsText: {
    textAlign: 'center',
    fontSize: 16,
  }
});
