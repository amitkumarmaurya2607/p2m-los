'use client'
import React, { useState } from 'react'
import StepCard from '../componants/StepCard'
import TextInput from '@/components/ui/TextInput'
import GradientButton from '@/components/ui/GradientButton'
import OTPInput from '@/components/OTPInput/OTPInput'
import ResendTimer from '@/components/ResendTimer/ResendTimer'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
type AadhaarDetailsProps = {
  resend?: () => void
}

function AadhaarDetails({ resend = () => {} }: AadhaarDetailsProps) {
  const router = useRouter()

  const [aadhaar, setAadhaar] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'aadhaar' | 'otp'>('aadhaar')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // ✅ Aadhaar validation
  const validateAadhaar = (val: string) => /^\d{12}$/.test(val)

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setAadhaar(value)
    if (error) setError('')
  }

  // 👉 Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!aadhaar) {
      setError('Aadhaar is required')
      return
    }

    if (!validateAadhaar(aadhaar)) {
      setError('Enter valid 12-digit Aadhaar')
      return
    }

    try {
      setLoading(true)

      // 👉 API call (send OTP)
      await new Promise(res => setTimeout(res, 1200))

      setStep('otp')
    } finally {
      setLoading(false)
    }
  }

  // 👉 Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (otp.length !== 6) {
      setError('Enter valid 6-digit OTP')
      return
    }

    try {
      setLoading(true)

      // 👉 API call (verify OTP)
      await new Promise(res => setTimeout(res, 1200))

      // ✅ next step
      router.push('/bank-details')
    } finally {
      setLoading(false)
    }
  }

  return (
    <StepCard
      title="Aadhaar Verification"
      subtitle={step === 'aadhaar'?"Enter your Aadhaar number to receive OTP":" OTP sent to Aadhaar linked mobile"}
      back={step === 'aadhaar'?undefined:()=>setStep("aadhaar")}
    >
      {step === 'aadhaar' ? (
        <form onSubmit={handleSendOtp} className="space-y-4">

          <TextInput
            label="Aadhaar Number"
            value={aadhaar}
            onChange={handleAadhaarChange}
            error={error}
            maxLength={12}
          />

          <GradientButton
            type="submit"
            className="w-full mt-6"
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </GradientButton>

        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">

          {/* <p className="text-sm text-gray-500">
            OTP sent to Aadhaar linked mobile
          </p> */}

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
            className="w-full mt-6"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </GradientButton>

          {/* Resend */}
           <p className="mt-6 text-center text-sm text-text-muted flex justify-center gap-1">
            <span>Didn't receive code?</span>
            <ResendTimer onResend={resend} />
          </p>
         

        </form>
      )}
    </StepCard>
  )
}

export default AadhaarDetails