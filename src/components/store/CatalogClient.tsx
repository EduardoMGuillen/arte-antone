"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Search, SlidersHorizontal, Tag, X } from "lucide-react";
import ProductCard from "./ProductCard";
import { useStore } from "./StoreProvider";
import { CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/types";

type Sort = "destacados" | "nuevos" | "precio-asc" | "precio-desc";

const SORTS: { id: Sort; label: string }[] = [
  { id: "destacados", label: "Destacados" },
  { id: "nuevos", label: "Más nuevos" },
  { id: "precio-asc", label: "Precio: menor a mayor" },
  { id: "precio-desc", label: "Precio: mayor a menor" },
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function CatalogClient({
  products,
  initial,
}: {
  products: Product[];
  initial: { category: string; promo: boolean; favorites: boolean; sort: Sort; q: string };
}) {
  const { favorites } = useStore();
  const [category, setCategory] = useState(initial.category);
  const [promoOnly, setPromoOnly] = useState(initial.promo);
  const [favOnly, setFavOnly] = useState(initial.favorites);
  const [sort, setSort] = useState<Sort>(initial.sort);
  const [query, setQuery] = useState(initial.q);

  useEffect(() => {
    setCategory(initial.category);
    setPromoOnly(initial.promo);
    setFavOnly(initial.favorites);
    setSort(initial.sort);
    setQuery(initial.q);
  }, [initial.category, initial.promo, initial.favorites, initial.sort, initial.q]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("categoria", category);
    if (promoOnly) params.set("promo", "1");
    if (favOnly) params.set("favoritos", "1");
    if (sort !== "destacados") params.set("orden", sort);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/productos?${qs}` : "/productos");
  }, [category, promoOnly, favOnly, sort]);

  const list = useMemo(() => {
    const q = normalize(query.trim());
    let out = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (promoOnly && !p.promo) return false;
      if (favOnly && !favorites.includes(p.id)) return false;
      if (q && !normalize(`${p.name} ${p.category} ${p.description}`).includes(q)) return false;
      return true;
    });
    if (sort === "nuevos") out = [...out].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "precio-asc") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") out = [...out].sort((a, b) => b.price - a.price);
    return out;
  }, [products, category, promoOnly, favOnly, favorites, query, sort]);

  const hasFilters = category !== "all" || promoOnly || favOnly || query;

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {[{ id: "all", short: "Todo", tone: "bg-white" }, ...CATEGORIES].map((c) => {
          const active = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`shrink-0 rounded-full border-[1.5px] px-4 py-2 text-sm font-bold transition ${
                active ? "border-brand bg-brand text-white shadow-md" : `border-line ${c.tone} text-ink/80 hover:border-brand/50`
              }`}
            >
              {c.short}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-line bg-white p-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-2xl bg-cream px-4 py-2.5">
          <Search className="h-4 w-4 text-brand" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en el catálogo…"
            className="w-full bg-transparent text-sm outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Limpiar búsqueda">
              <X className="h-4 w-4 text-muted" />
            </button>
          )}
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPromoOnly((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-3.5 py-2 text-xs font-bold transition ${
              promoOnly ? "border-promo bg-promo text-white" : "border-line text-ink/70 hover:border-promo/60"
            }`}
          >
            <Tag className="h-3.5 w-3.5" /> Ofertas
          </button>
          <button
            type="button"
            onClick={() => setFavOnly((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-3.5 py-2 text-xs font-bold transition ${
              favOnly ? "border-promo bg-blush text-promo" : "border-line text-ink/70 hover:border-promo/60"
            }`}
          >
            <Heart className="h-3.5 w-3.5" fill={favOnly ? "currentColor" : "none"} /> Favoritos
            {favorites.length > 0 && ` (${favorites.length})`}
          </button>
          <label className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line px-3 py-1.5 text-xs font-bold text-ink/70">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent py-0.5 outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-muted">
        <p>
          <strong className="text-ink">{list.length}</strong> producto{list.length === 1 ? "" : "s"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setPromoOnly(false);
              setFavOnly(false);
              setQuery("");
            }}
            className="text-xs font-bold text-brand-deep hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <motion.div layout className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-cream px-6 py-16 text-center">
          <p className="font-display text-2xl text-ink">
            {favOnly ? "Aún no tienes favoritos" : "No encontramos productos"}
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            {favOnly
              ? "Toca el corazón en cualquier producto para guardarlo aquí."
              : "Prueba con otra categoría o escríbenos: ¡creamos diseños a la medida!"}
          </p>
        </div>
      )}
    </div>
  );
}
