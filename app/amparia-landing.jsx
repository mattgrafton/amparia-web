"use client";

import { useState, useRef, useEffect } from "react";
import PhoneShowcase from "./PhoneShowcase";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const translations = {
  es: {
    heroSub: "EL PRIMER AVISO LLEGA EN 3 SEGUNDOS. LOS OKUPAS NECESITAN 48 HORAS.",
    feature1Title: "IA DE PRECISIÓN",
    feature1Desc: "97% DE PRECISIÓN. CERO FALSAS ALARMAS.",
    feature2Title: "ALERTA INSTANTÁNEA",
    feature2Desc: "TIEMPO DE REACCIÓN: 2-4 SEGUNDOS. LA VELOCIDAD LO ES TODO.",
    feature3Title: "MANDO TOTAL",
    feature3Desc: "SUPERVISIÓN IMPECABLE. MÚLTIPLES PROPIEDADES. UNA SOLA INTERFAZ.",
    waitlistTitle: "ACCESO ANTICIPADO",
    waitlistSub: "EL HARDWARE ESTÁ EN PRODUCCIÓN PARA EL MERCADO ESPAÑOL. ASEGURA TU LUGAR.",
    emailPlaceholder: "TU@EMAIL.COM",
    submitBtn: "ENTRAR EN LA LISTA",
    menuFeatures: "SISTEMA",
    menuAccess: "ACCESO",
  },
  en: {
    heroSub: "THE FIRST ALERT ARRIVES IN 3 SECONDS. SQUATTERS NEED 48 HOURS.",
    feature1Title: "PRECISION AI",
    feature1Desc: "97% ACCURACY. ZERO FALSE ALARMS.",
    feature2Title: "INSTANT ALERT",
    feature2Desc: "REACTION TIME: 2-4 SECONDS. SPEED IS EVERYTHING.",
    feature3Title: "TOTAL COMMAND",
    feature3Desc: "FLAWLESS OVERSIGHT. MULTIPLE ESTATES. ONE INTERFACE.",
    waitlistTitle: "EARLY ACCESS",
    waitlistSub: "HARDWARE IS IN PRODUCTION FOR THE SPANISH MARKET. SECURE YOUR SPOT.",
    emailPlaceholder: "YOU@EMAIL.COM",
    submitBtn: "JOIN THE WAITLIST",
    menuFeatures: "SYSTEM",
    menuAccess: "ACCESS",
  },
};

