import { getTranslation } from '@/i18n/server';
import ChatBotContent from '@/onBoarding/features/gomaa/components/ChatBotContent';
import { AlertCircle } from 'lucide-react';

const GomaaPage = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    const { t } = await getTranslation(lng, 'domain');
    return (
        <div className="mt-16 px-2 pb-20 sm:px-0">
            <div className="flex flex-col items-center justify-center gap-4">
                {/* <div className="flex w-full flex-col items-center justify-center gap-4">
                    <p className="text-lg font-bold text-gray-900 md:text-lg dark:text-gray-300">
                        {t('ai-help')}
                    </p>
                </div> */}
                <div className="flex flex-col gap-2">
                    <ChatBotContent lng={lng} />
                </div>
            </div>
        </div>
    );
};

export default GomaaPage;
