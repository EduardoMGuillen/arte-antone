"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "@/components/store/StoreProvider";
import { BRAND, CATEGORIES, NAV_LINKS, PROMO_CODE } from "@/lib/constants";

const ANNOUNCEMENTS = [
  "Envíos a todo Honduras  ·  Gratis en pedidos mayores a L 1,500",
  `10% de descuento en tu primera compra  ·  Código ${PROMO_CODE}`,
  "Cada pieza es hecha a mano y personalizada con amor",
];

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`font-display text-[1.35rem] font-semibold tracking-[0.28em] ${light ? "text-white" : "text-ink"}`}
      >
        ARTE
      </span>
      <span className={`font-script -mt-1 pl-3 text-[1.55rem] ${light ? "text-sand" : "text-brand"}`}>
        Antone
      </span>
    </span>
  );
}

export default function Header() {
  const { cartCount, setCartOpen, setSearchOpen, favorites } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAnnouncement((i) => (i + 1) % ANNOUNCEMENTS.length), 4200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <div className="relative z-50 h-9 overflow-hidden bg-gradient-to-r from-brand-deep via-brand to-brand-deep text-center text-[11px] font-bold tracking-wide text-white sm:text-xs">
        <AnimatePresence mode="wait">
          <motion.p
            key={announcement}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex h-9 items-center justify-center gap-2 px-3 text-[10px] sm:px-4 sm:text-xs"
          >
            <span aria-hidden className="hidden sm:inline">✦</span>
            <span className="truncate">{ANNOUNCEMENTS[announcement]}</span>
            <span aria-hidden className="hidden sm:inline">✦</span>
          </motion.p>
        </AnimatePresence>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "border-b border-line bg-paper/90 shadow-[0_8px_30px_-20px_rgba(58,42,32,0.4)] backdrop-blur-md" : "bg-paper"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label={BRAND}>
            <Image
              src="/logo.png"
              alt={BRAND}
              width={112}
              height={112}
              priority
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-12" : "h-14"}`}
            />
            <span className="hidden sm:block">
              <Wordmark />
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {NAV_LINKS.map((link) =>
              link.label === "Categorías" ? (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-bold text-ink/80 transition hover:bg-soft hover:text-ink"
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-[440px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-2 rounded-3xl border border-line bg-white p-3 card-shadow">
                      {CATEGORIES.map((c) => (
                        <Link
                          key={c.id}
                          href={`/productos?categoria=${encodeURIComponent(c.id)}`}
                          className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-cream"
                        >
                          <span className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-xl ${c.tone}`}>
                            <Image src={c.image} alt="" fill sizes="44px" className="object-cover" />
                          </span>
                          <span className="text-sm font-bold text-ink">{c.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-bold text-ink/80 transition hover:bg-soft hover:text-ink"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink/80 transition hover:bg-soft"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/productos?favoritos=1"
              className="relative hidden h-10 w-10 place-items-center rounded-full text-ink/80 transition hover:bg-soft sm:grid"
              aria-label="Favoritos"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-promo px-1 text-[9px] font-extrabold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className="hidden h-10 w-10 place-items-center rounded-full text-ink/80 transition hover:bg-soft sm:grid"
              aria-label="Mi cuenta"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink/80 transition hover:bg-soft"
              aria-label="Carrito"
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.3 }}
                    animate={{ scale: 1 }}
                    className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[10px] font-extrabold text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-soft lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[85] bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
                <Image src="/logo.png" alt={BRAND} width={96} height={96} className="h-12 w-auto" />
                <Wordmark />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-soft"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 pt-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-2xl text-ink hover:bg-soft"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-6 grid grid-cols-3 gap-2 px-4">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={`/productos?categoria=${encodeURIComponent(c.id)}`}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl ${c.tone} px-2 py-3 text-center text-xs font-bold text-ink`}
                >
                  {c.short}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex gap-2 px-4">
              <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-ghost btn-sm flex-1">
                <User className="h-4 w-4" /> Mi cuenta
              </Link>
              <Link
                href="/productos?favoritos=1"
                onClick={() => setMenuOpen(false)}
                className="btn-ghost btn-sm flex-1"
              >
                <Heart className="h-4 w-4" /> Favoritos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
