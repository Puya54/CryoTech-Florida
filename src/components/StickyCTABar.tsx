"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  /* Show after scrolling 400px */
  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed && window.scrollY > 400) setVisible(true);
      else if (window.scrollY <= 400) setVisible(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  /* GSAP slide-down */
  useEffect(() => {
    if (!barRef.current) return;
    (async () => {
      const { gsap } = await import("gsap");
      if (visible) {
        gsap.to(barRef.current, {
          y: 0, opacity: 1, duration: 0.4, ease: "power3.out",
        });
      } else {
        gsap.to(barRef.current, {
          y: -60, opacity: 0, duration: 0.3, ease: "power2.in",
        });
      }
    })();
  }, [visible]);

  const dismiss = async () => {
    setDismissed(true);
    setVisible(false);
    const { gsap } = await import("gsap");
    gsap.to(barRef.current, { y: -60, opacity: 0, duration: 0.3 });
  };

  const message = encodeURIComponent(
    "¡Hola! Vi su demo web y me gustaría cotizar un sitio web profesional para mi negocio."
  );

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9980,
        background: "linear-gradient(90deg, #0f172a 0%, #0c2340 50%, #0f172a 100%)",
        borderBottom: "1px solid rgba(6,182,212,0.3)",
        padding: "0.625rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        flexWrap: "wrap",
        transform: "translateY(-60px)",
        opacity: 0,
      }}
    >
      {/* Shimmer accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(90deg, transparent, #06b6d4, #f43f5e, #06b6d4, transparent)",
        backgroundSize: "200% 100%",
        animation: "bar-shimmer 2.5s linear infinite",
      }} />

      <p style={{
        fontSize: "0.875rem",
        color: "rgba(255,255,255,0.85)",
        fontWeight: 500,
        margin: 0,
      }}>
        🚀 <strong style={{ color: "white" }}>¿Te gustó este sitio web?</strong>{" "}
        <span style={{ color: "rgba(255,255,255,0.6)" }}>El tuyo puede verse exactamente así.</span>
      </p>

      <a
        href={`https://wa.me/13055550100?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        id="sticky-bar-cta"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.375rem 1rem",
          background: "linear-gradient(135deg, #06b6d4, #0891b2)",
          borderRadius: "999px",
          color: "white",
          fontWeight: 700,
          fontSize: "0.8125rem",
          textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 12px rgba(6,182,212,0.35)",
          transition: "transform 0.2s, box-shadow 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(6,182,212,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 12px rgba(6,182,212,0.35)";
        }}
      >
        Quiero mi sitio → Cotizar gratis
      </a>

      <button
        onClick={dismiss}
        aria-label="Cerrar barra"
        style={{
          position: "absolute",
          right: "0.75rem",
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.4)",
          cursor: "pointer",
          padding: "0.25rem",
          display: "flex",
          alignItems: "center",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
      >
        <X size={16} />
      </button>

      <style>{`
        @keyframes bar-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
