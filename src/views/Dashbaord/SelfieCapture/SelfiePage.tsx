"use client";

import StepCard from "../componants/StepCard";
import SelfieCapture from "./SelfieCapture";

function SelfiePage() {
  return (
    <StepCard title="Capture Your Selfie" subtitle="Position your face clearly within the frame and ensure good lighting for quick verification">
      <div className="space-y-4">
        <SelfieCapture />
      </div>
    </StepCard>
  );
}

export default SelfiePage;
