'use client';

export default function ProductDetailSkeleton() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pt-20 lg:pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 pb-12">
                    {/* Image Gallery Skeleton */}
                    <div className="space-y-4">
                        <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[20px] skeleton-glow" />
                        <div className="hidden sm:grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-xl skeleton-glow" />
                            ))}
                        </div>
                    </div>

                    {/* Product Info Skeleton */}
                    <div className="mt-8 lg:mt-0 flex flex-col h-full">
                        <div className="mb-6">
                            <div className="h-10 skeleton-glow rounded-lg w-3/4 mb-4" />
                            <div className="h-8 skeleton-glow rounded-lg w-1/3" />
                        </div>
                        <div className="w-full h-px bg-gray-200 dark:bg-white/10 mb-8" />
                        <div className="space-y-8 flex-grow">
                            <div>
                                <div className="h-4 skeleton-glow rounded w-24 mb-3" />
                                <div className="flex gap-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-12 h-12 rounded-full skeleton-glow" />
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-16 skeleton-glow rounded-lg" />
                                <div className="h-16 skeleton-glow rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
