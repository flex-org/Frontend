'use client';
import { AnimatePresence, motion } from 'motion/react';
import SendInput from './SendInput';
import MessageBubble from './MessageBubble';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useTranslation } from '@/i18n/client';
import { Bot } from 'lucide-react';
import { chatBot } from '@/onBoarding/actions/onBoardingActions';
import { useDragDropStore } from '@/onBoarding/store/DragDropStore';
import { toast } from 'sonner';
import { useChatBotStore } from '@/onBoarding/store/chatBotStore';
import { AppError } from '@/types/api';
import {
    chatContainerVariants,
    featuresContainerVariants,
} from '@/onBoarding/animations/variants';
import { useMediaQuery } from 'react-responsive';
import { Button } from '@/components/ui/button';
import FeaturesBox from './FeaturesBox';

const MotionButton = motion(Button);

const ChatBotContentClient = ({ lng }: { lng: string }) => {
    const [open, setOpen] = useState(false);
    const isLarge = useMediaQuery({ minWidth: '1024px' });
    const [value, setValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<AppError | null>(null);
    const [isPending, startTransition] = useTransition();
    const { t } = useTranslation(lng, 'domain');
    const { setActiveItems } = useDragDropStore();

    const messages = useChatBotStore((state) => state.messages);
    const addMessage = useChatBotStore((state) => state.addMessage);
    const setBotMessage = useChatBotStore((state) => state.setBotMessage);
    const isCompleted = useChatBotStore((state) => state.isCompleted);
    const selectedFeatures = useChatBotStore((state) => state.selectedFeatures);
    const setSelectedFeatures = useChatBotStore(
        (state) => state.setSelectedFeatures,
    );
    const setIsCompleted = useChatBotStore((state) => state.setIsCompleted);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages, isPending]);

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
                setSelectedFeatures(data?.data?.data?.features);
                addMessage({
                    role: 'bot',
                    content: data.data.data.bot,
                });
                setBotMessage(data?.data?.data.bot);
                setSelectedFeatures(data?.data?.data?.features);
            }
            if (data?.data?.data.status === 'completed') {
                setActiveItems(data?.data?.data.features);
                setIsCompleted(true);
            } else {
                setIsCompleted(false);
            }
        });
    };
    return (
        <div className="flex max-w-7xl">
            {isLarge ? (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={featuresContainerVariants}
                    className="slider z-20 size-96 space-y-2 overflow-y-auto rounded-xl border border-green-400 bg-white p-2 shadow-lg dark:border-green-800 dark:bg-green-950/40"
                >
                    <div className="border-b p-2 text-lg font-semibold">
                        <p>{t('feature-list')}</p>
                    </div>
                    <AnimatePresence>
                        <FeaturesBox lng={lng} />
                    </AnimatePresence>
                </motion.div>
            ) : (
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="fixed inset-x-0 bottom-0 z-50 h-[70vh] rounded-t-2xl bg-white p-4 dark:bg-green-950"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-bold">Features</h3>
                                <Button
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                >
                                    ✕
                                </Button>
                            </div>
                            <FeaturesBox lng={lng} />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
            {!isLarge && (
                <MotionButton
                    variant="outline"
                    size="sm"
                    onClick={() => setOpen((prev) => !prev)}
                    className="fixed top-30 right-7 z-50"
                >
                    {t('features')} ({selectedFeatures.length})
                </MotionButton>
            )}
            <motion.div
                initial="hidden"
                animate={isLarge ? 'visible' : 'hidden'}
                variants={chatContainerVariants(lng)}
                className="flex h-[700px] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-green-800 dark:bg-green-950/40"
            >
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
                            LastMsg={
                                i === messages.length - 1 && msg.role === 'bot'
                            }
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
            </motion.div>
        </div>
    );
};

export default ChatBotContentClient;
