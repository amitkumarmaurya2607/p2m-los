import React from "react";
import { Quote, Star } from "lucide-react";

const stars = Array.from({ length: 5 });

const users = [
  "/user-1.jpg",
  "/user-2.jpg",
  "/user-3.jpg",
  "/user-4.jpg",
];

const RatingReviews = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0F172A] px-4 py-20 sm:px-6 lg:px-[95px] lg:py-32">
      <div className="absolute -left-[135px] -top-[171px] h-[514px] w-[811px] rounded-full bg-[#3737C1]/30 blur-[120px]" />
      <div className="absolute bottom-[-170px] right-[-140px] h-[428px] w-[676px] rounded-full bg-[#00C89C]/20 blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.8)_0%,rgba(15,23,42,0.95)_100%)]" />

      <div className="relative mx-auto flex max-w-[1232px] flex-col items-center gap-16 lg:flex-row lg:gap-24">
        <div className="w-full max-w-[568px]">
          <h2 className="text-[44px] font-extrabold leading-[52px] tracking-[-1.2px] text-white sm:text-[60px] sm:leading-[66px]">
            What Our <br />
            <span className="bg-[linear-gradient(90deg,#00C89C_0%,#07BFA1_7.14%,#0EB6A5_14.29%,#14ADA9_21.43%,#18A3AC_28.57%,#1C9AB0_35.71%,#2091B2_42.86%,#2487B5_50%,#277DB7_57.14%,#2A73B9_64.29%,#2D69BB_71.43%,#305EBD_78.57%,#3252BF_85.71%,#3546C0_92.86%,#3737C1_100%)] bg-clip-text text-transparent">
              Borrowers Say
            </span>
          </h2>

          <p className="mt-8 max-w-[448px] text-[18px] leading-8 text-[#D1D5DC] sm:text-[20px]">
            Real stories from people who trusted RinSetu to power their
            financial journey.
          </p>

          <div className="mt-12 flex w-fit items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div>
              <h3 className="text-[36px] font-black leading-10 text-white">
                4.9/5
              </h3>
              <div className="mt-1 flex gap-1">
                {stars.map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-[#FF8A00] text-[#FF8A00]"
                  />
                ))}
              </div>
            </div>

            <div className="h-12 w-px bg-white/10" />

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.7px] text-[#99A1AF]">
                Trusted By
              </p>
              <h4 className="mt-1 text-xl font-bold text-white">250,000+</h4>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-12 w-[176px]">
              {users.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="absolute top-0 h-12 w-12 rounded-full border-2 border-[#0F172A] object-cover"
                  style={{ left: `${index * 32}px` }}
                />
              ))}

              <div className="absolute left-32 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0F172A] bg-[#3737C1] text-xs font-bold text-white">
                +9k
              </div>
            </div>

            <p className="text-sm font-medium text-[#99A1AF]">
              Verified Reviews
            </p>
          </div>
        </div>

        <div className="relative w-full max-w-[568px] pt-12">
          <div className="absolute bottom-[-90px] left-[-48px] hidden h-[110px] w-[220px] rotate-[-0.99deg] rounded-2xl border border-white/5 bg-white/10 p-4 opacity-60 shadow-2xl lg:block">
            <p className="text-sm font-bold text-white">Priya Patel</p>
            <div className="flex">
              {stars.map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-[#FF8A00] text-[#FF8A00]"
                />
              ))}
            </div>
            <p className="mt-3 text-xs leading-4 text-[#D1D5DC]">
              "No physical documents, everything was 100% digital."
            </p>
          </div>

          <div className="absolute bottom-[-130px] right-[45px] hidden h-[110px] w-[220px] rotate-[1.97deg] rounded-2xl border border-white/5 bg-white/10 p-4 opacity-80 shadow-2xl lg:block">
            <p className="text-sm font-bold text-white">Amit Kumar</p>
            <div className="flex">
              {stars.map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-[#FF8A00] text-[#FF8A00]"
                />
              ))}
            </div>
            <p className="mt-3 text-xs leading-4 text-[#D1D5DC]">
              "I've tried other loan apps, but this one is by far the most
              reliable."
            </p>
          </div>

          <div className="absolute right-[-90px] top-[40px] hidden h-[110px] w-[220px] rotate-[-1.46deg] rounded-2xl border border-white/5 bg-white/10 p-4 opacity-50 shadow-2xl lg:block">
            <p className="text-sm font-bold text-white">Neha Gupta</p>
            <div className="flex">
              {stars.map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-[#FF8A00] text-[#FF8A00]"
                />
              ))}
            </div>
            <p className="mt-3 text-xs leading-4 text-[#D1D5DC]">
              "Instant approval changed the game for me."
            </p>
          </div>

          <div className="relative rounded-[40px] border border-white/20 bg-white/[0.95] p-8 shadow-[0px_32px_64px_rgba(0,0,0,0.3)] sm:p-12">
            <div className="absolute -right-4 -top-14 flex h-24 w-24 rotate-12 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#00C89C_0%,#07BFA1_7.14%,#0EB6A5_14.29%,#14ADA9_21.43%,#18A3AC_28.57%,#1C9AB0_35.71%,#2091B2_42.86%,#2487B5_50%,#277DB7_57.14%,#2A73B9_64.29%,#2D69BB_71.43%,#305EBD_78.57%,#3252BF_85.71%,#3546C0_92.86%,#3737C1_100%)] shadow-xl">
              <Quote className="h-10 w-10 fill-white text-white opacity-80" />
            </div>

            <div className="flex gap-1">
              {stars.map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-[#FF8A00] text-[#FF8A00]"
                />
              ))}
            </div>

            <p className="mt-9 text-[24px] font-medium leading-[40px] text-[#0F172A] sm:text-[30px] sm:leading-[49px]">
              "The process was incredibly smooth. I got my business loan
              approved within 2 hours. RinSetu really understands the urgency
              for startups."
            </p>

            <div className="mt-12 flex items-center gap-5">
              <img
                src="/rahul.jpg"
                alt="Rahul Sharma"
                className="h-16 w-16 rounded-full border-2 border-[#F3F4F6] object-cover shadow"
              />

              <div>
                <h4 className="text-xl font-bold text-[#0F172A]">
                  Rahul Sharma
                </h4>
                <p className="text-base font-medium text-[#3737C1]">
                  Small Business Owner
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 flex w-[100px] items-center gap-3">
            <button className="h-2 w-10 rounded-full bg-[#00C89C]" />
            <button className="h-2 w-2 rounded-full bg-white/20" />
            <button className="h-2 w-2 rounded-full bg-white/20" />
            <button className="h-2 w-2 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatingReviews;