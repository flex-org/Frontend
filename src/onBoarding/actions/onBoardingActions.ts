'use server';
import { auth } from '@/auth';
import { createSafeAction } from '@/lib/server-action-wrapper';
const BASE_URL = process.env.BASE_URL;

const fetchAPI = async (url: string, options: RequestInit) => {
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
export const getFeatures = async (lng: string) => {
    const session = await auth();
    const accessToken = session?.user?.accessToken;
    return createSafeAction(async () => {
        const data = await fetchAPI(`/features?lang=${lng}`, {
            next: {
                tags: ['building-features'],
            },
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return data;
    });
};
// export const getFeatures = async (
//     lng: string,
// ): Promise<{ success: boolean; data: Features[] }> => {
//     const session = await auth();
//     const accessToken = session?.user?.accessToken;
//     try {
//         const response = await fetch(`${BASE_URL}/features?lang=${lng}`, {
//             next: {
//                 tags: ['building-features'],
//             },
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json',
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//         if (!response.ok) {
//             const errorData = await response.json();
//             const errorMessage =
//                 errorData.message || `HTTP Error: ${response.status}`;
//             throw new Error(errorMessage);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         throw error;
//     }
// };
