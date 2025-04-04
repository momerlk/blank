export const validatePassword = (password: string, confirmPassword: string) => {
    if (!password || password.length < 8) {
        return {
            isValid: false,
            error: 'Password must be at least 8 characters long'
        };
    }

    if (!/[A-Z]/.test(password)) {
        return {
            isValid: false,
            error: 'Password must contain at least one uppercase letter'
        };
    }

    if (!/[a-z]/.test(password)) {
        return {
            isValid: false,
            error: 'Password must contain at least one lowercase letter'
        };
    }

    if (!/[0-9]/.test(password)) {
        return {
            isValid: false,
            error: 'Password must contain at least one number'
        };
    }

    if (!/[!@#$%^&*]/.test(password)) {
        return {
            isValid: false,
            error: 'Password must contain at least one special character (!@#$%^&*)'
        };
    }

    if (password !== confirmPassword) {
        return {
            isValid: false,
            error: 'Passwords do not match'
        };
    }

    return {
        isValid: true,
        error: null
    };
};