export default function AmpariaPage() {
  const [lang, setLang] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const t = translations[lang];

  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Smooth spring-based scroll transforms for fluid hero transition
  // all spring scroll transforms removed — fixed hero, CSS opacity only

  const [error, setError] = useState("");

  // Desktop only: fade hero as content scrolls up
  useEffect(() => {
    const onHeroFade = () => {
      if (window.innerWidth <= 1024) return;
      const hero = document.getElementById("hero-fixed");
      if (!hero) return;
      const pct = Math.min(1, window.scrollY / 800);
      hero.style.opacity = String(1 - pct * 0.82);
    };
    window.addEventListener("scroll", onHeroFade, { passive: true });
    return () => window.removeEventListener("scroll", onHeroFade);
  }, []);

  // phone blur removed — too heavy on older iPhones

  // Desktop only: fade hero as content scrolls up
  useEffect(() => {
    const onHeroFade = () => {
      if (window.innerWidth <= 1024) return;
      const hero = document.getElementById("hero-fixed");
      if (!hero) return;
      const pct = Math.min(1, window.scrollY / 800);
      hero.style.opacity = String(1 - pct * 0.82);
    };
    window.addEventListener("scroll", onHeroFade, { passive: true });
    return () => window.removeEventListener("scroll", onHeroFade);
  }, []);

  // phone blur removed — too heavy on older iPhones

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) return;
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error, please try again');
    }
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", overscrollBehaviorY: "none", touchAction: "auto" }}>

      {/* ─────────────────────────────────────────
          MOBILE FIXES (max-width: 640px only)
          1. Hero icon + wordmark 25% larger
          2. Cards: each card splits into 2 cols
             left = headline+sub, right = stat+punch
             pair B (cost+evidence) gets top gap
          3. Small dim labels more readable
      ───────────────────────────────────────── */}
      <style>{`
        /* Fix 1: dim labels readable on all screen sizes */
        .dim-label { color: rgba(255,255,255,0.45) !important; }

        /* ── Hero logo — premium metal breathe ── */
        @keyframes metalBreathe {
          0%, 100% {
            filter: brightness(1.08) contrast(1.15)
              drop-shadow(0 2px 0px rgba(255,255,255,0.18))
              drop-shadow(0 16px 40px rgba(0,0,0,0.95));
          }
          50% {
            filter: brightness(1.20) contrast(1.08)
              drop-shadow(0 2px 0px rgba(255,255,255,0.30))
              drop-shadow(0 16px 40px rgba(0,0,0,0.85));
          }
        }
        .hero-icon {
          animation: metalBreathe 10s ease-in-out infinite;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .hero-icon-wrap {
          position: relative;
          display: inline-block;
        }

        /* wordmarkShimmer removed — wordmark deleted */

        /* ── Header stays fixed on all — lightweight, no crash ── */
        .site-header { -webkit-transform: translateZ(0); }

        /* ── All screens: hero is fixed, content starts below ── */
        .scroll-layer { margin-top: 100vh; }

        /* ── Desktop: full opacity hero, fades on scroll via JS ── */
        @media (min-width: 1025px) {
          .hero-fixed-layer { opacity: 1; }
        }

        /* ── Mobile/tablet: hero stays fixed, logo as watermark ── */
        @media (max-width: 1024px) {
          .hero-fixed-layer {
            opacity: 0.35;
          }
          .scroll-layer {
            background: transparent !important;
          }
        }

        /* ── MOBILE only (phones) ── */
        @media (max-width: 640px) {
          .hero-icon {
            animation: none !important;
            filter: brightness(1.08) contrast(1.15) drop-shadow(0 8px 24px rgba(0,0,0,0.9)) !important;
            will-change: auto !important;
          }
          .hero-icon     { width: clamp(350px, 92vw, 700px) !important; }
          .hero-wordmark { font-size: clamp(40px, 10vw, 88px) !important; }

          .story-grid {
            display: flex !important;
            flex-direction: column !important;
            background: transparent !important;
            gap: 0 !important;
          }
          .story-card {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            min-height: auto !important;
            padding: 0 !important;
            gap: 0 !important;
          }
          .story-card-top    { padding: 20px 14px !important; border-bottom: none !important; }
          .story-card-bottom { padding: 20px 14px !important; background: #080808; }
          .story-svg         { display: none !important; }
          .story-card + .story-card { margin-top: 40px !important; }
        }

        /* ── IPAD only ── */
        @media (min-width: 641px) and (max-width: 1024px) {
          .hero-icon {
            animation: none !important;
            filter: brightness(1.08) contrast(1.15) drop-shadow(0 8px 24px rgba(0,0,0,0.9)) !important;
            will-change: auto !important;
          }
          .hero-icon     { width: clamp(580px, 76vw, 856px) !important; }
          .hero-wordmark { font-size: clamp(52px, 8vw, 100px) !important; }

          .story-grid {
            display: flex !important;
            flex-direction: column !important;
            background: transparent !important;
            gap: 0 !important;
          }
          .story-card {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            min-height: auto !important;
            padding: 0 !important;
            gap: 0 !important;
          }
          .story-card + .story-card { margin-top: 40px !important; }
          .story-card-top    { padding: 28px 20px !important; border-bottom: none !important; }
          .story-card-bottom { padding: 28px 20px !important; background: #080808; }
          .story-svg         { display: none !important; }
        }`}</style>



      <div aria-hidden="true" className="grain-overlay" />

      {/* ── NAVIGATION ── */}
      <header
        className="site-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          mixBlendMode: "difference",
          padding: "10px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "12px",
            letterSpacing: "0.4em",
          }}
        >
          AMPARIA
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.3em",
              padding: 0,
            }}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "7px",
              padding: 0,
            }}
            aria-label="Menu"
          >
            <motion.div
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              style={{ width: "26px", height: "1.5px", background: "#fff", transformOrigin: "center" }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              style={{ width: "26px", height: "1.5px", background: "#fff", transformOrigin: "center" }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      {/* ── FULL-SCREEN MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 90,
              background: "#000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 56px",
            }}
          >
            {[
              { label: t.menuFeatures, href: "#features" },
              { label: t.menuAccess, href: "#waitlist" },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ delay: i * 0.07 + 0.1, duration: 0.35 }}
                style={{
                  display: "block",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(36px, 8vw, 96px)",
                  letterSpacing: "-0.04em",
                  color: "#fff",
                  textDecoration: "none",
                  lineHeight: 1.0,
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
              >
                {item.label}
              </motion.a>
            ))}
            <div
              style={{
                position: "absolute",
                bottom: "40px",
                left: "56px",
                right: "56px",
                height: "1px",
                background: "#111",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════
          LAYER 1 — FIXED HERO
      ════════════════════════════════════════ */}
      <div
        id="hero-fixed"
        className="hero-fixed-layer"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ── DARK GRITTY STAGE ── */}
        <div style={{ position: "absolute", inset: 0, background: "#000000" }} />

        {/* grain removed — pure black background */}

        {/* ── VIGNETTE — darker edges, brighter center ── */}
        {/* ── OVERHEAD STUDIO LIGHT — very subtle, desktop only ── */}
        <div className="studio-light" style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }} />



        {/* ── LOGO CENTERPIECE ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 5,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "0px",
          /* perspective removed for iOS zoom stability */
          paddingBottom: "80px",
        }}>
          <div style={{ position: "relative", overflow: "hidden", paddingBottom: "0px" }}>
            <div style={{
              position: "absolute",
              top: "-5%", left: "20%", right: "20%", bottom: "30%",
              background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",
              zIndex: 0,
            }} />

            {/* FIX 1a — hero-icon class overrides width on mobile */}
              <div className="hero-icon-wrap">
            <img
              src="/amparia-icon.png"
              alt="AMPARIA"
              draggable={false}
              className="hero-icon"
              style={{
                position: "relative",
                width: "clamp(220px, 46vw, 672px)",
                height: "auto",
                display: "block",
                zIndex: 1,
                marginBottom: "-18%",
                filter: `
                  brightness(1.12) contrast(1.18) saturate(0.85)
                  drop-shadow(0 2px 0px rgba(255,255,255,0.22))
                  drop-shadow(0 -1px 0px rgba(255,255,255,0.08))
                  drop-shadow(0 6px 6px rgba(0,0,0,0.99))
                  drop-shadow(0 16px 32px rgba(0,0,0,0.99))
                  drop-shadow(0 32px 64px rgba(0,0,0,0.95))
                  drop-shadow(0 64px 120px rgba(0,0,0,0.85))
                `,
                userSelect: "none",
              }}
            />
              </div>
          </div>
        </div>

        <div style={{
          position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }} />

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "30%", zIndex: 6, pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent, #000)",
        }} />

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}
        >
          <div style={{ width: "1px", height: "52px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))" }} />
        </motion.div>
      </div>

      {/* ════════════════════════════════════════
          LAYER 2 — SCROLLING GLASS LAYER
      ════════════════════════════════════════ */}
      <div
        ref={containerRef}
        className="scroll-layer"
        style={{
          position: "relative",
          zIndex: 10,
          background: "rgba(0,0,0,0)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{
        filter: "blur(0px)",
        transition: "filter 0.6s ease",
      }} id="phone-section">
        <div style={{
        filter: "blur(0px)",
        transition: "filter 0.6s ease",
      }} id="phone-section">
        <PhoneShowcase lang={lang} />
      </div>
      </div>

        <div style={{ margin: "0 40px", height: "1px", background: "rgba(255,255,255,0.04)" }} />

        {/* ── STORY CARDS ── */}
        <section id="features" style={{ padding: "100px 40px", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
              <span className="dim-label" style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700, fontSize: "9px", letterSpacing: "0.45em",
                color: "rgba(255,255,255,0.2)",
              }}>
                {lang === "es" ? "POR QUÉ AMPARIA" : "WHY AMPARIA"}
              </span>
            </div>
          </div>

          {/* FIX 2: story-grid — mobile CSS restructures this into stacked pairs */}
          <div className="story-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            alignItems: "stretch",
          }}>
            <StoryCard lang={lang} id="alert" />
            <StoryCard lang={lang} id="setup" />
            <StoryCard lang={lang} id="cost"     pairB />
            <StoryCard lang={lang} id="evidence" pairB />
          </div>
        </section>

        <div style={{ margin: "0 40px", height: "1px", background: "rgba(255,255,255,0.04)" }} />

        {/* ── WAITLIST FORM ── */}
        <section id="waitlist" style={{ padding: "120px 40px 160px", maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
              <span className="dim-label" style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700, fontSize: "9px", letterSpacing: "0.45em",
                color: "rgba(255,255,255,0.2)",
              }}>
                {lang === "es" ? "LISTA DE ESPERA" : "WAITLIST"}
              </span>
            </div>
          </div>

          <h2 style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(40px, 9vw, 110px)",
            letterSpacing: "-0.04em",
            color: "#fff",
            lineHeight: 0.9,
            marginBottom: "36px",
          }}>
            {t.waitlistTitle}
          </h2>

          <p style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 500, fontSize: "10px", letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.48)", lineHeight: 2.2,
            maxWidth: "400px", marginBottom: "72px",
          }}>
            {t.waitlistSub}
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "40px", background: "rgba(0,0,0,0.8)" }}
            >
              <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "12px", letterSpacing: "0.3em", color: "#fff" }}>
                {lang === "es" ? "✓ SOLICITUD RECIBIDA." : "✓ REQUEST RECEIVED."}
              </p>
              <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.28)", marginTop: "12px" }}>
                {lang === "es" ? "TE CONTACTAREMOS PRONTO." : "WE'LL BE IN TOUCH."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.5)" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  color: "#fff", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 700, fontSize: "11px", letterSpacing: "0.25em",
                  padding: "26px 32px", borderRight: "1px solid rgba(255,255,255,0.08)", minWidth: 0,
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ background: "#fff", color: "#000" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent", border: "none", cursor: "pointer", color: "#fff",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 900, fontSize: "10px", letterSpacing: "0.3em",
                  padding: "26px 36px", whiteSpace: "nowrap", transition: "background 0.2s, color 0.2s",
                }}
              >
                {t.submitBtn}
              </motion.button>
            </form>
          )}
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          padding: "32px 40px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "16px",
        }}>
          <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "11px", letterSpacing: "0.35em", color: "rgba(255,255,255,0.15)" }}>
            AMPARIA
          </span>
          <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)" }}>
            © 2026 AMPARIA.{" "}{lang === "es" ? "TODOS LOS DERECHOS RESERVADOS." : "ALL RIGHTS RESERVED."}
          </span>
        </footer>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const AMBER = "#D4863A";
