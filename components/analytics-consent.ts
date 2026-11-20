export const cookieName = "ntombii_cookie_choice";
export const consentEvent = "ntombii:consent-changed";
export type AnalyticsChoice = "essential" | "analytics";

export function readAnalyticsChoice(): AnalyticsChoice | null {
  if (typeof document === "undefined") return null;
  try {
    const value = document.cookie.split(";").map(part => part.trim())
      .find(part => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
    // An old marketing preference did not specifically grant analytics consent.
    return value === "essential" || value === "analytics" ? value : null;
  } catch {
    return null;
  }
}
