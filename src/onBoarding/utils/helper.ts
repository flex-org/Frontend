
const BASE_URL = process.env.BASE_URL;

export const fetchAPI = async (url: string, options: RequestInit) => {
    const response = await fetch(`${BASE_URL}${url}`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...options.headers,
        },
        ...options,
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
            errorData.message ||
            `HTTP Error: ${response.statusText} ${response.status}`;
        throw new Error(errorMessage);
    }
    return response.json();
};
