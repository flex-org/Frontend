'use client';

import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/i18n/client';
import BackAndForwardButtons from '@/onBoarding/components/BackAndForwardButtons';
import { useGlobalStore } from '@/onBoarding/store/globalStore';
import { CircleAlert, CircleCheck } from 'lucide-react';
import useCheckDomain from '../hooks/useCheckDomain';
import { ChangeEvent, useState } from 'react';
import Messages from './Messages';

const DomainContentClient = ({ lng }: { lng: string }) => {
    const { domain, setDomain } = useGlobalStore();
    const [inputError, setInputError] = useState<string | null>(null);
    const { t } = useTranslation(lng, 'domain');
    const { isPending, result, error } = useCheckDomain(
        t,
        lng,
        'domain-error',
        inputError,
    );
    const showSpinner = isPending;
    const showSuccess = !isPending && result?.success === true;
    const showError =
        !isPending && result !== null && result?.success === false;
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const cleanValue = val.replace(/[^a-zA-Z-]/g, '').toLowerCase();
        if (val.toLowerCase() !== cleanValue) {
            setInputError(t('only-english-domain'));
        } else {
            setInputError(null);
        }
        setDomain(cleanValue);
    };
    return (
        <div className="mt-24 flex h-full w-full max-w-sm flex-col gap-2">
            <div className="relative flex w-full items-center justify-center">
                <input
                    placeholder={t('write-domain')}
                    value={domain}
                    onChange={handleInputChange}
                    className={`h-11 w-full rounded-md border bg-white ring transition-all outline-none focus:shadow-md ${lng === 'ar' ? 'pr-2 pl-33' : 'pr-33 pl-2'} ${showError ? 'border-red-500 ring-red-500' : ''} ${showSuccess ? 'border-green-500 ring-green-500' : ''}`}
                />
                <div
                    className={`absolute top-[50%] ${lng === 'ar' ? 'left-0 pl-2' : 'right-0 pr-2'} -translate-y-[50%]`}
                >
                    {showSpinner && <Spinner className="size-4" />}
                    {showSuccess && (
                        <CircleCheck className="size-4 text-green-500" />
                    )}
                    {showError && (
                        <CircleAlert className="size-4 text-red-500" />
                    )}
                </div>
                <div
                    className={`absolute top-0 flex h-full items-center ${lng === 'ar' ? 'left-[24%] -translate-x-[50%] sm:left-[20%]' : 'right-[24%] translate-x-[50%] sm:right-[20%]'}`}
                >
                    .platme.com
                </div>
            </div>
            <Messages
                error={error}
                showError={showError}
                showSuccess={showSuccess}
                isPending={isPending}
                t={t}
                inputError={inputError}
            />
            <div>
                <BackAndForwardButtons
                    lng={lng}
                    nextPage="payment"
                    disabled={
                        isPending ||
                        result === null ||
                        !result.success ||
                        !!inputError
                    }
                />
            </div>
        </div>
    );
};

export default DomainContentClient;
