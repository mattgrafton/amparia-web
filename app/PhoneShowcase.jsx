"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

function PhoneTiltCard({ image, label, badge, isTouch }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 28, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-30%", "130%"]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["-30%", "130%"]), springConfig);
  const shadowX = useTransform(mouseX, [-0.5, 0.5], ["-12px", "12px"]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], ["-8px", "20px"]);

  function handleMouseMove(e) {
    if (isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() { mouseX.set(0); mouseY.set(0); }

  const phoneFrame = (
    <div style={{
      position: "relative", borderRadius: "44px",
      border: "1px solid rgba(255,255,255,0.12)", background: "#0a0a0a",
      overflow: "hidden",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(0,0,0,0.8), 0 32px 80px rgba(0,0,0,0.6)",
    }}>
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
        loading="eager"
        style={{ width: "100%", display: "block", userSelect: "none", borderRadius: "44px" }}
      />
      {!isTouch && (
        <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "44px", overflow: "hidden", mixBlendMode: "screen" }}>
          <motion.div style={{
            position: "absolute", width: "140%", height: "140%",
            top: glareY, left: glareX,
            background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)", pointerEvents: "none",
          }} />
        </motion.div>
      )}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "44px",
        background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
        pointerEvents: "none",
      }} />
      {badge && (
        <div style={{
          position: "absolute", top: "20px", right: "20px",
          background: "rgba(0,0,0,0.88)",
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
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      {isTouch ? (
        <div style={{ width: "243px" }}>{phoneFrame}</div>
      ) : (
        <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ cursor: "default" }}>
          <motion.div
            style={{ position: "relative", width: "243px" }}
            whileHover={{ scale: 1.03 }}
            transition={{ scale: { type: "spring", stiffness: 200, damping: 25 } }}
          >
            <div style={{ position: "absolute", inset: "20px -8px -28px", borderRadius: "44px", background: "rgba(0,0,0,0.55)", boxShadow: "0 28px 60px rgba(0,0,0,0.7)", zIndex: -1 }} />
            {phoneFrame}
          </motion.div>
        </div>
      )}
      {label && (
        <p style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
          {label}
        </p>
      )}
    </div>
  );
}

export default function PhoneShowcase({ lang = "es" }) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const screens = [
    { image: "/IMG_4682.png", label: lang === "es" ? "Dashboard"   : "Dashboard",  badge: lang === "es" ? "NUEVO" : "NEW" },
    { image: "/IMG_4680.png", label: lang === "es" ? "Alertas"     : "Alerts",     badge: "LIVE"                          },
    { image: "/IMG_4681.png", label: lang === "es" ? "Propiedades" : "Properties"                                         },
  ];

  return (
    <section style={{
      padding: "220px 40px 160px",
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: "120px",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        .dim-label { color: rgba(255,255,255,0.45) !important; }

        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0px) rotate(var(--phone-rotate, 0deg)); }
          50%       { transform: translateY(-12px) rotate(var(--phone-rotate, 0deg)); }
        }
        .phone-float-0 { --phone-rotate: -3deg; animation: phoneFloat 5.5s ease-in-out infinite; }
        .phone-float-1 { --phone-rotate:  0deg; animation: phoneFloat 5.5s ease-in-out infinite; animation-delay: 0.7s; }
        .phone-float-2 { --phone-rotate:  3deg; animation: phoneFloat 5.5s ease-in-out infinite; animation-delay: 1.4s; }

        @keyframes phoneTilt {
          0%, 100% { transform: rotateY(-4deg); }
          50%       { transform: rotateY(4deg); }
        }

        /* Mobile: stack vertically, tilt animation */
        @media (max-width: 640px) {
          .phones-row { flex-direction: column !important; align-items: center !important; gap: 52px !important; }
          .phone-float-0,
          .phone-float-1,
          .phone-float-2 { margin-bottom: 0 !important; animation: phoneTilt 9s ease-in-out infinite !important; }
          .phone-float-1 { animation-delay: 1.5s !important; }
          .phone-float-2 { animation-delay: 3s !important; }
        }

        /* iPad only — same as mobile: stack vertically, tilt animation */
        @media (min-width: 641px) and (max-width: 1024px) {
          .phones-row { flex-direction: column !important; align-items: center !important; gap: 64px !important; }
          .phone-float-0,
          .phone-float-1,
          .phone-float-2 { margin-bottom: 0 !important; animation: phoneTilt 9s ease-in-out infinite !important; }
          .phone-float-1 { animation-delay: 1.5s !important; }
          .phone-float-2 { animation-delay: 3s !important; }
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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

      <div className="phones-row" style={{
        display: "flex", alignItems: "flex-end",
        gap: "clamp(16px, 4vw, 48px)",
        flexWrap: "nowrap", justifyContent: "center",
      }}>
        {screens.map((screen, i) => (
          <motion.div
            key={screen.image}
            initial={{ opacity: 1, y: 0 }}
            className={`phone-float-${i}`}
            style={{ marginBottom: i === 1 && !isTouch ? "40px" : "0px" }}
          >
            <PhoneTiltCard
              image={screen.image}
              label={screen.label}
              badge={screen.badge}
              isTouch={isTouch}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
