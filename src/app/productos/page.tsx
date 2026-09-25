import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogClient from "@/components/store/CatalogClient";
import { Branch, Cloud, Sparkle } from "@/components/Decor";
import { BRAND, CATEGORY_IDS } from "@/lib/constants";
import { getProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Tienda | ${BRAND} — Tableros, nombres y recuerditos personalizados`,
  description:
    "Catálogo completo de Arte Antone: tableros de nacimiento, nombres decorativos, recuerditos, cuadros con foto, kits para pintar y placas para mascotas.",
  alternates: { canonical: "/productos" },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const SORTS = ["destacados", "nuevos", "precio-asc", "precio-desc"] as const;

export default async function ProductosPage({ searchParams }: Props) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (err) {
    console.error("catalog", err);
  }

  const cat = one(sp.categoria);
  const sort = one(sp.orden);
  const initial = {
    category: CATEGORY_IDS.includes(cat) || products.some((p) => p.category === cat) ? cat : "all",
    promo: one(sp.promo) === "1",
    favorites: one(sp.favoritos) === "1",
    sort: (SORTS as readonly string[]).includes(sort) ? (sort as (typeof SORTS)[number]) : "destacados",
    q: one(sp.q),
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-cream to-paper">
          <Cloud className="absolute right-[8%] top-8 h-12 w-24 animate-drift" />
          <Sparkle className="absolute left-[12%] top-10 h-5 w-5 animate-floaty" />
          <Branch className="absolute -left-4 bottom-0 h-24 w-24 opacity-60" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
            <p className="eyebrow">Tienda</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Nuestro <span className="font-script text-[1.2em] font-normal text-brand">catálogo</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
              Cada diseño se personaliza con el nombre, la fecha y los colores que elijas.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <CatalogClient products={products} initial={initial} />
        </section>
      </main>
      <Footer />
    </>
  );
}
