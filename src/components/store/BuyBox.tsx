"use client";

import { useState } from "react";
import { Heart, Minus, Plus, Share2, ShoppingBag, Star, Zap } from "lucide-react";
import { useStore } from "./StoreProvider";
import { comparePrice, formatPrice, productRating } from "@/lib/format";
import type { Product } from "@/lib/types";

const COLORS = [
  { id: "Natural", swatch: "#e2c49a" },
  { id: "Rosa pastel", swatch: "#f3c7c3" },
  { id: "Celeste", swatch: "#bcd6e3" },
  { id: "Verde salvia", swatch: "#c2d1ae" },
  { id: "Lila", swatch: "#d6c6e6" },
  { id: "Beige", swatch: "#efd9bc" },
];

export default function BuyBox({ product }: { product: Product }) {
  const { addToCart, setCheckoutOpen, toggleFavorite, isFavorite, notify } = useStore();
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState(COLORS[0].id);
  const fav = isFavorite(product.id);
  const { stars, reviews } = productRating(product);
  const before = comparePrice(product);

  const note = [name && `Nombre: ${name}`, date && `Fecha: ${date}`, `Color: ${color}`]
    .filter(Boolean)
    .join(" · ");

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        notify("Enlace copiado");
      }
    } catch {
      // cancelled
    }
  }

  return (
    <div>
      <p className="eyebrow">{product.category}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {product.name}
      </h1>
      <div className="mt-3 flex items-center gap-2 text-sm text-muted">
        <span className="flex text-[#e5b04a]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          ))}
        </span>
        <span className="font-bold text-ink">{stars.toFixed(1)}</span>
        <span>· {reviews} reseñas</span>
      </div>
      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-ink">{formatPrice(product.price)}</span>
        {before && (
          <>
            <span className="text-lg text-muted line-through">{formatPrice(before)}</span>
            <span className="rounded-full bg-promo px-2.5 py-1 text-xs font-extrabold text-white">
              −{Math.round((1 - product.price / before) * 100)}%
            </span>
          </>
        )}
      </div>
      <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{product.description}</p>

      <div className="mt-7 space-y-4 rounded-3xl border border-line bg-cream/70 p-5">
        <p className="font-display text-lg font-semibold text-ink">Personaliza tu pieza</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="label">
            Nombre
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input mt-1.5"
              placeholder="Ej. Emma"
              maxLength={30}
            />
          </label>
          <label className="label">
            Fecha especial
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input mt-1.5" />
          </label>
        </div>
        <div>
          <p className="label">
            Color base: <span className="text-ink">{color}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.id)}
                aria-label={c.id}
                className={`h-9 w-9 rounded-full border-2 transition ${
                  color === c.id ? "scale-110 border-ink" : "border-white shadow"
                }`}
                style={{ background: c.swatch }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border-[1.5px] border-line bg-white">
          <button type="button" className="grid h-12 w-11 place-items-center" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Menos">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-extrabold">{qty}</span>
          <button type="button" className="grid h-12 w-11 place-items-center" onClick={() => setQty((q) => q + 1)} aria-label="Más">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button type="button" onClick={() => addToCart(product, { qty, note })} className="btn-primary flex-1 !py-3.5">
          <ShoppingBag className="h-4 w-4" /> Agregar al carrito
        </button>
        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className={`grid h-12 w-12 place-items-center rounded-full border-[1.5px] transition ${
            fav ? "border-promo bg-blush text-promo" : "border-line bg-white text-muted hover:text-promo"
          }`}
          aria-label="Favorito"
        >
          <Heart className="h-5 w-5" fill={fav ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          onClick={share}
          className="grid h-12 w-12 place-items-center rounded-full border-[1.5px] border-line bg-white text-muted transition hover:text-brand"
          aria-label="Compartir"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          addToCart(product, { qty, note, silent: true });
          setCheckoutOpen(true);
        }}
        className="btn-ghost mt-3 w-full !border-ink !py-3.5 hover:!bg-ink hover:!text-white"
      >
        <Zap className="h-4 w-4" /> Comprar ahora
      </button>
    </div>
  );
}