const RED   = "#E8423A";

const storyData = {
  alert: {
    es: { tag: "DETECCIÓN", headline: ["EL PRIMER AVISO", "EN 3 SEGUNDOS."], sub: "Mientras otros sistemas tardan minutos, AMPARIA detecta, clasifica y alerta en tiempo real.", punch: ["Los okupas necesitan", "48 HORAS", "para cambiar la cerradura."], stat: "3 SEG", statLabel: "TIEMPO DE REACCIÓN" },
    en: { tag: "DETECTION",  headline: ["FIRST ALERT", "IN 3 SECONDS."],     sub: "While other systems take minutes, AMPARIA detects, classifies and alerts in real time.",      punch: ["Squatters need", "48 HOURS", "to change the lock."],              stat: "3 SEC", statLabel: "REACTION TIME" },
  },
  setup: {
    es: { tag: "INSTALACIÓN", headline: ["ENCHUFA.", "LISTO."],    sub: "Sin obras. Sin técnicos. Sin configuraciones imposibles. Otros sistemas requieren instalación profesional y semanas de configuración.", punch: ["Otros sistemas:", "INSTALACIÓN PROFESIONAL REQUERIDA"],          stat: "5 MIN", statLabel: "INSTALACIÓN COMPLETA" },
    en: { tag: "SETUP",       headline: ["PLUG IN.", "DONE."],     sub: "No drilling. No technicians. No impossible configs. Other systems require professional installation and weeks of setup.",               punch: ["Competitors:", "PROFESSIONAL SETUP REQUIRED"],                   stat: "5 MIN", statLabel: "FULL SETUP" },
  },
  cost: {
    es: { tag: "COSTE REAL",    headline: ["€4.99/MES.", "VS. €2.500."], sub: "El coste medio de honorarios legales por un caso de okupa supera los €2.500. Sin garantías de éxito.",      punch: ["Honorarios legales promedio:", "€1.250–€2.500", "por caso. Sin garantías."], stat: "€4.99", statLabel: "AL MES" },
    en: { tag: "REAL COST",     headline: ["€4.99/MO.",  "VS. €2,500."], sub: "Average legal fees per squatter case in Spain exceed €2,500. With no guarantee of success.",              punch: ["Average legal fees:", "€1,250–€2,500", "per case. No guarantees."],          stat: "€4.99", statLabel: "PER MONTH" },
  },
  evidence: {
    es: { tag: "EVIDENCIA LEGAL", headline: ["UN CLIC.", "JUICIO GANADO."], sub: "Exporta un paquete forense completo en segundos. Tu abogado lo tiene todo.",                        punch: ["Incluye:", "HASH SHA-256 · TIMESTAMP NTP · COORDENADAS GPS"], stat: "100%", statLabel: "ADMISIBLE EN TRIBUNAL" },
    en: { tag: "LEGAL EVIDENCE",  headline: ["ONE CLICK.", "CASE CLOSED."], sub: "Export a complete forensic bundle in seconds. Your lawyer has everything they need.", punch: ["Includes:", "SHA-256 HASH · NTP TIMESTAMP · GPS COORDINATES"],    stat: "100%", statLabel: "COURT ADMISSIBLE" },
  },
};

