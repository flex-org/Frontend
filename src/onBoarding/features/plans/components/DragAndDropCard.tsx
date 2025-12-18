import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Blocks, CircleCheck } from 'lucide-react';
import { getTranslation } from '@/i18n/server';
import Link from 'next/link';
const dragDropFeatures = (t: (key: string) => string) => [
    { label: t('drag-drop-f1') },
    { label: t('drag-drop-f2') },
    { label: t('drag-drop-f3') },
];

const DragAndDropCard = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'plans');
    return (
        <Card className="flex h-screen max-h-96 w-full max-w-sm flex-col justify-center">
            <CardHeader>
                <div className="mb-2 flex flex-col items-start gap-2 text-xl">
                    <div className="rounded-md bg-green-800 p-2 text-white">
                        <Blocks />
                    </div>
                    <CardTitle className="font-bold">
                        {t('drag-drop-title')}
                    </CardTitle>
                </div>
                <CardDescription>{t('drag-drop-description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={`/${lng}/build`}>
                    <Button
                        variant={null}
                        className="w-full bg-green-800 font-bold text-white hover:bg-green-900 active:bg-green-950"
                    >
                        {t('drag-drop-action')}
                    </Button>
                </Link>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 dark:text-gray-300">
                {dragDropFeatures(t).map((feature) => (
                    <div
                        className="flex items-center gap-1"
                        key={feature.label}
                    >
                        <CircleCheck className="size-5 dark:text-green-700" />
                        <p>{feature.label}</p>
                    </div>
                ))}
            </CardFooter>
        </Card>
    );
};
export default DragAndDropCard;
