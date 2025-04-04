import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, StatusBar, Pressable, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import { setInterests } from '../../../redux/userSlice';
import { validateInterests, interestOptions } from './helper';
import { InterestState } from './types';
import {styles} from "./styles"

export default function InterestsSelection() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [state, setState] = useState<InterestState>({
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

    const handleNext = () => {
        const validation = validateInterests(state.selectedInterests);
        if (!validation.isValid) {
            setState(prev => ({ ...prev, error: validation.error }));
            return;
        }

        dispatch(setInterests(state.selectedInterests));
        navigation.navigate("FinalInterests");
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
                <Text style={styles.backSign}>{"← back"}</Text>
            </Pressable>

            <Text style={styles.text}>
                <Text style={styles.textBold}>What are you into?</Text>
            </Text>

            <Text style={styles.textRegular}>
                Select up to 5 interests to help us personalize your experience
            </Text>

            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.interestsContainer}>
                {interestOptions.map((interest) => (
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
                    You can always update your interests later
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