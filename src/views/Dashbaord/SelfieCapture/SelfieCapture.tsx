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
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

import GradientButton from "@/components/ui/GradientButton";

import { showToast } from "@/lib/toast";
import { submitSelfieAction } from "@/lib/actions/selfie.action";

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

  const [faceLandmarker, setFaceLandmarker] =
    useState<FaceLandmarker | null>(null);

  const [capturedImage, setCapturedImage] =
    useState<string | null>(null);

  const [capturedBlob, setCapturedBlob] =
    useState<Blob | null>(null);

  const [status, setStatus] =
    useState<CaptureStatus>("loading");

  const [submitting, setSubmitting] =
    useState(false);

  const blinkedRef = useRef(false);

  const isCapturedRef = useRef(false);

  const [retakeKey, setRetakeKey] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  // LOAD MEDIAPIPE
  useEffect(() => {
    loadModel();
  }, []);

  async function loadModel() {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const landmarker =
        await FaceLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
            },
            runningMode: "VIDEO",
            numFaces: 1,
          }
        );

      setFaceLandmarker(landmarker);

      setStatus("ready");
    } catch (error) {
      console.error(error);

      showToast(
        {
          type: "error",
          message: "Failed to initialize camera AI"
        }
      );
    }
  }

  // BLINK DETECTION
  useEffect(() => {
    if (!faceLandmarker) return;

    const interval = setInterval(async () => {
      if (
        !webcamRef.current ||
        !webcamRef.current.video ||
        isCapturedRef.current
      ) {
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

      const results =
        faceLandmarker.detectForVideo(
          video,
          performance.now()
        );

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

      const eyeOpenDistance = Math.abs(
        top.y - bottom.y
      );

      // EYES CLOSED
      if (eyeOpenDistance < 0.01) {
        blinkedRef.current = true;
      }

      // EYES OPENED AGAIN
      if (
        blinkedRef.current &&
        eyeOpenDistance > 0.02
      ) {
        blinkedRef.current = false;

        setStatus("capturing");

        const imageSrc =
          webcamRef.current.getScreenshot();

        if (imageSrc) {
          const blob =
            await convertBase64ToBlob(imageSrc);

          isCapturedRef.current = true;

          setCapturedBlob(blob);

          setCapturedImage(imageSrc);

          setShowPopup(true);

          setTimeout(() => {
            setStatus("captured");
          }, 800);
        }
      }
    }, 120);

    return () => clearInterval(interval);
  }, [faceLandmarker, retakeKey]);

  // CONVERT IMAGE TO BLOB
  async function convertBase64ToBlob(
    imageSrc: string
  ) {
    const response = await fetch(imageSrc);

    return await response.blob();
  }

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

      formData.append(
        "selfie",
        capturedBlob,
        `selfie-${Date.now()}.jpg`
      );

      const result =
        await submitSelfieAction(formData);

      if (result?.error) {
        showToast({ type: "error", message: result?.error });
        return;
      }

      showToast(
        {
          type: "success",
          message: "Selfie uploaded successfully"
        }
      );

      router.push("/address-proof");
    } catch (error) {
      console.error(error);

      showToast(
        {
          type: "error",
          message: "Failed to upload selfie"
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* CAMERA CARD */}
      <div className="relative overflow-hidden rounded-3xl border bg-black h-[350px]">
        {!capturedImage ? (
          <>
            <Webcam
              ref={webcamRef}
              mirrored
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user",
              }}
              className="w-full h-[350px] object-cover"
            />

            {/* FACE FRAME */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[200px] h-[260px] sm:w-[220px] sm:h-[290px] border-[3px] border-white/90 rounded-[120px] shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]" />
            </div>

            {/* STATUS */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-sm flex items-center gap-2">
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

          </>
        ) : (
          <div className="relative h-[350px]">
            <img
              src={capturedImage}
              alt="Captured Selfie"
              className="w-full h-[350px] object-cover"
            />

            {/* SUCCESS OVERLAY */}
            {showPopup && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-5 text-center max-w-[280px] shadow-2xl relative">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition"
                  >
                    <X className="w-4 h-4 text-text-muted" />
                  </button>
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-10 h-10 text-green-600" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    Selfie Captured
                  </h3>

                  <p className="text-sm text-muted-foreground mb-5">
                    Your selfie has been securely captured
                    for identity verification.
                  </p>

                  <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Verification Ready
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BOTTOM GUIDE */}

      </div>

      {/* ACTIONS */}
      {capturedImage ? (
        <div className="space-y-3">
          <GradientButton
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full"
          >
            {submitting
              ? "Uploading..."
              : "Continue Verification"}
          </GradientButton>

          <button
            onClick={retakePhoto}
            disabled={submitting}
            className="w-full border rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-muted transition disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Selfie
          </button>
        </div>
      )
        : <div className="">
          <div className="bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 text-center text-white">
            <p className="text-sm font-medium">
              Position your face inside the frame
            </p>

            <p className="text-xs text-white/70 mt-1">
              Auto capture will happen after eye
              blink
            </p>
          </div>
        </div>
      }
    </div>
  );
}

export default SelfieCapture;