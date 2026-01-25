'use server';
import { createSafeAction } from '@/lib/server-action-wrapper';
import { fetchAPI } from '../utils/helper';
import { FinalSellingSystemData } from '../types';
import { cacheLife, cacheTag, revalidateTag } from 'next/cache';
import { getServerSideToken } from '@/lib/server-auth';

export const isDomainAvailable = async (lng: string, domain: string) => {
    const accessToken = await getServerSideToken();
    if (!accessToken) throw new Error('Unauthorized');
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

    const accessToken = await getServerSideToken();
    if (!accessToken) throw new Error('Unauthorized');
    return createSafeAction(async () => {
        const data = await fetchAPI(`/bot/message?lang=${lng}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
            body: formData,
        });
        return data;
    });
};
export const createPlatform = async (createData: { billing_cycle: string }) => {
    const accessToken = await getServerSideToken();
    if (!accessToken) throw new Error('Unauthorized');
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
        revalidateTag('stored-data', 'days');
        return data;
    });
};

export const storeData = async (
    storedData:
        | { features: number[] }
        | FinalSellingSystemData
        | { domain: string }
        | undefined,
    endPoint: string | undefined,
) => {
    const accessToken = await getServerSideToken();
    if (!accessToken) throw new Error('Unauthorized');
    return createSafeAction(async () => {
        const data = await fetchAPI(`/platform/initial/${endPoint}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(storedData),
        });
        revalidateTag('stored-data', 'days');
        return data;
    });
};
const getStoredDataCached = async (lng: string, accessToken: string) => {
    'use cache';
    cacheTag('stored-data');
    cacheLife('days');
    const data = await fetchAPI(`/platform/initial?lang=${lng}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return data;
};

export const getStoredData = async (lng: string) => {
    const accessToken = await getServerSideToken();
    if (!accessToken) throw new Error('Unauthorized');
    return createSafeAction(async () => {
        return await getStoredDataCached(lng, accessToken);
    });
};

export const getDynamicFeatures = async (lng: string) => {
    const accessToken = await getServerSideToken();
    if (!accessToken) throw new Error('Unauthorized');
    return getDynamicCached(lng, accessToken);
};

const getDynamicCached = async (lng: string, accessToken: string) => {
    'use cache';
    cacheLife('weeks');
    return createSafeAction(async () => {
        const data = await fetchAPI(`/dynamic-features?lang=${lng}`, {
            next: {
                tags: ['dynamic-features'],
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
