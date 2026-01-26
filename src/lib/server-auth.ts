import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export async function getServerSideToken() {
    const cookieStore = await cookies();

    const tokenCookie =
        cookieStore.get('__Secure-authjs.session-token') ||
        cookieStore.get('authjs.session-token');

    if (!tokenCookie) return null;

    try {
        const decoded = await decode({
            token: tokenCookie.value,
            secret: process.env.AUTH_SECRET!,
            salt: tokenCookie.name,
        });

        return decoded?.accessToken as string;
    } catch (error) {
        console.error('Failed to decode token on server', error);
        return null;
    }
}
