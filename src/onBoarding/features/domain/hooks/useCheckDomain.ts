import { isDomainAvailable } from '@/onBoarding/actions/onBoardingActions';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface DomainResult {
    success: boolean;
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
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const timer = setTimeout(async () => {
            setResult(null);
            setError(null);
            if (!domain || inputError) return;
            startTransition(async () => {
                try {
                    const { data, error } = await isDomainAvailable(
                        lng,
                        domain,
                    );
                    if (error) {
                        setError(
                            error instanceof Error
                                ? error
                                : new Error(error as string),
                        );
                        toast.error(error.message);
                    } else {
                        setResult(data);
                    }
                } catch (err) {
                    setError(err as Error);
                }
            });
        }, 2000);
        return () => clearTimeout(timer);
    }, [domain, lng, t, key, inputError]);
    return { isPending, result, error };
};

export default useCheckDomain;
