"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Star } from "lucide-react";

const SERVICE_ANCHORS = [
  { key: "residential", href: "#residential" },
  { key: "commercial", href: "#commercial" },
  { key: "automotive", href: "#automotive" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "var(--color-ink)", color: "white", paddingTop: "4rem", paddingBottom: "2rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", marginBottom: "3rem" }}
          className="footer-grid">
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden"
              }}>
                <img src="/logo.svg" alt="CryoTech Logo" width="36" height="36" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ lineHeight: 1 }}>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>CryoTech</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "var(--color-cyan)", display: "block", letterSpacing: "0.08em" }}>FLORIDA</span>
              </div>
            </div>
            <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: "280px", marginBottom: "1.5rem" }}>
              {t("tagline")}
            </p>
            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <a href={siteConfig.phone.href} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.9rem" }}>
                <Phone size={15} color="var(--color-cyan)" />
                {siteConfig.phone.display}
              </a>
              <a href={`mailto:${siteConfig.email}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.9rem" }}>
                <Mail size={15} color="var(--color-cyan)" />
                {siteConfig.email}
              </a>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                <MapPin size={15} color="var(--color-cyan)" style={{ marginTop: "2px", flexShrink: 0 }} />
                {siteConfig.address.display}
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 style={{ fontSize: "0.8125rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t("services")}
            </h3>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {SERVICE_ANCHORS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: "none", border: "none", cursor: "pointer", textAlign: "left",
                    color: "rgba(255,255,255,0.7)", fontSize: "0.9375rem",
                    transition: "color 0.2s", padding: 0,
                  }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = "var(--color-cyan)"}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
                >
                  {nav(link.key as "residential" | "commercial" | "automotive")}
                </button>
              ))}
            </nav>
          </div>

          {/* Emergency + Social Column */}
          <div>
            <h3 style={{ fontSize: "0.8125rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t("emergency")}
            </h3>
            <a
              href={siteConfig.phone.href}
              id="footer-emergency-cta"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.75rem 1.25rem", background: "var(--color-cyan)",
                borderRadius: "10px", color: "white", textDecoration: "none",
                fontSize: "1rem", fontWeight: 700, marginBottom: "1.5rem",
              }}
              className="animate-pulse-glow"
            >
              <Phone size={16} />
              {siteConfig.phone.display}
            </a>

            <h3 style={{ fontSize: "0.8125rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem", marginTop: "0.5rem" }}>
              {t("followUs")}
            </h3>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
                style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-cyan)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer"
                style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-cyan)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href={siteConfig.social.google} target="_blank" rel="noopener noreferrer"
                style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-cyan)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}>
                <Star size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: "1.5rem",
          paddingBottom: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.72)", fontWeight: 500 }}>
              © {new Date().getFullYear()} <strong style={{ color: "white" }}>{siteConfig.name}</strong>. {t("rights")}
            </p>
            <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)" }}>
              {siteConfig.license}
            </p>
          </div>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textAlign: "center", paddingTop: "0.25rem" }}>
            Diseño y desarrollo por{" "}
            <a
              href="mailto:info@cryotechflorida.com"
              style={{ color: "var(--color-cyan)", textDecoration: "none", fontWeight: 600 }}
            >
              GGR Digital Agency
            </a>
            {" "}· Miami, FL
          </p>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
