"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

export default function HeroLogoCard() {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 22, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]), springConfig);

  const shadowX = useTransform(mouseX, [-0.5, 0.5], ["-20px", "20px"]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], ["-10px", "30px"]);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px", display: "inline-block" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          width: "min(72vw, 72vh)",
          height: "min(72vw, 72vh)",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 25 } }}
      >
        {/* Dynamic drop shadow */}
        <motion.div
          style={{
            position: "absolute",
            inset: "40px 20px -40px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.7)",
            filter: "blur(50px)",
            x: shadowX,
            y: shadowY,
            zIndex: -1,
          }}
        />

        {/* ── Cement texture background ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "32px",
          overflow: "hidden",
          background: "#161616",
        }}>
          {/* Coarse concrete slab */}
          <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.95 }}>
            <filter id="hc-base" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.028 0.032" numOctaves="8" seed="5" stitchTiles="stitch" />
              <feColorMatrix type="matrix"
                values="0 0 0 0 0.12
                        0 0 0 0 0.12
                        0 0 0 0 0.12
                        0 0 0 0 1" />
            </filter>
            <rect width="100%" height="100%" filter="url(#hc-base)" />
          </svg>

          {/* Mid pitting */}
          <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.65, mixBlendMode: "screen" }}>
            <filter id="hc-mid" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.11 0.09" numOctaves="6" seed="12" stitchTiles="stitch" />
              <feColorMatrix type="matrix"
                values="0 0 0 0 0.18
                        0 0 0 0 0.18
                        0 0 0 0 0.18
                        0 0 0 0 1" />
            </filter>
            <rect width="100%" height="100%" filter="url(#hc-mid)" />
          </svg>

          {/* Fine surface grain */}
          <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7, mixBlendMode: "overlay" }}>
            <filter id="hc-grain" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="5" seed="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#hc-grain)" />
          </svg>

          {/* Directional light — top-right bright, bottom-left shadow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 10% 90%, rgba(0,0,0,0.6) 0%, transparent 60%)",
          }} />

          {/* Center glow — warm spotlight on logo */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 55% 55% at 50% 46%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }} />
        </div>

        {/* ── Logo image ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          transform: "translateZ(24px)", // pushes logo forward in 3D space
        }}>
          <img
            src="/amparia-logo.png"
            alt="AMPARIA"
            draggable={false}
            style={{
              width: "72%",
              height: "72%",
              objectFit: "contain",
              display: "block",
              filter: "brightness(1.1) contrast(1.08) drop-shadow(0 8px 32px rgba(0,0,0,0.9))",
              userSelect: "none",
            }}
          />
        </div>

        {/* ── Glare overlay ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "32px",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 3,
            mixBlendMode: "screen",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              width: "160%",
              height: "160%",
              top: glareY,
              left: glareX,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(ellipse 45% 35% at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* ── Card border + rim light ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "32px",
          border: "1px solid rgba(255,255,255,0.09)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)",
          pointerEvents: "none",
          zIndex: 4,
        }} />
      </motion.div>
    </div>
  );
}
