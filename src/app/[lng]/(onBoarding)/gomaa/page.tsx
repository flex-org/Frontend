import ChatBotContent from '@/onBoarding/features/gomaa/components/ChatBotContent';

const GomaaPage = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    return (
        <div className="mt-10 sm:mt-16 px-2 pb-10 sm:px-0">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col gap-2">
                    <ChatBotContent lng={lng} />
                </div>
            </div>
        </div>
    );
};

export default GomaaPage;
