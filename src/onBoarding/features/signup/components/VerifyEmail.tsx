'use client';
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/i18n/client';
import { resendOtp, verifyAccount } from '@/onBoarding/actions/authActions';
import { useAuthStore } from '@/onBoarding/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const FormSchema = (t: TFunction) =>
    z.object({
        pin: z.string().min(6, {
            message: t('error-otp'),
        }),
    });
const VerifyEmail = ({ lng }: { lng: string }) => {
    const [timeLeft, setTimeLeft] = useState(60);
    const { t } = useTranslation(lng, 'onBoarding-auth');
    const { email, token, clearUserData } = useAuthStore();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const schema = useMemo(() => FormSchema(t), [t]);
    const isTimerActive = timeLeft > 0;
    useEffect(() => {
        if (!isTimerActive) return;
        const intervalId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [isTimerActive]);
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        control,
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            pin: '',
        },
    });
    const onSubmit = async (data: { pin: string }) => {
        try {
            const result = await verifyAccount(data, token);
            toast.success(t('success-verify'));
            const loginResult = await signIn('credentials', {
                redirect: false,
                token: result.data.access_token,
                user: JSON.stringify(result.data.user),
                isVerified: !!result.data.user.email_verified_at,
            });
            if (loginResult?.error) {
                router.push(`/${lng}/signin`);
            } else {
                clearUserData();
                router.push(`/${lng}/`);
            }
        } catch (error) {
            setError('root', {
                message:
                    error instanceof Error ? error.message : t('fail-verify'),
            });
            toast.error(
                error instanceof Error ? error.message : t('fail-verify'),
            );
        }
    };
    const handleResend = async () => {
        startTransition(async () => {
            try {
                await resendOtp(email);
                toast.success(t('success-resend-otp-toast'));
                setTimeLeft(60);
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : t('fail-resend-otp-toast'),
                );
            }
        });
    };
    return (
        <div className="col-span-2 flex flex-col items-center justify-start px-4 py-8 lg:col-span-1 dark:text-gray-200">
            <div className="flex w-full flex-col flex-wrap items-center justify-center space-y-6">
                <p className="text-2xl font-semibold sm:text-4xl md:text-5xl">
                    {t('verify')}
                </p>
                <p className="text-center text-sm sm:text-xl">
                    {t('check-inbox')} {'   '}(
                    <span className="text-green-600 hover:underline">
                        {email}
                    </span>
                    )
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
                <Controller
                    name="pin"
                    control={control}
                    render={({ field }) => (
                        <InputOTP
                            autoComplete="one-time-code"
                            autoFocus={true}
                            maxLength={6}
                            {...field}
                        >
                            <InputOTPGroup className="flex flex-wrap justify-center gap-2">
                                {[...Array(6)].map((_, i) => (
                                    <InputOTPSlot
                                        key={i}
                                        className="size-16 text-2xl"
                                        index={i}
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    )}
                />
                {errors?.pin?.message && (
                    <p className="text-red-500/80">{errors?.pin?.message}</p>
                )}
                {errors.root?.message && (
                    <p className="mt-4 text-xs text-red-500 sm:text-sm">
                        {errors.root.message}
                    </p>
                )}
                <div className="mt-4">
                    <div className="flex items-center">
                        {t('resend-otp')}
                        {''}
                        <Button
                            variant={'ghost'}
                            type="button"
                            onClick={handleResend}
                            disabled={isTimerActive || isPending}
                            className={`transition-colors ${
                                isTimerActive
                                    ? 'cursor-not-allowed text-gray-600 dark:text-gray-300'
                                    : 'cursor-pointer text-green-800 hover:text-green-600 hover:underline dark:text-green-500'
                            }`}
                        >
                            {isPending ? (
                                <Spinner />
                            ) : isTimerActive ? (
                                <span>
                                    {t('resend-in')} {timeLeft}s
                                </span>
                            ) : (
                                t('resend-again')
                            )}
                        </Button>
                    </div>
                </div>
                <div className="mt-12 flex w-full justify-end">
                    <Button
                        variant={null}
                        size={'lg'}
                        type="submit"
                        disabled={isSubmitting}
                        className="primary-btn text-lg"
                    >
                        {isSubmitting ? <Spinner /> : t('confirm')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default VerifyEmail;
