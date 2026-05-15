"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: true, detectSessionInUrl: true } }
    );

    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash");
    const type = params.get("type");

    if (tokenHash && type === "recovery") {
      supabase.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" })
        .then(({ data, error }) => {
          if (error || !data.session) {
            setMessage("Enlace inválido o expirado. Solicita uno nuevo.");
            setStatus("error");
          } else {
            setReady(true);
          }
        });
    } else {
      setMessage("Enlace inválido.");
      setStatus("error");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Las contraseñas no coinciden.");
      setStatus("error");
      return;
    }
    if (password.length < 8) {
      setMessage("Mínimo 8 caracteres.");
      setStatus("error");
      return;
    }
    setStatus("loading");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: true, detectSessionInUrl: true } }
    );

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      <span style={{
        color: "#fff",
        fontWeight: 900,
        fontSize: "13px",
        letterSpacing: "0.4em",
        marginBottom: "60px",
      }}>AMPARIA</span>

      {status === "success" ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: "24px", letterSpacing: "-0.02em", marginBottom: "16px" }}>
            CONTRASEÑA ACTUALIZADA
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "0.2em" }}>
            YA PUEDES CERRAR ESTA VENTANA
          </p>
        </div>
      ) : status === "error" && !ready ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#E8423A", fontWeight: 900, fontSize: "13px", letterSpacing: "0.3em" }}>
            {message.toUpperCase()}
          </div>
        </div>
      ) : !ready ? (
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px", letterSpacing: "0.4em" }}>
          VERIFICANDO...
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "420px",
        }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(28px, 6vw, 48px)", letterSpacing: "-0.03em", marginBottom: "48px" }}>
            NUEVA<br />CONTRASEÑA
          </div>

          <input
            type="password"
            placeholder="NUEVA CONTRASEÑA"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              background: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.25em",
              padding: "20px 0",
              outline: "none",
              marginBottom: "24px",
            }}
          />

          <input
            type="password"
            placeholder="CONFIRMAR CONTRASEÑA"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            style={{
              background: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.25em",
              padding: "20px 0",
              outline: "none",
              marginBottom: "48px",
            }}
          />

          {message && status === "error" && (
            <p style={{
              color: "#E8423A",
              fontSize: "9px",
              letterSpacing: "0.3em",
              marginBottom: "24px",
            }}>
              {message.toUpperCase()}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              background: "#fff",
              border: "none",
              color: "#000",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 900,
              fontSize: "10px",
              letterSpacing: "0.3em",
              padding: "22px 40px",
              cursor: status === "loading" ? "wait" : "pointer",
              opacity: status === "loading" ? 0.6 : 1,
            }}
          >
            {status === "loading" ? "ACTUALIZANDO..." : "ACTUALIZAR CONTRASEÑA"}
          </button>
        </form>
      )}
    </div>
  );
}
