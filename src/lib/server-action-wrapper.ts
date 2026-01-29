import { ActionResult, FetchResult } from "@/types/api";

export async function createSafeAction<T>(
    action: () => Promise<FetchResult<T>>,
): Promise<ActionResult<T>> {
    try {
        const result = await action();
        if (result.ok) {
            return { ok: true, data: result.data };
        }
        return {
            ok: false,
            error: {
                message: result.message,
                status: result.status,
                code: 'API_ERROR',
            },
        };
    } catch (error) {
        console.error('Action Crash:', error);
        return {
            ok: false,
            error: {
                message: 'Unexpected server error',
                code: 'INTERNAL_ERROR',
            },
        };
    }
}
