import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export async function getServerSideToken() {
    const cookieStore = await cookies();

    // 1. Try to find the session cookie (name depends on dev vs prod/https)
    const tokenCookie = cookieStore.get('authjs.session-token');

    if (!tokenCookie) return null;

    // 2. Decrypt the cookie manually to get the raw JWT
    try {
        const decoded = await decode({
            token: tokenCookie.value,
            secret: process.env.AUTH_SECRET!, // Ensure this is set in .env
            salt: tokenCookie.name,
        });

        // 3. Return the accessToken that is HIDDEN from the session callback
        return decoded?.accessToken as string;
    } catch (error) {
        console.error('Failed to decode token on server', error);
        return null;
    }
}
