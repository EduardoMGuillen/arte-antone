import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Instagram } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import { Branch, Heart } from "@/components/Decor";
import { CREATOR_HANDLE, INSTAGRAM_URL } from "@/lib/constants";

const POINTS = [
  "Diseños únicos creados para cada familia",
  "Te enviamos el boceto antes de producir",
  "MDF natural o pintado a mano con colores suaves",
  "Ideales para regalar en baby showers, bautizos y cumpleaños",
];

export default function About() {
  return (
    <section id="nosotros" className="relative scroll-mt-28 overflow-hidden py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-6 -top-6 h-full w-full rounded-[2.5rem] bg-blush" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl">
            <Image
              src="/images/productos/post-01-tall.jpg"
              alt="La fundadora de Arte Antone con su bebé"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 rounded-3xl bg-white p-5 shadow-xl sm:-right-10">
            <p className="font-display text-4xl font-semibold text-brand">+300</p>
            <p className="text-xs font-bold text-ink/70">recuerdos creados</p>
          </div>
          <Branch className="absolute -right-10 -top-10 h-28 w-28" />
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Nuestra historia</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              “Todo comenzó
              <span className="block font-script text-[1.25em] font-normal text-brand">por ella…”</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Arte Antone nació del amor de una mamá por su hija. Buscando un detalle especial para
              recordar su llegada, descubrió que cada historia merece un recuerdo hecho a mano, con su
              nombre y sus colores. Hoy, desde Cofradía, Cortés, creamos tableros, nombres y
              recuerditos para familias de toda Honduras.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-3">
            {POINTS.map((p, i) => (
              <Reveal key={p} delay={0.15 + i * 0.05}>
                <li className="flex items-start gap-3 text-sm font-semibold text-ink/85">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sand text-brand-deep">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.35} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/productos" className="btn-primary">
              Conoce nuestros diseños
            </Link>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Instagram className="h-4 w-4" /> Síguenos
            </a>
          </Reveal>
          <p className="mt-6 flex items-center gap-2 text-xs text-muted">
            <Heart className="h-3.5 w-3.5" /> By {CREATOR_HANDLE}
          </p>
        </div>
      </div>
    </section>
  );
}
