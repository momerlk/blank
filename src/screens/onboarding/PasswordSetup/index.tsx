import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, StatusBar, Pressable, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { validatePassword } from './helper';
import { PasswordState } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import { styles } from './styles';

export default function PasswordSetup() {
    const navigation = useNavigation();
    const [state, setState] = useState<PasswordState>({
        password: '',
        confirmPassword: '',
        error: null,
        showPassword: false,
        showConfirmPassword: false
    });

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardVisible(false);
        }
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    const handleBack = () => navigation.goBack();

    const handleNext = () => {
        const validation = validatePassword(state.password, state.confirmPassword);
        if (!validation.isValid) {
            setState(prev => ({ ...prev, error: validation.error }));
            return;
        }

        navigation.navigate("NameEntry");
    };

    const togglePasswordVisibility = () => {
        setState(prev => ({ ...prev, showPassword: !prev.showPassword }));
    };

    const toggleConfirmPasswordVisibility = () => {
        setState(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
                <Text style={styles.backSign}>{"← back"}</Text>
            </Pressable>

            <Text style={styles.text}>
                <Text style={styles.textBold}>Create a password</Text>
            </Text>

            <Text style={styles.textRegular}>
                Make it strong and memorable
            </Text>

            <View style={styles.inputContainer}>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#777777"
                        secureTextEntry={!state.showPassword}
                        value={state.password}
                        onChangeText={(text) => setState(prev => ({ ...prev, password: text, error: null }))}
                    />
                    <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <MaterialCommunityIcons
                            name={state.showPassword ? "eye-off" : "eye"}
                            size={24}
                            color="#777777"
                        />
                    </Pressable>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#777777"
                        secureTextEntry={!state.showConfirmPassword}
                        value={state.confirmPassword}
                        onChangeText={(text) => setState(prev => ({ ...prev, confirmPassword: text, error: null }))}
                    />
                    <Pressable onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
                        <MaterialCommunityIcons
                            name={state.showConfirmPassword ? "eye-off" : "eye"}
                            size={24}
                            color="#777777"
                        />
                    </Pressable>
                </View>
            </View>

            {!isKeyboardVisible ? 
            <View style={styles.buttonContainer}>
                {state.error && <Text style={styles.errorText}>{state.error}</Text>}
                <Text style={styles.textSmall}>
                    Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character
                </Text>
                <Pressable
                    style={[styles.button]}
                    onPress={handleNext}
                >
                    <Text style={styles.textBlackBold}>
                        Next
                    </Text>
                </Pressable>
            </View>
            : <></>}

        </View>
    );
}
