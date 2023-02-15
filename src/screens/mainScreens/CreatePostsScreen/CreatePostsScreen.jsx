import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";

import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

const initialState = {
  title: "",
  location: "",
};

export default CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoInfo, setPhotoInfo] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const photoData = {
    photo,
    photoInfo,
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      // await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const inputHandler = (value, name) => {
    setPhotoInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      // await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
      console.log("uri", uri);
    }
  };

  const retakePhoto = () => {
    setPhoto("");
  };

  const postPhotoInfo = () => {
    navigation.navigate("DefaultScreen", { photoData });
    setPhoto("");
    setPhotoInfo(initialState);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          {photo ? (
            <>
              <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{ uri: photo }} />
              </View>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={retakePhoto}
              >
                <FontAwesome name="refresh" size={20} color="white" />
              </TouchableOpacity>
            </>
          ) : (
            <Camera
              style={styles.camera}
              type={type}
              ref={(ref) => {
                setCameraRef(ref);
              }}
            >
              <View style={styles.photoView}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                  <FontAwesome name="camera" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </Camera>
          )}
        </View>
        <View style={styles.photoTitleContainer}>
          <Text style={styles.photoTitle}>
            {photo ? "Edit photo" : "Take a photo"}
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            value={photoInfo.title}
            style={styles.input}
            placeholderTextColor="#BDBDBD"
            placeholder="Title..."
            onChangeText={(value) => inputHandler(value, "title")}
          />
          <TextInput
            value={photoInfo.location}
            style={{ ...styles.input, marginTop: 16, paddingLeft: 30 }}
            placeholderTextColor="#BDBDBD"
            placeholder="Location"
            onChangeText={(value) => inputHandler(value, "location")}
          />
          <SimpleLineIcons
            style={styles.locationIcon}
            name="location-pin"
            size={24}
            color="#BDBDBD"
          />
        </View>
        <TouchableOpacity
          disabled={!photoInfo.title}
          activeOpacity={0.8}
          onPress={postPhotoInfo}
          style={{
            ...styles.publishBtn,
            backgroundColor: photoInfo.title ? "#FF6C00" : "#F6F6F6",
          }}
        >
          <Text
            style={{
              ...styles.publishBtnText,
              color: photoInfo.title ? "#FFFFFF" : "#BDBDBD",
            }}
          >
            Publish
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  photoContainer: {
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#F6F6F6",
    height: 240,
  },
  imageWrapper: {},
  image: {
    height: "100%",
    width: "100%",
  },
  refreshButton: {
    position: "absolute",
    top: 10,
    right: 10,
    alignSelf: "center",
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  photoTitleContainer: {
    marginTop: 8,
  },
  photoTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  inputWrapper: {
    marginTop: 32,
  },
  input: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
  },
  locationIcon: {
    position: "absolute",
    bottom: 17,
  },
  publishBtn: {
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#F6F6F6",
    alignItems: "center",
    paddingVertical: 16,
  },
  publishBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});