import { Input } from '@/components/ui/input';
import { FormFieldProps } from '../types';
import { FieldValues, get } from 'react-hook-form';

function FormField<TFormValues extends FieldValues>({
    register,
    errors,
    name,
    label,
    placeholder,
    type = 'text',
    suffix,
}: FormFieldProps<TFormValues>) {
    const error = errors ? get(errors, name as string) : undefined;

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="font-semibold">
                {label}
            </label>
            <div className="relative">
                <Input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                    className={`rounded-sm border border-gray-400 bg-white p-2 transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-green-600/40 dark:border-gray-600 ${suffix ? 'pr-10' : ''}`}
                />
                {suffix && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                        {suffix}
                    </div>
                )}
            </div>
            {error?.message && (
                <p className="text-sm text-red-500">{error.message}</p>
            )}
        </div>
    );
}

export default FormField;
