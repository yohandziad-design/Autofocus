'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  /** /public path (ex: "/beforeafter/before.png") */
  beforeSrc: string;
  afterSrc: string;
  altBefore?: string;
  altAfter?: string;
  /** 0 → tout “après”, 1 → tout “avant” (par défaut 0.5) */
  initial?: number;
  className?: string;
  /** classe Tailwind d’aspect ratio (ex: "aspect-[4/3]" | "aspect-video") */
  aspectClassName?: string;
  /** libellés */
  labels?: { before?: string; after?: string };
  /** callback quand la valeur change (0..1) */
  onChange?: (v: number) => void;
};

export default function BeforeAfterSlide({
  beforeSrc,
  afterSrc,
  altBefore = 'Photo avant',
  altAfter = 'Photo après',
  initial = 0.5,
  className = '',
  aspectClassName = 'aspect-video',
  labels = { before: 'Avant', after: 'Après' },
  onChange,
}: Props) {
  const [value, setValue] = useState<number>(clamp(initial, 0, 1));
  const wrapRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  // maj + callback
  const update = useCallback(
    (v: number) => {
      const next = clamp(v, 0, 1);
      setValue(next);
      onChange?.(next);
    },
    [onChange],
  );

  // pointer -> valeur
  const pointToValue = useCallback(
    (clientX: number) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const v = (clientX - rect.left) / rect.width;
      update(v);
    },
    [update],
  );

  // drag souris/tactile
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const x =
        e instanceof TouchEvent ? e.touches[0]?.clientX ?? 0 : (e as MouseEvent).clientX;
      pointToValue(x);
    };
    const stop = () => (draggingRef.current = false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', stop, { passive: true });
    window.addEventListener('touchend', stop, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, [pointToValue]);

  // accessibilité clavier
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 0.1 : 0.05; // Maj = pas plus grand
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      update(value - step);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      update(value + step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      update(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      update(1);
    }
  };

  const handleX = `${value * 100}%`;

  return (
    <div
      ref={wrapRef}
      className={[
        'relative w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)]',
        'border border-white/10 bg-white/5 backdrop-blur',
        aspectClassName,
        className,
      ].join(' ')}
      onMouseDown={(e) => {
        draggingRef.current = true;
        pointToValue(e.clientX);
      }}
      onTouchStart={(e) => {
        draggingRef.current = true;
        pointToValue(e.touches[0]?.clientX ?? 0);
      }}
      aria-label="Comparateur avant/après"
    >
      {/* Image APRÈS – pleine largeur */}
      <Image
        src={afterSrc}
        alt={altAfter}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover select-none"
        priority
      />

      {/* Image AVANT – masquée par clip-path */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ clipPath: `inset(0 ${100 - value * 100}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={altBefore}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover select-none"
          priority
        />
      </div>

      {/* Ligne + poignée */}
      <div
        className="absolute inset-y-0"
        style={{ left: handleX, transform: 'translateX(-50%)' }}
      >
        {/* ligne */}
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/70" />
        {/* poignée circulaire (focusable) */}
        <div
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value * 100)}
          aria-label="Curseur comparaison"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className={[
            'relative top-1/2 h-7 w-7 -translate-y-1/2 cursor-ew-resize rounded-full',
            'border-4 border-emerald-400 bg-white shadow-[0_0_0_6px_rgba(16,185,129,.25)]',
            'outline-none focus:shadow-[0_0_0_8px_rgba(16,185,129,.35)]',
          ].join(' ')}
        />
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute left-4 bottom-3 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
        {labels.before}
      </div>
      <div className="pointer-events-none absolute right-4 bottom-3 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
        {labels.after}
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
