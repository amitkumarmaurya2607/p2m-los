import Logo from "@/assets/icon/Logo";
import InfoCard from "@/components/Cards/InfoCard";
import { ShieldCheck, TrendingUp, Users } from "lucide-react";

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
        flex-col justify-between text-primary-foreground bg-[url('/images/boginBanner.webp')]"
    >
      <div>
        <div className="mb-16">
          <Logo />
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
