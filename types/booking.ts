export type Vehicle = "citadine" | "berline" | "suv" | "utilitaire";
export type Formula = "interieur" | "exterieur" | "complet";

export interface Booking {
  vehicle: Vehicle | null;
  formula: Formula | null;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  date: string;
  slot: string;
  notes: string;
}
