import React from 'react'
import Navbar from '@/components/layout/Navbar'
import HeroBanner from './componant/HeroBanner'
import FeatureCards from './componant/FeatureCards'
import LoanProducts from './componant/LoanProducts'
import WhyChooseUs from './componant/WhyChooseUs'
import PlanYourLoan from './componant/PlanYourLoan'
import CreditScore from './componant/CreditScore'
import HowItWorks from './componant/HowItWorks'
import TrustStats from './componant/TrustStats'
import Testimonials from './componant/Testimonials'
import FinancialWisdom from './componant/FinancialWisdom'
import FAQ from './componant/FAQ'
import BottomCTA from './componant/BottomCTA'
import Footer from '@/components/layout/Footer'

function Home() {
  return (

    
      <div>
        <HeroBanner />
        <FeatureCards />
        <LoanProducts />
        <WhyChooseUs />
        <PlanYourLoan />
        <CreditScore />
        <HowItWorks />
        <TrustStats />
        <Testimonials />
        <FinancialWisdom />
        <FAQ />
        <BottomCTA />
      </div>
   
 
  )
}

export default Home