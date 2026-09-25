"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Product } from "@/lib/types";

export type CartItem = {
  key: string;
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  note?: string;
};

type Toast = { id: number; message: string; tone?: "ok" | "love" };

type StoreState = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, opts?: { qty?: number; note?: string; silent?: boolean }) => void;
  updateQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (product: Pick<Product, "id" | "name">) => void;
  isFavorite: (id: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  notify: (message: string, tone?: Toast["tone"]) => void;
  toasts: Toast[];
};

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "arteantone_cart";
const FAV_KEY = "arteantone_favs";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const f = localStorage.getItem(FAV_KEY);
      if (c) setCart(JSON.parse(c));
      if (f) setFavorites(JSON.parse(f));
    } catch {
      // storage unavailable
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const notify = useCallback((message: string, tone: Toast["tone"] = "ok") => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const addToCart = useCallback<StoreState["addToCart"]>(
    (product, opts) => {
      const qty = Math.max(1, opts?.qty ?? 1);
      const note = opts?.note?.trim() || undefined;
      const key = `${product.id}::${note ?? ""}`;
      setCart((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        }
        return [
          ...prev,
          {
            key,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty,
            note,
          },
        ];
      });
      if (!opts?.silent) notify(`Agregado al carrito: ${product.name}`);
    },
    [notify],
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
    );
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback<StoreState["toggleFavorite"]>(
    (product) => {
      setFavorites((prev) => {
        const has = prev.includes(product.id);
        notify(
          has ? "Quitado de favoritos" : `Guardado en favoritos: ${product.name}`,
          "love",
        );
        return has ? prev.filter((id) => id !== product.id) : [...prev, product.id];
      });
    },
    [notify],
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const value = useMemo<StoreState>(
    () => ({
      cart,
      cartCount: cart.reduce((n, i) => n + i.qty, 0),
      cartTotal: cart.reduce((n, i) => n + i.qty * i.price, 0),
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      favorites,
      toggleFavorite,
      isFavorite,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      checkoutOpen,
      setCheckoutOpen,
      notify,
      toasts,
    }),
    [
      cart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      favorites,
      toggleFavorite,
      isFavorite,
      cartOpen,
      searchOpen,
      checkoutOpen,
      notify,
      toasts,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
  return ctx;
}
