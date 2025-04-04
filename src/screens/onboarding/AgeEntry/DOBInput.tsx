import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { validateDOB } from "./helper";

interface DOBInputProps {
  onValidation: (isValid: boolean) => void;
  onDOBChange: (dob: string[]) => void;
}

export default function DOBInput({ onValidation, onDOBChange }: DOBInputProps) {
  const [dob, setDob] = useState(["", "", "/", "", "", "/", "", "", "", ""]);
  const [error, setError] = useState<string | undefined>();
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const validation = validateDOB(dob);
    onValidation(validation.isValid);
    setError(validation.error);
    onDOBChange(dob);
  }, [dob, onValidation, onDOBChange]);

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
    <View>
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
      {error && <Text style={styles.error}>{error}</Text>}
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
  error: {
    color: "#ff6b6b",
    fontFamily: "Nova",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
});
