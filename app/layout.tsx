import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "AMPARIA — Vigilancia Inteligente",
  description:
    "El primer aviso llega en 3 segundos. AMPARIA protege tu patrimonio con IA.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ background: "#000", margin: 0 }}>{children}</body>
    </html>
  );
}
