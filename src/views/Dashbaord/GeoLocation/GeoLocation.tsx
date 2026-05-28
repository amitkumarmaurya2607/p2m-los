"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StepCard from "../componants/StepCard";
import GradientButton from "@/components/ui/GradientButton";
import { MapPin, Navigation, Lightbulb, ShieldAlert, Globe } from "lucide-react";
import { showToast } from "@/lib/toast";
import {
  saveGeoLocationAction,
  saveLocationCookiesAction,
} from "@/lib/actions/verification.action";
import PulseDot from "@/components/PulseDot";

function GeoLocation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [permissionState, setPermissionState] = useState<
    "prompt" | "granted" | "denied" | "unavailable"
  >("prompt");
  const [isRedirect, setIsRedirect] = useState(false)


  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  });

  const [os, setOs] = useState<"android" | "ios" | "other">("other");

  const [browserPkg, setBrowserPkg] = useState<string>("com.android.chrome");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) {
      setOs("android");
      if (/Edg/i.test(ua)) setBrowserPkg("com.microsoft.emmx");
      else if (/Firefox/i.test(ua)) setBrowserPkg("org.mozilla.firefox");
      else if (/Samsung/i.test(ua)) setBrowserPkg("com.sec.android.app.sbrowser");
      else if (/OPR|Opt/i.test(ua)) setBrowserPkg("com.opera.browser");
      else setBrowserPkg("com.android.chrome");
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      setOs("ios");
    }
  }, []);

  const openSystemSettings = () => {
    if (os === "android") {
      const intentUrl = `intent://settings/#Intent;action=android.settings.APPLICATION_DETAILS_SETTINGS;S:android.provider.extra.APP_PACKAGE=${browserPkg};end`;
      const a = document.createElement("a");
      a.href = intentUrl;
      a.click();
    } else if (os === "ios") {
      window.location.href = "App-Prefs:root=Privacy&path=LOCATION";
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setPermissionState("unavailable");
      return;
    }

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          setPermissionState(result.state as "prompt" | "granted" | "denied");

          if (result.state === "granted") {
            useCurrentLocation();
          }

          result.onchange = () => {
            setPermissionState(result.state as "prompt" | "granted" | "denied");
          };
        })
        .catch(() => {
          // Permissions API unsupported or threw — stay in "prompt" state
        });
    }
  }, []);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({ latitude, longitude, accuracy });
        setLoading(false);
        localStorage.setItem("gl_done", "1");
        saveLocationCookiesAction({
          latitude,
          longitude,
        });
        showToast({ message: "Location captured successfully", type: "success" });
      },
      (err) => {
        setLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setPermissionState("denied");
            setError("Location permission denied. Please allow access in your browser settings.");
            showToast({ message: "Location permission denied", type: "error" });
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable. Please try again.");
            showToast({ message: "Location unavailable", type: "error" });
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            showToast({ message: "Location request timed out", type: "error" });
            break;
          default:
            setError("An unknown error occurred");
            showToast({ message: "Failed to get location", type: "error" });
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    );
  };

  const handleSubmit = async () => {
    if (!location) {
      showToast({ message: "Please capture your location first", type: "error" });
      return;
    }
    setLoading(true);
    const result = await saveGeoLocationAction({
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: Math.round(location.accuracy),
    });

    if (result.error) {
      showToast({ message: result.error, type: "error" });
      setLoading(false);
      return;
    }

    localStorage.setItem("gl_done", "1");
    await saveLocationCookiesAction({
      latitude: location.latitude,
      longitude: location.longitude,
    });
    setLoading(false);
    setIsRedirect(true);
    showToast({ message: "Location verified successfully", type: "success" });
    router.push("/pan-details");
  };

  return (
    <StepCard
      title="Geo Location"
      subtitle="Capture your current location to verify your presence"
      icon={<MapPin className="w-6 h-6 text-primary" />}
      steper={true}
      className="lg:w-[600px] mx-auto"
      tips={{
        title: "Location Verification",
        description:
          "We need to verify your current location for application processing. Your location data is securely stored and used only for verification purposes.",
        Icon: <Navigation className="w-5 h-5 text-primary" />,
        noteTitle: "Why We Need Your Location",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <PulseDot />
              Verify your physical presence for compliance
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Ensure accurate regional loan processing
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Your location is used only for this verification
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <div className="mt-6 space-y-6">
        {permissionState === "denied" && !location && (
          <div className="flex flex-col items-center py-10">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10
                mb-6"
            >
              <ShieldAlert className="h-12 w-12 text-destructive" />
            </div>
            <h3 className="text-lg font-bold text-text-heading mb-2">Location Access Denied</h3>
            <p className="text-center text-text-muted mb-4 max-w-sm">
              Location access is blocked. Please enable location permissions to continue.
            </p>
            <div
              className="rounded-xl border border-border-light bg-surface p-4 max-w-sm w-full
                text-sm text-text-muted space-y-2"
            >
              <p className="font-semibold text-text-heading">How to enable:</p>
              {isMobile && os === "android" ? (
                <ol className="list-decimal list-inside space-y-1">
                  <li>Open <strong>Settings</strong> on your device</li>
                  <li>Go to <strong>Apps</strong> &gt; <strong>Chrome</strong></li>
                  <li>Tap <strong>Permissions</strong></li>
                  <li>Tap <strong>Location</strong></li>
                  <li>Select <strong>Allow</strong></li>
                  <li>Return here and tap "Try Again" below</li>
                </ol>
              ) : isMobile && os === "ios" ? (
                <ol className="list-decimal list-inside space-y-1">
                  <li>Open <strong>Settings</strong> on your device</li>
                  <li>Scroll down and tap <strong>Safari</strong></li>
                  <li>Tap <strong>Location</strong></li>
                  <li>Select <strong>Allow</strong></li>
                  <li>Return here and tap "Try Again" below</li>
                </ol>
              ) : (
                <ol className="list-decimal list-inside space-y-1">
                  <li>Click the lock/info icon in the address bar</li>
                  <li>Find "Location" permission</li>
                  <li>Change it to "Allow"</li>
                  <li>Refresh the page</li>
                </ol>
              )}
            </div>
            {isMobile && (
              <button
                type="button"
                onClick={openSystemSettings}
                className="mt-3 text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
              >
                Open System Settings
              </button>
            )}
            {error && <p className="mt-4 text-sm text-destructive text-center max-w-sm">{error}</p>}
            <GradientButton
              type="button"
              onClick={() => {
                setPermissionState("prompt");
                useCurrentLocation();
              }}
              disabled={loading}
              className="mt-4 w-full max-w-xs"
            >
              {loading ? "Detecting Location..." : "Try Again"}
            </GradientButton>
          </div>
        )}

        {permissionState === "unavailable" && !location && (
          <div className="flex flex-col items-center py-10">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10
                mb-6"
            >
              <Globe className="h-12 w-12 text-destructive" />
            </div>
            <h3 className="text-lg font-bold text-text-heading mb-2">Geolocation Not Supported</h3>
            <p className="text-center text-text-muted max-w-sm">
              Your browser does not support geolocation. Please use a different browser or device.
            </p>
          </div>
        )}

        {!location && permissionState !== "denied" && permissionState !== "unavailable" && (
          <div className="flex flex-col items-center py-10">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-muted
                mb-6"
            >
              <MapPin className="h-12 w-12 text-primary" />
            </div>
            <p className="text-center text-text-muted mb-6 max-w-sm">
              {permissionState === "granted"
                ? "Detecting your location automatically..."
                : "Click the button below to allow location access and capture your current geographical position."}
            </p>
            <GradientButton
              type="button"
              onClick={useCurrentLocation}
              disabled={loading}
              className="w-full max-w-xs"
            >
              {loading ? "Detecting Location..." : "Detect My Location"}
            </GradientButton>
            {error && <p className="mt-4 text-sm text-destructive text-center max-w-sm">{error}</p>}
          </div>
        )}

        {location && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border-light bg-surface p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-muted">Latitude</span>
                <span className="text-base font-bold text-text-heading">
                  {location.latitude.toFixed(6)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-muted">Longitude</span>
                <span className="text-base font-bold text-text-heading">
                  {location.longitude.toFixed(6)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-muted">Accuracy</span>
                <span className="text-base font-bold text-home-green">
                  ±{Math.round(location.accuracy)}m
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <GradientButton type="button" onClick={handleSubmit} disabled={isRedirect || loading} className="flex-1">
                {isRedirect ? "Redirecting..." : loading ? "Saving..." : "Verify & Continue"}
              </GradientButton>
            </div>
          </div>
        )}
      </div>
    </StepCard>
  );
}

export default GeoLocation;
