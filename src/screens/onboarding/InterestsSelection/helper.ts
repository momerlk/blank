import { Interest } from './types';

export const interestOptions: Interest[] = [
    { id: '1', label: 'Sports', value: 'sports' },
    { id: '2', label: 'Music', value: 'music' },
    { id: '3', label: 'Art', value: 'art' },
    { id: '4', label: 'Technology', value: 'technology' },
    { id: '5', label: 'Food', value: 'food' },
    { id: '6', label: 'Travel', value: 'travel' },
    { id: '7', label: 'Gaming', value: 'gaming' },
    { id: '8', label: 'Reading', value: 'reading' },
    { id: '9', label: 'Fashion', value: 'fashion' },
    { id: '10', label: 'Photography', value: 'photography' }
];

export const validateInterests = (selectedInterests: string[]) => {
    if (!selectedInterests || selectedInterests.length === 0) {
        return {
            isValid: false,
            error: 'Please select at least one interest'
        };
    }

    if (selectedInterests.length > 5) {
        return {
            isValid: false,
            error: 'Please select no more than 5 interests'
        };
    }

    const validInterests = selectedInterests.every(interest =>
        interestOptions.some(option => option.value === interest)
    );

    if (!validInterests) {
        return {
            isValid: false,
            error: 'Invalid interest selection'
        };
    }

    return {
        isValid: true,
        error: null
    };
};
