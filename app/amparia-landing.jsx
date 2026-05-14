"use client";

import { useState, useRef } from "react";
import PhoneShowcase from "./PhoneShowcase";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.88]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.25]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── Grain noise overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: "none",
          mixBlendMode: "soft-light",
          opacity: 0.45,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* ── NAVIGATION ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          mixBlendMode: "difference",
          padding: "28px 40px",
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
                  fontSize: "clamp(60px, 13vw, 150px)",
                  letterSpacing: "-0.04em",
                  color: "#1a1a1a",
                  textDecoration: "none",
                  lineHeight: 1.0,
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a1a")}
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
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          scale: heroScale,
          opacity: heroOpacity,
        }}
      >
        {/* ── REAL CEMENT PHOTO — full bleed, darkened ── */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            src="/cement.jpg"
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              display: "block",
              filter: "grayscale(100%) brightness(0.24) contrast(1.2)",
            }}
          />
        </div>

        {/* Digital noise layer over photo — adds grain on top of real texture */}
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, mixBlendMode: "screen", zIndex: 1 }}>
          <filter id="h-grain" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#h-grain)" />
        </svg>

        {/* Directional light baked from photo — enhance top-right */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(125deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }} />

        {/* ── LOGO CENTERPIECE ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 4,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "0px",
          transform: "perspective(1200px) rotateX(3deg)",
          paddingBottom: "80px",
        }}>

          {/* Logo icon — the A mark */}
          <div style={{ position: "relative", overflow: "hidden", paddingBottom: "0px" }}>
            {/* Glow behind logo */}
            <div style={{
              position: "absolute",
              top: "20%", left: "10%", right: "10%", bottom: "14%",
              background: "radial-gradient(ellipse at center, rgba(180,180,180,0.12) 0%, transparent 70%)",
              filter: "blur(24px)",
              zIndex: 0,
            }} />
            <img
              src="/amparia-icon.png"
              alt="AMPARIA"
              draggable={false}
              style={{
                position: "relative",
                width: "clamp(280px, 42vw, 560px)",
                height: "auto",
                display: "block",
                zIndex: 1,
                marginBottom: "-18%",
                filter: `
                  brightness(1.15)
                  contrast(1.12)
                  drop-shadow(0 2px 0 rgba(255,255,255,0.1))
                  drop-shadow(0 8px 24px rgba(0,0,0,0.95))
                  drop-shadow(0 24px 64px rgba(0,0,0,0.8))
                  drop-shadow(0 48px 120px rgba(0,0,0,0.6))
                `,
                userSelect: "none",
              }}
            />
          </div>

          {/* AMPARIA wordmark below icon */}
          <div style={{
            position: "relative",
            marginTop: "8px",
            zIndex: 2,
          }}>
            {/* 3D metallic wordmark — matches the brushed steel logo */}
            <span style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(32px, 6vw, 88px)",
              letterSpacing: "0.55em",
              textIndent: "0.55em",
              display: "block",
              lineHeight: 1,
              color: "transparent",
              // Multi-stop metallic gradient — bright highlight top, mid-tone body, dark base
              backgroundImage: `linear-gradient(
                180deg,
                #ffffff 0%,
                #e8e8e8 8%,
                #c0c0c0 20%,
                #a8a8a8 35%,
                #d4d4d4 50%,
                #888888 65%,
                #b0b0b0 80%,
                #6a6a6a 100%
              )`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              // 3D depth — offset shadow stack mimicking the logo's extruded feel
              filter: "drop-shadow(0px 1px 0px rgba(255,255,255,0.6)) drop-shadow(0px 2px 0px rgba(200,200,200,0.3)) drop-shadow(0px 3px 0px rgba(0,0,0,0.8)) drop-shadow(0px 4px 0px rgba(0,0,0,0.6)) drop-shadow(0px 6px 0px rgba(0,0,0,0.4)) drop-shadow(0px 12px 24px rgba(0,0,0,0.9))",
            }}>
              AMPARIA
            </span>

            {/* Floor reflection — fades out quickly */}
            <span style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(32px, 6vw, 88px)",
              letterSpacing: "0.55em",
              textIndent: "0.55em",
              display: "block",
              lineHeight: 1,
              color: "transparent",
              backgroundImage: "linear-gradient(180deg, rgba(160,160,160,0.18) 0%, transparent 60%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              transform: "scaleY(-0.4)",
              transformOrigin: "top center",
              marginTop: "2px",
              pointerEvents: "none",
              opacity: 0.6,
            }}>
              AMPARIA
            </span>
          </div>
        </div>

        {/* Heavy vignette — crushes edges to pure black */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
          background: "radial-gradient(ellipse 75% 70% at 50% 44%, transparent 15%, rgba(0,0,0,0.88) 100%)",
        }} />

        {/* Bottom fade into glass scroll layer */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "30%", zIndex: 6, pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent, #000)",
        }} />



        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "1px",
              height: "52px",
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ════════════════════════════════════════
          LAYER 2 — SCROLLING GLASS LAYER
          Semi-transparent: hero stays visible beneath
      ════════════════════════════════════════ */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "100vh",
          background: "rgba(0, 0, 0, 0.04)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >

        {/* ── PHONE SHOWCASE FIRST ── */}
        <PhoneShowcase lang={lang} />

        <div style={{ margin: "0 40px", height: "1px", background: "rgba(255,255,255,0.04)" }} />

        {/* ── STORY CARDS ── */}
        <section
          id="features"
          style={{ padding: "100px 40px", maxWidth: "1400px", margin: "0 auto" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "80px" }}>
            <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
            <span style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 700, fontSize: "9px", letterSpacing: "0.45em",
              color: "rgba(255,255,255,0.2)",
            }}>
              {lang === "es" ? "POR QUÉ AMPARIA" : "WHY AMPARIA"}
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
          }}>
            <StoryCard lang={lang} id="alert" />
            <StoryCard lang={lang} id="setup" />
            <StoryCard lang={lang} id="cost" />
            <StoryCard lang={lang} id="evidence" />
          </div>
        </section>

        <div style={{ margin: "0 40px", height: "1px", background: "rgba(255,255,255,0.04)" }} />

        {/* ── SECTION B: WAITLIST FORM ── */}
        <section
          id="waitlist"
          style={{ padding: "120px 40px 160px", maxWidth: "860px", margin: "0 auto" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "56px" }}>
            <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
            <span
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700,
                fontSize: "9px",
                letterSpacing: "0.45em",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              {lang === "es" ? "LISTA DE ESPERA" : "WAITLIST"}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(40px, 9vw, 110px)",
              letterSpacing: "-0.04em",
              color: "#fff",
              lineHeight: 0.9,
              marginBottom: "36px",
            }}
          >
            {t.waitlistTitle}
          </h2>

          <p
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.28)",
              lineHeight: 2.2,
              maxWidth: "400px",
              marginBottom: "72px",
            }}
          >
            {t.waitlistSub}
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "40px",
                background: "rgba(0,0,0,0.8)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 900,
                  fontSize: "12px",
                  letterSpacing: "0.3em",
                  color: "#fff",
                }}
              >
                {lang === "es" ? "✓ SOLICITUD RECIBIDA." : "✓ REQUEST RECEIVED."}
              </p>
              <p
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.28)",
                  marginTop: "12px",
                }}
              >
                {lang === "es" ? "TE CONTACTAREMOS PRONTO." : "WE'LL BE IN TOUCH."}
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.5)",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  padding: "26px 32px",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                  minWidth: 0,
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ background: "#fff", color: "#000" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#fff",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 900,
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  padding: "26px 36px",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {t.submitBtn}
              </motion.button>
            </form>
          )}
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            padding: "32px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 900,
              fontSize: "11px",
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.15)",
            }}
          >
            AMPARIA
          </span>
          <span
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.1)",
            }}
          >
            © 2025 AMPARIA.{" "}
            {lang === "es" ? "TODOS LOS DERECHOS RESERVADOS." : "ALL RIGHTS RESERVED."}
          </span>
        </footer>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   FEATURE MONOLITH COMPONENT
