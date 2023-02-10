import { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";

export default function Input({ password, ...props }) {
  const [isPasswordShown, setIsPasswordShown] = useState(password);
  const [isOnFocus, setIsOnFocus] = useState(false);

  const handleInputOnFocus = () => {
    setIsOnFocus(true);
  };

  return (
    <View>
      <TextInput
        style={{
          ...styles.input,
          backgroundColor: isOnFocus ? "#FFFFFF" : "#F6F6F6",
          borderColor: isOnFocus ? "#FF6C00" : "#E8E8E8",
        }}
        onChangeText={(value) => handleInputChange(value)}
        onFocus={handleInputOnFocus}
        onBlur={() => setIsOnFocus(false)}
        secureTextEntry={isPasswordShown}
        {...props}
      />
      {password && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.showPassBtn}
        >
          <Text style={styles.showPassBtnText}>
            {!isPasswordShown ? "hide" : "show"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    placeholderTextColor: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19
  },
  showPassBtn: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    position: "absolute",
    top: "20%",
    right: 20,
  },
  showPassBtnText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.7,
    textTransform: 'capitalize'
  },
});
