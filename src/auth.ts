import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
const BASE_URL = process.env.BASE_URL;
export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Credentials({
            // takes all the data of the user and store them in a user object that will be used later in callbacks
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email({
                            message: 'Please enter a valid email address',
                        }),
                        password: z.string().min(8, {
                            message: 'Password must be at least 8 characters',
                        }),
                    })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    try {
                        const response = await fetch(`${BASE_URL}/login`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, password }),
                        });
                        if (!response.ok) return null;
                        const result = await response.json();
                        if (result.success && result.data) {
                            return {
                                ...result.data.user,
                                accessToken: result.data.access_token,
                                isAuthenticated: !!result.data.access_token,
                            };
                        }
                        return null;
                    } catch (error) {
                        console.error('Auth Error:', error);
                        return null;
                    }
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'credentials') return true;
            if (
                account?.provider === 'google' ||
                account?.provider === 'github'
            ) {
                try {
                    const response = await fetch(`${BASE_URL}/provider-login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            provider: account.provider,
                            provider_id: account.providerAccountId,
                            image: user.image,
                        }),
                    });
                    if (!response.ok) {
                        console.error('Backend refused social login');
                        return false; 
                    }
                    const result = await response.json();
                    user.accessToken = result.data.access_token;
                    user.id = result.data.user.id;
                    user.isAuthenticated = true;
                } catch (error) {
                    console.error('Social Login Error:', error);
                    return false;
                }
            }
            return true;
        },
        // executed on every login & request & refresh
        // transform user object that comes from authorize into JWT Token stored inside a cookie
        async jwt({ token, user, account }) {
            // first time login only
            if (user) {
                token.id = user.id;
                token.phone = user.phone;
                token.accessToken = user.accessToken;
                token.isAuthenticated = user.isAuthenticated;
            }
            // for providers TODO later
            if (account && account.access_token) {
                token.accessToken = account.access_token as string;
            }
            return token;
        },
        // using the data in a form of auth() in the server components & useSession in client components
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.phone = token.phone;
            session.user.accessToken = token.accessToken;
            session.user.isAuthenticated = token.isAuthenticated;
            return session;
        },
    },
});
