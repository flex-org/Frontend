'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleCheck, CircleXIcon, LogOut } from 'lucide-react';
import { logout } from '../actions/authActions';
import { toast } from 'sonner';
import { ReactNode, useTransition } from 'react';
import { useTranslation } from '@/i18n/client';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { useSession } from 'next-auth/react';
import { cn } from '@/utils/cn';

const MenuValue = ({ children }: { children: ReactNode }) => (
    <span className="ml-auto text-xs tracking-widest opacity-60 rtl:mr-auto rtl:ml-0">
        {children}
    </span>
);

const UserInfo = ({ lng, children }: { lng: string; children: ReactNode }) => {
    const { t } = useTranslation(lng, 'common');
    const { update, data } = useSession();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleLogout = () => {
        startTransition(async () => {
            try {
                await logout();
                await update();
                toast.success(t('logged-out'));
                router.refresh();
                // router.push(`/${lng}/signin`);
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : t('error-log-out'),
                );
            }
        });
    };

    const name = data?.user?.name;
    const email = data?.user?.email;
    const isVerified = data?.user?.isVerified;
    const phone = data?.user?.phone;

    const itemClass = 'flex w-full items-center justify-between gap-4';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 max-w-80" align="end">
                <DropdownMenuGroup dir={lng === 'ar' ? 'rtl' : 'ltr'}>
                    <DropdownMenuItem className={itemClass}>
                        <span>{t('user-name')}</span>
                        <MenuValue>{name}</MenuValue>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={itemClass}>
                        <span>{t('user-email')}</span>
                        <MenuValue>{email}</MenuValue>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={itemClass}>
                        <span>{t('user-phone')}</span>
                        <MenuValue>{phone}</MenuValue>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={itemClass}>
                        <span>{t('account-type')}</span>
                        <MenuValue>{t('type')}</MenuValue>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={itemClass}>
                        <span>{t('user-verified')}</span>
                        <MenuValue>
                            {isVerified ? (
                                <CircleCheck className="size-4 text-green-500" />
                            ) : (
                                <CircleXIcon className="size-4 text-red-500" />
                            )}
                        </MenuValue>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup dir={lng === 'ar' ? 'rtl' : 'ltr'}>
                    <DropdownMenuItem
                        variant="destructive"
                        className={cn('cursor-pointer', itemClass)}
                        onClick={handleLogout}
                        disabled={isPending}
                    >
                        <span>{t('logout')}</span>
                        {isPending ? (
                            <Spinner className="size-4" />
                        ) : (
                            <LogOut className="size-4 rtl:rotate-180" />
                        )}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserInfo;
