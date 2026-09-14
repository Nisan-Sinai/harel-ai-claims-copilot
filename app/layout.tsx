import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = { title: "Claims Copilot | AI Insurance Intake Demo", description: "Full-stack AI insurance claims intake demo with human-in-the-loop review, structured extraction and Supabase persistence." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><div className="orb orb-one"/><div className="orb orb-two"/><Nav/><main>{children}</main><footer>Candidate Demo – Not affiliated with Harel · Fictional data only · No coverage, liability or payout decisions.</footer></body></html>; }
