"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ShieldAlert, MapPin, Navigation, Lightbulb } from "lucide-react";
import { saveLocationCookiesAction } from "@/lib/actions/verification.action";
import GradientButton from "@/components/ui/GradientButton";
import StepCard from "@/views/Dashbaord/componants/StepCard";

function GeoLocationGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const skipPaths = ["/geo-location", "/profile", "/track-application"];
  if (skipPaths.some((p) => pathname.startsWith(p))) return <>{children}</>;

  const [blocked, setBlocked] = useState(false);

  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  });

  const [os, setOs] = useState<"android" | "ios" | "other">("other");
  const [browserPkg, setBrowserPkg] = useState("com.android.chrome");

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

  const tryGetPosition = useCallback(
    (onSuccess?: () => void) => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setBlocked(false);
          saveLocationCookiesAction({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          onSuccess?.();
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) setBlocked(true);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 120000 },
      );
    },
    [],
  );

  const checkLocation = useCallback(() => {
    if (typeof window === "undefined") return;
    const done = localStorage.getItem("gl_done");
    if (done !== "1") return;
    if (!navigator.geolocation) return;

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((perm) => {
          if (perm.state === "denied") {
            setBlocked(true);
            return;
          }
          if (perm.state === "granted") {
            tryGetPosition();
            return;
          }
        })
        .catch(() => tryGetPosition());
    } else {
      tryGetPosition();
    }
  }, [tryGetPosition]);

  useEffect(() => {
    checkLocation();
    const interval = setInterval(checkLocation, 30000);
    document.addEventListener("visibilitychange", checkLocation);
    window.addEventListener("pageshow", checkLocation);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", checkLocation);
      window.removeEventListener("pageshow", checkLocation);
    };
  }, [checkLocation]);

  if (blocked) {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background p-4">
        <StepCard
          title="Geo Location Required"
          subtitle="Location access was turned off — please re-enable it to continue"
          icon={<MapPin className="w-6 h-6 text-primary" />}
          steper={false}
          className="lg:w-[600px] mx-auto"
          tips={{
            title: "Why Location Must Stay On",
            description:
              "Your location is verified throughout the application process. If you turn it off, we cannot process your application.",
            Icon: <Navigation className="w-5 h-5 text-primary" />,
            noteTitle: "Re-enable Location",
            noteDescription:
              "Follow the steps below to turn location back on, then tap Re-check.",
            NoteIcon: Lightbulb,
          }}
        >
          <div className="flex flex-col items-center pt-4 gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <ShieldAlert className="h-10 w-10 text-destructive" />
            </div>
            <p className="text-center text-text-muted text-sm max-w-sm">
              Location permission was revoked. It must be enabled for the application to proceed.
            </p>

            <div className="rounded-xl border border-border-light bg-surface p-4 w-full text-sm text-text-muted space-y-2">
              <p className="font-semibold text-text-heading">How to enable:</p>
              {isMobile && os === "android" ? (
                <ol className="list-decimal list-inside space-y-1">
                  <li>Open <strong>Settings</strong> on your device</li>
                  <li>Go to <strong>Apps</strong> &gt; <strong>Chrome</strong></li>
                  <li>Tap <strong>Permissions</strong></li>
                  <li>Tap <strong>Location</strong></li>
                  <li>Select <strong>Allow</strong></li>
                  <li>Return here and tap <strong>Re-check</strong></li>
                </ol>
              ) : isMobile && os === "ios" ? (
                <ol className="list-decimal list-inside space-y-1">
                  <li>Open <strong>Settings</strong> on your device</li>
                  <li>Scroll down and tap <strong>Safari</strong></li>
                  <li>Tap <strong>Location</strong></li>
                  <li>Select <strong>Allow</strong></li>
                  <li>Return here and tap <strong>Re-check</strong></li>
                </ol>
              ) : (
                <ol className="list-decimal list-inside space-y-1">
                  <li>Click the lock/info icon in the address bar</li>
                  <li>Find "Location" permission</li>
                  <li>Change it to <strong>Allow</strong></li>
                  <li>Tap <strong>Re-check</strong> below</li>
                </ol>
              )}
            </div>

            {isMobile && (
              <button
                type="button"
                onClick={openSystemSettings}
                className="text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
              >
                Open System Settings
              </button>
            )}
            <GradientButton
              type="button"
              onClick={checkLocation}
              className="w-full max-w-xs"
            >
              Re-check Location
            </GradientButton>
          </div>
        </StepCard>
      </div>
    );
  }

  return <>{children}</>;
}

export default GeoLocationGuard;
