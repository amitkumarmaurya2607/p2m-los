import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";

export default function NotFound({ type = "public" }: { type?: "dashboard" | "public" }) {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-surface-accent">
      <Header />

      <section
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-20"
      >
        {/* Background Shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -bottom-[180px] right-[-140px] h-[620px] w-[620px] rounded-full
              bg-[radial-gradient(circle_at_35%_35%,#49EFF0_0%,#6BD9F2_28%,#B9B0FF_72%,rgba(185,176,255,0)_100%)]
              opacity-80"
          />

          <div
            className="absolute bottom-[-220px] left-1/2 h-[420px] w-[520px] -translate-x-1/2
              rounded-full
              bg-[linear-gradient(135deg,rgba(222,210,255,0.75),rgba(131,216,255,0.42))] blur-[6px]"
          />

          <div
            className="absolute bottom-[50px] right-[-30px] h-[170px] w-[360px] rotate-[35deg]
              rounded-[120px] bg-[#31E5E6]/55 blur-[8px]"
          />

          <div
            className="absolute right-[-25px] top-[34%] h-[340px] w-[85px] rounded-[50px]
              bg-[#46DFF2]/60 blur-[12px]"
          />

          <div
            className="absolute right-[40px] top-[24%] h-10 w-10 rounded-full
              bg-[radial-gradient(circle,#6eeaff_0%,#c0a9ff_75%)] blur-[6px]"
          />

          <div
            className="absolute right-[22%] top-[54%] h-16 w-16 rounded-full
              bg-[radial-gradient(circle,#6eeaff_0%,#c0a9ff_75%)] blur-[8px]"
          />

          <div
            className="absolute bottom-[25%] left-[52%] h-10 w-10 rounded-full
              bg-[radial-gradient(circle,#6eeaff_0%,#b6a8ff_75%)] blur-[6px]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1
            className="text-[90px] font-light leading-none tracking-[2px] text-text-dark-blue
              sm:text-[120px]"
          >
            404
          </h1>

          <h2 className="mt-6 text-[24px] font-bold text-text-dark-blue sm:text-[30px]">
            Page Not Found.
          </h2>

          <p
            className="mt-5 max-w-[500px] text-[16px] leading-[28px] text-text-muted-dark
              sm:text-[18px]"
          >
            Sorry, we can’t find the page you’re looking for.
          </p>

          <Link
            href={type === "dashboard" ? "/apply" : "/"}
            className="mt-10 inline-flex h-[56px] min-w-[220px] items-center justify-center
              rounded-full bg-primary px-8 text-[18px] font-bold text-white
              shadow-[var(--shadow-btn-soft)] transition-all duration-200 hover:brightness-110
              active:scale-95"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
