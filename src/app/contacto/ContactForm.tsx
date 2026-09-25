"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setTimeout(() => setState("done"), 1400);
  }

  if (state === "done") {
    return (
      <div className="flex h-full flex-col items-center justify-center py-16 text-center">
        <CheckCircle2 className="h-14 w-14 text-[#6f8a5a]" />
        <p className="mt-5 font-display text-3xl text-ink">¡Mensaje enviado!</p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Gracias por escribirnos. Te responderemos en menos de 24 horas con tu cotización.
        </p>
        <button type="button" onClick={() => setState("idle")} className="btn-ghost mt-8">
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="label">
        Nombre
        <input required className="input mt-1.5" placeholder="Tu nombre" />
      </label>
      <label className="label">
        Teléfono
        <input required type="tel" className="input mt-1.5" placeholder="+504 ____-____" />
      </label>
      <label className="label sm:col-span-2">
        Correo electrónico
        <input type="email" className="input mt-1.5" placeholder="tu@correo.com" />
      </label>
      <label className="label">
        ¿Qué te interesa?
        <select className="input mt-1.5">
          <option>Tablero de nacimiento</option>
          <option>Recuerditos para evento</option>
          <option>Nombre decorativo</option>
          <option>Cuadro con foto</option>
          <option>Kit para pintar</option>
          <option>Diseño personalizado</option>
        </select>
      </label>
      <label className="label">
        Fecha del evento
        <input type="date" className="input mt-1.5" />
      </label>
      <label className="label sm:col-span-2">
        Cuéntanos tu idea
        <textarea
          required
          rows={5}
          className="input mt-1.5"
          placeholder="Nombre del bebé, temática, colores, cantidad de piezas…"
        />
      </label>
      <button type="submit" disabled={state === "loading"} className="btn-primary sm:col-span-2">
        {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Enviar mensaje
      </button>
    </form>
  );
}
