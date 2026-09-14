import type { ClaimAnalysis, ClaimType, Severity } from "./types";

const includes = (text: string, words: string[]) => words.some((w) => text.includes(w));

export function analyzeDemo(description: string): ClaimAnalysis {
  const text = description.toLowerCase();
  let claimType: ClaimType = "other";
  if (includes(text, ["רכב", "מכונית", "תאונה", "נהג", "road", "car"])) claimType = "vehicle";
  else if (includes(text, ["דירה", "בית", "שריפה", "הצפה", "property"])) claimType = "property";
  else if (includes(text, ["רופא", "אשפוז", "טיפול", "בריאות", "health"])) claimType = "health";
  else if (includes(text, ["טיסה", "מזוודה", "נסיעה", "חו\"ל", "travel"])) claimType = "travel";
  else if (includes(text, ["חיים", "פטירה", "life"])) claimType = "life";

  const injuries = includes(text, ["אין נפגע", "ללא נפגע"])
    ? false
    : includes(text, ["פצוע", "נפגע", "אמבולנס", "injur"])
      ? true
      : null;

  let severity: Severity = "medium";
  if (includes(text, ["אשפוז", "פצוע קשה", "מוות", "שריפה גדולה", "critical"])) severity = "critical";
  else if (injuries === true || includes(text, ["גניבה", "טוטאל", "הצפה"])) severity = "high";
  else if (includes(text, ["שריטה", "נזק קל", "קטן"])) severity = "low";

  const missingInformation: string[] = [];
  if (!/\d{1,2}[./-]\d{1,2}[./-]\d{2,4}/.test(description)) missingInformation.push("תאריך האירוע");
  if (!includes(text, ["רחוב", "כביש", "נתניה", "תל אביב", "חיפה", "ירושלים", "מיקום"])) missingInformation.push("מיקום האירוע");
  if (claimType === "vehicle" && !includes(text, ["מספר רכב", "לוחית", "נהג השני"])) missingInformation.push("פרטי הרכב/הנהג הנוסף");

  const docsByType: Record<ClaimType, string[]> = {
    vehicle: ["תמונות הנזק", "רישיון רכב", "פרטי הנהג/צד נוסף"],
    property: ["תמונות הנזק", "חשבוניות או הערכות תיקון", "מסמך בעלות/פוליסה"],
    health: ["סיכום רפואי", "קבלות", "הפניה/מרשם רלוונטי"],
    travel: ["כרטיסי טיסה", "אישורי חברת התעופה", "קבלות"],
    life: ["מסמכים רשמיים", "פרטי פוליסה", "מסמכי זיהוי"],
    other: ["מסמכים תומכים", "תמונות/אסמכתאות"]
  };

  return {
    claimType,
    severity,
    summary: description.length > 220 ? `${description.slice(0, 217)}...` : description,
    injuries,
    incidentDate: null,
    location: null,
    entities: [],
    missingInformation,
    recommendedDocuments: docsByType[claimType],
    nextAction: missingInformation.length ? "Request missing details before routing to a claims specialist" : "Route to claims specialist for human validation",
    confidence: 0.72,
    riskFlags: severity === "critical" ? ["High-severity claim requires priority human review"] : [],
    rationale: [
      `Claim classified as ${claimType} from incident context`,
      `Severity set to ${severity} based on described impact`,
      missingInformation.length ? "Missing fields detected before downstream processing" : "Core intake fields appear sufficiently complete"
    ]
  };
}
