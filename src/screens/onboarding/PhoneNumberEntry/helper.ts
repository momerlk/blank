export const validatePhoneNumber = (phoneNumber: string): { isValid: boolean; error?: string } => {
    if (!phoneNumber || phoneNumber.trim().length === 0) {
        return { isValid: false, error: 'Please enter your phone number' };
    }

    // Remove any non-digit characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');

    // Check if the number has the correct length for Pakistan (10 digits without country code)
    if (cleanNumber.length !== 10) {
        return { isValid: false, error: 'Please enter a valid 10-digit phone number' };
    }

    // Check if the number starts with a valid Pakistani mobile prefix (3)
    if (!cleanNumber.startsWith('3')) {
        return { isValid: false, error: 'Please enter a valid Pakistani mobile number starting with 3' };
    }

    return { isValid: true };
};

// If you need to make API calls related to phone number verification
export const submitPhoneNumber = async (phoneNumber: string): Promise<boolean> => {
    try {
        // TODO: Implement API call here
        return true;
    } catch (error) {
        console.error('Error submitting phone number:', error);
        return false;
    }
};
