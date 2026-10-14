import { renderInsuranceIcon } from "@/lib/pwa-icon";

export const dynamic = "force-static";

export function GET() {
  return renderInsuranceIcon(512);
}
