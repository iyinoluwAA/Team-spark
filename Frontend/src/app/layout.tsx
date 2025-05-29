import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const interVariable = localFont({
  src: "../../public/assets/fonts/InterVariable.woff2",
  display: "swap",
  variable: "--font-inter",
});

const openRunde = localFont({
  src: [
    {
      path: "../../public/assets/fonts/openrunde/Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/openrunde/Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/openrunde/Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/openrunde/Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-openrunde",
});

export const metadata: Metadata = {
  title: "EmotiChat",
  description: "Your Personal AI Companion for Emotional Well-being.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interVariable.variable} ${openRunde.variable}`}
    >
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
