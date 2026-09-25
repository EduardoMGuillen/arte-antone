"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { useStore } from "./StoreProvider";
import { comparePrice, formatPrice, productRating } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const fav = isFavorite(product.id);
  const { stars, reviews } = productRating(product);
  const before = comparePrice(product);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-3 transition duration-300 hover:-translate-y-1 card-shadow">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
        <Link href={`/producto/${product.id}`} aria-label={product.name}>
          <ProductImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>
        {product.promo && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-promo px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow">
            Oferta
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          className={`absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow transition hover:scale-110 ${
            fav ? "text-promo" : "text-muted"
          }`}
        >
          <Heart className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
          {product.category}
        </p>
        <Link
          href={`/producto/${product.id}`}
          className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-ink hover:text-brand-deep"
        >
          {product.name}
        </Link>
        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted">
          <span className="flex text-[#e5b04a]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3" fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="font-semibold text-ink/70">{stars.toFixed(1)}</span>
          <span>({reviews})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-extrabold text-ink">{formatPrice(product.price)}</span>
          {before && (
            <span className="text-xs text-muted line-through">{formatPrice(before)}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-brand/40 py-2 text-xs font-bold text-brand-deep transition hover:border-brand hover:bg-brand hover:text-white"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
