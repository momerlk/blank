import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { View, StatusBar, Pressable, Keyboard } from 'react-native';
import React, { useEffect, useState } from "react";
import DOBInput from './DOBInput';
import { styles } from './styles';
import { submitDOB } from './helper';

export default function AgeEntryScreen() {
    const navigation = useNavigation();
    const [isValid, setIsValid] = useState(false);
    const [dob, setDob] = useState<string[]>([]);
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

    const handleNext = async () => {
        if (isValid) {
            await submitDOB(dob);
            navigation.navigate("GenderSelection");
        }
    };

    const handleBack = () => navigation.goBack();

    const handleValidation = (valid: boolean) => {
        setIsValid(valid);
    };

    const handleDOBChange = (newDob: string[]) => {
        setDob(newDob);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
                <Text style={styles.backSign}>← back</Text>
            </Pressable>
            <Text style={styles.text}>
                <Text style={styles.textBold}>Your b-day?</Text>
            </Text>

            <DOBInput onValidation={handleValidation} onDOBChange={handleDOBChange} />

            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <Text style={styles.textSmall}>
                        Your date of birth won't be visible on your profile. You can't change it later.
                    </Text>
                    <Pressable 
                        style={[styles.button, !isValid ? { backgroundColor: "#2E2E2E" } : {}]} 
                        onPress={handleNext}
                        disabled={!isValid}
                    >
                        <Text style={[
                            styles.textBlackBold,
                            { marginHorizontal: 110 },
                            !isValid ? { color: "#777777" } : {}
                        ]}>
                            Next
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
