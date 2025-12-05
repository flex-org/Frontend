import { getTranslation } from '@/i18n/server';
import OnBoardingNavbar from '@/onBoarding/components/OnBoardingNavbar';
import Image from 'next/image';
import AboNawaf from '../../../../public/images/onBoarding/abo-nawaf.webp';
import { Button } from '@/components/ui/button';
export default async function Home({
    params,
}: {
    params: Promise<{ lng: string }>;
}) {
    const { lng } = await params;
    const { t } = await getTranslation(lng, 'onBoarding-landing');
    return (
        <div className="min-h-screen">
            <OnBoardingNavbar lng={lng} />
            <div className="mt-40 flex flex-col items-center justify-center">
                <div className="grid w-full grid-cols-3">
                    <div className="col-span-2 flex max-w-3xl flex-col justify-center">
                        <p className="text-6xl leading-23 font-semibold">
                            <span className="text-green-800">
                                {t('desc-word')}
                            </span>{' '}
                            {t('main-desc')}
                        </p>
                        <p className="text-xl leading-8 text-gray-600 dark:text-gray-300">
                            {t('sub-desc')}
                        </p>
                        <div className="mt-12 flex items-center gap-2">
                            <Button
                                variant={null}
                                size="lg"
                                className="bg-green-800 text-white hover:bg-green-900"
                            >
                                {t('sign-up')}
                            </Button>
                            <Button size="lg" variant={'secondary'}>
                                {t('try-for-free')}
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-1">
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
        </div>
    );
}
