function SkeletonBlock({ className = "" }: { className?: string }) {
    return (
        <div
            className={`animate-pulse rounded-md bg-slate-200/80 ${className}`}
        />
    );
}

export function LoanApplicationSkeleton() {
    return (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_306px] lg:items-start">
            {/* Left Side */}
            <div className="w-full min-w-0">
                <div className="rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] sm:rounded-3xl sm:p-6 lg:p-8">
                    {/* Top badges */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <SkeletonBlock className="h-8 w-full max-w-[170px] sm:h-10 sm:max-w-[190px]" />
                        <SkeletonBlock className="h-8 w-full max-w-[145px] sm:h-9 sm:max-w-[160px]" />
                    </div>

                    {/* Info grid */}
                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:mt-8 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="min-w-0">
                                <SkeletonBlock className="h-3 w-[70%] max-w-[110px]" />
                                <SkeletonBlock className="mt-2 h-5 w-[85%] max-w-[135px] sm:h-7" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notice skeleton */}
                <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-[#F1F5F9] bg-white p-3 shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.04)] sm:mt-6 sm:gap-3 sm:p-4">
                    <SkeletonBlock className="h-5 w-5 shrink-0 rounded-full sm:h-6 sm:w-6" />

                    <div className="w-full min-w-0">
                        <SkeletonBlock className="h-4 w-[55%] max-w-[210px]" />
                        <SkeletonBlock className="mt-2 h-3 w-full max-w-[440px]" />
                        <SkeletonBlock className="mt-2 h-3 w-[80%] max-w-[340px] sm:hidden" />
                    </div>
                </div>
            </div>

            {/* Right Tracker */}
            <div className="w-full rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] sm:rounded-3xl sm:p-6 lg:max-w-[306px] lg:p-8">
                <SkeletonBlock className="h-5 w-[65%] max-w-[170px] sm:h-6" />

                <div className="mt-4 h-px w-full bg-[#F1F5F9]" />

                <div className="mt-6 border-l-2 border-[#F1F5F9] pl-5 sm:mt-8 sm:pl-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="relative pb-6 last:pb-0 sm:pb-8">
                            <SkeletonBlock className="absolute -left-[29px] top-0 h-3.5 w-3.5 rounded-full sm:-left-[33px] sm:h-4 sm:w-4" />

                            <SkeletonBlock className="h-4 w-[75%] max-w-[160px] sm:h-5" />
                            <SkeletonBlock className="mt-2 h-3 w-[45%] max-w-[95px]" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}