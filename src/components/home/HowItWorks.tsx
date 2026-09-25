import { Gift, MousePointerClick, Palette, PenLine } from "lucide-react";
import Reveal from "@/components/Reveal";

const STEPS = [
  { icon: MousePointerClick, title: "Elige tu diseño", text: "Explora el catálogo y escoge el tablero, nombre o recuerdito que más te guste." },
  { icon: PenLine, title: "Personalízalo", text: "Cuéntanos el nombre, fecha, colores y temática. ¡Todo se adapta a tu historia!" },
  { icon: Palette, title: "Aprueba el boceto", text: "Te enviamos una vista previa y, cuando nos das el sí, lo pintamos a mano." },
  { icon: Gift, title: "Recíbelo en casa", text: "Empacado y listo para regalar, con envío a todo Honduras o retiro en Cofradía." },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative scroll-mt-28 bg-ink py-20 text-white lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow !text-gold">Así de fácil</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
            ¿Cómo hago mi <span className="font-script text-[1.2em] font-normal text-sand">pedido?</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group relative h-full rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10">
                <span className="absolute right-5 top-4 font-display text-5xl font-semibold text-white/10">
                  0{i + 1}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold to-brand-deep">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 font-display text-xl font-semibold">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
