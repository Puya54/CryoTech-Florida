"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Home, Building2, Car, ShieldCheck, Award, Clock } from "lucide-react";

const CARDS = [
  { key: "residential", icon: Home, id: "residential" },
  { key: "commercial",  icon: Building2, id: "commercial" },
  { key: "automotive",  icon: Car, id: "automotive" },
];

const TRUST = [
  { icon: ShieldCheck, key: "trust1" },
  { icon: Award,       key: "trust2" },
  { icon: Clock,       key: "trust3" },
];

export default function HeroSection() {
  const t = useTranslations("hero");

  /* ── GSAP refs ── */
  const sectionRef   = useRef<HTMLElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const labelRef     = useRef<HTMLParagraphElement>(null);
  const cardsRef     = useRef<HTMLDivElement>(null);
  const trustRef     = useRef<HTMLDivElement>(null);
  const counterRef   = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let ctx: any;

    (async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* ── 1. ENTRANCE timeline ── */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(badgeRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.65 })
          .fromTo(headlineRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.75 }, "-=0.35")
          .fromTo(subRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .fromTo(labelRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 }, "-=0.2")
          .fromTo(cardsRef.current ? Array.from(cardsRef.current.children) : [],
            { opacity: 0, y: 36, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 }, "-=0.2")
          .fromTo(trustRef.current ? Array.from(trustRef.current.children) : [],
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.2")
          .fromTo(counterRef.current,
            { opacity: 0, scale: 0.88 },
            { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.4)" }, "-=0.3");

        /* ── 2. PARALLAX on scroll ── */
        // Background image moves slower → depth illusion
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Overlay darkens as user scrolls
        gsap.to(overlayRef.current, {
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% top",
            scrub: true,
          },
        });

        // Content floats up on scroll (scrollytelling exit)
        gsap.to([headlineRef.current, subRef.current, badgeRef.current], {
          yPercent: -18,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "40% top",
            end: "bottom top",
            scrub: true,
          },
        });

        /* ── 3. Counter animation (years / customers) ── */
        if (counterRef.current) {
          const nums = counterRef.current.querySelectorAll("[data-count]");
          nums.forEach((el) => {
            const target = parseInt((el as HTMLElement).dataset.count || "0", 10);
            gsap.fromTo(
              el,
              { innerText: 0 },
              {
                innerText: target,
                duration: 2,
                delay: 1,
                ease: "power2.out",
                snap: { innerText: 1 },
                onUpdate() {
                  el.textContent = Math.round(
                    parseFloat((el as HTMLElement).style.cssText.match(/--gsap-innerText:([\d.]+)/)?.[1] ?? "0")
                  ).toString();
                },
              }
            );
          });
        }

        /* ── 4. Floating particles via GSAP (replaces framer-motion ones) ── */
        const particles = sectionRef.current?.querySelectorAll(".hero-particle");
        particles?.forEach((p, i) => {
          gsap.to(p, {
            y: -80,
            opacity: 0,
            rotate: 360,
            duration: 7 + i * 0.5,
            delay: i * 0.6,
            repeat: -1,
            ease: "none",
            repeatDelay: 0,
          });
          gsap.fromTo(p, { opacity: 0 }, { opacity: 0.45, duration: 1, delay: i * 0.6 });
        });
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "72px",
      }}
    >
      {/* ── Background image (GSAP parallax target) ── */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-20% 0",          /* extra vertical room for parallax travel */
          zIndex: 0,
          backgroundImage: "url(/images/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          willChange: "transform",
          imageRendering: "crisp-edges",
          filter: "brightness(1.05) saturate(1.1) contrast(1.02)",
        }}
      />

      {/* ── Dark cinematic overlay ── */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(160deg, rgba(2,8,23,0.78) 0%, rgba(6,15,40,0.65) 35%, rgba(2,28,48,0.72) 65%, rgba(2,8,23,0.82) 100%)",
        }}
      />

      {/* ── Cyan gradient accent (left) ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background:
          "radial-gradient(ellipse 55% 55% at 15% 60%, rgba(6,182,212,0.18) 0%, transparent 70%)," +
          "radial-gradient(ellipse 40% 50% at 85% 20%, rgba(244,63,94,0.12) 0%, transparent 70%)",
      }} />

      {/* ── Subtle grid ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />

      {/* ── Floating snowflake particles ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, overflow: "hidden", pointerEvents: "none" }}>
        {[
          { x: "7%",  y: "75%", size: 22 },
          { x: "18%", y: "55%", size: 14 },
          { x: "33%", y: "80%", size: 18 },
          { x: "50%", y: "70%", size: 12 },
          { x: "67%", y: "78%", size: 20 },
          { x: "80%", y: "60%", size: 16 },
          { x: "91%", y: "72%", size: 13 },
          { x: "44%", y: "88%", size: 10 },
          { x: "60%", y: "82%", size: 17 },
        ].map((p, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              opacity: 0,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
              <path
                d="M12 2v20M2 12h20M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36"
                stroke="rgba(6,182,212,0.75)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="2" fill="rgba(6,182,212,0.5)" />
            </svg>
          </div>
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        className="container"
        style={{
          position: "relative", zIndex: 4,
          textAlign: "center",
          paddingTop: "2.5rem",
          paddingBottom: "4rem",
        }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem", opacity: 0 }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            padding: "0.375rem 1rem",
            background: "rgba(6,182,212,0.15)",
            border: "1px solid rgba(6,182,212,0.4)",
            borderRadius: "999px",
            fontSize: "0.8125rem", fontWeight: 600,
            color: "#38bdf8",
            letterSpacing: "0.04em",
            backdropFilter: "blur(8px)",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M2 12h20M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            {t("badge")}
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          style={{
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "1.25rem",
            opacity: 0,
          }}
        >
          {t("headline").split("\n").map((line, i) =>
            i === 0 ? (
              <span key={i} style={{ color: "white", display: "block" }}>{line}</span>
            ) : (
              <span key={i} style={{
                display: "block",
                background: "linear-gradient(90deg, #06b6d4, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {line}
              </span>
            )
          )}
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{
            fontSize: "1.125rem",
            color: "rgba(255,255,255,0.72)",
            maxWidth: "540px",
            margin: "0 auto 2.75rem",
            lineHeight: 1.65,
            fontWeight: 400,
            opacity: 0,
          }}
        >
          {t("subheadline")}
        </p>

        {/* Select label */}
        <p
          ref={labelRef}
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1rem",
            opacity: 0,
          }}
        >
          {t("selectChannel")}
        </p>

        {/* Channel cards */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "1rem",
            maxWidth: "700px",
            margin: "0 auto 3.5rem",
          }}
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.key}
                id={`hero-card-${card.key}`}
                onClick={() => scrollTo(card.id)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  padding: "1.625rem 1.25rem",
                  cursor: "pointer",
                  textAlign: "center",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                  transition: "border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s",
                  opacity: 0,   /* GSAP will reveal */
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(6,182,212,0.6)";
                  el.style.background  = "rgba(6,182,212,0.12)";
                  el.style.transform   = "translateY(-5px) scale(1.02)";
                  el.style.boxShadow   = "0 12px 32px rgba(6,182,212,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.12)";
                  el.style.background  = "rgba(255,255,255,0.06)";
                  el.style.transform   = "translateY(0) scale(1)";
                  el.style.boxShadow   = "none";
                }}
              >
                <div style={{
                  width: "50px", height: "50px", borderRadius: "14px",
                  background: "rgba(6,182,212,0.18)",
                  border: "1px solid rgba(6,182,212,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={22} color="#38bdf8" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "white", marginBottom: "0.25rem" }}>
                    {t(`${card.key}.title` as "residential.title" | "commercial.title" | "automotive.title")}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>
                    {t(`${card.key}.description` as "residential.description" | "commercial.description" | "automotive.description")}
                  </p>
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#06b6d4" }}>
                  Ver más →
                </span>
              </button>
            );
          })}
        </div>

        {/* Trust badges */}
        <div
          ref={trustRef}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.25rem" }}
        >
          {TRUST.map(({ icon: Icon, key }) => (
            <div
              key={key}
              style={{
                display: "flex", alignItems: "center", gap: "0.375rem",
                opacity: 0,
              }}
            >
              <Icon size={15} color="#06b6d4" />
              <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>
                {t(key as "trust1" | "trust2" | "trust3")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats counter strip ── */}
      <div
        ref={counterRef}
        style={{
          position: "relative", zIndex: 4,
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          padding: "1.25rem 0",
          display: "flex",
          justifyContent: "center",
          gap: "0",
          opacity: 0,
        }}
      >
        {[
          { label: "Años de experiencia", value: "15+" },
          { label: "Clientes atendidos", value: "4,800+" },
          { label: "Respuesta de emergencia", value: "<4h" },
          { label: "Satisfacción garantizada", value: "100%" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 0",
              maxWidth: "220px",
              textAlign: "center",
              padding: "0 1rem",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}
          >
            <div style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #06b6d4, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", fontWeight: 500, marginTop: "2px" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom wave transition ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5 }}>
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none" style={{ width: "100%", height: "70px", display: "block" }}>
          <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
