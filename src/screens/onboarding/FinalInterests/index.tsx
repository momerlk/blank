import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, StatusBar, Pressable, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from "react";
import { setInterests, completeOnboarding, setOnboardingCompleted } from '../../../redux/userSlice';
import { validateFinalInterests } from './helper';
import { FinalInterestState } from './types';
import { RootState } from '../../../redux';
import { interestOptions } from '../InterestsSelection/helper';

import { styles } from "./styles"

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
        dispatch(setOnboardingCompleted(true));
        navigation.navigate("HomeTabs" as never);
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
