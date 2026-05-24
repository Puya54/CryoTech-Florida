"use client";

import { useEffect, useRef, useState } from "react";
import { X, ArrowRight, MessageCircle } from "lucide-react";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown]     = useState(false); // only once per session
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      /* Trigger when cursor exits toward the top of the page */
      if (e.clientY <= 8 && !shown) {
        setShown(true);
        setVisible(true);
      }
    };

    /* Small delay so it doesn't fire on first accidental mouse movement */
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shown]);

  /* GSAP entrance */
  useEffect(() => {
    if (!visible) return;
    (async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(overlayRef.current,
        { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.85, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" });
      gsap.fromTo(
        cardRef.current?.querySelectorAll(".ei-child") ?? [],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, delay: 0.25, ease: "power2.out" }
      );
    })();
  }, [visible]);

  const dismiss = async () => {
    const { gsap } = await import("gsap");
    gsap.to(cardRef.current,   { opacity: 0, scale: 0.9, y: -20, duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current,{ opacity: 0, duration: 0.35, delay: 0.15, onComplete: () => setVisible(false) });
  };

  if (!visible) return null;

  const waMessage = encodeURIComponent(
    "¡Hola! Estaba en la demo del sitio web y me gustaría saber más antes de irme. ¿Pueden ayudarme?"
  );

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed", inset: 0, zIndex: 9995,
        background: "rgba(2,8,23,0.78)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => { if (e.target === overlayRef.current) dismiss(); }}
    >
      <div
        ref={cardRef}
        style={{
          position: "relative",
          width: "100%", maxWidth: "480px",
          background: "linear-gradient(145deg, #0d1b2e 0%, #071525 100%)",
          border: "1px solid rgba(244,63,94,0.3)",
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(244,63,94,0.1), 0 24px 64px rgba(2,8,23,0.8)",
        }}
      >
        {/* Top accent — pink/red urgency */}
        <div style={{
          height: "3px",
          background: "linear-gradient(90deg, #f43f5e, #f97316, #f43f5e)",
          backgroundSize: "200%",
          animation: "ei-shimmer 2s linear infinite",
        }} />

        <div style={{ padding: "1.75rem 2rem 2rem" }}>
          {/* Close */}
          <button
            onClick={dismiss}
            aria-label="Cerrar"
            style={{
              position: "absolute", top: "1rem", right: "1rem",
              background: "rgba(255,255,255,0.07)", border: "none",
              borderRadius: "8px", color: "rgba(255,255,255,0.5)",
              cursor: "pointer", padding: "0.375rem",
              display: "flex", alignItems: "center",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.14)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <X size={18} />
          </button>

          {/* Emoji hook */}
          <div className="ei-child" style={{ fontSize: "2.5rem", marginBottom: "0.75rem", lineHeight: 1 }}>
            ✋
          </div>

          {/* Headline */}
          <h2 className="ei-child" style={{
            fontSize: "clamp(1.4rem, 3.5vw, 1.85rem)",
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            color: "white",
            marginBottom: "0.75rem",
          }}>
            ¡Espera! Tu competencia{" "}
            <span style={{
              background: "linear-gradient(90deg, #f43f5e, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              ya está online.
            </span>
          </h2>

          {/* Body */}
          <p className="ei-child" style={{
            fontSize: "0.9375rem",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.65,
            marginBottom: "1.5rem",
          }}>
            Cada día sin sitio web profesional son{" "}
            <strong style={{ color: "rgba(255,255,255,0.9)" }}>clientes que se van a otro negocio.</strong>{" "}
            Hablemos ahora — la consulta es completamente gratuita.
          </p>

          {/* Social proof */}
          <div className="ei-child" style={{
            display: "flex", alignItems: "center", gap: "0.625rem",
            padding: "0.625rem 0.875rem",
            background: "rgba(244,63,94,0.08)",
            border: "1px solid rgba(244,63,94,0.2)",
            borderRadius: "10px",
            marginBottom: "1.5rem",
          }}>
            <div style={{ display: "flex" }}>
              {["🟢","🟢","🟢"].map((_, i) => (
                <div key={i} style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: `hsl(${180 + i * 30}, 60%, 50%)`,
                  border: "2px solid #0d1b2e",
                  marginLeft: i > 0 ? "-8px" : 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem",
                }}>
                  {["A","B","C"][i]}
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", margin: 0 }}>
              <strong style={{ color: "white" }}>14 negocios</strong> solicitaron su sitio web este mes
            </p>
          </div>

          {/* CTAs */}
          <div className="ei-child" style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            <a
              href={`https://wa.me/13055550100?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              id="exit-intent-whatsapp"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                padding: "0.875rem 1.5rem",
                background: "linear-gradient(135deg, #f43f5e, #f97316)",
                borderRadius: "12px",
                color: "white", fontWeight: 800, fontSize: "0.9375rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(244,63,94,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(244,63,94,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(244,63,94,0.4)";
              }}
            >
              <MessageCircle size={18} />
              Hablar con un experto — Es gratis
              <ArrowRight size={16} />
            </a>

            <button
              onClick={dismiss}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.8rem", color: "rgba(255,255,255,0.3)",
                padding: "0.375rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              No, prefiero perder clientes →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ei-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
