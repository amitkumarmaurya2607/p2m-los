import GradientButton from "@/components/ui/GradientButton";
import React, { useEffect, useRef, useState } from "react";

type CaptureProps = {
  mode?: "photo" | "video"; // flag
};

const SelfieCapture: React.FC<CaptureProps> = ({ mode = "photo" }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
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

  // 📸 Capture Image
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx?.drawImage(video, 0, 0);
      const image = canvas.toDataURL("image/png");

      console.log("Captured Image:", image);
    }
  };

  // 🎥 Record Video (20s)
  const startRecording = () => {
    if (!stream) return;

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      console.log("Recorded Video:", blob);
    };

    recorder.start();
    setRecording(true);

    // stop after 20 seconds
    setTimeout(() => {
      recorder.stop();
      setRecording(false);
    }, 20000);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Camera Frame */}
      <div className="relative w-[220px] h-[220px]">
        {/* Dotted Circle */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-border" />

        {/* Video Preview */}
        <div className="absolute inset-3 rounded-[24px] overflow-hidden border-2 border-success">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Button */}

        <GradientButton
         type="submit"
           className='mt-8'
           disabled={recording}
               onClick={mode === "photo" ? capturePhoto : startRecording}
           >
                          <span className="flex items-center gap-2">
{mode === "photo"
          ? "Take Selfie"
          : recording
          ? "Recording..."
          : "Record 20s Video"}

</span>
                        </GradientButton>
  
    </div>
  );
};

export default SelfieCapture;