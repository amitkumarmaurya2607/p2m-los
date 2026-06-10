// app/aadhar-simulate/page.tsx

"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Fingerprint, Loader2, ShieldCheck, Smartphone } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import axios from "axios";

export default function AadhaarSimulatePage() {
  const [loading, setLoading] = useState(false);
  const [digiLockerData, setDigiLockerData] = useState<{
    raw?: { model?: { transactionId?: string } };
  } | null>(null);

  useEffect(() => {
    const digiLockerData_ = JSON.parse(localStorage.getItem("digiLockerData") || "null");
    setDigiLockerData(digiLockerData_);
  }, []);

  const handleSimulateAadhaar = async () => {
    setLoading(true);

    const txnId = digiLockerData?.raw?.model?.transactionId;
    if (!txnId) {
      console.error("No transactionId found in digiLockerData");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const url = `/los-service/api/webhook/digiLocker?txnId=${txnId}&success=true`;
      const res = await axios.get(url);

      console.log("res-----------------", res);
      if (res?.data?.data?.data) {
        const txnId_ = res?.data?.data?.data;

        const url = `http://localhost:3000/aadhar-details/processing/${txnId_}`;

        window.location.href = url;
      }
    } catch (err) {
      console.error("Webhook error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-[576px]">
        <div className="rounded-3xl border bg-card p-5 sm:p-6 shadow-sm">
          {/* TOP CARD */}
          <div className="relative overflow-hidden rounded-3xl border bg-black h-[350px] shadow-xl">
            <div
              className="relative h-[350px] flex items-center justify-center bg-gradient-to-br
                from-[#0F172A] via-[#111827] to-black"
            >
              {/* BG GLOW */}
              <div
                className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/30 blur-3xl"
              />
              <div
                className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-green-500/20
                  blur-3xl"
              />

              <div className="relative z-10 w-full px-6 text-center text-white">
                <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full border-4 border-green-500/30
                      animate-ping"
                  />
                  <div
                    className="absolute inset-2 rounded-full border-4 border-primary/30
                      animate-pulse"
                  />

                  <div
                    className="relative flex h-20 w-20 items-center justify-center rounded-full
                      bg-white/10 backdrop-blur-md border border-white/20"
                  >
                    {loading ? (
                      <Loader2 className="h-10 w-10 animate-spin text-green-400" />
                    ) : (
                      <Fingerprint className="h-10 w-10 text-green-400" />
                    )}
                  </div>
                </div>

                <h1 className="text-2xl font-bold mb-2">Simulate Aadhaar Verification</h1>

                <p className="text-sm leading-6 text-white/70 max-w-[330px] mx-auto">
                  Use this test screen to simulate a successful Aadhaar DigiLocker verification
                  response.
                </p>

                <div
                  className="mt-7 flex items-center justify-center gap-2 text-sm font-medium
                    text-green-400"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirecting to processing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Ready for simulation
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* INFO CARD */}
          <div className="mt-5 rounded-3xl border bg-background p-5">
            <h2 className="text-base font-bold text-foreground">Simulation Details</h2>

            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full
                    bg-primary/10"
                >
                  <Smartphone className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">DigiLocker Flow</p>
                  <p className="text-xs leading-5 text-muted-foreground">
                    This page simulates the Aadhaar DigiLocker redirect response.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full
                    bg-green-100"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Success Response</p>
                  <p className="text-xs leading-5 text-muted-foreground">
                    On click, it redirects with a simulated transaction ID.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-muted/50 px-4 py-3">
              <p className="text-xs leading-5 text-muted-foreground text-center">
                This screen is only for testing Aadhaar verification flow.
              </p>
            </div>

            <GradientButton
              onClick={handleSimulateAadhaar}
              type="button"
              disabled={loading}
              className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-home-purple to-home-purple-dark
                disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Simulating..." : "Simulate Aadhaar"}
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}
