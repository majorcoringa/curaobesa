import type { Metadata } from "next";
import { Alegreya } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-alegreya",
});

export const metadata: Metadata = {
  title: "CuraObesa",
  description: "7 Rituais da Cura para Acabar com a Obesidade",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased", alegreya.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
