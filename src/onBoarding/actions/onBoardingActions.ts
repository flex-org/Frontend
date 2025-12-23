'use server';
import { auth } from '@/auth';
import { createSafeAction } from '@/lib/server-action-wrapper';
import { fetchAPI } from '../utils/helper';
import { createPlatformData } from '../types';

export const getFeatures = async (lng: string) => {
    const session = await auth();
    const accessToken = session?.user?.accessToken;
    return createSafeAction(async () => {
        const data = await fetchAPI(`/features?lang=${lng}`, {
            next: {
                tags: ['building-features'],
            },
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        return data;
    });
};

export const getSellingSystem = async (lng: string) => {
    const session = await auth();
    const accessToken = session?.user.accessToken;
    return createSafeAction(async () => {
        const data = await fetchAPI(`/enums/selling-systems?lang=${lng}`, {
            next: {
                tags: ['selling-systems'],
            },
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        return data;
    });
};
export const isDomainAvailable = async (lng: string, domain: string) => {
    const session = await auth();
    const accessToken = session?.user?.accessToken;
    return createSafeAction(async () => {
        const data = await fetchAPI(
            `/domain-available?lang=${lng}&domain=${domain}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        );
        return data;
    });
};
export const chatBot = async (message: string, lng: string) => {
    const formData = new FormData();
    formData.append('message', message);

    const session = await auth();
    const accessToken = session?.user?.accessToken;
    return createSafeAction(async () => {
        const data = await fetchAPI(`/bot/message?lang=${lng}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
            body: formData,
        });
        return data;
    });
};
export const createPlatform = async (createData: createPlatformData) => {
    const session = await auth();
    const accessToken = session?.user?.accessToken;
    return createSafeAction(async () => {
        const data = await fetchAPI(`/platform/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(createData),
        });
        return data;
    });
};
