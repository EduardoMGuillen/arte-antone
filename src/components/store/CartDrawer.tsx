"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { useStore } from "./StoreProvider";
import { formatPrice } from "@/lib/format";

const FREE_SHIPPING = 1500;

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal, setCheckoutOpen } =
    useStore();
  const remaining = Math.max(0, FREE_SHIPPING - cartTotal);
  const progress = Math.min(100, (cartTotal / FREE_SHIPPING) * 100);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[90] flex h-[100dvh] w-full max-w-md flex-col bg-paper shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            aria-label="Carrito"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-brand" />
                <h2 className="font-display text-xl font-semibold">Tu carrito</h2>
                <span className="rounded-full bg-soft px-2 py-0.5 text-xs font-bold text-brand-deep">
                  {cart.reduce((n, i) => n + i.qty, 0)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-soft"
                aria-label="Cerrar carrito"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {cart.length > 0 && (
              <div className="border-b border-line bg-cream px-5 py-3">
                <p className="flex items-center gap-2 text-xs font-semibold text-ink/80">
                  <Truck className="h-4 w-4 text-brand" />
                  {remaining > 0
                    ? `Te faltan ${formatPrice(remaining)} para envío gratis`
                    : "¡Tu pedido tiene envío gratis!"}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold to-brand-deep transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-soft">
                    <ShoppingBag className="h-8 w-8 text-brand" />
                  </div>
                  <p className="mt-5 font-display text-xl">Tu carrito está vacío</p>
                  <p className="mt-1 max-w-xs text-sm text-muted">
                    Descubre tableros, nombres y recuerditos hechos a mano con mucho amor.
                  </p>
                  <Link
                    href="/productos"
                    onClick={() => setCartOpen(false)}
                    className="btn-primary mt-6"
                  >
                    Ver la tienda
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.key} className="flex gap-3 rounded-2xl border border-line bg-white p-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
                        <ProductImage src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="line-clamp-2 text-sm font-bold leading-snug">{item.name}</p>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.key)}
                            className="text-muted hover:text-promo"
                            aria-label="Quitar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        {item.note && (
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted">✎ {item.note}</p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-line">
                            <button
                              type="button"
                              className="grid h-7 w-7 place-items-center"
                              onClick={() => updateQty(item.key, item.qty - 1)}
                              aria-label="Menos"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">{item.qty}</span>
                            <button
                              type="button"
                              className="grid h-7 w-7 place-items-center"
                              onClick={() => updateQty(item.key, item.qty + 1)}
                              aria-label="Más"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-extrabold">{formatPrice(item.price * item.qty)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-line bg-white px-5 py-5">
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>Subtotal</span>
                  <span className="text-lg font-extrabold text-ink">{formatPrice(cartTotal)}</span>
                </div>
                <p className="mt-1 text-xs text-muted">Envío y personalización se confirman al finalizar.</p>
                <button
                  type="button"
                  className="btn-primary mt-4 w-full"
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                >
                  Finalizar pedido
                </button>
                <button
                  type="button"
                  className="mt-2 w-full py-2 text-xs font-bold text-brand-deep hover:underline"
                  onClick={() => setCartOpen(false)}
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
