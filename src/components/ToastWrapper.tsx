'use client';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

const ToastWrapper = ({ lng }: { lng: string }) => {
    const { resolvedTheme } = useTheme();
    return (
        <div>
            <Toaster
                closeButton={true}
                position={lng === 'ar' ? 'bottom-left' : 'bottom-right'}
                dir={'auto'}
                className="font-[--font-cairo]"
                richColors
                theme={resolvedTheme === 'light' ? 'light' : 'dark'}
            />
        </div>
    );
};

export default ToastWrapper;
