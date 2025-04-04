import React, { useRef, useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export default function DOBInput() {
  const [dob, setDob] = useState(["", "", "/", "", "", "/", "", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {  // Only allow digits
      const newDob = [...dob];
      newDob[index] = text;
      setDob(newDob);

      if ([1, 4, 9].includes(index)) { // Skip slash positions
        inputs.current[index + 2]?.focus();
      } else {
        inputs.current[index + 1]?.focus();
      }
    } else if (text === "") { // Handle backspace
      const newDob = [...dob];
      newDob[index] = "";

      if ([3, 6].includes(index)) { // Skip slash positions
        inputs.current[index - 2]?.focus();
      } else {
        inputs.current[index - 1]?.focus();
      }

      setDob(newDob);
    }
  };

  return (
    <View style={styles.container}>
      {dob.map((digit, index) =>
        digit === "/" ? (
          <Text key={index} style={styles.slash}>/</Text>
        ) : (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            placeholder={index < 2 ? "D" : index < 5 ? "M" : "Y"}
            placeholderTextColor="gray"
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
  },
  input: {
    width: 30,
    height: 50,
    color: "white",
    fontSize: 24,
    textAlign: "center",
    backgroundColor: "#121212",
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  slash: {
    fontSize: 24,
    color: "gray",
    marginHorizontal: 5,
  },
});
