
export default function WhiteInfoCard({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div
            className="
        w-full rounded-2xl border border-[#F1F5F9] bg-white
        p-4 shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)]
        sm:rounded-3xl sm:p-6 lg:p-8
      "
        >
            <div className="flex w-full items-center gap-2 border-b border-[#F1F5F9] pb-4">
                <span className="shrink-0">{icon}</span>

                <h3 className="text-base font-bold leading-6 text-[#0F172B] sm:text-lg sm:leading-7">
                    {title}
                </h3>
            </div>

            {children}
        </div>
    );
}