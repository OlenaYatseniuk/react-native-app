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
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import {
  FontAwesome,
  SimpleLineIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { db } from "../../../firebase/config";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

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
  const [coordinates, setCoordinates] = useState({
    latitude: 48.864716,
    longitude: 2.349014,
  });
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { userId, login, email } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
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
      await getCurrentLocation();
      setPhoto(uri);
    }
  };

  const retakePhoto = () => {
    setPhoto("");
  };

  const changeCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    const coords = {
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
    };
    setCoordinates(coords);
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();

      const photoId = Date.now().toString();

      const storage = getStorage();
      const storageRef = ref(storage, `photos/${photoId}`);

      await uploadBytes(storageRef, file);

      const photoPath = ref(storage, `photos/${photoId}`);

      const photoUrl = await getDownloadURL(photoPath);
      return photoUrl;
    } catch (error) {
      console.log("Upload photo error: ", error.message);
    }
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photo,
        title: photoInfo.title,
        location: photoInfo.location,
        coordinates,
        userId,
        login,
        email,
        createdAt: new Date()
      });
    } catch (error) {
      console.log("Upload post error: ", error.message);
    }
  };

  const postPhotoData = async () => {
    await uploadPostToServer();
    navigation.navigate("DefaultScreen");
    setPhoto("");
    setPhotoInfo(initialState);
    setCoordinates(null);
  };

  const isPhotoInfoReady = !!photo && !!photoInfo.location && !!photoInfo.title;

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
              <TouchableOpacity
                style={styles.flipCam}
                onPress={changeCameraType}
              >
                <MaterialIcons
                  name="flip-camera-android"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
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
          disabled={!isPhotoInfoReady}
          activeOpacity={0.8}
          onPress={postPhotoData}
          style={{
            ...styles.publishBtn,
            backgroundColor: isPhotoInfoReady ? "#FF6C00" : "#F6F6F6",
          }}
        >
          <Text
            style={{
              ...styles.publishBtnText,
              color: isPhotoInfoReady ? "#FFFFFF" : "#BDBDBD",
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
    height: 250,
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
  flipCam: {
    position: "absolute",
    right: 5,
    padding: 10,
    textAlign: "center",
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
    // alignSelf:'center,'
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
