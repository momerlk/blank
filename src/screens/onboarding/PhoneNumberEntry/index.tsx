import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { View, StatusBar, Pressable, TextInput, Keyboard, StyleSheet } from 'react-native';
import React, { useEffect, useState } from "react";
import { validatePhoneNumber, submitPhoneNumber } from './helper';
import { styles } from "./styles"

export default function PhoneNumberScreen() {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState<string | undefined>();
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

    const handlePhoneNumberChange = (text: string) => {
        // Only allow numbers
        const numbersOnly = text.replace(/[^0-9]/g, '');
        setPhoneNumber(numbersOnly);
        const validation = validatePhoneNumber(numbersOnly);
        setError(validation.error);
    };

    const handleNext = async () => {
        const validation = validatePhoneNumber(phoneNumber);
        if (validation.isValid) {
            await submitPhoneNumber(phoneNumber);
            navigation.navigate("OTPVerification");
        }
    };

    const handleBack = () => navigation.goBack();

    const isNextDisabled = !validatePhoneNumber(phoneNumber).isValid;

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
                <Text style={styles.backSign}>← back</Text>
            </Pressable>
            <Text style={styles.text}>
                <Text style={styles.textBold}>Can we get your number?</Text>
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.countryCodeInput}
                    value="🇵🇰 +92"
                    editable={false}
                    selectTextOnFocus={false}
                />
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    keyboardType="numeric"
                    placeholder="3XX XXXXXXX"
                    placeholderTextColor="#666"
                    maxLength={10}
                    autoFocus
                />
            </View>

            {error && <Text style={styles.textError}>{error}</Text>}

            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <Text style={styles.textSmall}>
                        We'll text you a code to verify you're really you. Message and data rates may apply.
                    </Text>
                    <Pressable
                        style={[styles.button, isNextDisabled ? styles.buttonDisabled : {}]}
                        onPress={handleNext}
                        disabled={isNextDisabled}
                    >
                        <Text style={[
                            styles.textBlackBold,
                            isNextDisabled ? styles.textBlackBoldDisabled : {}
                        ]}>
                            Next
                        </Text>
                    </Pressable>
                    <Pressable style={styles.troubleButton}>
                        <Text style={styles.textRegular}>Trouble Receiving a Code?</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
