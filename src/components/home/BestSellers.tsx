"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/store/ProductCard";
import { Heart } from "@/components/Decor";
import type { Product } from "@/lib/types";

const TABS = [
  { id: "top", label: "Más vendidos" },
  { id: "new", label: "Novedades" },
  { id: "promo", label: "Ofertas" },
] as const;

export default function BestSellers({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("top");

  const list = useMemo(() => {
    if (tab === "new") {
      return [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 10);
    }
    if (tab === "promo") return products.filter((p) => p.promo).slice(0, 10);
    return products.slice(0, 10);
  }, [products, tab]);

  return (
    <section id="tienda" className="scroll-mt-28 bg-gradient-to-b from-paper to-cream/60 py-20 lg:py-24">
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
              href="/productos"
              className="hidden items-center gap-1 text-sm font-bold text-brand-deep hover:underline sm:inline-flex"
            >
              Ver todo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
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
          <p className="mt-10 text-center text-sm text-muted">Pronto tendremos nuevas ofertas ✨</p>
        )}

        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/productos" className="btn-ghost">
            Ver todos los productos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
