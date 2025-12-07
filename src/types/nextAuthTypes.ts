import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    // 1. The object returned from your API's `user` property
    interface User {
        id: string;
        name: string;
        email: string;
        phone?: string;
        accessToken: string; // We add this manually
        isAuthenticated: boolean;
    }

    // 2. The shape of the session object (used in useSession())
    interface Session {
        user: {
            id: string;
            phone?: string;
            accessToken: string;
            isAuthenticated: boolean;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    // 3. The shape of the JWT inside the cookie
    interface JWT {
        id: string;
        phone?: string;
        accessToken: string;
        isAuthenticated: boolean;
    }
}
