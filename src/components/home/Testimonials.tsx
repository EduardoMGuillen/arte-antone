"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Bunny, Cloud, Giraffe, Heart } from "@/components/Decor";

const REVIEWS = [
  { name: "Daniela R.", role: "Mamá de Enzo", initials: "DR", tone: "bg-sage", text: "El tablero de nacimiento quedó hermoso. Lo usamos en las fotos del hospital y ahora está en su cuarto. ¡Todos preguntan dónde lo compramos!" },
  { name: "Karla M.", role: "Mamá de Emma", initials: "KM", tone: "bg-blush", text: "El nombre con flores y mariposas superó lo que imaginé. Los colores son delicados y el acabado es precioso." },
  { name: "Sofía L.", role: "Baby shower de Alessandra", initials: "SL", tone: "bg-lilac", text: "Pedí 40 medallones para el baby shower y llegaron perfectos, cada uno empacado. Mis invitadas quedaron encantadas." },
  { name: "Jorge P.", role: "Papá de Kenneth", initials: "JP", tone: "bg-sky", text: "Los recuerditos del primer añito fueron el detalle más bonito de la fiesta. Súper puntuales con la entrega." },
  { name: "Andrea V.", role: "Dueña de Cody 🐶", initials: "AV", tone: "bg-peach", text: "Le mandé una foto de mi perrito y me hicieron su placa idéntica. ¡Es mi recuerdo favorito!" },
  { name: "María J.", role: "Abuela orgullosa", initials: "MJ", tone: "bg-butter", text: "Mis nietos me regalaron el cuadro 'Tengo a la mejor abuela' y lloré de la emoción. Gracias por tanto cariño." },
];

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const pages = Math.ceil(REVIEWS.length / perPage);

  useEffect(() => {
    const onResize = () => setPerPage(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPage((p) => (p + 1) % pages), 6000);
    return () => clearInterval(t);
  }, [pages]);

  const current = page % pages;
  const visible = REVIEWS.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <Giraffe className="absolute -bottom-2 left-2 hidden h-52 w-32 lg:block xl:left-10" />
      <Bunny className="absolute -bottom-2 right-4 hidden h-40 w-32 lg:block xl:right-12" />
      <Cloud className="absolute right-[12%] top-10 h-12 w-24 animate-drift" />
      <Cloud className="absolute left-[10%] top-24 hidden h-10 w-20 animate-drift [animation-delay:2s] sm:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Testimonios</p>
          <h2 className="mt-2 flex flex-wrap items-center justify-center gap-x-3 font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem]">
            Amado por mamás, <span className="font-script text-[1.2em] font-normal text-brand">hecho con amor</span>
            <Heart className="h-7 w-7" />
          </h2>
        </div>

        <div className="mt-12 min-h-[290px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current}-${perPage}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45 }}
              className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((r) => (
                <figure key={r.name} className="flex h-full flex-col rounded-[1.75rem] bg-white p-7 card-shadow">
                  <Quote className="h-8 w-8 text-sand" fill="currentColor" strokeWidth={0} />
                  <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink/80">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className={`grid h-11 w-11 place-items-center rounded-full ${r.tone} text-sm font-extrabold text-ink`}>
                      {r.initials}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-extrabold text-ink">{r.name}</span>
                      <span className="block text-xs text-muted">{r.role}</span>
                    </span>
                    <span className="flex text-[#e5b04a]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Ver testimonios ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-brand" : "w-2.5 bg-sand hover:bg-gold"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
