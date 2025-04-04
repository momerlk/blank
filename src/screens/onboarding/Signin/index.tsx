import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { View, StatusBar, Pressable, TextInput, Keyboard } from 'react-native';
import React, { useEffect, useState } from "react";
import { styles } from './styles';
import { SignInForm, validateForm, submitSignIn } from './helper';

export default function SignInScreen() {
    const navigation = useNavigation();
    const [form, setForm] = useState<SignInForm>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
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

    const handleInputChange = (field: keyof SignInForm, value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSignIn = async () => {
        const validation = validateForm(form);
        if (validation.isValid) {
            const success = await submitSignIn(form);
            if (success) {
                navigation.navigate("Welcome");
            }
        } else {
            setErrors(validation.errors);
        }
    };

    const handleBack = () => navigation.goBack();
    const handleForgotPassword = () => {
        // TODO: Implement forgot password navigation
        console.log('Forgot password');
    };

    const isSignInDisabled = !form.email || !form.password;

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
                <Text style={styles.backSign}>← back</Text>
            </Pressable>

            <Text style={styles.text}>
                <Text style={styles.textBold}>Welcome back!</Text>
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={form.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                />
                {errors.email && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.textError}>{errors.email}</Text>
                    </View>
                )}

                <TextInput
                    style={styles.input}
                    value={form.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    secureTextEntry
                    autoCapitalize="none"
                />
                {errors.password && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.textError}>{errors.password}</Text>
                    </View>
                )}
            </View>

            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, isSignInDisabled ? styles.buttonDisabled : {}]}
                        onPress={handleSignIn}
                        disabled={isSignInDisabled}
                    >
                        <Text style={[
                            styles.textBlackBold,
                            isSignInDisabled ? styles.textBlackBoldDisabled : {}
                        ]}>
                            Sign In
                        </Text>
                    </Pressable>
                    <Pressable style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
                        <Text style={styles.textRegular}>Forgot Password?</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}