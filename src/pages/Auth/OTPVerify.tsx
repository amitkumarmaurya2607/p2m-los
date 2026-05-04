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

      // 👉 simulate API verify
      await new Promise(res => setTimeout(res, 1200))

      showToast({ message: 'OTP verified successfully!', type: 'success' })
      
      // ✅ navigate to PAN page
      router.push('/pan-details')

    } catch (err) {
      showToast({ message: 'Invalid OTP. Please try again.', type: 'error' })
      setError('Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6 bg-[url('/images/boginBanner.webp')] lg:bg-none">
      
      <div className="w-full max-w-[500px] flex flex-col items-start gap-2 p-[48px] bg-white/80 border border-[#F1F5F9] rounded-[32px] shadow-[0px_32px_64px_-16px_rgba(0,0,0,0.1)] [&>*]:w-full">

        {/* Back */}
        <button
          className="flex items-center justify-center w-[40px] h-[40px] bg-[#F1F5F9] rounded-full"
          onClick={back}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Header */}
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
          <p className="text-gray-500 text-sm mt-3">
            {`We've sent a 6-digit code to your ${
              method === "email" ? "email" : "mobile number"
            } (${maskedValue})`}
          </p>
        </header>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          <OTPInput
            length={6}
            onComplete={(code) => {
              setOtp(code)
              if (error) setError('')
            }}
          />

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <GradientButton
            type="submit"
            disabled={loading}
            className="mt-6"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </GradientButton>

          {/* Resend */}
          <p className="mt-6 text-center text-sm text-gray-500 flex justify-center gap-1">
            <span>Didn't receive code?</span>
            <ResendTimer onResend={resend} />
          </p>

        </form>
      </div>
    </div>
  )
}

export default OTPVerify