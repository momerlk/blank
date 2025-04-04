import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { View, StatusBar, Pressable, TextInput, Keyboard } from 'react-native';
import React, { useEffect, useState } from "react";
import { styles } from './styles';
import { validateName, submitName } from './helper';

export default function NameEntryScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
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

    const handleNameChange = (text: string) => {
        setName(text);
        const validation = validateName(text);
        setError(validation.error);
    };

    const handleNext = async () => {
        const validation = validateName(name);
        if (validation.isValid) {
            await submitName(name);
            navigation.navigate("AgeEntry");
        }
    };

    const handleBack = () => navigation.goBack();

    const isNextDisabled = !validateName(name).isValid;

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
                <Text style={styles.backSign}>← back</Text>
            </Pressable>
            <Text style={styles.text}>
                <Text style={styles.textBold}>What's your first name?</Text>
            </Text>

            <TextInput
                style={styles.input}
                value={name}
                onChangeText={handleNameChange}
                placeholder="Enter your name"
                placeholderTextColor="#666"
                autoFocus
            />

            {error && <Text style={styles.textError}>{error}</Text>}

            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <Text style={styles.textSmall}>
                        This is how it'll appear on your profile. You can't change it later.
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
                </View>
            )}
        </View>
    );
}
