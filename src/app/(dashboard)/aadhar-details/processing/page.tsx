"use client";

import { CheckCircle2, FileCheck2, Loader2, ShieldCheck } from "lucide-react";

export default function AadhaarProcessingPage() {
    return (
        <div className="min-h-screen bg-background px-4 py-8 flex items-center justify-center">
            <div className="w-full max-w-[420px]">
                <div className="relative overflow-hidden rounded-3xl border bg-black h-[350px] shadow-xl">
                    <div className="relative h-[350px] flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#111827] to-black">
                        {/* BG GLOW */}
                        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-green-500/20 blur-3xl" />

                        {/* CONTENT */}
                        <div className="relative z-10 w-full px-6 text-center text-white">
                            <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-ping" />
                                <div className="absolute inset-2 rounded-full border-4 border-primary/30 animate-pulse" />

                                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                    <ShieldCheck className="h-10 w-10 text-green-400" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold mb-2">
                                Verifying Aadhaar
                            </h2>

                            <p className="text-sm leading-6 text-white/70 max-w-[300px] mx-auto">
                                Please wait while we securely process your Aadhaar details from DigiLocker.
                            </p>

                            <div className="mt-7 flex items-center justify-center gap-2 text-sm font-medium text-green-400">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Processing verification...
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATUS CARD */}
                <div className="mt-5 rounded-3xl border bg-card p-5 shadow-sm">
                    <h3 className="mb-4 text-base font-bold text-foreground">
                        Aadhaar Verification Status
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
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
                            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    Fetching Aadhaar Details
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    We are validating your Aadhaar information securely.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 opacity-60">
                            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                                <FileCheck2 className="h-4 w-4 text-muted-foreground" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    Verification Result
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Final status will be updated shortly.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-muted/50 px-4 py-3">
                        <p className="text-xs leading-5 text-muted-foreground text-center">
                            Please do not refresh or close this page while Aadhaar verification is in progress.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}