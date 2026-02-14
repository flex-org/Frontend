'use client';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/i18n/client';
import { login } from '@/onBoarding/actions/authActions';
import FormField from '@/onBoarding/components/FormField';
import PasswordInput from '@/onBoarding/components/PasswordInput';
import { LoginFormValues, createLoginSchema } from '@/onBoarding/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignInForm = ({ lng }: { lng: string }) => {
    const { update } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useTranslation(lng, ['onBoarding-auth', 'zodValidation']);
    const LoginSchema = useMemo(() => createLoginSchema(t), [t]);
    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
        reValidateMode:'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = methods;
    const onSubmit = async (data: LoginFormValues) => {
        const result = await login(data);
        if (!result?.success) {
            toast.error(result.error || t('failed-login'));
            setError('root', {
                message: result.error,
            });
        } else {
            await update();
            router.refresh();
            const callbackUrl = searchParams.get('callbackUrl');
            const isValidRedirect =
                callbackUrl &&
                callbackUrl.startsWith('/') &&
                !callbackUrl.startsWith('//');
            if (isValidRedirect) {
                router.push(callbackUrl);
            } else {
                router.push(`/${lng}/`);
            }
        }
    };
    return (
        <div className="col-span-2 w-full space-y-8 px-4 py-8 lg:col-span-1 dark:text-gray-200">
            <div className="space-y-4">
                <p className="text-4xl font-bold">{t('login')}</p>
            </div>
            <FormProvider {...methods}>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {errors?.root?.message && (
                        <div className="w-full rounded-lg border border-red-600 bg-red-100 p-2 text-red-600">
                            {errors?.root?.message}
                        </div>
                    )}
                    <FormField
                        placeholder="example@example.com"
                        name={'email'}
                        label={t('email')}
                        autoComplete="email"
                    />
                    <PasswordInput
                        lng={lng}
                        name="password"
                        label="password"
                        autoComplete="current-password"
                    />
                    <div className="flex w-full justify-end">
                        <Button
                            variant={null}
                            disabled={isSubmitting}
                            className="primary-btn h-10 w-full text-lg"
                            type="submit"
                        >
                            {t('login')}
                            <div>{isSubmitting && <Spinner />}</div>
                        </Button>
                    </div>
                    <div className="text-xl font-semibold">
                        {t('dont-have')}
                        {'  '}
                        <Link
                            href={`/${lng}/signup`}
                            className="text-green-500 transition-colors hover:text-green-600 hover:underline"
                        >
                            {t('sign-up')}
                        </Link>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default SignInForm;
