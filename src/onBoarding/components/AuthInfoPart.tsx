import { getTranslation } from '@/i18n/server';
import { Github } from 'lucide-react';

const AuthInfoPart = async ({
    lng,
    signin,
}: {
    lng: string;
    signin: boolean;
}) => {
    const { t } = await getTranslation(lng, 'onBoarding-auth');
    return (
        <div
            className={`relative col-span-1 hidden w-full flex-col justify-between overflow-hidden ${lng === 'ar' ? 'rounded-tr-3xl rounded-br-3xl' : 'rounded-tl-3xl rounded-bl-3xl'} bg-green-600 p-8 text-white shadow-xl md:p-10 lg:flex dark:text-gray-200`}
        >
            <div className="flex items-center space-x-3 text-3xl">
                <Github />
                <span className="font-bold tracking-wide opacity-90">
                    {t('title')}
                </span>
            </div>
            <div className="mt-12 mb-20 flex grow flex-col justify-center">
                <h1 className="mb-8 text-4xl leading-tight font-bold md:text-3xl">
                    {signin ? t('sign-in-sub-title') : t('sign-up-sub-title')}
                </h1>
                <p className="text-base leading-relaxed font-medium opacity-90 md:text-lg">
                    {signin
                        ? t('sign-in-description')
                        : t('sign-up-description')}
                </p>
            </div>
            <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white opacity-5 blur-3xl"></div>
        </div>
    );
};

export default AuthInfoPart;
