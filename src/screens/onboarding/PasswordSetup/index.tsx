import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, StatusBar, Pressable, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import { validatePassword } from './helper';
import { PasswordState } from './types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PasswordSetup() {
    const navigation = useNavigation();
    const [state, setState] = useState<PasswordState>({
        password: '',
        confirmPassword: '',
        error: null,
        showPassword: false,
        showConfirmPassword: false
    });

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
                        <Icon
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
                        <Icon
                            name={state.showConfirmPassword ? "eye-off" : "eye"}
                            size={24}
                            color="#777777"
                        />
                    </Pressable>
                </View>
            </View>

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#121212",
        gap: 10,
    },
    inputContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        gap: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2E2E2E',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        color: "white",
        fontFamily: "Nova",
        fontSize: 18,
        paddingVertical: 15,
    },
    eyeIcon: {
        padding: 10,
    },
    text: {
        color: "white",
        fontFamily: "Nova",
        fontSize: 38,
        marginLeft: 20,
        marginRight: 20,
    },
    textBold: {
        color: "white",
        fontFamily: "Nova-Bold",
        fontSize: 33,
    },
    textRegular: {
        color: "white",
        fontFamily: "Nova-Bold",
        fontSize: 22,
        marginVertical: 20,
        marginHorizontal: 30,
        textAlign: "center",
    },
    textSmall: {
        color: "white",
        fontFamily: "Nova-Bold",
        fontSize: 14,
        marginVertical: 20,
        marginHorizontal: 30,
        textAlign: "center",
    },
    textBlackBold: {
        color: "black",
        fontFamily: "Nova-Bold",
        fontSize: 22,
        marginHorizontal: 70,
        textAlign: "center",
    },
    leftItem: {
        alignSelf: "flex-start",
        marginHorizontal: 20
    },
    backSign: {
        color: "white",
        fontFamily: "Nova-Bold",
        textAlign: "left",
        fontSize: 25
    },
    button: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 50,
        marginVertical: 10,
        width: "85%",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#121212",
        paddingTop: 20,
    },
    errorText: {
        color: "#ff6b6b",
        fontFamily: "Nova",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
});
