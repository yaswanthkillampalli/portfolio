"use client";

import { useEffect } from "react";

export function PageVisitTracker() {
  useEffect(() => {
    const webhookUrl = process.env.NEXT_PUBLIC_VISIT_WEBHOOK_URL;

    if (!webhookUrl) {
      return;
    }

    const sendWebhook = async () => {
      try {
        const uaData = (navigator as Navigator & { userAgentData?: { brands?: Array<{ brand: string; version: string }>; mobile?: boolean; platform?: string } }).userAgentData;

        const payload = {
          event: "page_visit",
          timestamp: new Date().toISOString(),
          page: {
            url: window.location.href,
            path: window.location.pathname,
            referrer: document.referrer || null,
            title: document.title,
          },
          browser: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            online: navigator.onLine,
            doNotTrack: navigator.doNotTrack ?? null,
            uaData: uaData
              ? {
                  brands: uaData.brands ?? [],
                  mobile: uaData.mobile ?? null,
                  platform: uaData.platform ?? null,
                }
              : null,
          },
          device: {
            screen: {
              width: window.screen.width,
              height: window.screen.height,
              availWidth: window.screen.availWidth,
              availHeight: window.screen.availHeight,
              pixelRatio: window.devicePixelRatio,
            },
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        };

        const body = JSON.stringify(payload);

        if (navigator.sendBeacon) {
          const blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
          navigator.sendBeacon(webhookUrl, blob);
          return;
        }

        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          keepalive: true,
          headers: {
            "Content-Type": "text/plain;charset=UTF-8",
          },
          body,
        });
      } catch {
      }
    };

    sendWebhook();
  }, []);

  return null;
}
