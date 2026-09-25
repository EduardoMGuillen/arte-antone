import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Instagram } from "@/components/BrandIcons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Branch, Cloud, Heart, Sparkle } from "@/components/Decor";
import FaqClient from "./FaqClient";
import { BRAND, INSTAGRAM_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Preguntas frecuentes | ${BRAND}`,
  description: "Tiempos de elaboración, personalización, envíos a todo Honduras y formas de pago de Arte Antone.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-cream to-paper">
          <Cloud face className="absolute right-[10%] top-10 h-14 w-24 animate-floaty" />
          <Sparkle className="absolute left-[14%] top-14 h-5 w-5" />
          <Branch className="absolute -left-4 bottom-0 h-28 w-28 opacity-60" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
            <p className="eyebrow">Resolvemos tus dudas</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Preguntas <span className="font-script text-[1.2em] font-normal text-brand">frecuentes</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
              Todo lo que necesitas saber sobre tus pedidos, la personalización, los envíos y los pagos.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
          <FaqClient />
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-soft to-blush/60 p-8 text-center sm:p-10">
            <Heart className="absolute right-8 top-8 h-6 w-6" fill="#e8a7a7" />
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">¿No encontraste tu respuesta?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Escríbenos y con gusto te ayudamos a crear el recuerdo perfecto.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contacto" className="btn-primary">
                Contáctanos <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Instagram className="h-4 w-4" /> Escríbenos por Instagram
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
