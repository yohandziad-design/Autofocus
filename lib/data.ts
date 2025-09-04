import type { Formula, Vehicle } from "@/types/booking";

export const VEHICLES: { key: Vehicle; label: string; note?: string }[] = [
  { key: "citadine", label: "Citadine / Compacte" },
  { key: "berline", label: "Berline" },
  { key: "suv", label: "SUV / 4x4" },
  { key: "utilitaire", label: "Utilitaire / Monospace" },
];

export const FORMULAS: {
  key: Formula;
  label: string;
  price: number;
  features: string[];
}[] = [
  {
    key: "interieur",
    label: "Intérieur",
    price: 50,
    features: [
      "Aspiration complète",
      "Textiles & plastiques nettoyés",
      "Vitres intérieures",
    ],
  },
  {
    key: "exterieur",
    label: "Extérieur",
    price: 50,
    features: [
      "Pré-lavage + lavage mains",
      "Jantes & pneus",
      "Vitres extérieures",
    ],
  },
  {
    key: "complet",
    label: "Complet + Photos",
    price: 130,
    features: [
      "Formule intérieure + extérieure",
      "Finition & protection légère",
      "Photos pro du véhicule",
    ],
  },
];

export const SLOTS = [
  "09:00 – 11:00",
  "11:00 – 13:00",
  "14:00 – 16:00",
  "16:00 – 18:00",
];
