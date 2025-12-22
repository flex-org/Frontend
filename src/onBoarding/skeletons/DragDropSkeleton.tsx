import { Skeleton } from '@/components/ui/skeleton';
const DragDropSkeleton = () => {
    return (
        <div className="w-full">
            <div className="grid w-full grid-cols-4 gap-6">
                <div className="col-span-4 flex flex-col rounded-lg border border-gray-200 bg-white shadow-md md:col-span-2 lg:col-span-1 dark:border-green-800 dark:bg-green-950">
                    {/* Header List */}
                    <div className="border-b border-gray-300 p-4 dark:border-green-700">
                        <Skeleton className="h-5 w-24 bg-gray-300 dark:bg-green-800" />
                    </div>
                    {/* Features List items */}
                    <div className="flex flex-col gap-4 p-4">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 rounded border border-green-200 p-4 dark:border-green-900/50"
                            >
                                {/* Icon & Grip Placeholder */}
                                <div className="flex shrink-0 items-center gap-2">
                                    <Skeleton className="h-5 w-5 bg-gray-200 dark:bg-green-800" />{' '}
                                    {/* Grip icon */}
                                    <Skeleton className="h-10 w-10 rounded-md bg-green-800" />{' '}
                                    {/* Main icon box */}
                                </div>
                                {/* Text lines */}
                                <div className="flex w-full flex-col gap-2">
                                    <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-green-900" />
                                    <Skeleton className="h-3 w-full bg-gray-100 dark:bg-green-900/40" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-4 min-h-[500px] rounded-lg border-2 border-dashed border-green-700 bg-gray-50/50 p-6 md:col-span-2 lg:col-span-3 dark:bg-green-950/20">
                    {/* Top Bar Stats */}
                    <div className="mb-8 border-b border-gray-300 pb-6 dark:border-green-800">
                        <div className="flex items-center justify-between px-4">
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-5 w-48 bg-gray-200 dark:bg-green-900" />
                            </div>
                            {/* Vertical Divider */}
                            <div className="h-10 w-0.5 bg-gray-300 dark:bg-green-800" />
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-green-900" />
                            </div>
                        </div>
                    </div>

                    {/* Central "Drag & Drop Here" Mockup */}
                    <div className="flex h-full flex-col items-center justify-center space-y-6">
                        {/* Plus Icon Box */}
                        <div className="rounded-md bg-gray-200 p-4 dark:bg-green-900/60">
                            <Skeleton className="h-6 w-6 rounded-sm bg-gray-300 dark:bg-green-800" />
                        </div>
                        {/* Text placeholder */}
                        <Skeleton className="h-4 w-56 bg-gray-200 dark:bg-green-900" />
                    </div>
                </div>
            </div>
            <div className="mb-8 flex justify-end mt-2">
                <Skeleton className="h-10 w-25 bg-green-800" />
            </div>
        </div>
    );
};

export default DragDropSkeleton;
