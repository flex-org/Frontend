'use client';
import SendInput from './SendInput';
import MessageBubble from './MessageBubble';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useTranslation } from '@/i18n/client';
import { Bot } from 'lucide-react';
import { chatBot } from '@/onBoarding/actions/onBoardingActions';
import { useDragDropStore } from '@/onBoarding/store/DragDropStore';
import { toast } from 'sonner';
import { useChatBotStore } from '@/onBoarding/store/chatBotStore';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const responses = (lng: string) => [
    lng === 'ar' ? 'نعم، اريد ذلك' : 'Yes, i will',
    lng === 'ar' ? 'لا اريد ذلك' : "No, i won't",
];
const ChatBotContentClient = ({ lng }: { lng: string }) => {
    const [value, setValue] = useState('');
    const [countdown, setCountdown] = useState(3);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [error, setError] = useState<Error | null>(null);
    const [isPending, startTransition] = useTransition();
    const { t } = useTranslation(lng, 'domain');
    const { setActiveItems } = useDragDropStore();
    const {
        messages,
        addMessage,
        botMessage,
        setBotMessage,
        isCompleted,
        setIsCompleted,
    } = useChatBotStore();
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages, isPending]);

    useEffect(() => {
        if (!isCompleted) return;
        if (countdown === 0) {
            router.push(`/${lng}/preferences`);
            return;
        }
        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [isCompleted, countdown, router, lng]);

    const handleSendMessage = async (textOverride?: string) => {
        const messageContent = textOverride || value;
        if (!messageContent.trim()) return;
        addMessage({ role: 'user', content: messageContent });
        setValue('');
        setError(null);
        setBotMessage('');
        startTransition(async () => {
            const { data, error } = await chatBot(messageContent, lng);
            if (error) {
                setError(error);
                toast.error(t('gomaa-error'));
                return;
            }
            if (data?.data?.bot) {
                addMessage({
                    role: 'bot',
                    content: data.data.bot,
                });
                setBotMessage(data?.data?.bot);
            }
            if (data?.data?.status === 'completed') {
                setActiveItems(data?.data?.features);
                setIsCompleted(true);
            } else {
                setIsCompleted(false);
            }
        });
    };
    const showQuickReplies = !isPending && botMessage && !isCompleted;
    return (
        <>
            <div className="flex h-[600px] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-green-800 dark:bg-green-950/40">
                <div className="flex items-center gap-3 border-b bg-gray-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-100">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">
                            {t('platme-assistant')}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {t('powered-by')}
                        </p>
                    </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50/50 p-4 dark:bg-transparent">
                    {messages.map((msg, i) => (
                        <MessageBubble lng={lng} key={i} msg={msg} />
                    ))}
                    {isPending && (
                        <div className="flex w-fit animate-pulse justify-start rounded-md p-2">
                            <Bot className="size-6 text-green-500" />
                        </div>
                    )}
                    {showQuickReplies && (
                        <div className="animate-in flex items-center justify-start gap-2">
                            {responses(lng).map((res) => (
                                <Button
                                    key={res}
                                    variant={null}
                                    size="sm"
                                    className="border border-gray-300 bg-gray-200 transition-colors hover:bg-gray-300 active:bg-gray-400 dark:border-green-800 dark:bg-green-800/40 dark:hover:bg-green-900/40 dark:active:bg-green-950/40"
                                    onClick={() => handleSendMessage(res)}
                                >
                                    {res}
                                </Button>
                            ))}
                        </div>
                    )}
                    {error?.message && (
                        <p className="text-xs font-semibold text-red-500 sm:text-sm">
                            {t('gomaa-error')}
                        </p>
                    )}
                    {isCompleted && (
                        <p className="text-xs font-semibold text-green-500 sm:text-sm">
                            {t('completed')}
                        </p>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <SendInput
                    handleSendMessage={() => handleSendMessage()}
                    value={value}
                    setValue={setValue}
                    lng={lng}
                    disabled={isPending || isCompleted}
                />
            </div>
            {isCompleted && (
                <div className="flex items-center justify-start gap-3">
                    <p className="text-xs sm:text-sm">
                        {t('auto-redirect')}
                        {'  '}
                    </p>
                    <span className="text-green-300">{countdown}</span>
                </div>
            )}
        </>
    );
};

export default ChatBotContentClient;
