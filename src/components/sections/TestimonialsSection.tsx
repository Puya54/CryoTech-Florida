"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Home, Building2, Car, ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const TYPE_ICONS = { residential: Home, commercial: Building2, automotive: Car };
const TYPE_COLORS = { residential: "var(--color-cyan)", commercial: "#0891b2", automotive: "#06b6d4" };

type ReviewItem = { name: string; location: string; type: string; rating: number; text: string };

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const rawItems = t.raw("items") as ReviewItem[];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4500, stopOnInteraction: true })]
  );

  return (
    <section id="reviews" style={{ background: "var(--color-bg-soft)", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <div>
            <motion.span className="badge" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {t("sectionBadge")}
            </motion.span>
            <motion.h2
              className="text-headline"
              style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              {t("headline")}
            </motion.h2>
            <motion.p
              className="text-subheadline"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              {t("subheadline")}
            </motion.p>
          </div>

          {/* Google badge + aggregate */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.375rem",
            }}
          >
            <div style={{ display: "flex", gap: "2px" }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="var(--color-cyan)" color="var(--color-cyan)" />)}
            </div>
            <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-ink)", lineHeight: 1 }}>
              {siteConfig.aggregateRating.ratingValue}
              <span style={{ fontSize: "0.875rem", fontWeight: 400, color: "var(--color-ink-muted)" }}>
                {" "}/5 ({siteConfig.aggregateRating.reviewCount} reviews)
              </span>
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--color-ink-subtle)" }}>{t("googleBadge")}</p>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div ref={emblaRef} style={{ overflow: "hidden" }}>
            <div style={{ display: "flex", gap: "1.25rem" }}>
              {rawItems.map((item, i) => {
                const Icon = TYPE_ICONS[item.type as keyof typeof TYPE_ICONS] ?? Home;
                const color = TYPE_COLORS[item.type as keyof typeof TYPE_COLORS] ?? "var(--color-cyan)";
                return (
                  <div
                    key={i}
                    style={{
                      flex: "0 0 min(340px, 85vw)",
                      background: "white",
                      borderRadius: "20px",
                      padding: "1.75rem",
                      border: "1px solid var(--color-border)",
                      boxShadow: "var(--shadow-sm)",
                      display: "flex", flexDirection: "column", gap: "1rem",
                    }}
                  >
                    {/* Stars */}
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[...Array(item.rating)].map((_, j) => (
                        <Star key={j} size={14} fill="var(--color-cyan)" color="var(--color-cyan)" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-muted)", lineHeight: 1.65, flex: 1 }}>
                      &quot;{item.text}&quot;
                    </p>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--color-border)" }}>
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: "var(--color-cyan-glow)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon size={18} color={color} />
                      </div>
                      <div>
                        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-ink)", lineHeight: 1.2 }}>{item.name}</p>
                        <p style={{ fontSize: "0.8125rem", color: "var(--color-ink-subtle)" }}>{item.location}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              id="testimonials-prev"
              style={{
                width: "44px", height: "44px", borderRadius: "50%",
                border: "1.5px solid var(--color-border)", background: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--color-ink)", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "var(--color-cyan)"; (e.currentTarget).style.color = "var(--color-cyan)"; }}
              onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "var(--color-border)"; (e.currentTarget).style.color = "var(--color-ink)"; }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              id="testimonials-next"
              style={{
                width: "44px", height: "44px", borderRadius: "50%",
                border: "1.5px solid var(--color-border)", background: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--color-ink)", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "var(--color-cyan)"; (e.currentTarget).style.color = "var(--color-cyan)"; }}
              onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "var(--color-border)"; (e.currentTarget).style.color = "var(--color-ink)"; }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
