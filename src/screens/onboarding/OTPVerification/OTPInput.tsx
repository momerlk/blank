import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function OTPInput() {
  const [otp, setOtp] = useState(["", "", "", ""]); // Stores 4-digit OTP
  const inputs = useRef<Array<TextInput | null>>([null, null, null, null]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {  // Only allow digits
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 3) {
        inputs.current[index + 1]?.focus(); // Move to next box
      }
    } else if (text === "") { // Handle backspace
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputs.current[index - 1]?.focus(); // Move to previous box
      }
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 50,
  },
  input: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "white",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    backgroundColor: "#121212",
    borderRadius: 10,
  },
});