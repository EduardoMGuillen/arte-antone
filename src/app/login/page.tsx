"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Branch, Cloud, Heart } from "@/components/Decor";
import { BRAND } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "No se pudo iniciar sesión");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-soft to-blush px-4 py-12">
      <Cloud face className="absolute left-[8%] top-[12%] h-16 w-28 animate-floaty" />
      <Cloud className="absolute bottom-[14%] right-[10%] h-12 w-24 animate-drift" />
      <Branch className="absolute -right-6 top-10 h-36 w-36 opacity-70" />
      <Heart className="absolute bottom-[20%] left-[16%] h-6 w-6 animate-floaty" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" aria-label={BRAND}>
            <Image src="/logo.png" alt={BRAND} width={180} height={180} priority className="h-32 w-auto drop-shadow-lg" />
          </Link>
          <p className="eyebrow mt-4">Acceso administración</p>
        </div>

        <form onSubmit={onSubmit} className="rounded-[2rem] border border-white bg-white/90 px-6 py-8 shadow-2xl backdrop-blur sm:px-9">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-soft text-brand">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-semibold text-ink">Iniciar sesión</h1>
              <p className="text-sm text-muted">Administra productos, precios y ofertas.</p>
            </div>
          </div>

          <label className="label mt-8">
            Usuario
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input mt-1.5"
            />
          </label>
          <label className="label mt-4">
            Contraseña
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input mt-1.5"
            />
          </label>

          {error && (
            <p className="mt-4 rounded-xl bg-blush px-3 py-2 text-sm font-semibold text-promo" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary mt-7 w-full">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-semibold text-muted">
          <Link href="/" className="hover:text-brand">
            ← Volver a la tienda
          </Link>
        </p>
      </div>
    </div>
  );
}
