import { isRedirectError } from 'next/dist/client/components/redirect-error';
export type ActionResult<T> = {
    data: T | null;
    error: string | null;
};
export async function createSafeAction<T>(
    action: () => Promise<T>,
): Promise<ActionResult<T>> {
    try {
        const data = await action();
        return { data, error: null };
    } catch (error: Error | unknown) {
        // CRITICAL: Next.js uses errors for redirects. Do not catch them!
        if (isRedirectError(error)) {
            throw error;
        }

        // Handle Fetch errors (from your external API)
        if (error instanceof Error) {
            return { data: null, error: error.message };
        }
        return { data: null, error: 'An unexpected error occurred.' };
    }
}
