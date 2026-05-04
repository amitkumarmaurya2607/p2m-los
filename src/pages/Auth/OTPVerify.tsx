'use client'
import OTPInput from '@/components/OTPInput/OTPInput'
import ResendTimer from '@/components/ResendTimer/ResendTimer'
import GradientButton from '@/components/ui/GradientButton'
import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { showToast } from '@/lib/toast'

type OTPVerifyProps = {
  resend?: () => void
  method?: string
  userName: string
  back: () => void
}

function OTPVerify({
  resend = () => {},
  method,
  userName,
  back
}: OTPVerifyProps) {

  const router = useRouter()

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const maskedValue =
    method === "email"
      ? userName.replace(/(.{2}).+(@.+)/, "$1****$2")
      : userName.startsWith("+91")
        ? "+91" + userName.slice(3).replace(/.(?=.{4})/g, "*")
        : userName.replace(/.(?=.{4})/g, "*")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (otp.length !== 6) {
      setError('Enter valid 6-digit OTP')
      showToast({ message: 'Please enter a valid 6-digit OTP', type: 'error' })
      return
    }

    try {
      setLoading(true)

      await new Promise(res => setTimeout(res, 1200))

      showToast({ message: 'OTP verified successfully!', type: 'success' })
      
      router.push('/pan-details')

    } catch (err) {
      showToast({ message: 'Invalid OTP. Please try again.', type: 'error' })
      setError('Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full lg:w-1/2 bg-surface-muted flex items-center justify-center p-6 bg-[url('/images/boginBanner.webp')] lg:bg-none">
      
      <div className="w-full max-w-[500px] flex flex-col items-start gap-2 p-[48px] bg-card-bg border border-card-border rounded-[32px] shadow-[var(--shadow-md)] [&>*]:w-full">

        <button
          className="flex items-center justify-center w-[40px] h-[40px] bg-muted rounded-full"
          onClick={back}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <header className="mb-6">
          <h2 className="text-2xl font-bold text-text-heading">Verify OTP</h2>
          <p className="text-text-muted text-sm mt-3">
            {`We've sent a 6-digit code to your ${
              method === "email" ? "email" : "mobile number"
            } (${maskedValue})`}
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <OTPInput
            length={6}
            onComplete={(code) => {
              setOtp(code)
              if (error) setError('')
            }}
          />

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <GradientButton
            type="submit"
            disabled={loading}
            className="mt-6"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </GradientButton>

          <p className="mt-6 text-center text-sm text-text-muted flex justify-center gap-1">
            <span>Didn't receive code?</span>
            <ResendTimer onResend={resend} />
          </p>

        </form>
      </div>
    </div>
  )
}

export default OTPVerify
