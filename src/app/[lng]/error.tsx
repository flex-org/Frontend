'use client';

import ErrorFallback from '@/components/ErrorFallback';
import { usePathname } from 'next/navigation';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    const pathname = usePathname();
    const segments = pathname.split('/');
    const lng = segments[1];

    return <ErrorFallback error={error} reset={reset} lng={lng} />;
};

export default Error;
