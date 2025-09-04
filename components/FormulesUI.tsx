'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// ————————————————————————————————————————————————
// Types
// ————————————————————————————————————————————————
export type FormulaId = 'interior' | 'exterior' | 'full'

export type Formula = {
  id: FormulaId
  label: string
  price: number
  bullets: string[]
  protection?: string
  duration?: string
}

// ————————————————————————————————————————————————
// Data (prix & contenus)
// ————————————————————————————————————————————————
const FORMULAS: Formula[] = [
  {
    id: 'interior',
    label: 'Intérieur',
    price: 50,
    bullets: [
      'Aspiration complète',
      'Shampoing tapis & sièges (selon matière)',
      'Plastiques: nettoyage + finition satinée',
    ],
    protection: 'Protection satinée sur plastiques',
    duration: '~2h',
  },
  {
    id: 'exterior',
    label: 'Extérieur',
    price: 50,
    bullets: [
      'Pré-lavage + mousse active',
      'Lavage contact microfibre 2 seaux',
      'Séchage + vitres + finitions pneus',
    ],
    protection: 'Spray sealant hydrophobe (1–2 mois)',
    duration: '~1h30',
  },
  {
    id: 'full',
    label: 'Complet + Photos',
    price: 130,
    bullets: [
      'Intérieur complet',
      'Extérieur complet',
      'Shooting photo de présentation (5–8 photos)',
    ],
    protection: 'Combo intérieur + spray sealant extérieur',
    duration: '~3h30',
  },
]

// A small fallback to keep TypeScript happy if FORMULAS were ever empty.
const FALLBACK_FORMULA: Formula = {
  id: 'interior',
  label: 'Intérieur',
  price: 0,
  bullets: [],
}

const FIRST_FORMULA_ID: FormulaId = FORMULAS[0]?.id ?? FALLBACK_FORMULA.id

// ————————————————————————————————————————————————
// Component
// ————————————————————————————————————————————————
interface Props {
  /** Callback lorsque l’utilisateur clique « Choisir » sur une formule. */
  onPick?: (formula: Formula) => void
  /** Id de formule présélectionnée (facultatif). */
  defaultSelected?: FormulaId
  /** Affiche le bouton « Réserver » dans la bulle (par défaut true). */
  showBubbleCta?: boolean
}

export default function FormulesUI({
  onPick,
  defaultSelected = 'interior',
  showBubbleCta = true,
}: Props) {
  // Keep `active` always a valid FormulaId to simplify logic and avoid undefined
  const [active, setActive] = useState<FormulaId>(defaultSelected ?? FIRST_FORMULA_ID)
  const [bubbleOpen, setBubbleOpen] = useState<boolean>(true)
  const tablistRef = useRef<HTMLDivElement>(null)

  // Récupère l’objet complet depuis l’id
  const activeFormula: Formula = useMemo(
    () => FORMULAS.find((f) => f.id === active) ?? FALLBACK_FORMULA,
    [active]
  )

  // Accessibilité clavier (flèches gauche/droite pour naviguer)
  useEffect(() => {
    const el = tablistRef.current
    if (!el) return
    const handler = (e: KeyboardEvent) => {
      const ids: FormulaId[] = FORMULAS.map((f) => f.id) as FormulaId[]
      if (!ids.length) return
      const currentIndex = ids.indexOf(active)
      // If active isn't found for some reason, reset to the first id.
      if (currentIndex === -1) {
        setActive(ids[0] ?? FIRST_FORMULA_ID)
        setBubbleOpen(true)
        return
      }
      if (e.key === 'ArrowRight') {
        const next = ids[(currentIndex + 1) % ids.length] ?? FIRST_FORMULA_ID
        setActive(next)
        setBubbleOpen(true)
      }
      if (e.key === 'ArrowLeft') {
        const next = ids[(currentIndex - 1 + ids.length) % ids.length] ?? FIRST_FORMULA_ID
        setActive(next)
        setBubbleOpen(true)
      }
    }
    el.addEventListener('keydown', handler)
    return () => el.removeEventListener('keydown', handler)
  }, [active])

  return (
    <div className="relative">
      {/* Tabs */}
      <div
        ref={tablistRef}
        role="tablist"
        aria-label="Formules et tarifs"
        className="flex w-full flex-wrap gap-2 rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur-sm"
        tabIndex={0}
      >
        {FORMULAS.map((f) => {
          const selected = active === f.id
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setActive(f.id)
                setBubbleOpen(true)
              }}
              className={[
                'group relative inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50',
                selected
                  ? 'bg-white/10 text-white shadow-glow'
                  : 'bg-white/0 text-white/80 hover:bg-white/5',
              ].join(' ')}
            >
              <span>{f.label}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[12px] font-semibold">
                {f.price}€
              </span>
              {/* Accent animée */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 blur-lg transition group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(60% 60% at 50% 50%, rgba(30,217,137,.18), rgba(30,217,137,0) 70%)',
                }}
              />
            </button>
          )
        })}
      </div>

      {/* Bulle détail */}
      <AnimatePresence initial={false}>
  {bubbleOpen && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 12, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="relative mt-4 max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-5 text-sm text-white shadow-2xl backdrop-blur-xl"
          >
            {/* Close */}
            <button
              onClick={() => setBubbleOpen(false)}
              aria-label="Fermer les détails"
              className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/5 p-1 text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.17 7.1 4.3A1 1 0 0 0 5.7 5.7L10.58 10.6 5.7 15.49a1 1 0 1 0 1.4 1.42L12 12l4.9 4.91a1 1 0 0 0 1.4-1.42L13.42 10.6 18.3 5.7Z" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-3 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                <span className="text-base font-semibold">{activeFormula.label}</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold">{activeFormula.price}€</span>
              </div>
              {activeFormula.duration && (
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/80 ring-1 ring-white/10">
                  Durée : {activeFormula.duration}
                </span>
              )}
            </div>

            {/* Bullets */}
            <ul className="mb-3 space-y-1.5 pl-1">
              {activeFormula.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-[6px] inline-block h-1.5 w-1.5 flex-none rounded-full bg-white/60" />
                  <span className="text-white/90">{b}</span>
                </li>
              ))}
            </ul>

            {/* Protection */}
            {activeFormula.protection && (
              <p className="mb-4 text-white/70">
                <span className="font-medium text-white/90">Protection appliquée :</span>{' '}
                {activeFormula.protection}
              </p>
            )}

            {/* CTA */}
            {showBubbleCta && (
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={{ pathname: '/reservation', query: { formula: activeFormula.id } }}
                  className="inline-flex items-center gap-2 rounded-full bg-[rgb(30,217,137)] px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(30,217,137,.25)] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60"
                >
                  Réserver cette formule
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M5 12a1 1 0 0 1 1-1h10.59l-3.3-3.3a1 1 0 1 1 1.42-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.42-1.4l3.3-3.3H6a1 1 0 0 1-1-1Z" />
                  </svg>
                </Link>
                <button
                  onClick={() => onPick?.(activeFormula)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/0 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
                >
                  Choisir (garder sur la page)
                </button>
              </div>
            )}

            {/* Bordure halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px -z-10 rounded-2xl"
              style={{
                background:
                  'radial-gradient(60% 60% at 50% 0%, rgba(30,217,137,.14), rgba(30,217,137,0) 60%)',
                mask: 'linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
