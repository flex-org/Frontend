import { auth } from '@/auth';
import UserInfo from './UserInfo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { getTranslation } from '@/i18n/server';

const LoginButtonWithAvatar = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'common');
    const session = await auth();
    const isAuthenticated = session?.user.isAuthenticated;
    const name = session?.user.name;
    const getInitials = (name: string | undefined) => {
        return name ? name.substring(0, 3).toUpperCase() : '??';
    };
    return (
        <div>
            {isAuthenticated ? (
                <UserInfo lng={lng}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <Avatar>
                            <AvatarImage
                                // src="https://github.com/shadcn.png"
                                alt={name}
                            />
                            <AvatarFallback className='text-xs'>{getInitials(name)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </UserInfo>
            ) : (
                <Link href={`/${lng}/signin`} className="hidden lg:flex">
                    <Button
                        variant={null}
                        size="sm"
                        className="primary-btn"
                    >
                        <p className="hidden lg:block">{t('login')}</p>
                        <LogIn className="block h-4 w-4" />
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default LoginButtonWithAvatar;
