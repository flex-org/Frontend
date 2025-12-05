'use client';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

const ToastWrapper = ({ lng }: { lng: string }) => {
    const { resolvedTheme } = useTheme();
    return (
        <div>
            <Toaster
                closeButton={true}
                position={lng === 'ar' ? 'top-left' : 'top-right'}
                dir={'auto'}
                richColors
                theme={resolvedTheme === 'light' ? 'light' : 'dark'}
            />
        </div>
    );
};

export default ToastWrapper;
