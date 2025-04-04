import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, StatusBar, Pressable, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import React, { useState } from "react";
import { setLocation } from '../../../redux/userSlice';
import { validateLocation } from './helper';
import { LocationState, LocationData } from './types';
import {styles} from "./styles"

export default function LocationRequest() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [state, setState] = useState<LocationState>({
        location: null,
        error: null,
        isLoading: false
    });

    const handleBack = () => navigation.goBack();

    const handleRequestLocation = async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setState(prev => ({
                    ...prev,
                    error: 'Permission to access location was denied',
                    isLoading: false
                }));
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const locationData: LocationData = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            };

            const validation = validateLocation(locationData);
            if (!validation.isValid) {
                setState(prev => ({
                    ...prev,
                    error: validation.error,
                    isLoading: false
                }));
                return;
            }

            dispatch(setLocation(locationData));
            navigation.navigate("InterestsSelection");
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: 'Failed to get location. Please try again.',
                isLoading: false
            }));
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
                <Text style={styles.backSign}>{"← back"}</Text>
            </Pressable>

            <Text style={styles.text}>
                <Text style={styles.textBold}>Enable location services</Text>
            </Text>

            <Text style={styles.textRegular}>
                We'll use your location to show you relevant content and connect you with people nearby
            </Text>

            <View style={styles.buttonContainer}>
                {state.error && <Text style={styles.errorText}>{state.error}</Text>}
                <Text style={styles.textSmall}>
                    You can always change this later in your device settings
                </Text>
                <Pressable
                    style={[styles.button, state.isLoading ? { backgroundColor: "#2E2E2E" } : {}]}
                    onPress={handleRequestLocation}
                    disabled={state.isLoading}
                >
                    {state.isLoading ? (
                        <ActivityIndicator color="#777777" />
                    ) : (
                        <Text style={[styles.textBlackBold, state.isLoading ? { color: "#777777" } : {}]}>
                            Allow Location Access
                        </Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
}