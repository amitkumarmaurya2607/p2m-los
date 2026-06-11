
export function SkeletonBlock({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse rounded-md bg-slate-200/80 ${className}`} />;
}


export default function EmploymentSkeleton() {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-3 border-b border-[#E2E8F0] pb-5 sm:pb-6">
                <SkeletonBlock className="h-8 w-full max-w-[260px]" />
                <SkeletonBlock className="h-4 w-full max-w-[360px]" />
            </div>

            {/* <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#F1F5F9] bg-white p-4
              shadow-[0px_4px_24px_-12px_rgba(0,0,0,0.05)] sm:p-5 lg:rounded-[20px] lg:p-6"
          >
            <SkeletonBlock className="h-3 w-[70%] max-w-[110px]" />
            <SkeletonBlock className="mt-3 h-6 w-[85%] max-w-[150px] sm:h-8" />
          </div>
        ))}
      </div> */}

            <div
                className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_306px]
          lg:items-start"
            >
                <div className="space-y-5 sm:space-y-8">
                    {Array.from({ length: 2 }).map((_, cardIndex) => (
                        <div
                            key={cardIndex}
                            className="rounded-2xl border border-[#F1F5F9] bg-white p-4
                shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] sm:rounded-3xl sm:p-6 lg:p-8"
                        >
                            <div className="flex items-center gap-3 border-b border-[#F1F5F9] pb-4">
                                <SkeletonBlock className="h-9 w-9 rounded-xl" />
                                <SkeletonBlock className="h-5 w-44" />
                            </div>

                            <div
                                className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6"
                            >
                                {Array.from({ length: cardIndex === 0 ? 6 : 4 }).map((_, index) => (
                                    <div key={index}>
                                        <SkeletonBlock className="h-3 w-28" />
                                        <SkeletonBlock className="mt-2 h-5 w-[80%] max-w-[180px]" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="w-full rounded-2xl border border-[#3737C1]/10 bg-[#3737C1]/5 p-4 sm:rounded-3xl
            sm:p-6 lg:min-h-[578px] lg:max-w-[306px] lg:p-8"
                >
                    <SkeletonBlock className="h-6 w-40" />

                    <div
                        className="mt-5 rounded-[14px] border border-[#F1F5F9] bg-white p-4
              shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] sm:mt-6 sm:p-6"
                    >
                        <SkeletonBlock className="h-10 w-10 rounded-[10px]" />
                        <SkeletonBlock className="mt-4 h-5 w-40" />
                        <SkeletonBlock className="mt-3 h-4 w-full" />
                        <SkeletonBlock className="mt-2 h-4 w-[75%]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
