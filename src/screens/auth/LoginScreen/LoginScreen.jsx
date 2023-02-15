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
import Input from "../../../components/Input/Input";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
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
    navigation.navigate('Home');
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
          source={require("../../../../assets/images/photo_BG.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "hight"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 20 : 111,
              }}
            >
              <View>
                <Text style={styles.headerTitle}>Log in</Text>
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
                    <Text style={styles.btnTitle}>LOG IN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.redirectBtn}
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.redirectText}>
                      Haven't an account yet? Register
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
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
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
