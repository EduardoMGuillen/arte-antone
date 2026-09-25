"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { useStore } from "./StoreProvider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

const SUGGESTIONS = ["Tablero", "Nombre", "Recuerditos", "Mascota", "Pintar"];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    setTimeout(() => inputRef.current?.focus(), 80);
    if (products === null) {
      fetch("/api/products", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : []))
        .then((list) => setProducts(Array.isArray(list) ? list : []))
        .catch(() => setProducts([]));
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, products, setSearchOpen]);

  const results = useMemo(() => {
    const q = query
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (!products) return [];
    if (!q) return products.slice(0, 4);
    return products.filter((p) =>
      `${p.name} ${p.category} ${p.description}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(q),
    );
  }, [query, products]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[95] bg-ink/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-2xl rounded-3xl bg-paper p-4 shadow-2xl sm:mt-16 sm:p-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 rounded-2xl border-[1.5px] border-line bg-white px-4 py-3 focus-within:border-brand">
              <Search className="h-5 w-5 text-brand" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar tableros, nombres, recuerditos…"
                className="w-full bg-transparent text-base outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda">
                <X className="h-5 w-5 text-muted" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full bg-soft px-3 py-1 text-xs font-bold text-brand-deep hover:bg-sand"
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              {query ? `${results.length} resultado${results.length === 1 ? "" : "s"}` : "Populares"}
            </p>
            <ul className="mt-2 max-h-[55vh] divide-y divide-line overflow-y-auto">
              {products === null && <li className="py-6 text-center text-sm text-muted">Cargando…</li>}
              {products !== null && results.length === 0 && (
                <li className="py-6 text-center text-sm text-muted">
                  No encontramos “{query}”. ¡Pero lo podemos crear para ti!
                </li>
              )}
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/producto/${p.id}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-cream"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream">
                      <ProductImage src={p.image} alt={p.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{p.name}</p>
                      <p className="text-xs text-muted">{p.category}</p>
                    </div>
                    <p className="text-sm font-extrabold">{formatPrice(p.price)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
