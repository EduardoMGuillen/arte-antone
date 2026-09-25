"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/store/ProductCard";
import { Heart } from "@/components/Decor";
import { CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/types";

const TABS = [
  { id: "top", label: "Más vendidos" },
  { id: "new", label: "Novedades" },
  { id: "promo", label: "Ofertas" },
] as const;

const FILTERS = [{ id: "all", short: "Todo", tone: "bg-white" }, ...CATEGORIES];

export default function BestSellers({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("top");
  const [category, setCategory] = useState("all");

  const counts = useMemo(
    () =>
      products.reduce<Record<string, number>>(
        (acc, p) => {
          acc[p.category] = (acc[p.category] ?? 0) + 1;
          acc.all += 1;
          return acc;
        },
        { all: 0 },
      ),
    [products],
  );

  const list = useMemo(() => {
    let items = category === "all" ? products : products.filter((p) => p.category === category);
    if (tab === "new") items = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (tab === "promo") items = items.filter((p) => p.promo);
    return items.slice(0, 10);
  }, [products, tab, category]);

  const seeAllHref =
    category === "all" ? "/productos" : `/productos?categoria=${encodeURIComponent(category)}`;

  return (
    <section id="categorias" className="scroll-mt-28 bg-gradient-to-b from-paper to-cream/60 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Favoritos de las mamás</p>
            <h2 className="mt-2 flex items-center gap-3 font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem]">
              Lo más amado <Heart className="h-7 w-7" fill="#e8a7a7" />
            </h2>
          </div>
          <div className="flex w-full items-center justify-between gap-4 md:w-auto">
            <div className="flex rounded-full border border-line bg-white p-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`relative rounded-full px-3.5 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${
                    tab === t.id ? "text-white" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-brand"
                      transition={{ type: "spring", damping: 26, stiffness: 300 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
            <Link
              href={seeAllHref}
              className="hidden items-center gap-1 text-sm font-bold text-brand-deep hover:underline sm:inline-flex"
            >
              Ver todo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {FILTERS.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  active
                    ? "border-brand bg-brand text-white shadow-md shadow-brand/25"
                    : `border-transparent ${c.tone} text-ink/80 hover:-translate-y-0.5 hover:text-ink`
                }`}
              >
                {c.short}
                <span
                  className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/25 text-white" : "bg-white/70 text-muted"}`}
                >
                  {counts[c.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted">
            {tab === "promo" ? "Pronto tendremos nuevas ofertas ✨" : "Pronto agregaremos más diseños ✨"}
          </p>
        )}

        <div className="mt-10 flex justify-center sm:hidden">
          <Link href={seeAllHref} className="btn-ghost">
            Ver todos los productos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
