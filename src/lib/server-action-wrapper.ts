import { isRedirectError } from 'next/dist/client/components/redirect-error';
export type ActionResult<T> = {
    data: T | null;
    error: Error | null;
};

export async function createSafeAction<T>(
    action: () => Promise<T>,
): Promise<ActionResult<T>> {
    try {
        const data = await action();
        return { data, error: null };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        let finalError;

        if (error instanceof Error) {
            finalError = error;
        } else if (typeof error === 'string') {
            finalError = new Error(error);
        } else {
            finalError = new Error('An unexpected error occurred.');
        }

        /* NOTE: In Production, Next.js may strip the 'stack' property 
           from Error objects passed from Server to Client for security.
           However, 'message' and 'name' will remain intact.
        */
        return { data: null, error: finalError };
    }
}
