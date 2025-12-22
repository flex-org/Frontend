'use server';
import { auth } from '@/auth';
import { createSafeAction } from '@/lib/server-action-wrapper';
import { fetchAPI } from '../utils/helper';

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

export const getSellingSystem = async (lng: string) => {
    const session = await auth();
    const accessToken = session?.user.accessToken;
    return createSafeAction(async () => {
        const data = await fetchAPI(`/enums/selling-systems?lang=${lng}`, {
            next: {
                tags: ['selling-systems'],
            },
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return data;
    });
};
export const isDomainAvailable = async (lng: string, domain: string) => {
    const session = await auth();
    const accessToken = session?.user?.accessToken;
    return createSafeAction(async () => {
        const data = await fetchAPI(`/domain-available?lang=${lng}&domain=${domain}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return data;
    });
};
