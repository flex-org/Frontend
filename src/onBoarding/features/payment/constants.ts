import { CreditCard, Wallet } from 'lucide-react';

export const paymentMethods = (t: (key: string) => string) => [
    { id: 'card', icon: CreditCard, label: t('credit-card') },
    { id: 'wallet', icon: Wallet, label: t('wallet') },
    {
        id: 'paypal',
        icon: null,
        label: t('paypal'),
        isSvg: true,
    },
];
