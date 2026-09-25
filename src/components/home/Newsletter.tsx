"use client";

import { FormEvent, useState } from "react";
import { Check, Loader2, Mail, Send } from "lucide-react";
import { Cloud, Heart, Sparkle } from "@/components/Decor";
import { PROMO_CODE } from "@/lib/constants";

export default function Newsletter() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setTimeout(() => setState("done"), 1200);
  }

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand via-[#b8875a] to-brand-deep px-6 py-14 text-white sm:px-12 lg:py-16">
        <Cloud face className="absolute -right-4 bottom-4 h-16 w-28 opacity-95" />
        <Cloud className="absolute left-[40%] top-4 h-10 w-20 animate-drift opacity-40" />
        <Sparkle className="absolute right-[30%] top-8 h-6 w-6" fill="#fff3dd" />
        <Heart className="absolute bottom-8 left-[45%] h-5 w-5" fill="#f6d2cf" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex items-start gap-5">
            <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/15 sm:grid">
              <Mail className="h-7 w-7" />
            </span>
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Mantengámonos en contacto</h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
                Suscríbete y recibe novedades, diseños de temporada y un{" "}
                <strong className="text-white">10% de descuento</strong> en tu primera compra.
              </p>
            </div>
          </div>

          {state === "done" ? (
            <div className="flex items-center gap-4 rounded-3xl bg-white/15 p-5 backdrop-blur">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-brand-deep">
                <Check className="h-6 w-6" strokeWidth={3} />
              </span>
              <div>
                <p className="font-bold">¡Bienvenida a la familia Arte Antone!</p>
                <p className="text-sm text-white/80">
                  Tu código de descuento es <strong className="rounded bg-white/20 px-1.5 py-0.5">{PROMO_CODE}</strong>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-full sm:flex-row sm:bg-white sm:p-1.5">
              <input
                type="email"
                required
                placeholder="Escribe tu correo electrónico"
                className="w-full rounded-full bg-white px-5 py-3.5 text-sm text-ink outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-black disabled:opacity-70"
              >
                {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Suscribirme
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
