"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PenLine, Star } from "lucide-react";
import { Branch, Cloud, Heart, Sparkle } from "@/components/Decor";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-cream to-paper">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blush/70 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-sand/50 blur-3xl" />

      <Heart className="absolute left-[6%] top-16 h-5 w-5 animate-floaty" fill="#efc1bd" />
      <Sparkle className="absolute left-[44%] top-12 h-5 w-5 animate-floaty [animation-delay:1.2s]" />
      <Cloud className="absolute left-[38%] top-[62%] hidden h-10 w-20 animate-drift opacity-90 lg:block" />
      <Branch className="absolute -left-6 bottom-6 hidden h-40 w-40 -rotate-12 opacity-70 md:block" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8 lg:pb-28 lg:pt-16">
        <div className="relative z-10 text-center lg:text-left">
          <motion.p {...fadeUp(0)} className="eyebrow justify-center lg:justify-start">
            <span className="h-px w-8 bg-brand" /> Hecho a mano en Honduras
          </motion.p>
          <motion.h1
            {...fadeUp(0.08)}
            className="mt-5 font-display text-[2.7rem] font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-[3.6rem] xl:text-[4.1rem]"
          >
            Pequeños detalles,
            <span className="mt-1 block bg-gradient-to-r from-brand via-[#c28a5a] to-promo bg-clip-text text-transparent">
              grandes recuerdos
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.16)}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            Tableros de nacimiento, nombres decorativos y recuerditos personalizados en MDF,
            pintados a mano para celebrar cada momento de tu pequeño.
          </motion.p>
          <motion.div
            {...fadeUp(0.24)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link href="/productos" className="btn-primary">
              Comprar ahora <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#categorias" className="btn-ghost">
              Explorar categorías
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.32)}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {["/images/productos/post-01.jpg", "/images/productos/post-12.jpg", "/images/productos/post-10.jpg"].map(
                  (src) => (
                    <span key={src} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow">
                      <Image src={src} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                  ),
                )}
              </div>
              <div className="text-left">
                <p className="flex items-center gap-1 text-sm font-extrabold text-ink">
                  4.9 <Star className="h-3.5 w-3.5 text-[#e5b04a]" fill="currentColor" strokeWidth={0} />
                </p>
                <p className="text-xs text-muted">+300 familias felices</p>
              </div>
            </div>
            <div className="h-10 w-px bg-line max-sm:hidden" />
            <div className="text-left">
              <p className="text-sm font-extrabold text-ink">100% personalizado</p>
              <p className="text-xs text-muted">Nombre, fecha, colores y temática</p>
            </div>
          </motion.div>
        </div>

        <div className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[540px]">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-6 bottom-0 top-8 rounded-[46%_54%_48%_52%/58%_52%_48%_42%] bg-gradient-to-br from-sand via-[#f4e3cb] to-blush"
          />
          <Cloud face className="absolute right-4 top-2 z-20 h-14 w-24 animate-floaty sm:right-0" />
          <Sparkle className="absolute left-4 top-10 z-20 h-7 w-7 animate-floaty [animation-delay:.6s]" />
          <Heart className="absolute bottom-24 right-0 z-20 h-6 w-6 animate-floaty [animation-delay:1.4s]" fill="#d98b8f" />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-6 z-10 h-[340px] w-[250px] -translate-x-1/2 overflow-hidden rounded-t-[140px] rounded-b-[28px] border-[6px] border-white shadow-2xl sm:h-[430px] sm:w-[310px]"
          >
            <Image
              src="/images/productos/post-11-tall.jpg"
              alt="Tablero de nacimiento Hola Mundo soy Enzo"
              fill
              priority
              sizes="320px"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0, rotate: -12 }}
            animate={{ x: 0, opacity: 1, rotate: -7 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="absolute bottom-10 left-0 z-20 w-[150px] rounded-3xl bg-white p-2 shadow-xl sm:bottom-14 sm:w-[180px]"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src="/images/productos/post-07.jpg" alt="Nombre decorativo Emma" fill sizes="180px" className="object-cover" />
            </div>
            <p className="px-1 pb-1 pt-2 text-center text-xs font-bold text-ink">Nombres decorativos</p>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0, rotate: 12 }}
            animate={{ x: 0, opacity: 1, rotate: 6 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute right-0 top-[34%] z-20 w-[140px] rounded-3xl bg-white p-2 shadow-xl sm:w-[170px]"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src="/images/productos/post-02.jpg" alt="Recuerditos Mi primer añito" fill sizes="170px" className="object-cover" />
            </div>
            <p className="px-1 pb-1 pt-2 text-center text-xs font-bold text-ink">Recuerditos</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="absolute bottom-0 right-6 z-30 flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-white shadow-2xl sm:right-10"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand">
              <PenLine className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-xs text-white/60">Con su nombre</span>
              <span className="font-script text-2xl leading-none text-sand">Enzo</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
