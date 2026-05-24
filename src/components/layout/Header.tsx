"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { key: "residential", href: "#residential" },
  { key: "commercial", href: "#commercial" },
  { key: "automotive", href: "#automotive" },
  { key: "process", href: "#process" },
  { key: "reviews", href: "#reviews" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    const next = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: next });
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
              aria-label="CryoTech Florida Home"
            >
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, overflow: "hidden"
              }}>
                <img src="/logo.svg" alt="CryoTech Logo" width="36" height="36" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ lineHeight: 1 }}>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.02em" }}>CryoTech</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "var(--color-cyan)", display: "block", letterSpacing: "0.08em" }}>FLORIDA</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav style={{ alignItems: "center", gap: "0.25rem" }} className="header-desktop-nav">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "0.5rem 0.75rem", borderRadius: "6px",
                    fontSize: "0.9rem", fontWeight: 500, color: scrolled ? "var(--color-ink)" : "var(--color-ink)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.color = "var(--color-cyan)";
                    (e.target as HTMLButtonElement).style.backgroundColor = "var(--color-cyan-glow)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.color = "var(--color-ink)";
                    (e.target as HTMLButtonElement).style.backgroundColor = "transparent";
                  }}
                >
                  {t(link.key as "residential" | "commercial" | "automotive" | "process" | "reviews")}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {/* Lang Toggle */}
              <button
                onClick={toggleLocale}
                id="lang-toggle"
                style={{
                  background: "var(--color-bg-soft)", border: "1px solid var(--color-border)",
                  borderRadius: "999px", padding: "0.375rem 0.875rem",
                  fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer",
                  color: "var(--color-ink-muted)", transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: "4px",
                }}
                aria-label={`Switch to ${locale === "en" ? "Spanish" : "English"}`}
              >
                <span style={{ opacity: locale === "en" ? 1 : 0.4 }}>EN</span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span style={{ opacity: locale === "es" ? 1 : 0.4 }}>ES</span>
              </button>

              {/* CTA */}
              <a
                href={siteConfig.phone.href}
                id="header-call-cta"
                className="btn btn-primary btn-sm header-call-btn"
                style={{ gap: "0.375rem" }}
              >
                <Phone size={14} />
                {siteConfig.phone.display}
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="header-hamburger-toggle"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "0.5rem", color: "var(--color-ink)",
                }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: "72px", left: 0, right: 0, zIndex: 40,
              background: scrolled ? "rgba(255, 255, 255, 0.96)" : "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid var(--color-border)",
              padding: "1rem 1.5rem 1.5rem",
              boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.08)",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "0.75rem 1rem", borderRadius: "8px",
                    fontSize: "0.95rem", fontWeight: 600, color: "var(--color-ink)",
                    textAlign: "left", transition: "all 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-cyan)";
                    e.currentTarget.style.background = "var(--color-cyan-glow)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-ink)";
                    e.currentTarget.style.background = "none";
                  }}
                >
                  <span>{t(link.key as "residential" | "commercial" | "automotive" | "process" | "reviews")}</span>
                  <span style={{ color: "var(--color-cyan)", fontWeight: 800 }}>→</span>
                </button>
              ))}
              <a
                href={siteConfig.phone.href}
                className="btn btn-primary"
                style={{ marginTop: "0.75rem", justifyContent: "center", gap: "0.5rem" }}
              >
                <Phone size={16} />
                {siteConfig.phone.display}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
