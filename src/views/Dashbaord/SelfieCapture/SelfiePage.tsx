'use client'

import React from 'react'
import StepCard from '../componants/StepCard'
import SelfieCapture from './SelfieCapture'

function SelfiePage() {
  return (
     <StepCard title='PAN Verification' subtitle='Please enter your 10-digit PAN number.'>
         <div className="space-y-4">
                      <SelfieCapture />
                      
                    </div>


    </StepCard>
  )
}

export default SelfiePage