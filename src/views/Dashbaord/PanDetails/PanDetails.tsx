'use client'
import React, { useState } from 'react'
import StepCard from '../componants/StepCard'
import TextInput from '@/components/ui/TextInput'
import GradientButton from '@/components/ui/GradientButton'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPanData, selectApplication } from '@/features/application/applicationSlice'

function PanDetails() {
  const dispatch = useAppDispatch()
  const application = useAppSelector(selectApplication)
  const [pan, setPan] = useState(application.pan?.number || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const validatePan = (value: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    return panRegex.test(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()

    setPan(value)

    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!pan) {
      setError('PAN is required')
      return
    }

    if (!validatePan(pan)) {
      setError('Invalid PAN format')
      return
    }

    try {
      setLoading(true)

      // 👉 simulate API call
      await new Promise((res) => setTimeout(res, 1200))

      console.log('PAN Submitted:', pan)

      dispatch(setPanData({ number: pan }))

      // ✅ redirect to next step
      router.push('/personal-info')

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StepCard
      title='PAN Verification'
      subtitle='Please enter your 10-digit PAN number.'
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <TextInput
          type="text"
          label="PAN Number"
          value={pan}
          onChange={handleChange}
          error={error}
          maxLength={10}
          require
        />

        <GradientButton
          type="submit"
          className="mt-8 w-full"
          disabled={loading}
        >
          <span className="flex items-center justify-center gap-2">
            {loading ? 'Verifying...' : 'Verify PAN'}
            {!loading && <ChevronRight className="w-5 h-5" />}
          </span>
        </GradientButton>

      </form>
    </StepCard>
  )
}

export default PanDetails