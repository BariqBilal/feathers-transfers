"use client";

import { messaging } from "@/lib/firebaseClient";
import { getToken, onMessage, Messaging } from "firebase/messaging";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function useFCM(adminEmail: string) {
  useEffect(() => {
    if (!messaging) {
      console.warn("⚠️ FCM not available (probably SSR or service worker not registered)");
      return;
    }

    const m = messaging as Messaging; // ✅ type narrowing

    async function initFCM() {
      try {
        await navigator.serviceWorker.register("/firebase-messaging-sw.js");

        const token = await getToken(m, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
        });

        if (token) {
          console.log("✅ Admin FCM Token:", token);

          await fetch("https://devsquare-apis.vercel.app/api/transfers/save-fcm-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: adminEmail, token }),
          });
        }
      } catch (err) {
        console.error("❌ FCM setup error:", err);
      }
    }

    initFCM();

    onMessage(m, (payload) => {
      toast(`${payload.notification?.title}: ${payload.notification?.body}`);
    });
  }, [adminEmail]);
}
