import { Input } from '@/components/ui/input';
import { FormFieldProps } from '../types';
import { get, useFormContext, FieldValues, Controller } from 'react-hook-form';

function FormField<T extends FieldValues = FieldValues>({
    name,
    label,
    placeholder,
    type = 'text',
    suffix,
    autoComplete,
}: FormFieldProps<T>) {
    const {
        formState: { errors },
        control,
    } = useFormContext();
    const error = errors ? get(errors, name as string) : undefined;
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col space-y-2">
                        <label htmlFor={name} className="font-semibold">
                            {label}
                        </label>
                        <div className="relative">
                            <Input
                                {...field}
                                id={name}
                                type={type}
                                placeholder={placeholder}
                                autoComplete={autoComplete}
                                className={`h-14 rounded-sm border border-gray-400 bg-white p-2 text-base! transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-green-600/40 dark:border-gray-600 ${suffix ? 'pe-10' : ''}`}
                            />
                            {suffix && (
                                <div
                                    className={`absolute end-3 top-1/2 -translate-y-1/2 text-gray-500`}
                                >
                                    {suffix}
                                </div>
                            )}
                        </div>
                        {error?.message && (
                            <p className="text-sm text-red-500">
                                {error.message}
                            </p>
                        )}
                    </div>
                )}
            />
        </>
    );
}

export default FormField;
