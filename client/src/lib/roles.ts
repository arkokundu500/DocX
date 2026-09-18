export type DocxRole = "user" | "admin" | "hospital_authority" | "doctor";

export const roleLabels: Record<DocxRole, string> = {
  user: "Patient",
  admin: "Admin",
  hospital_authority: "Hospital authority",
  doctor: "Doctor",
};

/** Where each role lands after sign-in. */
export function roleHome(role?: string | null): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "hospital_authority":
      return "/hospital-admin";
    case "doctor":
      return "/doctor-admin";
    default:
      return "/dashboard";
  }
}
