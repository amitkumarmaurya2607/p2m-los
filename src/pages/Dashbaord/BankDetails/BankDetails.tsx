'use client'
import React, { useState } from 'react'
import StepCard from '../componants/StepCard'
import TextInput from '@/components/ui/TextInput'
import GradientButton from '@/components/ui/GradientButton'
import { CreditCard } from 'lucide-react'
import SelectBox from '@/components/ui/SelectBox'


function BankDetails() {
  const [form, setForm] = useState({
    accountNumber: '',
    confirmAccountNumber: '',
    ifsc: '',
    accountType: '',
  })

  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (key: string, value: string) => {
    let v = value

    if (key.includes('accountNumber')) {
      v = value.replace(/\D/g, '')
    }

    if (key === 'ifsc') {
      v = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
    }

    setForm(prev => ({ ...prev, [key]: v }))

    if (errors[key]) {
      setErrors((prev: any) => ({ ...prev, [key]: '' }))
    }
  }

  const validate = () => {
    const err: any = {}

    if (!form.accountNumber) err.accountNumber = 'Required'
    if (!form.confirmAccountNumber) err.confirmAccountNumber = 'Required'
    if (form.accountNumber !== form.confirmAccountNumber) {
      err.confirmAccountNumber = 'Account numbers do not match'
    }

    if (!form.ifsc) err.ifsc = 'Required'
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc)) {
      err.ifsc = 'Invalid IFSC'
    }

    if (!form.accountType) err.accountType = 'Required'

    return err
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const err = validate()
    if (Object.keys(err).length) {
      setErrors(err)
      return
    }

    try {
      setLoading(true)
      await new Promise(res => setTimeout(res, 1500))
      console.log(form)
    } finally {
      setLoading(false)
    }
  }
const accountTypeOptions = [
  { label: 'Savings Account', value: 'savings' },
  { label: 'Current Account', value: 'current' },
]
  return (
    <>
      
      {/* Header */}
      {/* <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Bank Verification
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Your loan amount will be disbursed to this verified account.
        </p>
      </div> */}

      {/* Card */}
      <StepCard
      title=' Bank Verification'
      subtitle='  Your loan amount will be disbursed to this verified account.'
       >
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

          <TextInput
            label="Bank Account Number"
            value={form.accountNumber}
            onChange={(e) => handleChange('accountNumber', e.target.value)}
            error={errors.accountNumber}
          />

          <TextInput
            label="Re-enter Account Number"
            value={form.confirmAccountNumber}
            onChange={(e) => handleChange('confirmAccountNumber', e.target.value)}
            error={errors.confirmAccountNumber}
          />

          <TextInput
            label="IFSC CODE"
            value={form.ifsc}
            onChange={(e) => handleChange('ifsc', e.target.value)}
            error={errors.ifsc}
            maxLength={11}
          />

          <TextInput
  label="Account Type"
  value={form.accountType}
  onChange={(e) => handleChange('accountType', e.target.value)}
  error={errors.accountType}
/>

         <SelectBox
  label="Account Type"
  options={accountTypeOptions}
  value={accountTypeOptions.find(
    (opt) => opt.value === form.accountType
  )}
  onChange={(selected: any) =>
    handleChange('accountType', selected?.value || '')
  }
  error={errors.accountType}
/>

          {/* Info Box */}
          <div className="flex items-start gap-3 p-4 sm:p-5 rounded-xl border border-blue-300 bg-blue-50 text-blue-700">
            <CreditCard className="w-5 h-5 mt-1 shrink-0" />
            <p className="text-xs sm:text-sm leading-relaxed">
              We will deposit <b>₹1.00</b> to verify this account securely.
              Your data is encrypted and completely safe.
            </p>
          </div>

          {/* Button */}
          <GradientButton
            type="submit"
            className="w-full mt-4 sm:mt-6"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Bank Account'}
          </GradientButton>

        </form>
      </StepCard>
    </>
  )
}

export default BankDetails