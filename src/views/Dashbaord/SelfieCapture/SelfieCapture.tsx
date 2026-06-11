"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  Camera,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ScanFace,
  ShieldCheck,
  ShieldAlert,
  Globe,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

import GradientButton from "@/components/ui/GradientButton";

import { showToast } from "@/lib/toast";
import { submitSelfieAction } from "@/lib/actions/selfie.action";
import { callSecureFormData } from "@/lib/secure-action";
import Image from "next/image";

type CaptureStatus =
  | "loading"
  | "ready"
  | "face-not-found"
  | "blink-required"
  | "capturing"
  | "captured";

type Props = {
  onSubmit?: (blob: Blob) => void;
};

function SelfieCapture({ onSubmit }: Props) {
  const router = useRouter();

  const webcamRef = useRef<Webcam>(null);

  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);

  const [status, setStatus] = useState<CaptureStatus>("loading");

  const [submitting, setSubmitting] = useState(false);

  const blinkedRef = useRef(false);

  const isCapturedRef = useRef(false);

  const [retakeKey, setRetakeKey] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  const [isRedirect, setIsRedirect] = useState(false);

  const [cameraPermission, setCameraPermission] = useState<
    "loading" | "prompt" | "granted" | "denied" | "unavailable"
  >("loading");

  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  });

  const [os] = useState<"android" | "ios" | "other">(() => {
    if (typeof window === "undefined") return "other";
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return "android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    return "other";
  });

  const [browserPkg] = useState(() => {
    if (typeof window === "undefined") return "com.android.chrome";
    const ua = navigator.userAgent;
    if (/Edg/i.test(ua)) return "com.microsoft.emmx";
    if (/Firefox/i.test(ua)) return "org.mozilla.firefox";
    if (/Samsung/i.test(ua)) return "com.sec.android.app.sbrowser";
    if (/OPR|Opt/i.test(ua)) return "com.opera.browser";
    return "com.android.chrome";
  });

  const openSystemSettings = () => {
    if (os === "android") {
      const intentUrl = `intent://settings/#Intent;action=android.settings.APPLICATION_DETAILS_SETTINGS;S:android.provider.extra.APP_PACKAGE=${browserPkg};end`;
      const a = document.createElement("a");
      a.href = intentUrl;
      a.click();
    } else if (os === "ios") {
      window.location.href = "App-Prefs:root=Privacy&path=CAMERA";
    }
  };

  const requestCameraAccess = async () => {
    try {
      setCameraPermission("loading");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission("granted");
      loadModel();
    } catch {
      setCameraPermission("denied");
    }
  };

  // LOAD MEDIAPIPE
  async function loadModel() {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
      );

      const landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
        },
        runningMode: "VIDEO",
        numFaces: 1,
      });

      setFaceLandmarker(landmarker);

      setStatus("ready");
    } catch (error) {
      console.error(error);

      showToast({
        type: "error",
        message: "Failed to initialize camera AI",
      });
    }
  }

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraPermission("unavailable");
      return;
    }

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "camera" as PermissionName })
        .then((result) => {
          setCameraPermission(result.state as "prompt" | "granted" | "denied");

          if (result.state === "granted") {
            loadModel();
          }

          result.onchange = () => {
            setCameraPermission(result.state as "prompt" | "granted" | "denied");
          };
        })
        .catch(() => {
          setCameraPermission("prompt");
        });
    } else {
      setCameraPermission("prompt");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // CONVERT IMAGE TO BLOB
  async function convertBase64ToBlob(imageSrc: string) {
    const response = await fetch(imageSrc);

    return await response.blob();
  }

  // BLINK DETECTION
  useEffect(() => {
    if (!faceLandmarker) return;

    const interval = setInterval(async () => {
      if (!webcamRef.current || !webcamRef.current.video || isCapturedRef.current) {
        return;
      }

      const video = webcamRef.current.video;

      if (
        !video ||
        video.readyState < 2 ||
        video.videoWidth === 0 ||
        video.videoHeight === 0 ||
        video.paused
      ) {
        return;
      }

      const results = faceLandmarker.detectForVideo(video, performance.now());

      // NO FACE
      if (!results.faceLandmarks.length) {
        setStatus("face-not-found");
        return;
      }

      setStatus("blink-required");

      const landmarks = results.faceLandmarks[0];

      // LEFT EYE
      const top = landmarks[159];
      const bottom = landmarks[145];

      const eyeOpenDistance = Math.abs(top.y - bottom.y);

      // EYES CLOSED
      if (eyeOpenDistance < 0.01) {
        blinkedRef.current = true;
      }

      // EYES OPENED AGAIN
      if (blinkedRef.current && eyeOpenDistance > 0.02) {
        blinkedRef.current = false;

        setStatus("capturing");

        const imageSrc = webcamRef.current.getScreenshot();

        if (imageSrc) {
          const blob = await convertBase64ToBlob(imageSrc);

          isCapturedRef.current = true;

          setCapturedBlob(blob);

          setCapturedImage(imageSrc);

          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000)

          setTimeout(() => {
            setStatus("captured");
          }, 800);
        }
      }
    }, 120);

    return () => clearInterval(interval);
  }, [faceLandmarker, retakeKey]);

  // RETAKE
  function retakePhoto() {
    setCapturedImage(null);

    setCapturedBlob(null);

    isCapturedRef.current = false;

    setStatus("ready");

    setRetakeKey((k) => k + 1);
  }

  // SUBMIT
  const handleSubmit = async () => {
    if (!capturedBlob) return;

    try {
      setSubmitting(true);

      onSubmit?.(capturedBlob);

      const formData = new FormData();

      formData.append("file", capturedBlob, `selfie-${Date.now()}.jpg`);

      //formData.append("data", JSON.stringify({ mediaType: "IMAGE" }));

      const result = await callSecureFormData(submitSelfieAction, formData);

      if (result?.error) {
        showToast({ type: "error", message: result?.error });
        return;
      }

      setIsRedirect(true);
      router.push("/address-proof");

      showToast({
        type: "success",
        message: "Selfie uploaded successfully",
      });
    } catch (error) {
      console.error(error);

      showToast({
        type: "error",
        message: "Failed to upload selfie",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {cameraPermission === "denied" && !capturedImage && (
        <div className="flex flex-col items-center py-10">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10
              mb-6"
          >
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
          <h3 className="text-lg font-bold text-text-heading mb-2">Camera Access Denied</h3>
          <p className="text-center text-text-muted mb-4 max-w-sm">
            Camera access is blocked. Please enable camera permissions to continue.
          </p>
          <div
            className="rounded-xl border border-border-light bg-surface p-4 max-w-sm w-full text-sm
              text-text-muted space-y-2"
          >
            <p className="font-semibold text-text-heading">How to enable:</p>
            {isMobile && os === "android" ? (
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Open <strong>Settings</strong> on your device
                </li>
                <li>
                  Go to <strong>Apps</strong> &gt; <strong>Chrome</strong>
                </li>
                <li>
                  Tap <strong>Permissions</strong>
                </li>
                <li>
                  Tap <strong>Camera</strong>
                </li>
                <li>
                  Select <strong>Allow</strong>
                </li>
                <li>Return here and tap "Try Again" below</li>
              </ol>
            ) : isMobile && os === "ios" ? (
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Open <strong>Settings</strong> on your device
                </li>
                <li>
                  Scroll down and tap <strong>Safari</strong>
                </li>
                <li>
                  Tap <strong>Camera</strong>
                </li>
                <li>
                  Select <strong>Allow</strong>
                </li>
                <li>Return here and tap "Try Again" below</li>
              </ol>
            ) : (
              <ol className="list-decimal list-inside space-y-1">
                <li>Click the lock/info icon in the address bar</li>
                <li>Find "Camera" permission</li>
                <li>Change it to "Allow"</li>
                <li>Refresh the page</li>
              </ol>
            )}
          </div>
          {isMobile && (
            <button
              type="button"
              onClick={openSystemSettings}
              className="mt-3 text-sm font-semibold text-primary underline underline-offset-2
                hover:text-primary/80"
            >
              Open System Settings
            </button>
          )}
          <GradientButton
            type="button"
            onClick={requestCameraAccess}
            className="mt-4 w-full max-w-xs"
          >
            Try Again
          </GradientButton>
        </div>
      )}

      {cameraPermission === "unavailable" && !capturedImage && (
        <div className="flex flex-col items-center py-10">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10
              mb-6"
          >
            <Globe className="h-12 w-12 text-destructive" />
          </div>
          <h3 className="text-lg font-bold text-text-heading mb-2">Camera Not Supported</h3>
          <p className="text-center text-text-muted max-w-sm">
            Your browser does not support camera access. Please use a different browser or device.
          </p>
        </div>
      )}

      {!capturedImage && cameraPermission !== "denied" && cameraPermission !== "unavailable" && (
        <>
          {/* CAMERA CARD */}
          <div className="relative overflow-hidden rounded-3xl border bg-black h-[350px]">
            <Webcam
              ref={webcamRef}
              mirrored
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user",
              }}
              onUserMediaError={() => {
                setCameraPermission("denied");
              }}
              onUserMedia={() => {
                if (cameraPermission === "loading" || cameraPermission === "prompt") {
                  setCameraPermission("granted");
                }
              }}
              className="w-full h-[350px] object-cover"
            />

            {/* FACE FRAME */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[200px] h-[260px] sm:w-[220px] sm:h-[290px] border-[3px]
                  border-white/90 rounded-[120px] shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"
              />
            </div>

            {/* STATUS */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <div
                className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-sm
                  flex items-center gap-2"
              >
                {status === "loading" && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading AI Detection...
                  </>
                )}

                {status === "ready" && (
                  <>
                    <ScanFace className="w-4 h-4" />
                    Align Your Face
                  </>
                )}

                {status === "face-not-found" && (
                  <>
                    <Camera className="w-4 h-4" />
                    Face Not Detected
                  </>
                )}

                {status === "blink-required" && (
                  <>
                    <ScanFace className="w-4 h-4" />
                    Blink Your Eyes
                  </>
                )}

                {status === "capturing" && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Capturing Selfie...
                  </>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM GUIDE */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 text-center text-white">
            <p className="text-sm font-medium">Position your face inside the frame</p>
            <p className="text-xs text-white/70 mt-1">Auto capture will happen after eye blink</p>
          </div>
        </>
      )}

      {capturedImage && (
        <>
          {/* CAMERA CARD */}
          <div className="relative overflow-hidden rounded-3xl border bg-black h-[350px]">
            <div className="relative h-[350px]">
              <Image
                height={350}
                width={400}
                src={capturedImage}
                alt="Captured Selfie"
                className="w-full h-[350px] object-cover"
              />

              {/* SUCCESS OVERLAY */}
              {showPopup && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                  <div
                    className="bg-white rounded-3xl p-5 text-center max-w-[280px] shadow-2xl
                      relative"
                  >
                    <button
                      onClick={() => setShowPopup(false)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted flex
                        items-center justify-center hover:bg-muted/80 transition"
                    >
                      <X className="w-4 h-4 text-text-muted" />
                    </button>
                    <div
                      className="w-20 h-20 rounded-full bg-green-100 flex items-center
                        justify-center mx-auto mb-4"
                    >
                      <ShieldCheck className="w-10 h-10 text-green-600" />
                    </div>

                    <h3 className="text-xl font-bold mb-2">Selfie Captured</h3>

                    <p className="text-sm text-muted-foreground mb-5">
                      Your selfie has been securely captured for identity verification.
                    </p>

                    <div
                      className="flex items-center justify-center gap-2 text-green-600 text-sm
                        font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Verification Ready
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="space-y-3">
            <GradientButton
              onClick={handleSubmit}
              disabled={submitting || isRedirect}
              className="w-full"
            >
              {isRedirect
                ? "Redirecting..."
                : submitting
                  ? "Uploading..."
                  : "Continue Verification"}
            </GradientButton>

            <button
              onClick={retakePhoto}
              disabled={submitting || isRedirect}
              className="w-full border rounded-xl py-3 text-sm font-medium flex items-center
                justify-center gap-2 hover:bg-muted transition disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Selfie
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SelfieCapture;
