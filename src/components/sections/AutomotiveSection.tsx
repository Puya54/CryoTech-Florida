"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { RefreshCw, Cog, Search, Gauge, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";
import SmartForm from "@/components/forms/SmartForm";

const SERVICES = [
  { key: "recharge", icon: RefreshCw, step: "01" },
  { key: "compressor", icon: Cog, step: "02" },
  { key: "leak", icon: Search, step: "03" },
  { key: "diagnosis", icon: Gauge, step: "04" },
];

type ServiceKey = "recharge" | "compressor" | "leak" | "diagnosis";

export default function AutomotiveSection() {
  const t = useTranslations("automotive");

  const mapsUrl = siteConfig.googleMapsKey
    ? `https://www.google.com/maps/embed/v1/place?key=${siteConfig.googleMapsKey}&q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}&zoom=14`
    : `https://maps.google.com/maps?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}&z=14&output=embed`;

  return (
    <section id="automotive" style={{ background: "white", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.span className="badge" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {t("sectionBadge")}
          </motion.span>
          <motion.h2
            className="text-headline"
            style={{ marginTop: "1rem", marginBottom: "0.75rem", whiteSpace: "pre-line" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            className="text-subheadline"
            style={{ maxWidth: "500px", margin: "0 auto" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            {t("subheadline")}
          </motion.p>
        </div>

        {/* Services — process steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem", marginBottom: "4rem" }} className="auto-services-grid">
          {SERVICES.map(({ key, icon: Icon, step }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{
                padding: "1.5rem", borderRadius: "16px",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-soft)",
                position: "relative", overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
              }}
              whileHover={{ y: -3, boxShadow: "var(--shadow-md)" }}
            >
              <span style={{
                position: "absolute", top: "1rem", right: "1rem",
                fontSize: "2.5rem", fontWeight: 800,
                color: "var(--color-cyan-glow)",
                lineHeight: 1,
              }}>
                {step}
              </span>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: "var(--color-cyan-glow)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "0.875rem",
              }}>
                <Icon size={22} color="var(--color-cyan)" />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.375rem" }}>
                {t(`services.${key}.title` as `services.${ServiceKey}.title`)}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-ink-muted)", lineHeight: 1.5 }}>
                {t(`services.${key}.description` as `services.${ServiceKey}.description`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Map + Form */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "start" }} className="auto-grid">
          {/* Map & Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Image */}
            <div
              style={{
                width: "100%", height: "240px", borderRadius: "16px", marginBottom: "2rem",
                backgroundImage: "url(/images/auto.png)", backgroundSize: "cover", backgroundPosition: "center",
                boxShadow: "var(--shadow-md)"
              }}
            />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.375rem" }}>
              {t("mapTitle")}
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-ink-muted)", marginBottom: "1.25rem" }}>
              {t("mapSubtitle")}
            </p>
            <div style={{
              borderRadius: "16px", overflow: "hidden",
              border: "1px solid var(--color-border)",
              height: "340px", position: "relative",
              boxShadow: "var(--shadow-md)",
            }}>
              <iframe
                src={mapsUrl}
                width="100%"
                height="100%"
                style={{ border: "none", display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CryoTech Florida Location"
              />
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              id="auto-directions-btn"
              className="btn btn-outline"
              style={{ marginTop: "1rem", display: "inline-flex" }}
            >
              <Navigation size={16} />
              {t("directionsBtn")}
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SmartForm defaultService="automotive" />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .auto-services-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (min-width: 1024px) { .auto-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
