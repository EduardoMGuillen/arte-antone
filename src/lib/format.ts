import type { Product } from "./types";

export function formatPrice(value: number) {
  return `L ${value.toLocaleString("es-HN", { maximumFractionDigits: 2 })}`;
}

function hash(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Valoración estable por producto para la demo (no cambia entre renders). */
export function productRating(product: Pick<Product, "id">) {
  const h = hash(product.id);
  return {
    stars: 4.6 + (h % 5) / 10,
    reviews: 14 + (h % 120),
  };
}

/** Precio "antes" mostrado en productos en promoción. */
export function comparePrice(product: Pick<Product, "price" | "promo">) {
  if (!product.promo) return null;
  return Math.round((product.price * 1.2) / 5) * 5;
}
