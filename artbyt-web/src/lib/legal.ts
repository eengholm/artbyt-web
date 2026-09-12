import { getGeneralSettings } from "@/lib/api";

/**
 * Legal-page markdown (terms/privacy/returns) references the seller's
 * identity via placeholders so it only has to be entered once, in the
 * general settings, and stays consistent everywhere it's shown.
 */
export function fillSellerPlaceholders(content: string): string {
  const s = getGeneralSettings();
  return content
    .replaceAll("{{businessName}}", s.businessName || "[firmanamn saknas]")
    .replaceAll("{{orgNumber}}", s.orgNumber || "[org.nr saknas]")
    .replaceAll("{{address}}", s.address || "[adress saknas]")
    .replaceAll("{{vatNumber}}", s.vatNumber || "")
    .replaceAll("{{contactEmail}}", s.contactEmail || "")
    .replaceAll("{{phoneNumber}}", s.phoneNumber || "");
}
