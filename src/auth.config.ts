// src/auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        authorized({ auth }) {
            return !!auth?.user;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
