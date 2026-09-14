import { ArrowLeft, BadgeCheck, BrainCircuit, Car, ChevronLeft, HeartPulse, Home as HomeIcon, Plane, ShieldCheck, Sparkles, Umbrella, UserRoundCheck } from "lucide-react";
import { ClaimAnalyzer } from "@/components/ClaimAnalyzer";

const products=[
  {icon:Car,title:"ביטוח רכב",text:"כיסוי מקיף, צד ג׳ ושירותים דיגיטליים לדרך."},
  {icon:HomeIcon,title:"ביטוח דירה",text:"הגנה למבנה, לתכולה ולמה שחשוב בבית."},
  {icon:HeartPulse,title:"ביטוח בריאות",text:"כלים ושירותים שמסייעים להיות מוכנים כשצריך."},
  {icon:Plane,title:"ביטוח נסיעות",text:"יוצאים לחו״ל עם מעטפת דיגיטלית זמינה מכל מקום."}
];

export default function Home(){return <>
  <section className="insurance-hero">
    <div className="insurance-hero-copy">
      <span className="insurance-kicker"><BadgeCheck size={16}/> חברת ביטוח דיגיטלית</span>
      <h1>ביטוח שמרגיש <span>פשוט, ברור ואנושי.</span></h1>
      <p>מנהלים ביטוחים, שירות ותביעות במקום אחד. כשצריך לדווח על אירוע, עוזר AI מסייע לאסוף את הפרטים בצורה מסודרת — וההחלטה נשארת בידי איש מקצוע.</p>
      <div className="hero-actions"><a className="insurance-primary" href="#demo">דיווח על תביעה <ArrowLeft size={18}/></a><a className="insurance-secondary" href="#products">לכל הביטוחים</a></div>
      <div className="insurance-trust"><span><ShieldCheck size={17}/> מידע פיקטיבי בדמו</span><span><UserRoundCheck size={17}/> בקרה אנושית</span><span><BrainCircuit size={17}/> AI מסייע בלבד</span></div>
    </div>
    <aside className="claim-shortcut" aria-label="קיצור דרך לתביעות">
      <span className="shortcut-icon"><Sparkles size={25}/></span><small>מרכז התביעות החכם</small><h2>קרה משהו?</h2><p>מתארים את האירוע במילים שלכם ומקבלים טופס מסודר לבדיקה תוך שניות.</p><a href="#demo">מתחילים דיווח <ChevronLeft size={18}/></a>
      <div className="shortcut-status"><span className="status-dot"/> השירות הדיגיטלי פעיל</div>
    </aside>
  </section>

  <section className="service-bar" aria-label="שירותים מהירים"><a href="#demo"><b>הגשת תביעה</b><span>דיווח דיגיטלי מהיר</span></a><a href="/dashboard"><b>מעקב תביעות</b><span>סטטוס והיסטוריה</span></a><a href="/privacy"><b>מידע ושירות</b><span>פרטיות ונגישות</span></a><a href="/architecture"><b>חדשנות ב‑AI</b><span>איך המערכת עובדת</span></a></section>

  <section id="products" className="products-section"><div className="section-intro"><span>הביטוחים שלנו</span><h2>מעטפת ביטוחית לחיים עצמם</h2><p>ממשק הדגמה המדמה חוויית שירות של חברת ביטוח מודרנית.</p></div><div className="product-grid">{products.map(({icon:Icon,title,text})=><article className="product-card" key={title}><span className="product-icon"><Icon size={25}/></span><h3>{title}</h3><p>{text}</p><a href="#demo">למידע נוסף <ChevronLeft size={16}/></a></article>)}</div></section>

  <section className="why-section"><div><span className="insurance-kicker">שירות דיגיטלי מתקדם</span><h2>פחות טפסים. יותר הבנה.</h2><p>המערכת מחלצת מתוך תיאור חופשי את סוג האירוע, המידע החסר, המסמכים המומלצים ורמת הדחיפות — כדי להכין את התיק לבדיקה מקצועית.</p></div><div className="why-points"><article><b>01</b><span><strong>קליטה חכמה</strong><small>טקסט חופשי הופך לנתונים מובנים</small></span></article><article><b>02</b><span><strong>בדיקת שלמות</strong><small>זיהוי מידע ומסמכים שחסרים בתיק</small></span></article><article><b>03</b><span><strong>בקרת אדם</strong><small>אין החלטת כיסוי או פיצוי אוטומטית</small></span></article></div></section>

  <section id="demo" className="demo insurance-demo"><div className="section-heading"><span className="eyebrow">מרכז התביעות הדיגיטלי</span><h2>דיווח חכם על אירוע ביטוחי</h2><p>זהו דמו בלבד. השתמשו בפרטים פיקטיביים ולא במידע אמיתי או רגיש.</p></div><ClaimAnalyzer/></section>

  <section className="insurance-note"><Umbrella size={24}/><div><b>חשוב לדעת</b><p>המערכת היא כלי עזר לקליטת תביעה ולסידור מידע. היא אינה מחליטה על כיסוי ביטוחי, אחריות, חשד להונאה או גובה פיצוי.</p></div></section>
</>}