════════════════════════════════════════ */
const AMBER = "#D4863A";
const RED = "#E8423A";

const storyData = {
  alert: {
    es: {
      tag: "DETECCIÓN",
      headline: ["EL PRIMER AVISO", "EN 3 SEGUNDOS."],
      sub: "Mientras otros sistemas tardan minutos, AMPARIA detecta, clasifica y alerta en tiempo real.",
      punch: ["Los okupas necesitan", "48 HORAS", "para cambiar la cerradura."],
      stat: "3 SEG", statLabel: "TIEMPO DE REACCIÓN",
    },
    en: {
      tag: "DETECTION",
      headline: ["FIRST ALERT", "IN 3 SECONDS."],
      sub: "While other systems take minutes, AMPARIA detects, classifies and alerts in real time.",
      punch: ["Squatters need", "48 HOURS", "to change the lock."],
      stat: "3 SEC", statLabel: "REACTION TIME",
    },
  },
  setup: {
    es: {
      tag: "INSTALACIÓN",
      headline: ["ENCHUFA.", "LISTO."],
      sub: "Sin obras. Sin técnicos. Sin configuraciones imposibles. Otros sistemas requieren instalación profesional y semanas de configuración.",
      punch: ["Otros sistemas:", "INSTALACIÓN PROFESIONAL REQUERIDA"],
      stat: "5 MIN", statLabel: "INSTALACIÓN COMPLETA",
    },
    en: {
      tag: "SETUP",
      headline: ["PLUG IN.", "DONE."],
      sub: "No drilling. No technicians. No impossible configs. Other systems require professional installation and weeks of setup.",
      punch: ["Competitors:", "PROFESSIONAL SETUP REQUIRED"],
      stat: "5 MIN", statLabel: "FULL SETUP",
    },
  },
  cost: {
    es: {
      tag: "COSTE REAL",
      headline: ["€4.99/MES.", "VS. €2.500."],
      sub: "El coste medio de honorarios legales por un caso de okupa supera los €2.500. Sin garantías de éxito.",
      punch: ["Honorarios legales promedio:", "€1.250–€2.500", "por caso. Sin garantías."],
      stat: "€4.99", statLabel: "AL MES — BÁSICO",
    },
    en: {
      tag: "REAL COST",
      headline: ["€4.99/MO.", "VS. €2,500."],
      sub: "Average legal fees per squatter case in Spain exceed €2,500. With no guarantee of success.",
      punch: ["Average legal fees:", "€1,250–€2,500", "per case. No guarantees."],
      stat: "€4.99", statLabel: "PER MONTH — BASIC",
    },
  },
  evidence: {
    es: {
      tag: "EVIDENCIA LEGAL",
      headline: ["UN CLIC.", "JUICIO GANADO."],
      sub: "Exporta un paquete forense completo en segundos. Tu abogado lo tiene todo.",
      punch: ["Incluye:", "HASH SHA-256 · TIMESTAMP NTP · COORDENADAS GPS"],
      stat: "100%", statLabel: "ADMISIBLE EN TRIBUNAL",
    },
    en: {
      tag: "LEGAL EVIDENCE",
      headline: ["ONE CLICK.", "CASE CLOSED."],
      sub: "Export a complete forensic bundle in seconds. Your lawyer has everything they need.",
      punch: ["Includes:", "SHA-256 HASH · NTP TIMESTAMP · GPS COORDINATES"],
      stat: "100%", statLabel: "COURT ADMISSIBLE",
    },
  },
};

