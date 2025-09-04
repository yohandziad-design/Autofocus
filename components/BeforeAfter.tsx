"use client";

import Image from "next/image";
import { useCallback, useId, useState } from "react";

type Props = {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Classes additionnelles pour le conteneur (ex: "rounded-2xl shadow-2xl") */
  className?: string;
  /** Classe d’aspect-ratio (ex: "aspect-[16/9]" ou "aspect-square") */
  aspectClassName?: string;
  /** Position initiale du curseur (0–100). Par défaut 50. */
  initial?: number;
};

export default function BeforeAfter({
  beforeSrc = "/beforeafter/before.png",
  afterSrc = "/beforeafter/after.png",
  beforeAlt = "Avant nettoyage",
  afterAlt = "Après nettoyage",
  className = "",
  aspectClassName = "aspect-[16/9]",
  initial = 50,
}: Props) {
  const [percent, setPercent] = useState(Math.min(100, Math.max(0, initial)));
  const id = useId();

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => setPercent(Number(e.target.value)),
    []
  );

  // Styles dynamiques
  const afterClip = { clipPath: `inset(0 0 0 ${percent}%)` } as React.CSSProperties;
  const dividerStyle = {
    background: `linear-gradient(to right,
      transparent calc(${percent}% - 1px),
      rgba(255,255,255,.85) calc(${percent}% - 1px),
      rgba(255,255,255,.85) calc(${percent}% + 1px),
      transparent calc(${percent}% + 1px))`,
  } as React.CSSProperties;
  const handleStyle = { left: `${percent}%` } as React.CSSProperties;

  return (
    <figure
      className={`card p-3 ${className}`}
      aria-label="Comparaison avant/après"
    >
      <div className={`relative overflow-hidden compare ${aspectClassName} rounded-2xl`}>
        {/* Image AVANT */}
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          priority
          className="object-cover select-none pointer-events-none"
          sizes="(min-width: 1024px) 640px, 100vw"
        />

        {/* Image APRÈS (recadrée par clip-path) */}
        <div className="compare__after" style={afterClip} aria-hidden="true">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            priority
            className="object-cover select-none pointer-events-none"
            sizes="(min-width: 1024px) 640px, 100vw"
          />
        </div>

        {/* Ligne de séparation dynamique */}
        <div className="compare__divider" style={dividerStyle} aria-hidden="true" />

        {/* Poignée */}
        <div className="compare__handle" style={handleStyle} aria-hidden="true" />

        {/* Slider pleine surface (clavier + souris + tactile) */}
        <input
          id={`compare-${id}`}
          className="compare__range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={percent}
          onChange={onChange}
          aria-label="Position de comparaison avant/après"
        />
      </div>
    </figure>
  );
}
