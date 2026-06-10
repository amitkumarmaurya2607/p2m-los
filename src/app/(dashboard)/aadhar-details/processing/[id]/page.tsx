"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, FileCheck2, Loader2, ShieldCheck, XCircle } from "lucide-react";
import {
  checkAadhaarStatusAction,
  handleDigiLockerCallbackAction,
} from "@/lib/actions/verification.action";
import { showToast } from "@/lib/toast";
// import { saveStepCookie } from "@/lib/step-cookie";

type Status = "loading" | "success" | "error";

export default function AadhaarProcessingIdPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    params.then(({ id }) => {
      if (!id) {
        router.replace("/aadhar-details");
        return;
      } else if (id === "FAIL") {
        setStatus("error");
        const msg = "Verification failed";
        setErrorMsg(msg);
        setTimeout(
          () =>
            router.replace(
              `/aadhar-details?error_code=verify_failed&errMsg=${encodeURIComponent(msg)}`,
            ),
          2000,
        );
        return;
      } else {
        setTimeout(() => {
          checkAadhaarStatusAction(id).then((res) => {
            if (res?.success && res.data?.status !== "FAIL") {
              setStatus("success");
              setTimeout(() => redirect(), 1500);
            } else {
              setStatus("error");
              const msg = res?.error || "Verification failed";
              setErrorMsg(msg);
              setTimeout(
                () =>
                  router.replace(
                    `/aadhar-details?error_code=verify_failed&errMsg=${encodeURIComponent(msg)}`,
                  ),
                2000,
              );
            }
          });
        }, 5000);
      }
    });
  }, [params, router]);

  async function redirect() {
    try {
      setLoading(true);
      const res = await handleDigiLockerCallbackAction();

      if (res?.success) {
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
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-[420px]">
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

            {/* CONTENT */}
            <div className="relative z-10 w-full px-6 text-center text-white">
              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-4 border-green-500/30
                    animate-ping"
                />
                <div className="absolute inset-2 rounded-full border-4 border-primary/30
                  animate-pulse" />

                <div
                  className="relative flex h-20 w-20 items-center justify-center rounded-full
                    bg-white/10 backdrop-blur-md border border-white/20"
                >
                  {status === "loading" && <ShieldCheck className="h-10 w-10 text-green-400" />}
                  {status === "success" && <CheckCircle2 className="h-10 w-10 text-green-400" />}
                  {status === "error" && <XCircle className="h-10 w-10 text-destructive" />}
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2">
                {status === "loading" && "Verifying Aadhaar"}
                {status === "success" && "Verification Successful"}
                {status === "error" && "Verification Failed"}
              </h2>

              <p className="text-sm leading-6 text-white/70 max-w-[300px] mx-auto">
                {status === "loading" &&
                  "Please wait while we securely process your Aadhaar details."}
                {status === "success" &&
                  "Your Aadhaar has been verified successfully. Redirecting..."}
                {status === "error" && (errorMsg || "Verification could not be completed.")}
              </p>

              <div className="mt-7 flex items-center justify-center gap-2 text-sm font-medium">
                {status === "loading" && (
                  <span className="text-green-400">
                    <Loader2 className="h-4 w-4 animate-spin inline mr-1" />
                    Processing verification...
                  </span>
                )}
                {status === "success" && (
                  <span className="text-green-400">
                    <CheckCircle2 className="h-4 w-4 inline mr-1" />
                    Redirecting...
                  </span>
                )}
                {status === "error" && (
                  <span className="text-destructive">
                    <XCircle className="h-4 w-4 inline mr-1" />
                    Redirecting...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="mt-5 rounded-3xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-base font-bold text-foreground">Aadhaar Verification Status</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${
                  status !== "error" ? "bg-green-100" : "bg-muted"
                }`}
              >
                {status !== "error" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  DigiLocker Redirect Completed
                </p>
                <p className="text-xs text-muted-foreground">
                  User authentication response received.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${
                  status === "success"
                    ? "bg-green-100"
                    : status === "error"
                      ? "bg-destructive/10"
                      : "bg-primary/10"
                  }`}
              >
                {status === "success" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                {status === "error" && <XCircle className="h-4 w-4 text-destructive" />}
                {status === "loading" && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">Fetching Aadhaar Details</p>
                <p className="text-xs text-muted-foreground">
                  {status === "loading" && "We are validating your Aadhaar information securely."}
                  {status === "success" && "Your Aadhaar details have been fetched successfully."}
                  {status === "error" && "Could not fetch Aadhaar details."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${
                  status === "success" ? "bg-green-100" : "bg-muted"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <FileCheck2 className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">Verification Result</p>
                <p className="text-xs text-muted-foreground">
                  {status === "loading" && "Final status will be updated shortly."}
                  {status === "success" && "Verification completed successfully."}
                  {status === "error" && "Verification encountered an error."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-muted/50 px-4 py-3">
            <p className="text-xs leading-5 text-muted-foreground text-center">
              {status === "loading"
                ? "Please do not refresh or close this page while verification is in progress."
                : "You will be redirected automatically."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
