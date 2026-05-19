import { ArrowLeft, Star } from "lucide-react";
import React from "react";
import StepNotes from "./StepNotes";
import HorizontalStepper from "./HorizontalStepper";

type StepCardProps = {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  back?: () => void;
  steper?: boolean;
  version?: "v1" | "v2";
  tips?: {
    title: string;
    description: string;
    Icon: React.ReactNode;
    noteTitle: string;
    noteDescription: React.ReactNode;
    NoteIcon?: React.FC<{ className?: string }>;

  };
};

const StepCard: React.FC<StepCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  className = "",
  back,
  tips,
  version = "v2",
  steper = false,
}) => {
  const TipsIcon = tips?.Icon;
  const NoteIcon = tips?.NoteIcon;

  if (version === "v2") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[1150px] lg:w-auto min-h-[220px]  rounded-[12px] bg-white shadow-[0px_30px_80px_rgba(15,23,42,0.18)] flex">
          {/* Left blue section */}
          {tips && (
            <div className="relative hidden lg:flex w-[352px] rounded-tl-[12px] rounded-bl-[12px]  overflow-hidden bg-home-green shadow-[4px_0px_32px_rgba(0,0,0,0.08)] text-white px-6 pt-8 pb-14 flex-col gap-10">

              {/* exact bg layers */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2)_0%,rgba(0,0,0,0)_50%,rgba(55,55,193,0.2)_100%)]" />

              <div
                className="absolute w-[422px] h-[539.38px] left-[-69.88px] top-[-74.36px]
      bg-[linear-gradient(225deg,rgba(255,255,255,0.25)_0%,rgba(0,0,0,0)_100%)]
      shadow-[inset_0px_-10.1749px_40.6994px_rgba(255,255,255,0.15)]
      rounded-bl-[101.749px]
      [transform:matrix(1,0,-0.26,0.97,0,0)]"
              />

              <div
                className="absolute w-[299.03px] h-[596px] left-[-52.69px] top-[232.59px]
      bg-[linear-gradient(45deg,rgba(55,55,193,0.15)_0%,rgba(0,0,0,0)_100%)]
      rounded-tr-[103.159px]
      [transform:matrix(0.94,-0.34,0,1,0,0)]"
              />

              <div className="absolute inset-0 opacity-[0.06] bg-[url('/image.png')] bg-cover bg-center" />

              <div
                className="absolute w-[206px] h-[206px] right-[-103px] top-[-103px]
      bg-[linear-gradient(90deg,#3737C1_0%,#3535BC_12.5%,#3434B7_25%,#3232B2_37.5%,#3131AD_50%,#2F2FA8_62.5%,#2E2EA4_75%,#2C2C9F_87.5%,#2B2B9A_100%)]
      rotate-[-45deg]"
              />

              <div
                className="absolute w-[180px] h-[180px] right-[-103px] bottom-[-103px]
      bg-[linear-gradient(90deg,#3737C1_0%,#3535BC_12.5%,#3434B7_25%,#3232B2_37.5%,#3131AD_50%,#2F2FA8_62.5%,#2E2EA4_75%,#2C2C9F_87.5%,#2B2B9A_100%)]
      rotate-[-49.01deg]"
              />

              {/* content */}
              <div className="relative z-10">
                <div className="text-[14px] font-bold tracking-[1.8px] uppercase mb-10">
                  {tips.title}
                </div>

                <h1 className="text-[42px] xl:text-[46px] leading-[1.18] font-bold tracking-[-1px] max-w-[360px]">
                  {tips.noteTitle}
                </h1>

                <p className="mt-8 text-[15px] leading-[24px] text-white/75 max-w-[350px]">
                  {tips.noteDescription}
                </p>
              </div>

              <div
                className="
    relative z-10 overflow-hidden
    rounded-[10px]
    p-6
    bg-[linear-gradient(90deg,#3737C1_0%,#3535BC_12.5%,#3434B7_25%,#3232B2_37.5%,#3131AD_50%,#2F2FA8_62.5%,#2E2EA4_75%,#2C2C9F_87.5%,#2B2B9A_100%)]
    shadow-[0px_15px_18.75px_-3.75px_rgba(0,0,0,0.1),0px_6px_7.5px_-4.5px_rgba(0,0,0,0.1)]
    mb-[30px]
  "
              >
                {/* optional glow */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  {TipsIcon}
                </div>

                <h3 className="mb-4 text-[18px] font-bold">
                  {tips.title}
                </h3>

                <p className="text-[13px] leading-[22px] text-white/75">
                  {tips.description}
                </p>
              </div>
            </div>
          )}

          {/* Right content section */}
          <div className={`w-full max-w-full  lg:w-[500px] flex items-center justify-center px-5 sm:px-8 lg:px-14 py-10 ${className}`}>
            <div className={`w-full`}>
              {/* Step dots */}
              {steper && <HorizontalStepper version="v2" />}

              {back && (
                <button
                  className="mb-6 flex items-center justify-center w-[40px] h-[40px] bg-muted rounded-full"
                  onClick={back}
                  type="button"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}

              <div className="mb-8">
                {icon && (
                  <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-primary-muted text-primary">
                    {icon}
                  </div>
                )}

                <h2 className="text-[28px] leading-[36px] font-extrabold tracking-[-0.75px] text-text-heading">
                  {title}
                </h2>

                {subtitle && (
                  <p className="mt-2 text-[16px] leading-[24px] text-text-muted">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-12">
      {tips && (
        <StepNotes
          icon={TipsIcon}
          title={tips.title}
          description={tips.description}
          noteTitle={tips.noteTitle}
          noteDescription={tips.noteDescription}
          noteIcon={NoteIcon && <NoteIcon className="w-5 h-5 text-secondary" />}
        />
      )}

      <div
        className={`w-full max-w-[512px] lg:max-w-none lg:w-[512px] min-h-[430px] p-8 lg:p-12 flex flex-col gap-6 lg:gap-8 bg-surface-overlay-90 border border-border-light rounded-[16px] lg:rounded-[32px] shadow-[var(--shadow-lg)] ${className}`}
      >
        {back && (
          <button
            className="flex items-center justify-center w-[40px] h-[40px] bg-muted rounded-full"
            onClick={back}
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <div className="flex flex-col gap-2">
          {icon && (
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-muted text-primary">
              {icon}
            </div>
          )}

          <h2 className="text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-text-heading">
            {title}
          </h2>

          <p className="text-[16px] leading-[24px] text-text-muted">
            {subtitle}
          </p>
        </div>

        <div className="w-full flex-1">{children}</div>
      </div>
    </div>
  );
};

export default StepCard;