import GradientButton from "@/components/ui/GradientButton";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useApplicationContext } from "@/context/ApplicationContext";
import { submitSelfieAction } from "@/lib/actions/selfie.action";

type CaptureProps = {
  mode?: "photo" | "video";
  onSubmit?: (file: Blob) => void;
};

const SelfieCapture: React.FC<CaptureProps> = ({ mode = "photo", onSubmit }) => {
  const router = useRouter();
  const { setSelfieData } = useApplicationContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: mode === "video",
      });

      setStream(media);

      if (videoRef.current) {
        videoRef.current.srcObject = media;
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const imageUrl = URL.createObjectURL(blob);

      setCapturedBlob(blob);
      setPreviewUrl(imageUrl);
      stopCamera();
    }, "image/png");
  };

  const startRecording = () => {
    if (!stream || recording) return;

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const videoUrl = URL.createObjectURL(blob);

      setCapturedBlob(blob);
      setPreviewUrl(videoUrl);
      setRecording(false);
      stopCamera();
    };

    recorder.start();
    setRecording(true);

    setTimeout(() => {
      if (recorder.state === "recording") {
        recorder.stop();
      }
    }, 20000);
  };

  const handleTryAgain = async () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setPreviewUrl(null);
    setCapturedBlob(null);
    setRecording(false);

    await startCamera();
  };

  const handleSubmit = async () => {
    if (!capturedBlob) return;

    onSubmit?.(capturedBlob);

    setSelfieData({ captured: true });
    const result = await submitSelfieAction();
    if (!result?.error) {
      router.push("/employment-details");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-[220px] h-[220px]">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-border" />

        <div className="absolute inset-3 rounded-[24px] overflow-hidden border-2 border-success">
          {previewUrl ? (
            mode === "photo" ? (
              <img src={previewUrl} alt="Selfie Preview" className="w-full h-full object-cover" />
            ) : (
              <video src={previewUrl} controls className="w-full h-full object-cover" />
            )
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {!previewUrl ? (
        <GradientButton
          type="button"
          className="mt-8"
          disabled={recording}
          onClick={mode === "photo" ? capturePhoto : startRecording}
        >
          <span className="flex items-center gap-2">
            {mode === "photo" ? "Take Selfie" : recording ? "Recording..." : "Record 20s Video"}
          </span>
        </GradientButton>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-3 w-full">
          <GradientButton type="button" onClick={handleSubmit}>
            <span className="flex items-center gap-2">Submit</span>
          </GradientButton>

          <button
            type="button"
            onClick={handleTryAgain}
            className="text-sm font-medium text-primary underline underline-offset-4
              hover:text-primary/80"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default SelfieCapture;
