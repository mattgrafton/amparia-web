import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMPARIA",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  description: "LOS QUE PROTEGEN LO QUE OTROS NO PUEDEN PERDER",
  metadataBase: new URL("https://www.amparia.app"),
  openGraph: {
    title: "AMPARIA",
    description: "LOS QUE PROTEGEN LO QUE OTROS NO PUEDEN PERDER",
    url: "https://www.amparia.app",
    siteName: "AMPARIA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AMPARIA — Vigilancia Inteligente",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMPARIA",
    description: "LOS QUE PROTEGEN LO QUE OTROS NO PUEDEN PERDER",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" as="image" href="/cement.jpg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" as="image" href="/amparia-icon.png" />
        <link rel="preload" as="image" href="/IMG_4680.png" />
        <link rel="preload" as="image" href="/IMG_4681.png" />
        <link rel="preload" as="image" href="/IMG_4682.png" />
        <script dangerouslySetInnerHTML={{ __html: "if (history.scrollRestoration) history.scrollRestoration = \"manual\";" }} />
      </head>
      <body style={{ background: "#000", margin: 0 }}>{children}</body>
    </html>
  );
}
