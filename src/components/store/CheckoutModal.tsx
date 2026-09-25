"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CreditCard, Landmark, Loader2, Store, Truck, X } from "lucide-react";
import { useStore } from "./StoreProvider";
import { formatPrice } from "@/lib/format";
import { PROMO_CODE } from "@/lib/constants";

type Step = "form" | "processing" | "done";

const SHIPPING = 120;
const FREE_SHIPPING = 1500;

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState<Step>("form");
  const [delivery, setDelivery] = useState<"envio" | "retiro">("envio");
  const [payment, setPayment] = useState<"transferencia" | "tarjeta" | "efectivo">("transferencia");
  const [code, setCode] = useState("");
  const [codeApplied, setCodeApplied] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [order, setOrder] = useState({ number: "", name: "", total: 0 });

  const discount = codeApplied ? Math.round(cartTotal * 0.1) : 0;
  const shipping = delivery === "retiro" || cartTotal >= FREE_SHIPPING ? 0 : SHIPPING;
  const total = cartTotal - discount + shipping;

  function close() {
    setCheckoutOpen(false);
    setTimeout(() => {
      setStep("form");
      setCodeApplied(false);
      setCode("");
      setCodeError("");
    }, 300);
  }

  function applyCode() {
    if (code.trim().toUpperCase() === PROMO_CODE) {
      setCodeApplied(true);
      setCodeError("");
    } else {
      setCodeError("Código no válido");
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStep("processing");
    setTimeout(() => {
      setOrder({
        number: `AA-${Math.floor(10000 + Math.random() * 89999)}`,
        name: String(data.get("name") || "").split(" ")[0],
        total,
      });
      clearCart();
      setStep("done");
    }, 1800);
  }

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/45 backdrop-blur-[3px] sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-h-[94dvh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] bg-paper shadow-2xl sm:rounded-[2rem]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            role="dialog"
            aria-label="Finalizar pedido"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white shadow hover:bg-soft"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            {step === "form" && (
              <form onSubmit={onSubmit} className="grid gap-0 md:grid-cols-[1.25fr_1fr]">
                <div className="space-y-5 p-6 sm:p-8">
                  <div>
                    <p className="eyebrow">Paso final</p>
                    <h2 className="mt-1 font-display text-3xl font-semibold">Finalizar pedido</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="label sm:col-span-2">
                      Nombre completo
                      <input name="name" required className="input mt-1.5" placeholder="Ej. María López" />
                    </label>
                    <label className="label">
                      Teléfono
                      <input name="phone" required type="tel" className="input mt-1.5" placeholder="+504 ____-____" />
                    </label>
                    <label className="label">
                      Correo
                      <input name="email" type="email" className="input mt-1.5" placeholder="tu@correo.com" />
                    </label>
                  </div>

                  <div>
                    <p className="label">Entrega</p>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      {[
                        { id: "envio", label: "Envío a domicilio", icon: Truck },
                        { id: "retiro", label: "Retiro en Cofradía", icon: Store },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDelivery(opt.id as typeof delivery)}
                          className={`flex items-center gap-2 rounded-2xl border-[1.5px] px-3 py-3 text-left text-sm font-bold transition ${
                            delivery === opt.id ? "border-brand bg-soft" : "border-line bg-white"
                          }`}
                        >
                          <opt.icon className="h-4 w-4 shrink-0 text-brand" />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {delivery === "envio" && (
                    <label className="label">
                      Dirección de entrega
                      <input name="address" required className="input mt-1.5" placeholder="Colonia, calle, ciudad" />
                    </label>
                  )}

                  <label className="label">
                    Detalles de personalización
                    <textarea
                      name="notes"
                      rows={2}
                      className="input mt-1.5"
                      placeholder="Nombre del bebé, fecha, colores, temática…"
                    />
                  </label>

                  <div>
                    <p className="label">Método de pago</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[
                        { id: "transferencia", label: "Transferencia", icon: Landmark },
                        { id: "tarjeta", label: "Tarjeta", icon: CreditCard },
                        { id: "efectivo", label: "Efectivo", icon: Store },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPayment(opt.id as typeof payment)}
                          className={`flex flex-col items-center gap-1 rounded-2xl border-[1.5px] px-2 py-3 text-xs font-bold transition ${
                            payment === opt.id ? "border-brand bg-soft" : "border-line bg-white"
                          }`}
                        >
                          <opt.icon className="h-4 w-4 text-brand" />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col border-t border-line bg-cream p-6 sm:p-8 md:rounded-r-[2rem] md:border-l md:border-t-0">
                  <h3 className="font-display text-xl font-semibold">Resumen</h3>
                  <ul className="mt-4 max-h-56 space-y-3 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <li key={item.key} className="flex justify-between gap-3 text-sm">
                        <span className="text-ink/80">
                          {item.qty}× {item.name}
                        </span>
                        <span className="shrink-0 font-bold">{formatPrice(item.price * item.qty)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex gap-2">
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      disabled={codeApplied}
                      className="input !py-2 uppercase"
                      placeholder="Código de descuento"
                    />
                    <button type="button" onClick={applyCode} disabled={codeApplied} className="btn-ghost btn-sm shrink-0">
                      {codeApplied ? "✓" : "Aplicar"}
                    </button>
                  </div>
                  {codeError && <p className="mt-1 text-xs text-promo">{codeError}</p>}
                  {!codeApplied && !codeError && (
                    <p className="mt-1 text-[11px] text-muted">Primera compra: usa {PROMO_CODE}</p>
                  )}

                  <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted">Subtotal</dt>
                      <dd className="font-bold">{formatPrice(cartTotal)}</dd>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-promo">
                        <dt>Descuento 10%</dt>
                        <dd className="font-bold">− {formatPrice(discount)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-muted">Envío</dt>
                      <dd className="font-bold">{shipping === 0 ? "Gratis" : formatPrice(shipping)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-line pt-3 text-base">
                      <dt className="font-bold">Total</dt>
                      <dd className="text-xl font-extrabold">{formatPrice(total)}</dd>
                    </div>
                  </dl>

                  <button type="submit" disabled={cart.length === 0} className="btn-primary mt-6 w-full">
                    Confirmar pedido
                  </button>
                  <p className="mt-3 text-center text-[11px] text-muted">
                    Al confirmar, te contactaremos para validar el diseño antes de producirlo.
                  </p>
                </div>
              </form>
            )}

            {step === "processing" && (
              <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-brand" />
                <p className="mt-6 font-display text-2xl">Procesando tu pedido…</p>
                <p className="mt-1 text-sm text-muted">Esto solo toma un momento</p>
              </div>
            )}

            {step === "done" && (
              <div className="flex flex-col items-center px-8 py-16 text-center">
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="grid h-24 w-24 place-items-center rounded-full bg-sage"
                >
                  <CheckCircle2 className="h-12 w-12 text-[#6f8a5a]" />
                </motion.div>
                <p className="eyebrow mt-6">Pedido {order.number}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                  ¡Gracias{order.name ? `, ${order.name}` : ""}!
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  Recibimos tu pedido por <strong className="text-ink">{formatPrice(order.total)}</strong>.
                  En breve te contactaremos para confirmar los detalles de personalización y la fecha
                  de entrega.
                </p>
                <button type="button" onClick={close} className="btn-primary mt-8">
                  Seguir explorando
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
