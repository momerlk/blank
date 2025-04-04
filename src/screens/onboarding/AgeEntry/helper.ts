export interface DOBValidation {
    isValid: boolean;
    isAdult: boolean;
    error?: string;
}

export const validateDOB = (dob: string[]): DOBValidation => {
    // Join the DOB array into a string (DD/MM/YYYY)
    const dobString = dob.join('');
    
    // Check if the DOB is complete
    if (dobString.length !== 10) {
        return { isValid: false, isAdult: false, error: 'Please enter a complete date of birth' };
    }

    const day = parseInt(dobString.slice(0, 2));
    const month = parseInt(dobString.slice(3, 5));
    const year = parseInt(dobString.slice(6, 10));

    // Check if the date is valid
    const date = new Date(year, month - 1, day);
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return { isValid: false, isAdult: false, error: 'Please enter a valid date' };
    }

    // Check if the person is at least 13 years old
    const today = new Date();
    const age = today.getFullYear() - year - 
        (today.getMonth() < month - 1 || 
        (today.getMonth() === month - 1 && today.getDate() < day) ? 1 : 0);

    if (age < 13) {
        return { isValid: false, isAdult: false, error: 'You must be at least 13 years old' };
    }

    return { isValid: true, isAdult: age >= 18 };
};

// If you need to make API calls related to age verification
export const submitDOB = async (dob: string[]): Promise<boolean> => {
    try {
        // TODO: Implement API call here
        return true;
    } catch (error) {
        console.error('Error submitting DOB:', error);
        return false;
    }
};
