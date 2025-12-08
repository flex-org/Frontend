'use client';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/i18n/client';
import { login } from '@/onBoarding/actions/authActions';
import FormField from '@/onBoarding/components/FormField';
import { LoginFormValues, LoginSchema } from '@/onBoarding/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import GoogleIcon from '@/components/GoogleIcon';
import GithubIcon from '@/components/GithubIcon';
const SignInForm = ({ lng }: { lng: string }) => {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const { t } = useTranslation(lng, 'onBoarding-auth');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        const result = await login(data);
        if (result?.error) {
            toast.error(result.error || t('failed-login'));
            setError('root', {
                message: result.error,
            });
        } else {
            const params = new URLSearchParams(window.location.search);
            const callbackUrl = params.get('callbackUrl') || `/${lng}`;
            const finalUrl = callbackUrl.startsWith(`/${lng}`)
                ? callbackUrl
                : `/${lng}${callbackUrl}`;
            router.push(finalUrl);
        }
    };
    return (
        <div className="col-span-3 max-w-2xl space-y-8 px-4 py-4 lg:col-span-2 dark:text-gray-200">
            <div className="space-y-4">
                <p className="text-4xl font-bold">{t('login')}</p>
                <p className="text-xl font-semibold">
                    {t('dont-have')}
                    {'  '}
                    <Link
                        href={`/${lng}/signup`}
                        className="transition-colors hover:text-green-600 hover:underline"
                    >
                        {t('sign-up')}
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
                    placeholder="example@example.com"
                    register={register}
                    name={'email'}
                    label={t('email')}
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
                            title={
                                lng === 'ar'
                                    ? 'اظهار كلمة المرور'
                                    : 'show password'
                            }
                            onClick={() => setShow((prev) => !prev)}
                            className="flex items-center justify-center"
                        >
                            {show ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    }
                />
                <div className="flex w-full justify-end">
                    <Button
                        variant={null}
                        disabled={isSubmitting}
                        className="w-full bg-green-600 text-white hover:bg-green-700 hover:shadow-md"
                        type="submit"
                    >
                        {isSubmitting ? <Spinner /> : t('login')}
                    </Button>
                </div>
            </form>
            <div className="relative h-px w-full bg-gray-700/40 dark:bg-gray-300/40">
                <div className="absolute -top-3 right-[50%] translate-x-[50%] bg-[#f2f2f2f2] text-start text-sm text-green-700 sm:-top-4 sm:text-xl dark:bg-black dark:text-green-300">
                    {t('another-login')}
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

export default SignInForm;
