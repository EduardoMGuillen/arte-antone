"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionTitle } from "@/components/Reveal";

const FAQS = [
  { q: "¿Cuánto tiempo tarda mi pedido?", a: "Los productos personalizados se elaboran en 3 a 7 días hábiles después de aprobar el boceto. Para eventos con muchas piezas (recuerditos, medallones) recomendamos pedir con 2 semanas de anticipación." },
  { q: "¿Puedo elegir los colores y la temática?", a: "¡Claro! Todos nuestros diseños se adaptan: nombre, fecha, colores, personajes y frases. También podemos crear un diseño totalmente nuevo a partir de tu idea." },
  { q: "¿Hacen envíos fuera de Cortés?", a: "Sí, enviamos a todo Honduras por empresa de encomiendas. En Cofradía y San Pedro Sula también coordinamos entregas personales. El envío es gratis en pedidos mayores a L 1,500." },
  { q: "¿Qué material utilizan?", a: "Trabajamos con MDF de buena densidad cortado y grabado con láser. Lo entregamos natural o pintado a mano con pinturas acrílicas y sellador para mayor durabilidad." },
  { q: "¿Cómo puedo pagar?", a: "Aceptamos transferencia bancaria, depósito, Tigo Money, tarjeta y efectivo en entregas personales. Para iniciar la producción solicitamos un anticipo del 50%." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-28 bg-gradient-to-b from-paper to-cream/70 py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Resolvemos tus dudas" title="Preguntas" accent="frecuentes" />
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`overflow-hidden rounded-3xl border bg-white transition ${isOpen ? "border-sand card-shadow" : "border-line"}`}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-semibold text-ink">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${isOpen ? "rotate-45 bg-brand text-white" : "bg-soft text-brand-deep"}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
