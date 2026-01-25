'use client';

import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/i18n/client';
import BackAndForwardButtons from '@/onBoarding/components/BackAndForwardButtons';
import { CircleAlert, CircleCheck } from 'lucide-react';
import useCheckDomain from '../hooks/useCheckDomain';
import { ChangeEvent, useState } from 'react';
import Messages from './Messages';
import { Input } from '@/components/ui/input';

const DomainContentClient = ({
    lng,
    selectedDomain,
}: {
    lng: string;
    selectedDomain: string;
}) => {
    const [domain, setDomain] = useState<string>(selectedDomain);
    const [inputError, setInputError] = useState<string | null>(null);
    const { t } = useTranslation(lng, 'domain');
    const { isPending, result, error } = useCheckDomain(
        t,
        lng,
        'domain-error',
        inputError,
        domain,
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
    const finalData = { domain };
    return (
        <div className="mt-24 flex h-full w-full max-w-sm flex-col gap-2">
            <div
                dir="ltr"
                className="relative flex w-full items-center justify-center"
            >
                <Input
                    placeholder={t('write-domain')}
                    value={domain}
                    autoFocus
                    onChange={handleInputChange}
                    className={`h-11 w-full pr-33 pl-2 transition-all focus:shadow-md dark:text-gray-200 ${error ? 'border-ring border-none ring-2 ring-red-600/80' : ''} ${showSuccess ? 'border-ring border-none ring-2 ring-green-600/80' : ''}`}
                />
                <div
                    className={`absolute top-[50%] right-0 -translate-y-[50%] pr-2`}
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
                    className={`absolute top-0 right-[24%] flex h-full translate-x-[50%] items-center border-l border-black pl-2 font-bold sm:right-[20%] dark:border-gray-400 dark:text-gray-300`}
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
                    endPoint="domain"
                    storedData={finalData}
                />
            </div>
        </div>
    );
};

export default DomainContentClient;
