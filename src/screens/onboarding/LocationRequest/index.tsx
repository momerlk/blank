import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, StatusBar, Pressable, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import React, { useState } from "react";
import { setLocation } from '../../../redux/userSlice';
import { validateLocation } from './helper';
import { LocationState, LocationData } from './types';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#121212",
        gap: 10,
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
        alignItems: "center",
        justifyContent: "center",
        height: 60,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        alignItems: "center",
    },
    errorText: {
        color: "#ff6b6b",
        fontFamily: "Nova",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
});
