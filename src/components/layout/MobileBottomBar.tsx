"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { siteConfig, } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/utils";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

type Props = { onQuoteClick?: () => void };

export default function MobileBottomBar({ onQuoteClick }: Props) {
  const t = useTranslations("mobile");
  const locale = useLocale();

  const waMessage = locale === "es" ? siteConfig.whatsapp.messageEs : siteConfig.whatsapp.messageEn;
  const waUrl = getWhatsAppUrl(siteConfig.whatsapp.number, waMessage);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: "easeOut" }}
      style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid var(--color-border)",
        padding: "0.75rem 1rem env(safe-area-inset-bottom)",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0.5rem",
      }}
      className="md:hidden"
    >
      {/* Call */}
      <a
        href={siteConfig.phone.href}
        id="mobile-call-btn"
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "0.25rem", padding: "0.5rem",
          background: "var(--color-bg-soft)", borderRadius: "12px",
          color: "var(--color-ink)", textDecoration: "none",
          fontSize: "0.75rem", fontWeight: 600,
          border: "1px solid var(--color-border)",
          minHeight: "56px",
        }}
      >
        <Phone size={18} color="var(--color-cyan)" />
        {t("call")}
      </a>

      {/* WhatsApp */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="mobile-whatsapp-btn"
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "0.25rem", padding: "0.5rem",
          background: "#25d366", borderRadius: "12px",
          color: "white", textDecoration: "none",
          fontSize: "0.75rem", fontWeight: 600,
          minHeight: "56px",
        }}
      >
        <MessageCircle size={18} />
        {t("whatsapp")}
      </a>

      {/* Quote */}
      <button
        onClick={onQuoteClick}
        id="mobile-quote-btn"
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "0.25rem", padding: "0.5rem",
          background: "var(--color-cyan)", borderRadius: "12px",
          color: "white", cursor: "pointer",
          fontSize: "0.75rem", fontWeight: 600,
          border: "none", minHeight: "56px",
        }}
      >
        <FileText size={18} />
        {t("quote")}
      </button>
    </motion.div>
  );
}
