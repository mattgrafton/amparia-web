"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

function PhoneTiltCard({ image, label, badge }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 28, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-30%", "130%"]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["-30%", "130%"]), springConfig);

  const shadowX = useTransform(mouseX, [-0.5, 0.5], ["-12px", "12px"]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], ["-8px", "20px"]);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1000px", cursor: "none" }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            position: "relative",
            width: "260px",
          }}
          whileHover={{ scale: 1.03 }}
          transition={{ scale: { type: "spring", stiffness: 200, damping: 25 } }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: "20px -8px -28px",
              borderRadius: "44px",
              background: "rgba(0,0,0,0.55)",
              filter: "blur(28px)",
              x: shadowX,
              y: shadowY,
              zIndex: -1,
            }}
          />

          <div
            style={{
              position: "relative",
              borderRadius: "44px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "#0a0a0a",
              overflow: "hidden",
              boxShadow: `
                inset 0 0 0 1px rgba(255,255,255,0.06),
                0 0 0 1px rgba(0,0,0,0.8),
                0 32px 80px rgba(0,0,0,0.6)
              `,
            }}
          >
            <div style={{ position: "absolute", left: "-1px", top: "88px",  width: "3px", height: "28px", background: "rgba(255,255,255,0.12)", borderRadius: "0 2px 2px 0" }} />
            <div style={{ position: "absolute", left: "-1px", top: "126px", width: "3px", height: "52px", background: "rgba(255,255,255,0.12)", borderRadius: "0 2px 2px 0" }} />
            <div style={{ position: "absolute", left: "-1px", top: "188px", width: "3px", height: "52px", background: "rgba(255,255,255,0.12)", borderRadius: "0 2px 2px 0" }} />
            <div style={{ position: "absolute", right: "-1px", top: "142px", width: "3px", height: "72px", background: "rgba(255,255,255,0.12)", borderRadius: "2px 0 0 2px" }} />

            <div style={{
              position: "absolute", top: "14px", left: "50%", transform: "translateX(-50%)",
              width: "88px", height: "28px", background: "#000", borderRadius: "20px",
              zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333" }} />
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#222" }} />
            </div>

            <img
              src={image}
              alt={label || "App screenshot"}
              draggable={false}
              style={{ width: "100%", display: "block", userSelect: "none", borderRadius: "44px" }}
            />

            <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "44px", overflow: "hidden", mixBlendMode: "screen" }}>
              <motion.div style={{
                position: "absolute", width: "140%", height: "140%",
                top: glareY, left: glareX,
                background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 70%)",
                transform: "translate(-50%, -50%)", pointerEvents: "none",
              }} />
            </motion.div>

            <div style={{
              position: "absolute", inset: 0, borderRadius: "44px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
              pointerEvents: "none",
            }} />

            {badge && (
              <div style={{
                position: "absolute", top: "20px", right: "20px",
                background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: "20px",
                padding: "4px 10px",
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                fontWeight: 700, fontSize: "9px", letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.8)", zIndex: 20,
              }}>
                {badge}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* FIX 3: label opacity bumped to 0.45 for readability */}
      {label && (
        <p style={{
          fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
        }}>
          {label}
        </p>
      )}
    </div>
  );
}

export default function PhoneShowcase({ lang = "es" }) {
  const screens = [
    { image: "/IMG_4680.png", label: "Alertas",      badge: "LIVE"  },
    { image: "/IMG_4682.png", label: "Dashboard",    badge: "NUEVO" },
    { image: "/IMG_4681.png", label: "Propiedades"                  },
  ];

  return (
    <section
      style={{
        padding: "220px 40px 160px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fix 1: dim-label global + Fix 2: mobile spacing + Fix 3: float animation */}
      <style>{`
        .dim-label { color: rgba(255,255,255,0.45) !important; }

        @media (max-width: 640px) {
          .phone-side   { display: none !important; }
          .phone-center { transform: none !important; }
          .showcase-label-gap { margin-bottom: 24px !important; }
        }

        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0px) rotate(var(--phone-rotate, 0deg)); }
          50%       { transform: translateY(-10px) rotate(var(--phone-rotate, 0deg)); }
        }
        .phone-float-0 {
          --phone-rotate: -3deg;
          animation: phoneFloat 5.5s ease-in-out infinite;
          animation-delay: 0s;
        }
        .phone-float-1 {
          --phone-rotate: 0deg;
          animation: phoneFloat 5.5s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        .phone-float-2 {
          --phone-rotate: 3deg;
          animation: phoneFloat 5.5s ease-in-out infinite;
          animation-delay: 1.2s;
        }
      `}</style>

      {/* Section label — FIX 3 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div className="showcase-label-gap" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
          <span className="dim-label" style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontWeight: 700, fontSize: "9px", letterSpacing: "0.45em",
            color: "rgba(255,255,255,0.2)",
          }}>
            {lang === "es" ? "LA APLICACIÓN" : "THE APP"}
          </span>
          <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
        </div>
        <h2 style={{
          fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(32px, 6vw, 72px)",
          letterSpacing: "-0.04em",
          color: "#fff",
          textAlign: "center",
          lineHeight: 0.95,
          margin: 0,
        }}>
          {lang === "es" ? "MANDO TOTAL." : "TOTAL COMMAND."}<br />
          <span style={{ color: "rgba(255,255,255,0.25)" }}>
            {lang === "es" ? "EN TU BOLSILLO." : "IN YOUR POCKET."}
          </span>
        </h2>
      </div>

      {/* 3 phones */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "clamp(16px, 4vw, 48px)",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {screens.map((screen, i) => (
          <motion.div
            key={screen.image}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`${i === 1 ? "phone-center" : "phone-side"} phone-float-${i}`}
            style={{
              marginBottom: i === 1 ? "40px" : "0px",
            }}
          >
            <PhoneTiltCard
              image={screen.image}
              label={screen.label}
              badge={screen.badge}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
