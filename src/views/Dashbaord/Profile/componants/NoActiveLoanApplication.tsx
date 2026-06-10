import { FileSearch } from "lucide-react";

export function NoActiveLoanApplication() {
    return (
        <div className="mt-5 rounded-2xl border border-[#F1F5F9] bg-white p-6 text-center shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] sm:mt-8 sm:rounded-3xl sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3737C1]/10 sm:h-16 sm:w-16">
                <FileSearch className="h-7 w-7 text-[#3737C1] sm:h-8 sm:w-8" />
            </div>

            <h2 className="mt-5 text-lg font-extrabold leading-7 text-[#0F172B] sm:text-2xl sm:leading-8">
                No active loan application found
            </h2>

            <p className="mx-auto mt-2 max-w-[420px] text-sm font-medium leading-6 text-[#62748E] sm:text-base">
                You do not have any active loan application right now. Once you apply for
                a loan, your application status will appear here.
            </p>
        </div>
    );
}