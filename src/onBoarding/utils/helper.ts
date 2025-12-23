const BASE_URL = process.env.BASE_URL;
export const fetchAPI = async (url: string, options: RequestInit) => {
    const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
        },
    });
    const contentType = response.headers.get('content-type');
    if (!response.ok) {
        if (contentType?.includes('application/json')) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Request failed');
        }
        const text = await response.text();
        throw new Error(text || `HTTP Error ${response.status}`);
    }
    if (contentType?.includes('application/json')) {
        return response.json();
    }
    return response.text();
};
