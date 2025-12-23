'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/i18n/client';
import { SendHorizonal } from 'lucide-react';
import { KeyboardEvent } from 'react';

const SendInput = ({
    lng,
    value,
    setValue,
    handleSendMessage,
    disabled,
}: {
    lng: string;
    value: string;
    setValue: (state: string) => void;
    handleSendMessage: () => void;
    disabled: boolean;
}) => {
    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };
    const { t } = useTranslation(lng, 'domain');
    return (
        <div className="relative border-t-2 p-6">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="h-12"
                placeholder={t('ask-ai')}
                onKeyDown={handleKeyPress}
            />
            <Button
                onClick={handleSendMessage}
                disabled={disabled}
                className={`absolute top-[50%] -translate-y-[50%] rounded-md bg-green-600 p-1 transition-colors hover:bg-green-700 active:bg-green-800 ${lng === 'ar' ? 'left-0 translate-x-[35px]' : 'right-0 -translate-x-[35px]'}`}
            >
                <SendHorizonal
                    className={`text-white ${lng === 'ar' ? 'rotate-180' : ''}`}
                />
            </Button>
        </div>
    );
};

export default SendInput;
