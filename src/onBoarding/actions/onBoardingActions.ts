'use server';

import { getServerSideToken } from '@/lib/server-auth';
import { cacheLife, cacheTag, revalidateTag } from 'next/cache';
import { ActionResult } from '@/types/api';
import {
    botResponseActionResult,
    dynamicDataActionResult,
    FinalSellingSystemData,
    initialDataActionResult,
    isDomainAvailableActionResult,
} from '../types';
import { createSafeAction } from '@/lib/server-action-wrapper';
import { fetchAPI } from '../utils/helper';

const unauthorizedError = () => ({
    ok: false as const,
    error: { message: 'Unauthorized', status: 401, code: 'AUTH_ERROR' },
});

export const isDomainAvailable = async (
    lng: string,
    domain: string,
): Promise<ActionResult<isDomainAvailableActionResult>> => {
    const accessToken = await getServerSideToken();
    if (!accessToken) return unauthorizedError();

    return createSafeAction(async () => {
        return await fetchAPI<isDomainAvailableActionResult>(
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
    });
};
export const chatBot = async (
    message: string,
    lng: string,
): Promise<ActionResult<botResponseActionResult>> => {
    const accessToken = await getServerSideToken();
    if (!accessToken) return unauthorizedError();

    const formData = new FormData();
    formData.append('message', message);

    return createSafeAction(async () => {
        return await fetchAPI<botResponseActionResult>(`/bot/message?lang=${lng}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
            body: formData,
        });
    });
};
export const createPlatform = async (createData: {
    billing_cycle: string;
}): Promise<ActionResult<unknown>> => {
    const accessToken = await getServerSideToken();
    if (!accessToken) return unauthorizedError();

    return createSafeAction(async () => {
        const result = await fetchAPI<unknown>(`/platform/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(createData),
        });

        if (result.ok) {
            revalidateTag('stored-data', 'days');
        }
        return result;
    });
};
type StoredDataPayload =
    | { features: number[] }
    | FinalSellingSystemData
    | { domain: string }
    | undefined;

export const storeData = async (
    storedData: StoredDataPayload,
    endPoint: string | undefined,
): Promise<ActionResult<unknown>> => {
    const accessToken = await getServerSideToken();
    if (!accessToken) return unauthorizedError();

    return createSafeAction(async () => {
        const result = await fetchAPI<unknown>(
            `/platform/initial/${endPoint}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(storedData),
            },
        );

        if (result.ok) {
            revalidateTag('stored-data', 'days');
        }
        return result;
    });
};
const getStoredDataCached = async (lng: string, accessToken: string) => {
    'use cache';
    cacheTag('stored-data');
    cacheLife('days');
    return await fetchAPI<initialDataActionResult>(
        `/platform/initial?lang=${lng}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        },
    );
};

export const getStoredData = async (
    lng: string,
): Promise<ActionResult<initialDataActionResult>> => {
    const accessToken = await getServerSideToken();
    if (!accessToken) return unauthorizedError();

    return createSafeAction(async () => {
        return await getStoredDataCached(lng, accessToken);
    });
};

const getDynamicCached = async (lng: string, accessToken: string) => {
    'use cache';
    cacheLife('weeks');
    cacheTag('dynamic-features');

    return await fetchAPI<dynamicDataActionResult>(
        `/dynamic-features?lang=${lng}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        },
    );
};

export const getDynamicFeatures = async (
    lng: string,
): Promise<ActionResult<dynamicDataActionResult>> => {
    const accessToken = await getServerSideToken();
    if (!accessToken) return unauthorizedError();

    return createSafeAction(async () => {
        return await getDynamicCached(lng, accessToken);
    });
};
