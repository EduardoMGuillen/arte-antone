import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Instagram } from "@/components/BrandIcons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Location from "@/components/home/Location";
import { Branch, Cloud, Heart } from "@/components/Decor";
import ContactForm from "./ContactForm";
import { BRAND, CONTACT, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contacto | ${BRAND}`,
  description: "Cotiza tu tablero de nacimiento, recuerditos para tu evento o un diseño personalizado con Arte Antone.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-cream to-paper">
          <Cloud face className="absolute right-[10%] top-10 h-14 w-24 animate-floaty" />
          <Branch className="absolute -left-4 bottom-0 h-28 w-28 opacity-60" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
            <p className="eyebrow">Hablemos</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Creemos algo <span className="font-script text-[1.2em] font-normal text-brand">especial</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
              ¿Tienes un evento o una idea en mente? Escríbenos y te enviamos una cotización sin compromiso.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-8 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-10">
            <Heart className="absolute right-8 top-8 h-6 w-6" fill="#d98b8f" />
            <h2 className="font-display text-2xl font-semibold">Información de contacto</h2>
            <p className="mt-2 text-sm text-white/65">Respondemos de lunes a sábado.</p>
            <ul className="mt-8 space-y-5 text-sm">
              {[
                { icon: MapPin, text: CONTACT.address },
                { icon: Phone, text: CONTACT.phoneDisplay },
                { icon: Mail, text: CONTACT.email },
                { icon: Clock, text: CONTACT.hours },
              ].map((i) => (
                <li key={i.text} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-gold">
                    <i.icon className="h-5 w-5" />
                  </span>
                  {i.text}
                </li>
              ))}
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-sand">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-gold">
                    <Instagram className="h-5 w-5" />
                  </span>
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-brand/40 blur-2xl" />
          </div>
          <div className="rounded-[2rem] border border-line bg-white p-6 card-shadow sm:p-10">
            <ContactForm />
          </div>
        </section>

        <Location />
      </main>
      <Footer />
    </>
  );
}
