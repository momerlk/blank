import * as ImagePicker from 'expo-image-picker';

export const pickImage = async (): Promise<string | null> => {
    try {
        // Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access media library was denied');
            return null;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }

        return null;
    } catch (error) {
        console.error('Error picking image:', error);
        return null;
    }
};

export const takePhoto = async (): Promise<string | null> => {
    try {
        // Request permission
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access camera was denied');
            return null;
        }

        // Launch camera
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }

        return null;
    } catch (error) {
        console.error('Error taking photo:', error);
        return null;
    }
};

export const validateImage = (imageUri: string | null): { isValid: boolean; error?: string } => {
    if (!imageUri) {
        return { isValid: false, error: 'Please select or take a profile picture' };
    }
    return { isValid: true };
};