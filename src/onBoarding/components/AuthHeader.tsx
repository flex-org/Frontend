import LanguageSwitcher from '@/components/LanguageSwitcher';
import ToolTipComponent from '@/components/ToolTipComponent';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
const AuthHeader = ({ lng }: { lng: string }) => {
    return (
        <div className="flex w-full items-center justify-between px-4 pt-12">
            <ToolTipComponent
                label={lng === 'ar' ? 'الصفحة الرئيسية' : 'home page'}
            >
                <Link href={`/${lng}`} aria-label="الصفحة الرئيسية">
                    <Button
                        aria-label={
                            lng === 'ar' ? 'الصفحة الرئيسية' : 'home page'
                        }
                        variant={'outline'}
                    >
                        <ArrowLeft
                            className={`${lng === 'ar' ? 'rotate-180' : ''}`}
                        />
                    </Button>
                </Link>
            </ToolTipComponent>
            <LanguageSwitcher currentLang={lng} />
        </div>
    );
};

export default AuthHeader;
