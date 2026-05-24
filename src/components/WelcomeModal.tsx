"use client";

import { useEffect, useRef, useState } from "react";
import { X, MessageCircle, ArrowRight, Zap, Globe, TrendingUp } from "lucide-react";

const DURATION = 7; // seconds before auto-dismiss

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Mount: small delay then make visible ── */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 900);

    return () => clearTimeout(timeout);
  }, []);

  /* ── Animate in when visible becomes true ── */
  useEffect(() => {
    if (!visible) return;

    (async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.5)" }
      );

      /* Stagger inner children */
      gsap.fromTo(
        cardRef.current?.querySelectorAll(".modal-child") ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    })();
  }, [visible]);

  /* ── Countdown progress ── */
  useEffect(() => {
    if (!visible) return;

    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) dismiss();
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [visible]);

  const dismiss = async () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const { gsap } = await import("gsap");
    gsap.to(cardRef.current, {
      opacity: 0, y: -30, scale: 0.95, duration: 0.35, ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.4, delay: 0.2, ease: "power2.in",
      onComplete: () => setVisible(false),
    });
  };

  if (!visible) return null;

  /* ── SVG circle progress ── */
  const R  = 18;
  const C  = 2 * Math.PI * R;
  const remaining = ((100 - progress) / 100) * C;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(2, 8, 23, 0.82)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => { if (e.target === overlayRef.current) dismiss(); }}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label="Bienvenida — Demo de sitio web profesional"
        style={{
          position: "relative",
          width: "100%", maxWidth: "560px",
          background: "linear-gradient(145deg, rgba(10,20,45,0.97) 0%, rgba(6,18,42,0.99) 100%)",
          border: "1px solid rgba(6,182,212,0.25)",
          borderRadius: "24px",
          padding: "0",
          overflow: "hidden",
          boxShadow:
            "0 0 0 1px rgba(6,182,212,0.1), " +
            "0 24px 64px rgba(2,8,23,0.7), " +
            "0 0 80px rgba(6,182,212,0.1)",
        }}
      >
        {/* ── Top accent bar ── */}
        <div style={{
          height: "3px",
          background: "linear-gradient(90deg, #06b6d4 0%, #f43f5e 50%, #06b6d4 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2.5s linear infinite",
        }} />

        {/* ── Header ── */}
        <div style={{
          padding: "1.75rem 2rem 0",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        }}>
          {/* Agency badge */}
          <div className="modal-child" style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            padding: "0.3rem 0.875rem",
            background: "rgba(6,182,212,0.12)",
            border: "1px solid rgba(6,182,212,0.3)",
            borderRadius: "999px",
            fontSize: "0.72rem", fontWeight: 700,
            color: "#38bdf8", letterSpacing: "0.08em",
          }}>
            <Globe size={10} /> DEMO — SITIO WEB PROFESIONAL
          </div>

          {/* Close + countdown */}
          <button
            onClick={dismiss}
            aria-label="Cerrar"
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px",
              color: "rgba(255,255,255,0.4)",
              flexShrink: 0, marginLeft: "0.75rem",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="22" cy="22" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
              <circle
                cx="22" cy="22" r={R}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray={C}
                strokeDashoffset={remaining}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />
            </svg>
            <X size={18} style={{ position: "absolute", color: "rgba(255,255,255,0.5)" }} />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "1.25rem 2rem 2rem" }}>

          {/* Headline */}
          <h2 className="modal-child" style={{
            fontSize: "clamp(1.6rem, 4vw, 2.1rem)",
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            marginBottom: "0.75rem",
            color: "white",
          }}>
            ¡Así puede ser{" "}
            <span style={{
              background: "linear-gradient(90deg, #06b6d4, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              tu sitio web!
            </span>
          </h2>

          {/* Sub */}
          <p className="modal-child" style={{
            fontSize: "0.9375rem",
            color: "rgba(255,255,255,0.58)",
            lineHeight: 1.65,
            marginBottom: "1.5rem",
          }}>
            Lo que estás viendo es una demo real — diseño premium, velocidad máxima,
            optimizado para Google y para IA. Hacemos sitios web que{" "}
            <strong style={{ color: "rgba(255,255,255,0.85)" }}>generan clientes</strong>, no solo se ven bonitos.
          </p>

          {/* Feature pills */}
          <div className="modal-child" style={{
            display: "flex", flexWrap: "wrap", gap: "0.5rem",
            marginBottom: "1.75rem",
          }}>
            {[
              { icon: Zap,        label: "Listo en 7 días" },
              { icon: TrendingUp, label: "SEO incluido" },
              { icon: Globe,      label: "Bilingüe EN/ES" },
              { icon: MessageCircle, label: "ChatBot con IA" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} style={{
                display: "inline-flex", alignItems: "center", gap: "0.3rem",
                padding: "0.3rem 0.75rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "999px",
                fontSize: "0.78rem", fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
              }}>
                <Icon size={11} color="#06b6d4" />
                {label}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="modal-child" style={{
            display: "flex", flexDirection: "column", gap: "0.75rem",
          }}>
            {/* Primary — WhatsApp */}
            <a
              href="https://wa.me/13055550100?text=Hola!%20Vi%20la%20demo%20de%20CryoTech%20y%20me%20gustaría%20más%20información%20sobre%20mi%20sitio%20web."
              target="_blank"
              rel="noopener noreferrer"
              id="modal-whatsapp-cta"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.625rem",
                padding: "1rem 1.5rem",
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                borderRadius: "14px",
                color: "white", fontWeight: 800, fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(6,182,212,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(6,182,212,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(6,182,212,0.4)";
              }}
            >
              <MessageCircle size={20} />
              Quiero mi sitio web — Hablar por WhatsApp
              <ArrowRight size={18} />
            </a>

            {/* Secondary — Email */}
            <a
              href="mailto:info@cryotechflorida.com?subject=Consulta%20sobre%20sitio%20web%20profesional&body=Hola!%20Vi%20la%20demo%20y%20me%20gustaría%20más%20información."
              id="modal-email-cta"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                padding: "0.875rem 1.5rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "14px",
                color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "0.9rem",
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              Solicitar cotización por email — Sin compromiso
            </a>
          </div>

          {/* Trust line */}
          <p className="modal-child" style={{
            textAlign: "center",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.3)",
            marginTop: "1rem",
          }}>
            🔒 Sin spam · Respuesta en menos de 24h · Consulta 100% gratuita
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
