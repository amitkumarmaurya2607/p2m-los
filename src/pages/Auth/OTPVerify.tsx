

import OTPInput from '@/components/OTPInput/OTPInput'
import ResendTimer from '@/components/ResendTimer/ResendTimer';
import GradientButton from '@/components/ui/GradientButton'
import React from 'react'

type OTPVerifyProps = {
  resend?: () => void;
  method?: string;
  userName:string

};

function OTPVerify({
  resend = () => {},
  method,
  userName,
}: OTPVerifyProps) {

   const maskedValue =
  method === "email"
    ? userName.replace(/(.{2}).+(@.+)/, "$1****$2")
    : userName.startsWith("+91")
      ? "+91" + userName.slice(3).replace(/.(?=.{4})/g, "*")
      : userName.replace(/.(?=.{4})/g, "*");
  return (
     <form className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6  bg-[url('/images/boginBanner.webp')] lg:bg-none">
<div
  className="
    w-full max-w-[448px] h-[621.33px]
    flex flex-col items-start gap-2
    p-[48.6667px] pb-[0.6667px]
    bg-white/80
    border border-[#F1F5F9]
    rounded-[32px]
    shadow-[0px_32px_64px_-16px_rgba(0,0,0,0.1)]
    [&>*]:w-full
  "
>
                    <header className="mb-8 w-f" >
                        <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
                       <p className="text-gray-500 text-sm">
  {`We've sent a 6-digit code to your ${
    method === "email" ? "email" : "mobile number"
  } (${maskedValue})`}
</p>
                    </header>

              

                    <div className="space-y-4">
   <OTPInput length={6} onComplete={(code) => {}}/>

                       <GradientButton
                       className='bg-[linear-gradient(90deg,#3737C1_0%,#3535BC_12.5%,#3434B7_25%,#3232B2_37.5%,#3131AD_50%,#2F2FA8_62.5%,#2E2EA4_75%,#2C2C9F_87.5%,#2B2B9A_100%)] 
shadow-[0px_12px_24px_-8px_rgba(55,55,193,0.4)] '
                       >
                          Verify & Continue
                        </GradientButton>

                         <p className="mt-8 text-center text-sm text-gray-500 flex gap-0.5 align-middle">
                       <span> {`Didn't receive code? `} </span> <ResendTimer  onResend={() => { }} />
                    </p>
                    </div>

                 

                </div>
            </form>
  )
}

export default OTPVerify