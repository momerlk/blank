import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { View, StatusBar, Pressable, Keyboard } from 'react-native';
import React, { useEffect, useState } from "react";
import { styles } from './styles';
import { Gender, validateGenderSelection } from './helper';

export default function GenderSelection() {
    const navigation = useNavigation();
    const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
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

    const handleGenderSelect = (gender: Gender) => {
        setSelectedGender(gender);
    };

    const handleNext = () => {
        if (validateGenderSelection(selectedGender)) {
            navigation.navigate("LocationRequest");
        }
    };
    
    const handleBack = () => navigation.goBack();

    const isNextDisabled = !validateGenderSelection(selectedGender);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
                <Text style={styles.backSign}>← back</Text>
            </Pressable>
            <Text style={styles.text}>
                <Text style={styles.textBold}>What's your gender?</Text>
            </Text>

            <Pressable 
                style={[selectedGender === 'male' ? styles.buttonSelected : styles.buttonOutline]} 
                onPress={() => handleGenderSelect('male')}
            >
                <Text style={selectedGender === 'male' ? styles.buttonSelectedText : styles.buttonOutlineText}>
                    Male
                </Text>
            </Pressable>

            <Pressable 
                style={[selectedGender === 'female' ? styles.buttonSelected : styles.buttonOutline]} 
                onPress={() => handleGenderSelect('female')}
            >
                <Text style={selectedGender === 'female' ? styles.buttonSelectedText : styles.buttonOutlineText}>
                    Female
                </Text>
            </Pressable>

            <Pressable 
                style={[selectedGender === 'other' ? styles.buttonSelected : styles.buttonOutline]} 
                onPress={() => handleGenderSelect('other')}
            >
                <Text style={selectedGender === 'other' ? styles.buttonSelectedText : styles.buttonOutlineText}>
                    Other
                </Text>
            </Pressable>

            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <Text style={styles.textSmall}>
                        This is how it'll appear on your profile. You can't change it later.
                    </Text>
                    <Pressable 
                        style={[styles.button, isNextDisabled ? { backgroundColor: "#2E2E2E" } : {}]} 
                        onPress={handleNext}
                        disabled={isNextDisabled}
                    >
                        <Text style={[
                            styles.textBlackBold,
                            { marginHorizontal: 110 },
                            isNextDisabled ? { color: "#777777" } : {}
                        ]}>
                            Next
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
