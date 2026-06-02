"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ShieldAlert, MapPin, Navigation, Lightbulb } from "lucide-react";
import { saveLocationCookiesAction } from "@/lib/actions/verification.action";
import { callSecure } from "@/lib/secure-action";
import GradientButton from "@/components/ui/GradientButton";
import StepCard from "@/views/Dashbaord/componants/StepCard";
import { getLocationGuard } from "@/lib/location-guard";

function GeoLocationGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const skipPaths = ["/geo-location", "/profile", "/track-application"];
  const shouldSkip = skipPaths.some((p) => pathname.startsWith(p));

  const [blocked, setBlocked] = useState(false);
  const [location, setLocation] = useState<{ region: string; city: string; country: string } | null>(null);

  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  });

  useEffect(() => {
    if (blocked) return;

    let ipLocation: { city: string; country: string; region: string } | null = null;

    getLocationGuard()
      .then((loc) => {
        console.log("Location guard result:", loc);
        setLocation(loc);
        ipLocation = loc;
      })
      .catch(() => {
        console.log("Failed to get IP geolocation");
      })
      .finally(() => {
        callSecure(saveLocationCookiesAction, {
          latitude: 0,
          longitude: 0,
          city: ipLocation?.city || "",
          country: ipLocation?.country || "",
          region: ipLocation?.region || "",
        });
        tryGetPosition();
      });
  }, [blocked])
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
      window.location.href = "App-Prefs:root=Privacy&path=LOCATION";
    }
  };

  const tryGetPosition = useCallback((onSuccess?: () => void) => {
    if (!navigator.geolocation) {
      setBlocked(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setBlocked(false);
        callSecure(saveLocationCookiesAction, {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          city: location?.city || "",
          country: location?.country || "",
          region: location?.region || "",
        });
        onSuccess?.();
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setBlocked(true);
        } else {
          setBlocked(false);
        }
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 120000 },
    );
  }, [setBlocked]);

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
          if (perm.state === "prompt") {
            tryGetPosition();
            return;
          }
        })
        .catch(() => tryGetPosition());
    } else {
      tryGetPosition();
    }
  }, [tryGetPosition, setBlocked]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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



  if (shouldSkip) return <>{children}</>;

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
            noteDescription: "Follow the steps below to turn location back on, then tap Re-check.",
            NoteIcon: Lightbulb,
          }}
        >
          <div className="flex flex-col items-center pt-4 gap-4">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10"
            >
              <ShieldAlert className="h-10 w-10 text-destructive" />
            </div>
            <p className="text-center text-text-muted text-sm max-w-sm">
              Location permission was revoked. It must be enabled for the application to proceed.
            </p>

            <div
              className="rounded-xl border border-border-light bg-surface p-4 w-full text-sm
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
                    Tap <strong>Location</strong>
                  </li>
                  <li>
                    Select <strong>Allow</strong>
                  </li>
                  <li>
                    Return here and tap <strong>Re-check</strong>
                  </li>
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
                    Tap <strong>Location</strong>
                  </li>
                  <li>
                    Select <strong>Allow</strong>
                  </li>
                  <li>
                    Return here and tap <strong>Re-check</strong>
                  </li>
                </ol>
              ) : (
                <ol className="list-decimal list-inside space-y-1">
                  <li>Click the lock/info icon in the address bar</li>
                  <li>Find "Location" permission</li>
                  <li>
                    Change it to <strong>Allow</strong>
                  </li>
                  <li>
                    Tap <strong>Re-check</strong> below
                  </li>
                </ol>
              )}
            </div>

            {isMobile && (
              <button
                type="button"
                onClick={openSystemSettings}
                className="text-sm font-semibold text-primary underline underline-offset-2
                  hover:text-primary/80"
              >
                Open System Settings
              </button>
            )}
            <GradientButton type="button" onClick={checkLocation} className="w-full max-w-xs">
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
