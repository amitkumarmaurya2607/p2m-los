
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
    // keep +91 fixed, only update digits after it
    let digits = value.slice(3).replace(/\D/g, "").slice(0, 10);
    setUserName("+91" + digits);
  }
};
    return (


        <>
            {!sendOtp ? <form
                onSubmit={submitHandler}
                className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6  bg-[url('/images/boginBanner.webp')] lg:bg-none">
                <div
                    className="
    w-full max-w-[448px] 
    flex flex-col items-start gap-2
    p-[48.6667px]
    bg-white/80
    border border-[#F1F5F9]
    rounded-[32px]
    shadow-[0px_32px_64px_-16px_rgba(0,0,0,0.1)]
    [&>*]:w-full
  "
                >
                    <header className="mb-8 w-f" >
                        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                        <p className="text-gray-500 text-sm mt-3">Please enter your details to sign in.</p>
                    </header>

                    {/* Tab Switcher */}
                    {/* <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                        <button
                        type='button'
                            onClick={(e) => switchMethod(e,'mobile')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${method === 'mobile' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Phone className="w-4 h-4" /> Mobile
                        </button>
                        <button
                            type='button'
                            onClick={(e) => switchMethod(e,'email')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${method === 'email' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Mail className="w-4 h-4" /> Email
                        </button>
                    </div> */}

                    {/* Input & CTA */}
                    <div className="space-y-4">
                        <TextInput
                            type={method === 'mobile' ? 'tel' : 'email'}
                            label={method === 'mobile' ? 'Mobile Number' : 'Email Address'}
                            onChange={handleChange}
                            value={userName}
                         error={error}
                        // leftIcon={method === 'mobile' ? <Phone size={18} /> : <Mail size={18} />}
                        />
                        <GradientButton type="submit" loading={loading} className='mt-8'>
                          <span className="flex items-center gap-2">
  Get OTP
  <ArrowRight className="w-5 h-5" />
</span>
                        </GradientButton>
                    </div>

            
                    {/* <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-gray-400 font-medium tracking-widest">OR</span></div>
                    </div>

                   
                    <div className="grid grid-cols-2 gap-4">
                        <SocialButton icon="fa-github" label="GitHub" />
                        <SocialButton icon="fa-google" label="Google" />
                    </div>

                    <p className="mt-8 text-center text-sm text-primary">
                        <span className="text-primary font-bold cursor-pointer translate-all hover:underline">  Continue as Guest</span>
                    </p> */}
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
    onClick?.(e); // safe call
  };
  return (
    <button
     type="button"
      {...props}
      onClick={handleClick}
      className={`
        flex items-center justify-center gap-2
        py-2.5 px-4
        border border-gray-200
        rounded-xl
        text-sm font-medium text-gray-700

        hover:bg-gray-50
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