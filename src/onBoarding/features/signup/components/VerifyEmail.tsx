'use client';
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/i18n/client';
import { resendOtp, verifyAccount } from '@/onBoarding/actions/authActions';
import { useAuthStore } from '@/onBoarding/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
});
const VerifyEmail = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'onBoarding-auth');
    const { email, token, clearUserData, user } = useAuthStore();
    console.log(user, token);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: '',
        },
    });
    const onSubmit = async (data: { pin: string }) => {
        try {
            await verifyAccount(data, token);
            toast.success(t('success-verify'));
            clearUserData();
            router.push(`/${lng}/signin`);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : t('fail-verify'),
            );
        }
    };
    const handleResend = async () => {
        startTransition(async () => {
            try {
                await resendOtp(email);
                console.log(email);
                toast.success(t('success-resend-otp-toast'));
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
        <div className="col-span-3 flex flex-col items-center justify-start lg:col-span-2 dark:text-gray-200">
            <div className="flex flex-col flex-wrap items-center justify-center space-y-6">
                <p className="text-3xl font-semibold sm:text-5xl">
                    {t('verify')}
                </p>
                <p className="text-sm sm:text-xl">
                    {t('check-inbox')} {'   '}(
                    <span className="text-green-600 hover:underline">
                        {email}
                    </span>
                    )
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-18">
                <Controller
                    name="pin"
                    control={control}
                    render={({ field }) => (
                        <InputOTP autoFocus={true} {...field} maxLength={6}>
                            <InputOTPGroup className="gap-2">
                                <InputOTPSlot className="" index={0} />
                                <InputOTPSlot
                                    className=""
                                    dir="rtl"
                                    index={1}
                                />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup className="gap-2">
                                <InputOTPSlot className="" index={2} />
                                <InputOTPSlot className="" index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup className="gap-2">
                                <InputOTPSlot className="" index={4} />
                                <InputOTPSlot className="" index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    )}
                />
                {errors?.pin?.message && (
                    <p className="text-red-500/80">{errors?.pin?.message}</p>
                )}
                <div className="mt-4">
                    <p className="flex items-center">
                        {t('resend-otp')}
                        {''}
                        <span
                            onClick={handleResend}
                            className="ml-2 cursor-pointer transition-colors hover:text-green-600 hover:underline"
                        >
                            {isPending ? <Spinner /> : t('resend-again')}
                        </span>
                    </p>
                </div>
                <div className="mt-12 flex w-full justify-end">
                    <Button
                        variant={null}
                        size={'lg'}
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-700 text-white hover:bg-green-800"
                    >
                        {isSubmitting ? (
                            <Spinner />
                        ) : lng === 'ar' ? (
                            'تأكيد'
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default VerifyEmail;
