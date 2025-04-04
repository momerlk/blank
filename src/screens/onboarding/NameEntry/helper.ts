export const validateName = (name: string): { isValid: boolean; error?: string } => {
    if (!name || name.trim().length === 0) {
        return { isValid: false, error: 'Please enter your name' };
    }

    if (name.trim().length < 2) {
        return { isValid: false, error: 'Name must be at least 2 characters long' };
    }

    if (name.trim().length > 30) {
        return { isValid: false, error: 'Name must be less than 30 characters' };
    }

    // Check if name contains only letters and spaces
    if (!/^[a-zA-Z\s]*$/.test(name)) {
        return { isValid: false, error: 'Name can only contain letters and spaces' };
    }

    return { isValid: true };
};

// If you need to make API calls related to name submission
export const submitName = async (name: string): Promise<boolean> => {
    try {
        // TODO: Implement API call here
        return true;
    } catch (error) {
        console.error('Error submitting name:', error);
        return false;
    }
};