/* ════════════════════════════════════════
   STORY CARD
════════════════════════════════════════ */
function StoryCard({ lang, id, pairB }) {
  const [hovered, setHovered] = useState(false);
  const data = storyData[id][lang];
  const accentColor = id === "cost" ? RED : AMBER;
  const bgGlow = id === "cost"
    ? "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(232,66,58,0.08) 0%, transparent 70%)"
    : "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(212,134,58,0.08) 0%, transparent 70%)";

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.01 }}
      
      transition={{ duration: 0.35 }}
      className={`story-card${pairB ? " story-card-pair-b" : ""}`}
      style={{
        position: "relative",
        minHeight: "560px",
        background: "#000",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "44px",
      }}
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", background: bgGlow }}
      />

      <div className="story-svg" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {id === "alert"    && <AlertStoryVisual    hovered={hovered} />}
        {id === "setup"    && <SetupStoryVisual    hovered={hovered} />}
        {id === "cost"     && <CostStoryVisual     hovered={hovered} />}
        {id === "evidence" && <EvidenceStoryVisual hovered={hovered} />}
      </div>

      {/* Top — left col on mobile */}
      <div className="story-card-top" style={{ position: "relative", zIndex: 2 }}>
        <span style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontWeight: 700, fontSize: "9px", letterSpacing: "0.5em", color: accentColor, display: "block", marginBottom: "28px" }}>
          {data.tag}
        </span>
        <div style={{ marginBottom: "20px" }}>
          {data.headline.map((line, i) => (
            <div key={i} style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3.2vw, 38px)", letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.05 }}>{line}</div>
          ))}
        </div>
        <p style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontWeight: 400, fontSize: "11px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.52)", lineHeight: 1.9, maxWidth: "260px", margin: 0 }}>
          {data.sub}
        </p>
      </div>

      {/* Bottom — right col on mobile */}
      <div className="story-card-bottom" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ borderLeft: `2px solid ${accentColor}`, paddingLeft: "16px", marginBottom: "28px" }}>
          <div style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontWeight: 500, fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.52)", marginBottom: "4px" }}>{data.punch[0]}</div>
          <div style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontWeight: 900, fontSize: "clamp(11px, 1.4vw, 14px)", letterSpacing: "0.15em", color: accentColor, lineHeight: 1.4 }}>{data.punch[1]}</div>
          {data.punch[2] && (
            <div style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontWeight: 400, fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", marginTop: "2px" }}>{data.punch[2]}</div>
          )}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "20px" }}>
          <div style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontWeight: 900, fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>{data.stat}</div>
          <div style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontWeight: 600, fontSize: "9px", letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", marginTop: "6px" }}>{data.statLabel}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── SVG ANIMATIONS ── */
