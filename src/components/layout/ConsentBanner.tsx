"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import s from "./layout.module.scss";

/**
 * Cookie consent and the consent-gated third-party scripts (roadmap T3.08, 07 §10).
 *
 * Nothing from Google Analytics or Tawk.to is requested until the visitor accepts.
 * No choice and "decline" behave the same: essential only. The choice is stored in
 * localStorage (itself strictly necessary, so it needs no consent).
 *
 * Which processors run at all is a business decision (V-15, I-04). To drop one, delete
 * its id here and its entry in the privacy policy.
 */
const GA_ID = "G-WPN816FH63";
const TAWK_SRC = "https://embed.tawk.to/6a103fe562b0761c3d8d5803/1jp7nj6c4";

const KEY = "ac-consent";
const OPEN_EVENT = "ac-consent-open";
type Choice = "granted" | "denied" | "unset" | "loading";

/** Footer control that reopens the banner so a visitor can change their mind. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}

export function ConsentBanner() {
  const [choice, setChoice] = useState<Choice>("loading");
  const [open, setOpen] = useState(false);
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      /* storage blocked: treat as no choice */
    }
    const initial: Choice = saved === "granted" || saved === "denied" ? saved : "unset";
    setChoice(initial);
    setOpen(initial === "unset");
    const reopen = () => {
      setOpen(true);
      requestAnimationFrame(() => banner.current?.focus());
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = (next: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* choice lasts for this page view only */
    }
    // Scripts that already loaded cannot be unloaded: withdrawing consent takes effect on reload.
    if (choice === "granted" && next === "denied") window.location.reload();
    setChoice(next);
    setOpen(false);
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());
            gtag('config','${GA_ID}');
          `}</Script>
          {/* Loaded on first interaction, as before: loading it eagerly caused a layout shift. */}
          <Script id="tawkto" strategy="lazyOnload">{`
            (function(){
              var loaded=false, events=['scroll','pointerdown','keydown','touchstart'];
              function load(){
                if(loaded) return; loaded=true;
                window.Tawk_API=window.Tawk_API||{}; window.Tawk_LoadStart=new Date();
                var s1=document.createElement('script'), s0=document.getElementsByTagName('script')[0];
                s1.async=true; s1.src='${TAWK_SRC}'; s1.charset='UTF-8'; s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                events.forEach(function(e){ window.removeEventListener(e,load); });
              }
              events.forEach(function(e){ window.addEventListener(e,load,{passive:true}); });
            })();
          `}</Script>
        </>
      )}
      {open && (
        <div ref={banner} className={s.consent} role="region" aria-labelledby="consent-title" tabIndex={-1}>
          <h2 id="consent-title">Cookies and chat</h2>
          <p>
            We would like to use Google Analytics to understand how the site is used, and Tawk.to for live chat. Both
            set cookies and send data to those providers. Neither loads unless you accept. See our{" "}
            <Link href="/privacy-policy">privacy policy</Link>.
          </p>
          <div className={s.consentActions}>
            <button type="button" onClick={() => decide("denied")}>
              Essential only
            </button>
            <button type="button" onClick={() => decide("granted")}>
              Accept analytics and chat
            </button>
          </div>
        </div>
      )}
    </>
  );
}
