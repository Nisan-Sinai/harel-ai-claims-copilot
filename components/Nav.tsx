"use client";
import Link from "next/link";
import { BrainCircuit, Languages, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function Nav(){
  const [en,setEn]=useState(false);
  useEffect(()=>{const saved=localStorage.getItem("claims-locale")==="en";setEn(saved);document.documentElement.lang=saved?"en":"he";document.documentElement.dir=saved?"ltr":"rtl"},[]);
  function toggle(){const next=!en;setEn(next);localStorage.setItem("claims-locale",next?"en":"he");document.documentElement.lang=next?"en":"he";document.documentElement.dir=next?"ltr":"rtl";window.dispatchEvent(new CustomEvent("claims-locale",{detail:next?"en":"he"}))}
  return <header className="nav"><Link className="brand" href="/" aria-label="Insurance AI Claims Copilot"><span className="brand-mark"><BrainCircuit size={22}/></span><span><b>Claims Copilot</b><small>{en?"Insurance Company · AI workspace":"חברת ביטוח · סביבת AI"}</small></span></Link><nav aria-label={en?"Main navigation":"ניווט ראשי"}><Link href="/">{en?"Analyze":"ניתוח"}</Link><Link href="/dashboard">{en?"Dashboard":"לוח בקרה"}</Link><Link href="/architecture">{en?"Architecture":"ארכיטקטורה"}</Link><button className="nav-tool" onClick={toggle} aria-label={en?"Switch to Hebrew":"Switch to English"}><Languages size={16}/>{en?"עברית":"EN"}</button><span className="secure-pill"><ShieldCheck size={14}/>{en?"Human reviewed":"בקרת אדם"}</span></nav></header>
}
