import { getTranslation } from '@/i18n/server';
import PaymentContent from '@/onBoarding/features/payment/components/PaymentContent';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    return {
        title: lng === 'ar' ? 'إتمام الدفع' : 'Checkout',
        description:
            lng === 'ar'
                ? 'أنت على بعد خطوة واحدة من إطلاق أكاديميتك. راجع تفاصيل اشتراكك، اختر طريقة الدفع الآمنة المناسبة لك (بطاقة ائتمان، محفظة إلكترونية، أو PayPal)، وابدأ رحلتك التعليمية مع بلاتمي فوراً. جميع المعاملات مشفرة وآمنة.'
                : 'You are one step away from launching your academy. Review your subscription details, choose your preferred secure payment method (Credit Card, Wallet, or PayPal), and start your educational journey with Platme instantly. All transactions are encrypted and secure.',
    };
};
const PaymentPage = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    const { t } = await getTranslation(lng, 'payment');
    return (
        <div className="mt-24 w-full px-2 pb-20 sm:px-0">
            <div className="flex w-full flex-col items-center justify-center">
                <div className="mx-auto mb-8 max-w-6xl">
                    <div className="mt-12 space-y-4 text-center md:mt-0">
                        <h1 className="text-2xl font-bold sm:text-5xl">
                            {t('payment-title')}
                        </h1>
                        <p className="text-sm font-semibold text-gray-700 sm:text-lg dark:text-gray-300">
                            {t('payment-description')}
                        </p>
                    </div>
                </div>
                <PaymentContent lng={lng} />
            </div>
        </div>
    );
};

export default PaymentPage;
