import InfoCard from "@/components/Cards/InfoCard";

const SideBar = () => {

    const features = [
        {

            title: "Bank-grade security",
            description: "Your data is fully protected",

        },
        {
            id: 2,
            title: "Instant Approval",
            description: "Zero wait times, 100% digital",

        },
        {
            id: 3,
            title: "2M+ Happy Customers",
            description: "Building trust across India",

        },
    ];

    return (
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-finsetu-teal to-finsetu-emerald p-16 flex-col justify-between text-white bg-[url('/images/boginBanner.webp')]">
            <div>
                <div className="text-2xl font-bold tracking-tight mb-20">FinSetu</div>
                <h1 className="text-5xl font-extrabold leading-[1.1] mb-6">
                    Access your <br /> financial dashboard
                </h1>
                <p className="text-teal-50 text-lg max-w-md opacity-90">
                    Instant loans, seamless process, and secure digital journeys. Empowering your financial future.
                </p>

                {/* Feature Cards */}
                <div className="mt-12 space-y-4">
                    {
                        features?.map((value, i) => {
                            return (<InfoCard
                                key={i}
                                title={value?.title}
                                description={value?.description}
                            />)
                        })
                    }

                </div>
            </div>
            <p className="text-sm  text-white mt-4">© 2026 FinSetu Financial Services</p>
        </div>
    )

}

export default SideBar


