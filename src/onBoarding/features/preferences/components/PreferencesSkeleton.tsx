import { Skeleton } from '@/components/ui/skeleton';

const PreferencesSkeleton = ({ lng }: { lng: string }) => {
    return (
        <div className="flex w-full flex-col gap-4 px-2 pb-20 sm:px-0">
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4">
                <div className="w-full lg:col-span-3">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cardIndex) => (
                            <div
                                key={cardIndex}
                                className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-green-800 dark:bg-green-950"
                            >
                                <Skeleton className="h-9 w-9 rounded-lg bg-gray-200 dark:bg-green-800" />
                                <div className="w-full space-y-2">
                                    <Skeleton className="h-5 w-3/4 bg-gray-300 dark:bg-green-800" />
                                    <Skeleton className="h-3 w-full bg-gray-100 dark:bg-green-900/40" />
                                    <Skeleton className="h-3 w-1/3 bg-gray-100 dark:bg-green-900/40" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-fit w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1 dark:border-green-800 dark:bg-green-950">
                    <Skeleton className="mb-6 h-6 w-48 bg-gray-300 dark:bg-green-800" />
                    <div className="flex items-center justify-between mb-6">
                            <Skeleton className="h-4 w-42 bg-gray-300 dark:bg-green-800" />
                            <div className="flex justify-end">
                                <Skeleton className="h-8 w-30 rounded-sm bg-gray-200 dark:bg-green-900/50" />
                            </div>
                        </div>
                    <div className="space-y-6">
                        {[1, 2].map((num) => (
                            <div key={num} className="space-y-4">
                                {/* Title & Input Box Row */}
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-36 bg-gray-300 dark:bg-green-800" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-2 w-4 bg-gray-300 dark:bg-green-800" />
                                    <Skeleton className="h-2 w-4 bg-gray-300 dark:bg-green-800" />
                                </div>
                                {/* Slider Track & Thumb */}
                                <div className="relative flex items-center py-2">
                                    <Skeleton className="h-2 w-full rounded-full bg-gray-200 dark:bg-green-900/30" />
                                    <Skeleton
                                        className={`absolute h-5 w-5 rounded-full ${lng === 'ar' ? 'right-0' : 'left-0'} border-2 border-white bg-green-600 dark:bg-green-500`}
                                    />
                                </div>
                                {/* Hint Text */}
                                <div className="flex justify-end">
                                    <Skeleton className="h-10 w-20 rounded-lg bg-gray-200 dark:bg-green-900/50" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full bg-gray-300 dark:bg-green-800" />
                                    <Skeleton className="h-3 w-3/4 bg-gray-200 dark:bg-green-900/40" />
                                </div>
                            </div>
                        ))}
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-32 bg-gray-300 dark:bg-green-800" />
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3"
                                    >
                                        <Skeleton className="size-4 rounded bg-gray-300 dark:bg-green-800" />
                                        <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-green-900/50" />
                                        <Skeleton className="h-4 w-20 bg-green-200 dark:bg-green-900/70" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-between">
                <Skeleton className="h-9 w-20 rounded-md bg-gray-300 dark:bg-green-800" />
                <Skeleton className="h-9 w-35 rounded-md bg-gray-300 dark:bg-green-800" />
            </div>
        </div>
    );
};

export default PreferencesSkeleton;
