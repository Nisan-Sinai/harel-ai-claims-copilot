import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Insurance AI Claims Copilot | Intelligent Claims Workspace",
  description: "AI-powered insurance claims intake, structured extraction, risk triage and human review workspace.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl"><body><a className="skip-link" href="#main-content">דלג לתוכן הראשי</a><div className="orb orb-one"/><div className="orb orb-two"/><Nav/><main id="main-content" tabIndex={-1}>{children}</main><footer><div><b>Insurance AI Claims Copilot</b><span>הדגמת מועמד · מידע פיקטיבי בלבד · AI מסייע, אדם מחליט</span></div><nav aria-label="קישורי מדיניות"><a href="/privacy">מדיניות פרטיות</a><a href="/accessibility">הצהרת נגישות</a><a href="/architecture">ארכיטקטורה</a></nav></footer></body></html>;
}
