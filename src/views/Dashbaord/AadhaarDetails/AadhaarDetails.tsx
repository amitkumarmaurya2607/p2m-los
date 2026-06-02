"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StepCard from "../componants/StepCard";
import GradientButton from "@/components/ui/GradientButton";
import { ArrowRight, CheckCircle2, Fingerprint, ShieldCheck, XCircle } from "lucide-react";
import {
  digiLockerAction,
  handleDigiLockerCallbackAction,
} from "@/lib/actions/verification.action";
import { showToast } from "@/lib/toast";

function AadhaarDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const txnId = searchParams.get("txnId");
  const errorCode = searchParams.get("error_code");
  const errMsg = searchParams.get("errMsg");
  const hasCallBack = Boolean(txnId);
  const isCallbackError = Boolean(errorCode);

  const [digiLockerData, setDigiLockerData] = useState<unknown>(null);
  const [digiLockerLoading, setDigiLockerLoading] = useState(true);
  const [digiLockerError, setDigiLockerError] = useState<string | null>(null);
  const [isRedirect, setIsRedirect] = useState(false);
  const [loading, setLoadin] = useState(false);

  async function callDigiLocker() {
    setDigiLockerLoading(true);
    setDigiLockerError(null);
    const res = await digiLockerAction();
    console.log("digiLocker response:", res);
    if (res.success) {
      setDigiLockerData(res.data?.raw?.model);
    } else {
      setDigiLockerError(res.error || "digiLocker failed");
    }
    setDigiLockerLoading(false);
  }

  const handleContinue = useCallback(async () => {
    try {
      setLoadin(true);
      const res = await handleDigiLockerCallbackAction();

      if (res?.success) {
        setIsRedirect(true);
        router.push("/bank-details");
        showToast({ message: "Aadhaar verified successfully!", type: "success" });
        return;
      } else if (res?.error) {
        showToast({ message: "Aadhaar  verification failed", type: "error" });
        return;
      }
    } catch (err) {
      showToast({
        message: err instanceof Error ? err.message : "Something went wrong",
        type: "error",
      });
    } finally {
      setLoadin(false);
    }
  }, [router]);

  useEffect(() => {
    if (!hasCallBack) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      callDigiLocker();
    }
  }, [hasCallBack]);

  if (hasCallBack) {
    if (isCallbackError) {
      return (
        <StepCard
          title="Verification Failed"
          subtitle="Aadhaar verification was not completed"
          steper={true}
          className="lg:w-[600px] mx-auto"
          icon={<XCircle className="w-6 h-6 text-destructive" />}
        >
          <div className="flex flex-col items-center text-center py-6">
            <div
              className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center
                mb-5"
            >
              <XCircle className="w-14 h-14 text-destructive" />
            </div>

            <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>

            <p className="text-sm text-muted-foreground max-w-md mb-6">
              {errMsg || "The verification process was not completed. Please try again."}
            </p>

            <div className="w-full rounded-2xl border bg-muted/40 p-4 text-left mb-6">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Error Details</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Code: {errorCode || "N/A"}
                    {txnId && <> | Txn ID: {txnId}</>}
                  </p>
                </div>
              </div>
            </div>

            <GradientButton
              className="w-full flex justify-center items-center"
              onClick={() => router.push("/aadhar-details")}
              rightIcon={<ArrowRight className="w-4 h-4 ml-2" />}
            >
              Try Again
            </GradientButton>
          </div>
        </StepCard>
      );
    }

    return (
      <StepCard
        title="Verification Successful"
        subtitle="Your Aadhaar has been verified successfully"
        steper={true}
        className="lg:w-[600px] mx-auto"
        icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
      >
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-5">
            <ShieldCheck className="w-14 h-14 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Aadhaar Verified Successfully</h2>

          <p className="text-sm text-muted-foreground max-w-md mb-6">
            Your identity has been securely verified through DigiLocker. You can now continue with
            the next step of your application.
          </p>

          <div className="w-full rounded-2xl border bg-muted/40 p-4 text-left mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Verification Completed</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your Aadhaar details were validated securely using DigiLocker authentication.
                </p>
              </div>
            </div>
          </div>

          <GradientButton
            className="w-full flex justify-center items-center"
            onClick={handleContinue}
            disabled={isRedirect || loading}
            rightIcon={!isRedirect && !loading && <ArrowRight className="w-4 h-4 ml-2" />}
          >
            {isRedirect ? "Redirecting..." : loading ? "Verifying..." : " Continue"}
          </GradientButton>
        </div>
      </StepCard>
    );
  }

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
        <div className="text-center text-sm text-muted-foreground mb-4">Loading DigiLocker...</div>
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
            onClick={() => window.open((digiLockerData as Record<string, string>).kycUrl, "_blank")}
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
