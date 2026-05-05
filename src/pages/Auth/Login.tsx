'use client';

import GradientButton from '@/components/ui/GradientButton';
import { ArrowRight } from 'lucide-react';
import React, { ButtonHTMLAttributes, useState } from 'react';
import OTPVerify from './OTPVerify';
import TextInput from '@/components/ui/TextInput';
import { isValidEmail, isValidMobile } from '@/lib/utils';
import { showToast } from '@/lib/toast';

const Login = () => {
  const [method, setMethod] = useState<'mobile' | 'email'>('mobile');
  const [sendOtp, setSendOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>(''); // ✅ no +91 initially
  const [error, setError] = useState<string>('');

  const validate = () => {
    if (method === 'mobile') return isValidMobile(userName);
    return isValidEmail(userName);
  };

  const submitHandler = (e?: React.FormEvent | null, type?: 'resend') => {
    e?.preventDefault();

    const isValid = validate();

    if (!isValid) {
      const msg =
        method === 'mobile'
          ? 'Enter valid mobile number'
          : 'Enter valid email';

      setError(msg);
      showToast({ message: msg, type: 'error' });
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSendOtp(true);

      showToast({
        message: type === 'resend'
          ? 'OTP resent successfully!'
          : 'OTP sent successfully!',
        type: 'success',
      });
    }, 1500);
  };

  const switchMethod = (
    e: React.MouseEvent<HTMLElement>,
    type: 'mobile' | 'email'
  ) => {
    e.stopPropagation();
    setMethod(type);
    setUserName('');
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (method === 'email') {
      value = value.replace(/[^a-zA-Z0-9@._-]/g, '');
      setUserName(value);
      return;
    }

    // MOBILE LOGIC
    let raw = value.replace('+91', '');
    let digits = raw.replace(/\D/g, '').slice(0, 10);

    if (digits.length > 0) {
      setUserName('+91' + digits);
    } else {
      setUserName('');
    }
  };

  return (
    <>
      {!sendOtp ? (
        <form
          onSubmit={submitHandler}
          className="w-full lg:w-1/2 bg-surface-muted flex items-center justify-center p-6 bg-[url('/images/boginBanner.webp')] lg:bg-none"
        >
          <div
            className="
              w-full max-w-[448px] 
              flex flex-col gap-2
              p-[48px]
              bg-card-bg
              border border-card-border
              rounded-[32px]
              shadow-[var(--shadow-md)]
              [&>*]:w-full
            "
          >
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-text-heading">
                Welcome back
              </h2>
              <p className="text-text-muted text-sm mt-3">
                Please enter your details to sign in.
              </p>
            </header>

            <div className="space-y-4">
              <TextInput
                type={method === 'mobile' ? 'tel' : 'email'}
                label={method === 'mobile' ? 'Mobile Number' : 'Email Address'}
                onChange={handleChange}
                value={userName}
                error={error}
              />

              <GradientButton
                type="submit"
                loading={loading}
                className="mt-6"
              >
                <span className="flex items-center gap-2">
                  Get OTP
                  <ArrowRight className="w-5 h-5" />
                </span>
              </GradientButton>

          
            </div>
          </div>
        </form>
      ) : (
        <OTPVerify
          back={() => setSendOtp(false)}
          resend={() => submitHandler(null, 'resend')}
          method={method}
          userName={userName}
        />
      )}
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
  className = '',
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