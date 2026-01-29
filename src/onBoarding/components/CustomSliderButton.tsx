'use client';

import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

interface CustomSliderButtonProps {
    value: boolean;
    payment?: boolean;
    onChange: (value: boolean) => void;
    yesLabel?: string;
    noLabel?: string;
    className?: string;
    lng: string;
    classNames: string;
    buttonsClassNames?: string;
}

const CustomSliderButton = ({
    value,
    onChange,
    yesLabel,
    noLabel,
    lng,
    classNames,
    payment,
    buttonsClassNames,
}: CustomSliderButtonProps) => {
    return (
        <div
            className={cn(
                `relative flex h-9 w-full items-center rounded-md border p-1 text-gray-500 ${value ? 'border-green-500/40' : 'border-gray-500/40'}`,
                classNames,
            )}
            role="radiogroup"
            aria-label={`${lng === 'ar' ? 'خيار تطبيق الهاتف' : 'Mobile App Option'}`}
        >
            <button
                type="button"
                onClick={() => onChange(false)}
                className={cn(
                    'relative z-10 flex flex-1 items-center justify-center py-1 text-sm font-medium transition-colors duration-200',
                    !value
                        ? 'text-white'
                        : 'hover:text-gray-700 dark:hover:text-gray-300',
                    buttonsClassNames,
                )}
            >
                <span
                    className={`relative z-20 ${payment && 'text-xs sm:text-sm'}`}
                >
                    {noLabel}
                </span>
                {!value && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 z-10 rounded-sm bg-gray-500 shadow-sm"
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                        }}
                    />
                )}
            </button>
            <button
                type="button"
                onClick={() => onChange(true)}
                className={cn(
                    'relative z-10 flex flex-1 items-center justify-center py-1 text-sm font-medium transition-colors duration-200',
                    value
                        ? 'text-white'
                        : 'hover:text-gray-700 dark:hover:text-gray-300',
                    buttonsClassNames,
                )}
            >
                <span className={`relative z-20 dark:text-white ${payment && 'text-xs sm:text-sm'}`}>
                    {yesLabel}
                </span>
                {payment && (
                    <span className={`z-50 mr-1 sm:mr-2 ml-1.5 inline-block rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700 dark:text-black`}>
                        -20%
                    </span>
                )}
                {value && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 z-10 rounded-sm bg-green-800 shadow-sm dark:bg-green-600/60"
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                        }}
                    />
                )}
            </button>
        </div>
    );
};

export default CustomSliderButton;
