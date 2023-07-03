import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/theme-provider";
import Navbar from "~/components/navbar";
import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/OpenSans-SemiBold.ttf",
  variable: "--font-heading",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Graduation", "Bridgerland Technical College", "BTECH"],
  authors: [
    {
      name: "Bridgerland Technical College",
      url: "https://btech.edu",
    },
  ],
  creator: "Keveren, Keenen, and RATIU5",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default async function RootLayout({
  Component,
  children,
  pageProps: { session, ...pageProps },
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-gray-800 antialiased dark:bg-gray-900 dark:text-gray-100",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider session={session}>
            <Navbar />
            <div>{children}</div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
