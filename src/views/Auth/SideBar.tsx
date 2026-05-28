import Logo from "@/assets/icon/Logo";
import InfoCard from "@/components/Cards/InfoCard";
import { ShieldCheck, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const SideBar = () => {
  const features = [
    {
      id: 1,
      title: "Bank-grade security",
      description: "Your data is fully protected",
      className: "bg-gradient-to-br from-[#6FFFD2] to-[#00C89C]",
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
    },
    {
      id: 2,
      title: "Instant Approval",
      description: "Zero wait times, 100% digital",
      className: "bg-gradient-to-br from-[#7A7AF5] to-[#3737C1]",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
    {
      id: 3,
      title: "2M+ Happy Customers",
      description: "Building trust across India",
      className: "bg-gradient-to-br from-[#6FFFD2] to-[#00C89C]",
      icon: <Users className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div
      className="hidden lg:flex w-1/2 bg-gradient-to-br from-sidebar-from to-sidebar-to p-16
        flex-col justify-between text-primary-foreground bg-[url('/images/loginBg.jpg')]"
    >
      <div>
        <div className="mb-16">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="h-8 w-8 rotate-12 rounded-[10px] bg-gradient-to-br from-secondary
                to-primary shadow-lg shadow-primary/20 text-[18px] font-bold leading-none text-white
                items-center flex justify-center"
            >
              R
            </span>
            <span className="text-[24px] font-black leading-8 tracking-[-1.2px] text-white">
              RinSetu<span className="text-secondary">.</span>
            </span>
          </Link>
        </div>
        <h1 className="text-5xl font-extrabold leading-[1.1] mb-6">
          Access your <br /> financial dashboard
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-md opacity-90">
          Instant loans, seamless process, and secure digital journeys. Empowering your financial
          future.
        </p>

        <div className="mt-12 space-y-4">
          {features?.map((value, i) => {
            return (
              <InfoCard
                key={value.id}
                title={value.title}
                description={value.description}
                icon={value.icon}
                className={value.className}
              />
            );
          })}
        </div>
      </div>
      <p className="text-sm text-primary-foreground mt-4">© 2026 FinSetu Financial Services</p>
    </div>
  );
};

export default SideBar;
