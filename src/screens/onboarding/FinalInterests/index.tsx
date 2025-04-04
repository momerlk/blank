import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, StatusBar, Pressable, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from "react";
import { setInterests, completeOnboarding } from '../../../redux/userSlice';
import { validateFinalInterests } from './helper';
import { FinalInterestState } from './types';
import { RootState } from '../../../redux';
import { interestOptions } from '../InterestsSelection/helper';

export default function FinalInterests() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const allSelectedInterests = useSelector((state: RootState) => state.user.interests);
    const [state, setState] = useState<FinalInterestState>({
        selectedInterests: [],
        error: null
    });

    const handleBack = () => navigation.goBack();

    const toggleInterest = (value: string) => {
        setState(prev => {
            const newInterests = prev.selectedInterests.includes(value)
                ? prev.selectedInterests.filter(i => i !== value)
                : [...prev.selectedInterests, value];
            
            return {
                selectedInterests: newInterests,
                error: null
            };
        });
    };

    const handleFinish = () => {
        const validation = validateFinalInterests(state.selectedInterests);
        if (!validation.isValid) {
            setState(prev => ({ ...prev, error: validation.error }));
            return;
        }

        dispatch(setInterests(state.selectedInterests));
        dispatch(completeOnboarding());
        navigation.navigate("HomeTabs");
    };

    const availableInterests = interestOptions.filter(
        interest => allSelectedInterests.includes(interest.value)
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
                <Text style={styles.backSign}>{"← back"}</Text>
            </Pressable>

            <Text style={styles.text}>
                <Text style={styles.textBold}>Choose your top interests</Text>
            </Text>

            <Text style={styles.textRegular}>
                Select up to 3 interests that matter most to you
            </Text>

            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.interestsContainer}>
                {availableInterests.map((interest) => (
                    <Pressable
                        key={interest.id}
                        style={[
                            styles.interestButton,
                            state.selectedInterests.includes(interest.value) && styles.selectedInterest
                        ]}
                        onPress={() => toggleInterest(interest.value)}
                    >
                        <Text
                            style={[
                                styles.interestText,
                                state.selectedInterests.includes(interest.value) && styles.selectedInterestText
                            ]}
                        >
                            {interest.label}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>

            <View style={styles.buttonContainer}>
                {state.error && <Text style={styles.errorText}>{state.error}</Text>}
                <Text style={styles.textSmall}>
                    These will be shown first in your profile
                </Text>
                <Pressable
                    style={[styles.button]}
                    onPress={handleFinish}
                >
                    <Text style={styles.textBlackBold}>
                        Finish
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
    scrollContainer: {
        flex: 1,
        marginTop: 20,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 20,
        paddingBottom: 150,
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
    interestButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginVertical: 5,
    },
    selectedInterest: {
        backgroundColor: 'white',
    },
    interestText: {
        color: 'white',
        fontFamily: 'Nova-Bold',
        fontSize: 16,
    },
    selectedInterestText: {
        color: '#121212',
    },
    errorText: {
        color: "#ff6b6b",
        fontFamily: "Nova",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
});
