import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Input from "../../components/Input/Input";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const handleInputChange = (value, name) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFocus = () => {
    setIsShowKeyboard(true);
  };

  const handleSubmit = () => {
    console.log(state);
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../../assets/images/photo_BG.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "hight"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 20 : 45,
              }}
            >
              <View>
                <View style={styles.avatarWrapper}>
                  <ImageBackground
                    source={require("../../../assets/images/default-avatar.jpg")}
                    style={styles.avatar}
                  />
                </View>
                <Text style={styles.headerTitle}>Registration</Text>
              </View>
              <View style={{ marginBottom: 16 }}>
                <Input
                  value={state.login}
                  placeholder={"Login"}
                  onChangeText={(value) => handleInputChange(value, "login")}
                  onFocus={handleFocus}
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <Input
                  value={state.email}
                  placeholder={"Email"}
                  onChangeText={(value) => handleInputChange(value, "email")}
                  onFocus={handleFocus}
                />
              </View>
              <View style={{ marginBottom: 43 }}>
                <Input
                  value={state.password}
                  placeholder={"Password"}
                  onChangeText={(value) => handleInputChange(value, "password")}
                  onFocus={handleFocus}
                  password
                />
              </View>
              {!isShowKeyboard && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={() => {
                      keyboardHide();
                      handleSubmit();
                    }}
                  >
                    <Text style={styles.btnTitle}>SIGN IN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.redirectBtn}
                  >
                    <Text style={styles.redirectText}>
                      Already have an account? Log in
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    fontFamily: "Roboto-Regular",
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
  },
  //   avatarWrapper: {
  //     width: 120,
  //     height: 120,
  //     borderRadius: 16,
  //     backgroundColor: "#F6F6F6",
  //     position: "absolute",
  //     transform: [{ translateY: -140 }],
  //     alignSelf: "center",
  //     overflow: "hidden",
  //   },
  //   avatar: {
  //     flex: 1,
  //     resizeMode: "cover",
  //     borderRadius: 16,
  //   },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 15,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  redirectText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
