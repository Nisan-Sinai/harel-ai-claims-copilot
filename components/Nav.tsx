"use client";
import Link from "next/link";
import { Languages, Menu, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

export function Nav(){
  const [en,setEn]=useState(false);
  const [open,setOpen]=useState(false);

  useEffect(()=>{
    const saved=localStorage.getItem("claims-locale")==="en";
    document.documentElement.lang=saved?"en":"he";
    document.documentElement.dir=saved?"ltr":"rtl";
    const timer=window.setTimeout(()=>setEn(saved),0);
    return ()=>window.clearTimeout(timer);
  },[]);

  function toggle(){
    const next=!en;
    setEn(next);
    localStorage.setItem("claims-locale",next?"en":"he");
    document.documentElement.lang=next?"en":"he";
    document.documentElement.dir=next?"ltr":"rtl";
    window.dispatchEvent(new CustomEvent("claims-locale",{detail:next?"en":"he"}));
  }

  return <>
    <div className="utility-bar"><div><span>{en?"Insurance company digital services":"השירותים הדיגיטליים של חברת הביטוח"}</span><span className="utility-dot">•</span><span>{en?"24/7 digital claims":"תביעות דיגיטליות 24/7"}</span></div><div><ShieldCheck size={14}/><span>{en?"Secure service":"שירות מאובטח"}</span></div></div>
    <header className="nav insurance-nav">
      <Link className="brand insurance-brand" href="/" aria-label={en?"Insurance Company home":"דף הבית חברת ביטוח"}><span className="brand-symbol">ב</span><span><b>{en?"Insurance Company":"חברת ביטוח"}</b><small>{en?"Protection. Service. Innovation.":"הגנה · שירות · חדשנות"}</small></span></Link>
      <button className="mobile-menu" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={en?"Open menu":"פתח תפריט"}><Menu size={22}/></button>
      <nav className={open?"main-menu open":"main-menu"} aria-label={en?"Main navigation":"ניווט ראשי"}>
        <Link href="/#products">{en?"Insurance":"ביטוחים"}</Link>
        <Link href="/#demo">{en?"Claims":"תביעות"}</Link>
        <Link href="/dashboard">{en?"Claims center":"מרכז תביעות"}</Link>
        <Link href="/architecture">{en?"Technology":"טכנולוגיה"}</Link>
        <Link href="/privacy">{en?"Service":"שירות ומידע"}</Link>
      </nav>
      <div className="nav-actions"><button className="nav-tool" onClick={toggle}><Languages size={16}/>{en?"עברית":"EN"}</button><Link className="personal-area" href="/dashboard"><UserRound size={17}/>{en?"Personal area":"אזור אישי"}</Link></div>
    </header>
  </>
}
