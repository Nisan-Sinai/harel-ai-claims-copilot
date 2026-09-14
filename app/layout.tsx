import type { Metadata } from "next";
import "./globals.css";
import "./insurance.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "חברת ביטוח | שירות ותביעות דיגיטליות",
  description: "חוויית חברת ביטוח דיגיטלית עם ניהול תביעות חכם, AI מסייע ובקרה אנושית.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl"><body><a className="skip-link" href="#main-content">דלג לתוכן הראשי</a><Nav/><main id="main-content" tabIndex={-1}>{children}</main><footer className="insurance-footer"><div><b>חברת ביטוח</b><span>הדגמת מועמד · מידע פיקטיבי בלבד · AI מסייע, אדם מחליט</span></div><nav aria-label="קישורי מדיניות"><a href="/privacy">מדיניות פרטיות</a><a href="/accessibility">הצהרת נגישות</a><a href="/architecture">טכנולוגיה</a></nav></footer></body></html>;
}
