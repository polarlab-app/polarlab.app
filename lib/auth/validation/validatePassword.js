'use server';

export default async function validatePassword(password) {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(password)) {
        return 'Password must include an uppercase letter';
    } else if (!/[a-z]/.test(password)) {
        return 'Password must include a lowercase letter';
    } else if (!/\d/.test(password)) {
        return 'Password must include a number';
    } else if (!/[!@#$%^&*()_+`~{}|:;<>?,.]/.test(password)) {
        return 'Password must include a special charecter';
    }

    return 'success';
}
