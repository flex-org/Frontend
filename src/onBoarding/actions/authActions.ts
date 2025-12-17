'use server';

import {
    ActionResponse,
    LoginFormValues,
    SignedUpUser,
    SignupFormValues,
} from '../types';
import { AuthError } from 'next-auth';
import { auth, signIn, signOut } from '@/auth';

const BASE_URL = process.env.BASE_URL;
type SignupSuccess = {
    user: SignedUpUser;
    token: string;
};
export const signup = async (
    formData: SignupFormValues,
): Promise<ActionResponse<SignupSuccess>> => {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage =
                errorData.message || `HTTP Error: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Signup Failed:', error);
        throw error;
    }
};

export const verifyAccount = async (
    formData: { pin: string },
    token: string,
) => {
    try {
        const response = await fetch(`${BASE_URL}/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ otp: formData.pin }),
            cache: 'no-store',
        });
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage =
                errorData.message || `HTTP Error: ${response.status}`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
export const resendOtp = async (formData: string) => {
    try {
        const response = await fetch(`${BASE_URL}/resend-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email: formData }),
            cache: 'no-store',
        });
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage =
                errorData.message || `HTTP Error: ${response.status}`;
            throw new Error(errorMessage);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
};

export const login = async (data: LoginFormValues) => {
    try {
        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: false, error: 'Invalid credentials!' };
                default:
                    return { success: false, error: 'Something went wrong.' };
            }
        }
        throw error;
    }
};
// export const loginWithGoogle = async () => {
//     try {
//         await signIn('google', { redirect: false });
//     } catch (error) {
//         throw error;
//     }
// };
// export const loginWithGithub = async () => {
//     try {
//         await signIn('github', { redirect: false });
//     } catch (error) {
//         throw error;
//     }
// };

export const logout = async () => {
    const session = await auth();
    const isAuthenticated = session?.user?.isAuthenticated;
    const accessToken = session?.user?.accessToken;
    if (isAuthenticated) {
        try {
            await fetch(`${BASE_URL}/logout`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            throw error;
        }
    }
    await signOut({ redirect: false });
};
