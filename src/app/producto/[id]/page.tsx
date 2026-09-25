import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Brush, ChevronRight, Clock, Gift, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/store/ProductCard";
import BuyBox from "@/components/store/BuyBox";
import { BRAND, SITE_URL } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { getProductById, getProducts } from "@/lib/products";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);
  if (!product || !product.active) {
    return { title: `Producto no encontrado | ${BRAND}` };
  }
  const title = `${product.name} | ${BRAND}`;
  const description = `${product.description} ${formatPrice(product.price)}.`;
  return {
    title,
    description,
    alternates: { canonical: `/producto/${product.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL.replace(/\/$/, "")}/producto/${product.id}`,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

const PERKS = [
  { icon: Brush, title: "Pintado a mano", text: "Acabado artesanal" },
  { icon: Clock, title: "3 a 7 días", text: "Tras aprobar el boceto" },
  { icon: Truck, title: "Envío nacional", text: "Gratis desde L 1,500" },
  { icon: Gift, title: "Empaque de regalo", text: "Incluido" },
];

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product || !product.active) notFound();

  const all = await getProducts();
  const related = [
    ...all.filter((p) => p.id !== product.id && p.category === product.category),
    ...all.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 4);

  const siteOrigin = SITE_URL.replace(/\/$/, "");
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image.startsWith("http") ? product.image : `${siteOrigin}${product.image}`,
    category: product.category,
    brand: { "@type": "Brand", name: BRAND },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "HNL",
      availability: "https://schema.org/InStock",
      url: `${siteOrigin}/producto/${product.id}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <Header />
      <main className="flex-1 bg-gradient-to-b from-cream/60 to-paper">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Link href="/" className="hover:text-brand">Inicio</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/productos" className="hover:text-brand">Tienda</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/productos?categoria=${encodeURIComponent(product.category)}`} className="hover:text-brand">
              {product.category}
            </Link>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] border-[6px] border-white bg-cream shadow-xl">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {product.promo && (
                  <span className="absolute left-4 top-4 rounded-full bg-promo px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow">
                    Oferta
                  </span>
                )}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PERKS.map((p) => (
                  <div key={p.title} className="rounded-2xl border border-line bg-white p-3 text-center">
                    <p.icon className="mx-auto h-5 w-5 text-brand" />
                    <p className="mt-1.5 text-xs font-extrabold text-ink">{p.title}</p>
                    <p className="text-[11px] text-muted">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <BuyBox product={product} />
          </div>

          {related.length > 0 && (
            <section className="mt-24">
              <h2 className="text-center font-display text-3xl font-semibold text-ink">
                También te puede <span className="font-script text-[1.2em] font-normal text-brand">encantar</span>
              </h2>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