function StoryCard({ lang, id }) {
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
      {/* Animated background glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: bgGlow,
        }}
      />

      {/* Animated SVG visual */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {id === "alert" && <AlertStoryVisual hovered={hovered} />}
        {id === "setup" && <SetupStoryVisual hovered={hovered} />}
        {id === "cost" && <CostStoryVisual hovered={hovered} />}
        {id === "evidence" && <EvidenceStoryVisual hovered={hovered} />}
      </div>

      {/* Top content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Tag */}
        <span style={{
          fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          fontWeight: 700, fontSize: "9px", letterSpacing: "0.5em",
          color: accentColor, display: "block", marginBottom: "28px",
        }}>
          {data.tag}
        </span>

        {/* Headline */}
        <div style={{ marginBottom: "20px" }}>
          {data.headline.map((line, i) => (
            <div key={i} style={{
              fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(24px, 3.2vw, 38px)",
              letterSpacing: "-0.02em",
              color: "#fff",
              lineHeight: 1.05,
            }}>{line}</div>
          ))}
        </div>

        {/* Sub text */}
        <p style={{
          fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          fontWeight: 400, fontSize: "11px", letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.3)", lineHeight: 1.9,
          maxWidth: "260px", margin: 0,
        }}>
          {data.sub}
        </p>
      </div>

      {/* Bottom content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Punch line */}
        <div style={{
          borderLeft: `2px solid ${accentColor}`,
          paddingLeft: "16px",
          marginBottom: "28px",
        }}>
          <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontWeight: 500, fontSize: "9px", letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.3)", marginBottom: "4px",
          }}>
            {data.punch[0]}
          </div>
          <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontWeight: 900, fontSize: "clamp(11px, 1.4vw, 14px)",
            letterSpacing: "0.15em", color: accentColor,
            lineHeight: 1.4,
          }}>
            {data.punch[1]}
          </div>
          {data.punch[2] && (
            <div style={{
              fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              fontWeight: 400, fontSize: "9px", letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.25)", marginTop: "2px",
            }}>
              {data.punch[2]}
            </div>
          )}
        </div>

        {/* Stat */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "20px" }}>
          <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.04em",
            color: "#fff", lineHeight: 1,
          }}>
            {data.stat}
          </div>
          <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontWeight: 600, fontSize: "9px", letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.2)", marginTop: "6px",
          }}>
            {data.statLabel}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── STORY CARD SVG ANIMATIONS ── */

