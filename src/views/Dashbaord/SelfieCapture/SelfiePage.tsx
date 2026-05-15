"use client";

import { Camera, Lightbulb } from "lucide-react";
import StepCard from "../componants/StepCard";
import SelfieCapture from "./SelfieCapture";

function SelfiePage() {
  return (
    <StepCard
      title="Capture Your Selfie"
      subtitle="Position your face clearly within the frame and ensure good lighting for quick verification"
      steper={true}
      tips={{
        title: "Capture Your Selfie",
        description: "Please take a clear selfie to verify your identity and enhance the security of your application process. Make sure your face is clearly visible and well-lit.",
        Icon: <Camera className="w-5 h-5 text-primary" />,
        noteTitle: "Quick Selfie Tips",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Ensure your face is clearly visible without masks or sunglasses.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Use good lighting and avoid blurry or dark photos.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Keep your camera steady and look directly at the screen.
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <div className="space-y-4">
        <SelfieCapture />
      </div>
    </StepCard>
  );
}

export default SelfiePage;