function AlertStoryVisual({ hovered }) {
  return (
    <svg viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: hovered ? 0.2 : 0.07, transition: "opacity 0.6s" }}>
      {[40,70,100,130].map((r,i) => <circle key={i} cx="150" cy="220" r={r} fill="none" stroke={i===0?"#D4863A":"white"} strokeWidth={i===0?"1.2":"0.4"} opacity={1-i*0.2} />)}
      <circle cx="150" cy="220" r="6" fill="#D4863A" opacity="0.9" />
      <circle cx="150" cy="220" r="2" fill="black" />
      <line x1="150" y1="90" x2="150" y2="110" stroke="#D4863A" strokeWidth="1" opacity="0.6" />
      <line x1="80" y1="130" x2="92" y2="142" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <line x1="220" y1="130" x2="208" y2="142" stroke="white" strokeWidth="0.5" opacity="0.3" />
      {[380,398,416,434,452].map((y,i) => <line key={i} x1="60" y1={y} x2="240" y2={y} stroke="white" strokeWidth="0.3" opacity={0.08+i*0.02} />)}
    </svg>
  );
}
function SetupStoryVisual({ hovered }) {
  return (
    <svg viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: hovered ? 0.18 : 0.07, transition: "opacity 0.6s" }}>
      <rect x="105" y="100" width="90" height="130" rx="8" fill="none" stroke="#D4863A" strokeWidth="1.2" />
      <rect x="120" y="115" width="60" height="40" rx="2" fill="none" stroke="white" strokeWidth="0.4" opacity="0.4" />
      <circle cx="150" cy="195" r="12" fill="none" stroke="white" strokeWidth="0.6" opacity="0.5" />
      <circle cx="150" cy="195" r="5" fill="white" opacity="0.3" />
      <line x1="150" y1="230" x2="150" y2="260" stroke="#D4863A" strokeWidth="1.5" opacity="0.7" />
      <line x1="135" y1="260" x2="165" y2="260" stroke="#D4863A" strokeWidth="1.5" opacity="0.7" />
      <path d="M125,310 L142,328 L178,295" fill="none" stroke="#D4863A" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <line x1="70" y1="390" x2="82" y2="402" stroke="#E8423A" strokeWidth="1" opacity="0.5" />
      <line x1="82" y1="390" x2="70" y2="402" stroke="#E8423A" strokeWidth="1" opacity="0.5" />
      <line x1="100" y1="395" x2="220" y2="395" stroke="white" strokeWidth="0.3" opacity="0.2" />
      <line x1="70" y1="420" x2="82" y2="432" stroke="#E8423A" strokeWidth="1" opacity="0.4" />
      <line x1="82" y1="420" x2="70" y2="432" stroke="#E8423A" strokeWidth="1" opacity="0.4" />
      <line x1="100" y1="425" x2="200" y2="425" stroke="white" strokeWidth="0.3" opacity="0.15" />
    </svg>
  );
}
function CostStoryVisual({ hovered }) {
  return (
    <svg viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: hovered ? 0.2 : 0.08, transition: "opacity 0.6s" }}>
      <line x1="150" y1="100" x2="150" y2="200" stroke="white" strokeWidth="0.8" opacity="0.4" />
      <line x1="80" y1="160" x2="220" y2="160" stroke="white" strokeWidth="0.8" opacity="0.4" />
      <line x1="80" y1="160" x2="80" y2="210" stroke="#E8423A" strokeWidth="0.6" opacity="0.6" />
      <rect x="55" y="210" width="50" height="30" rx="2" fill="none" stroke="#E8423A" strokeWidth="1" opacity="0.7" />
      <line x1="220" y1="160" x2="220" y2="175" stroke="#D4863A" strokeWidth="0.6" opacity="0.6" />
      <rect x="195" y="175" width="50" height="20" rx="2" fill="none" stroke="#D4863A" strokeWidth="1" opacity="0.7" />
      <rect x="80" y="320" width="40" height="140" rx="1" fill="#E8423A" opacity="0.18" />
      <rect x="80" y="320" width="40" height="140" rx="1" fill="none" stroke="#E8423A" strokeWidth="0.8" opacity="0.5" />
      <rect x="175" y="430" width="40" height="30" rx="1" fill="#D4863A" opacity="0.25" />
      <rect x="175" y="430" width="40" height="30" rx="1" fill="none" stroke="#D4863A" strokeWidth="0.8" opacity="0.6" />
      <line x1="60" y1="460" x2="240" y2="460" stroke="white" strokeWidth="0.4" opacity="0.2" />
    </svg>
  );
}
function EvidenceStoryVisual({ hovered }) {
  return (
    <svg viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: hovered ? 0.2 : 0.08, transition: "opacity 0.6s" }}>
      <rect x="95" y="90" width="110" height="140" rx="3" fill="none" stroke="#D4863A" strokeWidth="1.2" />
      <line x1="115" y1="125" x2="185" y2="125" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="115" y1="143" x2="185" y2="143" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <line x1="115" y1="161" x2="165" y2="161" stroke="white" strokeWidth="0.5" opacity="0.2" />
      <rect x="115" y="178" width="70" height="8" rx="1" fill="white" opacity="0.12" />
      <rect x="115" y="193" width="55" height="8" rx="1" fill="white" opacity="0.08" />
      <circle cx="175" cy="208" r="16" fill="none" stroke="#D4863A" strokeWidth="1" opacity="0.8" />
      <path d="M167,208 L173,214 L184,202" fill="none" stroke="#D4863A" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
      <rect x="85" y="270" width="130" height="22" rx="2" fill="none" stroke="rgba(212,134,58,0.4)" strokeWidth="0.8" />
      <line x1="150" y1="330" x2="150" y2="380" stroke="#D4863A" strokeWidth="1.5" opacity="0.7" />
      <path d="M135,365 L150,382 L165,365" fill="none" stroke="#D4863A" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <rect x="100" y="410" width="60" height="16" rx="4" fill="none" stroke="white" strokeWidth="0.6" opacity="0.3" />
      <line x1="155" y1="418" x2="200" y2="440" stroke="white" strokeWidth="1.2" opacity="0.25" />
      <rect x="192" y="436" width="28" height="8" rx="2" fill="none" stroke="white" strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

function FeatureMonolith() { return null; }
function AIVisual() { return null; }
function AlertVisual() { return null; }
function CommandVisual() { return null; }
