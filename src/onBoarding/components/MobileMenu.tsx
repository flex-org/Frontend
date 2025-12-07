'use client';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { LogIn, Menu } from 'lucide-react';
import { navLinks } from '../lib/constants';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/i18n/client';
import { usePathname, useRouter } from 'next/navigation';
import LogoutButton from './LogoutButton';

const MobileMenu = ({ lng }: { lng: string }) => {
    const { resolvedTheme, setTheme } = useTheme();
    const { data: session } = useSession();
    const isAuthenticated = session?.user.isAuthenticated;
    const { t } = useTranslation(lng, 'common');
    const router = useRouter();
    const pathname = usePathname();
    const toggle = (lang: string) => {
        const newLang = lang === 'en' ? 'ar' : 'en';
        const segments = pathname.split('/');
        segments[1] = newLang;
        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <DropdownMenu dir={lng === 'en' ? 'ltr' : 'rtl'}>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'}>
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{t('nav-menu')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {navLinks.map(({ key, id }) => (
                        <DropdownMenuItem key={id}>{t(key)}</DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                            dir={lng === 'en' ? 'ltr' : 'rtl'}
                            lang={lng}
                        >
                            {resolvedTheme === 'light'
                                ? t('dark-mode')
                                : t('light-mode')}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem
                                    onClick={() => setTheme('dark')}
                                >
                                    {t('dark-mode')}
                                    <DropdownMenuShortcut>
                                        <Moon />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setTheme('light')}
                                >
                                    {t('light-mode')}
                                    <DropdownMenuShortcut>
                                        <Sun />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger lang={lng}>
                            {lng === 'en' ? 'English' : 'العربية'}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => toggle('en')}>
                                    {t('arabic')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggle('ar')}>
                                    {t('english')}
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {isAuthenticated ? (
                    <DropdownMenuItem>
                        <LogoutButton dropdown={true} lng={lng} />
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem className="bg-green-700 text-white transition-colors hover:bg-green-800">
                        {t('login')}
                        <DropdownMenuShortcut>
                            <LogIn className="text-white" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MobileMenu;
