'use client';
import GithubIcon from '@/components/GithubIcon';
import GoogleIcon from '@/components/GoogleIcon';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/i18n/client';
import { signup } from '@/onBoarding/actions/authActions';
import FormField from '@/onBoarding/components/FormField';
import { RegisterFormValues, registerSchema } from '@/onBoarding/schema';
import { useAuthStore } from '@/onBoarding/store/authStore';
import { SignupFormValues } from '@/onBoarding/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignupForm = ({ lng }: { lng: string }) => {
    const [show, setShow] = useState(false);
    const { setEmail, setUserData } = useAuthStore();
    const router = useRouter();
    const { t } = useTranslation(lng, 'onBoarding-auth');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
        },
    });

    const onSubmit = async (data: SignupFormValues) => {
        try {
            const result = await signup(data);
            toast.success(t('success-sign-up'));
            setEmail(data.email);
            setUserData(result.data?.user, result.data?.token);
            router.push('/signup/verify');
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
        <div className="col-span-3 max-w-2xl space-y-8 px-4 py-4 lg:col-span-2 dark:text-gray-200">
            <div className="space-y-4">
                <p className="text-4xl font-bold">{t('sign-up')}</p>
                <p className="text-xl font-semibold">
                    {t('already-have')}
                    {'  '}
                    <Link
                        href={'/signin'}
                        className="transition-colors hover:text-green-600 hover:underline"
                    >
                        {t('login')}
                    </Link>
                </p>
            </div>
            <form
                id="form-rhf-demo"
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                {errors?.root?.message && (
                    <div className="w-full rounded-lg border border-red-600 bg-red-100 p-2 text-red-600">
                        {errors?.root?.message}
                    </div>
                )}
                <FormField
                    placeholder={t('name')}
                    register={register}
                    name="name"
                    label={t('name')}
                    errors={errors}
                />
                <FormField
                    placeholder="example@example.com"
                    register={register}
                    name={'email'}
                    label={t('email')}
                    errors={errors}
                />
                <FormField
                    placeholder="01555835264"
                    register={register}
                    name="phone"
                    label={t('phone')}
                    errors={errors}
                />
                <FormField
                    placeholder="********"
                    register={register}
                    name="password"
                    label={t('password')}
                    errors={errors}
                    type={show ? 'text' : 'password'}
                    suffix={
                        <button
                            type="button"
                            onClick={() => setShow((prev) => !prev)}
                            className="flex items-center justify-center"
                        >
                            {show ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    }
                />

                <FormField
                    placeholder="********"
                    register={register}
                    name="password_confirmation"
                    label={t('confirm-password')}
                    errors={errors}
                    type={show ? 'text' : 'password'}
                    suffix={
                        <button
                            type="button"
                            onClick={() => setShow((prev) => !prev)}
                            className="flex items-center justify-center"
                        >
                            {show ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    }
                />
                <div className="flex w-full justify-end">
                    <Button
                        disabled={isSubmitting}
                        variant={null}
                        className="w-full bg-green-600 text-white hover:bg-green-700"
                        type="submit"
                    >
                        {isSubmitting ? <Spinner /> : t('submit-btn')}
                    </Button>
                </div>
            </form>
            <div className="relative h-px w-full bg-gray-700/40 dark:bg-gray-300/40">
                <div className="absolute -top-3 right-[50%] translate-x-[50%] bg-[#f2f2f2f2] text-start text-sm text-green-700 sm:-top-4 sm:text-xl dark:bg-black dark:text-green-300">
                    {t('another-sign-up')}
                </div>
            </div>
            <form className="grid w-full grid-cols-2 gap-10 space-y-2">
                <Button variant={'outline'} className="w-full hover:shadow-md">
                    <GoogleIcon />
                    Google
                </Button>
                <Button variant={'outline'} className="w-full hover:shadow-md">
                    <GithubIcon />
                    Github
                </Button>
            </form>
        </div>
    );
};

export default SignupForm;
