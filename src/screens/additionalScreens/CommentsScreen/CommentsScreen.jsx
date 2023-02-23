import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { setCommentDate } from "../../../helpers/setCommentDate";

export default function CommentsScreen({ route }) {
  const { postId, photo } = route.params;
  const { login } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const createComment = async () => {
    try {
      const id = Date.now().toString();
      const postRef = doc(db, "posts", postId);
      
      await updateDoc(postRef, {
        comments: arrayUnion({
          login,
          comment,
          createdAt: setCommentDate(),
          id,
        }),
      });
      keyboardHide();
      setComment("");
    } catch (error) {
      console.error("Create comment error: ", error.message);
    }
  };

  const getAllComments = async () => {
    try {
      onSnapshot(doc(db, "posts", postId), (querySnapshot) =>
        setAllComments(querySnapshot.data().comments)
      );
    } catch (error) {
      console.error("Get comments error: ", error.message);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: photo }} style={styles.image} />
        </View>
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={{
                ...styles.commentWrapper,
                marginLeft: index % 2 === 0 ? "auto" : 0,
                marginRight: index % 2 == 0 ? 0 : "auto",
              }}
            >
              <Text style={styles.commentLogin}>{item.login}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.commentDate}>{item.createdAt}</Text>
            </View>
          )}
        />
        <TextInput
          value={comment}
          onChangeText={(value) => {
            setComment(value);
          }}
          textAlign="left"
          style={styles.textInput}
          placeholderTextColor="#BDBDBD"
          placeholder="Comment..."
        />
        <TouchableOpacity
          disabled={!comment}
          activeOpacity={0.8}
          onPress={createComment}
          style={{
            ...styles.postBtn,
            backgroundColor: comment ? "#FF6C00" : "#F6F6F6",
            borderWidth: comment ? null : 1,
            borderColor: comment ? null : "#BDBDBD",
          }}
        >
          <AntDesign
            name="arrowup"
            size={20}
            color={comment ? "#FFFFFF" : "#BDBDBD"}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  imageWrapper: {
    borderRadius: 8,
    height: 240,
    marginBottom: 32,
    overflow: "hidden",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  textInput: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.7,
    marginBottom: 16,
    marginTop: 16,
    paddingVertical: 13,
    paddingLeft: 16,
    paddingRight: 48,
  },
  postBtn: {
    alignItems: "center",
    bottom: 28,
    borderRadius: 100,
    height: 34,
    justifyContent: "center",
    position: "absolute",
    right: 25,
    width: 34,
  },
  commentWrapper: {
    width: "80%",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#f6f6f6",
    marginBottom: 24,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.7,
    color: "#212121",
  },
  commentLogin: {
    fontFamily: "Roboto-Medium",
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: 0.7,
    color: "#292929",
    marginBottom: 7,
    textDecorationLine: "underline",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    marginTop: 8,
  },
});
