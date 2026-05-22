"use client";
import { useState, useEffect } from "react";
import StepCard from "../componants/StepCard";
import GradientButton from "@/components/ui/GradientButton";
import { Fingerprint } from "lucide-react";
import { digiLockerAction } from "@/lib/actions/verification.action";

function AadhaarDetails() {
  const [digiLockerData, setDigiLockerData] = useState<unknown>(null);
  const [digiLockerLoading, setDigiLockerLoading] = useState(true);
  const [digiLockerError, setDigiLockerError] = useState<string | null>(null);

  async function callDigiLocker() {
    setDigiLockerLoading(true);
    setDigiLockerError(null);
    const res = await digiLockerAction();
    console.log("digiLocker response:", res);
    if (res.success) {
      setDigiLockerData(res.data);
    } else {
      setDigiLockerError(res.error || "digiLocker failed");
    }
    setDigiLockerLoading(false);
  }

  useEffect(() => {
    callDigiLocker();
  }, []);

  return (
    <StepCard
      title="Aadhaar Verification"
      subtitle="Verify your identity through DigiLocker"
      steper={true}
      icon={<Fingerprint className="w-6 h-6 text-primary" />}
      className="lg:w-[600px] mx-auto"
      tips={{
        title: "Aadhaar Verification",
        description:
          "To continue your application, please verify your Aadhaar details securely. This helps us confirm your identity, prevent fraud, and ensure compliance with financial regulations.",
        Icon: <Fingerprint className="w-5 h-5 text-primary" />,
        noteTitle: "Secure & Confidential",
        noteDescription:
          "Your Aadhaar information is encrypted with bank-grade security standards and is used only for identity verification and compliance purposes.",
      }}
    >
      {digiLockerLoading && (
        <div className="text-center text-sm text-muted-foreground mb-4">
          Loading DigiLocker...
        </div>
      )}

      {digiLockerError && (
        <div className="mb-4 space-y-2">
          <p className="text-sm text-destructive text-center">{digiLockerError}</p>
          <GradientButton type="button" onClick={callDigiLocker} className="w-full">
            Generate Link
          </GradientButton>
        </div>
      )}

      {digiLockerData !== null && (
        <div className="mb-4">
          <GradientButton
            type="button"
            onClick={() =>
              window.open(
                (digiLockerData as any).DIGI_KYC_URL,
                "_blank",
              )
            }
            className="w-full"
          >
            Verify with DigiLocker
          </GradientButton>
        </div>
      )}
    </StepCard>
  );
}

export default AadhaarDetails;
