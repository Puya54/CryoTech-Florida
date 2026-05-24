"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MessageSquare, Microscope, Hammer, BadgeCheck } from "lucide-react";

const STEPS = [
  { key: "contact", icon: MessageSquare, num: "01" },
  { key: "diagnosis", icon: Microscope, num: "02" },
  { key: "repair", icon: Hammer, num: "03" },
  { key: "guarantee", icon: BadgeCheck, num: "04" },
];

type StepKey = "contact" | "diagnosis" | "repair" | "guarantee";

const CERTS = [
  { label: "EPA 608", sub: "Certified" },
  { label: "NATE", sub: "Certified Technicians" },
  { label: "ACCA", sub: "Member" },
  { label: "Miami-Dade", sub: "Licensed & Insured" },
];

export default function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section id="process" style={{ background: "var(--color-ink)", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
      {/* Background pattern */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `radial-gradient(ellipse at 10% 50%, rgba(6,182,212,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 30%, rgba(56,189,248,0.06) 0%, transparent 50%)`,
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              padding: "0.375rem 0.875rem",
              background: "rgba(6,182,212,0.15)",
              color: "var(--color-cyan)",
              border: "1px solid rgba(6,182,212,0.3)",
              borderRadius: "999px",
              fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
            }}
          >
            {t("sectionBadge")}
          </motion.span>
          <motion.h2
            className="text-headline"
            style={{ marginTop: "1rem", marginBottom: "0.75rem", color: "white" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.6)", maxWidth: "500px", margin: "0 auto" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            {t("subheadline")}
          </motion.p>
        </div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", marginBottom: "4rem" }} className="process-grid">
          {STEPS.map(({ key, icon: Icon, num }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s, background 0.2s",
              }}
              whileHover={{ borderColor: "rgba(6,182,212,0.4)", backgroundColor: "rgba(6,182,212,0.05)" } as Parameters<typeof motion.div>[0]["whileHover"]}
            >
              <span style={{
                position: "absolute", top: "1rem", right: "1.5rem",
                fontSize: "4rem", fontWeight: 900, lineHeight: 1,
                color: "rgba(6,182,212,0.08)",
              }}>{num}</span>
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: "rgba(6,182,212,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1rem",
              }}>
                <Icon size={24} color="var(--color-cyan)" />
              </div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
                {t(`steps.${key}.title` as `steps.${StepKey}.title`)}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                {t(`steps.${key}.description` as `steps.${StepKey}.description`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            {t("certTitle")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            {CERTS.map((cert) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "1rem", fontWeight: 800, color: "var(--color-cyan)", marginBottom: "0.125rem" }}>{cert.label}</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>{cert.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { .process-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { .process-grid { grid-template-columns: repeat(4, 1fr) !important; } }
      `}</style>
    </section>
  );
}
