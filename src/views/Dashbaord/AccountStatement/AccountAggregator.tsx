"use client";

import React, { useEffect, useState } from "react";
import {
    Building2,
    ShieldCheck,
    Landmark,
    Loader2,
    X,
} from "lucide-react";
import { fetchStatementUrlAction } from "@/lib/actions/statement.action";
import { showToast } from "@/lib/toast";
import { useRouter } from "next/navigation";

function AccountAggregator() {
    const [tempUrl, setTempUrl] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [fetchError, setFetchError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const data = event.data;

            if (!data) return;

            console.log("CART EVENT => ", data);

            /**
     * Example event:
     * {
     *   source: "cartnetbanking.com",
     *   status: "SUCCESS",
     *   request: "REQ00000039"
     * }
     */

            if (data?.status === "SUCCESS") {
                showToast({ message: "Bank statement uploaded successfully", type: "success" });
                router.push("/employment-details");
            }

            if (data?.status === "ERROR") {
                console.log("Bank fetch failed");
                showToast({ message: "Bank fetch failed", type: "error" });
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const handleConnect = async () => {
        try {
            setConnecting(true);
            setFetchError("");

            const result = await fetchStatementUrlAction();

            if (result?.data?.tempUrl) {

                setTempUrl(result.data.tempUrl);
                setShowPopup(true);
            } else if (result?.error) {
                setFetchError(result.error);
                showToast({
                    message: result.error,
                    type: "error",
                });
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Something went wrong";
            setFetchError(msg);
            showToast({ message: msg, type: "error" });
        } finally {
            setConnecting(false);
        }
    };

    return (
        <>
            <div className="rounded-3xl border border-border-light bg-surface p-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-base font-bold text-text-heading">
                            Fetch Bank Statement
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-text-muted-dark">
                            Securely connect your bank account and fetch your latest
                            bank statement instantly.
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-2xl bg-secondary/10 p-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />

                    <div>
                        <p className="text-sm font-semibold text-text-heading">
                            Bank-grade Security
                        </p>

                        <p className="mt-1 text-xs leading-5 text-text-muted-dark">
                            Your credentials remain encrypted and securely processed.
                        </p>
                    </div>
                </div>

                {fetchError && (
                    <p className="mt-4 text-sm text-destructive text-center">{fetchError}</p>
                )}
                <button
                    type="button"
                    onClick={handleConnect}
                    disabled={connecting}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                    {connecting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Landmark className="h-5 w-5" />
                    )}
                    {connecting ? "Connecting..." : "Connect Bank Account"}
                </button>
            </div>

            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="relative w-full max-w-[480px] overflow-hidden rounded-3xl bg-white shadow-2xl ">
                        <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
                            <div>
                                <p className="text-sm font-semibold text-text-heading">
                                    Secure Banking Window
                                </p>
                                <p className="text-xs text-text-muted-dark">
                                    Complete your banking verification
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPopup(false)}
                                className="rounded-lg p-1.5 text-text-muted hover:bg-muted"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <iframe
                            src={tempUrl}
                            title="Bank Fetch"
                            className="h-[650px] w-full border-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            allow="camera *; microphone *"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default AccountAggregator;
