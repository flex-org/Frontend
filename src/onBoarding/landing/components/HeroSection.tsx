import Image from 'next/image';
import AboNawaf from '../../../../public/images/onBoarding/abo-nawaf.webp';
import { Button } from '@/components/ui/button';
import { getTranslation } from '@/i18n/server';
import { auth } from '@/auth';

const HeroSection = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'onBoarding-landing');
    const session = await auth();
    const isAuthenticated = session?.user.isAuthenticated;
    return (
        <div className="mt-40 flex flex-col items-center justify-center px-8 lg:px-0">
            <div className="grid w-full grid-cols-3">
                <div className="col-span-3 flex max-w-3xl flex-col justify-center lg:col-span-2">
                    <p className="text-2xl leading-10 font-semibold sm:text-4xl sm:leading-15 md:text-6xl md:leading-23">
                        <span className="text-green-800">{t('desc-word')}</span>{' '}
                        {t('main-desc')}
                    </p>
                    <p className="text-sm leading-6 text-gray-600 md:text-xl md:leading-8 dark:text-gray-300">
                        {t('sub-desc')}
                    </p>
                    <div className="mt-12 flex items-center gap-2">
                        {!isAuthenticated && (
                            <Button
                                variant={null}
                                size="lg"
                                className="bg-green-800 text-white hover:bg-green-900"
                            >
                                {t('sign-up')}
                            </Button>
                        )}
                        <Button size="lg" variant={'secondary'}>
                            {t('try-for-free')}
                        </Button>
                    </div>
                </div>
                <div className="col-span-1 hidden lg:block">
                    <Image
                        src={AboNawaf}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="landing-image"
                        placeholder="blur"
                        priority={true}
                        className="object-cover"
                        quality={75}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
