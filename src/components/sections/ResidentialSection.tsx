"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Wrench, Settings, Zap, Wind, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/utils";
import SmartForm from "@/components/forms/SmartForm";

const SERVICES = [
  { key: "repair", icon: Wrench },
  { key: "maintenance", icon: Settings },
  { key: "installation", icon: Zap },
  { key: "airQuality", icon: Wind },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function ResidentialSection() {
  const t = useTranslations("residential");
  const locale = useLocale();
  const waUrl = getWhatsAppUrl(siteConfig.whatsapp.number,
    locale === "es" ? siteConfig.whatsapp.messageEs : siteConfig.whatsapp.messageEn);

  return (
    <section id="residential" style={{ background: "white", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.span
            className="badge"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {t("sectionBadge")}
          </motion.span>
          <motion.h2
            className="text-headline"
            style={{ marginTop: "1rem", marginBottom: "0.75rem" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            className="text-subheadline"
            style={{ maxWidth: "500px", margin: "0 auto" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("subheadline")}
          </motion.p>
        </div>

        {/* Main Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "start" }} className="res-grid">
          {/* Left: Services + CTAs */}
          <div>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{
                width: "100%", height: "240px", borderRadius: "16px", marginBottom: "2rem",
                backgroundImage: "url(/images/residential.png)", backgroundSize: "cover", backgroundPosition: "center",
                boxShadow: "var(--shadow-md)"
              }}
            />
            <div className="grid-2" style={{ marginBottom: "2.5rem" }}>
              {SERVICES.map(({ key, icon: Icon }, i) => (
                <motion.div
                  key={key}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="card"
                  style={{ padding: "1.5rem" }}
                >
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: "var(--color-cyan-glow)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "0.875rem",
                  }}>
                    <Icon size={22} color="var(--color-cyan)" />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.375rem" }}>
                    {t(`services.${key}.title` as "services.repair.title" | "services.maintenance.title" | "services.installation.title" | "services.airQuality.title")}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-ink-muted)", lineHeight: 1.5 }}>
                    {t(`services.${key}.description` as "services.repair.description" | "services.maintenance.description" | "services.installation.description" | "services.airQuality.description")}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
            >
              <a
                href={siteConfig.phone.href}
                id="res-emergency-cta"
                className="btn btn-primary btn-lg animate-pulse-glow"
              >
                <Phone size={18} />
                {t("emergencyCta")}
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="res-whatsapp-cta"
                className="btn btn-outline btn-lg"
                style={{ borderColor: "#25d366", color: "#25d366" }}
              >
                <MessageCircle size={18} />
                {t("whatsappCta")}
              </a>
            </motion.div>
          </div>

          {/* Right: Smart Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SmartForm defaultService="residential" />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .res-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
