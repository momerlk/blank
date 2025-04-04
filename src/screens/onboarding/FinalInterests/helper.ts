export const validateFinalInterests = (selectedInterests: string[]) => {
    if (!selectedInterests || selectedInterests.length === 0) {
        return {
            isValid: false,
            error: 'Please select at least one interest'
        };
    }

    if (selectedInterests.length > 3) {
        return {
            isValid: false,
            error: 'Please select no more than 3 interests'
        };
    }

    return {
        isValid: true,
        error: null
    };
};
