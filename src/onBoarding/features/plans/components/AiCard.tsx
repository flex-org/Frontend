import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { getTranslation } from '@/i18n/server';
import { Bot, CircleCheck } from 'lucide-react';
import Link from 'next/link';
const aiFeatures = (t: (key: string) => string) => [
    { label: t('ai-f1') },
    { label: t('ai-f2') },
    { label: t('ai-f3') },
];
const AiCard = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'plans');
    return (
        <Card className="flex h-screen max-h-96 w-full max-w-sm flex-col justify-center bg-green-800 text-white dark:bg-green-950">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{t('ai-title')}</CardTitle>
                    <div className="rounded-md bg-gray-100 p-1 text-black">
                        <Bot />
                    </div>
                </div>
                <CardDescription className="text-gray-300">
                    {t('ai-description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={`/${lng}/gomaa`}>
                    <Button
                        variant={null}
                        className="w-full bg-gray-100 text-black hover:bg-gray-300 active:bg-gray-400"
                    >
                        {t('ai-action')}
                    </Button>
                </Link>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-gray-100 dark:text-gray-300">
                {aiFeatures(t).map((feature) => (
                    <div
                        className="flex items-center gap-1"
                        key={feature.label}
                    >
                        <CircleCheck className="size-5 dark:text-gray-300" />
                        <p>{feature.label}</p>
                    </div>
                ))}
            </CardFooter>
        </Card>
    );
};
export default AiCard;
