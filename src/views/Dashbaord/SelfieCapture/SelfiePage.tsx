"use client";

import { Camera, Lightbulb, ScanFace } from "lucide-react";
import StepCard from "../componants/StepCard";
import SelfieCapture from "./SelfieCapture";
import PulseDot from "@/components/PulseDot";

function SelfiePage() {
  return (
    <StepCard
      title="Capture Your Selfie"
      subtitle="Position your face clearly within the frame and ensure good lighting for quick verification"
      steper={true}
      className="lg:w-[600px] mx-auto"
      icon={<ScanFace className="w-6 h-6 text-primary" />}
      tips={{
        title: "AI Selfie Verification",
        description:
          "To verify your identity securely, we’ll capture a live selfie using AI face detection and blink verification. Please keep your face clearly visible inside the frame.",
        Icon: <Camera className="w-5 h-5 text-primary" />,
        noteTitle: "Selfie Capture Tips",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <PulseDot />
              Position your face properly inside the oval frame.
            </li>

            <li className="flex items-start gap-2">
              <PulseDot />
              Ensure good lighting and avoid dark surroundings.
            </li>

            <li className="flex items-start gap-2">
              <PulseDot />
              Remove sunglasses, masks, or anything covering your face.
            </li>

            <li className="flex items-start gap-2">
              <PulseDot />
              Look directly at the camera and blink naturally for auto capture.
            </li>

            <li className="flex items-start gap-2">
              <PulseDot />
              Keep your device steady while verification is in progress.
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <div>
        <SelfieCapture />
      </div>
    </StepCard>
  );
}

export default SelfiePage;
