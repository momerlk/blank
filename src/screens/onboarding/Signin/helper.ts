export interface SignInForm {
    email: string;
    password: string;
}

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
    if (!email || email.trim().length === 0) {
        return { isValid: false, error: 'Please enter your email' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
    if (!password || password.trim().length === 0) {
        return { isValid: false, error: 'Please enter your password' };
    }

    if (password.length < 8) {
        return { isValid: false, error: 'Password must be at least 8 characters long' };
    }

    return { isValid: true };
};

export const validateForm = (form: SignInForm): { isValid: boolean; errors: { [key: string]: string } } => {
    const errors: { [key: string]: string } = {};
    const emailValidation = validateEmail(form.email);
    const passwordValidation = validatePassword(form.password);

    if (!emailValidation.isValid && emailValidation.error) {
        errors.email = emailValidation.error;
    }

    if (!passwordValidation.isValid && passwordValidation.error) {
        errors.password = passwordValidation.error;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const submitSignIn = async (form: SignInForm): Promise<boolean> => {
    try {
        // TODO: Implement API call here
        console.log('Signing in with:', form);
        return true;
    } catch (error) {
        console.error('Error signing in:', error);
        return false;
    }
};
