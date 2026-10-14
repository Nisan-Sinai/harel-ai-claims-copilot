import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./insurance.css";
import { Nav } from "@/components/Nav";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";

export const metadata: Metadata = {
  title: "חברת ביטוח | שירות ותביעות דיגיטליות",
  description: "חוויית חברת ביטוח דיגיטלית עם ניהול תביעות חכם, AI מסייע ובקרה אנושית.",
  applicationName: "חברת ביטוח",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" }],
  },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "חברת ביטוח" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#073968",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl"><body><ServiceWorkerRegistrar/><a className="skip-link" href="#main-content">דלג לתוכן הראשי</a><Nav/><main id="main-content" tabIndex={-1}>{children}</main><footer className="insurance-footer"><div><b>חברת ביטוח</b><span>הדגמת מועמד · מידע פיקטיבי בלבד · AI מסייע, אדם מחליט</span></div><nav aria-label="קישורי מדיניות"><a href="/privacy">מדיניות פרטיות</a><a href="/accessibility">הצהרת נגישות</a><a href="/architecture">טכנולוגיה</a></nav></footer></body></html>;
}
