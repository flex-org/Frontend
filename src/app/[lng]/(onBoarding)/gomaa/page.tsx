import { getTranslation } from '@/i18n/server';
import BackAndForwardButtons from '@/onBoarding/components/BackAndForwardButtons';
import ChatBotContent from '@/onBoarding/features/gomaa/components/ChatBotContent';
import { AlertCircle } from 'lucide-react';

const GomaaPage = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    const { t } = await getTranslation(lng, 'domain');
    return (
        <div className="mt-16 px-2 pb-20 sm:px-0">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    {/* <p className="text-3xl font-bold text-gray-900 md:text-5xl dark:text-white">
                        {t('smart-assistant')}
                    </p> */}
                    <p className="text-lg font-bold text-gray-900 md:text-lg dark:text-gray-300">
                        {t('ai-help')}
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <AlertCircle className="size-3" />
                        <p className="text-xs sm:text-sm">
                            {t('do-not-refresh')}
                        </p>
                    </div>
                    <ChatBotContent lng={lng} />
                </div>
            </div>
        </div>
    );
};

export default GomaaPage;
