"use client";
import { useEffect,useMemo,useState } from "react";
import { Activity,CheckCircle2,Clock3,Database,RefreshCw } from "lucide-react";
import Link from "next/link";
import type { ClaimRecord } from "@/lib/types";

export function DashboardClient(){
  const[claims,setClaims]=useState<ClaimRecord[]>([]);
  const[mode,setMode]=useState("loading");
  const[loading,setLoading]=useState(true);

  async function fetchClaims(){
    const res=await fetch("/api/claims",{cache:"no-store"});
    const data=await res.json();
    setClaims(data.claims??[]);
    setMode(data.mode??"unknown");
    setLoading(false);
  }

  async function refresh(){
    setLoading(true);
    await fetchClaims();
  }

  useEffect(()=>{
    let active=true;
    void fetch("/api/claims",{cache:"no-store"})
      .then(res=>res.json())
      .then(data=>{
        if(!active)return;
        setClaims(data.claims??[]);
        setMode(data.mode??"unknown");
        setLoading(false);
      })
      .catch(()=>{
        if(!active)return;
        setMode("error");
        setLoading(false);
      });
    return()=>{active=false};
  },[]);

  const stats=useMemo(()=>({total:claims.length,review:claims.filter(c=>c.status==="needs_review").length,approved:claims.filter(c=>c.status==="approved").length}),[claims]);
  return <><div className="stats-grid"><div className="glass stat"><Database/><small>Total claims</small><strong>{stats.total}</strong></div><div className="glass stat"><Clock3/><small>Needs review</small><strong>{stats.review}</strong></div><div className="glass stat"><CheckCircle2/><small>Approved</small><strong>{stats.approved}</strong></div><div className="glass stat"><Activity/><small>Storage</small><strong className="small-value">{mode}</strong></div></div><div className="glass table-card"><div className="table-title"><div><span className="eyebrow">Operations</span><h2>Recent claims</h2></div><button className="ghost" onClick={refresh} disabled={loading}><RefreshCw size={16}/>Refresh</button></div>{loading?<p className="muted">Loading…</p>:claims.length===0?<div className="empty-table"><Database size={32}/><p>No persisted claims yet. Configure Supabase, run the migration, then analyze a claim.</p></div>:<div className="table-wrap"><table><thead><tr><th>Created</th><th>Type</th><th>Severity</th><th>Status</th><th>Confidence</th><th>Summary</th><th></th></tr></thead><tbody>{claims.map(c=><tr key={c.id}><td>{new Date(c.created_at).toLocaleString()}</td><td>{c.analysis.claimType}</td><td><span className={`severity ${c.analysis.severity}`}>{c.analysis.severity}</span></td><td>{c.status}</td><td>{Math.round(c.analysis.confidence*100)}%</td><td>{c.analysis.summary}</td><td><Link className="review-link" href={`/claims/${c.id}`}>Review</Link></td></tr>)}</tbody></table></div>}</div></>;
}
