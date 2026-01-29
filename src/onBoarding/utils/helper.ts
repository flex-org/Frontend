import { FetchResult } from '@/types/api';

export const fetchAPI = async <T>(
    url: string,
    options: RequestInit,
): Promise<FetchResult<T>> => {
    const BASE_URL = process.env.BASE_URL;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const contentType = response.headers.get('content-type');

        if (!response.ok) {
            let message = `HTTP Error ${response.status}`;
            if (contentType?.includes('application/json')) {
                const errorData = await response.json();
                message = errorData.message ?? message;
            } else {
                const text = await response.text();
                if (text) message = text;
            }
            return { ok: false, status: response.status, message };
        }

        const data = contentType?.includes('application/json')
            ? await response.json()
            : await response.text();

        return { ok: true, data: data as T };
    } catch (error) {
        const isTimeout = (error as Error).name === 'AbortError';

        return {
            ok: false,
            status: isTimeout ? 408 : 500,
            message: isTimeout
                ? 'Request timed out (Server took too long)'
                : error instanceof Error
                  ? error.message
                  : 'Network Error',
        };
    }
};
