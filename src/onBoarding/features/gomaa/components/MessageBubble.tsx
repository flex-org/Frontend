'use client'
import { useTranslation } from '@/i18n/client';
import { Message } from '@/onBoarding/types';
import parse from 'html-react-parser';

const MessageBubble =  ({ lng, msg }: { lng: string; msg: Message }) => {
    const { t } =  useTranslation(lng, 'domain');
    const contentToShow =
        msg.content === 'welcome-message'
            ? t('welcome-message')
            : msg.content;
    return (
        <div
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
        >
            <div
                className={`relative max-w-[85%] px-4 py-3 text-sm shadow-sm md:text-base ${
                    msg.role === 'user'
                        ? `rounded-2xl ${lng === 'ar' ? 'rounded-tl-none' : 'rounded-tr-none'} bg-green-600 text-white dark:bg-green-700`
                        : `rounded-2xl ${lng === 'ar' ? 'rounded-tr-none' : 'rounded-tl-none'} bg-gray-200 text-gray-800 dark:bg-emerald-800 dark:text-gray-100`
                } [&_li]:mb-1 [&_li]:marker:text-current [&_ol]:list-decimal [&_ol]:ps-6 [&_ul]:list-disc [&_ul]:ps-6`}
            >
                <div>{parse(contentToShow)}</div>
            </div>
        </div>
    );
};

export default MessageBubble;