function AlertStoryVisual({ hovered }) {
  return (
    <svg viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", opacity: hovered ? 0.2 : 0.07, transition: "opacity 0.6s" }}>
      {[40,70,100,130].map((r,i) => (
        <circle key={i} cx="150" cy="220" r={r} fill="none"
          stroke={i===0?"#D4863A":"white"} strokeWidth={i===0?"1.2":"0.4"} opacity={1-i*0.2} />
      ))}
      <circle cx="150" cy="220" r="6" fill="#D4863A" opacity="0.9" />
      <circle cx="150" cy="220" r="2" fill="black" />
      <line x1="150" y1="90" x2="150" y2="110" stroke="#D4863A" strokeWidth="1" opacity="0.6" />
      <line x1="80" y1="130" x2="92" y2="142" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <line x1="220" y1="130" x2="208" y2="142" stroke="white" strokeWidth="0.5" opacity="0.3" />
      {[380,398,416,434,452].map((y,i) => (
        <line key={i} x1="60" y1={y} x2="240" y2={y} stroke="white" strokeWidth="0.3" opacity={0.08+i*0.02} />
      ))}
    </svg>
  );
}

function SetupStoryVisual({ hovered }) {
  return (
    <svg viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", opacity: hovered ? 0.18 : 0.07, transition: "opacity 0.6s" }}>
      {/* Amparia device outline */}
      <rect x="105" y="100" width="90" height="130" rx="8"
        fill="none" stroke="#D4863A" strokeWidth="1.2" />
      <rect x="120" y="115" width="60" height="40" rx="2"
        fill="none" stroke="white" strokeWidth="0.4" opacity="0.4" />
      <circle cx="150" cy="195" r="12" fill="none" stroke="white" strokeWidth="0.6" opacity="0.5" />
      <circle cx="150" cy="195" r="5" fill="white" opacity="0.3" />
      {/* Plug */}
      <line x1="150" y1="230" x2="150" y2="260" stroke="#D4863A" strokeWidth="1.5" opacity="0.7" />
      <line x1="135" y1="260" x2="165" y2="260" stroke="#D4863A" strokeWidth="1.5" opacity="0.7" />
      {/* Checkmark */}
      <path d="M125,310 L142,328 L178,295" fill="none" stroke="#D4863A" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      {/* Competitor crosses */}
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
    <svg viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", opacity: hovered ? 0.2 : 0.08, transition: "opacity 0.6s" }}>
      {/* Scale/balance icon */}
      <line x1="150" y1="100" x2="150" y2="200" stroke="white" strokeWidth="0.8" opacity="0.4" />
      <line x1="80" y1="160" x2="220" y2="160" stroke="white" strokeWidth="0.8" opacity="0.4" />
      {/* Left pan — heavy, dropped (legal fees) */}
      <line x1="80" y1="160" x2="80" y2="210" stroke="#E8423A" strokeWidth="0.6" opacity="0.6" />
      <rect x="55" y="210" width="50" height="30" rx="2" fill="none" stroke="#E8423A" strokeWidth="1" opacity="0.7" />
      {/* Right pan — light, raised (Amparia) */}
      <line x1="220" y1="160" x2="220" y2="175" stroke="#D4863A" strokeWidth="0.6" opacity="0.6" />
      <rect x="195" y="175" width="50" height="20" rx="2" fill="none" stroke="#D4863A" strokeWidth="1" opacity="0.7" />
      {/* Bar chart comparison */}
      <rect x="80" y="320" width="40" height="140" rx="1" fill="#E8423A" opacity="0.18" />
      <rect x="80" y="320" width="40" height="140" rx="1" fill="none" stroke="#E8423A" strokeWidth="0.8" opacity="0.5" />
      <rect x="175" y="430" width="40" height="30" rx="1" fill="#D4863A" opacity="0.25" />
      <rect x="175" y="430" width="40" height="30" rx="1" fill="none" stroke="#D4863A" strokeWidth="0.8" opacity="0.6" />
      {/* Baseline */}
      <line x1="60" y1="460" x2="240" y2="460" stroke="white" strokeWidth="0.4" opacity="0.2" />
    </svg>
  );
}

