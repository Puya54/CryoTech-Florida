"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { CheckCircle, Send, Loader2 } from "lucide-react";

type ServiceType = "residential" | "commercial" | "automotive";
type UrgencyType = "emergency" | "thisWeek" | "quote";

type Props = {
  defaultService?: ServiceType;
};

const SERVICES: ServiceType[] = ["residential", "commercial", "automotive"];
const URGENCIES: UrgencyType[] = ["emergency", "thisWeek", "quote"];

// US phone regex
const US_PHONE_RE = /^(\+1\s?)?(\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4})$/;
const MIAMI_ZIPS = new Set([
  "33101","33109","33110","33111","33112","33114","33116","33119","33121","33122","33124",
  "33125","33126","33127","33128","33129","33130","33131","33132","33133","33134","33135",
  "33136","33137","33138","33139","33140","33141","33142","33143","33144","33145","33146",
  "33147","33149","33150","33151","33152","33153","33154","33155","33156","33157","33158",
  "33160","33161","33162","33163","33164","33165","33166","33167","33168","33169","33170",
  "33172","33173","33174","33175","33176","33177","33178","33179","33180","33181","33182",
  "33183","33184","33185","33186","33187","33188","33189","33190","33193","33194","33196",
]);

const schema = z.object({
  name: z.string().min(2, "errorName"),
  phone: z.string().regex(US_PHONE_RE, "errorPhone"),
  zip: z.string().refine((v) => MIAMI_ZIPS.has(v.trim()), "errorZip"),
});
type FormData = z.infer<typeof schema>;

export default function SmartForm({ defaultService = "residential" }: Props) {
  const t = useTranslations("form");
  const [service, setService] = useState<ServiceType>(defaultService);
  const [urgency, setUrgency] = useState<UrgencyType>("thisWeek");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const payload = { ...data, service, urgency, timestamp: new Date().toISOString() };
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Webhook error:", err);
      setSubmitted(true); // still show success to user
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "white", borderRadius: "20px", padding: "2.5rem",
          border: "1.5px solid var(--color-cyan)",
          boxShadow: "var(--shadow-cyan)", textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <CheckCircle size={52} color="var(--color-cyan)" />
        </div>
        <h3 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.625rem" }}>
          {t("successTitle")}
        </h3>
        <p style={{ color: "var(--color-ink-muted)", marginBottom: "1.5rem" }}>
          {t("successMessage")}
        </p>
        {urgency === "emergency" && (
          <div style={{ background: "var(--color-cyan-glow)", borderRadius: "12px", padding: "1rem", marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.875rem", color: "var(--color-cyan-dark)", marginBottom: "0.5rem" }}>
              {t("emergencyMessage")}
            </p>
            <a href={siteConfig.phone.href} style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-cyan)", textDecoration: "none" }}>
              {siteConfig.phone.display}
            </a>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-lg)" }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.25rem" }}>
        {t("title")}
      </h3>
      <p style={{ fontSize: "0.875rem", color: "var(--color-ink-muted)", marginBottom: "1.75rem" }}>
        {t("subtitle")}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Service type */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p className="form-label" style={{ marginBottom: "0.625rem" }}>{t("step1Title")}</p>
          <div className="form-services-grid">
            {SERVICES.map((s) => (
              <button
                key={s}
                type="button"
                id={`form-service-${s}`}
                onClick={() => setService(s)}
                style={{
                  padding: "0.625rem 0.25rem", borderRadius: "10px", cursor: "pointer",
                  border: `1.5px solid ${service === s ? "var(--color-cyan)" : "var(--color-border)"}`,
                  background: service === s ? "var(--color-cyan-glow)" : "var(--color-bg-soft)",
                  color: service === s ? "var(--color-cyan-dark)" : "var(--color-ink-muted)",
                  fontSize: "0.8125rem", fontWeight: 600, transition: "all 0.15s",
                }}
              >
                {t(s as "residential" | "commercial" | "automotive")}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Contact */}
        <div style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p className="form-label" style={{ marginBottom: 0 }}>{t("step2Title")}</p>
          <div>
            <label className="form-label" htmlFor="form-name">{t("name")}</label>
            <input
              id="form-name"
              type="text"
              placeholder={t("namePlaceholder")}
              className={`form-input ${errors.name ? "error" : ""}`}
              {...register("name")}
            />
            {errors.name && <p className="form-error">{t(errors.name.message as "errorName" | "errorPhone" | "errorZip")}</p>}
          </div>
          <div>
            <label className="form-label" htmlFor="form-phone">{t("phone")}</label>
            <input
              id="form-phone"
              type="tel"
              placeholder={t("phonePlaceholder")}
              className={`form-input ${errors.phone ? "error" : ""}`}
              {...register("phone")}
            />
            {errors.phone && <p className="form-error">{t(errors.phone.message as "errorName" | "errorPhone" | "errorZip")}</p>}
          </div>
          <div>
            <label className="form-label" htmlFor="form-zip">{t("zip")}</label>
            <input
              id="form-zip"
              type="text"
              placeholder={t("zipPlaceholder")}
              maxLength={5}
              className={`form-input ${errors.zip ? "error" : ""}`}
              {...register("zip")}
            />
            {errors.zip && <p className="form-error">{t(errors.zip.message as "errorName" | "errorPhone" | "errorZip")}</p>}
          </div>
        </div>

        {/* Step 3: Urgency */}
        <div style={{ marginBottom: "1.75rem" }}>
          <p className="form-label" style={{ marginBottom: "0.625rem" }}>{t("step3Title")}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {URGENCIES.map((u) => (
              <button
                key={u}
                type="button"
                id={`form-urgency-${u}`}
                onClick={() => setUrgency(u)}
                style={{
                  padding: "0.75rem 1rem", borderRadius: "10px", cursor: "pointer", textAlign: "left",
                  border: `1.5px solid ${urgency === u ? "var(--color-cyan)" : "var(--color-border)"}`,
                  background: urgency === u ? "var(--color-cyan-glow)" : "var(--color-bg-soft)",
                  color: urgency === u ? "var(--color-cyan-dark)" : "var(--color-ink-muted)",
                  fontSize: "0.875rem", fontWeight: urgency === u ? 600 : 400,
                  transition: "all 0.15s", display: "flex", alignItems: "center", gap: "0.5rem",
                }}
              >
                <span style={{
                  width: "16px", height: "16px", borderRadius: "50%",
                  border: `2px solid ${urgency === u ? "var(--color-cyan)" : "var(--color-border)"}`,
                  background: urgency === u ? "var(--color-cyan)" : "transparent",
                  flexShrink: 0, display: "inline-block",
                }} />
                {t(u as "emergency" | "thisWeek" | "quote")}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="form-submit-btn"
          disabled={loading}
          className="btn btn-primary btn-lg"
          style={{ width: "100%", justifyContent: "center" }}
        >
          {loading ? (
            <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> {t("submitting")}</>
          ) : (
            <><Send size={18} /> {t("submit")}</>
          )}
        </button>
      </form>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
