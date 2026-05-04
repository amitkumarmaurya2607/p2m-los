
'use client'
import GradientButton from '@/components/ui/GradientButton';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import React, { ButtonHTMLAttributes, ChangeEvent, useEffect, useState } from 'react';
import OTPVerify from './OTPVerify';
import TextInput from '@/components/ui/TextInput';
import { isValidEmail, isValidMobile } from '@/lib/utils';
import { showToast } from '@/lib/toast';

const Login = () => {
    const [method, setMethod] = useState<'mobile' | 'email'>('mobile');
    const [sendOtp, setSendOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userName,setUserName] = useState<string>("+91");
    const [error,setError] = useState<string>("")

    const submitHandler = (e?: React.FormEvent | null, type?:string) => {
        e?.preventDefault();
          let isValid = false;

  if (method === "mobile") {
    isValid = isValidMobile(userName);
  } else {
    isValid = isValidEmail(userName);
  }

  if (!isValid) {
    setError(method === "mobile" ? "Enter valid mobile number" : "Enter valid email");
    showToast({ message: method === "mobile" ? "Enter valid mobile number" : "Enter valid email", type: 'error' });
    return;
  }
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setSendOtp(true);
            showToast({ message: 'OTP sent successfully!', type: 'success' });
        }, 5000);
    }

  const switchMethod = (
  e: React.MouseEvent<HTMLElement>,
  type: string
) => {
  e.stopPropagation();
  setMethod(type);
    if (type === "mobile") {
    setUserName("+91");
  } else {
    setUserName("");
  }
};


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;

  if (method === "email") {
    value = value.replace(/[^a-zA-Z0-9@._-]/g, "");
    setUserName(value);
  } else {
    let digits = value.slice(3).replace(/\D/g, "").slice(0, 10);
    setUserName("+91" + digits);
  }
};
    return (


        <>
            {!sendOtp ? <form
                onSubmit={submitHandler}
                className="w-full lg:w-1/2 bg-surface-muted flex items-center justify-center p-6  bg-[url('/images/boginBanner.webp')] lg:bg-none">
                <div
                    className="
    w-full max-w-[448px] 
    flex flex-col items-start gap-2
    p-[48.6667px]
    bg-card-bg
    border border-card-border
    rounded-[32px]
    shadow-[var(--shadow-md)]
    [&>*]:w-full
  "
                >
                    <header className="mb-8 w-f" >
                        <h2 className="text-2xl font-bold text-text-heading">Welcome back</h2>
                        <p className="text-text-muted text-sm mt-3">Please enter your details to sign in.</p>
                    </header>

                    <div className="space-y-4">
                        <TextInput
                            type={method === 'mobile' ? 'tel' : 'email'}
                            label={method === 'mobile' ? 'Mobile Number' : 'Email Address'}
                            onChange={handleChange}
                            value={userName}
                         error={error}
                        />
                        <GradientButton type="submit" loading={loading} className='mt-8'>
                          <span className="flex items-center gap-2">
  Get OTP
  <ArrowRight className="w-5 h-5" />
</span>
                        </GradientButton>
                    </div>
                </div>
            </form>
                : <OTPVerify
                back={()=>{setSendOtp(false)}}
                  resend={()=>submitHandler(null,"resend")}
                  method={method}
                  userName={userName}
              
                
                />
            }

        </>

    );
};



type SocialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
  label: string;
};

const SocialButton = ({
  icon,
  label,
  className = "",
  onClick,
  ...props
}: SocialButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };
  return (
    <button
     type="button"
      {...props}
      onClick={handleClick}
      className={`
        flex items-center justify-center gap-2
        py-2.5 px-4
        border border-border
        rounded-xl
        text-sm font-medium text-foreground/70

        hover:bg-muted
        transition-colors duration-200

        disabled:opacity-50 disabled:cursor-not-allowed

        ${className}
      `}
    >
      <span className="flex items-center">{icon}</span>
      <span>{label}</span>
    </button>
  );
};
export default Login;