function EvidenceStoryVisual({ hovered }) {
  return (
    <svg viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", opacity: hovered ? 0.2 : 0.08, transition: "opacity 0.6s" }}>
      {/* Document */}
      <rect x="95" y="90" width="110" height="140" rx="3"
        fill="none" stroke="#D4863A" strokeWidth="1.2" />
      <line x1="115" y1="125" x2="185" y2="125" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="115" y1="143" x2="185" y2="143" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <line x1="115" y1="161" x2="165" y2="161" stroke="white" strokeWidth="0.5" opacity="0.2" />
      {/* Hash text simulation */}
      <rect x="115" y="178" width="70" height="8" rx="1" fill="white" opacity="0.12" />
      <rect x="115" y="193" width="55" height="8" rx="1" fill="white" opacity="0.08" />
      {/* Seal/stamp */}
      <circle cx="175" cy="208" r="16" fill="none" stroke="#D4863A" strokeWidth="1" opacity="0.8" />
      <path d="M167,208 L173,214 L184,202" fill="none" stroke="#D4863A" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
      {/* SHA label */}
      <rect x="85" y="270" width="130" height="22" rx="2"
        fill="none" stroke="rgba(212,134,58,0.4)" strokeWidth="0.8" />
      {/* Download arrow */}
      <line x1="150" y1="330" x2="150" y2="380" stroke="#D4863A" strokeWidth="1.5" opacity="0.7" />
      <path d="M135,365 L150,382 L165,365" fill="none" stroke="#D4863A" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* Court gavel silhouette — simplified */}
      <rect x="100" y="410" width="60" height="16" rx="4" fill="none" stroke="white" strokeWidth="0.6" opacity="0.3" />
      <line x1="155" y1="418" x2="200" y2="440" stroke="white" strokeWidth="1.2" opacity="0.25" />
      <rect x="192" y="436" width="28" height="8" rx="2" fill="none" stroke="white" strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

/* ════════════════════════════════════════
   OLD FEATURE MONOLITH — kept for reference
════════════════════════════════════════ */
function FeatureMonolith({ number, title, desc, accentLabel, accentValue, visual }) {
  return null; // replaced by StoryCard
}
function AIVisual() { return null; }
function AlertVisual() { return null; }
function CommandVisual() { return null; }
