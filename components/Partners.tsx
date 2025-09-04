// Partners component removed intentionally. Keeping a no-op export to avoid import breaks.
export type Partner = { name: string; src: string; href?: string; width?: number; height?: number; alt?: string };

export default function Partners(_: { title?: string; subtitle?: string; items?: Partner[]; className?: string; compact?: boolean }) {
  return null;
}
