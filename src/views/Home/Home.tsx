import HeroSection from "./componant/HeroSection";
import LoanProducts from "./componant/LoanProducts";
import EmiDashboard from "./componant/EmiDashboard";
import CategoryMarquee from "./componant/CategoryMarquee";
import QuickEasySection from "./componant/QuickEasySection";
import StepProcess from "./componant/StepProcess";
import RatingReviews from "./componant/RatingReviews";
import TrustStats from "./componant/TrustStats";
import WhyChoose from "./componant/WhyChoose";
import FinalCTA from "./componant/FinalCTA";
import MoreThanLoans from "./componant/MoreThanLoans";
import Community from "./componant/Community";
import FaqSection from "./componant/FaqSection";
import RatingReviews_v2 from "./componant/RatingReviews_v2";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300
        overflow-x-hidden"
    >
      <HeroSection />
      <CategoryMarquee />
      <LoanProducts />
      <EmiDashboard />
      <QuickEasySection />
      {/* <RatingReviews /> */}
      <StepProcess />
      <RatingReviews_v2 />
      <TrustStats />
      <MoreThanLoans />
      <Community />
      <WhyChoose />
      <FaqSection />
      <FinalCTA />
    </div>
  );
}
