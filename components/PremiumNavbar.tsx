"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  isExternal?: boolean;
};

const navItems: NavItem[] = [
  { href: "/formules", label: "Formules" },
  { href: "/galerie", label: "Galerie" },
  { href: "/reservation", label: "Réservation" },
];

export default function PremiumNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effet de scroll pour navbar transparent
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile lors d'un changement de route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between glass-nav px-6 py-3 ${
            scrolled ? "glass-nav--scrolled" : ""
          }`}
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="Accueil">
            <div className="relative h-8 w-8">
              <Image
                src="/logo.png"
                alt="AutoFocus"
                fill
                className="object-contain rounded-lg"
                sizes="32px"
                priority
              />
            </div>
            <span className="text-xl font-bold text-white">AutoFocus</span>
          </Link>

          {/* Navigation Desktop */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>

          {/* CTA Desktop */}
          <div className="hidden lg:block">
            <Link href="/reservation" className="btn-neon text-sm px-6 py-2.5">
              Réserver
            </Link>
          </div>

          {/* Bouton hamburger */}
          <button
            type="button"
            className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-slate-200 hover:text-white hover:border-white/20 transition-all active:scale-95"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Menu mobile */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <div className="mt-3 glass-nav p-6 rounded-2xl">
            <ul className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <li key={item.href} 
                    className={`transform transition-all duration-300 delay-${index * 50} ${
                      open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}>
                  <NavLink
                    href={item.href}
                    className="flex items-center w-full rounded-xl px-4 py-4 text-slate-200 hover:text-white hover:bg-white/10 transition-all text-lg"
                    onClick={() => setOpen(false)}
                  >
                    <span className="mr-3">
                      {item.label === "Formules" && "💰"}
                      {item.label === "Galerie" && "📸"}
                      {item.label === "Réservation" && "📅"}
                    </span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className={`pt-6 border-t border-white/10 mt-4 transform transition-all duration-300 delay-150 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <Link
                href="/reservation"
                className="btn-neon w-full justify-center text-lg py-4"
                aria-label="Réserver maintenant"
                onClick={() => setOpen(false)}
              >
                🚀 Réserver maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/** Lien avec état actif et styles premium */
function NavLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  const isHash = href.startsWith("/#");
  const isActive =
    (!isHash && pathname === href) ||
    (!isHash && href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200
        ${isActive ? "text-white" : "text-slate-300 hover:text-white"}
        hover:bg-white/5 ${className}`}
    >
      {children}
      {isActive && (
        <span className="absolute inset-x-2 -bottom-1 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      )}
    </Link>
  );
}
