'use client'

import React, { useState } from 'react'
import StepCard from '../componants/StepCard'
import GradientButton from '@/components/ui/GradientButton'
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

function AccountVerified() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleGenerateConsent = async () => {
    try {
      setLoading(true)

      await new Promise((res) => setTimeout(res, 1200))

      router.push('/consent-request')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StepCard 
    title='Bank Verification'
    subtitle='Link your primary bank account for seamless loan disbursement and repayments.'
    >
      <div className="w-full space-y-10">
        <div className="relative w-full min-h-[421px] rounded-[20px] border border-[rgba(0,200,156,0.2)] bg-[#E6FAF5] px-8 pt-8 pb-8 overflow-hidden">
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-bl-full" />

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
            <CheckCircle className="h-8 w-8 text-[#00A63E]" />
          </div>

          <div className="mt-7 text-center">
            <h2 className="text-[24px] leading-9 font-bold text-[#0F172A]">
              Account Verified
            </h2>

            <p className="mt-2 text-[16px] leading-6 font-semibold text-[#00A63E]">
              ₹1 deposited successfully.
            </p>
          </div>

          <div className="mt-9 rounded-[16px] bg-white px-6 py-6 shadow">
            <p className="text-[14px] leading-[21px] font-medium text-[#62748E]">
              Bank Name
            </p>

            <h3 className="mt-1 text-[18px] leading-[27px] font-bold text-[#0F172A]">
              HDFC Bank Ltd.
            </h3>

            <p className="mt-5 text-[14px] leading-[21px] font-medium text-[#62748E]">
              Account Number
            </p>

            <h3 className="mt-1 text-[18px] leading-[27px] font-bold text-[#0F172A]">
              XXXX XXXX 1234
            </h3>
          </div>
        </div>

        <div className="border-t border-[#F1F5F9] pt-6">
          <p className="mx-auto max-w-[603px] text-center text-[16px] leading-6 font-medium text-[#4A5565]">
            To offer you the best interest rate, we need to analyze your financial health
            securely via RBI-regulated Account Aggregators.
          </p>

          <GradientButton
            type="button"
            className="mt-7 w-full h-[71px]"
            disabled={loading}
            onClick={handleGenerateConsent}
          >
            {loading ? 'Generating...' : 'Generate Consent Request'}
          </GradientButton>
        </div>
      </div>
    </StepCard>
  )
}

export default AccountVerified