'use client'
import React, { useState } from 'react'

import TextInput from '@/components/ui/TextInput'
import GradientButton from '@/components/ui/GradientButton'
import StepCard from '../componants/StepCard'
import DatePickerBox from '@/components/ui/CustomDatePicker'
import CustomDatePicker from '@/components/ui/CustomDatePicker'

const genders = ['Male', 'Female', 'Other']
const employmentTypes = ['Salaried', 'Self-Employed', 'Business']

function PersonalInfo() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    dob: '',
    gender: 'Male',
    salary: '',
    employmentType: 'Salaried',
    address1: '',
    address2: '',
    pincode: '',
    city: '',
    state: '',
  })

  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))

    // ✅ remove error on change
    if (errors[key]) {
      setErrors((prev: any) => ({ ...prev, [key]: '' }))
    }
  }

  // ✅ validation
  const validate = () => {
    const newErrors: any = {}

    if (!form.fullName) newErrors.fullName = 'Full name is required'

    if (!form.email) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Invalid email'
    }

    if (!form.dob) newErrors.dob = 'Date of birth is required'

    if (!form.salary) newErrors.salary = 'Salary is required'

    if (!form.address1) newErrors.address1 = 'Address is required'

    if (!form.pincode) {
      newErrors.pincode = 'Pincode is required'
    } else if (form.pincode.length !== 6) {
      newErrors.pincode = 'Invalid pincode'
    }

    if (!form.city) newErrors.city = 'City is required'
    if (!form.state) newErrors.state = 'State is required'

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)

      // 👉 simulate API
      await new Promise((res) => setTimeout(res, 1500))

      console.log('Submitted:', form)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StepCard
      title="Basic Info"
      subtitle=""
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Full Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Full Name (as per PAN)"
            value={form.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            error={errors.fullName}
          />

          <TextInput
            type="email"
            label="Email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
          />
        </div>

        {/* DOB + Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomDatePicker
           
            label="Date of Birth"
            value={form.dob ? new Date(form.dob) : (null as any)}
            onChange={(date: Date | null) => handleChange('dob', date ? date.toISOString() : '')}
            error={errors.dob}
          />

          <div>
            <p className="text-sm mb-2 text-text-secondary">Gender</p>
            <div className="flex gap-2 flex-wrap">
              {genders.map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => handleChange('gender', g)}
                  className={`px-4 py-2 rounded-xl border
                    ${form.gender === g
                      ? 'border-primary text-primary bg-primary-muted'
                      : 'border-border text-text-secondary'
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Salary + Employment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Monthly Salary"
            value={form.salary}
            onChange={(e) =>
              handleChange('salary', e.target.value.replace(/\D/g, ''))
            }
            error={errors.salary}
          />

          <div>
            <p className="text-sm mb-2 text-text-secondary">Employment Type</p>
            <div className="flex gap-2 flex-wrap">
              {employmentTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => handleChange('employmentType', type)}
                  className={`px-4 py-2 rounded-xl border
                    ${form.employmentType === type
                      ? 'border-primary text-primary bg-primary-muted'
                      : 'border-border text-text-secondary'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Address Details</h3>

          <div className="space-y-4">
            <TextInput
              label="Address Line 1"
              value={form.address1}
              onChange={(e) => handleChange('address1', e.target.value)}
              error={errors.address1}
            />

            <TextInput
              label="Address Line 2 (Optional)"
              value={form.address2}
              onChange={(e) => handleChange('address2', e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="Pincode"
                value={form.pincode}
                onChange={(e) =>
                  handleChange('pincode', e.target.value.replace(/\D/g, ''))
                }
                maxLength={6}
                error={errors.pincode}
              />

              <TextInput
                label="City"
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                error={errors.city}
              />
            </div>

            <TextInput
              label="State"
              value={form.state}
              onChange={(e) => handleChange('state', e.target.value)}
              error={errors.state}
            />
          </div>
        </div>

        {/* Submit */}
        <GradientButton
          type="submit"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </GradientButton>

      </form>
    </StepCard>
  )
}

export default PersonalInfo