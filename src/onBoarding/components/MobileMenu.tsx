'use client';
import { Button } from '@/components/ui/button';
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
import { Menu } from 'lucide-react';
import { navLinks } from '../lib/constants';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/i18n/client';
import { usePathname, useRouter } from 'next/navigation';

const MobileMenu = ({ lng }: { lng: string }) => {
    const { resolvedTheme, setTheme } = useTheme();
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
            <DropdownMenuContent align='end'>
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
                                    العربية
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggle('ar')}>
                                    English
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MobileMenu;
