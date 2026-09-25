"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  ImagePlus,
  LogOut,
  Package,
  Pencil,
  Plus,
  Search,
  Store,
  Tag,
  Trash2,
} from "lucide-react";
import { BRAND, CATEGORY_IDS } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "Tableros",
  promo: false,
  active: true,
};

type BusyState = { label: string } | null;

export default function DashboardClient() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<BusyState>(null);
  const [uploading, setUploading] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const locked = Boolean(busy) || uploading;

  const categoryOptions = useMemo(() => {
    const set = new Set([...CATEGORY_IDS, ...products.map((p) => p.category.trim()).filter(Boolean)]);
    return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
  }, [products]);

  const stats = useMemo(
    () => ({
      total: products.length,
      visible: products.filter((p) => p.active).length,
      promo: products.filter((p) => p.promo).length,
      hidden: products.filter((p) => !p.active).length,
    }),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = !query || p.name.toLowerCase().includes(query);
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  const fetchAllProducts = useCallback(async () => {
    const res = await fetch("/api/products?all=1", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(typeof data.error === "string" ? data.error : "No se pudo verificar el catálogo");
    }
    return data as Product[];
  }, []);

  const load = useCallback(async () => {
    const me = await fetch("/api/auth/me", { cache: "no-store" });
    if (!me.ok) {
      router.replace("/login");
      return;
    }
    try {
      const list = await fetchAllProducts();
      setProducts(list);
      setLoadFailed(false);
      setError("");
    } catch (err) {
      setLoadFailed(true);
      setError(err instanceof Error ? err.message : "No se pudo leer el catálogo. Pulsa Reintentar.");
    }
    setReady(true);
  }, [router, fetchAllProducts]);

  useEffect(() => {
    void load();
  }, [load]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  }

  function startEdit(product: Product) {
    if (locked) return;
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      image: product.image,
      category: product.category,
      promo: product.promo,
      active: product.active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function onImageFileChange(file: File | null) {
    if (!file || locked) return;
    setUploading(true);
    setBusy({ label: "Subiendo imagen…" });
    setError("");
    try {
      const { compressImageForUpload } = await import("@/lib/compress-image");
      const compressed = await compressImageForUpload(file);
      const body = new FormData();
      body.append("file", compressed);
      const res = await fetch("/api/upload", { method: "POST", body, cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || `No se pudo subir la imagen (${res.status}). Revisa Blob en Vercel.`);
        return;
      }
      if (!data.url) {
        setError("La subida no devolvió URL de imagen");
        return;
      }
      setForm((prev) => ({ ...prev, image: data.url as string }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar/subir la imagen.");
    } finally {
      setUploading(false);
      setBusy(null);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (locked) return;
    if (!form.image.trim()) {
      setError("Agrega una imagen (subida o URL)");
      return;
    }
    const editId = editingId;
    setBusy({ label: editId ? "Guardando producto…" : "Creando producto…" });
    setError("");
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price) || 0,
      image: form.image.trim(),
      category: form.category,
      promo: form.promo,
      active: form.active,
    };

    try {
      const res = await fetch(editId ? `/api/products/${editId}` : "/api/products", {
        method: editId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "No se pudo guardar");
        return;
      }
      if (Array.isArray(data.products)) setProducts(data.products as Product[]);
      resetForm();
      router.refresh();
    } catch {
      setError("Error de conexión");
    } finally {
      setBusy(null);
    }
  }

  async function patchProduct(product: Product, patch: Partial<Product>, label: string, failMsg: string) {
    if (locked) return;
    setPendingId(product.id);
    setBusy({ label });
    const previous = products;
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, ...patch } : p)));
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setProducts(previous);
        setError(data.error || failMsg);
        return;
      }
      if (Array.isArray(data.products)) setProducts(data.products as Product[]);
      router.refresh();
    } catch {
      setProducts(previous);
      setError("Error de conexión");
    } finally {
      setPendingId(null);
      setBusy(null);
    }
  }

  function togglePromo(product: Product) {
    const next = !product.promo;
    void patchProduct(
      product,
      { promo: next },
      next ? "Marcando oferta…" : "Quitando oferta…",
      "No se pudo actualizar la oferta",
    );
  }

  function toggleVisibility(product: Product) {
    const next = !product.active;
    void patchProduct(
      product,
      { active: next },
      next ? "Mostrando en la tienda…" : "Ocultando de la tienda…",
      "No se pudo cambiar la visibilidad",
    );
  }

  async function removeProduct(id: string) {
    if (locked) return;
    if (!confirm("¿Eliminar este producto del catálogo?")) return;
    setPendingId(id);
    setBusy({ label: "Eliminando producto…" });
    const previous = products;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
    setError("");
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(id)}`, { method: "DELETE", cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setProducts(previous);
        setError(data.error || "No se pudo eliminar el producto");
        return;
      }
      if (Array.isArray(data.products)) setProducts(data.products as Product[]);
      router.refresh();
    } catch {
      setProducts(previous);
      setError("Error de conexión al eliminar");
    } finally {
      setPendingId(null);
      setBusy(null);
    }
  }

  if (!ready) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-cream text-muted">
        <div className="flex flex-col items-center gap-4">
          <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-brand border-t-transparent" />
          <p className="font-semibold">Cargando panel…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100svh] bg-cream">
      {busy && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/45 px-6 backdrop-blur-[2px]"
          role="alertdialog"
          aria-busy="true"
          aria-live="assertive"
        >
          <div className="w-full max-w-sm rounded-[2rem] bg-paper px-6 py-8 text-center shadow-2xl">
            <span className="mx-auto mb-5 block h-10 w-10 animate-spin rounded-full border-[3px] border-brand border-t-transparent" />
            <p className="font-display text-xl text-ink">Espera…</p>
            <p className="mt-2 text-sm text-muted">{busy.label}</p>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              No hagas otra acción hasta que esto cierre
            </p>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label={BRAND}>
              <Image src="/logo.png" alt={BRAND} width={96} height={96} className="h-12 w-auto" />
            </Link>
            <div>
              <p className="font-display text-lg font-semibold leading-tight text-ink">{BRAND}</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Panel de productos</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="btn-ghost btn-sm">
              <Store className="h-4 w-4" /> <span className="max-sm:hidden">Ver tienda</span>
            </Link>
            <button type="button" onClick={() => void logout()} disabled={locked} className="btn-ghost btn-sm disabled:opacity-50">
              <LogOut className="h-4 w-4" /> <span className="max-sm:hidden">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Productos", value: stats.total, icon: Package, tone: "bg-sand" },
            { label: "Visibles", value: stats.visible, icon: Eye, tone: "bg-sage" },
            { label: "En oferta", value: stats.promo, icon: Tag, tone: "bg-blush" },
            { label: "Ocultos", value: stats.hidden, icon: EyeOff, tone: "bg-sky" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-3xl border border-line bg-white p-4">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${s.tone} text-brand-deep`}>
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-extrabold text-ink">{s.value}</p>
                <p className="text-xs font-semibold text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <section className="h-fit rounded-[2rem] border border-line bg-white p-5 sm:p-7 lg:sticky lg:top-24">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-soft text-brand">
              {editingId ? <Pencil className="h-4 w-4" /> : <Plus className="h-5 w-5" />}
            </span>
            <div>
              <h1 className="font-display text-2xl font-semibold text-ink">
                {editingId ? "Editar producto" : "Agregar producto"}
              </h1>
              <p className="text-xs text-muted">Espera a que cierre el loading antes de la siguiente acción.</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="label">
              Nombre
              <input
                required
                disabled={locked}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input mt-1.5"
              />
            </label>
            <label className="label">
              Descripción
              <textarea
                required
                disabled={locked}
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="input mt-1.5"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="label">
                Precio (L)
                <input
                  required
                  disabled={locked}
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="input mt-1.5"
                />
              </label>
              <label className="label">
                Categoría
                <input
                  required
                  disabled={locked}
                  list="category-options"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="input mt-1.5"
                />
                <datalist id="category-options">
                  {categoryOptions.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </label>
            </div>

            <div className="space-y-3">
              <p className="label">Imagen del producto</p>
              <div className="flex flex-wrap items-start gap-4">
                {form.image ? (
                  <div className="relative aspect-square w-32 overflow-hidden rounded-2xl bg-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.image} alt="Vista previa" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex aspect-square w-32 items-center justify-center rounded-2xl border-2 border-dashed border-line bg-cream text-center text-xs text-muted">
                    Sin imagen
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <label className={`btn-ghost btn-sm ${locked ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
                    <ImagePlus className="h-4 w-4" />
                    {uploading ? "Subiendo…" : "Subir foto"}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      disabled={locked}
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        void onImageFileChange(file);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  <p className="text-xs text-muted">Galería o cámara. Se comprime antes de subir.</p>
                </div>
              </div>
              <label className="label">
                O pegar URL de imagen
                <input
                  type="text"
                  disabled={locked}
                  inputMode="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://…"
                  className="input mt-1.5"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-5 pt-1 text-sm font-semibold">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  disabled={locked}
                  checked={form.promo}
                  onChange={(e) => setForm({ ...form, promo: e.target.checked })}
                  className="h-4 w-4 accent-promo"
                />
                Marcar como oferta
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  disabled={locked}
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="h-4 w-4 accent-brand"
                />
                Visible en la tienda
              </label>
            </div>

            {error && (
              <p className="rounded-xl bg-blush px-3 py-2 text-sm font-semibold text-promo" role="alert">
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              <button type="submit" disabled={locked || !form.image.trim()} className="btn-primary">
                {editingId ? "Guardar cambios" : "Agregar producto"}
              </button>
              {editingId && (
                <button type="button" disabled={locked} onClick={resetForm} className="btn-ghost">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Catálogo ({filteredProducts.length}
            {filteredProducts.length !== products.length && ` de ${products.length}`})
          </h2>
          {loadFailed && (
            <button
              type="button"
              className="btn-ghost mt-3"
              disabled={locked}
              onClick={() => {
                setBusy({ label: "Reintentando leer el catálogo…" });
                void load().finally(() => setBusy(null));
              }}
            >
              Reintentar cargar catálogo
            </button>
          )}

          {!loadFailed && products.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              <label className="flex min-w-[200px] flex-1 items-center gap-2 rounded-2xl border-[1.5px] border-line bg-white px-3 py-2">
                <Search className="h-4 w-4 text-brand" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre…"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input !w-auto"
              >
                <option value="all">Todas las categorías</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!loadFailed && products.length === 0 && (
            <p className="mt-4 text-sm text-muted">No hay productos. Agrega el primero con el formulario.</p>
          )}
          {!loadFailed && products.length > 0 && filteredProducts.length === 0 && (
            <p className="mt-4 text-sm text-muted">Ningún producto coincide con esos filtros.</p>
          )}

          <ul className="mt-6 space-y-3">
            {filteredProducts.map((product) => {
              const rowBusy = pendingId === product.id;
              return (
                <li
                  key={product.id}
                  className={`flex gap-4 rounded-3xl border border-line bg-white p-3 transition sm:p-4 ${
                    !product.active ? "opacity-65" : ""
                  } ${rowBusy ? "ring-2 ring-brand/40" : ""} ${editingId === product.id ? "ring-2 ring-brand" : ""}`}
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-soft sm:h-24 sm:w-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-bold text-ink">{product.name}</p>
                        <p className="text-sm text-muted">
                          {product.category} · <span className="font-bold text-ink">{formatPrice(product.price)}</span>
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.promo && (
                          <span className="rounded-full bg-promo px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                            Oferta
                          </span>
                        )}
                        {!product.active && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                            Oculto
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => startEdit(product)}
                        className="inline-flex items-center gap-1 rounded-full bg-soft px-3 py-1.5 text-xs font-bold text-brand-deep hover:bg-sand disabled:opacity-40"
                      >
                        <Pencil className="h-3 w-3" /> Editar
                      </button>
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => togglePromo(product)}
                        className="inline-flex items-center gap-1 rounded-full bg-blush px-3 py-1.5 text-xs font-bold text-promo hover:brightness-95 disabled:opacity-40"
                      >
                        <Tag className="h-3 w-3" /> {product.promo ? "Quitar oferta" : "Oferta"}
                      </button>
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => toggleVisibility(product)}
                        className="inline-flex items-center gap-1 rounded-full bg-sky px-3 py-1.5 text-xs font-bold text-ink/70 hover:brightness-95 disabled:opacity-40"
                      >
                        {product.active ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        {product.active ? "Ocultar" : "Mostrar"}
                      </button>
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => void removeProduct(product.id)}
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-muted hover:bg-blush hover:text-promo disabled:opacity-40"
                      >
                        <Trash2 className="h-3 w-3" /> Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}
