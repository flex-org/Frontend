// 'use server';

// import axios from 'axios';
// import { cookies } from 'next/headers';

// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//     },
// });

// api.interceptors.request.use(
//     (config) => {
//         const cookieStore = cookies();
//         config.headers = config.headers || {};
//         config.headers.Cookie = cookieStore.toString();
//         // Language (you can make this dynamic later)
//         config.headers['Accept-Language'] = 'ar';
//         return config;
//     },
//     (error) => Promise.reject(error),
// );

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const normalizedError = {
//             status: error.response?.status ?? 500,
//             message:
//                 error.response?.data?.message ??
//                 error.message ??
//                 'Unexpected error occurred',
//             data: error.response?.data ?? null,
//             isNetworkError: !error.response,
//         };
//         console.error('[Platme API Error]', normalizedError);
//         return Promise.reject(normalizedError);
//     },
// );

// export default api;
