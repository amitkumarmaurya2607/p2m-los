'use client'

import React, { useState } from 'react'
import { CheckCircle, ClipboardList, Edit3, Shield } from 'lucide-react'

const ReviewField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[12px] font-bold uppercase tracking-[0.6px] text-[#90A1B9]">
      {label}
    </p>
    <p className="mt-1 text-[16px] font-semibold leading-6 text-[#1D293D]">
      {value}
    </p>
  </div>
)

const ReviewSection = ({
  title,
  fields,
}: {
  title: string
  fields: { label: string; value: string }[]
}) => (
  <div className="rounded-[24px] border border-[#E2E8F0] bg-white/80 p-6 shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)]">
    <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
      <div className="flex items-center gap-3">
        <span className="h-6 w-2 rounded-full bg-[#3737C1]" />
        <h3 className="text-[18px] font-bold text-[#1D293D]">{title}</h3>
      </div>

      <button type="button" className="rounded-xl p-2">
        <Edit3 className="h-[18px] w-[18px] text-[#3737C1]" />
      </button>
    </div>

    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
      {fields.map((item) => (
        <ReviewField key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  </div>
)

function ReviewApplication() {
  const [agree, setAgree] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!agree) return

    try {
      setLoading(true)
      await new Promise((res) => setTimeout(res, 1200))

      console.log('Application submitted')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[896px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_277px] gap-8 items-start">
        <div>
          <div className="mb-9">
            <h2 className="text-[30px] font-extrabold leading-9 tracking-[-0.75px] text-[#0F172B]">
              Review Application
            </h2>
            <p className="mt-2 text-[16px] font-medium leading-6 text-[#62748E]">
              Please verify your details before final submission.
            </p>
          </div>

          <div className="space-y-6">
            <ReviewSection
              title="Personal Details"
              fields={[
                { label: 'Name', value: 'Rahul Sharma' },
                { label: 'PAN', value: 'ABCDE1234F' },
                { label: 'DOB', value: '15/08/1990' },
              ]}
            />

            <ReviewSection
              title="Employment & Income"
              fields={[
                { label: 'Type', value: 'Salaried' },
                { label: 'Company', value: 'TechCorp India' },
                { label: 'Income', value: '₹1,20,000/mo' },
              ]}
            />

            <ReviewSection
              title="Bank Information"
              fields={[
                { label: 'Account', value: 'XXXX XXXX 5678' },
                { label: 'IFSC', value: 'HDFC0001234' },
              ]}
            />
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172B] to-[#1D293D] px-7 py-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
          <div className="inline-flex items-center gap-3 rounded-[16px] bg-white/10 px-3 py-3">
            <ClipboardList className="h-5 w-5 text-[#00C89C]" />
            <span className="text-[14px] font-bold uppercase tracking-[0.7px] text-white">
              Loan Summary
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <p className="text-[16px] font-medium text-[#90A1B9]">
                Loan <br /> Amount
              </p>
              <p className="text-[24px] font-extrabold text-white">
                ₹5,00,000
              </p>
            </div>

            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <p className="text-[16px] font-medium text-[#90A1B9]">Tenure</p>
              <p className="text-[20px] font-bold text-white">36 Months</p>
            </div>

            <div className="flex items-end justify-between pb-2">
              <p className="text-[16px] font-medium text-[#90A1B9]">EMI</p>
              <p className="text-[30px] font-extrabold text-[#00C89C]">
                ₹16,500
              </p>
            </div>
          </div>

          <label className="mt-7 flex cursor-pointer gap-3 rounded-[16px] border border-[#3737C1]/30 bg-[#3737C1]/20 p-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#3737C1]"
            />
            <span className="text-[12px] font-medium leading-5 text-[#CAD5E2]">
              I agree to the{' '}
              <span className="text-[#00C89C]">Terms & Conditions</span> and
              consent to fetch my credit report from CICs.
            </span>
          </label>

          <button
            type="button"
            disabled={!agree || loading}
            onClick={handleSubmit}
            className="mt-8 flex h-[86px] w-full items-center justify-center gap-4 rounded-[16px] bg-gradient-to-r from-[#00C89C] to-[#00A882] px-6 text-[18px] font-bold leading-7 text-white shadow-[0px_12px_24px_-8px_rgba(0,200,156,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Shield className="h-5 w-5" />
            {loading ? 'Submitting...' : 'e-Sign & Submit'}
          </button>

          <div className="mt-5 flex items-center justify-center gap-1 text-[12px] font-semibold text-[#90A1B9]">
            <CheckCircle className="h-3.5 w-3.5 text-[#00C89C]" />
            256-bit SSL Encrypted
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewApplication