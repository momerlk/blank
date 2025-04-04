import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { View, StatusBar, Pressable, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { pickImage, takePhoto, validateImage } from './helper';
import { setProfilePicture } from '../../../redux/userSlice';

export default function ProfilePictureEntryScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [error, setError] = useState<string | undefined>();

    const handleImagePick = async () => {
        const uri = await pickImage();
        if (uri) {
            setImageUri(uri);
            setError(undefined);
        }
    };

    const handleTakePhoto = async () => {
        const uri = await takePhoto();
        if (uri) {
            setImageUri(uri);
            setError(undefined);
        }
    };

    const handleNext = () => {
        const validation = validateImage(imageUri);
        if (validation.isValid && imageUri) {
            dispatch(setProfilePicture(imageUri));
            navigation.navigate("LocationRequest");
        } else {
            setError(validation.error);
        }
    };

    const handleBack = () => navigation.goBack();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#121212" />
            <Pressable style={styles.leftItem} onPress={handleBack}>
                <Text style={styles.backSign}>← back</Text>
            </Pressable>

            <Text style={styles.text}>
                <Text style={styles.textBold}>Add a profile picture</Text>
            </Text>

            <Text style={styles.textSmall}>
                Help others recognize you by adding a profile picture
            </Text>

            <Pressable style={styles.imageContainer} onPress={handleImagePick}>
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.profileImage}
                    />
                ) : (
                    <MaterialCommunityIcons
                        name="camera-plus"
                        size={50}
                        color="white"
                    />
                )}
            </Pressable>

            {error && <Text style={styles.textError}>{error}</Text>}

            <View style={styles.uploadOptions}>
                <Pressable style={styles.optionButton} onPress={handleTakePhoto}>
                    <Text style={styles.optionText}>Take Photo</Text>
                </Pressable>
                <Pressable style={styles.optionButton} onPress={handleImagePick}>
                    <Text style={styles.optionText}>Upload Photo</Text>
                </Pressable>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, !imageUri ? styles.buttonDisabled : {}]}
                    onPress={handleNext}
                    disabled={!imageUri}
                >
                    <Text style={[
                        styles.textBlackBold,
                        !imageUri ? styles.textBlackBoldDisabled : {}
                    ]}>
                        Next
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
