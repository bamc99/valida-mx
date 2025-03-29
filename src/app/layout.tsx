import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
  title: "Valida MX - Valida tu RFC y CURP fácilmente",
  description: "Valida MX es una herramienta rápida y sencilla para validar RFC y CURP en México. Creada en una hora con la ayuda de inteligencia artificial como práctica de desarrollo web.",
  keywords: ["RFC", "CURP", "validación RFC", "validación CURP", "IA", "inteligencia artificial", "práctica", "desarrollo web", "Next.js", "React", "TypeScript", "Vercel", "validación México"],
  icons: {
    icon: "/favicon-vmx.svg", // Aquí va tu favicon
  },
  openGraph: {
    title: "Valida MX - Valida tu RFC y CURP",
    description: "Verifica tu RFC y CURP de manera fácil y rápida con Valida MX, una herramienta creada como práctica con inteligencia artificial.",
    url: "https://valida-mx.axol.dev", // URL de tu proyecto
    type: "website",
    images: [
      {
        url: "/seo-validamx.jpg", // Ruta de una imagen representativa para las redes sociales
        width: 1200,
        height: 630,
        alt: "Valida MX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valida MX - Valida tu RFC y CURP",
    description: "Verifica tu RFC y CURP de manera fácil y rápida con Valida MX, creada en una hora con la ayuda de inteligencia artificial.",
    images: ["/seo-validamx.jpg"], // Ruta de una imagen representativa para Twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
