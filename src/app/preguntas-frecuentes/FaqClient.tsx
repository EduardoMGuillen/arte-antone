"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Palette, Plus, ShoppingBag, Truck } from "lucide-react";

const GROUPS = [
  {
    id: "pedidos",
    label: "Pedidos",
    icon: ShoppingBag,
    items: [
      { q: "¿Cómo hago mi pedido?", a: "Elige tu diseño en la tienda, agrégalo al carrito con los datos de personalización y confirma tu pedido. Te contactaremos para enviarte el boceto antes de producir." },
      { q: "¿Cuánto tiempo tarda mi pedido?", a: "Los productos personalizados se elaboran en 3 a 7 días hábiles después de aprobar el boceto. Para eventos con muchas piezas (recuerditos, medallones) recomendamos pedir con 2 semanas de anticipación." },
      { q: "¿Hacen pedidos grandes para eventos?", a: "Sí. Hacemos recuerditos para baby showers, bautizos, primeros añitos y cumpleaños. Escríbenos con la cantidad y la fecha del evento para cotizarte." },
      { q: "¿Puedo cambiar algo después de confirmar?", a: "Puedes pedir cambios hasta aprobar el boceto. Una vez que empezamos a cortar y pintar, ya no es posible modificar el diseño." },
    ],
  },
  {
    id: "personalizacion",
    label: "Personalización",
    icon: Palette,
    items: [
      { q: "¿Puedo elegir los colores y la temática?", a: "¡Claro! Todos nuestros diseños se adaptan: nombre, fecha, colores, personajes y frases. También podemos crear un diseño totalmente nuevo a partir de tu idea." },
      { q: "¿Me envían una vista previa?", a: "Sí, siempre te enviamos un boceto digital para que lo apruebes antes de producir. Así te aseguras de que quede como lo imaginaste." },
      { q: "¿Qué material utilizan?", a: "Trabajamos con MDF de buena densidad cortado y grabado con láser. Lo entregamos natural o pintado a mano con pinturas acrílicas y sellador para mayor durabilidad." },
      { q: "¿Pueden hacer un diseño con la foto de mi mascota?", a: "Sí. Envíanos una foto clara de tu mascota y creamos su placa o figura personalizada con su nombre." },
    ],
  },
  {
    id: "envios",
    label: "Envíos",
    icon: Truck,
    items: [
      { q: "¿Hacen envíos fuera de Cortés?", a: "Sí, enviamos a todo Honduras por empresa de encomiendas. En Cofradía y San Pedro Sula también coordinamos entregas personales." },
      { q: "¿Cuánto cuesta el envío?", a: "El envío nacional cuesta L 120 y es gratis en pedidos mayores a L 1,500. El retiro en Cofradía no tiene costo." },
      { q: "¿Cómo llega empacado?", a: "Cada pieza se envía protegida y lista para regalar, con empaque especial para que llegue en perfecto estado." },
    ],
  },
  {
    id: "pagos",
    label: "Pagos",
    icon: CreditCard,
    items: [
      { q: "¿Cómo puedo pagar?", a: "Aceptamos transferencia bancaria, depósito, Tigo Money, tarjeta y efectivo en entregas personales." },
      { q: "¿Tengo que pagar por adelantado?", a: "Para iniciar la producción solicitamos un anticipo del 50%. El resto se paga al momento de la entrega o antes del envío." },
      { q: "¿Tienen descuentos?", a: "Suscríbete a nuestro boletín y recibe 10% de descuento en tu primera compra. También tenemos precios especiales en pedidos para eventos." },
    ],
  },
];

export default function FaqClient() {
  const [group, setGroup] = useState(GROUPS[0].id);
  const [open, setOpen] = useState<number | null>(0);
  const current = GROUPS.find((g) => g.id === group) ?? GROUPS[0];

  return (
    <div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:justify-center sm:px-0">
        {GROUPS.map((g) => {
          const active = g.id === group;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                setGroup(g.id);
                setOpen(0);
              }}
              className={`relative inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                active ? "border-brand text-white" : "border-line bg-white text-ink/75 hover:text-ink"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="faq-tab"
                  className="absolute inset-0 rounded-full bg-brand shadow-md shadow-brand/25"
                  transition={{ type: "spring", damping: 26, stiffness: 300 }}
                />
              )}
              <g.icon className="relative h-4 w-4" />
              <span className="relative">{g.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-10 space-y-3"
        >
          {current.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-3xl border bg-white transition ${isOpen ? "border-sand card-shadow" : "border-line"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-semibold text-ink">{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${isOpen ? "rotate-45 bg-brand text-white" : "bg-soft text-brand-deep"}`}
                  >
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
