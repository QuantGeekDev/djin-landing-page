"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui";

function getConsent(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)cookie_consent=([^;]*)/);
  return match ? match[1] : null;
}

function setConsentCookie(value: string) {
  document.cookie = `cookie_consent=${value};max-age=${365 * 24 * 60 * 60};path=/;SameSite=Lax`;
}

function updateConsent(granted: boolean) {
  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === null) {
      setVisible(true);
    } else if (consent === "granted") {
      updateConsent(true);
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    setConsentCookie("granted");
    updateConsent(true);
    setVisible(false);
  };

  const decline = () => {
    setConsentCookie("denied");
    updateConsent(false);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[70] frost rounded-container p-5 animate-fade-up">
      <p className="text-[14px] text-foreground-secondary leading-relaxed font-normal mb-4">
        We use cookies to understand how you use our site and improve your
        experience.
      </p>
      <div className="flex gap-2">
        <Button variant="primary" shape="rect" onClick={accept} className="flex-1 py-2">
          Accept
        </Button>
        <Button variant="secondary" shape="rect" onClick={decline} className="flex-1 py-2">
          Decline
        </Button>
      </div>
    </div>
  );
}
