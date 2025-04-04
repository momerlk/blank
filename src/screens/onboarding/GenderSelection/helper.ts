export type Gender = 'male' | 'female' | 'other';

export const validateGenderSelection = (selectedGender: Gender | null): boolean => {
    return selectedGender !== null;
};

// If you need to make API calls related to gender selection
export const submitGenderSelection = async (gender: Gender): Promise<boolean> => {
    try {
        // TODO: Implement API call here
        return true;
    } catch (error) {
        console.error('Error submitting gender:', error);
        return false;
    }
};
