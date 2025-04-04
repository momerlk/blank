import { LocationData } from './types';

export const validateLocation = (location: LocationData | null) => {
    if (!location) {
        return {
            isValid: false,
            error: 'Location is required'
        };
    }

    const { latitude, longitude } = location;
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return {
            isValid: false,
            error: 'Invalid location data'
        };
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return {
            isValid: false,
            error: 'Invalid coordinates'
        };
    }

    return {
        isValid: true,
        error: null
    };
};
