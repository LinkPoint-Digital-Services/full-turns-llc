import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ReactQueryProvider} from "@/lib/provider/ReactQueryProvider";
import {Toaster} from "sonner";
import {ogImage, siteName, siteTagline, siteUrl} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteTagline,
  openGraph: {
    title: siteName,
    description: siteTagline,
    url: "/",
    siteName,
    images: [
      {
        url: ogImage,
        alt: `${siteName} logo`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteTagline,
    images: [ogImage],
  },
  icons: {
    icon: [
      {
        url: "/assets/images/homepage/logo_for_darks.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/images/homepage/logo_for_darks.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/images/homepage/logo_for_darks.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900 dark:bg-black dark:text-slate-50`}
      >
        <ReactQueryProvider>
          {/* <DesktopOnlyCursor /> */}
          {children}
          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
