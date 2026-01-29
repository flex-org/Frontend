import { isDomainAvailable } from '@/onBoarding/actions/onBoardingActions';
import { AppError } from '@/types/api';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface DomainResult {
    message: string;
}
const useCheckDomain = (
    t: (key: string) => string,
    lng: string,
    key: string,
    inputError: string | null,
    domain: string,
) => {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<DomainResult | null>(null);
    const [error, setError] = useState<AppError | null>(null);
    useEffect(() => {
        const timer = setTimeout(async () => {
            setResult(null);
            setError(null);
            if (!domain || inputError) return;
            startTransition(async () => {
                const data = await isDomainAvailable(lng, domain);
                if (!data.ok) {
                    setError(data.error);
                    console.log(data.error);
                    toast.error(data.error.message);
                } else {
                    console.log(data.data.message);
                    setResult({ message: data.data.message });
                }
            });
        }, 2000);
        return () => clearTimeout(timer);
    }, [domain, lng, t, key, inputError]);
    return { isPending, result, error };
};

export default useCheckDomain;
