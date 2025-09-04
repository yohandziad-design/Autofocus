"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white">
            AutoFocus<span className="text-teal-400">V2</span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="nav-link">
              Accueil
            </a>
            <a href="#formules" className="nav-link">
              Formules
            </a>
            <a href="#galerie" className="nav-link">
              Galerie
            </a>
            <a href="#faq" className="nav-link">
              FAQ
            </a>
            <Link href="/contact" className="btn-primary">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <a href="#accueil" className="nav-link">
                Accueil
              </a>
              <a href="#formules" className="nav-link">
                Formules
              </a>
              <a href="#galerie" className="nav-link">
                Galerie
              </a>
              <a href="#faq" className="nav-link">
                FAQ
              </a>
              <Link href="/contact" className="btn-primary w-fit">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
