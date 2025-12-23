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
        return { data: null, error: finalError };
    }
}
