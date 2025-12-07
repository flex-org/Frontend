'use client';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/i18n/client';
import { LogOut } from 'lucide-react';
import { logout } from '../actions/authActions';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

const LogoutButton = ({
    lng,
    dropdown = false,
}: {
    lng: string;
    dropdown?: boolean;
}) => {
    const { t } = useTranslation(lng, 'common');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleLogout = () => {
        startTransition(async () => {
            try {
                await logout();
                toast.success(t('logged-out'));
                router.push(`/${lng}/signin`);
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : t('error-log-out'),
                );
            }
        });
    };
    return (
        <Button
            disabled={isPending}
            variant={'destructive'}
            className={`${dropdown ? 'flex w-full lg:hidden' : 'hidden lg:flex'}`}
            onClick={handleLogout}
        >
            {isPending ? (
                <Spinner />
            ) : (
                <>
                    <p
                        className={`${dropdown ? 'block lg:hidden' : 'hidden lg:block'}`}
                    >
                        {t('logout')}
                    </p>
                    <LogOut
                        className={`h-4 w-4 ${lng === 'ar' && 'rotate-180'} text-white`}
                    />
                </>
            )}
        </Button>
    );
};

export default LogoutButton;
