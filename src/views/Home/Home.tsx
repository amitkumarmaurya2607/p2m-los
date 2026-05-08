
import HeroSection from "./componant/HeroSection";
import LoanProducts from "./componant/LoanProducts";
import EmiDashboard from "./componant/EmiDashboard";
import CategoryMarquee from "./componant/CategoryMarquee";
import QuickEasySection from "./componant/QuickEasySection";
import StepProcess from "./componant/StepProcess";
import RatingReviews from "./componant/RatingReviews";
import TrustStats from "./componant/TrustStats";
import WhyChoose from "./componant/WhyChoose";
import SocialProof from "./componant/SocialProof";
import FAQ from "./componant/FAQ";
import FinalCTA from "./componant/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300 overflow-x-hidden">
      
      <HeroSection />
      <LoanProducts />
      <EmiDashboard />
      <CategoryMarquee />
      <QuickEasySection />
      <StepProcess />
      <RatingReviews />
      <TrustStats />
      <WhyChoose />
      <SocialProof />
      <FAQ />
      <FinalCTA />

    </div>
  );
}
