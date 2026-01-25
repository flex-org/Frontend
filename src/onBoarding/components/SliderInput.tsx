import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useTranslation } from '@/i18n/client';
import { AlertCircle } from 'lucide-react';
import { SliderInputProps } from '../types';
import ToolTipComponent from '@/components/ToolTipComponent';

const SliderInput = ({
    value,
    setValue,
    min,
    max,
    step,
    lng,
    title,
    label,
}: SliderInputProps) => {
    const { t } = useTranslation(lng, 'preferences');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(Number(inputValue));
    };
    const handleBlur = () => {
        if (value < 50) {
            setValue(50);
        } else if (value > 10000) {
            setValue(10000);
        }
    };
    const handleSliderChange = (val: number[]) => {
        setValue(val[0]);
    };
    return (
        <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                {t(title)}
            </h4>
            <div className="space-y-2">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {min}
                        </p>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {max}
                        </p>
                    </div>
                    <ToolTipComponent label={label}>
                        <Slider
                            value={[value]}
                            min={min}
                            max={max}
                            name="slider"
                            step={step}
                            aria-label={label}
                            dir={`${lng === 'ar' ? 'rtl' : 'ltr'}`}
                            onValueChange={handleSliderChange}
                        />
                    </ToolTipComponent>
                    <div className="flex justify-end">
                        <ToolTipComponent label={label}>
                            <Input
                                type="number"
                                value={value}
                                onChange={handleInputChange}
                                min={min}
                                onBlur={handleBlur}
                                max={max}
                                step={step}
                                className="w-fit rounded-lg bg-gray-300 p-2"
                                aria-label={label}
                            />
                        </ToolTipComponent>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <AlertCircle className="size-4" />
                        <p className="text-xs">{t('student-number-alert')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderInput;
