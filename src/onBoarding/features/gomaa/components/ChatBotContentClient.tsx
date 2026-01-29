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
import { useRouter } from 'next/navigation';
import { AppError } from '@/types/api';

const ChatBotContentClient = ({ lng }: { lng: string }) => {
    const [value, setValue] = useState('');
    const [countdown, setCountdown] = useState(3);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [error, setError] = useState<AppError | null>(null);
    const [isPending, startTransition] = useTransition();
    const { t } = useTranslation(lng, 'domain');
    const { setActiveItems } = useDragDropStore();
    const { messages, addMessage, setBotMessage, isCompleted, setIsCompleted } =
        useChatBotStore();
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
            const data = await chatBot(messageContent, lng);
            if (!data.ok) {
                setError(data.error);
                if (data.error.status === 500) {
                    toast.error(
                        'Internal Server Error, You exceeded your current quota, please check your plan and billing details',
                    );
                } else {
                    toast.error(t('gomaa-error'));
                }
                return;
            }
            if (data?.data?.data.bot) {
                addMessage({
                    role: 'bot',
                    content: data.data.data.bot,
                });
                setBotMessage(data?.data?.data.bot);
            }
            if (data?.data?.data.status === 'completed') {
                setActiveItems(data?.data?.data.features);
                setIsCompleted(true);
            } else {
                setIsCompleted(false);
            }
        });
    };
    // const showQuickReplies = !isPending && botMessage && !isCompleted;
    return (
        <>
            <div className="flex h-[700px] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-green-800 dark:bg-green-950/40">
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

                <div className="slider flex-1 space-y-4 overflow-y-auto bg-gray-50/50 p-4 dark:bg-transparent">
                    {messages.map((msg, i) => (
                        <MessageBubble
                            isLastMsg={messages.length - 1 === i}
                            lng={lng}
                            key={i}
                            msg={msg}
                        />
                    ))}
                    {isPending && (
                        <div className="flex w-fit animate-pulse justify-start rounded-md p-2">
                            <Bot className="size-6 text-green-500" />
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
