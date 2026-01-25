'use client';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/i18n/client';
import { signup } from '@/onBoarding/actions/authActions';
import FormField from '@/onBoarding/components/FormField';
import PasswordInput from '@/onBoarding/components/PasswordInput';
import { createRegisterSchema, RegisterFormValues } from '@/onBoarding/schema';
import { useAuthStore } from '@/onBoarding/store/authStore';
import { SignupFormValues } from '@/onBoarding/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignupForm = ({ lng }: { lng: string }) => {
    const { setEmail, setUserData } = useAuthStore();
    const router = useRouter();
    const { t } = useTranslation(lng, ['onBoarding-auth', 'zodValidation']);
    const schema = useMemo(() => createRegisterSchema(t), [t]);
    const methods = useForm<RegisterFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
        },
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = methods;
    const onSubmit = async (data: SignupFormValues) => {
        try {
            const result = await signup(data);
            toast.success(t('success-sign-up'));
            setEmail(data.email);
            setUserData(result.data?.user, result.data?.token);
            router.push(`/${lng}/signup/verify`);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : t('failed-sign-up'),
            );
            setError('root', {
                message:
                    error instanceof Error ? error.message : t('set-error-msg'),
            });
        }
    };
    return (
        <div className="col-span-2 w-full space-y-8 px-4 py-8 lg:col-span-1 dark:text-gray-200">
            <p className="text-4xl font-bold">{t('sign-up')}</p>
            <FormProvider {...methods}>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {errors?.root?.message && (
                        <div className="w-full rounded-lg border border-red-600 bg-red-100 p-2 text-red-600">
                            {errors?.root?.message}
                        </div>
                    )}
                    <FormField
                        placeholder={t('name')}
                        name="name"
                        label={t('name')}
                        autoComplete="name"
                    />
                    <FormField
                        placeholder="example@example.com"
                        name={'email'}
                        label={t('email')}
                        autoComplete="email"
                    />
                    <FormField
                        placeholder="01555835264"
                        name="phone"
                        label={t('phone')}
                        autoComplete="tel"
                    />
                    <PasswordInput
                        lng={lng}
                        name="password"
                        label="password"
                        autoComplete="new-password"
                    />
                    <PasswordInput
                        lng={lng}
                        name="password_confirmation"
                        label="confirm-password"
                        autoComplete="new-password"
                    />

                    <div className="flex w-full justify-end">
                        <Button
                            disabled={isSubmitting}
                            variant={null}
                            className="h-10 w-full bg-green-600 text-lg text-white hover:bg-green-700"
                            type="submit"
                        >
                            {isSubmitting ? <Spinner /> : t('sign-up-btn')}
                        </Button>
                    </div>
                    <p className="text-xl font-semibold">
                        {t('already-have')}
                        {'  '}
                        <Link
                            href={`/${lng}/signin`}
                            className="text-green-500 transition-colors hover:text-green-600 hover:underline"
                        >
                            {t('login')}
                        </Link>
                    </p>
                </form>
            </FormProvider>
        </div>
    );
};

export default SignupForm;
