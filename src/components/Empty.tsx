import { Package } from 'lucide-react';

const Empty =  ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-gray-300 bg-white p-10 text-center dark:border-green-800 dark:bg-green-900/20">
            <div className="mb-4 rounded-full bg-green-800 p-6 text-white">
                <Package className="size-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {description}
            </p>
        </div>
    );
};

export default Empty;
