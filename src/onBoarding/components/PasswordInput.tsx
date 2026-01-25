'use client';
import { useState } from 'react';
import FormField from './FormField';
import { useTranslation } from '@/i18n/client';
import { Eye, EyeOff } from 'lucide-react';
interface Props {
    lng: string;
    name: string;
    label: string;
    autoComplete?: string;
}
const PasswordInput = ({ lng, name, label, autoComplete }: Props) => {
    const [show, setShow] = useState(false);
    const { t } = useTranslation(lng, 'onBoarding-auth');
    return (
        <FormField
            placeholder="********"
            name={name}
            label={t(label)}
            type={show ? 'text' : 'password'}
            autoComplete={autoComplete}
            suffix={
                <button
                    type="button"
                    aria-label={show ? t('hide_password') : t('show_password')}
                    onClick={() => setShow((prev) => !prev)}
                    className="flex items-center justify-center"
                >
                    {show ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
            }
        />
    );
};

export default PasswordInput;
