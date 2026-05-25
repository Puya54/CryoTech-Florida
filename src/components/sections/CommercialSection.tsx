"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Thermometer, Snowflake, FileText, Siren, Users, Clock, TrendingUp, Calendar,
  Send, CheckCircle, Loader2,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const SERVICES = [
  { key: "hvac", icon: Thermometer },
  { key: "walkin", icon: Snowflake },
  { key: "contracts", icon: FileText },
  { key: "emergency", icon: Siren },
];

const rfpSchema = z.object({
  company: z.string().min(2),
  contact: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  facilityType: z.string().min(1),
  description: z.string().min(20),
});
type RFPData = z.infer<typeof rfpSchema>;

const FACILITY_KEYS = ["facilityRestaurant","facilityOffice","facilityWarehouse","facilityRetail","facilityHotel","facilityOther"] as const;

export default function CommercialSection() {
  const t = useTranslations("commercial");
  const rfp = useTranslations("rfp");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RFPData>({
    resolver: zodResolver(rfpSchema),
  });

  const onSubmit = async (data: RFPData) => {
    setLoading(true);
    const payload = { ...data, type: "rfp", timestamp: new Date().toISOString() };
    try {
      await fetch("/api/contact", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload) 
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const STATS = [
    { icon: Users, key: "clients" },
    { icon: Clock, key: "response" },
    { icon: TrendingUp, key: "uptime" },
    { icon: Calendar, key: "years" },
  ] as const;

  return (
    <section id="commercial" style={{ background: "var(--color-bg-soft)", paddingTop: "5rem", paddingBottom: "5rem" }}>
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
            style={{ maxWidth: "520px", margin: "0 auto" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            {t("subheadline")}
          </motion.p>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px",
            background: "var(--color-border)", borderRadius: "16px", overflow: "hidden",
            marginBottom: "3.5rem",
            border: "1px solid var(--color-border)",
          }}
          className="stats-grid"
        >
          {STATS.map(({ icon: Icon, key }) => (
            <div key={key} style={{ background: "white", padding: "1.5rem", textAlign: "center" }}>
              <Icon size={24} color="var(--color-cyan)" style={{ margin: "0 auto 0.5rem" }} />
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)" }}>
                {t(`stats.${key}` as "stats.clients" | "stats.response" | "stats.uptime" | "stats.years")}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "start" }} className="comm-grid">
          {/* Services */}
          <div>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{
                width: "100%", height: "240px", borderRadius: "16px", marginBottom: "2rem",
                backgroundImage: "url(/images/commercial.png)", backgroundSize: "cover", backgroundPosition: "center",
                boxShadow: "var(--shadow-md)"
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "0" }}>
              {SERVICES.map(({ key, icon: Icon }, i) => (
                <motion.div
                  key={key}
                  custom={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  style={{
                    display: "flex", gap: "1rem", padding: "1.25rem",
                    background: "white", borderRadius: "14px",
                    border: "1px solid var(--color-border)",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onHoverStart={(e) => {
                    const parent = (e.target as HTMLElement).closest("div[style]");
                    if (parent) {
                      (parent as HTMLElement).style.setProperty("border-color", "var(--color-cyan)");
                    }
                  }}
                >
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: "var(--color-cyan-glow)", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={22} color="var(--color-cyan)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.25rem" }}>
                      {t(`services.${key}.title` as "services.hvac.title" | "services.walkin.title" | "services.contracts.title" | "services.emergency.title")}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-ink-muted)", lineHeight: 1.5 }}>
                      {t(`services.${key}.description` as "services.hvac.description" | "services.walkin.description" | "services.contracts.description" | "services.emergency.description")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RFP Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="form-card"
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <CheckCircle size={48} color="var(--color-cyan)" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.5rem" }}>
                  {rfp("success").split("!")[0]}!
                </h3>
                <p style={{ color: "var(--color-ink-muted)" }}>{rfp("success")}</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.25rem" }}>
                  {t("rfpTitle")}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-ink-muted)", marginBottom: "1.5rem" }}>
                  {t("rfpSubtitle")}
                </p>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  <div className="form-row-grid">
                    <div>
                      <label className="form-label" htmlFor="rfp-company">{rfp("company")}</label>
                      <input id="rfp-company" type="text" className={`form-input ${errors.company ? "error" : ""}`} {...register("company")} />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="rfp-contact">{rfp("contact")}</label>
                      <input id="rfp-contact" type="text" className={`form-input ${errors.contact ? "error" : ""}`} {...register("contact")} />
                    </div>
                  </div>
                  <div className="form-row-grid">
                    <div>
                      <label className="form-label" htmlFor="rfp-phone">{rfp("phone")}</label>
                      <input id="rfp-phone" type="tel" className={`form-input ${errors.phone ? "error" : ""}`} {...register("phone")} />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="rfp-email">{rfp("email")}</label>
                      <input id="rfp-email" type="email" className={`form-input ${errors.email ? "error" : ""}`} {...register("email")} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="rfp-facility">{rfp("facilityType")}</label>
                    <select id="rfp-facility" className={`form-input ${errors.facilityType ? "error" : ""}`} {...register("facilityType")}>
                      <option value="">— Select —</option>
                      {FACILITY_KEYS.map((k) => (
                        <option key={k} value={k}>{rfp(k)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="rfp-description">{rfp("description")}</label>
                    <textarea
                      id="rfp-description"
                      rows={3}
                      placeholder={rfp("descriptionPlaceholder")}
                      className={`form-input ${errors.description ? "error" : ""}`}
                      style={{ resize: "vertical" }}
                      {...register("description")}
                    />
                  </div>
                  <button
                    type="submit"
                    id="rfp-submit-btn"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {loading ? (
                      <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending...</>
                    ) : (
                      <><Send size={16} /> {rfp("submit")}</>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (min-width: 768px) { .stats-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (min-width: 1024px) { .comm-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
